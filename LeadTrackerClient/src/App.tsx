import { useState, useEffect } from 'react';
import { getLeads, type Lead } from './api';
import LeadForm from './components/LeadForm';
import LeadList from './components/LeadList';
import { Search, Plus, Target } from 'lucide-react';

function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async (searchQuery: string) => {
    setLoading(true);
    try {
      const data = await getLeads(searchQuery);
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchLeads(search);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const contactedLeads = leads.filter(l => l.status === 'Contacted').length;
  const qualifiedLeads = leads.filter(l => l.status === 'Qualified').length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-xl font-bold text-indigo-600 flex items-center gap-2">
          <Target className="w-6 h-6" />
          LeadMaster
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-700">Aloshy</span>
          <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shadow-sm">
            A
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 mt-1">Here is an overview of your lead pipeline.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Leads', value: totalLeads, color: 'text-slate-500' },
            { label: 'New', value: newLeads, color: 'text-indigo-600' },
            { label: 'Contacted', value: contactedLeads, color: 'text-amber-600' },
            { label: 'Qualified', value: qualifiedLeads, color: 'text-emerald-600' }
          ].map((kpi, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
              <span className={`text-xs font-bold uppercase tracking-wider mb-2 ${kpi.color}`}>
                {kpi.label}
              </span>
              <span className="text-3xl font-bold text-slate-900">{kpi.value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search leads by name, email..." 
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="btn-primary whitespace-nowrap" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-5 h-5" />
            Add Lead
          </button>
        </div>

        <LeadList leads={leads} onStatusChange={() => fetchLeads(search)} loading={loading} />

        {isModalOpen && (
          <LeadForm 
            onClose={() => setIsModalOpen(false)} 
            onLeadAdded={() => fetchLeads(search)} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
