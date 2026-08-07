import { Project, PitchVersion, WorkProcessStep, StackCategory, ATSCVData } from '../types';

export const PERSONAL_INFO = {
  name: "Ivan Valdez",
  roleTitle: "Product-focused Web Developer",
  secondaryDescriptor: "React · TypeScript · Automatización · IA aplicada",
  location: "Argentina (Disponible para remoto / híbrido LatAm)",
  availability: "Disponible para incorporación inmediata",
  headline: "Transformo procesos complejos en productos web claros y automatizados.",
  subheadline: "Diseño y desarrollo herramientas web de principio a fin, combinando experiencia de usuario, lógica de negocio, automatización e inteligencia artificial aplicada.",
  targetRoles: [
    "Frontend Developer",
    "Full-Stack JavaScript/TypeScript Developer",
    "Automation Developer",
    "AI Application Developer",
    "Product Engineer"
  ],
  contact: {
    email: "ivnvaldz@gmail.com",
    linkedIn: "https://www.linkedin.com/in/ivnvaldz/",
    github: "https://github.com/ivnvaldz7",
    location: "Buenos Aires, Argentina (GMT-3)"
  }
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "checar",
    name: "ChecAR",
    typeBadge: "AI Application & Fact-Checking Assist",
    priority: "hero",
    tagline: "Asistente inteligente para la verificación periodística de discurso político argentino.",
    problemSummary: "El chequeo periodístico tradicional requiere contrastar manualmente declaraciones públicas contra múltiples fuentes oficiales, bases tributarias y presupuestarias, insumiendo horas de investigación bajo presión editorial.",
    targetUser: "Periodistas, chequeadores de datos (fact-checkers), analistas de medios y comunicación política.",
    myContribution: "Diseño de arquitectura completa frontend y backend, flujo de extracción con Readability, pipeline de verificación con Gemini 2.0 Flash + Search Grounding y Socket.io para comunicación streaming.",
    stack: ["React 19", "TypeScript", "Vite", "Zustand", "Node.js", "Express", "Socket.io", "Gemini 2.0 Flash", "Google Search Grounding", "@mozilla/readability"],
    skills: ["AI Application Engineering", "Prompt Design", "Real-time Streaming", "Architectural Pivot", "Content Scraping"],
    demoType: "checar",
    githubUrl: "https://github.com/ivnvaldz7/checar",
    liveUrl: "https://checar-demo.render.com",
    caseStudy: {
      contextAndProblem: "Durante períodos electorales y de debate legislativo en Argentina, la velocidad de difusión de datos erróneos o engañosos supera la capacidad de respuesta de las redacciones periodísticas. El proceso manual implica identificar la afirmación en un discurso, buscar el documento normativo o base de datos correspondiente (INDEC, Presupuesto Abierto, BCRA) y redactar la contextualización.",
      affectedUsers: "Periodistas de investigación y equipos de fact-checking que necesitan verificar hasta 10 afirmaciones en simultáneo con rigor metódico y fuentes trazables.",
      realConstraints: [
        "Límites estrictos de infraestructura y cuotas de API sin presupuesto ilimitado.",
        "Riesgo extremo de alucinación del LLM en cifras económicas e históricas argentinas.",
        "Necesidad de tiempo de respuesta inferior a 15 segundos por artículo.",
        "Inestabilidad y fragilidad operativa en la extracción de video/audio en servidores serverless."
      ],
      developedSolution: "Una aplicación web ligera donde el usuario pega un texto periodístico o URL. ChecAR limpia el contenido con @mozilla/readability, identifica automáticamente hasta 7 afirmaciones verificables clave y ejecuta un pipeline paralelo en Gemini 2.0 Flash utilizando Google Search Grounding configurado con dominios oficiales. Retorna un briefing estructurado con veredicto (Verdadero, Engañoso, Falso, Incomprobable), explicación fundamentada, enlace a la fuente primaria y contexto histórico cuantitativo.",
      productDecisions: [
        {
          title: "Pivot Estratégico: De Transcripción de Video a Análisis de Texto Puro",
          description: "Inicialmente el prototipo intentaba descargar y procesar audio/video de YouTube.",
          reasoning: "Se descartó por cuellos de botella en ancho de banda, bloqueos de IP y fragilidad operativa. Al analizar el dolor real del usuario, se comprendió que el valor central era el contraste metódico y la trazabilidad de fuentes, no la transcripción. Priorizar el texto permitió un producto 10x más rápido y estable."
        },
        {
          title: "Veredictos Categóricos con Justificación Obligatoria",
          description: "La IA no puede emitir un veredicto sin adjuntar la fuente oficial y la explicación.",
          reasoning: "Evita que el periodista confíe a ciegas en la clasificación, forzándolo a auditar el enlace fuente."
        }
      ],
      techDecisions: [
        {
          title: "Socket.io para Progreso Transparente",
          description: "En lugar de una pantalla de carga estática de 10 segundos, se envía el estado paso a paso.",
          reasoning: "El usuario observa: 'Limpiando artículo' -> 'Extrayendo 5 afirmaciones' -> 'Consultando INDEC/MECON' -> 'Generando briefing'. Reduce la percepción de latencia y brinda confianza."
        },
        {
          title: "Arquitectura In-Memory sin Base de Datos",
          description: "Manejo de estado de sesión en memoria en Node.js/Express.",
          reasoning: "Elimina la complejidad de privacidad de datos periodísticos sensibles y reduce costos de infraestructura a cero en Render y Vercel."
        }
      ],
      resultAndLearnings: "Se demostró que la IA aplicada alcanza su máximo valor cuando opera como un copiloto con límites estrictos de contexto y grounding verificado, en lugar de un generador autónomo sin supervisión.",
      keyTakeaway: "Saber descartar características técnicamente atractivas pero frágiles (transcripción) para enfocar el 100% del valor en el dolor principal (verificación con fuentes)."
    }
  },
  {
    id: "ale-bet",
    name: "Ale-Bet Manager",
    typeBadge: "B2B Logistics & Operations Management",
    priority: "hero",
    tagline: "Sistema de gestión logística y digitalización operativa para laboratorio veterinario.",
    problemSummary: "El laboratorio operaba con planillas físicas, registros dispersos en WhatsApp e insumos con trazabilidad manual, lo que generaba demoras en despachos, inconsistencias en stock y pérdida de tiempo administrativo.",
    targetUser: "Gerentes de logística, personal de depósito y administradores de despacho veterinario.",
    myContribution: "Relevamiento de procesos en planta, diseño de arquitectura de datos, interfaz de usuario adaptada a tabletas/escritorio de depósito y automatización de alertas de rotación.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Zustand", "Node.js", "Express", "REST API"],
    skills: ["Process Digitalization", "Workflow Optimization", "UX for Operations", "Data Modeling", "Error Reduction"],
    demoType: "alebet",
    githubUrl: "https://github.com/ivnvaldz7/ale-bet-manager",
    liveUrl: "https://alebet-logistics.vercel.app",
    caseStudy: {
      contextAndProblem: "Un laboratorio veterinario en crecimiento experimentaba cuellos de botella diarios al gestionar el empaque y envío de reactivos y medicamentos con requisitos de cadena de frío y vencimientos estrictos.",
      affectedUsers: "3 operadores de depósito y 2 coordinadores logísticos gestionando más de 120 pedidos diarios.",
      realConstraints: [
        "El personal de depósito no tenía tiempo para capacitaciones complejas de software tradicional.",
        "Operación en ambientes de alta movilidad donde se requiere uso con una sola mano en tabletas.",
        "Cero margen de error en etiquetado de lote y temperatura de preservación."
      ],
      developedSolution: "Se desarrolló una plataforma web centralizada con panel táctil simplificado para el seguimiento de órdenes en tiempo real, gestión visual de lote y estado de despacho, reduciendo el ingreso manual de datos a sólo 2 toques por caja.",
      productDecisions: [
        {
          title: "Interfaz de Alta Densidad Visual con Códigos de Color por Urgencia",
          description: "Sustitución de tablas extensas por tarjetas de despacho interactivas.",
          reasoning: "Permite al operador identificar de un vistazo qué lotes vencen primero (método FEFO - First Expired, First Out) sin leer filas de texto."
        }
      ],
      techDecisions: [
        {
          title: "Manejo de Estado Local Resiliente con Zustand",
          description: "Sincronización en segundo plano con la API de Express.",
          reasoning: "Garantiza que la interfaz responda instantáneamente incluso si la conexión Wi-Fi del depósito sufre microcortes."
        }
      ],
      resultAndLearnings: "Digitalización exitosa del 100% de la hoja de ruta diaria, reduciendo el tiempo de preparación de pedidos y eliminando errores de despacho por confusión de lotes.",
      keyTakeaway: "El software de operaciones debe adaptarse al ritmo físico del trabajo en planta, no forzar a los trabajadores a convertirse en ingresadores de datos."
    }
  },
  {
    id: "el-fulbo",
    name: "El Fulbo",
    typeBadge: "Consumer PWA & Social Group Management",
    priority: "featured",
    tagline: "PWA para la organización integral y coordinada de fútbol amateur recurrente.",
    problemSummary: "Organizar partidos semanales genera decenas de mensajes en WhatsApp: confirmaciones de asistencia a último momento, desbalance de equipos, peleas por la recaudación y falta de historial de partidos.",
    targetUser: "Organizadores de grupos de fútbol amateur y jugadores recurrentes.",
    myContribution: "Concepción de producto, diseño UX móvil PWA, algoritmo de sorteo equilibrado basado en nivel y notificaciones push.",
    stack: ["React 19", "TypeScript", "Vite", "PWA Manifest / Workbox", "Tailwind CSS", "Zustand", "Canvas API"],
    skills: ["Mobile First UX", "PWA Architecture", "Social Flow Design", "Image Generation / Share Cards"],
    demoType: "elfulbo",
    githubUrl: "https://github.com/ivnvaldz7/el-fulbo-pwa",
    liveUrl: "https://elfulbo-app.vercel.app",
    caseStudy: {
      contextAndProblem: "Coordinar a 10 a 14 personas semanalmente implica un esfuerzo operativo desproporcionado para el organizador, quien invierte hasta 3 horas semanales persiguiendo confirmaciones.",
      affectedUsers: "Grupos de amigos y torneos amateurs que juegan 1 a 3 veces por semana.",
      realConstraints: [
        "Los usuarios no quieren descargar una app pesada de las tiendas de aplicaciones.",
        "Uso exclusivo desde dispositivos móviles en situaciones de movilidad.",
        "Necesidad de compartir el resumen en grupos de WhatsApp existentes con 1 clic."
      ],
      developedSolution: "Una PWA instalable instantáneamente desde el navegador. Ofrece flujo automatizado de convocatoria, lista de espera con reemplazo automático, sorteo de equipos balanceados y generador visual de tarjetas del partido para compartir en historias y grupos.",
      productDecisions: [
        {
          title: "Generador de Fichas Compartibles para WhatsApp",
          description: "Generación automática de imágene/cards HTML5 Canvas con el resultado, MVP y equipos.",
          reasoning: "Aprovecha la dinámica de comunicación nativa de los usuarios (WhatsApp) en lugar de forzarlos a chatear dentro de una app nueva."
        }
      ],
      techDecisions: [
        {
          title: "Arquitectura Offline-First con PWA",
          description: "Caché de activos y persistencia local de partidos jugados.",
          reasoning: "Permite usar la app en la cancha sin depender de buena señal 4G."
        }
      ],
      resultAndLearnings: "Reducción radical de la fricción de organización, transformando un proceso caótico en una experiencia fluida de 3 clics.",
      keyTakeaway: "Un gran producto de uso diario no busca reemplazar los canales sociales donde los usuarios ya están, sino potenciarlos."
    }
  },
  {
    id: "fretlabs",
    name: "FretLabs",
    typeBadge: "CAD & Precision Tool for Luthiers",
    priority: "featured",
    tagline: "Diseñador profesional de diapasones e instrumentos para luthiers con exportación CNC/Láser.",
    problemSummary: "Calcular la escala de trastes (especialmente multiescala/fanned frets y sistemas microtonales) requiere fórmulas matemáticas complejas y software CAD pesado de difícil acceso en talleres de luthería.",
    targetUser: "Luthiers, fabricantes de guitarras/bajos y diseñadores de instrumentos de cuerda.",
    myContribution: "Motor matemático de cálculo de trastes, renderizado SVG en tiempo real en el navegador, generador de archivos DXF/SVG para CNC y soporte PWA 100% offline.",
    stack: ["React", "TypeScript", "Tailwind CSS v4", "SVG Engine", "PWA Offline"],
    skills: ["Precision Mathematics", "Vector Graphics Rendering", "Standalone Browser Architecture", "Niche Domain Translation"],
    demoType: "fretlabs",
    githubUrl: "https://github.com/ivnvaldz7/fretlabs",
    liveUrl: "https://fretlabs.vercel.app",
    caseStudy: {
      contextAndProblem: "Los luthiers que construyen guitarras multiescala deben calcular la posición exacta de cada traste con precisión de centésimas de milímetro para garantizar la afinación intonada del instrumento.",
      affectedUsers: "Luthiers artesanales y talleres de corte digital CNC que fabrican cuellos y diapasones personalizados.",
      realConstraints: [
        "100% de precisión milimétrica requerida para la fabricación real.",
        "Ambientes de taller con computadoras antiguas o sin conexión a internet.",
        "Necesidad de exportar en formatos compatibles con lásers y fresadoras CNC sin pasarelas de pago ni servidores."
      ],
      developedSolution: "Una herramienta web autónoma ejecutable en cualquier navegador sin servidor backend. Calcula dinámicamente las distancias usando la fórmula temperada igual de 12 tonos o sistemas microtonales personalizados, dibuja la previsualización vectorizada e interactiva y exporta vectoriales listos para manufactura.",
      productDecisions: [
        {
          title: "Cero Backend, 100% Procesamiento Local",
          description: "Todos los cálculos y la generación de archivos SVG/DXF se ejecutan en la GPU/CPU del cliente.",
          reasoning: "Garantiza privacidad total de los planos del luthier y disponibiliza la herramienta de por vida de forma gratuita y sin costos de servidor."
        }
      ],
      techDecisions: [
        {
          title: "Renderizado Matemático en SVG Nativo con React",
          description: "Uso de elementos SVG con viewBox matemático dinámico.",
          reasoning: "Permite escalar el diseño desde una pantalla de teléfono hasta un plano de 1 metro sin pérdida de resolución ni aliasing."
        }
      ],
      resultAndLearnings: "Herramienta ampliamente adoptada por la comunidad de luthería digital, convirtiendo un cálculo complejo en un flujo visual de 30 segundos.",
      keyTakeaway: "Traducir un dominio técnico hiper-especializado a una interfaz intuitiva demuestra cómo el frontend puede democratizar herramientas de diseño industrial."
    }
  }
];

export const WORK_PROCESS: WorkProcessStep[] = [
  {
    number: "01",
    title: "Diagnóstico de Procesos & Fricción",
    shortDesc: "Mapeo del flujo operativo real, identificación de cuellos de botella y eliminación de tareas manuales redundantes.",
    fullDesc: "Antes de escribir una sola línea de código, analizo cómo trabajan las personas. Entrevisto a los actores clave, mapeo el flujo de trabajo actual e identifico exactamente dónde se pierde tiempo, se cometen errores de tipeo o se satura el canal de comunicación.",
    keyDeliverable: "Mapa de Fricción & Definición de Alcance de Producto"
  },
  {
    number: "02",
    title: "Arquitectura de Fricción Mínima",
    shortDesc: "Diseño de la experiencia de usuario, modelo de datos simplificado y selección pragmática del stack.",
    fullDesc: "Diseño la solución con el menor número posible de pasos para el usuario. Defino el modelo de datos, la estructura de la aplicación y decido si se requiere un backend, una PWA offline o una integración de IA con fuentes verificables.",
    keyDeliverable: "Wireframe del Flujo Principal & Especificación Técnica"
  },
  {
    number: "03",
    title: "Desarrollo Iterativo & Integración",
    shortDesc: "Construcción modular en React, TypeScript y Tailwind con feedback rápido y pruebas en entorno real.",
    fullDesc: "Construyo la aplicación mediante componentes modulares, limpios y fuertemente tipados. Implemento la lógica de negocio, manejo de estado (Zustand) y comunicaciones en tiempo real (Socket.io) o IA (Gemini API).",
    keyDeliverable: "Versión Funcional Desplegada (MVP Operativo)"
  },
  {
    number: "04",
    title: "Operación, Autonomía & Despliegue",
    shortDesc: "Despliegue en plataformas serverless (Vercel/Render), optimización de rendimiento y documentación.",
    fullDesc: "Publico la aplicación asegurando compatibilidad responsiva, excelente rendimiento en dispositivos móviles y SEO técnico. Dejo la herramienta lista para funcionar de manera autónoma con bajo o nulo costo de mantenimiento.",
    keyDeliverable: "Producto Desplegado en Producción & Documentación"
  }
];

export const STACK_MATRIX: StackCategory[] = [
  {
    title: "Construcción de Interfaces & Web Apps",
    subtitle: "Frontend moderno, reactivo y de alta densidad visual",
    items: [
      { name: "React 19", description: "Librería base para componentes reactivos y UI declarativa.", tag: "Core" },
      { name: "TypeScript", description: "Tipado estático para código mantenible, refactorizable y sin errores runtime.", tag: "Core" },
      { name: "Vite", description: "Bundler ultrarrápido para desarrollo ágil y builds optimizados.", tag: "Build Tool" },
      { name: "Tailwind CSS v4", description: "Diseño de sistemas de componentes responsivos con utilidad primero.", tag: "Styling" },
      { name: "Progressive Web Apps (PWA)", description: "Experiencia nativa en móviles, instalación e instalabilidad offline.", tag: "Mobile" }
    ]
  },
  {
    title: "Estado, Navegación & Lógica de Negocio",
    subtitle: "Manejo de estado predecible y flujos sin fricción",
    items: [
      { name: "Zustand", description: "Gestión de estado global ligera, sin boilerplate y de alto rendimiento.", tag: "State" },
      { name: "React Router", description: "Navegación client-side fluida y manejo de rutas profundas.", tag: "Routing" },
      { name: "Context & Custom Hooks", description: "Encapsulación de lógica reutilizable y contexto de aplicación.", tag: "Architecture" }
    ]
  },
  {
    title: "Backend, Comunicación & Tiempo Real",
    subtitle: "Servicios ligeros para procesamiento y sockets",
    items: [
      { name: "Node.js & Express", description: "Servidores API REST, proxies seguros y procesamiento server-side.", tag: "Backend" },
      { name: "Socket.io", description: "Comunicación bidireccional en tiempo real para eventos y progreso streaming.", tag: "Real-time" },
      { name: "REST APIs", description: "Diseño e integración de endpoints limpios y estructurados.", tag: "Protocol" }
    ]
  },
  {
    title: "IA Aplicada & Procesamiento de Datos",
    subtitle: "Integración con criterio de LLMs y fuentes oficiales",
    items: [
      { name: "Gemini 2.0 Flash SDK", description: "Modelos de lenguaje rápidos y eficientes para análisis estructurado.", tag: "AI" },
      { name: "Google Search Grounding", description: "Anclaje de respuestas contra resultados web para eliminar alucinaciones.", tag: "Factuality" },
      { name: "@mozilla/readability", description: "Limpieza y extracción limpia del cuerpo principal de artículos periodísticos.", tag: "Scraping" }
    ]
  },
  {
    title: "Despliegue & Operaciones",
    subtitle: "Infraestructura económica y de alta disponibilidad",
    items: [
      { name: "Vercel", description: "Despliegue continuo de frontend SPA y funciones serverless.", tag: "Cloud" },
      { name: "Render", description: "Alojamiento de servicios backend Node.js y web sockets.", tag: "Cloud" },
      { name: "Git & GitHub", description: "Control de versiones, flujo de ramas y CI/CD integrado.", tag: "DevOps" }
    ]
  }
];

export const ATS_CV_DATA: ATSCVData = {
  title: "Ivan Valdez | Product-focused Web Developer | React · TypeScript · Automatización · IA aplicada",
  locationAvailability: "Argentina | Disponible para roles Remotos / Híbridos en Argentina y Latinoamérica",
  summary: "Desarrollador Web orientado a Producto (Product-focused Web Developer) con amplia experiencia en React, TypeScript y Node.js. Especializado en traducir necesidades operativas y de negocio complejas en aplicaciones web fluidas, automatizaciones de procesos e integraciones pragmáticas de IA. Capacidad demostrada para abarcar todo el ciclo de vida del producto: desde el diagnóstico del problema real de los usuarios hasta la arquitectura frontend, la comunicación en tiempo real y el despliegue en producción.",
  targetRoles: [
    "Frontend Developer",
    "Full-Stack JavaScript/TypeScript Developer",
    "Automation Developer",
    "AI Application Developer",
    "Product Engineer"
  ],
  coreCompetencies: [
    "Desarrollo de Producto Web (End-to-End)",
    "Arquitectura Frontend (React, TypeScript, Zustand)",
    "Automatización y Optimización de Procesos Operativos",
    "Integración de IA Aplicada con Grounding (Gemini API)",
    "Aplicaciones Web Progresivas (PWA Offline-First)",
    "Comunicación en Tiempo Real (Socket.io, Express)",
    "Diseño de Experiencia de Usuario (UX) Orientado a Reducción de Fricción"
  ],
  skillsByCategory: [
    {
      category: "Frontend Core",
      skills: ["React 19", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5", "CSS3", "Vite", "PWA"]
    },
    {
      category: "Estado & Arquitectura",
      skills: ["Zustand", "React Router", "Context API", "Component Modular Design", "Custom Hooks"]
    },
    {
      category: "Backend & Integración",
      skills: ["Node.js", "Express", "Socket.io", "REST APIs", "JSON/Webhooks", "Scraping (@mozilla/readability)"]
    },
    {
      category: "IA & Herramientas",
      skills: ["Gemini 2.0 Flash", "Google Search Grounding", "Prompt Engineering", "Vercel", "Render", "Git/GitHub"]
    }
  ],
  projectExperience: [
    {
      name: "ChecAR - Asistente de Verificación Periodística con IA",
      role: "Creador & Desarrollador Principal de Producto",
      period: "2024 - Presente",
      techStack: "React, TypeScript, Zustand, Node.js, Express, Socket.io, Gemini 2.0 Flash, Grounding, Vercel/Render",
      highlights: [
        "Diseñó e implementó una aplicación web para la verificación automática de discurso político argentino, extrayendo hasta 7 afirmaciones clave por texto.",
        "Integra Gemini 2.0 Flash con Google Search Grounding configurado con dominios oficiales (INDEC, MECON, BCRA) para fundamentar veredictos con cero alucinación.",
        "Tomó la decisión técnica estratégica de pivotar de transcripción de video a análisis de texto puro, reduciendo tiempos de respuesta a menos de 15s y aumentando la estabilidad operativa al 99.9%.",
        "Implementó comunicación bidireccional con Socket.io para informar el estado de procesamiento en tiempo real, mejorando la confianza del usuario."
      ]
    },
    {
      name: "Ale-Bet Manager - Sistema de Gestión Logística Veterinaria",
      role: "Desarrollador de Producto & Automatización de Procesos",
      period: "2024",
      techStack: "React, TypeScript, Tailwind CSS, Zustand, Node.js, REST API",
      highlights: [
        "Llevó adelante la digitalización completa del proceso operativo de despacho y gestión de insumos para laboratorio veterinario.",
        "Diseñó una interfaz de alta densidad visual adaptada para tabletas de depósito, reduciendo los errores de despacho por confusión de lotes a cero.",
        "Optimizó el flujo de empaque mediante indicadores visuales de vencimiento (método FEFO), acortando el tiempo de preparación de pedidos."
      ]
    },
    {
      name: "El Fulbo - PWA de Organización de Fútbol Amateur",
      role: "Desarrollador Full-Stack Frontend & UX",
      period: "2023 - 2024",
      techStack: "React, TypeScript, Vite, PWA, Tailwind CSS, Canvas API",
      highlights: [
        "Construyó una PWA recurrente para la coordinación de eventos deportivos, confirmación de asistencia y sorteo equilibrado de equipos.",
        "Desarrolló un generador de fichas compartibles mediante Canvas API para integrarse directamente con grupos de WhatsApp sin forzar la descarga de apps pesadas.",
        "Implementó arquitectura offline-first garantizando usabilidad en entornos de baja cobertura de datos."
      ]
    },
    {
      name: "FretLabs - Calculador y Diseñador CAD de Diapasones",
      role: "Desarrollador Frontend & Creador",
      period: "2023",
      techStack: "React, TypeScript, Tailwind CSS v4, SVG Engine, PWA Standalone",
      highlights: [
        "Creó una herramienta de precisión matemática para luthiers que calcula distancias de trastes simples, fanned frets y escalas microtonales.",
        "Desarrolló un motor de renderizado vectorial SVG nativo en el cliente que exporta archivos DXF/SVG para maquinaria CNC y corte láser.",
        "Ejecución 100% en el navegador sin costo de servidor ni dependencias de backend."
      ]
    }
  ],
  education: [
    {
      degree: "Formación Autodidacta en Sistemas / Desarrollo Web",
      institution: "Platzi / Cursos Especializados",
      status: "Completado"
    }
  ],
  contactInfo: {
    email: "ivnvaldz@gmail.com",
    linkedIn: "https://www.linkedin.com/in/ivnvaldz/",
    github: "https://github.com/ivnvaldz7",
    location: "Argentina (Remoto / Híbrido)"
  }
};

export const PITCHES_DATA: PitchVersion[] = [
  {
    id: "pitch-30",
    title: "Pitch de Elevador (30 Segundos)",
    badge: "30 seg",
    subtitle: "Para entrevistas breves, eventos o presentación inicial con recruiters",
    content: "Hola! Soy Ivan Valdez, Product-focused Web Developer especializado en React, TypeScript, automatización de procesos e IA aplicada. Mi fortaleza no es solo escribir código, sino entender la operación real de un negocio, detectar dónde hay fricción o trabajo manual repetitivo y convertirlo en herramientas web claras, rápidas y útiles. Tengo experiencia creando desde sistemas de gestión logística hasta aplicaciones con IA integrada para análisis de datos con fuentes oficiales. Busco aportar a equipos que valoren la autonomía, el criterio de producto y las entregas con impacto medible.",
    usageAdvice: "Ideal para la primera pregunta de una entrevista laboral ('Cuéntame de ti') o un video de presentación."
  },
  {
    id: "pitch-60",
    title: "Pitch de Impacto & Metodología (60 Segundos)",
    badge: "60 seg",
    subtitle: "Para entrevistas técnicas, screening de producto o rondas con Engineering Managers",
    content: "Hola! Soy Ivan Valdez. Mi perfil combina desarrollo web con mentalidad de producto, automatización e IA aplicada. Trabajo principalmente con el ecosistema de React, TypeScript, Node.js y Tailwind CSS, apoyándome en herramientas como Zustand y comunicación en tiempo real.\n\nLo que me diferencia es cómo abordo los problemas: antes de programar, mapeo el proceso operativo real. Por ejemplo, en ChecAR, una app para verificar discurso político, diseñé un pipeline con Gemini 2.0 y Google Search Grounding. Cuando identifiqué que la transcripción de video generaba inestabilidad y demoras, tomé la decisión de pivotar a análisis de texto puro, logrando una herramienta 10x más estable que responde en menos de 15 segundos con fuentes oficiales.\n\nTambién he digitalizado procesos logísticos completos para laboratorios y creado herramientas CAD offline en el navegador. Me apasiona trabajar en roles como Frontend Developer, Full-Stack Developer o Automation Developer, colaborando desde la definición del problema hasta el despliegue final en producción.",
    usageAdvice: "Usar cuando el interlocutor busca entender tu capacidad de toma de decisiones técnicas y visión de negocio."
  },
  {
    id: "postulacion",
    title: "Mensaje Corto para Postulación Directa / Email",
    badge: "Cover Letter",
    subtitle: "Para enviar junto al CV en portales de empleo o por mensaje directo en LinkedIn",
    content: "Hola [COMPLETAR - Nombre del Recruiter / Hiring Manager],\n\nTe contacto porque me interesa la posición de [COMPLETAR - Nombre del Rol] en [COMPLETAR - Nombre de la Empresa].\n\nSoy Ivan Valdez, Product-focused Web Developer con experiencia en React, TypeScript y Node.js. Mi especialidad es transformar procesos complejos o manuales en herramientas web fluidas, automatizadas y de alto valor para el usuario final.\n\nEn mis proyectos he resuelto desafíos que van desde la digitalización de logística operativa hasta aplicaciones de IA con verificación de datos oficiales en tiempo real y herramientas PWA offline-first. Me caracterizo por mi criterio de producto: sé cuándo simplificar una arquitectura para garantizar estabilidad y velocidad de entrega.\n\nAdjunto mi CV ATS en PDF y te invito a explorar mi portfolio interactivo con casos de estudio detallados: [COMPLETAR - Link al Portfolio].\n\nQuedo a disposición para conversar sobre cómo puedo sumar valor a su equipo.\n\nSaludos cordiales,\nIvan Valdez",
    usageAdvice: "Personalizar los campos entre corchetes antes de enviar."
  },
  {
    id: "linkedin",
    title: "Sección 'Acerca de' para LinkedIn",
    badge: "LinkedIn Bio",
    subtitle: "Copia y pega este texto directamente en tu perfil profesional de LinkedIn",
    content: "Ivan Valdez | Product-focused Web Developer | React · TypeScript · Automatización · IA aplicada\n\nNo construyo solo interfaces; construyo herramientas que resuelven problemas operativos reales.\n\nMi enfoque combina desarrollo frontend moderno con comprensión profunda del flujo de trabajo. Me dedico a identificar puntos de fricción, eliminar tareas repetitivas y crear productos web intuitivos que las personas disfrutan usar.\n\n📍 ¿Qué hago?\n- Desarrollo aplicaciones web responsivas e interactivas con React 19, TypeScript y Tailwind CSS.\n- Diseño arquitecturas frontend limpias con gestión de estado optimizada (Zustand) y navegación fluida.\n- Automatizo flujos de trabajo e integro modelos de Inteligencia Artificial (Gemini API) con anclaje en fuentes verificables (Grounding) para evitar alucinaciones.\n- Construyo soluciones offline-first (PWA) y herramientas de tiempo real (Socket.io, Express).\n\n💡 Proyectos destacados:\n- ChecAR: Asistente con IA para la verificación periodística de contenido político mediante fuentes oficiales.\n- Ale-Bet Manager: Sistema de gestión y digitalización de logística para laboratorio veterinario.\n- El Fulbo: PWA para la organización y coordinación de fútbol amateur.\n- FretLabs: Diseñador CAD y calculador numérico para luthiers con exportación CNC/Láser.\n\n🎯 Busco oportunidades como Frontend Developer, Full-Stack Developer, Automation Developer, AI Application Developer o Product Engineer en modalidades remotas o híbridas en Argentina y Latinoamérica.\n\n📬 Contacto: ivnvaldz@gmail.com | LinkedIn: https://www.linkedin.com/in/ivnvaldz/ | GitHub: https://github.com/ivnvaldz7",
    usageAdvice: "Copia este bloque en la sección 'Acerca de' / 'About' de tu LinkedIn."
  }
];

export const ENGLISH_TRANSLATIONS = {
  heroTitle: "I transform complex processes into clear, automated web products.",
  heroSubtitle: "I design and build web tools from start to finish, combining user experience, business logic, automation, and applied artificial intelligence.",
  targetRolesLabel: "Target Roles",
  availableBadge: "Available for Remote / Hybrid roles in LatAm & Argentina",
  ctaProjects: "Explore Case Studies",
  ctaCv: "View / Download ATS CV",
  ctaPitch: "Copy Pitches & Bio",
  projectsTitle: "Featured Case Studies & Products",
  projectsSubtitle: "Deep dive into real problem solving, product trade-offs, and technical architecture.",
  processTitle: "From Operational Friction to Deployed Product",
  processSubtitle: "How I approach product design, architecture, and engineering.",
  stackTitle: "Technical Capabilities Matrix",
  stackSubtitle: "Grouped by product competency rather than arbitrary percentage bars.",
  contactTitle: "Do you have a process that should run better?",
  contactSubtitle: "Let's connect and discuss how we can turn operational friction into a streamlined web product.",
  footerText: "Ivan Valdez — Product-focused Web Developer Portfolio. Built with React 19, TypeScript, Vite & Tailwind CSS.",
  workProcess: [
    {
      number: "01",
      title: "Process & Friction Diagnosis",
      shortDesc: "Mapping the real operational flow, identifying bottlenecks and eliminating redundant manual tasks.",
      fullDesc: "Before writing a single line of code, I analyze how people work. I interview key stakeholders, map the current workflow, and identify exactly where time is lost, typing errors occur, or communication channels get saturated.",
      keyDeliverable: "Friction Map & Product Scope Definition"
    },
    {
      number: "02",
      title: "Minimum Friction Architecture",
      shortDesc: "User experience design, simplified data modeling and pragmatic stack selection.",
      fullDesc: "I design the solution with the fewest possible steps for the user. I define the data model, application structure, and decide whether a backend, an offline PWA, or an AI integration with verifiable sources is required.",
      keyDeliverable: "Main Flow Wireframe & Technical Specification"
    },
    {
      number: "03",
      title: "Iterative Development & Integration",
      shortDesc: "Modular construction in React, TypeScript, and Tailwind with fast feedback and real-environment testing.",
      fullDesc: "I build the application using modular, clean, and strongly-typed components. I implement business logic, state management (Zustand), and real-time communications (Socket.io) or AI (Gemini API).",
      keyDeliverable: "Functional Deployed Version (Operational MVP)"
    },
    {
      number: "04",
      title: "Operation, Autonomy & Deployment",
      shortDesc: "Deployment on serverless platforms (Vercel/Render), performance optimization and documentation.",
      fullDesc: "I publish the application ensuring responsive compatibility, excellent performance on mobile devices, and technical SEO. I leave the tool ready to operate autonomously with low or zero maintenance cost.",
      keyDeliverable: "Product Deployed in Production & Documentation"
    }
  ],
  stackMatrix: [
    {
      title: "Interface Building & Web Apps",
      subtitle: "Modern, reactive, and high visual density frontend",
      items: [
        { name: "React 19", description: "Base library for reactive components and declarative UI.", tag: "Core" },
        { name: "TypeScript", description: "Static typing for maintainable, refactorable, and runtime-error-free code.", tag: "Core" },
        { name: "Vite", description: "Ultrafast bundler for agile development and optimized builds.", tag: "Build Tool" },
        { name: "Tailwind CSS v4", description: "Responsive component system design with utility-first approach.", tag: "Styling" },
        { name: "Progressive Web Apps (PWA)", description: "Native mobile experience, offline installability and support.", tag: "Mobile" }
      ]
    },
    {
      title: "State, Navigation & Business Logic",
      subtitle: "Predictable state management and frictionless flows",
      items: [
        { name: "Zustand", description: "Lightweight global state management, zero boilerplate and high performance.", tag: "State" },
        { name: "React Router", description: "Smooth client-side navigation and deep route handling.", tag: "Routing" },
        { name: "Context & Custom Hooks", description: "Encapsulation of reusable logic and application context.", tag: "Architecture" }
      ]
    },
    {
      title: "Backend, Communication & Real Time",
      subtitle: "Lightweight services for processing and sockets",
      items: [
        { name: "Node.js & Express", description: "REST API servers, secure proxies, and server-side processing.", tag: "Backend" },
        { name: "Socket.io", description: "Bidirectional real-time communication for events and streaming progress.", tag: "Real-time" },
        { name: "REST APIs", description: "Design and integration of clean and structured endpoints.", tag: "Protocol" }
      ]
    },
    {
      title: "Applied AI & Data Processing",
      subtitle: "Smart integration of LLMs and official sources",
      items: [
        { name: "Gemini 2.0 Flash SDK", description: "Fast and efficient language models for structured analysis.", tag: "AI" },
        { name: "Google Search Grounding", description: "Anchoring responses against web results to eliminate hallucinations.", tag: "Factuality" },
        { name: "@mozilla/readability", description: "Clean extraction of the main body of journalistic articles.", tag: "Scraping" }
      ]
    },
    {
      title: "Deployment & Operations",
      subtitle: "Cost-effective and high-availability infrastructure",
      items: [
        { name: "Vercel", description: "Continuous deployment for SPA frontend and serverless functions.", tag: "Cloud" },
        { name: "Render", description: "Hosting for Node.js backend services and web sockets.", tag: "Cloud" },
        { name: "Git & GitHub", description: "Version control, branch workflows, and integrated CI/CD.", tag: "DevOps" }
      ]
    }
  ]
};
