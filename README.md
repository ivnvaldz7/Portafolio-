# Portfolio Interactivo & Hub de Productos — Ivan Valdez

> **Product-focused Web Developer | React · TypeScript · Automatización · IA Aplicada**

Este es un portfolio interactivo full-stack y hub de productos diseñado para exhibir proyectos reales, casos de estudio detallados, demos navegables y herramientas profesionales personalizables (CV optimizado para ATS y textos de perfil para LinkedIn).

---

## 🚀 Características Principales

- **Demos Interactivas Integradas**:
  - **ChecAR**: Asistente con Inteligencia Artificial (Gemini API) para la verificación periodística de afirmaciones políticas con fuentes oficiales.
  - **Ale-Bet Manager**: Sistema de digitalización logística para laboratorio veterinario (control de cadena de frío y lotes).
  - **El Fulbo**: PWA para la organización de partidos de fútbol amateur y generación de placas sociales.
  - **FretLabs**: Calculador CAD numérico y diseñador SVG para luthiers con exportación de medidas de trastes.
- **Generador de CV ATS Personalizable**: Modal interactivo que permite previsualizar, editar datos de contacto/formación en tiempo real y exportar un currículum limpio optimizado para sistemas ATS en PDF o impresión.
- **Generador de Copy para LinkedIn**: Copia con un solo clic el resumen profesional y fragmentos listos para pegar en redes sociales.
- **Logotipo Animado de Automatización**: Emblema interactivo en la cabecera que simula la evaluación de rutas, toma de decisiones y redirección de flujos en tiempo real.
- **Soporte Bilingüe (Español / Inglés)**: Alternancia fluida de idioma en toda la interfaz.
- **Persistencia Local**: Guardado de personalizaciones del CV en el almacenamiento del navegador.

---

## 🛠️ Stack Tecnológico

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Motion (Framer Motion), Lucide React Icons, Canvas Confetti.
- **Backend / API**: Node.js, Express, TSX, Esbuild.
- **Inteligencia Artificial**: `@google/genai` (Google Gemini 2.0 Flash / Gemini 1.5).

---

## 💻 Desarrollo Local

### Requisitos Previos
- **Node.js**: v18 o superior.
- **npm** o **bun**.

### Pasos de Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/ivnvaldz7/portfolio.git
   cd portfolio
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:
   ```env
   GEMINI_API_KEY="Tu_API_Key_de_Google_AI_Studio"
   ```

4. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📦 Compilación para Producción

Para construir el paquete optimizado de producción:

```bash
npm run build
```

Esto generará el cliente estático en la carpeta `dist/` y el servidor Express empaquetado en `dist/server.cjs`.

Para probar el build de producción localmente:
```bash
npm run start
```

---

## 🌐 Guía de Despliegue (Obtener un Enlace Vivo)

Puedes desplegar este proyecto en múltiples plataformas gratuitas o de bajo costo:

### Option A: Despliegue en **Vercel** o **Netlify** (Solo Frontend / SPA)
Si deseas desplegarlo rápidamente como una Single Page Application (SPA):
1. Sube el código a tu repositorio de GitHub.
2. Conecta el repositorio en [Vercel](https://vercel.com) o [Netlify](https://netlify.com).
3. Configura los parámetros del proyecto:
   - **Build Command**: `npm run build` o `npx vite build`
   - **Output Directory**: `dist`
4. *(Opcional)* Si deseas habilitar la API de Gemini en la demo de ChecAR en producción, agrega la variable de entorno `GEMINI_API_KEY` en el panel de configuración de la plataforma.

### Option B: Despliegue Full-Stack en **Render** / **Railway** / **Fly.io** (Recomendado)
Para mantener el servidor Node.js/Express ejecutándose con el proxy seguro de Gemini:
1. Crea un nuevo **Web Service** en Render/Railway conectado a tu repositorio GitHub.
2. Configura los comandos:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`
3. Agrega las variables de entorno en el panel:
   - `GEMINI_API_KEY`: Tu API key de Gemini.
   - `NODE_ENV`: `production`

---

## 📬 Contacto

- **Nombre**: Ivan Valdez
- **Email**: ivnvaldz@gmail.com
- **LinkedIn**: [linkedin.com/in/ivnvaldz](https://www.linkedin.com/in/ivnvaldz/)
- **GitHub**: [github.com/ivnvaldz7](https://github.com/ivnvaldz7)
