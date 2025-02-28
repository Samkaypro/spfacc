'use client'
import { useEffect, useState } from 'react';
import ComplaintDetails from '@/components/app/team/complaints/details/complaints-details-view';

export default function ComplaintDetailsPage({ params }: { params: { id: string } }) {
  const [complaintData, setComplaintData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaintData = async () => {
      try {
        const response = await fetch(`/api/team/complaints/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch complaint data');
        }
        const data = await response.json();
        setComplaintData(data.complaint);
      } catch (err) {
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