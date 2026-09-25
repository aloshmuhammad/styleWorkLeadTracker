import { useState, useEffect } from 'react';
import { getLeads, createLead, updateLeadStatus, Lead } from './api';
import './index.css';

function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', status: 'New' });

  useEffect(() => {
    fetchLeads();
  }, [search]);

  const fetchLeads = async () => {
    try {
      const data = await getLeads(search);
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads', error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateLeadStatus(id, newStatus);
      fetchLeads(); // Refresh list
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLead(formData as Lead);
      setIsModalOpen(false);
      setFormData({ name: '', email: '', phone: '', status: 'New' });
      fetchLeads();
    } catch (error) {
      console.error('Error creating lead', error);
      alert('Error creating lead. Ensure email is unique and valid.');
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Lead Tracker</h1>
      </header>

      <div className="dashboard-header">
        <input 
          type="text" 
          placeholder="Search by name or email..." 
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          + New Lead
        </button>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {leads.length > 0 ? (
              leads.map((lead) => (
                <tr key={lead._id}>
                  <td><strong>{lead.name}</strong></td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>
                    <select 
                      className={`status-select status-${lead.status}`}
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead._id!, e.target.value)}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Lost">Lost</option>
                    </select>
                  </td>
                  <td>{new Date(lead.createdAt!).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Lead</h2>
            <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input 
                  type="text" 
                  required 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Initial Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
