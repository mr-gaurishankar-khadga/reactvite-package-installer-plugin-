
---
# 🎯 gsharpi : Automatic Package Installer ( React + vite )

`gsharpi-plugin` is a **Vite plugin** that revolutionizes your workflow by automatically detecting and installing missing npm packages. Say goodbye to the tedious task of manually managing your dependencies—let `gsharpi-plugin` handle it for you, in real-time, while you code!


## 📥 Installation

To get started with `gsharpi-plugin`, follow these steps:

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Integrate Plugin** in your `vite.config.js`:

   ```js


    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react-swc'
    import { gsharpi } from 'gsharpi'

    export default defineConfig({
      plugins: [react(), gsharpi()],
    })



   ```

3. **Run Your Vite Server**:

   ```bash
   npm run dev
   ```

The plugin will now watch your files and automatically install any missing npm packages it detects!

## 🛠️ Usage

Once set up, `gsharpi-plugin` works behind the scenes. Here's an example:

### Example Code

```js
import React from 'react';
import axios from 'axios';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import _ from 'lodash/fp';
```

Upon saving your file, the plugin will automatically install:

- `react`
- `axios`
- `@mui/icons-material`
- `lodash`

### Folder Structure

Ensure your project structure looks like this:

```
project-root/
├── src/
│   ├── App.js or App.jsx
│   ├── other files
├── package.json
├── vite.config.js
└── node_modules/
```

## 📂 How It Works

- **File Watching**: Uses `chokidar` to monitor changes in your `src/` folder.
- **Import Detection**: Scans files with regex for `import` and `require` statements.
- **Automatic Installation**: Installs missing dependencies using `npm install` automatically.

## 🔧 Commands

- `npm run dev`: Starts the Vite development server and automatically watches for missing packages.
- `npm install <package-name>`: Manually install a package if needed.

## 📋 Requirements

- **Node.js**: v14 or later
- **npm**: v6 or later
- **Vite**: v5 or later

## 📈 Future Enhancements

We have some exciting plans for `gsharpi-plugin`:
- 🔄 Support for `pnpm` and `yarn` package managers.
- 📂 Ability to monitor additional directories.
- 🛠️ Enhanced error handling and reporting for failed installations.

## 💡 Why gsharpi-plugin?

Whether you're an experienced developer or just starting out, `gsharpi-plugin` is designed to save you time by automating mundane tasks, keeping you focused on writing great code.

## 📜 License

This project is licensed under the **Apache-2.0 License**.

---

## 💬 Stay in Touch

We’d love to hear from you! Feel free to contribute, ask questions, or suggest improvements!

---

With `gsharpi-plugin`, automating package installations becomes a seamless part of your workflow. Enjoy coding while we handle the rest! 🎉

---

This enhanced README has a clean and appealing structure, highlights key features, and provides a good balance of technical information and visual appeal. Feel free to customize it further to match your project!




## 💬 Author

MR GAURI SHANKAR KHADGA

 ❤️ KEEP CODING ❤️