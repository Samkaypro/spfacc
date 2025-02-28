import Link from "next/link"
import { Facebook, Instagram, Linkedin, MapPin, Phone, Twitter } from "lucide-react"

const footerLinks = [
  {
    title: "Useful Links",
    links: [
      { name: "Mission", href: "/mission" },
      { name: "How It Works", href: "/how-it-works" },
      { name: "Core Values", href: "/core-values" },
      { name: "Register", href: "/register" },
    ],
  },
]

const socialLinks = [
  { icon: Instagram, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Facebook, href: "#" },
  { icon: Linkedin, href: "#" },
]

export function SiteFooter() {
  return (
    <footer className="bg-[#F9660B] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">SPFACC</h2>
            <p className="opacity-90">
              The Ondo State Public Complaints, Financial Crimes, and Anti-Corruption Commission (SPFACC) is committed to combating financial crimes, ensuring transparency, and promoting accountability in governance.
            </p>
            <div className="flex gap-4">
              <Link href="/terms" className="text-sm opacity-90 hover:underline">
                Terms of Use
              </Link>
              <span>|</span>
              <Link href="/privacy" className="text-sm opacity-90 hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Useful Links</h3>
            <ul className="space-y-4">
              {footerLinks[0].links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="opacity-90 hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2 opacity-90">
                <Phone className="size-5" />
                <span>+234 707 124 9966</span>
              </div>
              <div className="flex items-start gap-2 opacity-90">
                <MapPin className="size-5 shrink-0" />
                <div>
                  Quarter 21, Alagbaka
                  <br />
                  Beside Government House
                  <br />
                  Akure, Ondo State
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/40 pt-8 md:flex-row">
          <p className="text-sm opacity-90">
            © {new Date().getFullYear()} SPFACC. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm">Follow us</span>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="opacity-90 hover:opacity-100"
                >
                  <social.icon className="size-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
