import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const images = [
    { name: 'keyboard', url: 'https://d28jzcg6y4v9j1.cloudfront.net/2025/08/10/AULA_S75_PRO_1754812035417.webp' },
    { name: 'mouse', url: 'https://www.tncstore.vn/media/product/13258-chuot-khong-day-atk-x1-ultimate-nearlink-mau-den.jpg' },
    { name: 'monitor_edra', url: 'https://edravn.com/media/product/625_man_hinh_egm24f__2_.jpg' },
    { name: 'monitor_asus', url: 'https://kccshop.vn/media/product/250-7954-m--n-h--nh-gaming-asus-tuf-gaming-vg249qm1a-06.png' },
    { name: 'cpu', url: 'https://mygear.io.vn/media/product/3852-cpu-amd-ryzen-5-5600x.jpg' },
    { name: 'gpu', url: 'https://anphat.com.vn/media/product/38945_w800__4_.png' },
    { name: 'ram', url: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/329/122/products/trident-z-neo-03-e3e41ec5-e2c5-4a86-90bd-de899212f254.jpg?v=1675825979920' }
];

const targetDir = path.join(process.cwd(), 'public', 'gear');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

async function processImages() {
    for (const img of images) {
        try {
            console.log(`Fetching ${img.url}...`);
            const response = await fetch(img.url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            
            const outputPath = path.join(targetDir, `${img.name}.webp`);
            
            console.log(`Converting and saving to ${outputPath}...`);
            await sharp(buffer)
                .webp({ quality: 80 })
                .toFile(outputPath);
                
            console.log(`✅ Successfully processed ${img.name}`);
        } catch (error) {
            console.error(`❌ Failed to process ${img.name}:`, error.message);
        }
    }
    console.log('All done!');
}

processImages();
