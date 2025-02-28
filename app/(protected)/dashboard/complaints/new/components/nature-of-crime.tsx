'use client'

import { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

export default function NatureOfCrime({ updateFormData }: { updateFormData: (step: string, data: any) => void }) {
  const [crimeNature, setCrimeNature] = useState<string[]>([])
  const [otherCrimeNature, setOtherCrimeNature] = useState('')
  const [victimType, setVictimType] = useState('')

  const handleCrimeNatureChange = (checked: boolean, value: string) => {
    if (checked) {
      setCrimeNature([...crimeNature, value])
    } else {
      setCrimeNature(crimeNature.filter(item => item !== value))
    }
  }

  const handleSubmit = () => {
    updateFormData('natureOfCrime', {
      crimeNature,
      otherCrimeNature,
      victimType
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Nature of Crime</h3>
        <div className="mt-2 space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="fraud" onCheckedChange={(checked) => handleCrimeNatureChange(checked as boolean, 'fraud')} />
            <Label htmlFor="fraud">Fraud or Embezzlement</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="assault" onCheckedChange={(checked) => handleCrimeNatureChange(checked as boolean, 'assault')} />
            <Label htmlFor="assault">Assault or Physical Harm</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="bribery" onCheckedChange={(checked) => handleCrimeNatureChange(checked as boolean, 'bribery')} />
            <Label htmlFor="bribery">Bribery or Corruption</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="cybercrime" onCheckedChange={(checked) => handleCrimeNatureChange(checked as boolean, 'cybercrime')} />
            <Label htmlFor="cybercrime">Cybercrime (Phishing, Hacking, Identity Theft)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="harassment" onCheckedChange={(checked) => handleCrimeNatureChange(checked as boolean, 'harassment')} />
            <Label htmlFor="harassment">Harassment or Threats</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="other" onCheckedChange={(checked) => handleCrimeNatureChange(checked as boolean, 'other')} />
            <Label htmlFor="other">Other</Label>
          </div>
          {crimeNature.includes('other') && (
            <div className="ml-6 mt-2">
              <Label htmlFor="otherCrimeNature">Specify Other Crime Nature</Label>
              <Input 
                id="otherCrimeNature" 
                value={otherCrimeNature} 
                onChange={(e) => setOtherCrimeNature(e.target.value)} 
                className="mt-1"
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium">Victim Type</h3>
        <RadioGroup onValueChange={setVictimType} className="mt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="individual" id="individual" />
            <Label htmlFor="individual">Individual</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="business" id="business" />
            <Label htmlFor="business">Business/Organization</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="government" id="government" />
            <Label htmlFor="government">Government Entity</Label>
          </div>
        </RadioGroup>
      </div>

      <Button onClick={handleSubmit}>Save and Continue</Button>
    </div>
  )
}

