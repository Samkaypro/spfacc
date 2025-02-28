"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { Menu, X, Home, Info, Newspaper, Users, Building, History, ImageIcon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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

export function NavMobile() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between bg-[#F96600] px-4 py-2 md:hidden">
      <div className="relative h-10 w-10 overflow-hidden rounded-full">
        <Image
          src="/_static/images/icon.jpg"
          alt={siteConfig.name}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="px-0 text-base text-white hover:bg-[#F96600] hover:text-white focus-visible:bg-[#F96600] focus-visible:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <Menu className="size-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] bg-[#F96600] text-white">
          <div className="flex items-center justify-between px-4">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                src="/_static/images/icon.jpg"
                alt={siteConfig.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="text-white hover:bg-[#F96600]/90 hover:text-white"
            >
              <X className="size-5" />
            </Button>
          </div>
          <Accordion type="single" collapsible className="w-full px-4 pt-4">
            {links.map((item) => (
              <AccordionItem value={item.title} key={item.title} className="border-b-white/20">
                {item.dropdown ? (
                  <>
                    <AccordionTrigger className="text-sm capitalize text-white hover:no-underline">
                      <div className="flex items-center">{item.title}</div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className="text-white hover:text-white/80 flex items-center"
                            onClick={() => setOpen(false)}
                          >
                            <subItem.icon className="mr-2 size-4" />
                            <div>
                              <div>{subItem.title}</div>
                              <div className="text-white/70 text-xs">{subItem.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center py-4 text-sm capitalize text-white hover:text-white/80"
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className="mr-2 size-4" />
                    {item.title}
                  </Link>
                )}
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-6 px-4">
            {session ? (
              <Link href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}>
                <Button className="w-full bg-white text-[#F96600] hover:bg-white/90" onClick={() => setOpen(false)}>
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Button className="w-full bg-white text-[#F96600] hover:bg-white/90" onClick={() => setOpen(false)}>
                Sign In
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

