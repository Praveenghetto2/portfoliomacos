import fs from 'fs';
import path from 'path';

const srcDir = '/Users/praveenkumar/.gemini/antigravity/brain/7f88e14b-3532-4190-aebc-ab5f5738926a';
const destDir = '/Users/praveenkumar/Desktop/PERSONAL WEBSITE11/public/assets/icons';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
const mapping = {
  'identity': 'identity.jpg',
  'case_studies': 'mission.jpg',
  'skills': 'skills.jpg',
  'lab': 'lab.jpg',
  'money': 'money.jpg',
  'journal': 'journal.jpg',
  'vault': 'vault.jpg',
  'interests': 'interests.jpg',
  'travel': 'travel.jpg'
};

for (const file of files) {
  for (const [key, val] of Object.entries(mapping)) {
    if (file.startsWith(`macos_${key}_icon`) && file.endsWith('.jpg')) {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, val);
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${file} -> ${val}`);
    }
  }
}
