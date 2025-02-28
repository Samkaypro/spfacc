import { UserRole } from "@prisma/client";

import { SidebarNavItem } from "types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      //Complainant Specific Links
      { 
        href: "/dashboard", 
        icon: "dashboard",
        title: "Dashboard",
        authorizeOnly: UserRole.USER,
      },
      {
        href: "/dashboard/complaints",
        icon: "finger",
        title: "Complaints",
        authorizeOnly: UserRole.USER,
      },
      {
        href: "/dashboard/messages",
        icon: "messages",
        title: "Messages",
        authorizeOnly: UserRole.USER,
      },

       //Team Specific Links
       { 
        href: "/team", 
        icon: "dashboard",
        title: "Dashboard",
        authorizeOnly: UserRole.TEAM,
      },
      { 
        href: "/team/assigned", 
        icon: "assigned",
        title: "Assigned Complaints",
        authorizeOnly: UserRole.TEAM,
      },
      
      // Admin Specific Links 
      {
        href: "/admin",
        icon: "laptop",
        title: "Admin Panel",
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "/admin/complaints",
        icon: "finger",
        title: "Complaints",
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "/admin/teams",
        icon: "team",
        title: "Teams",
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: "/admin/users",
        icon: "user",
        title: "Users",
        authorizeOnly: UserRole.ADMIN,
      },
     
    ],
  },



  {
    title: "OPTIONS",
    items: [
      { href: "/dashboard/settings", icon: "settings", title: "Settings" },
      { href: "/", icon: "home", title: "Homepage" },
      {
        href: "#",
        icon: "messages",
        title: "Support",
        authorizeOnly: UserRole.USER,
        disabled: true,
      },
    ],
  },
];
