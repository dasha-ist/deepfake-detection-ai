// frontend/components/config/settings-nav.ts
import { User, Bell, Lock, CreditCard } from "lucide-react";

export const settingsNavItems = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
    content: "Update your account profile information.",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    content: "Manage how you receive notifications.",
  },
  {
    id: "security",
    label: "Security",
    icon: Lock,
    content: "Manage your account security settings.",
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard,
    content: "Manage your subscription and payment methods.",
  },
];