import {
  HiOutlineCalendar,
  HiOutlineStar,
  HiOutlineBell,
  HiOutlineBolt,
  HiOutlineChartBar,
  HiOutlineEye,
} from "react-icons/hi2";
import {
  type NavLink,
  type HeroData,
  type DashboardMockData,
  type FlowStep,
  type Feature,
  type ConsistencyStats,
  type CalendarDay,
  type InsightCategory,
  type ReportStat,
  type MonthBar,
  type FooterColumn,
  type LeaderboardEntry,
} from "@/types/landing/landing.type";

export const navLinks: readonly NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const heroData: HeroData = {
  tagline: "Consistency Tracking",
  title: "Turn Daily Intentions Into Consistent Progress",
  lead: "Consista helps you plan what matters, follow through every day, and understand how your effort compounds over time.",
  primaryCta: "Start Your Journey",
  secondaryCta: "Sign In",
} as const;

export const dashboardMockData: DashboardMockData = {
  streak: "12-day streak",
  stats: [
    { value: "87%", label: "Consistency" },
    { value: "4/6", label: "Today" },
    { value: "12", label: "Streak" },
  ],
  tasks: [
    { text: "Morning workout", done: true, required: true },
    { text: "Read 30 minutes", done: true, required: true },
    { text: "Deep work session", done: false, required: true },
    { text: "Journal entry", done: false, required: false },
  ],
} as const;

export const flowSteps: readonly FlowStep[] = [
  { step: 1, title: "Plan", description: "Set what you want to accomplish" },
  { step: 2, title: "Remind", description: "Get timely nudges before each task" },
  { step: 3, title: "Act", description: "Do the work when it matters" },
  { step: 4, title: "Complete", description: "Mark tasks done and build streaks" },
  { step: 5, title: "Measure", description: "See your consistency over time" },
  { step: 6, title: "Improve", description: "Learn patterns and refine your plan" },
] as const;

export const features: readonly Feature[] = [
  { title: "Smart Scheduling", description: "Set tasks with precise times and recurrence patterns. Hourly, daily, or custom intervals — Consista adapts to your rhythm.", icon: HiOutlineCalendar },
  { title: "Required vs. Optional", description: "Distinguish between tasks that matter and nice-to-haves. Only required tasks affect your streak and daily success.", icon: HiOutlineStar },
  { title: "Early Reminders", description: "Get notified 5, 10, 15, or 20 minutes before a task is due. Stay ahead of your schedule, not behind it.", icon: HiOutlineBell },
  { title: "Streak Tracking", description: "Visualize your current streak, longest streak, and consistency percentage. Watch your discipline compound.", icon: HiOutlineBolt },
  { title: "Consistency Analytics", description: "Daily, monthly, and yearly breakdowns show exactly where you stayed consistent and where you fell short.", icon: HiOutlineChartBar },
  { title: "Behavioral Insights", description: "A radar chart shows where your effort actually goes — study, work, exercise, reading — derived from your real task completions.", icon: HiOutlineEye },
] as const;

export const consistencyStats: ConsistencyStats = {
  currentStreak: 12,
  longestStreak: 34,
  monthlyRate: 87,
  totalDays: 248,
  currentStreakLabel: "Current streak days",
  longestStreakLabel: "Longest streak ever",
  monthlyRateLabel: "Monthly consistency rate",
  totalDaysLabel: "Total successful days this year",
};

export const calendarDays: readonly CalendarDay[] = [
  { status: "empty" }, { status: "success" }, { status: "success" }, { status: "success" },
  { status: "success" }, { status: "success" }, { status: "success" },
  { status: "success" }, { status: "success" }, { status: "missed" }, { status: "success" },
  { status: "success" }, { status: "success" }, { status: "success" },
  { status: "success" }, { status: "success" }, { status: "success" }, { status: "today" },
  { status: "empty" }, { status: "empty" }, { status: "empty" },
  { status: "empty" }, { status: "empty" }, { status: "empty" }, { status: "empty" },
  { status: "empty" }, { status: "empty" }, { status: "empty" },
  { status: "empty" }, { status: "empty" }, { status: "empty" },
] as const;

export const insightCategories: readonly InsightCategory[] = [
  { name: "Study", percentage: 34, opacity: 1 },
  { name: "Work", percentage: 26, opacity: 0.7 },
  { name: "Exercise", percentage: 18, opacity: 0.5 },
  { name: "Reading", percentage: 12, opacity: 0.35 },
  { name: "Personal Growth", percentage: 10, opacity: 0.25 },
] as const;

export const horizons = [
  {
    badge: "DAILY",
    title: "Today's Tasks",
    description: "4 of 5 required tasks completed. One more to go.",
    previewType: "daily",
  },
  {
    badge: "MONTHLY",
    title: "Monthly View",
    description: "27 successful days out of 30. 90% consistency.",
    previewType: "monthly",
  },
  {
    badge: "YEARLY",
    title: "Yearly Performance",
    description: "312 successful days. Top 15% of active users.",
    previewType: "yearly",
  },
];

export const reportStats: readonly ReportStat[] = [
  { value: "248", label: "Successful Days" },
  { value: "82", label: "Missed Days", colorClass: "text-missed" },
  { value: "35", label: "Longest Streak", colorClass: "text-muted" },
  { value: "89%", label: "Yearly Consistency" },
];

export const reportSummary: readonly ReportStat[] = [
  { value: "1,247", label: "Completed Tasks" },
  { value: "8", label: "Streak Breaks" },
  { value: "35", label: "No-Activity Days" },
  { value: "14", label: "Optional-Only Days" },
];

export const monthBars: readonly MonthBar[] = [
  { height: "80px", opacity: 0.85, label: "Jan", filled: true },
  { height: "72px", opacity: 0.80, label: "Feb", filled: true },
  { height: "85px", opacity: 0.90, label: "Mar", filled: true },
  { height: "68px", opacity: 0.75, label: "Apr", filled: true },
  { height: "78px", opacity: 0.85, label: "May", filled: true },
  { height: "90px", opacity: 0.95, label: "Jun", filled: true },
  { height: "82px", opacity: 0.88, label: "Jul", filled: true },
  { height: "75px", opacity: 0.82, label: "Aug", filled: true },
  { height: "88px", opacity: 0.92, label: "Sep", filled: true },
  { height: "80px", opacity: 0.87, label: "Oct", filled: true },
  { height: "70px", opacity: 0.78, label: "Nov", filled: true },
  { height: "60px", opacity: 0, label: "Dec", filled: false },
] as const;

export const footerColumns: readonly FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Insights", href: "#insights" },
      // { label: "Performance Report", href: "#performance-report" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com/in/hasibur-rahman19" },
      { label: "GitHub", href: "https://github.com/HSBHasib" },
      { label: "Email", href: "mailto:hasibhsb19@gmail.com" },
      { label: "WhatsApp", href: "https://wa.me/8801616891871" },
    ],
  },
] as const;

export const leaderboardEntries: LeaderboardEntry[] = [
  { rank: 1, name: 'Alex Rivera', score: 98, tier: 'gold', rankClass: 'text-[#b8860b]' },
];

