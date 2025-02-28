

"use client"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import MaxWidthWrapper from "@/components/shared/max-width-wrapper"

const departments = [
    {
        name: "Legal Department",
        description:
            "Provides legal advisory services, prosecutes corruption cases, and ensures compliance with the SPFACC law.",
    },
    {
        name: "Investigation Department",
        description: "Handles financial crime investigations, collects evidence, and enforces anti-corruption laws.",
        subUnits: [
            "Investigative Officers who oversee detailed case inquiries.",
            "Investigative Assistants who support officers in their duties.",
        ],
    },
    {
        name: "Administration, Human Resources & Training",
        description: "Manages the commission's workforce, staff training, and administrative processes.",
    },
    {
        name: "Finance & Accounts",
        description: "Oversees budget planning, financial management, and expenditures of the commission.",
    },
    {
        name: "Public Complaints, Citizen Rights & Media",
        description: "Engages with the public, handles grievances, and conducts media outreach for awareness.",
    },
    {
        name: "Procurement & Supply",
        description: "Manages acquisition and distribution of resources necessary for SPFACC operations.",
    },
    {
        name: "ICT Department",
        description: "Supports the commission with technology, digital security, and data management.",
    },
]

const specialUnits = [
    {
        name: "Anti-Corruption Investigative Officers",
        description:
            "Special units responsible for intelligence gathering, monitoring corruption trends, and conducting high-level investigations.",
    },
]

export default function Structure() {
    return (
        <MaxWidthWrapper>

        <div className="min-h-screen bg-gradient-to-b text-black">
            <div className="container mx-auto px-4 py-8">
                <h1 className="mb-8 text-center text-4xl font-bold">Operational Structure of SPFACC</h1>

                <p className="mb-8 text-lg">
                    The Ondo State Public Complaints, Financial Crimes, and Anti-Corruption Commission (SPFACC) is structured into
                    various departments and units to effectively execute its mandate of investigating financial crimes, resolving
                    public complaints, and promoting accountability in government affairs.
                </p>

                {/* Departments Section */}
                <h2 className="mb-6 text-3xl font-semibold">Departments of SPFACC</h2>
                <div className="mb-12 flex flex-col gap-6">
                    {departments.map((dept, index) => (
                        <Card key={index} className="w-full border-none bg ">
                            <CardHeader>
                                <CardTitle className="text-black">{dept.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black">{dept.description}</p>
                                {dept.subUnits && (
                                    <ul className="mt-2 list-inside list-disc text-black">
                                        {dept.subUnits.map((unit, i) => (
                                            <li key={i}>{unit}</li>
                                        ))}
                                    </ul>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>

            

                {/* Image Section */}
                <div className="relative aspect-[16/16] h-auto w-full overflow-hidden md:aspect-[16/7] lg:aspect-[16/6]">
                    <Image
                        src="/_static/images/structure.png"
                        alt="SPFACC Structure Illustration"
                        layout="responsive"
                        width={1920} 
                        height={2080} 
                        objectFit="contain"
                    />
                </div>

            </div>
        </div>
        </MaxWidthWrapper>
    )
}
