"use client";

import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import {
  Users,
  Mail,
  Phone,
  Building2,
  Calendar,
  Trash2,
  RefreshCw,
  Download,
  Filter,
  AlertCircle,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  source: "carfax" | "autocheck" | "chinese-api" | "contact";
  status?: string;
  createdAt: string;
}

interface LeadsResponse {
  data: {
    leads: Lead[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    stats: {
      total: number;
      carfax: number;
      autocheck: number;
      chineseApi: number;
      contact: number;
    };
  };
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    carfax: 0,
    autocheck: 0,
    chineseApi: 0,
    contact: 0,
  });

  const { token } = useSelector((state: RootState) => state.auth);

  const loadLeads = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/leads", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("You do not have permission to view leads");
        }
        if (response.status === 401) {
          throw new Error("Please log in to view leads");
        }
        throw new Error("Failed to fetch leads");
      }

      const data: LeadsResponse = await response.json();
      setLeads(data.data.leads);
      setStats(data.data.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load leads");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      loadLeads();
    }
  }, [token, loadLeads]);

  useEffect(() => {
    if (sourceFilter === "all") {
      setFilteredLeads(leads);
    } else {
      setFilteredLeads(leads.filter((lead) => lead.source === sourceFilter));
    }
  }, [leads, sourceFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;

    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete lead");
      }

      loadLeads();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete lead");
    }
  };

  const handleClearAll = async () => {
    alert("To delete all leads, please delete them individually for safety.");
  };

  const handleExportCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Company",
      "Source",
      "Message",
      "Date",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredLeads.map((lead) =>
        [
          `"${lead.name}"`,
          `"${lead.email}"`,
          `"${lead.phone}"`,
          `"${lead.company}"`,
          `"${lead.source}"`,
          `"${lead.message.replace(/"/g, '""')}"`,
          `"${new Date(lead.createdAt).toLocaleString()}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `leads_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case "carfax":
        return "bg-red-100 text-red-700";
      case "autocheck":
        return "bg-blue-100 text-blue-700";
      case "chinese-api":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case "carfax":
        return "Carfax API";
      case "autocheck":
        return "AutoCheck API";
      case "chinese-api":
        return "China Vehicle API";
      default:
        return source;
    }
  };

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-3" />
          <h3 className="text-lg font-semibold text-red-800 mb-1">Error</h3>
          <p className="text-red-600">{error}</p>
          <button
            onClick={loadLeads}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Lead Management</h1>
          <p className="text-muted-foreground">
            View and manage all demo requests and inquiries
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadLeads}
            className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
          <button
            onClick={handleExportCSV}
            disabled={filteredLeads.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            <Download size={16} />
            Export CSV
          </button>
          <button
            onClick={handleClearAll}
            disabled={leads.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            <Trash2 size={16} />
            Clear All
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
              <Users size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Leads</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 text-red-600 p-2 rounded-lg">
              <Users size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.carfax}</p>
              <p className="text-sm text-muted-foreground">Carfax</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
              <Users size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.autocheck}</p>
              <p className="text-sm text-muted-foreground">AutoCheck</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
              <Users size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.chineseApi}</p>
              <p className="text-sm text-muted-foreground">China API</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3 mb-6">
        <Filter size={16} className="text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Filter by source:</span>
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="bg-card border border-border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Sources</option>
          <option value="carfax">Carfax API</option>
          <option value="autocheck">AutoCheck API</option>
          <option value="chinese-api">China Vehicle API</option>
        </select>
      </div>

      {/* Leads Table */}
      {isLoading ? (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">Loading leads...</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <Users className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="text-lg font-semibold mb-1">No leads yet</h3>
          <p className="text-muted-foreground">
            {sourceFilter === "all"
              ? "When visitors submit demo requests, they will appear here."
              : `No leads from ${getSourceLabel(sourceFilter)} yet.`}
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                    Contact Info
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                    Company
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                    Source
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                    Message
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-muted/30 transition">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-foreground">
                          {lead.name}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <Mail size={12} />
                          <a
                            href={`mailto:${lead.email}`}
                            className="hover:text-purple-600"
                          >
                            {lead.email}
                          </a>
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <Phone size={12} />
                            <a
                              href={`tel:${lead.phone}`}
                              className="hover:text-purple-600"
                            >
                              {lead.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {lead.company ? (
                        <div className="flex items-center gap-1 text-sm">
                          <Building2 size={14} className="text-muted-foreground" />
                          <span>{lead.company}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getSourceBadgeColor(
                          lead.source
                        )}`}
                      >
                        {getSourceLabel(lead.source)}
                      </span>
                    </td>
                    <td className="px-4 py-4 max-w-xs">
                      {lead.message ? (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {lead.message}
                        </p>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar size={12} />
                        <span>
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(lead.createdAt).toLocaleTimeString()}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete lead"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
