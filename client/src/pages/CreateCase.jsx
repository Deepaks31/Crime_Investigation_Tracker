import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCase = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    suspectName: '',
    victimName: '',
    evidenceSummary: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace with your backend API
    const response = await fetch('http://localhost:5000/create-case', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, status: 'pending', createdBy: localStorage.getItem('name') }),
    });

    if (response.ok) {
      alert('Case submitted successfully!');
      navigate('/dashboard');
    } else {
      alert('Failed to submit case');
    }
  };

  return (
    <div className="min-h-screen w-screen items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Create New Case</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="title" placeholder="Case Title" onChange={handleChange} required className="w-full p-2 border rounded" />
          <textarea name="description" placeholder="Case Description" onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="date" name="date" onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="location" placeholder="Crime Location" onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="suspectName" placeholder="Suspect Name (if known)" onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="victimName" placeholder="Victim Name" onChange={handleChange} required className="w-full p-2 border rounded" />
          <textarea name="evidenceSummary" placeholder="Evidence Summary" onChange={handleChange} required className="w-full p-2 border rounded" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Submit Case</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCase;
