'use client';

import React, { useEffect, useState } from 'react';
import axiosClient from '@/app/common/axiosConfig';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function TrackersPage() {
  const [trackers, setTrackers] = useState([]);
  const [newTrackerName, setNewTrackerName] = useState('');
  const [newTrackerDesc, setNewTrackerDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

    // Add at the top of your component:
    const [columns, setColumns] = useState(["To Do", "In Progress", "Done"]);

    const handleAddColumn = () => setColumns([...columns, ""]);
    const handleRemoveColumn = (idx) => setColumns(columns.filter((_, i) => i !== idx));
    const handleColumnChange = (idx, value) =>
    setColumns(columns.map((col, i) => (i === idx ? value : col)));

    // Update your handleCreateTracker to include columns:
    const handleCreateTracker = async (e) => {
        e.preventDefault();
        if (!newTrackerName.trim()) {
            toast.error('Tracker name is required');
            return;
        }
        if (!columns.every((col) => col.trim())) {
            toast.error('All columns must have a name');
            return;
        }
        setLoading(true);
        try {
            const lowerCaseColumns = columns.map((item) =>
              item.toLowerCase().replace(/\s+/g, '_')
            );          
            const response = await axiosClient.post('/tracker/add-tracker?orgId=', {
              name: newTrackerName,
              description: newTrackerDesc,
              columns:lowerCaseColumns,
            });
            setTrackers((prev) => [...prev, response.data]);
            setNewTrackerName('');
            setNewTrackerDesc('');
            setColumns(["To Do", "In Progress", "Done"]); // Reset to default
            toast.success('Tracker created successfully');
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to create tracker');
        } finally {
            setLoading(false);
        }
    };


  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchTrackers();
    }
  }, [token]);

  const fetchTrackers = async () => {
    try {
      const response = await axiosClient.get('/tracker/user');
      setTrackers(response.data.body || []);
    } catch (error) {
      toast.error('Failed to load trackers');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-green-50 py-12 px-4">
      {!token ? (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-3xl shadow-xl px-8 py-12 max-w-md w-full text-center">
            <h2 className="text-3xl font-extrabold text-indigo-700 mb-4">Please Log In</h2>
            <p className="text-lg text-gray-600 mb-8">
              You need to be logged in to view and manage your trackers.
            </p>
            <Link
              href="/login"
              className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-500 to-green-500 text-white font-bold rounded-full shadow hover:from-indigo-600 hover:to-green-600 transition-all duration-200 text-lg"
            >
              Go to Login
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Create Tracker Form */}
          <section className="bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-3xl shadow-xl px-8 py-10">
                <h2 className="text-2xl font-extrabold text-indigo-700 mb-4">Create a New Tracker</h2>
                <form onSubmit={handleCreateTracker} className="space-y-4">
                    <div>
                    <label className="block text-gray-700 font-medium mb-1">Tracker Name</label>
                    <input
                        type="text"
                        required
                        value={newTrackerName}
                        onChange={(e) => setNewTrackerName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
                        placeholder="e.g. Sprint Backlog"
                    />
                    </div>
                    <div>
                    <label className="block text-gray-700 font-medium mb-1">Description</label>
                    <textarea
                        value={newTrackerDesc}
                        onChange={(e) => setNewTrackerDesc(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
                        placeholder="Optional description"
                    />
                    </div>
                    {/* Custom Columns UI */}
                    <div>
                    <label className="block text-gray-700 font-medium mb-1">Columns</label>
                    <div className="flex flex-col gap-2">
                        {columns.map((col, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <input
                            type="text"
                            value={col}
                            onChange={(e) => handleColumnChange(idx, e.target.value)}
                            className="flex-1 px-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base"
                            placeholder={`Column ${idx + 1}`}
                            required
                            />
                            <button
                            type="button"
                            onClick={() => handleRemoveColumn(idx)}
                            className="px-2 py-1 text-red-500 hover:text-red-700 rounded transition"
                            title="Remove column"
                            >
                            &times;
                            </button>
                        </div>
                        ))}
                        <button
                        type="button"
                        onClick={handleAddColumn}
                        className="w-fit mx-auto mt-2 px-4 py-2 bg-gradient-to-r from-green-400 to-indigo-400 text-white rounded-full font-semibold shadow hover:from-green-500 hover:to-indigo-500 transition"
                        >
                        + Add Column
                        </button>
                    </div>
                    </div>
                    <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-green-500 text-white font-bold rounded-full shadow hover:from-indigo-600 hover:to-green-600 transition-all duration-200 text-lg"
                    >
                    {loading ? 'Creating...' : 'Create Tracker'}
                    </button>
                </form>
            </section>


          {/* List of Trackers */}
          <section className="bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-3xl shadow-xl px-8 py-10">
            <h2 className="text-2xl font-extrabold text-indigo-700 mb-6">My Trackers</h2>
            {trackers.length === 0 ? (
              <p className="text-gray-500 text-lg">You have no trackers yet.</p>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trackers.map((tracker) => (
                  <li
                    key={tracker.id}
                    className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-5 shadow hover:shadow-lg transition flex flex-col"
                  >
                    <div className="text-lg font-bold text-indigo-700 mb-2">{tracker.name}</div>
                    <div className="text-gray-600 flex-grow">{tracker.description || 'No description provided.'}</div>
                    {/* Add more tracker details or actions here if needed */}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
