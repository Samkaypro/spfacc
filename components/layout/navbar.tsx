"use client"

import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { Home, Info, Newspaper, Users, Building, History, ImageIcon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { useScroll } from "@/hooks/use-scroll"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import MaxWidthWrapper from "@/components/shared/max-width-wrapper"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React from "react"

const links = [
  { title: "Home", href: "/", icon: Home, description: "Return to the homepage" },
  {
    title: "About Us",
    href: "/about",
    icon: Info,
    description: "Learn more about our organization",
    dropdown: [
      { title: "About Us", href: "/about", icon: Info, description: "Overview of our organization" },
      { title: "Our Role", href: "/about/role", icon: Users, description: "Understanding our responsibilities" },
      { title: "Board Members", href: "/about/board", icon: Users, description: "Meet our leadership team" },
      {
        title: "SPFACC Structure",
        href: "/about/structure",
        icon: Building,
        description: "Our organizational structure",
      },
    ],
  },
  {
    title: "Information Center",
    href: "/info",
    icon: Newspaper,
    description: "Stay updated with our latest news and media",
    dropdown: [
      { title: "News", href: "/info/news", icon: Newspaper, description: "Latest updates and announcements" },
      {
        title: "Photo Gallery",
        href: "/info/gallery",
        icon: ImageIcon,
        description: "Visual highlights of our activities",
      },
    ],
  },
]

export function NavBar() {
  const scrolled = useScroll(50)
  const { data: session, status } = useSession()

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-transparent bg-[#F96600] transition-all hidden md:flex",
        scrolled && "border-[#F96600] bg-[#F96600] hidden md:flex ",
      )}
    >
      <MaxWidthWrapper className="flex h-16 items-center justify-between py-4">
        <div className="flex items-center space-x-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src="/_static/images/icon.jpg"
              alt={siteConfig.name}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </div>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex justify-center space-x-2">
            {links.map((link) => (
              <NavigationMenuItem key={link.title}>
                {link.dropdown ? (
                  <>
                    <NavigationMenuTrigger className="bg-[#F96600] text-white hover:bg-[#F96600]/90 hover:text-white">
                      {link.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-[#F96600]">
                        {link.dropdown.map((item) => (
                          <ListItem key={item.title} title={item.title} href={item.href} icon={item.icon}>
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-[#F96600] text-white hover:bg-[#F96600]/90 hover:text-white",
                      )}
                    >
                      {link.title}
                    </NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex hidden items-center space-x-4 md:flex">
          {session ? (
            <Link href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}>
              <Button size="sm" className="bg-[#F96600] text-white hover:bg-[#F96600]/90">
                Dashboard
              </Button>
            </Link>
          ) : status === "unauthenticated" ? (
            <Button size="sm" className="bg-[#F96600] text-white hover:bg-[#F96600]/90" onClick={() => {}}>
              Sign In
            </Button>
          ) : (
            <Skeleton className="h-9 w-20 bg-[#F96600]" />
          )}
        </div>
      </MaxWidthWrapper>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: React.ComponentType<{ className?: string }> }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "hover:bg-[#F96600]/90 hover:text-white focus:bg-[#F96600]/90 focus:text-white block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors text-white",
            className,
          )}
          {...props}
        >
          <div className="flex items-center">
            <Icon className="mr-2 size-4 text-white" />
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-white/70">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

