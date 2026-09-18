import { type IconType } from "react-icons";

export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export interface HeroData {
  readonly tagline: string;
  readonly title: string;
  readonly lead: string;
  readonly primaryCta: string;
  readonly secondaryCta: string;
}

export interface DashStat {
  readonly value: string;
  readonly label: string;
}

export interface DashTask {
  readonly text: string;
  readonly done: boolean;
  readonly required: boolean;
}

export interface DashboardMockData {
  readonly greeting: string;
  readonly date: string;
  readonly streak: string;
  readonly stats: readonly DashStat[];
  readonly tasks: readonly DashTask[];
}

export interface FlowStep {
  readonly step: number;
  readonly title: string;
  readonly description: string;
}

export interface Feature {
  readonly title: string;
  readonly description: string;
  readonly icon: IconType;
}

export interface ConsistencyStats {
  readonly currentStreak: number;
  readonly longestStreak: number;
  readonly monthlyRate: number;
  readonly totalDays: number;
  readonly currentStreakLabel: string;
  readonly longestStreakLabel: string;
  readonly monthlyRateLabel: string;
  readonly totalDaysLabel: string;
}

export interface CalendarDay {
  readonly status: "success" | "missed" | "empty" | "today" | "pending";
}

export interface InsightCategory {
  readonly name: string;
  readonly percentage: number;
  readonly opacity: number;
}

export interface Horizons {
  readonly badge: string;
  readonly title: string;
  readonly description: string;
  readonly previewType: string;
}

export interface ReportStat {
  readonly value: string;
  readonly label: string;
  readonly colorClass?: string;
}

export interface MonthBar {
  readonly height: string;
  readonly opacity: number;
  readonly label: string;
  readonly filled: boolean;
}

export interface FooterLink {
  readonly label: string;
  readonly href: string;
}

export interface FooterColumn {
  readonly title: string;
  readonly links: readonly FooterLink[];
}

export interface ContactInfo {
  readonly email: string;
  readonly phone: string;
  readonly linkedin: string;
  readonly github: string;
}
