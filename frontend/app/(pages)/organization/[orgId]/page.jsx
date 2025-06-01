// pages/organization/[orgId].jsx
'use client';

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axiosClient from "@/app/common/axiosConfig";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";

export default function OrganizationPage() {
  const router = useRouter();
  const params = useParams();
  const orgId = params?.orgId;

  const [org, setOrg] = useState(null);
  const [trackers, setTrackers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [trackerForm, setTrackerForm] = useState({
    name: "",
    description: "",
    columns: ["To Do", "In Progress", "Done"],
  });
  const [loading, setLoading] = useState(false);

  // Fetch org details and trackers
  useEffect(() => {
    if (!orgId) return;

    const fetchTrackers = async () => {
      try {
        const res = await axiosClient.get(`/tracker/org-trackers?orgId=${orgId}`);
        setTrackers(res.data);
      } catch (err) {
        setTrackers([]);
      }
    };
    fetchTrackers();
  }, [orgId, router]);

  // Tracker creation handlers
  const handleTrackerInput = (e) => {
    setTrackerForm({ ...trackerForm, [e.target.name]: e.target.value });
  };

  const handleColumnChange = (idx, value) => {
    setTrackerForm((prev) => ({
      ...prev,
      columns: prev.columns.map((col, i) => (i === idx ? value : col)),
    }));
  };

  const handleAddColumn = () => {
    setTrackerForm((prev) => ({
      ...prev,
      columns: [...prev.columns, ""],
    }));
  };

  const handleRemoveColumn = (idx) => {
    setTrackerForm((prev) => ({
      ...prev,
      columns: prev.columns.filter((_, i) => i !== idx),
    }));
  };

  const handleCreateTracker = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const lowerCaseColumns = trackerForm.columns.map((item) =>
            item.toLowerCase().replace(/\s+/g, '_')
          );   
        const body={
            ...trackerForm,
            columns:lowerCaseColumns.join(',')
        }

      const res = await axiosClient.post(`/tracker/add-tracker?orgId=${orgId}`, {
        ...trackerForm,
        organizationId: orgId,
      });

      console.log(res.data.id);
      if(res.status==200 || res.status==201){
        const trackerOrgMapping = await axiosClient.post(`/tracker/${orgId}/add-tracker-to-org/${res.data.id}`,{});

        console.log(trackerOrgMapping);
      }

      setTrackers((prev) => [...prev, res.data]);
      setShowModal(false);
      setTrackerForm({
        name: "",
        description: "",
        columns: ["To Do", "In Progress", "Done"],
      });
      toast.success("Tracker created!");

    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create tracker");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Org Header */}
        <section className="bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-3xl shadow-xl px-8 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">{org?.name}</h1>
            <p className="text-gray-600">{org?.description}</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-green-500 text-white font-bold rounded-full shadow hover:from-indigo-600 hover:to-green-600 transition-all duration-200 text-lg"
          >
            <FaPlus /> Create Tracker
          </button>
        </section>

        {/* Trackers List */}
        <section className="bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-3xl shadow-xl px-8 py-10">
          <h2 className="text-2xl font-extrabold text-indigo-700 mb-6">Trackers</h2>
          {trackers.length === 0 ? (
            <p className="text-gray-500 text-lg">No trackers yet. Create one to get started!</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trackers.map((tracker) => (
                <li
                  key={tracker.id}
                  className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-5 shadow hover:shadow-lg transition flex flex-col"
                  onClick={()=>router.push(`/trackers/${tracker.id}`)}
                >
                  <div className="text-lg font-bold text-indigo-700 mb-1">{tracker.title}</div>
                  <div className="text-gray-600 mb-2">{tracker.description}</div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {tracker.columns?.split(',')?.map((col, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full"
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Modal for Create Tracker */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white/90 rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-indigo-700 mb-4">Create New Tracker</h3>
            <form onSubmit={handleCreateTracker} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Tracker Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={trackerForm.name}
                  onChange={handleTrackerInput}
                  className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
                  placeholder="e.g. Sprint Backlog"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={trackerForm.description}
                  onChange={handleTrackerInput}
                  className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
                  placeholder="Optional description"
                />
              </div>
              {/* Custom Columns */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Columns</label>
                <div className="flex flex-col gap-2">
                  {trackerForm.columns.map((col, idx) => (
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
                        disabled={trackerForm.columns.length <= 1}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddColumn}
                    className="mt-2 px-4 py-2 bg-gradient-to-r from-green-400 to-indigo-400 text-white rounded-full font-semibold shadow hover:from-green-500 hover:to-indigo-500 transition"
                  >
                    + Add Column
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-green-500 text-white font-bold rounded-full shadow hover:from-indigo-600 hover:to-green-600 transition-all duration-200 text-lg"
              >
                {loading ? "Creating..." : "Create Tracker"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
