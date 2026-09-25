import axios from 'axios';

const API_URL = 'http://localhost:5000/api/leads';

export interface Lead {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  status?: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  createdAt?: string;
  updatedAt?: string;
}

export const getLeads = async (search = '') => {
  const response = await axios.get(`${API_URL}?search=${search}`);
  return response.data;
};

export const createLead = async (leadData: Lead) => {
  const response = await axios.post(API_URL, leadData);
  return response.data;
};

export const updateLeadStatus = async (id: string, status: string) => {
  const response = await axios.patch(`${API_URL}/${id}/status`, { status });
  return response.data;
};
