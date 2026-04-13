"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Listing {
  _id: string;
  title: string;
  type: string;
  price: number;
  status: string;
  location: { city: string; address: string };
  agent: { name: string; email: string };
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"listings" | "users">("listings");
  const [listings, setListings] = useState<Listing[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated" && session.user.role !== "admin") {
      router.push("/");
    }
  }, [status, session]);

  useEffect(() => {
    if (status === "authenticated" && session.user.role === "admin") {
      fetchAllListings();
      fetchAllUsers();
    }
  }, [status]);

  const fetchAllListings = async () => {
    try {
      const res = await fetch("/api/admin/listings");
      const data = await res.json();
      setListings(data.listings || []);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setListings(listings.map((l) =>
          l._id === id ? { ...l, status } : l
        ));
      }
    } catch (error) {
      console.error("Failed to update listing status:", error);
    }
  };

  const handleDeleteListing = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    try {
      const res = await fetch(`/api/listings/${id}`, { method: "DELETE" });
      if (res.ok) setListings(listings.filter((l) => l._id !== id));
    } catch (error) {
      console.error("Failed to delete listing:", error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const statusBadge: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  const roleBadge: Record<string, string> = {
    admin: "bg-purple-100 text-purple-700",
    agent: "bg-blue-100 text-blue-700",
    visitor: "bg-gray-100 text-gray-700",
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gray-900 text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage listings, users, and platform activity
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <p className="text-3xl font-bold text-gray-800">{listings.length}</p>
            <p className="text-sm text-gray-400 mt-1">Total Listings</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <p className="text-3xl font-bold text-yellow-600">
              {listings.filter((l) => l.status === "pending").length}
            </p>
            <p className="text-sm text-gray-400 mt-1">Pending</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <p className="text-3xl font-bold text-green-600">
              {listings.filter((l) => l.status === "approved").length}
            </p>
            <p className="text-sm text-gray-400 mt-1">Approved</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <p className="text-3xl font-bold text-blue-600">{users.length}</p>
            <p className="text-sm text-gray-400 mt-1">Total Users</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["listings", "users"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${
                activeTab === tab
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Listings Tab */}
        {activeTab === "listings" && (
          <div className="space-y-4">
            {loading ? (
              <p className="text-gray-400 text-center py-10">Loading...</p>
            ) : listings.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
                <p className="text-gray-400">No listings found</p>
              </div>
            ) : (
              listings.map((listing) => (
                <div
                  key={listing._id}
                  className="bg-white rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusBadge[listing.status]}`}>
                          {listing.status}
                        </span>
                        <span className="text-xs text-gray-400 capitalize">
                          {listing.type}
                        </span>
                        <span className="text-xs text-gray-400">
                          {listing.location.city}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-800 truncate">
                        {listing.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {listing.location.address}
                      </p>
                      <p className="text-blue-600 font-bold text-sm mt-1">
                        {formatPrice(listing.price)}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Agent: {listing.agent?.name} — {listing.agent?.email}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0">
                      {listing.status !== "approved" && (
                        <button
                          onClick={() => handleStatusChange(listing._id, "approved")}
                          className="text-xs bg-green-50 text-green-600 px-3 py-1.5 rounded-lg hover:bg-green-100 transition"
                        >
                          Approve
                        </button>
                      )}
                      {listing.status !== "rejected" && (
                        <button
                          onClick={() => handleStatusChange(listing._id, "rejected")}
                          className="text-xs bg-yellow-50 text-yellow-600 px-3 py-1.5 rounded-lg hover:bg-yellow-100 transition"
                        >
                          Reject
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteListing(listing._id)}
                        className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="space-y-4">
            {users.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
                <p className="text-gray-400">No users found</p>
              </div>
            ) : (
              users.map((user) => (
                <div
                  key={user._id}
                  className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleBadge[user.role]}`}>
                        {user.role}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{user.email}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}