// @ts-ignore
'use client'

import { useEffect, useState } from 'react';
import ComplaintDetails from '../components/complaints-details-view';

// Define the type for complaint data
type EvidenceItem = {
  id: string;
  name: string;
  url: string;
};

type ComplaintData = {
  id: string;
  title: string;
  description: string;
  evidence: EvidenceItem[];
  createdAt: string;
  updatedAt: string;
};

export default function ComplaintDetailsPage({ params }: { params: { id: string } }) {
  const [complaintData, setComplaintData] = useState<ComplaintData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComplaintData = async () => {
      try {
        const response = await fetch(`/api/dashboard/complaints/fetch-submitted-complaints/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch complaint data');
        }
        const data = await response.json();
        setComplaintData(data.complaint);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaintData();
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!complaintData) return <p>No complaint found.</p>;

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Complaint Details</h1>
      <ComplaintDetails complaintData={complaintData} evidenceItems={complaintData.evidence} />
    </>
  );
}
