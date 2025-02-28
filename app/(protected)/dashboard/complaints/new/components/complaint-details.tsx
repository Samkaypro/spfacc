/* eslint-disable tailwindcss/classnames-order */
import React, { useEffect, useState, FC } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, HelpCircle } from 'lucide-react';
import { format } from "date-fns";

interface ComplaintDetailsProps {
    updateFormData: (step: string, data: any) => void; // Define updateFormData here
    setIsValid: (isValid: boolean) => void;
    initialData?: {
        complaintType?: string;
        victimType?: string;
        otherComplaintType?: string;
        incidentDate?: Date;
        incidentTime?: string;
        location?: { address: string; city: string; state: string; gps: string };
        description?: string;
        suspectedIndividuals?: string;
        witnessInfo?: string;
        complaintId?: number; // Add complaintId prop for updating
    };
    complaintId?: number; // Add complaintId prop for updating
}

const ONDO_LGAS = [
    { value: "Akoko North-East", label: "Akoko North-East: Ikare" },
    { value: "Akoko North-West", label: "Akoko North-West: Okeagbe" },
    { value: "Akoko South-East", label: "Akoko South-East: Isua" },
    { value: "Akoko South-West", label: "Akoko South-West: Oka" },
    { value: "Akure North", label: "Akure North: Iju / Itaogbolu" },
    { value: "Akure South", label: "Akure South: Akure" },
    { value: "Ese Odo", label: "Ese Odo: Igbekebo" },
    { value: "Idanre", label: "Idanre: Owena" },
    { value: "Ifedore", label: "Ifedore: Igbara Oke" },
    { value: "Ilaje", label: "Ilaje: Igbokoda" },
    { value: "Ile Oluji/Okeigbo", label: "Ile Oluji/Okeigbo: Ile Oluji" },
    { value: "Irele", label: "Irele: Ode-Irele" },
    { value: "Odigbo", label: "Odigbo: Ore" },
    { value: "Okitipupa", label: "Okitipupa: Okitipupa" },
    { value: "Ondo East", label: "Ondo East: Bolorunduro" },
    { value: "Ondo West", label: "Ondo West: Ondo Town" },
    { value: "Ose", label: "Ose: Ifon" },
    { value: "Owo", label: "Owo: Owo Town" }
];

const RequiredIndicator = () => (
    <span className="ml-1 text-red-500" title="Required field">*</span>
);

const ComplaintDetails: FC<ComplaintDetailsProps> = ({ 
    updateFormData,  // Make sure updateFormData is passed as a prop
    setIsValid, 
    initialData = {}, 
    complaintId 
}) => {
    const [complaintType, setComplaintType] = useState(initialData.complaintType || '');
    const [victimType, setVictimType] = useState(initialData.victimType || '');
    const [otherComplaintType, setOtherComplaintType] = useState(initialData.otherComplaintType || '');
    const [incidentDate, setIncidentDate] = useState<Date | undefined>(initialData.incidentDate);
    const [incidentTime, setIncidentTime] = useState(initialData.incidentTime || '');
    //const [location, setLocation] = useState(initialData.location || { address: '', city: '', state: '', gps: '' });
    const [description, setDescription] = useState(initialData.description || '');
    const [suspectedIndividuals, setSuspectedIndividuals] = useState(initialData.suspectedIndividuals || '');
    const [witnessInfo, setWitnessInfo] = useState(initialData.witnessInfo || '');
    const [location, setLocation] = useState(initialData.location || { 
        address: '', 
        city: '', 
        state: 'Ondo',
        gps: '' 
    });

    useEffect(() => {
        if (complaintId) {
            fetchComplaint(complaintId); // Fetch complaint data if complaintId is provided
        }
    }, [complaintId]);

    const fetchComplaint = async (id: number) => {
        const response = await fetch(`/api/complaints/details?id=${id}`);
        if (response.ok) {
            const data = await response.json();
            // Prefill the form with fetched data
            setComplaintType(data.type);
            setIncidentDate(new Date(data.dateOfIncident));
            setIncidentTime(data.timeOfIncident || '');
            setLocation({
                address: data.location.split(', ')[0],
                city: data.location.split(', ')[1],
                state: data.location.split(', ')[2],
                gps: ''
            });
            setDescription(data.description);
            setSuspectedIndividuals(data.suspectedEntities || '');
            setWitnessInfo(data.witnesses || '');
        } else {
            console.error("Failed to fetch complaint:", await response.json());
        }
    };

    const handleSubmitDetails = async () => {
        const complaintData = {
            complaintType,
            victimType,
            otherComplaintType: complaintType === 'other' ? otherComplaintType : '',
            incidentDate,
            incidentTime,
            location: {
                address: location .address,
                city: location.city,
                state: location.state,
            },
            description,
            suspectedIndividuals,
            witnessInfo
        };

        if (validate()) {
          const id = complaintId ? await updateComplaint(complaintId, complaintData) : await submitComplaint(complaintData);
          if (id) {
              // Store the complaintId in formData
              updateFormData('complaintId', id);
          }
      }
  
    };

    const submitComplaint = async (data: any) => {
        const response = await fetch('/api/complaints/details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ complaintDetails: data }),
        });

        if (response.ok) {
            const newComplaint = await response.json();
            console.log("Complaint submitted:", newComplaint);
            updateFormData('complaintDetails', newComplaint);
            return newComplaint.id;
        } else {
            console.error("Failed to submit complaint:", await response.json());
        }
    };

    const updateComplaint = async (id: number, data: any) => {
        const response = await fetch(`/api/complaints/details`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ complaintId: id, complaintDetails: data }),
        });

        if (response.ok) {
            const updatedComplaint = await response.json();
            console.log("Complaint updated:", updatedComplaint);
            updateFormData('complaintDetails', updatedComplaint);
        } else {
            console.error("Failed to update complaint:", await response.json());
        }
    };

    const validate = () => {
        const isValid = complaintType !== '' && incidentDate !== undefined && location.address !== '' && location.city !== '' && location.state !== '' && description !== '';
        setIsValid(isValid);
        return isValid;
    };

    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="complaintType" className="flex items-center">
                    Nature of Crime
                    <RequiredIndicator />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="ml-2">
                                <HelpCircle className="size-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>Select the nature of crime.</PopoverContent>
                    </Popover>
                </Label>
                <Select onValueChange={setComplaintType} value={complaintType}>
                    <SelectTrigger id="complaintType" className={!complaintType ? "border-orange-200" : ""}>
                        <SelectValue placeholder="Select Crime Nature" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="FC">Financial Crime</SelectItem>
                        <SelectItem value="AC">Anti Corruption</SelectItem>
                        <SelectItem value="PC">Personal Complaints</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="victimType" className="flex items-center">
                    Victim Type
                    <RequiredIndicator />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="ml-2">
                                <HelpCircle className="size-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>Select the victim type.</PopoverContent>
                    </Popover>
                </Label>
                <Select onValueChange={setVictimType} value={victimType}>
                    <SelectTrigger id="victimType" className={!victimType ? "border-orange-200" : ""}>
                        <SelectValue placeholder="Select victim type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Individual">Individual</SelectItem>
                        <SelectItem value="Business/Organization">Business/Organization</SelectItem>
                        <SelectItem value="Government_Entity">Government Entity</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="incidentDate" className="flex items-center">
                    Date of Incident
                    <RequiredIndicator />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="ml-2">
                                <HelpCircle className="size-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>Select the date when the incident occurred.</PopoverContent>
                    </Popover>
                </Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button 
                            variant="outline" 
                            className={`w-full justify-start text-left font-normal ${
                                !incidentDate ? "text-muted-foreground border-orange-200" : ""
                            }`}
                        >
                            <CalendarIcon className="mr-2 size-4" />
                            {incidentDate ? format(incidentDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar 
                            mode="single" 
                            selected={incidentDate} 
                            onSelect={setIncidentDate} 
                            disabled={(date) => date > new Date()}
                            initialFocus 
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div>
                <Label htmlFor="location" className="flex items-center">
                    Location of Incident
                    <RequiredIndicator />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="ml-2">
                                <HelpCircle className="size-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>Enter the incident&apos;s location details.</PopoverContent>
                    </Popover>
                </Label>
                <Select 
                    onValueChange={(value) => setLocation({...location, city: value})}
                    value={location.city}
                >
                    <SelectTrigger id="location-lga" className={!location.city ? "mb-2 border-orange-200" : "mb-2"}>
                        <SelectValue placeholder="Select Local Government Area" />
                    </SelectTrigger>
                    <SelectContent>
                        {ONDO_LGAS.map((lga) => (
                            <SelectItem key={lga.value} value={lga.value}>
                                {lga.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Input 
                    id="location-address" 
                    placeholder="Address" 
                    value={location.address} 
                    onChange={(e) => setLocation({...location, address: e.target.value})} 
                    className={`mb-2 ${!location.address ? "border-orange-200" : ""}`}
                />
            </div>

            <div>
                <Label htmlFor="description" className="flex items-center">
                    Description of the Incident
                    <RequiredIndicator />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="ml-2">
                                <HelpCircle className="size-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>Describe the incident in detail.</PopoverContent>
                    </Popover>
                </Label>
                <Textarea 
                    id="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    className={!description ? "border-orange-200" : ""}
                />
            </div>

            {/* Optional fields remain unchanged */}
            <div>
                <Label htmlFor="suspectedIndividuals" className="flex items-center">
                    Suspected Individuals or Entities (Optional)
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="ml-2">
                                <HelpCircle className="size-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>Provide the names, aliases, or descriptions of suspected individuals or entities involved.</PopoverContent>
                    </Popover>
                </Label>
                <Textarea id="suspectedIndividuals" value={suspectedIndividuals} onChange={(e) => setSuspectedIndividuals(e.target.value)} />
            </div>

            <div>
                <Label htmlFor="witnessInfo" className="flex items-center">
                    Witness Information (Optional)
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="ml-2">
                                <HelpCircle className="size-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>Provide the names and contact details of witnesses, if any.</PopoverContent>
                    </Popover>
                </Label>
                <Textarea id="witnessInfo" value={witnessInfo} onChange={(e) => setWitnessInfo(e.target.value)} />
            </div>

            <Button onClick={handleSubmitDetails}>Save</Button>
        </div>
    );
};
export default ComplaintDetails;