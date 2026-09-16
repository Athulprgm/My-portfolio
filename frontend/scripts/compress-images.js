import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = 'public';
const projectImgDir = path.join(publicDir, 'project-img');

async function compressImage(inputPath, outputPath, options = {}) {
  try {
    const fileStatsBefore = fs.statSync(inputPath);
    const sizeBeforeMB = (fileStatsBefore.size / (1024 * 1024)).toFixed(2);
    
    let pipeline = sharp(inputPath);
    
    if (options.width || options.height) {
      pipeline = pipeline.resize({
        width: options.width,
        height: options.height,
        fit: options.fit || 'cover',
        withoutEnlargement: true
      });
    }
    
    if (options.format === 'png') {
      pipeline = pipeline.png({ compressionLevel: 9, quality: options.quality || 80 });
    } else if (options.format === 'jpeg' || options.format === 'jpg') {
      pipeline = pipeline.jpeg({ quality: options.quality || 75, progressive: true });
    }
    
    // Save to temp path first, then overwrite to avoid corruption
    const tempPath = outputPath + '.tmp';
    await pipeline.toFile(tempPath);
    
    fs.renameSync(tempPath, outputPath);
    
    const fileStatsAfter = fs.statSync(outputPath);
    const sizeAfterKB = (fileStatsAfter.size / 1024).toFixed(2);
    const percentReduction = (((fileStatsBefore.size - fileStatsAfter.size) / fileStatsBefore.size) * 100).toFixed(1);
    
    console.log(`✓ Compressed: ${path.basename(inputPath)}`);
    console.log(`  Size: ${sizeBeforeMB} MB → ${sizeAfterKB} KB (-${percentReduction}%)`);
  } catch (err) {
    console.error(`✗ Error compressing ${inputPath}:`, err);
  }
}

async function run() {
  console.log('Starting image compression...');
  
  // 1. Profile image (5.27 MB -> very small PNG)
  const profilePath = path.join(publicDir, 'profile.png');
  if (fs.existsSync(profilePath)) {
    await compressImage(profilePath, profilePath, {
      width: 256,
      height: 256,
      format: 'png',
      quality: 80
    });
  }
  
  // 2. Christmas celebration background (15.38 MB -> web-optimized JPEG)
  const christmasPath = path.join(publicDir, 'christmas-celebration-with-santa-claus.jpg');
  if (fs.existsSync(christmasPath)) {
    await compressImage(christmasPath, christmasPath, {
      width: 800,
      format: 'jpeg',
      quality: 75
    });
  }
  
  // 3. Project image screenshot (1.16 MB -> web-optimized PNG)
  const projectImgPath = path.join(projectImgDir, 'Screenshot 2025-10-31 182448.png');
  if (fs.existsSync(projectImgPath)) {
    await compressImage(projectImgPath, projectImgPath, {
      width: 800,
      format: 'png',
      quality: 80
    });
  }
  
  console.log('Image compression finished!');
}

run();
