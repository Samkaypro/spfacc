'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ComplaintDetails from './complaint-details'
import EvidenceSubmission from './evidence-submission'
import PrivacyAndConsent from './privacy-and-consent'
import ProgressIndicator from './progress-indicator'

const steps = ['Complaint Details', 'Evidence Submission', 'Privacy and Consent']

export default function ComplaintForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    complaintId: 0,
    complaintDetails: {},
    evidenceSubmission: {},
    privacyAndConsent: {}
  })
  const [isValid, setIsValid] = useState(false);
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      handleSubmit(); // Call handleSubmit on every step
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit(); // Call handleSubmit on the last step as well
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/complaints/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ complaintId: formData.complaintId }), // Send the complaintId
      });

      if (!response.ok) {
        throw new Error('Failed to update complaint status');
      }

      const result = await response.json();
      console.log('Form submitted:', result);
      
      // Redirect to /dashboard/complaints on success
      router.push('/dashboard/complaints'); // Use the new router for navigation
    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
  };

  const updateFormData = (step: string, data: any) => {
    setFormData(prevData => ({
      ...prevData,
      [step]: data
    }))
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
        <CardTitle>Submit a Complaint</CardTitle>
        <ProgressIndicator steps={steps} currentStep={currentStep} />
      </CardHeader>
      <CardContent>
        {currentStep === 0 && <ComplaintDetails updateFormData={updateFormData} setIsValid={setIsValid} />}
        {currentStep === 1 && <EvidenceSubmission complaintId={formData.complaintId} onSubmissionComplete={() => { /* handle submission complete */ }} />}
        {currentStep === 2 && <PrivacyAndConsent complaintId={formData.complaintId} updateFormData={updateFormData} setIsValid={setIsValid} />}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrevious} disabled={currentStep === 0}>Previous Step</Button>
        <Button onClick={handleNext} disabled={!isValid}>
          {currentStep < steps.length - 1 ? 'Next Step' : 'Submit Complaint'}
        </Button>
      </CardFooter>
    </Card>
  )
}

