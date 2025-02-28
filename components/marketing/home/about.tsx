"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Target, Eye } from "lucide-react"

import { Carousel } from "./cou"

export default function About() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-orange-50">
      
      {/* About Section */}
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl shadow-2xl"
            >
              <Image
                src="/_static/images/hero-2.jpg"
                alt="SPFACC Headquarters"
                width={600}
                height={800}
                className="rounded-3xl object-cover"
              />
            </motion.div>

            <div className="space-y-8">
              <div className="space-y-4">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="font-semibold text-[#F96600]"
                >
                  ABOUT US
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold text-gray-900 sm:text-4xl"
                >
                  About SPFACC
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-lg leading-relaxed text-gray-600"
                >
                  The Ondo State Public Complaints, Financial Crimes and Anti-Corruption Commission was established in
                  2022 to checkmate sharp practices, enhance financial sanity, resolve disputes, promote probity and
                  accountability in the conduct of government activities. The commission is empowered by the Ondo State
                  Public Complaints Financial Crime and Anti-Corruption Commission Law 2022.
                </motion.p>
              </div>

              {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="rounded-2xl bg-gray-50 p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-[#F96600]/10">
                    <Target className="size-6 text-[#F96600]" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">Our Mission</h3>
                  <p className="text-gray-600">
                    Create a corruption free society in building a prosperous Ondo State through investigation,
                    prevention, and enforcement.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="rounded-2xl bg-gray-50 p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-[#F96600]/10">
                    <Eye className="size-6 text-[#F96600]" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">Our Vision</h3>
                  <p className="text-gray-600">
                    To be a leading anti-corruption agency in Nigeria, fostering transparency, accountability, and
                    integrity.
                  </p>
                </motion.div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the existing sections */}
      {/* ... */}
    </main>
  )
}

