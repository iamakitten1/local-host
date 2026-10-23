import {
  BedDouble,
  CalendarCheck2,
  CalendarDays,
  LayoutDashboard,
  ShoppingBasket,
  Sparkles,
  Users,
} from "lucide-react";

export const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Rooms",
    path: "/rooms",
    icon: BedDouble,
  },
  {
    label: "Bookings",
    path: "/bookings",
    icon: CalendarCheck2,
  },
  {
    label: "Cleaning",
    path: "/cleaning",
    icon: Sparkles,
  },
  {
    label: "Events",
    path: "/events",
    icon: CalendarDays,
  },
  {
    label: "Staff",
    path: "/staff",
    icon: Users,
  },
  {
    label: "Shopping List",
    path: "/shopping-list",
    icon: ShoppingBasket,
  },
];