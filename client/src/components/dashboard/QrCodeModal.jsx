import React, { useState } from 'react';
import Modal from '../common/Modal';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, ExternalLink, Smartphone } from 'lucide-react';

const QrCodeModal = ({ isOpen, onClose, site }) => {
  const [copied, setCopied] = useState(false);
  if (!site) return null;

  const publicUrl = `${window.location.origin}/site/${site.slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Mobile QR Code • ${site.siteName}`} maxWidth="max-w-md">
      <div className="flex flex-col items-center text-center space-y-5">
        <div className="p-4 bg-white rounded-2xl shadow-xl">
          <QRCodeSVG value={publicUrl} size={180} level="M" />
        </div>

        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-300 flex items-center justify-center gap-1.5">
            <Smartphone className="w-4 h-4 text-indigo-400" /> Scan with your phone camera
          </p>
          <p className="text-[11px] text-slate-500">
            Open the live website directly on any mobile device.
          </p>
        </div>

        {/* URL Pill */}
        <div className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <span className="text-indigo-300 font-mono truncate max-w-[240px]">
            {publicUrl}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors flex items-center gap-1 shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <a
          href={publicUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
        >
          Open Live Link in New Tab <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </Modal>
  );
};

export default QrCodeModal;
