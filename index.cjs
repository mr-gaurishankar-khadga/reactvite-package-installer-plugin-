import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';


const missingPackages = new Set(); 

const isValidPackageName = (name) => {
  
  return /^[a-z0-9]+([-_][a-z0-9]+)*$/.test(name);
};

const checkFileForImports = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  
  const importRegex = /import\s+[^'"]+['"]([^'"]+)['"]/g;
  const requireRegex = /require\(['"]([^'"]+)['"]\)/g;
  let match;

  while ((match = importRegex.exec(fileContent)) !== null) {
    const packageName = match[1].split('/')[0]; 
    if (isValidPackageName(packageName)) {
      missingPackages.add(packageName); 
      console.log(`Found import: ${packageName} in ${filePath}`);
    }
  }

 
  while ((match = requireRegex.exec(fileContent)) !== null) {
    const packageName = match[1].split('/')[0];
    if (isValidPackageName(packageName)) {
      missingPackages.add(packageName);
      console.log(`Found require: ${packageName} in ${filePath}`);
    }
  }
};

const checkDirectory = (dir) => {
  console.log(`Checking packages in directory: ${dir}`);

 
  const packageJsonPath = path.join(dir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    console.log(`Found package.json in ${dir}`);
  } else {
    console.log(`No package.json found in the target directory: ${dir}`);
  }


  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      checkDirectory(itemPath); 
    } else if (itemPath.endsWith('.js') || itemPath.endsWith('.jsx') || itemPath.endsWith('.ts') || itemPath.endsWith('.tsx')) {
      checkFileForImports(itemPath);
    }
  });
};

const installMissingPackages = () => {
  if (missingPackages.size > 0) {
    console.log(`Missing packages: [${Array.from(missingPackages).join(', ')}]`);
    console.log('Installing missing packages...');
    
  
    const packagesToInstall = Array.from(missingPackages).join(' ');
    execSync(`npm install ${packagesToInstall}`, { stdio: 'inherit' });
    
    console.log('Installation complete!');
  } else {
    console.log('No missing packages detected.');
  }
};

const runGSharp = (directory) => {
  console.log('Watching for changes in ....');
  console.log(`Running gsharp in directory: ${directory}`);
  checkDirectory(directory);
  installMissingPackages();
};


export { runGSharp };
