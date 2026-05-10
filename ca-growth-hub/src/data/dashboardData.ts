export type StatItem = {
  label: string;
  value: string | number;
  caption: string;
  icon: "clock" | "activity" | "alert-triangle" | "alert-octagon" | "x-circle" | "trophy";
  tone: "todo" | "progress" | "risk" | "overdue" | "failed" | "success";
};

export const stats: StatItem[] = [
  { label: "Todo", value: 9, caption: "not started", icon: "clock", tone: "todo" },
  { label: "In Progress", value: 4, caption: "active work", icon: "activity", tone: "progress" },
  { label: "At Risk", value: 0, caption: "watch closely", icon: "alert-triangle", tone: "risk" },
  { label: "Overdue", value: 12, caption: "urgent follow-up", icon: "alert-octagon", tone: "overdue" },
  { label: "Failed", value: 72, caption: "closed with failure", icon: "x-circle", tone: "failed" },
  { label: "Completion Rate", value: "98%", caption: "overall closure ratio", icon: "trophy", tone: "success" },
];

export type DueTask = {
  client: string;
  type: string;
  employee: string;
  dueDate: string;
  overdueDays?: number;
};

export const upcomingDue: DueTask[] = [
  { client: "mittal trading", type: "GST CANCELLATION", employee: "JATIN AJITKUMAR SANTWANI", dueDate: "Dec 3", overdueDays: 146 },
  { client: "Sarfaraj Ansari g-2065", type: "GST ADDRESS CHANGE/NAME CHANGE", employee: "Karishma Soni", dueDate: "Dec 16", overdueDays: 133 },
  { client: "MOHAMMAD ZUBAIR-M01198", type: "OTHERS", employee: "Karishma Soni", dueDate: "Dec 16", overdueDays: 133 },
  { client: "CHAMUNDA SILK MILLS", type: "GST ADDRESS CHANGE/NAME CHANGE", employee: "Kali Pandey", dueDate: "Feb 27", overdueDays: 60 },
  { client: "RADHE TEXTILES", type: "INCOME TAX RETURN", employee: "Priya Sharma", dueDate: "Mar 12", overdueDays: 47 },
];

export type TxnStatus = "Overdue" | "In Progress" | "Completed" | "On Time";

export type Transaction = {
  client: string;
  type: string;
  employee: string;
  statuses: TxnStatus[];
};

export const recentTransactions: Transaction[] = [
  { client: "mittal trading", type: "GST CANCELLATION", employee: "JATIN AJITKUMAR SANTWANI", statuses: ["Overdue", "In Progress"] },
  { client: "NOMAN MEMON", type: "NEW GST REGISTRATION", employee: "Karishma Soni", statuses: ["On Time", "Completed"] },
  { client: "1092-shree bholenath creation", type: "GST ADDRESS CHANGE/NAME CHANGE", employee: "JATIN AJITKUMAR SANTWANI", statuses: ["Overdue", "In Progress"] },
  { client: "CHAMUNDA SILK MILLS", type: "INCOME TAX RETURN", employee: "Kali Pandey", statuses: ["On Time", "Completed"] },
  { client: "RADHE TEXTILES", type: "TDS RETURN", employee: "Priya Sharma", statuses: ["In Progress"] },
];

export type EmployeeLoad = {
  name: string;
  total: number;
  open: number;
  completed: number;
  failed: number;
  overdue: number;
};

export const employeeLoad: EmployeeLoad[] = [
  { name: "Karishma Soni", total: 153, open: 6, completed: 140, failed: 7, overdue: 5 },
  { name: "Kali Pandey", total: 162, open: 3, completed: 141, failed: 18, overdue: 3 },
  { name: "Gajendra Rawal", total: 59, open: 2, completed: 54, failed: 3, overdue: 2 },
  { name: "JATIN AJITKUMAR SANTWANI", total: 5, open: 2, completed: 3, failed: 0, overdue: 2 },
  { name: "Nilesh Parmar", total: 72, open: 0, completed: 66, failed: 6, overdue: 0 },
  { name: "Hitesh Sharma", total: 12, open: 0, completed: 12, failed: 0, overdue: 0 },
];

export type EmployeeSummary = {
  label: string;
  value: number;
  caption: string;
};

export const employeeSummary: EmployeeSummary[] = [
  { label: "Employees", value: 10, caption: "active team members" },
  { label: "Idle Employees", value: 8, caption: "no open transactions" },
];

export type TopPerformer = {
  name: string;
  rank: number;
  completed: number;
  open: number;
  overdue: number;
};

export const topPerformers: TopPerformer[] = [
  { name: "Karishma Soni", rank: 1, completed: 141, open: 0, overdue: 0 },
  { name: "Kali Pandey", rank: 2, completed: 141, open: 0, overdue: 0 },
  { name: "Nilesh Parmar", rank: 3, completed: 66, open: 0, overdue: 0 },
];

export type ServiceShare = {
  name: string;
  value: number;
};

export const requestedServices: ServiceShare[] = [
  { name: "Others", value: 222 },
  { name: "GST", value: 184 },
  { name: "Income Tax", value: 110 },
  { name: "Balance Sheet", value: 47 },
  { name: "Udhyam", value: 26 },
  { name: "TDS", value: 14 },
  { name: "HUF", value: 9 },
];

export type RepeatClient = {
  name: string;
  mobile: string;
  total: number;
  open: number;
  completed: number;
  topService: string;
};

export const topRepeatClients: RepeatClient[] = [
  { name: "SAKET", mobile: "8000056005", total: 4, open: 0, completed: 4, topService: "OTHERS" },
  { name: "RAUSHAN FAIZI", mobile: "8000264600", total: 3, open: 0, completed: 3, topService: "GST" },
  { name: "Mariya", mobile: "9737122922", total: 3, open: 0, completed: 3, topService: "INCOME TAX" },
  { name: "Okaram Mali", mobile: "7226914247", total: 3, open: 0, completed: 3, topService: "GST" },
  { name: "Rajkumar Verma", mobile: "9971168763", total: 3, open: 0, completed: 3, topService: "GST" },
  { name: "Kali Pandey", mobile: "6128054067", total: 2, open: 0, completed: 2, topService: "OTHERS" },
  { name: "GAURAV PARMAR", mobile: "9624754534", total: 2, open: 0, completed: 2, topService: "HUF" },
  { name: "MANSOOB KHAN", mobile: "9625664169", total: 2, open: 0, completed: 2, topService: "OTHERS" },
];

export type WorkloadDatum = {
  name: string;
  open: number;
  inProgress: number;
  completed: number;
  failed: number;
};

export const teamWorkload: WorkloadDatum[] = [
  { name: "Kali Pandey", open: 3, inProgress: 0, completed: 141, failed: 18 },
  { name: "Karishma Soni", open: 6, inProgress: 0, completed: 140, failed: 7 },
  { name: "Nilesh Parmar", open: 0, inProgress: 0, completed: 66, failed: 6 },
  { name: "Gajendra Rawal", open: 2, inProgress: 0, completed: 54, failed: 3 },
  { name: "Hitesh Sharma", open: 0, inProgress: 0, completed: 12, failed: 0 },
  { name: "JATIN A. SANTWANI", open: 2, inProgress: 0, completed: 3, failed: 0 },
];