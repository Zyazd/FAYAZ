export interface AutomationResponse {
  nicheAnalysis: string;
  videoBlueprint: string;
  script: string;
  seo: string;
  thumbnails: string;
  shorts: string;
  uploadStrategy: string;
  monetization: string;
}

export enum TabView {
  ANALYSIS = 'ANALYSIS',
  BLUEPRINT = 'BLUEPRINT',
  SCRIPT = 'SCRIPT',
  SEO = 'SEO',
  THUMBNAILS = 'THUMBNAILS',
  SHORTS = 'SHORTS',
  STRATEGY = 'STRATEGY',
  MONETIZATION = 'MONETIZATION'
}