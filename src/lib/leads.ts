// Lead storage utility using localStorage

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  source: "carfax" | "autocheck" | "chinese-api" | "contact";
  createdAt: string;
}

const LEADS_STORAGE_KEY = "globalvin_leads";

// Get all leads from localStorage
export const getLeads = (): Lead[] => {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(LEADS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// Save a new lead
export const saveLead = (
  leadData: Omit<Lead, "id" | "createdAt">
): Lead => {
  const leads = getLeads();

  const newLead: Lead = {
    ...leadData,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    createdAt: new Date().toISOString(),
  };

  leads.unshift(newLead); // Add to beginning
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));

  return newLead;
};

// Delete a lead by ID
export const deleteLead = (id: string): boolean => {
  const leads = getLeads();
  const filtered = leads.filter((lead) => lead.id !== id);

  if (filtered.length === leads.length) return false;

  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(filtered));
  return true;
};

// Clear all leads
export const clearAllLeads = (): void => {
  localStorage.removeItem(LEADS_STORAGE_KEY);
};

// Get leads by source
export const getLeadsBySource = (source: Lead["source"]): Lead[] => {
  return getLeads().filter((lead) => lead.source === source);
};

// Get leads count
export const getLeadsCount = (): number => {
  return getLeads().length;
};

// Initialize with demo leads (for testing)
export const initDemoLeads = (): void => {
  const existingLeads = getLeads();
  if (existingLeads.length > 0) return; // Don't add if leads already exist

  const demoLeads: Lead[] = [
    {
      id: "lead_demo_1",
      name: "John Smith",
      email: "john.smith@autodealers.com",
      phone: "+1 (555) 123-4567",
      company: "Smith Auto Dealers",
      message: "Interested in integrating Carfax API for our dealership network of 15 locations.",
      source: "carfax",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    },
    {
      id: "lead_demo_2",
      name: "Sarah Johnson",
      email: "sarah@importcars.co",
      phone: "+1 (555) 987-6543",
      company: "Import Cars Co",
      message: "Looking for China vehicle data API for our import business. We import 50+ vehicles monthly.",
      source: "chinese-api",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
    {
      id: "lead_demo_3",
      name: "Michael Chen",
      email: "m.chen@autocheck-users.com",
      phone: "+1 (555) 456-7890",
      company: "Premium Auto Group",
      message: "Need AutoCheck API access for our used car verification platform.",
      source: "autocheck",
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    },
    {
      id: "lead_demo_4",
      name: "Emily Davis",
      email: "emily.d@carhistory.net",
      phone: "+1 (555) 321-0987",
      company: "CarHistory Network",
      message: "Exploring Carfax partnership for our vehicle history report aggregation service.",
      source: "carfax",
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    },
    {
      id: "lead_demo_5",
      name: "David Wang",
      email: "david@chinaautoimport.com",
      phone: "+86 138 1234 5678",
      company: "China Auto Import Ltd",
      message: "We need comprehensive Chinese vehicle data for export documentation. High volume expected.",
      source: "chinese-api",
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    },
    {
      id: "lead_demo_6",
      name: "Jessica Martinez",
      email: "jmartinez@dealernetwork.com",
      phone: "+1 (555) 789-0123",
      company: "National Dealer Network",
      message: "Interested in AutoCheck API for real-time vehicle scoring across 200+ dealerships.",
      source: "autocheck",
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    },
  ];

  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(demoLeads));
};
