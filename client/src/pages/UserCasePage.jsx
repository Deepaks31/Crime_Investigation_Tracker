import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UserCasePage = () => {
  const { userId, caseId } = useParams();
  const [caseDetails, setCaseDetails] = useState(null);
  const [report, setReport] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/cases/${caseId}`);
        setCaseDetails(res.data);
      } catch (err) {
        console.error("Error fetching case:", err);
      }
    };

    fetchCaseDetails();
  }, [caseId]);

  const handleReportChange = (e) => {
    setReport(e.target.value);
  };

  const handleSubmit = async () => {
    if (!report.trim()) {
      alert('Please fill out the report before submitting.');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/cases/${caseId}/complete`, {
        isCompleted: true,
        report,
      });

      alert('Case completed and report submitted successfully!');
      navigate(`/user/${userId}`);
    } catch (err) {
      console.error('Failed to submit the report', err);
      alert('Error submitting the report. Please try again.');
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col p-6">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-blue-800">Case Details</h2>
      </header>

      <main className="flex-grow">
        {!caseDetails ? (
          <p className="text-gray-600">Loading case details...</p>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-gray-800">{caseDetails.title}</h3>
            <p className="text-gray-600 mt-2"><strong>Date:</strong> {new Date(caseDetails.date).toDateString()}</p>
            <p className="text-gray-600"><strong>Location:</strong> {caseDetails.location}</p>
            <p className="text-gray-600"><strong>Suspect:</strong> {caseDetails.suspectName}</p>
            <p className="text-gray-600"><strong>Victim:</strong> {caseDetails.victimName}</p>
            <p className="text-gray-600"><strong>Evidence:</strong> {caseDetails.evidenceSummary}</p>
            <p className="text-gray-600"><strong>Status:</strong> {caseDetails.status}</p>

            {/* Report Textarea */}
            <div className="mt-6">
              <label className="block text-gray-700 font-medium mb-1">Incident Report</label>
              <textarea
                className="p-2 border border-gray-300 rounded w-full"
                rows="6"
                value={report}
                onChange={handleReportChange}
                placeholder="Write your incident report here..."
              ></textarea>
            </div>

            {/* Mark as completed checkbox */}
            <div className="mt-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={isCompleted}
                  onChange={() => setIsCompleted(!isCompleted)}
                />
                <span className="ml-2 text-gray-600">Mark case as completed</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                onClick={handleSubmit}
                disabled={!isCompleted || !report.trim()}
              >
                Submit Report
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserCasePage;
