"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Dialog } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Photo {
  id: string
  url: string
  caption: string
  alt: string
}

interface PhotoModalProps {
  isOpen: boolean
  onClose: () => void
  photos: Photo[]
  initialPhotoId: string
}

export function PhotoModal({ isOpen, onClose, photos, initialPhotoId }: PhotoModalProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const index = photos.findIndex((photo) => photo.id === initialPhotoId)
      setCurrentPhotoIndex(index >= 0 ? index : 0)
    }
  }, [isOpen, initialPhotoId, photos])

  const handlePrevious = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1))
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === "ArrowLeft") handlePrevious()
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "Escape") {
        if (isFullscreen) {
          setIsFullscreen(false)
        } else {
          onClose()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, isFullscreen, handleNext, handlePrevious])

  if (!isOpen) return null

  const currentPhoto = photos[currentPhotoIndex]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className={`fixed inset-0 bg-black/90 z-50 ${isFullscreen ? "h-screen w-screen" : ""}`}>
        <div className="absolute top-4 right-4 z-50 flex gap-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleFullscreen}>
            <Maximize2 className="size-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onClose}>
            <X className="size-6" />
          </Button>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhoto.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`relative ${isFullscreen ? "w-screen h-screen" : "w-full max-w-5xl aspect-video"}`}
            >
              <Image
                src={currentPhoto.url || "/placeholder.svg"}
                alt={currentPhoto.alt}
                layout="fill"
                objectFit="contain"
                className="select-none"
                priority
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white p-4">
                <p className="text-center">{currentPhoto.caption}</p>
                <p className="text-center text-sm text-gray-400">
                  {currentPhotoIndex + 1} of {photos.length}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 inset-x-0 flex justify-center gap-4">
            <Button variant="ghost" className="text-white hover:bg-white/20" onClick={handlePrevious}>
              <ChevronLeft className="size-6 mr-2" />
              Previous
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/20" onClick={handleNext}>
              Next
              <ChevronRight className="size-6 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

