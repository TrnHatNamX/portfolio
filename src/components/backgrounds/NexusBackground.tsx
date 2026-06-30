'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function NexusBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Khởi tạo và kiểm tra WebGL một cách an toàn
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
    
    // Khởi tạo màu ban đầu dựa vào trạng thái class trên HTML
    const initialIsDark = document.documentElement.classList.contains('dark');
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 150;

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

    // Tạo hệ thống hạt (Particles)
    const particleCount = 250;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number, y: number, z: number }[] = [];

    const maxDistance = 38; // Khoảng cách nối dây

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 400; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 400; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 150; // z

      velocities.push({
        x: (Math.random() - 0.5) * 0.15,
        y: (Math.random() - 0.5) * 0.15,
        z: (Math.random() - 0.5) * 0.1
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Vật liệu của Hạt
    const pMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(initialIsDark ? '#a855f7' : '#3b82f6'),
      size: 2.5,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true
    });
    
    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);

    // Vật liệu của Đường nối (Lines)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(initialIsDark ? '#06b6d4' : '#93c5fd'),
      transparent: true,
      opacity: 0.2
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // Tương tác chuột
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    };
    document.addEventListener('mousemove', onDocumentMouseMove);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Camera parallax mượt mà
      targetX = mouseX * 0.08;
      targetY = mouseY * 0.08;
      camera.position.x += (targetX - camera.position.x) * 0.02;
      camera.position.y += (-targetY - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      // Chuyển động xoay toàn cảnh
      scene.rotation.y += 0.001;
      scene.rotation.x += 0.0005;

      // Cập nhật vị trí hạt
      const positionsAttr = geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        positionsAttr[i * 3]     += velocities[i].x;
        positionsAttr[i * 3 + 1] += velocities[i].y;
        positionsAttr[i * 3 + 2] += velocities[i].z;

        // Nảy lại khi chạm biên
        if (positionsAttr[i * 3] > 200 || positionsAttr[i * 3] < -200) velocities[i].x *= -1;
        if (positionsAttr[i * 3 + 1] > 200 || positionsAttr[i * 3 + 1] < -200) velocities[i].y *= -1;
        if (positionsAttr[i * 3 + 2] > 75 || positionsAttr[i * 3 + 2] < -75) velocities[i].z *= -1;
      }
      geometry.attributes.position.needsUpdate = true;

      // Vẽ lưới liên kết
      const linePositions = [];
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = positionsAttr[i * 3] - positionsAttr[j * 3];
          const dy = positionsAttr[i * 3 + 1] - positionsAttr[j * 3 + 1];
          const dz = positionsAttr[i * 3 + 2] - positionsAttr[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistance * maxDistance) {
            linePositions.push(
              positionsAttr[i * 3], positionsAttr[i * 3 + 1], positionsAttr[i * 3 + 2],
              positionsAttr[j * 3], positionsAttr[j * 3 + 1], positionsAttr[j * 3 + 2]
            );
          }
        }
      }
      linesMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

      // LERP (Nội suy) Màu Sắc Khung Hình để đổi nền siêu mượt
      const currentIsDark = document.documentElement.classList.contains('dark');
      
      const targetPointColor = new THREE.Color(currentIsDark ? '#a855f7' : '#3b82f6');
      const targetLineColor = new THREE.Color(currentIsDark ? '#06b6d4' : '#93c5fd');

      pMaterial.color.lerp(targetPointColor, 0.04);
      lineMaterial.color.lerp(targetLineColor, 0.04);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      lineGeometry.dispose();
      pMaterial.dispose();
      lineMaterial.dispose();
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
