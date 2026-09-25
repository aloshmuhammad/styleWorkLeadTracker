import { updateLeadStatus, type Lead } from '../api';
import { Users, Mail, Phone, Calendar, Inbox } from 'lucide-react';

interface LeadListProps {
  leads: Lead[];
  onStatusChange: () => void;
  loading: boolean;
}

const statusStyles: Record<string, string> = {
  New: 'bg-indigo-100 text-indigo-800',
  Contacted: 'bg-amber-100 text-amber-800',
  Qualified: 'bg-emerald-100 text-emerald-800',
  Lost: 'bg-red-100 text-red-800',
};

export default function LeadList({ leads, onStatusChange, loading }: LeadListProps) {
  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await updateLeadStatus(id, newStatus);
      onStatusChange();
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                <div className="flex items-center gap-2"><Users className="w-4 h-4" /> Name</div>
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> Email</div>
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> Phone</div>
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Created At</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-12">
                  <div className="inline-block text-indigo-600 font-medium">Loading leads...</div>
                </td>
              </tr>
            ) : leads.length > 0 ? (
              leads.map((lead) => (
                <tr key={lead._id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">{lead.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600">{lead.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600">{lead.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative inline-block">
                      <select 
                        className={`appearance-none cursor-pointer pl-3 pr-8 py-1 rounded-full text-xs font-bold tracking-wide uppercase transition-colors outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 border border-transparent hover:border-black/10 ${statusStyles[lead.status || 'New']}`}
                        value={lead.status}
                        onChange={(e) => handleStatusUpdate(lead._id!, e.target.value)}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Lost">Lost</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-600">
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-sm">{new Date(lead.createdAt!).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-16">
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <Inbox className="w-12 h-12 text-slate-300 mb-4" />
                    <h3 className="text-lg font-medium text-slate-900">No leads found</h3>
                    <p className="mt-1 text-sm">Get started by adding a new lead or adjusting your search.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
