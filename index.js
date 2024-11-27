import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';


const isValidPackageName = (name) => {
  return /^(@[a-z0-9][\w.-]*\/[a-z0-9][\w.-]*|[a-z0-9]+([-_][a-z0-9]+)*)$/.test(name);
};

const checkInstalledPackages = () => {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return new Set([
      ...Object.keys(packageJson.dependencies || {}),
      ...Object.keys(packageJson.devDependencies || {})
    ]);
  }
  return new Set();
};


const installPackage = (packageName) => {
  console.log(`Installing ${packageName}...`);
  try {
    execSync(`npm install ${packageName}`, { stdio: 'inherit' });
    console.log(`Successfully installed ${packageName}`);
  } catch (error) {
    console.error(`Failed to install ${packageName}:`, error.message);
  }
};


const checkFileForImports = (filePath, installedPackages) => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const importRegex = /(?:import|require)\s*(?:.*?from\s*)?['"]([^'"]+)['"]/g;
  let match;
  const newPackages = new Set();

  while ((match = importRegex.exec(fileContent)) !== null) {
    let packageName = match[1];

    if (packageName.startsWith('@')) {
      packageName = packageName.split('/').slice(0, 2).join('/');
    } else {
      packageName = packageName.split('/')[0];
    }

    if (isValidPackageName(packageName) && !installedPackages.has(packageName)) {
      newPackages.add(packageName);
    }
  }

  return newPackages;
};

const watchFiles = (directory, installedPackages) => {
  const watcher = chokidar.watch(directory, { ignored: /(^|[\/\\])\../, persistent: true });

  const handleFileChange = (filePath) => {
    if (filePath.endsWith('.js') || filePath.endsWith('.jsx') || filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      const newPackages = checkFileForImports(filePath, installedPackages);
      newPackages.forEach(packageName => {
        installPackage(packageName);
        installedPackages.add(packageName); 
      });
    }
  };

  watcher.on('add', handleFileChange);
  watcher.on('change', handleFileChange);
  console.log(`Watching for changes in ${directory}...`);
};

export function gsharpi() {
  return {
    name: 'gsharp-plugin',
    configureServer(server) {
      const srcDirectory = path.join(process.cwd(), 'src');
      if (fs.existsSync(srcDirectory)) {
        const installedPackages = checkInstalledPackages();
        watchFiles(srcDirectory, installedPackages);
      } else {
        console.error(`The directory ${srcDirectory} does not exist.`);
      }
    }
  };
}
export { checkInstalledPackages, installPackage };
