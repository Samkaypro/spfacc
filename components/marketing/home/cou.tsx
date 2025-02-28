/* eslint-disable tailwindcss/classnames-order */
import { motion } from "framer-motion"
import Image from "next/image"

interface CarouselImage {
  src: string
  alt: string
}

const images: CarouselImage[] = [
  { src: "/placeholder.svg", alt: "Image 1" },
  { src: "/placeholder.svg", alt: "Image 2" },
  { src: "/placeholder.svg", alt: "Image 3" },
]

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const Carousel = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <motion.div
      className="relative h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${images[0].src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        variants={variants}
        animate="visible"
        initial="hidden"
        className={`absolute inset-0 flex items-center justify-center ${isHovered ? "opacity-50" : "opacity-100"}`}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative w-full h-full"
            style={{
              backgroundImage: `url(${image.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0"
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

