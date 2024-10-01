# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



## Instalación

1. Clona el repositorio:
    ```sh
    git clone  https://github.com/Allan07022003/frontend.git
    ```
2. Navega al directorio del proyecto:
    ```sh
    cd montessori-app
    ```
3. Instala las dependencias:
    ```sh
    npm install
    ```

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

- `npm start`: Inicia la aplicación en modo de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm test`: Ejecuta las pruebas.

## Estructura de Carpetas

- **public/**: Contiene archivos estáticos como `index.html`, `manifest.json`, y `robots.txt`.
- **src/**: Contiene el código fuente de la aplicación.
  - **components/**: Componentes reutilizables como `Character.js`, `Header.tsx`, y `Header2.tsx`.
  - **context/**: Archivos relacionados con el contexto de la aplicación, como `AssistantContext.js` y `CharacterAssistant.js`.
  - **pages/**: Páginas de la aplicación como `Login.js`, `Register.js`, y `Dashboard.js`.
  - **subjects/**: Módulos de materias como `Lenguaje`, `Math`, y `Sciences`.
  - **utils/**: Utilidades y servicios como `voiceService.js` y `animationsData.js`.

## Principales Componentes

### [`src/App.js`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2Falanl%2FOneDrive%2FDocuments%2FGitHub%2Ffrontend%2Fsrc%2FApp.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22a101ddb5-8045-4161-a808-7462fd2fb61d%22%5D "c:\Users\alanl\OneDrive\Documents\GitHub\frontend\src\App.js")

El archivo principal de la aplicación que configura las rutas y el contexto:

```js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MathDashboard from "./subjects/Math/MathDashboard";
import SubtractionActivity from "./subjects/Math/subtraction/SubtractionActivity";
import Activity from "./subjects/Lenguaje/Activity";
import { AssistantProvider } from "./context/AssistantContext";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { isMobile } from "react-device-detect"; 
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminDashboard from "./pages/adminDashboard";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordForm from "./pages/NewPassword";
import CategorySelection from "./subjects/Sciences/CategorySelection";
import BiologiaBasica from "./subjects/Sciences/Pages/BiologiaBasica";
import CicloDeVida from "./subjects/Sciences/Pages/BodyWithOrgans";

function App() {
  return (
    <AssistantProvider>
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
            <Route path="/admin" element={<ProtectedRoute component={AdminDashboard} />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/new-password" element={<ResetPasswordForm />} />
            <Route path="/math" element={<MathDashboard />} />
            <Route path="/math/subtraction" element={<SubtractionActivity />} />
            <Route path="/lenguaje" element={<Activity />} />
            <Route path="/sciences" element={<CategorySelection />} />
            <Route path="/sciences/biologia-basica" element={<BiologiaBasica />} />
            <Route path="/sciences/ciclo-de-vida" element={<CicloDeVida />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
        <Toaster />
      </DndProvider>
    </AssistantProvider>
  );
}

export default App;



