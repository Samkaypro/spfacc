'use client'

import { useState, useEffect } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { HelpCircle, Upload, Loader2 } from 'lucide-react'
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner" // Assuming you're using shadcn/ui toast
import Image from 'next/image'
import { Img } from '@react-email/components'

export default function EvidenceSubmission({ 
  complaintId, 
  onSubmissionComplete 
}: { 
  complaintId: number, 
  onSubmissionComplete: () => void 
}) {
  // State for different types of files
  const [images, setImages] = useState<File[]>([])
  const [videos, setVideos] = useState<File[]>([])
  const [audioClips, setAudioClips] = useState<File[]>([])
  const [documents, setDocuments] = useState<File[]>([])
  const [descriptions, setDescriptions] = useState<{[key: string]: string}>({})
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  // State for upload and submission process
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Uploadthing hooks for different file types
  const { startUpload: startImageUpload } = useUploadThing("imageUploader", {
    onUploadProgress: (progress) => {
      setUploadProgress(progress)
    }
  })
  const { startUpload: startVideoUpload } = useUploadThing("videoUploader", {
    onUploadProgress: (progress) => {
      setUploadProgress(progress)
    }
  })
  const { startUpload: startAudioUpload } = useUploadThing("audioUploader", {
    onUploadProgress: (progress) => {
      setUploadProgress(progress)
    }
  })
  const { startUpload: startDocumentUpload } = useUploadThing("documentUploader", {
    onUploadProgress: (progress) => {
      setUploadProgress(progress)
    }
  })

  const handleFileUpload = (files: FileList | null, type: 'images' | 'videos' | 'audioClips' | 'documents') => {
    if (files) {
      const fileArray = Array.from(files)
      switch (type) {
        case 'images':
          setImages([...images, ...fileArray])
          break
        case 'videos':
          setVideos([...videos, ...fileArray])
          break
        case 'audioClips':
          setAudioClips([...audioClips, ...fileArray])
          break
        case 'documents':
          setDocuments([...documents, ...fileArray])
          break
      }
    }
  }

  const handleDescriptionChange = (fileId: string, description: string) => {
    setDescriptions({...descriptions, [fileId]: description})
  }

  const handleSubmit = async () => {
    // Validate that there are files to upload
    const allFiles = [...images, ...videos, ...audioClips, ...documents]
    if (allFiles.length === 0) {
      toast.error("Please upload at least one file")
      return
    }

    setIsUploading(true)
    setIsUploadComplete(false);
    try {
      // Create upload promises for each file type
      const imageUploadPromise = images.length > 0 
        ? startImageUpload(images)
        : Promise.resolve([])
      const videoUploadPromise = videos.length > 0 
        ? startVideoUpload(videos)
        : Promise.resolve([])
      const audioUploadPromise = audioClips.length > 0 
        ? startAudioUpload(audioClips)
        : Promise.resolve([])
      const documentUploadPromise = documents.length > 0 
        ? startDocumentUpload(documents)
        : Promise.resolve([])

      // Wait for all uploads to complete
      const [uploadedImages, uploadedVideos, uploadedAudio, uploadedDocuments] = await Promise.all([
        imageUploadPromise, 
        videoUploadPromise, 
        audioUploadPromise, 
        documentUploadPromise
      ])

      // Prepare evidence items for API submission
      const evidenceItems = [
        ...(uploadedImages || []).map(file => ({
          type: 'image' as const,
          fileUrl: file.url,
          description: descriptions[`image-${file.name}`] || ''
        })),
        ...(uploadedVideos || []).map(file => ({
          type: 'video' as const,
          fileUrl: file.url,
          description: descriptions[`video-${file.name}`] || ''
        })),
        ...(uploadedAudio || []).map(file => ({
          type: 'audio' as const,
          fileUrl: file.url,
          description: descriptions[`audio-${file.name}`] || ''
        })),
        ...(uploadedDocuments || []).map(file => ({
          type: 'document' as const,
          fileUrl: file.url,
          description: descriptions[`document-${file.name}`] || ''
        }))
      ]

      // Submit evidence to the API
      const response = await fetch('/api/complaints/evidence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          complaintId,
          evidenceItems
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to upload evidence')
      }

      // Success handling
      toast.success("Evidence uploaded successfully")
      onSubmissionComplete()

      // Reset form
      setImages([])
      setVideos([])
      setAudioClips([])
      setDocuments([])
      setDescriptions({})
      setIsUploadComplete(true);
    } catch (error) {
      // Error handling
      console.error('Evidence upload error:', error)
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsUploading(false)
    }
  }

  const FileUploadInput = ({ id, accept, onChange, maxSize }: { id: string, accept: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, maxSize: string }) => (
    <div className="relative">
      <Input
        id={id}
        type="file"
        accept={accept}
        multiple
        onChange={onChange}
        disabled={isUploading}
        className="border-muted-foreground/25 bg-muted hover:bg-muted/80 flex h-32 cursor-pointer items-center justify-center border-2 border-dashed transition-colors file:hidden"
      />
      <div className="text-muted-foreground pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <Upload className="mb-2 size-8" />
        <span className="text-sm font-medium">Click or drag files to upload</span>
        <span className="mt-1 text-xs">Max size: {maxSize} per file</span>
      </div>
    </div>
  )

  return (
    <Tabs defaultValue="images" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="images">Images</TabsTrigger>
        <TabsTrigger value="videos">Videos</TabsTrigger>
        <TabsTrigger value="audio">Audio</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>
      <TabsContent value="images">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="imageUpload" className="text-base font-semibold">Upload Images</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <HelpCircle className="size-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>Upload image files (JPEG, PNG, GIF). Max size: 10MB per file.</PopoverContent>
            </Popover>
          </div>
          <FileUploadInput
            id="imageUpload"
            accept="image/*"
            onChange={(e) => handleFileUpload(e.target.files, 'images')}
            maxSize="10MB"
          />
          {images.map((file, index) => (
            <div key={`image-${index}`} className="space-y-2">
              <Img src={URL.createObjectURL(file)} alt={`Uploaded image ${index + 1}`} className="max-h-40 max-w-xs rounded-md object-cover" />
              <Textarea 
                placeholder={`Description for ${file.name}`}
                value={descriptions[`image-${file.name}`] || ''}
                onChange={(e) => handleDescriptionChange(`image-${file.name}`, e.target.value)}
                disabled={isUploading}
              />
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="videos">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="videoUpload" className="text-base font-semibold">Upload Videos</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <HelpCircle className="size-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>Upload video files (MP4, AVI, MOV). Max size: 100MB per file.</PopoverContent>
            </Popover>
          </div>
          <FileUploadInput
            id="videoUpload"
            accept="video/*"
            onChange={(e) => handleFileUpload(e.target.files, 'videos')}
            maxSize="100MB"
          />
          {videos.map((file, index) => (
            <div key={`video-${index}`} className="space-y-2">
              <video src={URL.createObjectURL(file)} controls className="max-h-40 max-w-xs rounded-md" />
              <Textarea 
                placeholder={`Description for ${file.name}`}
                value={descriptions[`video-${file.name}`] || ''}
                onChange={(e) => handleDescriptionChange(`video-${file.name}`, e.target.value)}
                disabled={isUploading}
              />
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="audio">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="audioUpload" className="text-base font-semibold">Upload Audio Clips</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <HelpCircle className="size-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>Upload audio files (MP3, WAV, AAC). Max size: 50MB per file.</PopoverContent>
            </Popover>
          </div>
          <FileUploadInput
            id="audioUpload"
            accept="audio/*"
            onChange={(e) => handleFileUpload(e.target.files, 'audioClips')}
            maxSize="50MB"
          />
          {audioClips.map((file, index) => (
            <div key={`audio-${index}`} className="space-y-2">
              <audio src={URL.createObjectURL(file)} controls className="w-full" />
              <Textarea 
                placeholder={`Description for ${file.name}`}
                value={descriptions[`audio-${file.name}`] || ''}
                onChange={(e) => handleDescriptionChange(`audio-${file.name}`, e.target.value)}
                disabled={isUploading}
              />
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="documents">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="documentUpload" className="text-base font-semibold">Upload Documents</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <HelpCircle className="size-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>Upload document files (PDF, DOC, DOCX, TXT). Max size: 20MB per file.</PopoverContent>
            </Popover>
          </div>
          <FileUploadInput
            id="documentUpload"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => handleFileUpload(e.target.files, 'documents')}
            maxSize="20MB"
          />
          {documents.map((file, index) => (
            <div key={`document-${index}`} className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>{file.name}</span>
              </div>
              <Textarea 
                placeholder={`Description for ${file.name}`}
                value={descriptions[`document-${file.name}`] || ''}
                onChange={(e) => handleDescriptionChange(`document-${file.name}`, e.target.value)}
                disabled={isUploading}
              />
            </div>
          ))}
        </div>
      </TabsContent>
      
      {/* Upload Progress and Submit Button */}
      {isUploading && (
        <div className="mt-4 flex items-center space-x-2">
          <Loader2 className="text-primary size-5 animate-spin" />
          <span className="text-muted-foreground text-sm">
            Uploading... {uploadProgress}%
          </span>
        </div>
      )}

<Button  
  onClick={handleSubmit} 
  className="mt-6 w-full"
  disabled={isUploading || 
    (images.length === 0 && 
     videos.length === 0 && 
     audioClips.length === 0 && 
     documents.length === 0) &&  !isUploadComplete}
>
  {isUploading ? "Uploading..." : "Submit"}
</Button>
</Tabs>
  )
}
