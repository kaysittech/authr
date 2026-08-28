import React, { useState } from 'react';
import { Wallet, CheckCircle, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';

interface Web3WalletConnectProps {
  onWalletConnected?: (walletAddress: string) => void;
}

export const Web3WalletConnect: React.FC<Web3WalletConnectProps> = ({ onWalletConnected }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(() => {
    return localStorage.getItem('rg_web3_wallet');
  });
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectWallet = (providerName: string) => {
    setIsConnecting(true);
    setTimeout(() => {
      // Generate realistic Web3 wallet address
      const dummyAddress = `0x71C7656EC7ab88b${Math.floor(Math.random() * 899999 + 100000)}B5f6d8976F`;
      setWalletAddress(dummyAddress);
      localStorage.setItem('rg_web3_wallet', dummyAddress);
      setIsConnecting(false);
      if (onWalletConnected) {
        onWalletConnected(dummyAddress);
      }
    }, 600);
  };

  const handleDisconnect = () => {
    setWalletAddress(null);
    localStorage.removeItem('rg_web3_wallet');
  };

  return (
    <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="text-sm font-extrabold text-white">Polygon L2 Web3 Wallet</h4>
              <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-widest bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full font-mono">
                Polygon POS
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Smart Contract Royalty Payouts & On-Chain Provenance Anchoring
            </p>
          </div>
        </div>

        {walletAddress && (
          <button
            onClick={handleDisconnect}
            className="text-[11px] font-bold text-slate-400 hover:text-rose-400 transition-colors font-mono"
          >
            Disconnect
          </button>
        )}
      </div>

      {walletAddress ? (
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-indigo-500/30 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Connected Creator Wallet</span>
              <span className="text-emerald-300 font-bold tracking-tight">
                {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
              </span>
            </div>
          </div>
          <a
            href={`https://polygonscan.com/address/${walletAddress}`}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center space-x-1 text-[11px]"
          >
            <span>Polygonscan</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
          <button
            onClick={() => handleConnectWallet('MetaMask')}
            disabled={isConnecting}
            className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-left transition-all group flex items-center space-x-2.5"
          >
            <span className="text-lg">🦊</span>
            <div>
              <span className="text-xs font-bold text-white block">MetaMask</span>
              <span className="text-[10px] text-slate-400 font-mono">1-Click Connect</span>
            </div>
          </button>

          <button
            onClick={() => handleConnectWallet('Coinbase Wallet')}
            disabled={isConnecting}
            className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-left transition-all group flex items-center space-x-2.5"
          >
            <span className="text-lg">🔵</span>
            <div>
              <span className="text-xs font-bold text-white block">Coinbase</span>
              <span className="text-[10px] text-slate-400 font-mono">Smart Wallet</span>
            </div>
          </button>

          <button
            onClick={() => handleConnectWallet('WalletConnect')}
            disabled={isConnecting}
            className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-left transition-all group flex items-center space-x-2.5 col-span-2 sm:col-span-1"
          >
            <span className="text-lg">⚡</span>
            <div>
              <span className="text-xs font-bold text-white block">WalletConnect</span>
              <span className="text-[10px] text-slate-400 font-mono">Mobile QR Scan</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
