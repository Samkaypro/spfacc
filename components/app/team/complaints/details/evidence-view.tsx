import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'

interface EvidenceItem {
  type: 'image' | 'video' | 'audio' | 'document'
  fileUrl: string
  description: string
}

export default function EvidencePreview({ item }: { item: EvidenceItem }) {
  const renderPreview = () => {
    switch (item.type) {
      case 'image':
        return (
          <Image
            src={item.fileUrl}
            alt="Evidence Image"
            width={300}
            height={200}
            className="rounded-md object-cover"
          />
        )
      case 'video':
        return (
          <video controls className="w-full max-w-md rounded-md">
            <source src={item.fileUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )
      case 'audio':
        return (
          <audio controls className="w-full max-w-md">
            <source src={item.fileUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )
      case 'document':
        return (
          <a
            href={item.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Document
          </a>
        )
      default:
        return <p>Unsupported file type</p>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg capitalize">{item.type} Evidence</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">{renderPreview()}</div>
        <p className="text-sm text-gray-600">{item.description}</p>
      </CardContent>
    </Card>
  )
}

