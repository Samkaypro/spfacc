import { promises as fs } from "fs"
import path from "path"
import { BoardMemberCard } from "@/components/marketing/about/board/board-member-card"

async function getBoardMembers() {
  const filePath = path.join(process.cwd(), "data/board-members.json")
  const fileContents = await fs.readFile(filePath, "utf8")
  const data = JSON.parse(fileContents)
  return data.members
}

export default async function BoardPage() {
  const members = await getBoardMembers()

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Board Members</h1>
          <p className="mt-4 text-lg text-gray-600">Meet the distinguished members of the SPFACC Board</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <BoardMemberCard
              key={member.id}
              id={member.id}
              name={member.name}
              credentials={member.credentials}
              position={member.position}
              image={member.image}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Management</h1>
          <p className="mt-4 text-lg text-gray-600">Meet the distinguished Management team </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <BoardMemberCard
              key={member.id}
              id={member.id}
              name={member.name}
              credentials={member.credentials}
              position={member.position}
              image={member.image}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

