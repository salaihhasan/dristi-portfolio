import { PortfolioData } from '../types/portfolio';
import { asset } from '../utils/assetPath';


/**
 * ============================================================================
 * CENTRALIZED PORTFOLIO DATA LAYER (Single Source of Truth)
 * ============================================================================
 * 
 * Instructions for non-technical content updates:
 * - Update text, education, skills, or links directly in this file.
 * - All components consume this data automatically.
 * - No personal facts are fabricated.
 * - Phone numbers and residential addresses are omitted for privacy.
 * - Conceptual case studies are explicitly tagged with `isConceptual: true`.
 * ============================================================================
 */

export const portfolioData: PortfolioData = {
  // Navigation Links — 7 Target Top-Level Destinations
  navigation: [
    { id: 'hero', label: 'Home', href: '#hero', sectionNumber: '01' },
    { id: 'about', label: 'About', href: '#about', sectionNumber: '02' },
    { id: 'skills', label: 'Skills & Instruments', href: '#skills', sectionNumber: '03' },
    { id: 'experience', label: 'Experience', href: '#experience', sectionNumber: '04' },
    { id: 'projects', label: 'Projects', href: '#projects', sectionNumber: '05' },
    { id: 'achievements', label: 'Achievements', href: '#achievements', sectionNumber: '06' },
    { id: 'contact', label: 'Contact', href: '#contact', sectionNumber: '07' },
  ],

  // Hero Section Data
  hero: {
    brandName: 'Drishti.',
    brandSubtitle: 'SCIENCE TODAY · HEALTHIER TOMORROW',
    eyebrow: 'MEDICAL LABORATORY TECHNOLOGIST',
    headingPrefix: 'Turning Science into',
    headingAccent: 'Better Lives',
    shortBio:
      "I'm Drishti, a B.Voc MLT student passionate about laboratory science, diagnostics, and contributing to a healthier tomorrow through accurate results and continuous learning.",
    primaryCta: {
      label: 'Explore My Work',
      href: '#projects',
    },
    secondaryCta: {
      label: 'Download Resume',
      href: asset('/assets/docs/resume.docx'),
    },
    heroImage: asset('/assets/profile/dristi_heroSection.png'),

    stats: [
      {
        id: 'stat-degree',
        value: 'B.Voc (MLT)',
        label: 'Medical Laboratory Technology',
        sublabel: 'Learning Today, Leading Tomorrow',
      },
      {
        id: 'stat-techniques',
        value: '10+',
        label: 'Lab Techniques',
        sublabel: 'Hands-on Experience',
      },
      {
        id: 'stat-certs',
        value: '5+',
        label: 'Certifications',
        sublabel: 'Continuous Learning',
      },
      {
        id: 'stat-mission',
        value: 'A Healthier',
        label: 'Tomorrow',
        sublabel: "That's the Goal",
      },
    ],
    polaroidNotes: [
      { text: 'Small Steps Big Impact ♡', rotation: '-2deg' },
      { text: 'Laboratory People Possibilities ♡', rotation: '3deg' },
    ],
    quote: 'Because behind every report, there’s a human story.',
  },

  // About Section & Biographical Data
  profile: {
    fullName: 'Drishti Sharma',
    professionalTitle: 'B.Voc Medical Laboratory Technology Student',
    academicStanding: '2nd Year / 3rd Semester',
    institution: 'PW Institute of Innovation / Mangalayatan University',
    location: 'New Delhi, India',
    aboutHeadlinePrefix: 'Curiosity drives a',
    aboutHeadlineAccent: 'Healthier Tomorrow.',
    bioSummary:
      'I chose Medical Laboratory Technology because laboratory investigations are an indispensable cornerstone of modern healthcare and clinical diagnosis. I want to deeply understand the science behind diagnostic testing while developing practical skills that directly contribute to patient care.',
    whyMlt:
      'Laboratory investigations form the foundation of clinical decisions. Knowing how precision at the bench translates to life-saving medical care inspired me to specialize in laboratory technology.',
    mltInterests: [
      'Molecular Diagnostics & PCR',
      'Clinical Biochemistry & Metabolic Profiles',
      'Microbiology & Antimicrobial Sensitivity',
      'Laboratory Automation & Digital Workflows',
      'Quality Assurance & Quality Control (QC)',
      'Emerging Diagnostic Technologies & Healthcare AI',
    ],
    careerGoal:
      'To become a technology-oriented healthcare professional combining medical laboratory expertise with clinical research, laboratory automation, and healthcare AI to enhance diagnostic precision and patient outcomes.',
    personalityQualities: [
      'Curious and eager to learn',
      'Adaptable to dynamic clinical environments',
      'Detail-oriented with strict precision standards',
      'Consistent and responsible in protocol execution',
      'Open to exploring cutting-edge scientific technologies',
    ],
    coreValues: [
      {
        title: 'Precision',
        description: 'I value rigorous accuracy and standard protocol adherence in every diagnostic step.',
        iconName: 'Precision',
      },
      {
        title: 'Curiosity',
        description: 'Always eager to understand the biochemical mechanisms behind every lab finding.',
        iconName: 'Curiosity',
      },
      {
        title: 'People First',
        description: 'Because every test sample in the laboratory represents a real human life.',
        iconName: 'PeopleFirst',
      },
      {
        title: 'Lifelong Growth',
        description: 'Consistent daily learning to elevate standards and contribute to a healthier society.',
        iconName: 'LifelongGrowth',
      },
    ],
    personalNarrative:
      "I am someone who is naturally curious about people, ideas, and how things work. While my academic foundation is in Medical Laboratory Technology, my interests extend across healthcare, technology, human behavior, and creativity. I believe that stepping into unfamiliar challenges and collaborating across disciplines makes us more observant scientists and compassionate professionals.",
    photos: {
      heroPortrait: asset('/assets/profile/dristi_heroSection.png'),
      framedCircle1: asset('/assets/profile/dristi_img1.png'),
      framedCircle2: asset('/assets/profile/dristi_img2.png'),
    },

  },

  // Education History (Strictly authentic dates & schools from complete_details.pdf)
  education: [
    {
      id: 'edu-class-10',
      yearRange: 'Apr 2021 – Feb 2022',
      qualification: 'Class 10 (Secondary School Examination)',
      boardOrUniversity: 'CBSE Board',
      institution: 'G.G.S.S.S NO.2 Najafgarh, New Delhi',
      percentageOrGrade: '90%',
      status: 'Completed',
      description: 'Built a strong academic foundation with curiosity, discipline, and scientific inquiry.',
    },
    {
      id: 'edu-class-12',
      yearRange: 'Apr 2023 – May 2024',
      qualification: 'Class 12 in PCMB (Physics, Chemistry, Maths, Biology)',
      boardOrUniversity: 'CBSE Board',
      institution: 'G.G.S.S.S NO.1 Najafgarh, New Delhi',
      percentageOrGrade: '80%',
      status: 'Completed',
      description: 'Explored biological sciences, chemistry, and analytical principles, confirming my passion for healthcare sciences.',
    },
    {
      id: 'edu-bvoc-mlt',
      yearRange: 'Sep 2025 – 2028',
      qualification: 'Bachelor of Vocation (B.Voc.) in Medical Lab Technology',
      boardOrUniversity: 'Mangalayatan University',
      institution: 'PW Institute of Innovation',
      status: 'Ongoing',
      description: 'Undergraduate professional program mastering clinical biochemistry, hematology, microbiology, histopathology, and diagnostic instrumentation.',
    },
  ],

  // Skill Categories
  skillCategories: [
    {
      id: 'cat-laboratory',
      categoryName: '01 — Laboratory Practice',
      skills: [
        { name: 'Clinical Testing Protocols' },
        { name: 'Sample Processing & Handling' },
        { name: 'Laboratory Safety & Biosafety SOPs' },
        { name: 'Routine Analytical Techniques' },
      ],
    },
    {
      id: 'cat-diagnostics',
      categoryName: '02 — Diagnostic Disciplines',
      skills: [
        { name: 'Clinical Biochemistry' },
        { name: 'Hematology & Hemostasis' },
        { name: 'Microbiology & Bacteriology' },
        { name: 'Serology & Immunology' },
        { name: 'Blood Banking & Cross-matching' },
      ],
    },
    {
      id: 'cat-foundation',
      categoryName: '03 — Scientific Foundation',
      skills: [
        { name: 'Human Anatomy & Physiology' },
        { name: 'Cell Biology & Genetics' },
        { name: 'Metabolism & Clinical Enzymology' },
        { name: 'General Pathology Concepts' },
      ],
    },
  ],

  // Diagnostic Disciplines (Matching reference card composition)
  diagnosticDisciplines: [
    {
      id: 'disc-hematology',
      code: '01',
      name: 'Hematology',
      topics: 'CBC analysis, Peripheral smear study, ESR, Blood grouping',
    },
    {
      id: 'disc-biochem',
      code: '02',
      name: 'Clinical Biochemistry',
      topics: 'Blood glucose profiles, LFT, KFT, Lipid profiles, Electrolytes',
    },
    {
      id: 'disc-immunology',
      code: '03',
      name: 'Immunology & Serology',
      topics: 'ELISA principles, Rapid diagnostic tests, Widal, VDRL, Serology',
    },
    {
      id: 'disc-microbiology',
      code: '04',
      name: 'Microbiology',
      topics: 'Bacterial culture & sensitivity, Gram staining, Microscopic evaluation',
    },
    {
      id: 'disc-histopathology',
      code: '05',
      name: 'Histopathology',
      topics: 'Tissue fixation, Processing, Microtomy, Routine H&E staining',
    },
    {
      id: 'disc-molecular',
      code: '06',
      name: 'Molecular Diagnostics',
      topics: 'PCR fundamentals, RT-PCR concepts, Nucleic acid amplification',
    },
  ],

  // Practical Techniques (With genuine intermediate proficiency indicators)
  practicalTechniques: [
    {
      id: 'tech-phlebotomy',
      name: 'Phlebotomy',
      level: 'Intermediate Practical Competence',
      percentageIndicator: 90,
      description: 'Venipuncture techniques, correct vacutainer order of draw, and patient comfort protocols.',
    },
    {
      id: 'tech-sample-processing',
      name: 'Sample Processing',
      level: 'Intermediate Practical Competence',
      percentageIndicator: 85,
      description: 'Sample reception, centrifugation parameters, serum/plasma separation, and aliquoting.',
    },
    {
      id: 'tech-microscopy',
      name: 'Microscopy',
      level: 'Intermediate Practical Competence',
      percentageIndicator: 80,
      description: 'Brightfield compound microscope alignment, oil immersion lens operation, and cellular morphology observation.',
    },
    {
      id: 'tech-staining',
      name: 'Staining Techniques',
      level: 'Intermediate Practical Competence',
      percentageIndicator: 75,
      description: 'Gram staining for bacteria, Leishman staining for peripheral blood smears, and slide fixation.',
    },
  ],

  // Laboratory Instruments Used
  instruments: [
    {
      id: 'inst-microscope',
      number: '01',
      name: 'Compound Microscope',
      category: 'Optical Diagnostics',
      experienceType: 'Hands-on Clinical Experience',
      description: 'Used for cellular morphology examinations, bacterial slide inspection, and hematological differential counts.',
      keyFunctions: ['Magnification up to 1000x', 'Brightfield illumination', 'Oil immersion objective navigation'],
    },
    {
      id: 'inst-centrifuge',
      number: '02',
      name: 'Laboratory Centrifuge',
      category: 'Sample Separation',
      experienceType: 'Hands-on Clinical Experience',
      description: 'Used for separating blood cells from serum and plasma, and preparing urine sediments.',
      keyFunctions: ['RCF and RPM calibration', 'Balanced rotor loading', 'Sample integrity protection'],
    },
    {
      id: 'inst-incubator',
      number: '03',
      name: 'Bacteriological Incubator',
      category: 'Microbiological Culture',
      experienceType: 'Hands-on Clinical Experience',
      description: 'Maintains optimal 37°C controlled temperature environments for bacterial and microbial growth.',
      keyFunctions: ['Precise thermal regulation', 'Uniform air circulation', 'Contamination avoidance'],
    },
    {
      id: 'inst-oven',
      number: '04',
      name: 'Hot Air Oven',
      category: 'Sterilization',
      experienceType: 'Hands-on Clinical Experience',
      description: 'Provides dry heat sterilization for laboratory glassware, pipettes, and heat-stable metal instruments.',
      keyFunctions: ['Dry heat sterilization at 160°C', 'Thermal timer control', 'Moisture-free decontamination'],
    },
    {
      id: 'inst-colorimeter',
      number: '05',
      name: 'Photoelectric Colorimeter',
      category: 'Photometric Analysis',
      experienceType: 'Hands-on Clinical Experience',
      description: 'Measures optical density of colored solutions based on Beer-Lambert law for quantitative biochemistry.',
      keyFunctions: ['Filter wavelength selection', 'Reagent blank calibration', 'Concentration measurement'],
    },
    {
      id: 'inst-waterbath',
      number: '06',
      name: 'Serological Water Bath',
      category: 'Incubation & Warming',
      experienceType: 'Hands-on Clinical Experience',
      description: 'Provides constant temperature incubation for enzymatic reactions, serological tests, and reagent pre-warming.',
      keyFunctions: ['Constant temperature holding (37°C - 56°C)', 'Enzymatic assay incubation', 'Gentle liquid warming'],
    },
  ],

  // Clinical & Industry Experience
  clinicalExperience: [
    {
      id: 'exp-hospital-visit',
      number: '01',
      title: 'Clinical Laboratory Hospital Visit',
      role: 'MLT Student Observer & Practical Trainee',
      organizationOrEvent: 'Clinical Diagnostic & Pathology Center',
      exposureType: 'Clinical Lab Exposure',
      description:
        'An enriching clinical immersion exploring biochemistry, hematology, microbiology, and histopathology laboratories. Observed real-world diagnostic workflows, automated analyzers, biosafety practices, and Laboratory Information System (LIS) reporting.',
      keyLearnings: [
        'Observed clinical biochemistry analyzer workflows and internal quality control validation',
        'Studied blood sample handling protocols and automated hematology cell counters',
        'Examined diagnostic culture inoculation and antibiotic sensitivity testing procedures',
        'Gained insight into clinical turnaround times and error prevention in critical reporting',
      ],
      image: asset('/assets/experience/hospital_visit.png'),
    },
    {
      id: 'exp-eye-camp',
      number: '02',
      title: 'Eye Check-up & Cancer Awareness Camp',
      role: 'Healthcare Screening Volunteer',
      organizationOrEvent: 'Community Health Initiative',
      exposureType: 'Community Healthcare Screening',
      description:
        'Supported a community healthcare outreach initiative providing preliminary vision screening and cancer awareness guidance; collaborated with medical faculty, healthcare professionals, and fellow volunteers.',
      keyLearnings: [
        'Facilitated patient intake, preliminary questionnaires, and basic triage recording',
        'Communicated preventive health screening guidelines to diverse community members',
        'Coordinated interprofessional handoffs between screening teams and consulting doctors',
      ],
      image: asset('/assets/experience/Eye_checkup.png'),
    },
    {
      id: 'exp-hand-hygiene',
      number: '03',
      title: 'World Hand Hygiene Day Initiative',
      role: 'Student Health Volunteer',
      organizationOrEvent: 'Public Health Awareness Campaign',
      exposureType: 'Public Health Awareness',
      description:
        'Led a school-based public health awareness drive demonstrating WHO standard 6-step hand hygiene protocols and educating students on microbial transmission prevention.',
      keyLearnings: [
        'Taught microbiological transmission concepts and aseptic techniques to students',
        'Demonstrated correct sanitization timing to prevent nosocomial and community infections',
      ],
      image: asset('/assets/experience/world_handHygene_day.jpeg'),
    },
    {
      id: 'exp-india-health',
      number: '04',
      title: 'India Health Healthcare Expo',
      role: 'Industry & Technology Delegate',
      organizationOrEvent: 'India Health Global Exhibition',
      exposureType: 'Technology Conference',
      description:
        'Explored state-of-the-art diagnostic technologies, in-vitro diagnostics (IVD), clinical chemistry innovations, medical imaging advancements, and point-of-care testing devices.',
      keyLearnings: [
        'Engaged with next-generation automated molecular diagnostic instruments',
        'Reviewed emerging Point-of-Care Testing (POCT) and microfluidic technologies',
        'Observed modern digital pathology scanners and AI-assisted diagnostic software',
      ],
      image: asset('/assets/experience/India Health.jpeg'),

    },
  ],

  // Academic Projects (STRICTLY LABELED AS ACADEMIC CONCEPTS / SAMPLE FRAMEWORKS)
  // No fake results, fake patients, or fake statistics are claimed.
  academicProjects: [
    {
      id: 'proj-anemia',
      number: '01',
      title: 'Assessment of Anemia Prevalence Framework',
      category: 'Hematology',
      status: 'Academic Concept',
      isConceptual: true,
      conceptDisclaimer:
        'Academic Study Framework: This concept outlines the theoretical methodology for evaluating anemia prevalence using automated CBC parameters and peripheral blood morphology.',
      objective: 'To design a diagnostic protocol for identifying microcytic hypochromic anemia in screening demographics.',
      methodologyFramework: 'Theoretical protocol involving sample collection in K2-EDTA, automated cell counting (Hb, RBC, MCV, MCH, RDW), and Leishman smear confirmation.',
      theoreticalTechniques: ['CBC Parameter Analysis', 'RBC Indices Calculation', 'Peripheral Smear Examination'],
      intendedLearningOutcome: 'Mastery of differential diagnosis algorithms between iron-deficiency anemia and hemoglobinopathies.',
    },
    {
      id: 'proj-glucose',
      number: '02',
      title: 'Comparative Analysis of Blood Glucose Methodologies',
      category: 'Biochemistry',
      status: 'Academic Concept',
      isConceptual: true,
      conceptDisclaimer:
        'Academic Study Framework: Theoretical comparative analysis between GOD-POD enzymatic photometric assays and glucometer hexokinase methods.',
      objective: 'To analyze analytical accuracy, reagent stability, and interfering substances across clinical glucose testing modalities.',
      methodologyFramework: 'Evaluating fasting and postprandial reference ranges, fluoride oxalate glycolysis inhibition, and photometric absorbance curves.',
      theoreticalTechniques: ['GOD-POD Enzymatic Method', 'Spectrophotometric Measurement', 'Calibration Curve Verification'],
      intendedLearningOutcome: 'In-depth comprehension of pre-analytical errors in glucose preservation and enzymatic specificity.',
    },
    {
      id: 'proj-pathogens',
      number: '03',
      title: 'Isolation & Phenotypic Identification of Bacterial Pathogens',
      category: 'Microbiology',
      status: 'Academic Concept',
      isConceptual: true,
      conceptDisclaimer:
        'Academic Study Framework: Standard laboratory workflow for isolating enteric pathogens using selective and differential media.',
      objective: 'To outline standard operational protocols for bacterial culture, colony characterization, and biochemical testing.',
      methodologyFramework: 'Four-quadrant streak plating on MacConkey and Blood agar, Gram differentiation, and IMViC biochemical series.',
      theoreticalTechniques: ['Aseptic Inoculation', 'Differential Media Plating', 'Biochemical Series (Catalase, Oxidase, IMViC)'],
      intendedLearningOutcome: 'Practical mastery of diagnostic microbiology identification keys and standard biosafety protocols.',
    },
    {
      id: 'proj-histopathology',
      number: '04',
      title: 'Histopathological Tissue Processing & Slide Study',
      category: 'Histopathology',
      status: 'Sample Framework',
      isConceptual: true,
      conceptDisclaimer:
        'Academic Study Framework: Educational study framework illustrating the sequential stages of histological slide preparation.',
      objective: 'To map the precision steps required to convert gross biopsy tissue into diagnostic microscopic slides.',
      methodologyFramework: 'Step-by-step documentation of 10% neutral buffered formalin fixation, dehydration, clearing in xylene, paraffin embedding, and microtomy.',
      theoreticalTechniques: ['Tissue Fixation & Processing', 'Paraffin Section Microtomy', 'Hematoxylin & Eosin (H&E) Staining'],
      intendedLearningOutcome: 'Recognition of processing artifacts and understanding the critical importance of thin, fold-free sectioning.',
    },
    {
      id: 'proj-qc-management',
      number: '05',
      title: 'Quality Control & Validation Framework in Clinical Labs',
      category: 'Quality Control',
      status: 'Sample Framework',
      isConceptual: true,
      conceptDisclaimer:
        'Academic Study Framework: Conceptual laboratory quality management model applying Westgard multi-rules and Levey-Jennings charts.',
      objective: 'To establish standard quality control protocols for verifying daily analyzer calibration and detecting analytical errors.',
      methodologyFramework: 'Simulating internal quality control (IQC) run charts, calculating mean and standard deviation (SD), and applying Westgard warning rules.',
      theoreticalTechniques: ['Levey-Jennings Chart Plotting', 'Westgard Rules (1-2s, 1-3s, 2-2s)', 'Pre-analytical Error Auditing'],
      intendedLearningOutcome: 'Deep appreciation for analytical rigor, calibration curves, and root-cause analysis in diagnostic discrepancies.',
    },
  ],

  // Research & Journal (STRICTLY LABELED AS LITERATURE EXPLORATIONS / AREAS OF INTEREST)
  // No published papers or fake research claims.
  journalExplorations: [
    {
      id: 'journal-molecular-dx',
      number: '01',
      title: 'Advances in Molecular Diagnostics: From Traditional Culture to Real-Time PCR',
      category: 'Molecular Diagnostics',
      status: 'Literature Exploration',
      isExplorationOnly: true,
      summary:
        'A literature review exploring how real-time polymerase chain reaction (RT-PCR) and molecular probes have transformed turnaround times and sensitivity in pathogen identification compared to classical microbiology.',
      keyInquiries: [
        'How multiplex PCR reduces diagnostic windows in bloodstream infections',
        'Challenges of primer specificity and contamination control in clean room environments',
        'Integrating molecular results into automated hospital LIS systems',
      ],
      relatedInterests: ['PCR Technology', 'Infectious Disease Diagnostics', 'Genomic Testing'],
      estimatedReadTime: '5 min exploration',
    },
    {
      id: 'journal-automation-ai',
      number: '02',
      title: 'The Evolution of Laboratory Automation: Robotics & AI in Clinical Biochemistry',
      category: 'Laboratory Automation',
      status: 'Area of Interest',
      isExplorationOnly: true,
      summary:
        'An exploratory inquiry into automated track systems, auto-verification algorithms, and computer vision for peripheral blood smear differential analysis.',
      keyInquiries: [
        'How pre-analytical robotic sorters reduce sample hemolysis and mislabeling',
        'The role of machine learning in flagging anomalous cellular morphologies for pathologist review',
        'Balancing technological automation with manual microscopic validation',
      ],
      relatedInterests: ['AI in Diagnostics', 'High-Throughput Analyzers', 'Digital Pathology'],
      estimatedReadTime: '4 min exploration',
    },
    {
      id: 'journal-qc-excellence',
      number: '03',
      title: 'Total Quality Management: Minimizing Pre-Analytical Discrepancies in Phlebotomy',
      category: 'Clinical Biochemistry',
      status: 'Theoretical Study Note',
      isExplorationOnly: true,
      summary:
        'A study note analyzing published guidelines on pre-analytical factors (prolonged tourniquet application, incorrect additive ratios, temperature during transport) that cause spurious lab results.',
      keyInquiries: [
        'Pseudohyperkalemia induced by in-vitro hemolysis and muscle clenching',
        'The critical impact of anticoagulant-to-blood ratios in coagulation testing',
        'Developing robust standard operating procedures (SOPs) for collection staff',
      ],
      relatedInterests: ['Quality Assurance', 'Pre-Analytical Errors', 'Phlebotomy Best Practices'],
      estimatedReadTime: '4 min exploration',
    },
  ],

  // Certifications & Professional Accreditations
  certifications: [
    {
      id: 'cert-ai-healthcare',
      title: 'AI in Healthcare',
      issuingOrganization: 'ILMA Biomedical',
      issueDate: 'Sep 2026',
      category: 'Healthcare & Biotechnology',
      hasImageAttachment: true,
      image: asset('/assets/certificates/AI IN Healthcare.jpeg'),
      description: 'Exploration of artificial intelligence applications in clinical diagnostics, medical imaging, and healthcare workflow optimization.',
    },
    {
      id: 'cert-beyond-lab',
      title: 'Beyond the Lab: The Future of Biotechnology and Innovation',
      issuingOrganization: 'Micrylis Biotech',
      issueDate: 'Jul 2026',
      category: 'Healthcare & Biotechnology',
      hasImageAttachment: true,
      image: asset('/assets/certificates/Beyond_The lab.png'),
      description: 'Comprehensive program exploring modern biotechnology innovations, lab-to-market translation, and diagnostic technology trends.',

    },
    {
      id: 'cert-google-ai-essentials',
      title: 'Google AI Essentials',
      issuingOrganization: 'Google',
      issueDate: 'Jun 2026',
      category: 'AI & Emerging Technology',
      hasImageAttachment: false,
      description: 'Foundational certification in artificial intelligence concepts, modern machine learning tools, and productivity applications.',
    },
    {
      id: 'cert-google-intro-ai',
      title: 'Introduction to AI',
      issuingOrganization: 'Google',
      issueDate: 'May 2026',
      category: 'AI & Emerging Technology',
      hasImageAttachment: false,
      description: 'Core concepts of artificial intelligence, machine learning architectures, and modern technological capabilities.',
    },
    {
      id: 'cert-google-ai-responsibly',
      title: 'Use AI Responsibly',
      issuingOrganization: 'Google',
      issueDate: 'Jun 2026',
      category: 'AI & Emerging Technology',
      hasImageAttachment: false,
      description: 'Principles of ethical AI deployment, algorithmic fairness, privacy protection, and responsible data usage.',
    },
    {
      id: 'cert-claude-101',
      title: 'Claude 101',
      issuingOrganization: 'Anthropic',
      issueDate: 'May 2026',
      category: 'AI & Emerging Technology',
      hasImageAttachment: false,
      description: 'Foundations of large language models, prompt structuring, and reliable AI-assisted workflows.',
    },
    {
      id: 'cert-google-prompting-essentials',
      title: 'Google Prompting Essentials',
      issuingOrganization: 'Google',
      issueDate: 'May 2026',
      category: 'Prompting & Data',
      hasImageAttachment: false,
      description: 'Techniques for effective prompt engineering, structured reasoning, and extracting high-fidelity data.',
    },
    {
      id: 'cert-google-design-prompts',
      title: 'Design Prompts for Everyday Work Tasks',
      issuingOrganization: 'Google',
      issueDate: 'Jun 2026',
      category: 'Prompting & Data',
      hasImageAttachment: false,
      description: 'Practical prompt design for automating repetitive documentation, synthesis, and workflow tasks.',
    },
    {
      id: 'cert-google-prompting-pro',
      title: 'Start Writing Prompts Like a Pro',
      issuingOrganization: 'Google',
      issueDate: 'May 2026',
      category: 'Prompting & Data',
      hasImageAttachment: false,
      description: 'Advanced prompt framing, parameter control, and iterative problem-solving with generative AI models.',
    },
    {
      id: 'cert-google-data-analysis',
      title: 'Speed Up Data Analysis and Presentation Building',
      issuingOrganization: 'Google',
      issueDate: 'Jun 2026',
      category: 'Prompting & Data',
      hasImageAttachment: false,
      description: 'Leveraging AI tools for rapid data cleaning, statistical pattern discovery, and executive presentation synthesis.',
    },
    {
      id: 'cert-breaking-pm',
      title: 'Breaking into Product Management',
      issuingOrganization: 'Airtribe',
      issueDate: 'Sep 2026',
      category: 'Product & Professional',
      hasImageAttachment: false,
      description: 'Product lifecycle fundamentals, user problem validation, roadmap execution, and cross-functional leadership.',
    },
    {
      id: 'cert-hp-networking',
      title: 'Professional Networking for Career Growth',
      issuingOrganization: 'HP LIFE',
      issueDate: 'Jun 2026',
      category: 'Product & Professional',
      hasImageAttachment: false,
      description: 'Strategies for professional relationship building, industry collaboration, and executive communication.',
    },
    {
      id: 'cert-iide-digital-marketing',
      title: 'Digital Marketing Fundamentals & AI in Marketing',
      issuingOrganization: 'IIDE – The Digital School',
      issueDate: 'Mar 2026',
      category: 'Digital Skills',
      hasImageAttachment: false,
      description: 'Digital communication channels, data-driven content strategy, and AI-assisted marketing tools.',
    },
    {
      id: 'cert-unstop-ai-quiz',
      title: 'AI Quiz 2026 Recognition',
      issuingOrganization: 'Unstop',
      issueDate: 'Jul 2026',
      category: 'Academic Recognition',
      hasImageAttachment: false,
      description: 'National-level competitive evaluation assessing theoretical understanding of AI concepts and modern applications.',
    },
  ],

  // Leadership, Volunteering & Extracurriculars
  leadershipAndVolunteering: [
    {
      id: 'lead-rift-hackathon',
      title: 'RIFT 2026 Hackathon — Volunteer',
      role: 'Operations & Participant Coordinator',
      description:
        'Supported a 24-hour national hackathon through continuous participant coordination, event logistics assistance, and on-ground team management; honed real-time problem-solving and collaboration under high pressure.',
      keyTakeaways: ['24-Hour operations management', 'Cross-team communication', 'Real-time issue resolution'],
      image: asset('/assets/leadership/rift-volunteer.jpeg'),
    },
    {
      id: 'lead-starlit-gala',
      title: "STARLIT 2025 Fresher's Gala — Event Contributor",
      role: 'Organizing & Stage Contributor',
      description:
        'Assisted the central university organizing committee with event planning, schedule coordination, and stage execution for the annual welcome gala.',
      keyTakeaways: ['Event planning and stage timing', 'Collaborative execution', 'Audience engagement'],
      image: asset('/assets/leadership/Starlit.jpeg'),
    },
    {
      id: 'lead-design-kickstart',
      title: 'Design Kickstart: UX/UI Design Workshop',
      role: 'Workshop Participant',
      description:
        'Gained introductory hands-on exposure to user experience design principles, design thinking frameworks, wireframing, and modern design tools.',
      keyTakeaways: ['User-centered design thinking', 'Visual hierarchy and layout principles', 'Empathy-driven solutions'],
      image: asset('/assets/leadership/design_kickstart.png'),

    },
    {
      id: 'lead-techmate',
      title: 'TechMate 2K26 — Event Contributor',
      role: 'Technology Event Contributor',
      description:
        'Supported the execution of a student-led technology symposium, assisting coordinating teams with participant registration and session transitions.',
      keyTakeaways: ['Technical event logistics', 'Registration desk coordination', 'Speaker assistance'],
    },
  ],

  // Contact Information (Privacy-first: phone & residential address omitted)
  contact: {
    closingHeadline: "Let's connect.",
    subtext:
      'I am always open to discussing diagnostic technology, medical laboratory science, healthcare innovation, or internship opportunities.',
    email: 'drishtisharma962569@gmail.com',
    location: 'New Delhi, India',
    socials: {
      linkedin: 'https://www.linkedin.com/in/drishti-sharma-307940328',
      instagram: 'https://www.instagram.com/sharma_drishtiii?stkn=bjk5N3kxaTJrcWZ5',
      email: 'drishtisharma962569@gmail.com',
      // github is intentionally omitted per user decision until authentic URL is provided
    },
    resumeDownloadUrl: asset('/assets/docs/resume.docx'),
  },
};

