'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function FluidSand() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      const canvas = document.createElement('canvas');
      if (!window.WebGLRenderingContext || (!canvas.getContext('webgl') && !canvas.getContext('experimental-webgl'))) {
        return;
      }
    } catch (e) {
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    let renderer: THREE.WebGLRenderer;
    const originalConsoleError = console.error;
    try {
      console.error = () => {};
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      console.error = originalConsoleError;
    } catch (e) {
      console.error = originalConsoleError;
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    // Hiệu ứng "cát lướt" bằng Simplex 3D Noise kết hợp với Gradient lụa mượt mà
    const fragmentShader = `
      varying vec2 vUv;
      uniform float uTime;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      uniform vec3 color4;
      
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

      float snoise(vec3 v){ 
        const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 = v - i + dot(i, C.xxx) ;

        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );

        vec3 x1 = x0 - i1 + 1.0 * C.xxx;
        vec3 x2 = x0 - i2 + 2.0 * C.xxx;
        vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

        i = mod(i, 289.0 ); 
        vec4 p = permute( permute( permute( 
                   i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                 + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                 + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

        float n_ = 1.0/7.0;
        vec3  ns = n_ * D.wyz - D.xzx;

        vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );

        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );

        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);

        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                      dot(p2,x2), dot(p3,x3) ) );
      }

      void main() {
        vec2 uv = vUv;
        
        // Tọa độ thay đổi theo thời gian tạo độ lướt
        vec3 pos1 = vec3(uv * 1.5, uTime * 0.06);
        vec3 pos2 = vec3(uv * 2.2 - vec2(uTime * 0.03), uTime * 0.04);
        vec3 pos3 = vec3(uv * 3.0 + vec2(uTime * 0.02), uTime * 0.07);
        
        // Cường độ sóng lụa (cát lướt)
        float n1 = snoise(pos1) * 0.5 + 0.5;
        float n2 = snoise(pos2) * 0.5 + 0.5;
        float n3 = snoise(pos3) * 0.5 + 0.5;
        
        // Phối hợp các màu sắc để tạo đồi cát mịn
        vec3 color = mix(color1, color2, n1);
        color = mix(color, color3, n2 * 0.6);
        color = mix(color, color4, n3 * 0.35);
        
        // Noise (hạt) nhẹ để đổ bóng thật hơn
        float grain = fract(sin(dot(uv.xy, vec2(12.9898,78.233))) * 43758.5453) * 0.02;
        
        gl_FragColor = vec4(color + grain, 1.0);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      color1: { value: new THREE.Color() },
      color2: { value: new THREE.Color() },
      color3: { value: new THREE.Color() },
      color4: { value: new THREE.Color() }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      uniforms.uTime.value = clock.getElapsedTime();

      // Nhận diện Theme sáng/tối để đổi màu thời gian thực
      const isDark = document.documentElement.classList.contains('dark');
      
      // Màu tối - Nền đen huyền bí
      const targetDark1 = new THREE.Color('#0a0a0a');
      const targetDark2 = new THREE.Color('#15151e');
      const targetDark3 = new THREE.Color('#1b1b26');
      const targetDark4 = new THREE.Color('#101018');
      
      // Màu sáng - Nền kem / lụa trắng giống vhming
      const targetLight1 = new THREE.Color('#fdfdfd');
      const targetLight2 = new THREE.Color('#f0f0f5');
      const targetLight3 = new THREE.Color('#e6e6ec');
      const targetLight4 = new THREE.Color('#f5f5f7');

      const target1 = isDark ? targetDark1 : targetLight1;
      const target2 = isDark ? targetDark2 : targetLight2;
      const target3 = isDark ? targetDark3 : targetLight3;
      const target4 = isDark ? targetDark4 : targetLight4;

      uniforms.color1.value.lerp(target1, 0.04);
      uniforms.color2.value.lerp(target2, 0.04);
      uniforms.color3.value.lerp(target3, 0.04);
      uniforms.color4.value.lerp(target4, 0.04);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none overflow-hidden"
    />
  );
}
