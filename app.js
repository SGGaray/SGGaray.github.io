(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["react/jsx-dev-runtime"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("react/jsx-dev-runtime"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jsxDevRuntime);
    global.app = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_jsxDevRuntime) {
  "use strict";

  // app.jsx — Main app, translations, navbar, tweaks
  const {
    useState,
    useEffect,
    useRef
  } = React;
  const {
    TweaksPanel,
    useTweaks,
    TweakSection,
    TweakColor,
    TweakSlider,
    TweakRadio,
    TweakToggle
  } = window;

  // ── Translations ───────────────────────────────────────────────────────────────
  const TRANS = {
    en: {
      nav: {
        about: 'About',
        education: 'Education',
        projects: 'Projects',
        blog: 'Blog',
        contact: 'Contact',
        cvSoon: 'Coming soon'
      },
      footer: {
        role: 'GRC & Human Risk Management',
        navTitle: 'Navigation',
        linksTitle: 'Connect',
        copyright: '© 2026 Sebastian Garay · Buenos Aires, Argentina · GRC & Behavioral Security'
      },
      hero: {
        label: 'Cybersecurity Portfolio · 2026',
        firstName: 'Sebastian',
        lastName: 'Garay',
        title: 'GRC · Human Risk Management · Human Factor Security',
        tagline: 'Where human behavior meets governance frameworks.',
        headline: 'Turning human behavior into measurable risk controls.',
        scroll: 'Scroll to explore',
        cta1: 'View Work',
        cta2: 'Get in Touch',
        headlinePre: 'Where ',
        headlineHi: 'human behavior',
        headlinePost: ' meets governance frameworks.',
        differentiator: 'Social Psychology × GRC — human behavior as a risk variable',
        tagline2: 'I combine Social Psychology with cybersecurity frameworks to understand why people bypass controls — and how to design them better.',
        panelTitle: 'GRC FRAMEWORK ASSESSMENT',
        panelStatus: 'In assessment',
        evalLabel: 'ASSESSMENT',
        layers: [{
          concept: 'GOVERNANCE',
          text: 'Evaluate, direct and monitor the strategic use of IT',
          status: '✓ Compliant'
        }, {
          concept: 'MANAGEMENT',
          text: 'Plan, build, run and monitor services',
          status: '✓ Validated'
        }, {
          concept: 'RISK',
          text: 'Identify, analyze and treat information assets',
          status: '⚠ Review'
        }, {
          concept: 'CONTROL',
          text: 'Implement and verify technical security controls',
          status: '✓ Active'
        }, {
          concept: 'COMPLIANCE',
          text: 'Verify adherence to regulatory and normative frameworks',
          status: '✓ Compliant'
        }]
      },
      about: {
        label: 'About Me',
        heading: 'Two disciplines. One purpose.',
        bio: ['I came to cybersecurity through social psychology. That sequence wasn\'t accidental: before understanding how systems fail, I wanted to understand how people fail. What I found is that in most security incidents and control failures, both happen simultaneously.', 'I study B.Sc. in Cyberdefense at FADENA/UNDEF and a Higher Technical Degree in Social Psychology. Studying group dynamics taught me that miscalibrated trust creates cascading vulnerabilities — in people and organizations alike.', 'Before security, I worked in construction, including team coordination on site. I know what it means to manage real work under pressure, with people dependencies and concrete consequences when something fails.', 'I\'m genuinely concerned about AI adoption without solid risk frameworks. Not as an academic trend — as a practical consequence of watching organizations adopt technology without first understanding what they\'re assuming.', 'Last year I climbed Cerro Sosneado. This year I run my first marathon.'],
        highlights: [{
          label: 'B.Sc. Cyberdefense',
          sub: 'FADENA / UNDEF · Argentina'
        }, {
          label: 'Higher Technical Degree in Social Psychology',
          sub: 'Instituto Superior AMVA',
          badge: 'Graduating 2027'
        }, {
          label: 'GRC & Human Risk Management — In Training',
          sub: 'COBIT 2019 · ISO 27001 · ITIL 4 · ISO 38500',
          note: 'Active training under ISACA professional mentorship.'
        }]
      },
      education: {
        label: 'Education & Credentials',
        heading: 'Background',
        previewHint: 'hover to preview',
        credlyLabel: 'View credentials on Credly',
        degrees: [{
          type: 'Degree · In Progress',
          title: 'Licenciatura en Ciberdefensa',
          institution: 'FADENA / UNDEF — Argentina',
          period: '2026 – 2030',
          status: 'Active enrollment',
          current: 'Current coursework — Q1 2026: Análisis Matemático I · Álgebra I · Inglés I · Sistemas Operativos I · Gestión de Servicios de Información (ITIL 4, COBIT 2019, ISO/IEC 20000)',
          desc: 'Five-year university degree structured in two training cycles.\n\nThe Basic Training Cycle covers foundations of exact sciences, operating systems, programming languages, telecommunications infrastructure, operational technology, secure programming, applied cybersecurity, IoT devices, information security management systems, critical infrastructure protection and ICT risk analysis methodologies. Upon completion, the intermediate title of Analista Universitario en Gestión de Riesgos Cibernéticos is awarded.\n\nThe Advanced Training Cycle deepens into governance and public policy, computer forensics, international relations, artificial intelligence and machine learning, geopolitics, law applied to national defense, national intelligence, applied cryptography, project management, strategic foresight and actors in the fifth domain.',
          scopeLabel: 'Degree scope',
          scope: ['ICT & OT risk identification and analysis', 'Cyberattack response strategies', 'Cybersecurity incident prevention', 'Policy and regulatory advisory', 'Cyberdefense audits', 'Incident management and documentation']
        }, {
          type: 'Intermediate Title · In Progress',
          title: 'Analista Universitario en Gestión de Riesgos Cibernéticos',
          institution: 'FADENA / UNDEF — Argentina',
          period: '2026 – 2028 (est.)',
          status: 'In progress',
          desc: 'Intermediate university degree awarded upon completing the Basic Training Cycle. Coursework covers: data processing systems, telecommunications infrastructure, secure programming, applied cybersecurity, information security management systems, critical infrastructure protection and ICT risk analysis methodologies.',
          scopeLabel: 'Degree scope',
          scope: ['Identification and analysis of cybersecurity threats and risks', 'Detection of vulnerabilities in systems and infrastructures', 'Evaluation of risk mitigation tools', 'Support in cybersecurity incident prevention']
        }, {
          type: 'Degree · In Progress',
          title: 'Técnico Superior en Psicología Social',
          institution: 'Instituto Superior AMVA',
          period: 'Through 2027',
          status: 'Graduating 2027',
          descItalic: true,
          desc: 'Studying how groups make decisions under pressure, build trust and process uncertainty changed the way I understand organizational behavior.',
          descSub: 'Training in group dynamics, organizational behavior, social influence and institutional psychology.',
          scopeLabel: 'Areas of study',
          scope: ['Group Dynamics', 'Organizational Behavior', 'Social Influence', 'Institutional Psychology', 'Collective Decision-Making']
        }],
        certsLabel: 'Certifications & Microcredentials',
        certs: [{
          name: 'Ethical Hacker',
          issuer: 'Cisco',
          date: 'Issued Jun 2026',
          skills: ['Ethical Hacking', 'Penetration Testing']
        }, {
          name: 'Cybersecurity Certificate',
          issuer: 'IBM SkillsBuild',
          date: 'Issued May 2026'
        }, {
          name: 'Governance, Risk, Compliance & Data Privacy',
          issuer: 'Microcredential'
        }, {
          name: 'Cloud Security',
          issuer: 'Microcredential',
          date: 'Issued May 2026'
        }, {
          name: 'Incident Response & Systems Forensics',
          issuer: 'Microcredential',
          date: 'Issued May 2026'
        }, {
          name: 'Security Operations & Management',
          issuer: 'Microcredential',
          date: 'Issued May 2026'
        }, {
          name: 'System & Network Security',
          issuer: 'Microcredential',
          date: 'Issued May 2026'
        }, {
          name: 'Vulnerability Management',
          issuer: 'Microcredential',
          date: 'Issued May 2026'
        }],
        membershipLabel: 'Professional Membership',
        membership: {
          org: 'ISACA',
          role: 'Student Member',
          period: '2026 – Present',
          desc: 'Student member of ISACA. Participating in the Mentorship Program with a senior professional certified in CISM / CRISC / CISA.'
        },
        activitiesLabel: 'Technical Activities',
        activities: [{
          category: 'Competition / CTF',
          title: 'Cisco Americas Cyber Games 2026 — CTF',
          date: '30 Jun 2026',
          status: 'Active participation',
          desc: 'Continental-level Capture The Flag competition organized by Cisco. Categories: cryptography, digital forensics, networks, and web vulnerabilities.'
        }]
      },
      projects: {
        label: 'Selected Work',
        heading: 'Projects',
        viewAll: 'View all projects',
        moreSoon: 'More projects coming soon',
        pwdcNote: '* PWDC — Professional Work Development Context (simulated enterprise environment for practice and methodology development)',
        scoringNote: 'Scoring based on Probability × Impact matrix — ISO 27005',
        items: [{
          riskLevel: 'HIGH',
          riskScore: '8.4',
          category: 'Risk Management',
          client: 'PWDC',
          title: 'Enterprise Risk Assessment Framework',
          desc: 'Designed and implemented a risk assessment framework aligned with ISO 27001, including risk registers, treatment plans, and KRI dashboards for ongoing monitoring.',
          tags: ['ISO 27001', 'Risk Assessment', 'KRI']
        }, {
          riskLevel: 'MEDIUM',
          riskScore: '6.2',
          category: 'Governance',
          client: 'PWDC',
          title: 'Information Security Policy Suite',
          desc: 'Developed a complete suite of security policies covering 14 ISO domains, mapped to organizational controls and regional regulatory requirements.',
          tags: ['ISO 27001', 'COBIT 2019', 'Governance']
        }, {
          riskLevel: 'MEDIUM',
          riskScore: '5.8',
          category: 'GRC Assessment',
          client: 'Confidential',
          title: 'GRC Maturity Gap Analysis',
          desc: 'Assessed current GRC maturity against COBIT 2019. Produced a structured gap analysis and a prioritized roadmap to target-state compliance.',
          tags: ['COBIT 2019', 'Gap Analysis']
        }, {
          riskLevel: 'CRITICAL',
          riskScore: '9.1',
          category: 'AI Governance',
          client: 'Research',
          title: 'AI Risk Assessment Framework',
          desc: 'Drafted a preliminary framework for organizations beginning AI adoption, addressing governance gaps not yet covered by existing standards and frameworks.',
          tags: ['AI Governance', 'Risk Assessment', 'Emerging Tech']
        }]
      },
      articles: {
        label: 'Writing',
        heading: 'Articles',
        viewAll: 'View all articles',
        moreSoon: 'More articles in progress',
        notPublished: 'Not yet published',
        cat1Label: 'GRC & Governance',
        cat2Label: 'Human Risk & Behavior',
        items: [{
          type: 'Essay',
          date: '2025',
          title: 'AI Adoption Without Risk Frameworks: The Governance Gap Organizations Ignore',
          excerpt: 'Most organizations treating AI as a productivity tool are quietly accumulating unquantified governance risk. A practical look at why.',
          readTime: '8 min read',
          status: 'In Progress'
        }, {
          type: 'Analysis',
          date: '2025',
          title: 'GRC Through a Behavioral Lens: Why Controls Fail Before They\'re Tested',
          excerpt: 'Security controls don\'t fail in isolation. They fail because of how people interact with systems under pressure, ambiguity, and misaligned incentives.',
          readTime: '6 min read',
          status: 'Draft'
        }, {
          type: 'Essay',
          date: '2024',
          title: 'What Construction Taught Me About Managing Security Dependencies',
          excerpt: 'Coordinating on-site teams under real constraints taught me more about cascading failure than any textbook on risk management.',
          readTime: '5 min read',
          status: 'Draft'
        }],
        items2: [{
          type: 'Essay',
          date: '2026',
          title: 'Why People Bypass Controls: The Psychology of Shadow AI in Organizations',
          excerpt: 'When controls add friction, people route around them. Shadow AI is the clearest case — and a window into why enforcement fails.',
          readTime: '7 min read',
          status: 'In Progress'
        }, {
          type: 'Analysis',
          date: '2026',
          title: 'Miscalibrated Trust as a Risk Vector: Lessons from Social Psychology for GRC',
          excerpt: 'Trust placed in the wrong people, tools, or signals quietly becomes a risk vector. What social psychology teaches GRC about calibration.',
          readTime: '5 min read',
          status: 'Draft'
        }]
      },
      contact: {
        label: 'Contact',
        heading: "Let's work together.",
        nameLabel: 'Name',
        namePh: 'Your name',
        emailPh: 'your@email.com',
        msgLabel: 'Message',
        msgPh: 'Tell me about your project, challenge, or question...',
        send: 'Send Message',
        linksLabel: 'Find me online',
        locationLabel: 'Location',
        successTitle: 'Message sent.',
        successMsg: 'Thank you for reaching out. I\'ll get back to you shortly.',
        availability: "Open to opportunities in Strategy, Risk & Compliance. If you work in consulting, IT governance or risk management, I'd like to connect.",
        badge: 'Open to opportunities in Strategy, Risk & Compliance',
        errorMsg: 'Could not send. Please email me directly.',
        sending: 'Sending…',
        email: 'garaysebastiang@gmail.com'
      }
    },
    es: {
      nav: {
        about: 'Sobre Mí',
        education: 'Formación',
        projects: 'Proyectos',
        blog: 'Blog',
        contact: 'Contacto',
        cvSoon: 'Disponible próximamente'
      },
      footer: {
        role: 'GRC & Gestión del Riesgo Humano',
        navTitle: 'Navegación',
        linksTitle: 'Conectar',
        copyright: '© 2026 Sebastian Garay · Buenos Aires, Argentina · GRC & Behavioral Security'
      },
      hero: {
        label: 'Portfolio de Ciberseguridad · 2026',
        firstName: 'Sebastian',
        lastName: 'Garay',
        title: 'GRC · Gestión del Riesgo Humano · Human Factor Security',
        tagline: 'Donde el comportamiento humano se encuentra con los marcos de gobernanza.',
        headline: 'Convirtiendo el comportamiento humano en controles de riesgo medibles.',
        scroll: 'Scroll para explorar',
        cta1: 'Ver Trabajo',
        cta2: 'Contactar',
        headlinePre: 'Donde el ',
        headlineHi: 'comportamiento humano',
        headlinePost: ' se encuentra con los marcos de gobernanza.',
        differentiator: 'Psicología Social × GRC — el factor humano como variable de riesgo',
        tagline2: 'Combino Psicología Social y marcos de ciberseguridad para entender por qué las personas evaden controles — y cómo diseñarlos mejor.',
        panelTitle: 'GRC FRAMEWORK ASSESSMENT',
        panelStatus: 'En evaluación',
        evalLabel: 'EVALUACIÓN',
        layers: [{
          concept: 'GOBIERNO',
          text: 'Evaluar, orientar y supervisar el uso estratégico de TI',
          status: '✓ Conforme'
        }, {
          concept: 'GESTIÓN',
          text: 'Planificar, construir, ejecutar y supervisar servicios',
          status: '✓ Validado'
        }, {
          concept: 'RIESGO',
          text: 'Identificar, analizar y tratar activos de información',
          status: '⚠ Revisión'
        }, {
          concept: 'CONTROL',
          text: 'Implementar y verificar controles de seguridad técnica',
          status: '✓ Activo'
        }, {
          concept: 'CUMPLIMIENTO',
          text: 'Verificar adherencia a marcos regulatorios y normativos',
          status: '✓ Conforme'
        }]
      },
      about: {
        label: 'Sobre Mí',
        heading: 'Dos disciplinas. Un propósito.',
        bio: ['Llegué a la ciberseguridad desde la psicología social. Esa secuencia no fue accidental: antes de entender cómo fallan los sistemas, quería entender cómo fallan las personas. Lo que descubrí es que en la mayoría de los incidentes de seguridad y fallos de control, ambas cosas ocurren simultáneamente.', 'Estudio Licenciatura en Ciberdefensa en FADENA/UNDEF y Técnico Superior en Psicología Social. Estudiar dinámicas grupales me enseñó que la confianza mal calibrada genera vulnerabilidades en cascada, en personas y organizaciones por igual.', 'Antes de la seguridad, trabajé en construcción, incluyendo coordinación de equipos en obra. Sé lo que significa gestionar trabajo real bajo presión, con dependencias entre personas y consecuencias concretas cuando algo falla.', 'Me preocupa genuinamente la adopción de IA sin marcos de riesgo sólidos. No como tendencia académica, sino como consecuencia práctica de ver organizaciones adoptar tecnología sin entender primero qué están asumiendo.', 'El año pasado subí el Cerro Sosneado. Este año corro mi primera maratón.'],
        highlights: [{
          label: 'Lic. en Ciberdefensa',
          sub: 'FADENA / UNDEF · Argentina'
        }, {
          label: 'Técnico Superior en Psicología Social',
          sub: 'Instituto Superior AMVA',
          badge: 'Finaliza 2027'
        }, {
          label: 'GRC & Gestión del Riesgo Humano — En Formación',
          sub: 'COBIT 2019 · ISO 27001 · ITIL 4 · ISO 38500',
          note: 'Formación activa bajo mentoría profesional ISACA.'
        }]
      },
      education: {
        label: 'Formación y Credenciales',
        heading: 'Trayectoria',
        previewHint: 'pasar el cursor para ver',
        credlyLabel: 'Ver credenciales en Credly',
        degrees: [{
          type: 'Grado · En Curso',
          title: 'Licenciatura en Ciberdefensa',
          institution: 'FADENA / UNDEF — Argentina',
          period: '2026 – 2030',
          status: 'Cursando activamente',
          current: 'Materias en curso — 1er cuatrimestre 2026: Análisis Matemático I · Álgebra I · Inglés I · Sistemas Operativos I · Gestión de Servicios de Información (ITIL 4, COBIT 2019, ISO/IEC 20000)',
          desc: 'Carrera universitaria de cinco años estructurada en dos ciclos de formación.\n\nEl Ciclo de Formación Básica cubre fundamentos de ciencias exactas, sistemas operativos, lenguajes de programación, infraestructura de telecomunicaciones, tecnología operativa, programación segura, ciberseguridad aplicada, dispositivos IoT, sistema de gestión de seguridad de la información, protección de infraestructuras críticas y metodologías de análisis de riesgos de TIC. Al completarlo se obtiene el título intermedio de Analista Universitario en Gestión de Riesgos Cibernéticos.\n\nEl Ciclo de Formación Avanzada profundiza en gobierno y políticas públicas, informática forense, relaciones internacionales, inteligencia artificial y aprendizaje automático, geopolítica, derecho aplicado a la defensa nacional, inteligencia nacional, criptografía aplicada, gestión de proyectos, prospectiva estratégica y actores en el quinto dominio.',
          scopeLabel: 'Alcances del título',
          scope: ['Identificación y análisis de riesgos cibernéticos', 'Definición de estrategias ante ciberataques', 'Prevención de incidentes de ciberseguridad', 'Asesoramiento en políticas y normativas', 'Auditorías de ciberdefensa', 'Gestión y documentación de incidentes']
        }, {
          type: 'Título Intermedio · En Curso',
          title: 'Analista Universitario en Gestión de Riesgos Cibernéticos',
          institution: 'FADENA / UNDEF — Argentina',
          period: '2026 – 2028 (est.)',
          status: 'En curso',
          desc: 'Título universitario intermedio otorgado al completar el Ciclo de Formación Básica. Las materias del ciclo cubren: sistemas de tratamiento de datos, infraestructura de telecomunicaciones, programación segura, ciberseguridad aplicada, sistema de gestión de seguridad de la información, protección de infraestructuras críticas y metodologías de análisis de riesgos de TIC.',
          scopeLabel: 'Alcances',
          scope: ['Identificación y análisis de amenazas y riesgos cibernéticos', 'Detección de vulnerabilidades en sistemas e infraestructuras', 'Evaluación de herramientas para mitigación de riesgos', 'Apoyo en prevención de incidentes de ciberseguridad']
        }, {
          type: 'Grado · En Curso',
          title: 'Técnico Superior en Psicología Social',
          institution: 'Instituto Superior AMVA',
          period: 'Hasta 2027',
          status: 'Finaliza 2027',
          descItalic: true,
          desc: 'Estudiar cómo los grupos toman decisiones bajo presión, construyen confianza y procesan la incertidumbre cambió la forma en que entiendo el comportamiento organizacional.',
          descSub: 'Formación en dinámica de grupos, comportamiento organizacional, influencia social y psicología institucional.',
          scopeLabel: 'Áreas de estudio',
          scope: ['Dinámica de Grupos', 'Comportamiento Organizacional', 'Influencia Social', 'Psicología Institucional', 'Toma de Decisiones Colectivas']
        }],
        certsLabel: 'Certificaciones y Microcredenciales',
        certs: [{
          name: 'Ethical Hacker',
          issuer: 'Cisco',
          date: 'Emitida Jun 2026',
          skills: ['Ethical Hacking', 'Penetration Testing']
        }, {
          name: 'Certificado en Ciberseguridad',
          issuer: 'IBM SkillsBuild',
          date: 'Emitida May 2026'
        }, {
          name: 'Gobernanza, Riesgo, Cumplimiento y Privacidad',
          issuer: 'Microcredencial'
        }, {
          name: 'Seguridad en la Nube',
          issuer: 'Microcredencial',
          date: 'Emitida May 2026'
        }, {
          name: 'Respuesta a Incidentes y Forense',
          issuer: 'Microcredencial',
          date: 'Emitida May 2026'
        }, {
          name: 'Operaciones y Gestión de Seguridad',
          issuer: 'Microcredencial',
          date: 'Emitida May 2026'
        }, {
          name: 'Seguridad de Sistemas y Redes',
          issuer: 'Microcredencial',
          date: 'Emitida May 2026'
        }, {
          name: 'Gestión de Vulnerabilidades',
          issuer: 'Microcredencial',
          date: 'Emitida May 2026'
        }],
        membershipLabel: 'Membresía Profesional',
        membership: {
          org: 'ISACA',
          role: 'Miembro Estudiante',
          period: '2026 – Presente',
          desc: 'Miembro estudiante de ISACA. Participando en el Programa de Mentorías con un profesional senior certificado CISM / CRISC / CISA.'
        },
        activitiesLabel: 'Actividades Técnicas',
        activities: [{
          category: 'Competencia / CTF',
          title: 'Cisco Americas Cyber Games 2026 — CTF',
          date: '30 Jun 2026',
          status: 'Participación activa',
          desc: 'Competencia de Capture The Flag organizada por Cisco a nivel continental. Categorías: criptografía, análisis forense, redes y vulnerabilidades web.'
        }]
      },
      projects: {
        label: 'Trabajo Seleccionado',
        heading: 'Proyectos',
        viewAll: 'Ver todos los proyectos',
        moreSoon: 'Más proyectos próximamente',
        pwdcNote: '* PWDC — Contexto de Desarrollo Profesional de Trabajo: proyecto realizado en entorno simulado con fines de aprendizaje y construcción de portfolio.',
        scoringNote: 'Scoring basado en matriz Probabilidad × Impacto — ISO 27005',
        items: [{
          riskLevel: 'HIGH',
          riskScore: '8.4',
          category: 'Gestión de Riesgos',
          client: 'PWDC',
          title: 'Framework de Evaluación de Riesgos',
          desc: 'Diseño e implementación de un framework de evaluación de riesgos alineado con ISO 27001, incluyendo registros de riesgos, planes de tratamiento y dashboards de KRI.',
          tags: ['ISO 27001', 'Risk Assessment', 'KRI']
        }, {
          riskLevel: 'MEDIUM',
          riskScore: '6.2',
          category: 'Gobernanza',
          client: 'PWDC',
          title: 'Suite de Políticas de Seguridad',
          desc: 'Desarrollo de una suite completa de políticas de seguridad cubriendo 14 dominios ISO, mapeadas a controles organizacionales y requisitos regulatorios regionales.',
          tags: ['ISO 27001', 'COBIT 2019', 'Gobernanza']
        }, {
          riskLevel: 'MEDIUM',
          riskScore: '5.8',
          category: 'Evaluación GRC',
          client: 'Confidencial',
          title: 'Análisis de Brechas de Madurez GRC',
          desc: 'Evaluación de madurez GRC contra COBIT 2019. Producción de análisis de brechas estructurado y hoja de ruta priorizada hacia el estado objetivo.',
          tags: ['COBIT 2019', 'Análisis de Brechas']
        }, {
          riskLevel: 'CRITICAL',
          riskScore: '9.1',
          category: 'Gobernanza IA',
          client: 'Investigación',
          title: 'Framework de Riesgo para IA',
          desc: 'Borrador de framework preliminar para organizaciones que comienzan adopción de IA, abordando brechas de gobernanza no cubiertas por estándares existentes.',
          tags: ['Gobernanza IA', 'Evaluación de Riesgos', 'Tecnología Emergente']
        }]
      },
      articles: {
        label: 'Escritura',
        heading: 'Artículos',
        viewAll: 'Ver todos los artículos',
        moreSoon: 'Más artículos en progreso',
        notPublished: 'Aún no publicado',
        cat1Label: 'GRC & Gobernanza',
        cat2Label: 'Riesgo Humano & Comportamiento',
        items: [{
          type: 'Ensayo',
          date: '2025',
          title: 'Adopción de IA sin Marcos de Riesgo: La Brecha de Gobernanza que las Organizaciones Ignoran',
          excerpt: 'La mayoría de las organizaciones que tratan la IA como herramienta de productividad están acumulando silenciosamente riesgo de gobernanza no cuantificado.',
          readTime: '8 min',
          status: 'En Progreso'
        }, {
          type: 'Análisis',
          date: '2025',
          title: 'GRC desde una Perspectiva Conductual: Por Qué los Controles Fallan Antes de Ser Probados',
          excerpt: 'Los controles de seguridad no fallan de forma aislada. Fallan por cómo las personas interactúan con los sistemas bajo presión, ambigüedad e incentivos desalineados.',
          readTime: '6 min',
          status: 'Borrador'
        }, {
          type: 'Ensayo',
          date: '2024',
          title: 'Lo que la Construcción Me Enseñó sobre la Gestión de Dependencias en Seguridad',
          excerpt: 'Coordinar equipos en obra bajo restricciones reales me enseñó más sobre el fallo en cascada que cualquier manual de gestión de riesgos.',
          readTime: '5 min',
          status: 'Borrador'
        }],
        items2: [{
          type: 'Ensayo',
          date: '2026',
          title: 'Por Qué las Personas Evaden Controles: Psicología del Shadow AI en Organizaciones',
          excerpt: 'Cuando los controles agregan fricción, las personas los evaden. El Shadow AI es el caso más claro — y una ventana a por qué falla la aplicación.',
          readTime: '7 min',
          status: 'En Progreso'
        }, {
          type: 'Análisis',
          date: '2026',
          title: 'Confianza Mal Calibrada como Vector de Riesgo: Lecciones de la Psicología Social para el GRC',
          excerpt: 'La confianza depositada en las personas, herramientas o señales equivocadas se convierte en un vector de riesgo. Lo que la psicología social enseña al GRC sobre calibración.',
          readTime: '5 min',
          status: 'Borrador'
        }]
      },
      contact: {
        label: 'Contacto',
        heading: 'Trabajemos juntos.',
        nameLabel: 'Nombre',
        namePh: 'Tu nombre',
        emailPh: 'tu@email.com',
        msgLabel: 'Mensaje',
        msgPh: 'Cuéntame sobre tu proyecto, desafío o consulta...',
        send: 'Enviar Mensaje',
        linksLabel: 'Encuéntrame online',
        locationLabel: 'Ubicación',
        successTitle: 'Mensaje enviado.',
        successMsg: 'Gracias por escribir. Te responderé a la brevedad.',
        availability: 'Abierto a oportunidades en Strategy, Risk & Compliance. Si trabajás en consultoría, gobernanza de TI o gestión de riesgos, me interesa conectar.',
        badge: 'Abierto a oportunidades en Strategy, Risk & Compliance',
        errorMsg: 'No se pudo enviar. Por favor escríbeme directamente.',
        sending: 'Enviando…',
        email: 'garaysebastiang@gmail.com'
      }
    }
  };

  // Patch articles translations with comingSoonNote
  TRANS.en.articles.comingSoonNote = 'These articles are in progress — check back soon for published pieces.';
  TRANS.es.articles.comingSoonNote = 'Estos artículos están en progreso — volvé pronto para leer las versiones publicadas.';

  // ── Ripple utility ────────────────────────────────────────────────────────────
  const addRipple = e => {
    const btn = e.currentTarget;
    const existing = btn.querySelector('.ripple');
    if (existing) existing.remove();
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.8;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const el = document.createElement('span');
    el.className = 'ripple';
    Object.assign(el.style, {
      position: 'absolute',
      borderRadius: '50%',
      pointerEvents: 'none',
      width: `${size}px`,
      height: `${size}px`,
      left: `${x}px`,
      top: `${y}px`,
      background: 'rgba(255,255,255,0.18)',
      transform: 'scale(0)',
      animation: 'rippleAnim 0.52s ease-out forwards'
    });
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(el);
    setTimeout(() => el.remove(), 600);
  };

  // ── CV Modal ──────────────────────────────────────────────────────────────────
  const CVModal = ({
    open,
    onClose,
    accent
  }) => {
    const rgb = window.accentRgb(accent);
    useEffect(() => {
      if (!open) return;
      const onKey = e => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', onKey);
        document.body.style.overflow = '';
      };
    }, [open, onClose]);
    if (!open) return null;
    return /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
      onClick: onClose,
      style: {
        position: 'fixed',
        inset: 0,
        zIndex: 9800,
        background: 'rgba(2,8,16,0.82)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      },
      children: /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
        onClick: e => e.stopPropagation(),
        style: {
          background: '#0a1829',
          border: `1px solid rgba(${rgb},0.18)`,
          borderRadius: '16px',
          width: 'min(680px,95vw)',
          maxHeight: '88vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 40px rgba(${rgb},0.06)`,
          animation: 'fadeUp 0.28s ease'
        },
        children: [/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 28px',
            borderBottom: `1px solid rgba(${rgb},0.09)`
          },
          children: [/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
            children: [/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
              style: {
                fontFamily: "'IBM Plex Sans',sans-serif",
                fontWeight: 700,
                fontSize: '17px',
                color: '#daeef8'
              },
              children: "Curriculum Vitae"
            }, void 0, false), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
              style: {
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '9px',
                color: `rgba(${rgb},0.35)`,
                letterSpacing: '1.2px',
                marginTop: '3px',
                padding: '3px 8px',
                background: `rgba(${rgb},0.06)`,
                border: `1px solid rgba(${rgb},0.14)`,
                borderRadius: '4px',
                display: 'inline-block'
              },
              children: ["To enable PDF download: add your CV file as ", /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("code", {
                style: {
                  color: accent
                },
                children: "CV_Sebastian_Garay.pdf"
              }, void 0, false), " to the project root"]
            }, void 0, true), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
              style: {
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '10px',
                color: `rgba(${rgb},0.4)`,
                letterSpacing: '1.5px',
                marginTop: '3px'
              },
              children: "Sebastian Garay · GRC & Behavioral Security"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("button", {
            onClick: onClose,
            style: {
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: `rgba(${rgb},0.07)`,
              border: `1px solid rgba(${rgb},0.14)`,
              color: `rgba(${rgb},0.6)`,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            },
            onMouseEnter: e => {
              e.currentTarget.style.background = `rgba(${rgb},0.14)`;
              e.currentTarget.style.color = accent;
            },
            onMouseLeave: e => {
              e.currentTarget.style.background = `rgba(${rgb},0.07)`;
              e.currentTarget.style.color = `rgba(${rgb},0.6)`;
            },
            children: /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("svg", {
              width: "14",
              height: "14",
              viewBox: "0 0 16 16",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              children: /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("path", {
                d: "M2 2l12 12M14 2L2 14"
              }, void 0, false)
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
          style: {
            flexGrow: 1,
            overflowY: 'auto',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          },
          children: [/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
            style: {
              padding: '24px',
              background: '#071018',
              borderRadius: '10px',
              border: `1px solid rgba(${rgb},0.08)`
            },
            children: [/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
              style: {
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: '26px',
                color: '#eaf6fb',
                marginBottom: '6px'
              },
              children: "Sebastian Garay"
            }, void 0, false), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
              style: {
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '11px',
                color: accent,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '14px'
              },
              children: "GRC & Behavioral Security Specialist"
            }, void 0, false), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
              style: {
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px'
              },
              children: ['Buenos Aires, Argentina · AMBA', 'linkedin.com/in/sebastian-garay', 'credly.com/users/sebastian-garay.tech'].map(c => /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("span", {
                style: {
                  fontFamily: "'IBM Plex Sans',sans-serif",
                  fontSize: '13px',
                  color: '#4a7a92'
                },
                children: c
              }, c, false))
            }, void 0, false)]
          }, void 0, true), [{
            title: 'Education',
            items: ['B.Sc. Cyberdefense — FADENA/UNDEF (In Progress)', 'Higher Technical Degree in Social Psychology (In Progress)']
          }, {
            title: 'Certifications',
            items: ['Ethical Hacker — Cisco (Jun 2026)', 'Cybersecurity Certificate — IBM SkillsBuild', 'GRC & Data Privacy · Cloud Security · Incident Response · Vulnerability Mgmt']
          }, {
            title: 'Expertise',
            items: ['Governance, Risk & Compliance (GRC)', 'ISO 27001 · COBIT 2019', 'Behavioral Security · AI Risk Governance', 'Risk Assessment & Gap Analysis']
          }].map(s => /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
            style: {
              padding: '20px 24px',
              background: '#071018',
              borderRadius: '10px',
              border: `1px solid rgba(${rgb},0.07)`
            },
            children: [/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
              style: {
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '9px',
                color: `rgba(${rgb},0.4)`,
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                marginBottom: '12px'
              },
              children: s.title
            }, void 0, false), s.items.map(item => /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
              style: {
                fontFamily: "'IBM Plex Sans',sans-serif",
                fontSize: '14px',
                color: '#7aafc8',
                marginBottom: '6px',
                paddingLeft: '12px',
                borderLeft: `2px solid rgba(${rgb},0.15)`
              },
              children: item
            }, item, false))]
          }, s.title, true)), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
            style: {
              padding: '16px 24px',
              background: `rgba(${rgb},0.04)`,
              borderRadius: '10px',
              border: `1px dashed rgba(${rgb},0.15)`,
              textAlign: 'center'
            },
            children: /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
              style: {
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '11px',
                color: `rgba(${rgb},0.35)`,
                letterSpacing: '1px'
              },
              children: "Full CV available as PDF — add your file to enable download"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
          style: {
            padding: '18px 28px',
            borderTop: `1px solid rgba(${rgb},0.09)`,
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end'
          },
          children: [/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("button", {
            onClick: onClose,
            style: {
              padding: '10px 20px',
              background: 'transparent',
              border: `1px solid rgba(${rgb},0.18)`,
              borderRadius: '7px',
              color: `rgba(${rgb},0.55)`,
              fontFamily: "'IBM Plex Sans',sans-serif",
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            },
            onMouseEnter: e => {
              e.currentTarget.style.borderColor = `rgba(${rgb},0.35)`;
              e.currentTarget.style.color = accent;
            },
            onMouseLeave: e => {
              e.currentTarget.style.borderColor = `rgba(${rgb},0.18)`;
              e.currentTarget.style.color = `rgba(${rgb},0.55)`;
            },
            onMouseDown: addRipple,
            children: "Cerrar"
          }, void 0, false), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("a", {
            href: "CV_Sebastian_Garay.pdf",
            download: true,
            style: {
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              background: accent,
              color: '#020810',
              fontFamily: "'IBM Plex Sans',sans-serif",
              fontWeight: 700,
              fontSize: '13px',
              borderRadius: '7px',
              textDecoration: 'none',
              boxShadow: `0 0 18px rgba(${rgb},0.3)`,
              transition: 'all 0.2s',
              position: 'relative',
              overflow: 'hidden'
            },
            onMouseEnter: e => {
              e.currentTarget.style.boxShadow = `0 0 28px rgba(${rgb},0.5)`;
              e.currentTarget.style.transform = 'translateY(-1px)';
            },
            onMouseLeave: e => {
              e.currentTarget.style.boxShadow = `0 0 18px rgba(${rgb},0.3)`;
              e.currentTarget.style.transform = '';
            },
            onMouseDown: addRipple,
            children: [/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("svg", {
              width: "12",
              height: "12",
              viewBox: "0 0 16 16",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2.2",
              strokeLinecap: "round",
              children: [/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("path", {
                d: "M8 2v8M5 7l3 3 3-3"
              }, void 0, false), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("rect", {
                x: "2",
                y: "11",
                width: "12",
                height: "3",
                rx: "1"
              }, void 0, false)]
            }, void 0, true), "Descargar PDF"]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false);
  };

  // ── Navbar ─────────────────────────────────────────────────────────────────────
  const Navbar = ({
    t,
    lang,
    setLang,
    accent
  }) => {
    const [scrolled, setScrolled] = useState(false);
    const [activeId, setActiveId] = useState('');
    const [inHero, setInHero] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [cvHint, setCvHint] = useState(false);
    const showCvHint = () => {
      setCvHint(true);
      setTimeout(() => setCvHint(false), 2200);
    };
    const rgb = window.accentRgb(accent);

    // Scroll + close mobile on outside click
    useEffect(() => {
      const onScroll = () => {
        setScrolled(window.scrollY > 40);
        if (mobileOpen) setMobileOpen(false);
      };
      window.addEventListener('scroll', onScroll, {
        passive: true
      });
      return () => window.removeEventListener('scroll', onScroll);
    }, [mobileOpen]);

    // Scroll spy via IntersectionObserver (+ hero guard near top)
    useEffect(() => {
      const ids = ['about', 'education', 'projects', 'blog', 'contact'];
      const visible = new Set();
      const apply = () => {
        // Near the top → still in the hero: no nav link active, logo lit.
        if (window.scrollY < 120) {
          setActiveId('');
          setInHero(true);
          return;
        }
        // First section (document order) that is currently intersecting wins.
        const current = ids.find(id => visible.has(id));
        if (current) {
          setActiveId(current);
          setInHero(false);
        } else {
          setActiveId('');
          setInHero(true);
        }
      };
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) visible.add(entry.target.id);else visible.delete(entry.target.id);
        });
        apply();
      }, {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0
      });
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) obs.observe(el);
      });
      window.addEventListener('scroll', apply, {
        passive: true
      });
      return () => {
        obs.disconnect();
        window.removeEventListener('scroll', apply);
      };
    }, []);
    const scrollTo = id => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({
        top: el.offsetTop - 60,
        behavior: 'smooth'
      });
      setMobileOpen(false);
    };
    const linkStyle = id => ({
      fontFamily: "'IBM Plex Sans',sans-serif",
      fontWeight: activeId === id ? 600 : 500,
      fontSize: '14px',
      color: activeId === id ? accent : '#4a7a92',
      textDecoration: 'none',
      letterSpacing: '0.3px',
      padding: '6px 13px',
      borderRadius: '8px',
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: activeId === id ? `rgba(${rgb},0.1)` : 'transparent',
      textShadow: activeId === id ? `0 0 14px rgba(${rgb},0.45)` : 'none',
      boxShadow: activeId === id ? `inset 0 0 0 1px rgba(${rgb},0.14)` : 'none',
      transition: 'color 0.18s, background 0.18s, transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.18s, text-shadow 0.18s'
    });
    const NAV_ITEMS = [['about', 'about'], ['education', 'education'], ['projects', 'projects'], ['blog', 'blog'], ['contact', 'contact']];
    return /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(_jsxDevRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("nav", {
        style: {
          position: 'fixed',
          top: '2px',
          left: 0,
          right: 0,
          zIndex: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 52px',
          height: '60px',
          background: scrolled ? 'rgba(5,12,19,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? `1px solid rgba(${rgb},0.08)` : '1px solid transparent',
          transition: 'all 0.35s ease'
        },
        children: [/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("a", {
          href: "#hero",
          onClick: e => {
            e.preventDefault();
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          },
          style: {
            fontFamily: "'IBM Plex Sans',sans-serif",
            fontWeight: 700,
            fontSize: '22px',
            color: inHero ? '#e2e8f0' : accent,
            textDecoration: 'none',
            letterSpacing: '-0.5px',
            textShadow: inHero ? `0 0 14px rgba(${rgb},0.5)` : `0 0 20px rgba(${rgb},0.4)`,
            transition: 'color 0.3s ease, text-shadow 0.3s ease'
          },
          children: "SG"
        }, void 0, false), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          },
          children: [NAV_ITEMS.map(([id, key]) => /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("a", {
            href: `#${id}`,
            onMouseDown: addRipple,
            onClick: e => {
              e.preventDefault();
              scrollTo(id);
            },
            style: linkStyle(id),
            onMouseEnter: e => {
              if (activeId !== id) {
                e.currentTarget.style.color = accent;
                e.currentTarget.style.background = `rgba(${rgb},0.08)`;
                e.currentTarget.style.textShadow = `0 0 12px rgba(${rgb},0.35)`;
                e.currentTarget.style.boxShadow = `inset 0 0 0 1px rgba(${rgb},0.12)`;
              }
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)';
            },
            onMouseLeave: e => {
              if (activeId !== id) {
                e.currentTarget.style.color = '#4a7a92';
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.textShadow = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }
              e.currentTarget.style.transform = '';
            },
            onMouseDownCapture: e => {
              e.currentTarget.style.transform = 'translateY(0) scale(0.94)';
            },
            onMouseUp: e => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)';
            },
            children: [t.nav[key], activeId === id && /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("span", {
              style: {
                position: 'absolute',
                bottom: '3px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: accent,
                boxShadow: `0 0 6px rgba(${rgb},0.8)`
              }
            }, void 0, false)]
          }, id, true)), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              background: `rgba(${rgb},0.06)`,
              border: `1px solid rgba(${rgb},0.12)`,
              borderRadius: '6px',
              padding: '3px'
            },
            children: ['en', 'es'].map(l => /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("button", {
              onClick: () => setLang(l),
              style: {
                padding: '4px 10px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
                background: lang === l ? accent : 'transparent',
                color: lang === l ? '#020810' : `rgba(${rgb},0.45)`,
                boxShadow: lang === l ? `0 0 10px rgba(${rgb},0.3)` : 'none'
              },
              children: l
            }, l, false))
          }, void 0, false), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
            style: {
              position: 'relative',
              display: 'inline-flex'
            },
            children: [/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("a", {
              href: "#",
              onClick: e => {
                e.preventDefault();
                showCvHint();
              },
              onMouseDown: addRipple,
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '7px',
                border: `1px solid rgba(${rgb},0.38)`,
                background: `rgba(${rgb},0.07)`,
                color: accent,
                fontFamily: "'IBM Plex Sans',sans-serif",
                fontWeight: 600,
                fontSize: '13px',
                textDecoration: 'none',
                letterSpacing: '0.3px',
                transition: 'all 0.22s',
                position: 'relative',
                overflow: 'hidden'
              },
              onMouseEnter: e => {
                e.currentTarget.style.background = `rgba(${rgb},0.15)`;
                e.currentTarget.style.borderColor = `rgba(${rgb},0.65)`;
                e.currentTarget.style.boxShadow = `0 0 18px rgba(${rgb},0.28)`;
                e.currentTarget.style.transform = 'translateY(-1px)';
              },
              onMouseLeave: e => {
                e.currentTarget.style.background = `rgba(${rgb},0.07)`;
                e.currentTarget.style.borderColor = `rgba(${rgb},0.38)`;
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = '';
              },
              children: [/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("svg", {
                width: "12",
                height: "12",
                viewBox: "0 0 16 16",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.8",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: [/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("path", {
                  d: "M8 2v8M5 7l3 3 3-3"
                }, void 0, false), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("rect", {
                  x: "2",
                  y: "11",
                  width: "12",
                  height: "3",
                  rx: "1"
                }, void 0, false)]
              }, void 0, true), "CV"]
            }, void 0, true), cvHint && /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("span", {
              style: {
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                whiteSpace: 'nowrap',
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '10px',
                padding: '5px 10px',
                background: 'rgba(4,12,20,0.96)',
                border: `1px solid rgba(${rgb},0.3)`,
                borderRadius: '6px',
                color: accent,
                letterSpacing: '0.5px',
                boxShadow: '0 6px 18px rgba(0,0,0,0.4)',
                animation: 'fadeUp 0.2s ease'
              },
              children: t.nav.cvSoon
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("button", {
            onClick: () => setMobileOpen(o => !o),
            "aria-label": mobileOpen ? 'Close menu' : 'Open menu',
            "aria-expanded": mobileOpen,
            style: {
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              background: `rgba(${rgb},0.07)`,
              border: `1px solid rgba(${rgb},0.14)`,
              color: accent,
              cursor: 'pointer',
              transition: 'all 0.2s'
            },
            className: "hamburger-btn",
            children: /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("svg", {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.8",
              strokeLinecap: "round",
              children: mobileOpen ? /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(_jsxDevRuntime.Fragment, {
                children: /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("path", {
                  d: "M2 2l12 12M14 2L2 14"
                }, void 0, false)
              }, void 0, false) : /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(_jsxDevRuntime.Fragment, {
                children: /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("path", {
                  d: "M2 4h12M2 8h12M2 12h12"
                }, void 0, false)
              }, void 0, false)
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true), mobileOpen && /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
        style: {
          position: 'fixed',
          top: '62px',
          left: 0,
          right: 0,
          zIndex: 899,
          background: 'rgba(5,12,19,0.97)',
          backdropFilter: 'blur(16px)',
          borderBottom: `1px solid rgba(${rgb},0.1)`,
          padding: '16px 24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          animation: 'fadeUp 0.2s ease'
        },
        children: [NAV_ITEMS.map(([id, key]) => /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("a", {
          href: `#${id}`,
          onClick: e => {
            e.preventDefault();
            scrollTo(id);
          },
          style: {
            fontFamily: "'IBM Plex Sans',sans-serif",
            fontWeight: activeId === id ? 600 : 500,
            fontSize: '16px',
            color: activeId === id ? accent : '#8ab4c6',
            textDecoration: 'none',
            padding: '11px 0',
            borderBottom: `1px solid rgba(${rgb},0.06)`
          },
          children: t.nav[key]
        }, id, false)), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("a", {
          href: "#",
          onClick: e => {
            e.preventDefault();
            showCvHint();
          },
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: "'IBM Plex Sans',sans-serif",
            fontWeight: 600,
            fontSize: '16px',
            color: accent,
            textDecoration: 'none',
            padding: '11px 0',
            borderBottom: `1px solid rgba(${rgb},0.06)`
          },
          children: [/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("span", {
            children: "CV"
          }, void 0, false), cvHint && /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("span", {
            style: {
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: '11px',
              color: `rgba(${rgb},0.7)`
            },
            children: t.nav.cvSoon
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
          style: {
            display: 'flex',
            gap: '10px',
            marginTop: '12px'
          },
          children: ['en', 'es'].map(l => /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("button", {
            onClick: () => setLang(l),
            style: {
              padding: '10px 18px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: '12px',
              textTransform: 'uppercase',
              transition: 'all 0.2s',
              background: lang === l ? accent : `rgba(${rgb},0.08)`,
              color: lang === l ? '#020810' : `rgba(${rgb},0.5)`
            },
            children: l
          }, l, false))
        }, void 0, false)]
      }, void 0, true)]
    }, void 0, true);
  };

  // ── Progress bar ───────────────────────────────────────────────────────────────
  const ProgressBar = ({
    accent
  }) => {
    const [width, setWidth] = useState(0);
    const rgb = window.accentRgb(accent);
    useEffect(() => {
      let raf = 0;
      const onScroll = () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          const doc = document.documentElement;
          const pct = window.scrollY / (doc.scrollHeight - doc.clientHeight) * 100;
          setWidth(Math.min(100, pct));
          raf = 0;
        });
      };
      window.addEventListener('scroll', onScroll, {
        passive: true
      });
      return () => {
        window.removeEventListener('scroll', onScroll);
        if (raf) cancelAnimationFrame(raf);
      };
    }, []);
    return /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px',
        width: `${width}%`,
        background: `linear-gradient(90deg,${accent},rgba(${rgb},0.6))`,
        zIndex: 9999,
        boxShadow: `0 0 8px rgba(${rgb},0.6)`,
        transition: 'width 80ms linear',
        pointerEvents: 'none'
      }
    }, void 0, false);
  };

  // ── Main App ───────────────────────────────────────────────────────────────────
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "accent": "#00d4ff",
    "heroDensity": "normal",
    "bgVariant": "dark"
  } /*EDITMODE-END*/;
  const App = () => {
    const [lang, setLang] = useState(() => localStorage.getItem('sg_lang') || 'es');
    const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
      localStorage.setItem('sg_lang', lang);
      document.documentElement.lang = lang;
    }, [lang]);
    const t = TRANS[lang];
    const accent = tweaks.accent;
    return /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(_jsxDevRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(LoadingScreen, {
        onComplete: () => setLoaded(true)
      }, void 0, false), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("div", {
        children: [/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(ProgressBar, {
          accent: accent
        }, void 0, false), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(DynamicIsland, {
          accent: accent
        }, void 0, false), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(Navbar, {
          t: t,
          lang: lang,
          setLang: setLang,
          accent: accent
        }, void 0, false), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(HeroSection, {
          t: t,
          accent: accent,
          density: tweaks.heroDensity
        }, void 0, false), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(AboutSection, {
          t: t,
          accent: accent
        }, void 0, false), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(EducationSection, {
          t: t,
          accent: accent
        }, void 0, false), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(ProjectsSection, {
          t: t,
          accent: accent
        }, void 0, false), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(ArticlesSection, {
          t: t,
          accent: accent
        }, void 0, false), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(ContactSection, {
          t: t,
          accent: accent
        }, void 0, false), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(FooterSection, {
          t: t,
          accent: accent
        }, void 0, false), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(TweaksPanel, {
          children: [/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(TweakSection, {
            label: "Accent Color",
            children: /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(TweakColor, {
              id: "accent",
              options: ['#00d4ff', '#9b4dff', '#00dc6e']
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(TweakSection, {
            label: "Hero Style",
            children: /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(TweakRadio, {
              id: "heroDensity",
              options: ['compact', 'normal', 'spacious']
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)]
    }, void 0, true);
  };
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(App, {}, void 0, false));
});