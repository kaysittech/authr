import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  CreditCard, 
  Download, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Building, 
  ShieldCheck, 
  PieChart, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { FinancialTransaction } from '../types';
import { Web3WalletConnect } from './Web3WalletConnect';

interface FinancialsProps {
  transactions: FinancialTransaction[];
}

export const Financials: React.FC<FinancialsProps> = ({ transactions }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawMessage, setWithdrawMessage] = useState<string | null>(null);

  const grossTotal = transactions.reduce((acc, t) => acc + t.grossAmount, 0);
  const netTotal = transactions.reduce((acc, t) => acc + t.netPayout, 0);
  const platformFeesTotal = transactions.reduce((acc, t) => acc + t.platformFee, 0);

  const filteredTransactions = transactions.filter(t => {
    if (filterType === 'micro_license') return t.type === 'micro_license';
    if (filterType === 'settlement_fee') return t.type === 'settlement_fee';
    if (filterType === 'ad_revenue_claim') return t.type === 'ad_revenue_claim';
    return true;
  });

  const handleWithdrawPayout = () => {
    setIsWithdrawing(true);
    setTimeout(() => {
      setIsWithdrawing(false);
      setWithdrawMessage(`Payout of $${netTotal.toFixed(2)} transferred to your connected account!`);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-3">
            <DollarSign className="w-7 h-7 text-amber-600" />
            <h1 className="text-2xl font-extrabold text-slate-900">Royalty Ledger & Financials</h1>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Real-time automated clearinghouse payouts, settlement collections, and micro-licensing revenues.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleWithdrawPayout}
            disabled={isWithdrawing || netTotal === 0}
            className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-sm transition-all flex items-center space-x-2 disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${isWithdrawing ? 'animate-spin' : ''}`} />
            <span>{isWithdrawing ? 'Initiating Payout...' : `Withdraw $${netTotal.toFixed(2)} to Payout Account`}</span>
          </button>
        </div>
      </div>

      {withdrawMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-bold flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{withdrawMessage}</span>
          </div>
          <button onClick={() => setWithdrawMessage(null)} className="text-emerald-800 hover:text-emerald-950">✕</button>
        </div>
      )}

      {/* Web3 Polygon L2 Wallet Connection */}
      <Web3WalletConnect />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-mono">Gross Recovered</span>
          <div className="text-3xl font-black text-slate-900 font-mono mt-2">${grossTotal.toFixed(2)}</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-mono">Net Creator Payout</span>
          <div className="text-3xl font-black text-amber-600 font-mono mt-2">${netTotal.toFixed(2)}</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-mono">Platform Clearing Fee (15%)</span>
          <div className="text-3xl font-black text-slate-500 font-mono mt-2">${platformFeesTotal.toFixed(2)}</div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <h3 className="text-base font-bold text-slate-900">Ledger History</h3>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:border-amber-400 focus:outline-none"
          >
            <option value="all">All Revenues</option>
            <option value="settlement_fee">Settlement Fees</option>
            <option value="micro_license">AI Micro-Licenses</option>
            <option value="ad_revenue_claim">Ad Revenue Claims</option>
          </select>
        </div>

        <div className="space-y-3">
          {filteredTransactions.map((txn) => (
            <div key={txn.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-900">{txn.source}</span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-amber-100 text-amber-900 border border-amber-300">
                    {txn.type.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono mt-1">
                  {new Date(txn.date).toLocaleDateString()} • Txn ID: {txn.id}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-sm font-black text-amber-700 font-mono block">+${txn.netPayout.toFixed(2)}</span>
                <span className="text-[10px] text-slate-400 font-mono">Gross: ${txn.grossAmount.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
