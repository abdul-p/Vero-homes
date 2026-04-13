"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";

interface Listing {
  _id: string;
  title: string;
  type: string;
  price: number;
  status: string;
  location: {
    city: string;
    address: string;
  };
  images: string[];
  createdAt: string;
}

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  listing: {
    title: string;
    location: { city: string };
    price: number;
    type: string;
  };
  createdAt: string;
}

export default function AgentDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"listings" | "inquiries" | "create">("listings");
  const [listings, setListings] = useState<Listing[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "sale",
    price: "",
    city: "Lagos",
    address: "",
    bedrooms: "",
    bathrooms: "",
    images: [] as string[],
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (status === "authenticated" && session.user.role !== "agent" && session.user.role !== "admin") {
      router.push("/");
    }
  }, [status, session]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchListings();
      fetchInquiries();
    }
  }, [status]);

  const fetchListings = async () => {
    try {
      const res = await fetch("/api/agent-listings");
      const data = await res.json();
      setListings(data.listings || []);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInquiries = async () => {
    try {
      const res = await fetch(`/api/inquiries?agentId=${session?.user.id}`);
      const data = await res.json();
      setInquiries(data.inquiries || []);
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    setFormSuccess(false);

    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          type: formData.type,
          price: Number(formData.price),
          location: {
            city: formData.city,
            address: formData.address,
          },
          bedrooms: formData.bedrooms ? Number(formData.bedrooms) : undefined,
          bathrooms: formData.bathrooms ? Number(formData.bathrooms) : undefined,
          images: formData.images,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.message);
        return;
      }

      setFormSuccess(true);
      setFormData({
        title: "",
        description: "",
        type: "sale",
        price: "",
        city: "Lagos",
        address: "",
        bedrooms: "",
        bathrooms: "",
        images: []
      });
      fetchListings();
      setTimeout(() => setActiveTab("listings"), 1500);
    } catch (error) {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    try {
      const res = await fetch(`/api/agent-listings/${id}`, { method: "DELETE" });
      if (res.ok) {
        setListings(listings.filter((l) => l._id !== id));
      }
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
      <section className="bg-blue-600 text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Agent Dashboard</h1>
          <p className="text-blue-100 text-sm mt-1">
            Welcome back, {session?.user.name}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <p className="text-3xl font-bold text-blue-600">{listings.length}</p>
            <p className="text-sm text-gray-400 mt-1">Total Listings</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <p className="text-3xl font-bold text-green-600">
              {listings.filter((l) => l.status === "approved").length}
            </p>
            <p className="text-sm text-gray-400 mt-1">Approved</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <p className="text-3xl font-bold text-purple-600">{inquiries.length}</p>
            <p className="text-sm text-gray-400 mt-1">Inquiries</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["listings", "inquiries", "create"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab === "create" ? "Create Listing" : tab}
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
                <p className="text-gray-400 mb-4">You have no listings yet</p>
                <button
                  onClick={() => setActiveTab("create")}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm"
                >
                  Create your first listing
                </button>
              </div>
            ) : (
              listings.map((listing) => (
                <div
                  key={listing._id}
                  className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusBadge[listing.status]}`}
                      >
                        {listing.status}
                      </span>
                      <span className="text-xs text-gray-400 capitalize">
                        {listing.type}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-800 truncate">
                      {listing.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {listing.location.address}, {listing.location.city}
                    </p>
                    <p className="text-blue-600 font-bold text-sm mt-1">
                      {formatPrice(listing.price)}
                    </p>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <Link
                      href={`/listings/${listing._id}`}
                      className="text-xs border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(listing._id)}
                      className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Inquiries Tab */}
        {activeTab === "inquiries" && (
          <div className="space-y-4">
            {inquiries.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
                <p className="text-gray-400">No inquiries yet</p>
              </div>
            ) : (
              inquiries.map((inquiry) => (
                <div
                  key={inquiry._id}
                  className="bg-white rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-800">{inquiry.name}</p>
                      <p className="text-xs text-gray-400">{inquiry.email}</p>
                      {inquiry.phone && (
                        <p className="text-xs text-gray-400">{inquiry.phone}</p>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{inquiry.message}</p>
                  <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500">
                    Re: {inquiry.listing.title} —{" "}
                    {formatPrice(inquiry.listing.price)}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Create Listing Tab */}
        {activeTab === "create" && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-6">
              Create New Listing
            </h2>

            {formSuccess && (
              <div className="bg-green-50 text-green-600 p-4 rounded-lg text-sm mb-4">
                Listing created successfully. Redirecting to your listings...
              </div>
            )}

            {formError && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm mb-4">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateListing} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                  placeholder="e.g. Modern 3 Bedroom Flat in Lekki"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  required
                  rows={4}
                  placeholder="Describe the property in detail..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleFormChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                    <option value="shortlet">Short Let</option>
                    <option value="land">Land</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleFormChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Port Harcourt">Port Harcourt</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₦)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  required
                  placeholder="e.g. 5000000"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  required
                  placeholder="e.g. 12 Admiralty Way, Lekki Phase 1"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bedrooms (optional)
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleFormChange}
                    placeholder="e.g. 3"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bathrooms (optional)
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleFormChange}
                    placeholder="e.g. 2"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <ImageUpload images={formData.images} onImagesChange={(imgs) => setFormData({ ...formData, images: imgs })}/>


              <button
                type="submit"
                disabled={formLoading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
              >
                {formLoading ? "Creating..." : "Create Listing"}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
