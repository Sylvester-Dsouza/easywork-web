import {
  LayoutDashboard,
  BarChart3,
  CreditCard,
  Settings,
  Key,
} from "lucide-react"

export const sidebarItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Usage History",
    href: "/dashboard/usage",
    icon: BarChart3,
  },
  {
    title: "API Keys",
    href: "/dashboard/api-keys",
    icon: Key,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]
