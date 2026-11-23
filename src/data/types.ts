export interface Line {
  id: string;
  name: string;
  flag: string;
  location: string;
  sponsor: string;
  tagline: string;
  description: string;
  ping: number;
  bandwidth: string;
  load: number;
  premium: boolean;
  badge?: string;
  perks: string[];
  accent: string;
  ipAfter: string;
  ipLocation: string;
}

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  subtitle: string;
  monthly: number;
  yearly: number;
  lifetime?: number;
  emoji: string;
  cta: string;
  highlight?: boolean;
  tag?: string;
  features: PlanFeature[];
}

export interface Review {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  plan: string;
  text: string;
}

export interface Feature {
  icon: string;
  title: string;
  desc: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface DownloadItem {
  icon: string;
  name: string;
  meta: string;
  size: string;
}

export interface PaymentMethod {
  icon: string;
  name: string;
}
