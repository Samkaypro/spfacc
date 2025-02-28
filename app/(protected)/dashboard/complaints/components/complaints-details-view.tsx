'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import EvidencePreview from './evidence-preview'

interface ComplaintData {
  id: number
  userId: string
  type: string
  victimType: string | null
  description: string
  dateOfIncident: string
  timeOfIncident: string | null
  location: string
  suspectedEntities: string | null
  witnesses: string | null
  status: string
  createdAt: string
  updatedAt: string
}

interface EvidenceItem {
  type: 'image' | 'video' | 'audio' | 'document'
  fileUrl: string
  description: string
}

interface ComplaintDetailsProps {
  complaintData: ComplaintData
  evidenceItems: EvidenceItem[]
}

export default function ComplaintDetails({ complaintData, evidenceItems }: ComplaintDetailsProps) {
  const [activeTab, setActiveTab] = useState('details')

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'PPP')
  }

  return (
    <Card className="mx-auto size-full h-[90vh] max-h-[90vh] w-full max-w-full flex-1 overflow-y-auto p-6  pt-0"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style jsx>{`
    ::-webkit-scrollbar {
      display: none;
    }
  `}</style>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Complaint #SPFACC{complaintData.id}</CardTitle>
          <Badge variant={complaintData.status === 'INCOMPLETEFORM' ? 'destructive' : 'default'}>
            {complaintData.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Complaint Details</TabsTrigger>
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="font-medium">Type of Complaint</dt>
                <dd>{complaintData.type}</dd>
              </div>
              <div>
                <dt className="font-medium">Date of Incident</dt>
                <dd>{formatDate(complaintData.dateOfIncident)}</dd>
              </div>
              <div>
                <dt className="font-medium">Time of Incident</dt>
                <dd>{complaintData.timeOfIncident || 'Not specified'}</dd>
              </div>
              <div>
                <dt className="font-medium">Location</dt>
                <dd>{complaintData.location}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-medium">Description</dt>
                <dd>{complaintData.description}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-medium">Suspected Entities</dt>
                <dd>{complaintData.suspectedEntities || 'Not specified'}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-medium">Witnesses</dt>
                <dd>{complaintData.witnesses || 'Not specified'}</dd>
              </div>
              <div>
                <dt className="font-medium">Created At</dt>
                <dd>{formatDate(complaintData.createdAt)}</dd>
              </div>
              <div>
                <dt className="font-medium">Last Updated</dt>
                <dd>{formatDate(complaintData.updatedAt)}</dd>
              </div>
            </dl>
          </TabsContent>
          <TabsContent value="evidence">
            <div className="grid gap-4">
              {evidenceItems.map((item, index) => (
                <EvidencePreview key={index} item={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

