import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCaseView = () => {
  const [cases, setCases] = useState([]);
  const [users, setUsers] = useState([]);
  const [assignments, setAssignments] = useState({});

  useEffect(() => {
    fetchCases();
    fetchUsers();
  }, []);

  const fetchCases = async () => {
    try {
      const res = await axios.get('http://localhost:5000/cases/pending');
      setCases(res.data);
    } catch (err) {
      console.error('Failed to fetch cases', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  const handleAssign = async (caseId) => {
    const userId = assignments[caseId];
    if (!userId) return;

    try {
      await axios.put(`http://localhost:5000/cases/${caseId}/assign`, { userId });
      alert('Case assigned successfully!');
      fetchCases(); // Optionally refresh the list
    } catch (err) {
      console.error('Assignment failed', err);
    }
  };

  const handleSelectChange = (caseId, userId) => {
    setAssignments((prev) => ({ ...prev, [caseId]: userId }));
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col p-6">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-blue-800">Pending Cases</h2>
      </header>

      <main className="flex-grow">
        {cases.length === 0 ? (
          <p className="text-gray-600">No pending cases available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-500 h-full flex flex-col justify-between"
                style={{ minHeight: '300px' }}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{c.title}</h3>
                  <p className="text-gray-600 mt-1"><strong>Date:</strong> {new Date(c.date).toDateString()}</p>
                  <p className="text-gray-600"><strong>Location:</strong> {c.location}</p>
                  <p className="text-gray-600"><strong>Suspect:</strong> {c.suspectName}</p>
                  <p className="text-gray-600"><strong>Victim:</strong> {c.victimName}</p>
                  <p className="text-gray-600"><strong>Evidence:</strong> {c.evidenceSummary}</p>
                </div>

                <div className="mt-4">
                  <label className="block text-gray-700 font-medium mb-1">Assign to:</label>
                  <div className="flex gap-2 items-center">
                    <select
                      className="p-2 border border-gray-300 rounded"
                      value={assignments[c._id] || ''}
                      onChange={(e) => handleSelectChange(c._id, e.target.value)}
                    >
                      <option value="">Select User</option>
                      {users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.name} ({user.role})
                        </option>
                      ))}
                    </select>
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      onClick={() => handleAssign(c._id)}
                    >
                      Assign
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminCaseView;
