import sharp from 'sharp';
import fs from 'fs';

async function crop() {
    const input = 'public/mb.webp';
    const temp = 'public/mb_temp.webp';
    
    try {
        const metadata = await sharp(input).metadata();
        console.log('Original size:', metadata.width, 'x', metadata.height);
        
        // Let's crop a square region from the center.
        // Looking at the screenshot, the QR code and text take up about 1/3 of the height
        const cropHeight = Math.floor(metadata.height * 0.45);
        const cropWidth = Math.floor(metadata.height * 0.45); // Keep it square or slightly tall
        
        const left = Math.floor((metadata.width - cropWidth) / 2);
        const top = Math.floor((metadata.height - cropHeight) / 2);
        
        console.log(`Cropping: width=${cropWidth}, height=${cropHeight}, left=${left}, top=${top}`);
        
        await sharp(input)
            .extract({ left, top, width: cropWidth, height: cropHeight })
            .toFile(temp);
            
        fs.renameSync(temp, input);
        console.log('Successfully cropped!');
    } catch (err) {
        console.error('Error cropping:', err);
    }
}

crop();
