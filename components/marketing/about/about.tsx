import Image from "next/image";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function About() {
  return (
    <MaxWidthWrapper>

    <div className="">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">About SPFACC</h1>

          {/* Logo */}
          {/* <div className="flex justify-center mb-8">
            <Image src="/logo.png" alt="SPFACC Logo" width={150} height={150} />
          </div> */}

          {/* Introduction */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Introduction</h2>
            <p className="mb-4 text-lg text-gray-700">
              The <strong>Ondo State Public Complaints, Financial Crimes, and Anti-Corruption Commission (SPFACC)</strong> 
              was established in 2022 to address financial misconduct, promote transparency, and uphold accountability 
              within government operations.
            </p>
            <p className="text-lg text-gray-700">
              Inaugurated on <strong>March 7, 2023</strong>, the Commission is led by 
              <strong>Hon. Justice W. A. Akintoroye (Rtd)</strong> as Chairman and <strong>Prof. Adewole Adeyeye</strong> as Secretary.
            </p>
          </div>

          {/* Mission & Objectives */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Mission & Objectives</h2>
            <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
              <li>Investigate financial crimes, corruption, and abuse of office</li>
              <li>Resolve public complaints through enlightenment and enforcement</li>
              <li>Enhance transparency and accountability in governance</li>
              <li>Recover misappropriated public funds and assets</li>
            </ul>
          </div>

          {/* Legal Framework */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Legal Framework</h2>
            <p className="text-lg text-gray-700">
              The Commission operates under the <strong>Ondo State Public Complaints, Financial Crime, and Anti-Corruption Commission Law 2022</strong>. 
              As per <strong>Section 14 (3)</strong>, SPFACC is authorized to take over financial crime investigations involving 
              the Ondo State Government.
            </p>
          </div>

          {/* Departments & Structure */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Organizational Structure</h2>
            <p className="text-lg text-gray-700">
              The Commission is structured into key departments for effective service delivery:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mt-4">
              <li>Public Complaints & Citizens’ Rights</li>
              <li>Finance & Accounts</li>
              <li>Legal Department</li>
              <li>Administration, Human Resources & Training</li>
              <li>Anti-Corruption & General Investigation</li>
              <li>Procurement & Supplies</li>
              <li>Asset Monitoring & Recovery</li>
            </ul>
          </div>

          {/* Report a Complaint */}
          {/* <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Report a Complaint</h2>
            <p className="text-lg text-gray-700 mb-4">
              SPFACC provides a platform for citizens to report corruption, abuse of office, and financial crimes anonymously.
            </p>
            <Button className="bg-red-600 text-white hover:bg-red-700">
              Report a Crime
            </Button>
          </div> */}

          {/* Contact Information */}
          {/* <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Contact Us</h2>
            <p className="text-lg text-gray-700">
              <strong>Address:</strong> Quarter 21, Alagbaka, Beside Government House, Akure, Ondo State  
            </p>
            <p className="text-lg text-gray-700">
              <strong>Phone:</strong> 07071249966  
            </p>
            <p className="text-lg text-gray-700">
              <strong>Email:</strong> contact@spfacc.gov.ng  
            </p>
          </div> */}
        </div>
      </section>
    </div>
    </MaxWidthWrapper>
  );
}
