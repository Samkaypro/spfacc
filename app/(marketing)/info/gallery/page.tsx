/* eslint-disable tailwindcss/classnames-order */

"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import galleryData from "@/data/photo-gallery.json"
import Title from "@/components/layout/title-section"
export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const router = useRouter()

  const filteredAlbums = selectedCategory
    ? galleryData.albums.filter((album) => album.categoryId === selectedCategory)
    : galleryData.albums

  const handleAlbumClick = (albumId: string) => {
    router.push(`/info/gallery/${albumId}`)
  }

  return (
  
    <div className="min-h-screen py-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Title
            title="Photo Gallery"
            description="Browse through our collection of official events and ceremonies"
        />

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full px-6 py-2 transition-colors ${
              selectedCategory === null ? "bg-[#F96600] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Categories
          </button>
          {galleryData.categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`rounded-full px-6 py-2 transition-colors ${
                selectedCategory === category.id
                  ? "bg-[#F96600] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Album Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredAlbums.map((album) => {
            const category = galleryData.categories.find((c) => c.id === album.categoryId)

            return (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => handleAlbumClick(album.id)}
              >
                <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={album.coverImage || "/placeholder.svg"}
                    alt={album.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="px-4 text-center text-white">View Album</p>
                  </div>
                </div>
                <div className="mt-4">
                  {category && (
                    <Badge variant="secondary" className="mb-2">
                      {category.title}
                    </Badge>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">{album.title}</h3>
                  <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(album.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{album.author}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

