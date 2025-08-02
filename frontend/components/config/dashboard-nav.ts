import { Upload, History, Settings } from "lucide-react";

export const dashboardNavItems = [
  { 
    href: "/auth/dashboard", 
    label: "Upload", 
    icon: Upload 
  },
  { 
    href: "/auth/history", 
    label: "History", 
    icon: History 
  },
  { 
    href: "/auth/settings", 
    label: "Settings", 
    icon: Settings 
  },
];