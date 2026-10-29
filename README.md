# Portfolio Interactivo & Hub de Productos — Ivan Valdez

> **Product-focused Web Developer | React · TypeScript · Automatización · IA Aplicada**

Este es un portfolio interactivo full-stack y hub de productos diseñado para exhibir proyectos reales, casos de estudio detallados, demos navegables y herramientas profesionales personalizables (CV optimizado para ATS y textos de perfil para LinkedIn).

---

## 🚀 Características Principales

- **Muestras conceptuales integradas**:
  - **ChecAR**: Preview interactiva que separa fragmentos del texto para revisar. No emite veredictos; enlaza a la aplicación completa.
  - **El Fulbo**: PWA para la organización de partidos de fútbol amateur y generación de placas sociales.
  - **FretLabs**: Calculador CAD numérico y diseñador SVG para luthiers con exportación de medidas de trastes.
- **Perfil profesional y CV**: Modales bilingües de lectura rápida para revisar el posicionamiento, la experiencia seleccionada y el perfil de búsqueda.
- **Logotipo Animado de Automatización**: Emblema interactivo en la cabecera que simula la evaluación de rutas, toma de decisiones y redirección de flujos en tiempo real.
- **Soporte Bilingüe (Español / Inglés)**: Alternancia fluida de idioma en toda la interfaz.
- **Enlaces a productos reales**: Cada caso enlaza al repositorio y, cuando existe, a la aplicación desplegada.

---

## Actualizar proyectos del CV

Edita `src/data/portfolioData.ts` y `src/data/portfolioDataEn.ts` para mantener ambas versiones del portafolio. La modal «Ver perfil CV» y su descarga en PDF toman de cada proyecto `name`, `period`, `role`, `tagline` y `cvHighlights`; no hay una segunda lista de proyectos que actualizar.

---

## 🛠️ Stack Tecnológico

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Motion, Lucide React Icons.
- **Backend / API**: Node.js, Express, TSX, Esbuild.
- **Muestra ChecAR**: `POST /api/checar/analyze` comparte la lógica de preview entre Express y Netlify. `GET /api/health` está disponible en ambos entornos.
- **Aplicación ChecAR**: vive en [checar-v2.vercel.app](https://checar-v2.vercel.app) y mantiene su propia integración de IA.

---

## 💻 Desarrollo Local

### Requisitos Previos
- **Node.js**: v20 o superior.
- **npm**.

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

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

Para validar los endpoints y el contrato de la preview, ejecutá `npm test`. El chequeo de tipos es `npm run lint`.

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

### Opción A: Despliegue en **Netlify** (Frontend SPA + funciones de preview y salud)
Si deseas desplegarlo rápidamente como una Single Page Application (SPA):
1. Sube el código a tu repositorio de GitHub.
2. Conecta el repositorio en [Vercel](https://vercel.com) o [Netlify](https://netlify.com).
3. Configura los parámetros del proyecto:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. La preview de ChecAR funciona sin clave de IA. La aplicación completa tiene su despliegue y configuración independientes.

### Option B: Despliegue Full-Stack en **Render** / **Railway** / **Fly.io**
Para ejecutar el mismo portafolio con el servidor Node.js/Express:
1. Crea un nuevo **Web Service** en Render/Railway conectado a tu repositorio GitHub.
2. Configura los comandos:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`
3. Configura `NODE_ENV=production` en el servicio.

---

## 📬 Contacto

- **Nombre**: Ivan Valdez
- **Email**: ivnvaldz@gmail.com
- **LinkedIn**: [linkedin.com/in/ivnvaldz](https://www.linkedin.com/in/ivnvaldz/)
- **GitHub**: [github.com/ivnvaldz7](https://github.com/ivnvaldz7)
