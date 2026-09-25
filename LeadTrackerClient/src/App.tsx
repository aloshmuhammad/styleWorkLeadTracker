import { useState, useEffect } from 'react';
import { getLeads, type Lead } from './api';
import LeadForm from './components/LeadForm';
import LeadList from './components/LeadList';
import { Search, Plus, Target, Users, Sparkles, PhoneCall, CheckCircle2 } from 'lucide-react';

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

  const kpis = [
    { label: 'Total Leads', value: totalLeads, color: 'text-indigo-600', bg: 'bg-indigo-50', icon: Users },
    { label: 'New Leads', value: newLeads, color: 'text-blue-600', bg: 'bg-blue-50', icon: Sparkles },
    { label: 'Contacted', value: contactedLeads, color: 'text-amber-600', bg: 'bg-amber-50', icon: PhoneCall },
    { label: 'Qualified', value: qualifiedLeads, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle2 }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-40 shadow-sm">
        <div className="text-xl font-extrabold text-slate-900 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <Target className="w-5 h-5 text-white" />
          </div>
          Lead<span className="text-indigo-600 font-medium">Master</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-700 hidden sm:block">Aloshy Muhammad</span>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-fuchsia-500 text-white flex items-center justify-center font-bold shadow-md cursor-pointer hover:opacity-90 transition-opacity">
            A
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Lead Dashboard</h1>
            <p className="text-slate-500 mt-1.5 text-sm font-medium">Track, manage, and convert your incoming pipeline.</p>
          </div>
          <button 
            className="btn-primary whitespace-nowrap shadow-indigo-200/50" 
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-5 h-5" />
            Add New Lead
          </button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center gap-4 group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.bg} group-hover:scale-110 transition-transform duration-300`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5 block">
                  {kpi.label}
                </span>
                <span className="text-2xl font-black text-slate-900 leading-none">{kpi.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-lg font-bold text-slate-800">Recent Leads</h2>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search leads by name, email..." 
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm font-medium placeholder:font-normal shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <LeadList leads={leads} onStatusChange={() => fetchLeads(search)} loading={loading} />
        </div>

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
