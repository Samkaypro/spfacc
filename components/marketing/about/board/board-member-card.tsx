import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface BoardMemberCardProps {
  id: string
  name: string
  credentials?: string
  position: string
  image: string
}

export function BoardMemberCard({ id, name, credentials, position, image }: BoardMemberCardProps) {
  return (
    // <motion.div
    //   initial={{ opacity: 0, y: 20 }}
    //   whileInView={{ opacity: 1, y: 0 }}
    //   viewport={{ once: true }}
    //   whileHover={{ scale: 1.02 }}
    //   className="bg-white rounded-lg overflow-hidden shadow-lg transition-shadow hover:shadow-xl"
    // >
      <Link href={`/about/board/${id}`} className="block">
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {name}
            {credentials && <span className="ml-2 text-[#F96600]">{credentials}</span>}
          </h3>
          <p className="text-gray-600 mt-1">{position}</p>
        </div>
      </Link>
   
  )
}

