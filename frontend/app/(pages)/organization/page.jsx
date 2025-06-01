'use client'

import axiosClient from "@/app/common/axiosConfig";
import ShareButton from "@/app/Components/ShareButton";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function OrganizationsPage() {
  const searchParams = useSearchParams();
  const orgId = searchParams.get("orgId");


  // Form state
  const [createForm, setCreateForm] = useState({ name: "", description: "" });
  const [joinCode, setJoinCode] = useState(orgId || "");
  const [joinedOrgs, setJoinedOrgs] = useState([]);
  const token = localStorage.getItem("token");

  const handleCreateOrg = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/organization", {
        name: createForm.name,
        description: createForm.description,
      });
  
      const newOrg = response.data;
  
      // Update joinedOrgs list
      setJoinedOrgs((prev) => [
        ...prev,
        {
          id: newOrg.id,
          name: newOrg.name,
          description: newOrg.description,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newOrg.name)}&background=4f46e5&color=fff`,
        },
      ]);
  
      // Clear form
      setCreateForm({ name: "", description: "" });
  
      toast.success("Organization created successfully!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Server Error");
      throw err;
    }
  };
  

  const handleJoinOrg =async (e) => {
    e.preventDefault();
    try{
      const response = await axiosClient.post(`/organization/${joinCode}/add-user`)
      console.log(response);
    }
    catch(err){
      toast.error(err?.response?.data?.message || "Server Error");
      throw err;
    }
  };

  const handleGetAllOrganizations=async()=>{
    try{
      const response = await axiosClient.get("/organization/user");

      let data=response.data.body;

      data = data.map((item)=>({...item,avataar: `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=4f46e5&color=fff`,}))

      setJoinedOrgs(data)
    }
    catch(err){
      throw err;
    }
  }

  useEffect(()=>{
    handleGetAllOrganizations();
  },[])

  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 via-white to-green-50 px-4">
        <div className="bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-3xl shadow-xl px-8 py-12 max-w-md w-full text-center">
          <h2 className="text-3xl font-extrabold text-indigo-700 mb-4">Please Log In</h2>
          <p className="text-lg text-gray-600 mb-8">
            You need to be logged in to view and manage your organizations.
          </p>
          <Link
            href="/login"
            className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-500 to-green-500 text-white font-bold rounded-full shadow hover:from-indigo-600 hover:to-green-600 transition-all duration-200 text-lg"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Create Organization */}
        <section className="bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-3xl shadow-xl px-8 py-10">
          <h2 className="text-2xl font-extrabold text-indigo-700 mb-4">Create a New Organization</h2>
          <form onSubmit={handleCreateOrg} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Organization Name</label>
              <input
                type="text"
                required
                value={createForm.name}
                onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
                placeholder="e.g. Kanban Wizards"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Description</label>
              <textarea
                required
                value={createForm.description}
                onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
                placeholder="What is this organization about?"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-green-500 text-white font-bold rounded-full shadow hover:from-indigo-600 hover:to-green-600 transition-all duration-200 text-lg"
            >
              Create Organization
            </button>
          </form>
        </section>

        {/* Join Organization */}
        <section className="bg-white/80 backdrop-blur-lg border border-green-100 rounded-3xl shadow-xl px-8 py-10">
          <h2 className="text-2xl font-extrabold text-green-600 mb-4">Join an Organization</h2>
          <form onSubmit={handleJoinOrg} className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              required
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
              placeholder="Enter invite code or org ID"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-indigo-500 text-white font-bold rounded-full shadow hover:from-green-600 hover:to-indigo-600 transition-all duration-200 text-lg"
            >
              Join Organization
            </button>
          </form>
        </section>

        {/* List of Joined Organizations */}
        <section className="bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-3xl shadow-xl px-8 py-10">
          <h2 className="text-2xl font-extrabold text-indigo-700 mb-6">My Organizations</h2>
          {joinedOrgs.length === 0 ? (
            <p className="text-gray-500 text-lg">You haven&apos;t joined any organizations yet.</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {joinedOrgs.map((org) => (
                <li
                    key={org.id}
                    className="flex items-center gap-4 bg-indigo-50/60 border border-indigo-100 rounded-2xl p-5 shadow hover:shadow-lg transition"
                >
                    <img
                      src={org.avataar}
                      alt={org.name}
                      className="w-14 h-14 rounded-full border-2 border-indigo-300 object-cover"
                    />
                    <div className="flex-1">
                    <div className="text-lg font-bold text-indigo-700">
                      <Link href={`/organization/${org.id}`}>
                        {org.name}
                      </Link>
                    </div>
                    <div className="text-gray-600">{org.description}</div>
                    </div>
                    {org.createdBy && <ShareButton
                    title={`Join my organization: ${org.name}`}
                    text={`Check out ${org.name} on KanbanPro!`}
                    url={`${typeof window !== "undefined" ? window.location.origin : ""}/organization?orgId=${org.id}`}
                    />}
                </li>
                ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
