// scripts/copy-installer.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Copying installer to dist...');

// Try multiple possible source paths
const possibleSources = [
    path.join(__dirname, '..', 'public', 'installer', 'ICTA_Access_Control_Setup_v1.2.0.exe'),
    path.join(__dirname, '..', '..', 'public', 'installer', 'ICTA_Access_Control_Setup_v1.2.0.exe'),
];

let source = null;
for (const src of possibleSources) {
    if (fs.existsSync(src)) {
        source = src;
        break;
    }
}

if (!source) {
    console.log('Installer not found in public folder');
    console.log('Skipping installer copy...');
    process.exit(0);
}

const destDir = path.join(__dirname, '..', 'dist', 'installer');
const dest = path.join(destDir, 'ICTA_Access_Control_Setup_v1.2.0.exe');

// Create destination directory
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`Created directory: ${destDir}`);
}

// Get file stats
const stats = fs.statSync(source);
console.log(`Source file: ${source}`);
console.log(`Source size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

// Copy the file
fs.copyFileSync(source, dest);
console.log(`Copied installer to: ${dest}`);

// Verify destination
const destStats = fs.statSync(dest);
console.log(`Destination size: ${(destStats.size / 1024 / 1024).toFixed(2)} MB`);