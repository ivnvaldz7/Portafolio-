import { Project } from '../types';

export const PROJECTS_DATA_EN: Project[] = [
  {
    id: "checar",
    name: "ChecAR",
    typeBadge: "AI Application & Fact-Checking Assist",
    priority: "hero",
    tagline: "Smart assistant for journalistic fact-checking of Argentine political discourse.",
    problemSummary: "Traditional fact-checking requires manually contrasting public statements against multiple official sources, tax, and budget databases, consuming hours of research under editorial pressure.",
    targetUser: "Journalists, fact-checkers, media analysts, and political communication teams.",
    myContribution: "Complete frontend and backend architecture design, extraction flow with Readability, verification pipeline with Gemini 2.5 Flash + Search Grounding, and Socket.io for streaming communication.",
    period: "2025 - Present", 
    role: "Creator & Lead Product Developer", 
    cvHighlights: [
      "Designed and implemented a web application for automatic verification of Argentine political discourse, extracting up to 7 key claims per text.",
      "Integrated Gemini 2.5 Flash with Google Search Grounding to support verdicts with sources users can review.",
      "Made the strategic technical decision to pivot from video transcription to pure text analysis, reducing response times to under 15s and increasing operational stability to 99.9%.",
      "Implemented bidirectional communication with Socket.io to report processing status in real-time, improving user trust."
    ], 
    stack: ["React 19", "TypeScript", "Vite", "Zustand", "Node.js", "Express", "Socket.io", "Gemini 2.5 Flash", "Google Search Grounding", "@mozilla/readability"],
    skills: ["AI Application Engineering", "Prompt Design", "Real-time Streaming", "Architectural Pivot", "Content Scraping"],
    demoType: "checar",
    githubUrl: "https://github.com/ivnvaldz7/checar",
    liveUrl: "https://checar-v2.vercel.app",
    caseStudy: {
      contextAndProblem: "During electoral periods and legislative debates in Argentina, the speed of dissemination of erroneous or misleading data exceeds the response capacity of newsrooms. The manual process involves identifying the claim in a speech, finding the corresponding regulatory document or database (INDEC, Open Budget, BCRA), and writing the contextualization.",
      affectedUsers: "Investigative journalists and fact-checking teams who need to verify up to 10 claims simultaneously with methodical rigor and traceable sources.",
      realConstraints: [
        "Strict infrastructure limits and API quotas without unlimited budgets.",
        "Extreme risk of LLM hallucinations on Argentine economic and historical figures.",
        "Need for a response time of under 15 seconds per article.",
        "Operational instability and fragility in video/audio extraction on serverless servers."
      ],
      developedSolution: "A lightweight web application where the user pastes a news text. ChecAR cleans the content with @mozilla/readability, automatically identifies up to 7 key verifiable claims, and runs a parallel pipeline in Gemini 2.5 Flash using Google Search Grounding. It returns a structured briefing with a verdict (True, Misleading, False, Untestable), grounded explanation, link to a source, and quantitative historical context.",
      productDecisions: [
        {
          title: "Strategic Pivot: From Video Transcription to Pure Text Analysis",
          description: "Initially, the prototype attempted to download and process YouTube audio/video.",
          reasoning: "It was discarded due to bandwidth bottlenecks, IP blocks, and operational fragility. By analyzing the real user pain, it was understood that the core value was the methodical contrast and traceability of sources, not the transcription. Prioritizing text allowed for a 10x faster and more stable product."
        },
        {
          title: "Categorical Verdicts with Mandatory Justification",
          description: "The AI cannot issue a verdict without attaching the official source and explanation.",
          reasoning: "Prevents the journalist from blindly trusting the classification, forcing them to audit the source link."
        }
      ],
      techDecisions: [
        {
          title: "Socket.io for Transparent Progress",
          description: "Instead of a static 10-second loading screen, step-by-step status is sent.",
          reasoning: "The user observes: 'Cleaning article' -> 'Extracting 5 claims' -> 'Consulting INDEC/MECON' -> 'Generating briefing'. It reduces perceived latency and builds trust."
        },
        {
          title: "In-Memory Architecture without Database",
          description: "Session state management in memory on Node.js/Express.",
          reasoning: "Eliminates the privacy complexity of sensitive journalistic data and reduces infrastructure costs to zero on Render and Vercel."
        }
      ],
      resultAndLearnings: "It proved that applied AI reaches its maximum value when it operates as a copilot with strict context limits and verified grounding, rather than an unsupervised autonomous generator.",
      keyTakeaway: "Knowing when to discard technically attractive but fragile features (transcription) to focus 100% of the value on the main pain point (verification with sources)."
    }
  },
  {
    id: "el-fulbo",
    name: "El Fulbo",
    typeBadge: "Consumer PWA & Social Group Management",
    priority: "featured",
    tagline: "PWA for the comprehensive and coordinated organization of recurring amateur soccer.",
    problemSummary: "Organizing weekly matches generates dozens of WhatsApp messages: last-minute RSVPs, unbalanced teams, fights over fee collection, and a lack of match history.",
    targetUser: "Organizers of amateur soccer groups and recurring players.",
    myContribution: "Product conception, mobile PWA UX design, balanced draw algorithm based on skill level, and push notifications.",
    period: "2026", 
    role: "Full-Stack Frontend & UX Developer", 
    cvHighlights: [
      "Built a recurring PWA for sports event coordination, RSVP management, and balanced team draws.",
      "Developed a shareable card generator using the Canvas API to integrate directly with WhatsApp groups without forcing heavy app downloads.",
      "Implemented an offline-first architecture to guarantee usability in low data coverage environments."
    ], 
    stack: ["React 19", "TypeScript", "Vite", "PWA Manifest / Workbox", "Tailwind CSS", "Zustand", "Canvas API"],
    skills: ["Mobile First UX", "PWA Architecture", "Social Flow Design", "Image Generation / Share Cards"],
    demoType: "elfulbo",
    githubUrl: "https://github.com/ivnvaldz7/el-fulbo",
    liveUrl: "https://el-fulbo.vercel.app",
    caseStudy: {
      contextAndProblem: "Coordinating 10 to 14 people weekly implies a disproportionate operational effort for the organizer, who invests up to 3 hours a week chasing confirmations.",
      affectedUsers: "Groups of friends and amateur tournaments who play 1 to 3 times a week.",
      realConstraints: [
        "Users don't want to download a heavy app from the app stores.",
        "Exclusive use from mobile devices in mobility situations.",
        "Need to share the summary in existing WhatsApp groups with 1 click."
      ],
      developedSolution: "An instantly installable PWA from the browser. It offers an automated call flow, a waitlist with automatic replacement, a draw for balanced teams, and a visual match card generator for sharing on stories and groups.",
      productDecisions: [
        {
          title: "Shareable Card Generator for WhatsApp",
          description: "Automatic generation of images/HTML5 Canvas cards with the result, MVP, and teams.",
          reasoning: "Leverages the users' native communication dynamics (WhatsApp) instead of forcing them to chat inside a new app."
        }
      ],
      techDecisions: [
        {
          title: "Offline-First Architecture with PWA",
          description: "Asset caching and local persistence of played matches.",
          reasoning: "Allows using the app on the field without relying on a strong 4G signal."
        }
      ],
      resultAndLearnings: "Radical reduction of organizational friction, transforming a chaotic process into a fluid 3-click experience.",
      keyTakeaway: "A great daily-use product doesn't seek to replace the social channels where users already are, but to enhance them."
    }
  },
  {
    id: "fretlabs",
    name: "FretLabs",
    typeBadge: "CAD & Precision Tool for Luthiers",
    priority: "featured",
    tagline: "Professional fretboard and instrument designer for luthiers with CNC/Laser export.",
    problemSummary: "Calculating fret scales (especially multiscale/fanned frets and microtonal systems) requires complex mathematical formulas and heavy CAD software that is difficult to access in lutherie workshops.",
    targetUser: "Luthiers, guitar/bass builders, and stringed instrument designers.",
    myContribution: "Mathematical engine for fret calculation, real-time SVG rendering in the browser, DXF/SVG file generator for CNC, and 100% offline PWA support.",
    period: "2026", 
    role: "Frontend Developer & Creator", 
    cvHighlights: [
      "Created a mathematical precision tool for luthiers that calculates distances for simple frets, fanned frets, and microtonal scales.",
      "Developed a native client-side SVG vector rendering engine that exports DXF/SVG files for CNC machinery and laser cutting.",
      "Developed a 100% browser-executable solution, with no server costs or backend dependencies."
    ], 
    stack: ["React", "TypeScript", "Tailwind CSS v4", "SVG Engine", "PWA Offline"],
    skills: ["Precision Mathematics", "Vector Graphics Rendering", "Standalone Browser Architecture", "Niche Domain Translation"],
    demoType: "fretlabs",
    githubUrl: "https://github.com/ivnvaldz7/fretlabs",
    liveUrl: "https://fretlabs.vercel.app",
    caseStudy: {
      contextAndProblem: "Luthiers building multiscale guitars must calculate the exact position of each fret with hundredths-of-a-millimeter precision to ensure the instrument's intonation.",
      affectedUsers: "Artisanal luthiers and CNC digital cutting workshops manufacturing custom necks and fretboards.",
      realConstraints: [
        "100% millimeter precision required for real manufacturing.",
        "Workshop environments with older computers or no internet connection.",
        "Need to export in formats compatible with lasers and CNC routers without payment gateways or servers."
      ],
      developedSolution: "A standalone web tool executable in any browser without a backend server. It dynamically calculates distances using the 12-tone equal temperament formula or custom microtonal systems, draws the vectorized and interactive preview, and exports vectors ready for manufacturing.",
      productDecisions: [
        {
          title: "Zero Backend, 100% Local Processing",
          description: "All calculations and SVG/DXF file generation are executed on the client's GPU/CPU.",
          reasoning: "Guarantees total privacy of the luthier's blueprints and makes the tool available for life for free and without server costs."
        }
      ],
      techDecisions: [
        {
          title: "Mathematical Rendering in Native SVG with React",
          description: "Use of SVG elements with a dynamic mathematical viewBox.",
          reasoning: "Allows scaling the design from a phone screen to a 1-meter blueprint without loss of resolution or aliasing."
        }
      ],
      resultAndLearnings: "Tool widely adopted by the digital lutherie community, converting a complex calculation into a 30-second visual flow.",
      keyTakeaway: "Translating a hyper-specialized technical domain into an intuitive interface demonstrates how the frontend can democratize industrial design tools."
    }
  },
  {
    id: "plataforma-deposito",
    name: "Depósito Platform",
    typeBadge: "Operations platform · Laboratory",
    priority: "hero",
    tagline: "Internal platform for users, warehouse inventory, and commercial logistics in one application.",
    problemSummary: "A laboratory needs lot-level stock, receiving records, order preparation, and clear control over who can act in each area while preserving traceability.",
    targetUser: "Warehouse managers, production requesters, sales staff, order packers, and platform administrators.",
    myContribution: "Built a modular monolithic application with a React interface, Express API, per-module permissions, and separate data domains for warehouse and logistics.",
    period: "2026", role: "Full-Stack Developer", cvHighlights: ["Built a laboratory operations platform with centralized user administration and per-module access.", "Structured warehouse operations around lot-level inventory, receiving records, production orders, and traceable movements.", "Integrated a separate commercial order and dispatch workflow with operational states and stock updates when orders are completed."],
    stack: ["React 19", "TypeScript", "Express", "PostgreSQL", "Prisma 7", "TanStack Query", "Zustand"],
    skills: ["Full-Stack Development", "Operational Workflows", "Inventory Traceability", "Role-Based Access"],
    demoType: "deposito",
    githubUrl: "https://github.com/ivnvaldz7/deposito/tree/codex/portfolio-public",
    caseStudy: {
      contextAndProblem: "In a laboratory, warehouse and order preparation use related information but carry different responsibilities. A receipt, production withdrawal, or dispatch must be traceable to its source records.",
      affectedUsers: "Warehouse and production staff, sales and packing teams, and administrators who assign access.",
      realConstraints: ["Stock must retain its lot, expiration date, and the origin of every movement.", "Permissions must distinguish warehouse, logistics, and administration tasks.", "The public sample cannot use real laboratory accounts or operational data."],
      developedSolution: "A unified application with central user administration, a warehouse module for inventory, receiving records and production, and an Ale-Bet commercial module for customers, orders, packing and dispatch. The API and PostgreSQL database are shared, while routes and data schemas keep the domains separate.",
      productDecisions: [
        { title: "One entry point, three work areas", description: "Users access the modules enabled for their role through a common platform.", reasoning: "This reduces operational fragmentation while keeping administration, warehouse, and logistics responsibilities distinct." },
        { title: "Movements with an origin", description: "Receipts, production orders, and customer orders leave a trail of states and stock movements.", reasoning: "A team can review how a stock balance or dispatch was reached, rather than seeing only the final number." }
      ],
      techDecisions: [
        { title: "Modular monolith", description: "React client and Express API in a monorepo with shared contracts.", reasoning: "Related workflows can evolve within one platform while keeping clear module boundaries." },
        { title: "PostgreSQL with separate schemas", description: "Platform, warehouse, and Ale-Bet data use distinct Prisma-managed schemas.", reasoning: "This makes domain boundaries explicit without duplicating authentication or infrastructure." }
      ],
      resultAndLearnings: "The platform brings internal information and workflows into one interface. The portfolio sample reproduces access, receiving, and order preparation decisions with fictional data; it does not connect to the laboratory system.",
      keyTakeaway: "A unified experience can preserve separate domain rules, permissions, and traceability."
    }
  }
];
