/* eslint-disable tailwindcss/classnames-order */

"use client"

import { useState } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PhotoModal } from "../photo-modal"
import { Badge } from "@/components/ui/badge"
import galleryData from "@/data/photo-gallery.json"

export default function AlbumPage() {
  const params = useParams()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPhotoId, setSelectedPhotoId] = useState<string>("")

  const album = galleryData.albums.find((a) => a.id === params.albumId)
  const category = album ? galleryData.categories.find((c) => c.id === album.categoryId) : null

  if (!album) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Album not found</h1>
          <Button variant="ghost" className="mt-4" onClick={() => router.push("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Button>
        </div>
      </div>
    )
  }

  const handlePhotoClick = (photoId: string) => {
    setSelectedPhotoId(photoId)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" className="mb-8 hover:bg-black/5" onClick={() => router.push("/info/gallery")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Gallery
        </Button>

        <div className="mb-12">
          {category && (
            <Badge variant="secondary" className="mb-4">
              {category.title}
            </Badge>
          )}
          <h1 className="text-3xl font-bold text-gray-900">{album.title}</h1>
          <div className="mt-4 flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(album.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{album.author}</span>
            </div>
          </div>
          {album.description && <p className="mt-4 max-w-3xl text-gray-600">{album.description}</p>}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {album.images.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg"
              onClick={() => handlePhotoClick(photo.id)}
            >
              <Image
                src={photo.url || "/placeholder.svg"}
                alt={photo.alt}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="px-6 text-center text-white">
                  <p className="font-medium">{photo.caption}</p>
                  <p className="mt-2 text-sm text-gray-300">Click to expand</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <PhotoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          photos={album.images}
          initialPhotoId={selectedPhotoId}
        />
      </div>
    </div>
  )
}

