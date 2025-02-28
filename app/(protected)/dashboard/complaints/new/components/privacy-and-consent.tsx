'use client'

import { useState, useCallback } from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HelpCircle } from 'lucide-react';

export default function PrivacyAndConsent({ 
  complaintId, 
  updateFormData, 
  setIsValid 
}: { 
  complaintId: number, 
  updateFormData: (step: string, data: any) => void, 
  setIsValid: (valid: boolean) => void 
}) {
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const handlePrivacyCheckboxChange = useCallback((checked: boolean) => {
    setIsPrivacyChecked(prevState => {
      // Only update if the state is actually changing
      if (prevState !== checked) {
        // Update form data and validation
        const newTermsState = isTermsChecked;
        setIsValid(checked && newTermsState);
        updateFormData('privacyConsent', {
          privacyAgreement: checked,
          termsOfService: newTermsState
        });
        return checked;
      }
      return prevState;
    });
  }, [isTermsChecked, setIsValid, updateFormData]);

  const handleTermsCheckboxChange = useCallback((checked: boolean) => {
    setIsTermsChecked(prevState => {
      // Only update if the state is actually changing
      if (prevState !== checked) {
        // Update form data and validation
        const newPrivacyState = isPrivacyChecked;
        setIsValid(checked && newPrivacyState);
        updateFormData('privacyConsent', {
          privacyAgreement: newPrivacyState,
          termsOfService: checked
        });
        return checked;
      }
      return prevState;
    });
  }, [isPrivacyChecked, setIsValid, updateFormData]);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="privacyAgreement" 
          checked={isPrivacyChecked}
          onCheckedChange={handlePrivacyCheckboxChange}
        />
        <div className="grid gap-1.5 leading-none">
          <Label 
            htmlFor="privacyAgreement" 
            className="flex cursor-pointer items-center"
          >
            I agree to share these information for official investigation
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-2">
                  <HelpCircle className="size-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <a href="/privacy-policy" className="text-blue-500 hover:underline">View Privacy Policy</a>
              </PopoverContent>
            </Popover>
          </Label>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="termsOfService" 
          checked={isTermsChecked}
          onCheckedChange={handleTermsCheckboxChange}
        />
        <div className="grid gap-1.5 leading-none">
          <Label 
            htmlFor="termsOfService" 
            className="flex cursor-pointer items-center"
          >
            I agree to the terms and conditions of using this website
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-2">
                  <HelpCircle className="size-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <a href="/terms-of-service" className="text-blue-500 hover:underline">View Terms of Service</a>
              </PopoverContent>
            </Popover>
          </Label>
        </div>
      </div>
    </div>
  );
}