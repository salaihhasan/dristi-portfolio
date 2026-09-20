/**
 * TypeScript Data Models for Dristi MLT Portfolio
 * 
 * Strict compile-time contracts ensuring data separation, factual integrity,
 * explicit conceptual badges, and non-technical editability.
 */

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  sectionNumber: string;
}

export interface SocialLinks {
  linkedin: string;
  instagram: string;
  email: string;
  github?: string; // Optional - omitted per user decision until authentic URL provided
}

export interface HeroData {
  brandName: string;
  brandSubtitle: string;
  eyebrow: string;
  headingPrefix: string;
  headingAccent: string;
  shortBio: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  heroImage: string;
  stats: Array<{
    id: string;
    value: string;
    label: string;
    sublabel: string;
  }>;
  polaroidNotes: Array<{
    text: string;
    rotation?: string;
  }>;
  quote: string;
}

export interface CoreValue {
  title: string;
  description: string;
  iconName: 'Precision' | 'Curiosity' | 'PeopleFirst' | 'LifelongGrowth';
}

export interface ProfileData {
  fullName: string;
  professionalTitle: string;
  academicStanding: string;
  institution: string;
  location: string;
  aboutHeadlinePrefix: string;
  aboutHeadlineAccent: string;
  bioSummary: string;
  whyMlt: string;
  mltInterests: string[];
  careerGoal: string;
  personalityQualities: string[];
  coreValues: CoreValue[];
  personalNarrative: string;
  photos: {
    heroPortrait: string;
    framedCircle1: string;
    framedCircle2: string;
  };
}

export interface EducationItem {
  id: string;
  yearRange: string;
  qualification: string;
  boardOrUniversity: string;
  institution: string;
  percentageOrGrade?: string;
  status: 'Completed' | 'Ongoing';
  description: string;
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  skills: Array<{
    name: string;
    note?: string;
  }>;
}

export interface DiagnosticDiscipline {
  id: string;
  code: string;
  name: string;
  topics: string;
}

export interface PracticalTechnique {
  id: string;
  name: string;
  level: string;
  percentageIndicator?: number;
  description: string;
}

export interface LaboratoryInstrument {
  id: string;
  number: string;
  name: string;
  category: string;
  experienceType: 'Hands-on Clinical Experience' | 'Academic Practical Experience';
  description: string;
  keyFunctions: string[];
  image?: string;
}

export interface ClinicalExperienceItem {
  id: string;
  number: string;
  title: string;
  role: string;
  organizationOrEvent: string;
  exposureType: 'Clinical Lab Exposure' | 'Community Healthcare Screening' | 'Public Health Awareness' | 'Technology Conference';
  description: string;
  keyLearnings: string[];
  image?: string;
}

export type ProjectStatus = 'Academic Concept' | 'Sample Framework' | 'Coming Soon';

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: 'Hematology' | 'Biochemistry' | 'Microbiology' | 'Histopathology' | 'Quality Control';
  status: ProjectStatus;
  isConceptual: true; // Strict flag ensuring this is never rendered as real clinical work
  conceptDisclaimer: string;
  objective: string;
  methodologyFramework: string;
  theoreticalTechniques: string[];
  intendedLearningOutcome: string;
}

export type JournalStatus = 'Literature Exploration' | 'Area of Interest' | 'Theoretical Study Note';

export interface JournalItem {
  id: string;
  number: string;
  title: string;
  category: string;
  status: JournalStatus;
  isExplorationOnly: true; // Strict flag ensuring this is never claimed as published paper
  summary: string;
  keyInquiries: string[];
  relatedInterests: string[];
  estimatedReadTime: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  category: 'Healthcare & Biotechnology' | 'AI & Emerging Technology' | 'Prompting & Data' | 'Product & Professional' | 'Digital Skills' | 'Academic Recognition';
  hasImageAttachment: boolean;
  image?: string;
  description?: string;
}

export interface LeadershipItem {
  id: string;
  title: string;
  role: string;
  description: string;
  keyTakeaways: string[];
  image?: string;
}

export interface ContactData {
  closingHeadline: string;
  subtext: string;
  email: string;
  location: string;
  socials: SocialLinks;
  resumeDownloadUrl: string;
}

export interface PortfolioData {
  navigation: NavigationItem[];
  hero: HeroData;
  profile: ProfileData;
  education: EducationItem[];
  skillCategories: SkillCategory[];
  diagnosticDisciplines: DiagnosticDiscipline[];
  practicalTechniques: PracticalTechnique[];
  instruments: LaboratoryInstrument[];
  clinicalExperience: ClinicalExperienceItem[];
  academicProjects: ProjectItem[];
  journalExplorations: JournalItem[];
  certifications: CertificationItem[];
  leadershipAndVolunteering: LeadershipItem[];
  contact: ContactData;
}
