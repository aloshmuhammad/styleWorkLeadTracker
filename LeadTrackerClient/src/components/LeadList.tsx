import { updateLeadStatus, type Lead } from '../api';
import { Users, Mail, Phone, Calendar, Inbox } from 'lucide-react';

interface LeadListProps {
  leads: Lead[];
  onStatusChange: () => void;
  loading: boolean;
}

const statusStyles: Record<string, string> = {
  New: 'bg-blue-50 text-blue-700 border-blue-200/60 hover:border-blue-300',
  Contacted: 'bg-amber-50 text-amber-700 border-amber-200/60 hover:border-amber-300',
  Qualified: 'bg-emerald-50 text-emerald-700 border-emerald-200/60 hover:border-emerald-300',
  Lost: 'bg-red-50 text-red-700 border-red-200/60 hover:border-red-300',
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
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200 bg-white">
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
              <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Lead Name</div>
            </th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
              <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email Address</div>
            </th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
              <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Phone</div>
            </th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
              Status Pipeline
            </th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
              <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Added Date</div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center py-16">
                <div className="inline-flex items-center justify-center gap-3 text-indigo-600 font-semibold bg-indigo-50 px-6 py-3 rounded-full">
                  <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                  Loading pipeline data...
                </div>
              </td>
            </tr>
          ) : leads.length > 0 ? (
            leads.map((lead) => (
              <tr key={lead._id} className="hover:bg-slate-50/70 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-bold text-slate-900">{lead.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-medium">{lead.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-medium">{lead.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="relative inline-block">
                    <select 
                      className={`appearance-none cursor-pointer pl-3.5 pr-8 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border shadow-sm ${statusStyles[lead.status || 'New']}`}
                      value={lead.status}
                      onChange={(e) => handleStatusUpdate(lead._id!, e.target.value)}
                    >
                      <option value="New">New Lead</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Lost">Lost</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 opacity-60">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-400 font-medium text-sm">
                  {new Date(lead.createdAt!).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-20">
                <div className="flex flex-col items-center justify-center text-slate-500">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 border border-slate-200">
                    <Inbox className="w-7 h-7 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">Pipeline is empty</h3>
                  <p className="mt-1 text-sm font-medium text-slate-400 max-w-sm text-center">There are no leads matching your current criteria. Add a new lead to get started.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
