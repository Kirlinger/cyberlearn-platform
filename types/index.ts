export interface Lesson {
  id: string;
  section: string;
  title: string;
  definitionFr: string;
  conceptHt: string;
  whyItMatters: string;
  deepExplanation: string;
  steps: string[];
  code: string;
  coreConcepts: string[];
  commonMistakes: string[];
  practicalExercises: string[];
  challengeExercises: string[];
  quiz: string[];
  summary: string;
  relatedTopics: string[];
  nextLesson?: string;
}

export interface Roadmap {
  id: string;
  title: string;
  level: string;
  milestones: string[];
}

export interface Lab {
  id: string;
  title: string;
  objective: string;
  steps: string[];
}

export interface Resources {
  platforms: string[];
  books: string[];
  tools: string[];
}

export interface Career {
  intro: string;
  roles: string[];
  portfolioChecklist: string[];
}

export type Language = "en" | "fr" | "ht";

export interface UITranslations {
  platform: string;
  tagline: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroDescription: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  search: string;
  dashboard: string;
  home: string;
  courses: string;
  progress: string;
  glossary: string;
  resources: string;
  career: string;
  roadmaps: string;
  labs: string;
  relatedTopics: string;
  nextLesson: string;
  quiz: string;
  commonMistakes: string;
  sections: string;
  allSections: string;
  lessonCatalog: string;
  sectionCoverage: string;
  lessonsCount: string;
  noResults: string;
  definition: string;
  creole: string;
  whyItMatters: string;
  coreConcepts: string;
  deepExplanation: string;
  steps: string;
  codeCommands: string;
  practicalExercises: string;
  challengeExercises: string;
  summary: string;
  login: string;
  signup: string;
  logout: string;
  email: string;
  password: string;
  name: string;
  loginTitle: string;
  loginSubtitle: string;
  signupTitle: string;
  signupSubtitle: string;
  orContinueWith: string;
  noAccount: string;
  haveAccount: string;
  forgotPassword: string;
  darkMode: string;
  lightMode: string;
  statsLessons: string;
  statsSections: string;
  statsLabs: string;
  statsQuizzes: string;
  pathCompletion: string;
  weeklyPractice: string;
  overallProgress: string;
  filterBySection: string;
  backToHome: string;
  lessonNotFound: string;
  mobileMenu: string;
  close: string;
  adminDashboard: string;
  welcomeBack: string;
  totalStudents: string;
  activeUsers: string;
  completionRate: string;
  revenue: string;
  recentActivity: string;
  popularCourses: string;
  enrollments: string;
  unauthorized: string;
  unauthorizedMsg: string;
  goToLogin: string;
}
