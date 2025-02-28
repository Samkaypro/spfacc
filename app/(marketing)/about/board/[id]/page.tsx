/* eslint-disable tailwindcss/classnames-order */

import { promises as fs } from "fs"
import path from "path"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

async function getBoardMember(id: string) {
  const filePath = path.join(process.cwd(), "data/board-members.json")
  const fileContents = await fs.readFile(filePath, "utf8")
  const data = JSON.parse(fileContents)
  const member = data.members.find((m: any) => m.id === id)

  console.log(member)
  if (!member) {
    notFound()
  }
console.log("textt")
  return member
}

export default async function BoardMemberPage({ params }: { params: { id: string } }) {
  const member = await getBoardMember(params.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link href="/about/board" className="mb-8 inline-flex items-center text-[#F96600] hover:text-[#F96600]/80">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Board Members
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="mt-6 text-center">
                <h1 className="text-3xl font-bold text-gray-900">
                  {member.name}
                  {member.credentials && <span className="ml-2 text-[#F96600]">{member.credentials}</span>}
                </h1>
                <p className="mt-2 text-xl text-gray-600">{member.position}</p>
              </div>
            </div>
          </div>

          <div className="space-y-8 lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Biography</h2>
              {member.bio.split("\n").map((paragraph: string, index: number) => (
                <p key={index} className="mb-4 text-gray-600">
                  {paragraph}
                </p>
              ))}
            </div>

            {member.education && (
              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Education</h2>
                <ul className="list-inside list-disc space-y-2 text-gray-600">
                  {member.education.map((edu: string, index: number) => (
                    <li key={index}>{edu}</li>
                  ))}
                </ul>
              </div>
            )}

            {member.achievements && (
              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Key Achievements</h2>
                <ul className="list-inside list-disc space-y-2 text-gray-600">
                  {member.achievements.map((achievement: string, index: number) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

