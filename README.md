# Summary

This project was inspired by seeing a friend manage his monthly expenses using an Excel spreadsheet. I tried this approach myself, but found it too tedious and unsustainable over time. To address this problem, I started building an app/web application that makes it quick and easy to register expenses, while automatically sorting and structuring the data.  

The goal of the app is to let users add expenses manually, but also to support importing expense data directly from debit/credit cards via BankID. The system should not be limited by card type or bank, but only rely on the format in which the data is provided. Once the data is collected, it can be viewed in clear and understandable ways—for example:  
- Graphs showing monthly expenses, largest categories, or biggest individual expenses  
- A simple but effective search function, allowing users to filter expenses by date, name, cost, or category  

Currently, the project is in slow development and not yet in a state for effective daily use. However, the overall structure is in place, laying the foundation for future development and expansion.  
<p align="center">
  <img width="645" height="685" alt="485581207-5f61eedc-0eec-42b8-8376-1cb96af97c48" src="https://github.com/user-attachments/assets/6fb97b5e-3176-4ff1-bc4e-1c01e57b1eb1" />
</p>

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
