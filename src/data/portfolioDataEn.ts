import { Project } from '../types';

export const PROJECTS_DATA_EN: Project[] = [
  {
    id: "checar",
    name: "ChecAR",
    typeBadge: "AI Application & Fact-Checking Assist",
    priority: "featured",
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
    priority: "hero",
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
    typeBadge: "Fretboard design · Lutherie",
    priority: "featured",
    tagline: "Design single-scale, multiscale, or microtonal fretboards and export plans for fabrication.",
    problemSummary: "Moving fret measurements from a calculator into CAD means redrawing the fretboard and risks transcription errors.",
    targetUser: "Luthiers and workshops designing fretboards for stringed instruments and preparing files for CAD, CNC, or laser cutting.",
    myContribution: "I built the TypeScript fret calculation, the responsive SVG preview, and browser-based plan and measurement exports.",
    period: "2026", 
    role: "Frontend Developer & Creator", 
    cvHighlights: [
      "Built a fretboard designer supporting single, multiscale, and per-string lengths, configurable temperaments, and Scala .scl files.",
      "Separated calculation, SVG rendering, and exporters to produce DXF/SVG plans and CSV measurement tables from the same design.",
      "Added instrument presets, design comparison, undo/redo, and an installable PWA for offline workshop use after first load."
    ], 
    stack: ["React 19", "TypeScript", "Tailwind CSS v4", "Vite", "SVG", "PWA"],
    skills: ["Geometric calculations", "SVG rendering", "CAD export", "Product design"],
    demoType: "fretlabs",
    hasInteractiveDemo: true,
    githubUrl: "https://github.com/ivnvaldz7/fretlabs",
    liveUrl: "https://fretlabs.netlify.app",
    caseStudy: {
      contextAndProblem: "On a custom fretboard, changes to scale lengths, string spacing, or string count alter the geometry. Copying measurements and redrawing the plan separates calculation from fabrication.",
      affectedUsers: "Luthiers and workshops preparing custom fretboards for cutting or machining.",
      realConstraints: [
        "Keep a consistent internal unit for position and geometry calculations.",
        "Represent single, multiscale, and per-string lengths, including temperaments and Scala .scl files.",
        "Provide measurements and vectors reusable in CAD/CAM tools, including offline workshops."
      ],
      developedSolution: "A React app that calculates fretboard geometry in the browser and updates its SVG preview when scale lengths, strings, frets, spacing, or compensation change. It offers presets, a position table, DXF/SVG/CSV exports, and a print-to-PDF layout at actual scale.",
      productDecisions: [
        {
          title: "From parameter to plan",
          description: "The same design drives the preview, measurement table, and export formats.",
          reasoning: "This avoids reentering data and reduces manual steps between calculation and fabrication file preparation."
        }
      ],
      techDecisions: [
        {
          title: "Calculation engine separate from the UI",
          description: "A TypeScript module calculates geometry in millimeters; the SVG renderer and exporters consume its result.",
          reasoning: "The math can be tested independently while the preview and downloaded files remain consistent."
        }
      ],
      resultAndLearnings: "The repository combines calculation, preview, and export in one flow. It also includes engine tests, presets, design comparison, and offline PWA support.",
      keyTakeaway: "A shared calculation result keeps the visible design, measurements, and exported plan aligned."
    }
  },
  {
    id: "plataforma-deposito",
    name: "Depósito Platform",
    typeBadge: "Operations platform · Laboratory",
    priority: "featured",
    tagline: "Internal platform connecting users, warehouse, and logistics through clear, traceable workflows.",
    problemSummary: "Disconnected receiving, lot-level stock checks, and order preparation force teams to repeat data entry and make movements harder to trace.",
    targetUser: "Warehouse managers, production requesters, sales staff, order packers, and platform administrators.",
    myContribution: "Built workflows that capture data once, guide tasks through clear states, and update stock with traceable movements while keeping access separate by module.",
    period: "2026", role: "Full-Stack Developer", cvHighlights: ["Built a laboratory operations platform with centralized user administration and per-module access.", "Connected receiving, lot-level inventory, and production orders in workflows that reuse recorded data and preserve the origin of each movement.", "Integrated a separate order and dispatch workflow with clear states and automatic stock updates when each order is completed."],
    stack: ["React 19", "TypeScript", "Express", "PostgreSQL", "Prisma 7", "TanStack Query", "Zustand"],
    skills: ["Full-Stack Development", "Operational Workflows", "Inventory Traceability", "Role-Based Access"],
    demoType: "deposito",
    githubUrl: "https://github.com/ivnvaldz7/deposito/tree/codex/portfolio-public",
    caseStudy: {
      contextAndProblem: "In a laboratory, the same product moves through receiving, inventory, production, and customer orders. When each task requires separate entry or lookup, manual steps multiply and stock changes become difficult to reconstruct.",
      affectedUsers: "Warehouse and production staff, sales and packing teams, and administrators who assign access.",
      realConstraints: ["Every movement must retain its lot, expiration date, and source record.", "Permissions must distinguish warehouse, logistics, and administration tasks.", "The public sample must use fictional data and stay disconnected from laboratory operations."],
      developedSolution: "The platform brings user administration, warehouse, and logistics into one application. A receiving record guides distribution, and inventory reflects each movement without entering the product again. In logistics, orders move through approval, packing, and dispatch, with stock updated when the workflow is completed. Each area keeps separate permissions and data.",
      productDecisions: [
        { title: "One entry point, three work areas", description: "Users access the modules enabled for their role through a common platform.", reasoning: "This removes tool switching while keeping administration, warehouse, and logistics responsibilities clear." },
        { title: "Data that follows the workflow", description: "Receiving records, production orders, and customer orders reuse product data and show progress through states.", reasoning: "This reduces repeated entry and transcription while preserving the origin of every stock change." }
      ],
      techDecisions: [
        { title: "Modular monolith", description: "React client and Express API in a monorepo with shared contracts.", reasoning: "Related workflows can evolve within one platform while keeping clear module boundaries." },
        { title: "PostgreSQL with separate schemas", description: "User, warehouse, and logistics data use distinct Prisma-managed schemas.", reasoning: "Each workflow stays independent while sharing access control and traceability." }
      ],
      resultAndLearnings: "Teams can follow receiving, stock balances, and orders from their source records with fewer entry steps and visible state changes. The portfolio sample illustrates these workflows with fictional data and no connection to the laboratory system.",
      keyTakeaway: "An efficient workflow reuses recorded information and makes each transition visible while preserving permissions and traceability."
    }
  },
  {
    id: "bond-ia",
    name: "Bond-IA",
    typeBadge: "AMBA transit · Concept",
    priority: "standard",
    status: "in-progress",
    tagline: "A concept for checking bus routes, stops, and line status across Greater Buenos Aires in one place.",
    problemSummary: "Before a trip, riders often need separate sources to see where a line goes, which stop to use, and whether its service has delays or detours.",
    targetUser: "People traveling by bus across Greater Buenos Aires who need to plan or adjust a journey.",
    myContribution: "Defined the lookup flow and built an interactive prototype with simulated lines, stops, and service states to evaluate the experience.",
    period: "Concept 2026",
    role: "Product concept and prototype",
    cvHighlights: [],
    stack: ["React", "TypeScript", "UX prototype", "Simulated data"],
    skills: ["Product design", "Route visualization", "Service states"],
    demoType: "bondia",
    caseStudy: {
      contextAndProblem: "The idea starts with an everyday question: which line to take, where its stops are, and what changes when service is disrupted. Bond-IA is not yet a source of live transit information.",
      affectedUsers: "Riders who transfer between lines, wait at stops, or need to replan after a service change.",
      realConstraints: ["Routes and stops will need verified, regularly updated sources.", "Service status will need a source and update time so it cannot be mistaken for a prediction.", "The interface must remain clear on phones and under variable connectivity."],
      developedSolution: "The prototype lets riders choose a line and direction, inspect stops on a schematic route, and review a service state. The demo simulates normal service, delays, and detours; all routes, stops, and times are illustrative.",
      productDecisions: [
        { title: "Line, direction, and stop in one flow", description: "The lookup starts with a line and shows its route and selected stop without switching screens.", reasoning: "This reduces source switching when riders need a quick answer before or during a trip." },
        { title: "Status with context", description: "An incident appears beside the route and explains what might change for a rider.", reasoning: "A status label alone should not be mistaken for enough information to make a travel decision." }
      ],
      techDecisions: [
        { title: "Prototype separated from real data", description: "The sample uses local fictional data without a transit API or geolocation.", reasoning: "It allows interaction testing without claiming accuracy or live updates from an integration that does not exist yet." }
      ],
      resultAndLearnings: "This phase delivers a navigable demo to evaluate information hierarchy, stop selection, and incident messaging. The next step is to define and validate route and status sources before building the operational app.",
      keyTakeaway: "A transit product must clearly separate published routes, reported incidents, and estimates."
    }
  }
];
