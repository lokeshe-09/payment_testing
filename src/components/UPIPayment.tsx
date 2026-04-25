import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  ShieldCheck, 
  Copy, 
  Check, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  QrCode,
  Info
} from 'lucide-react';

const UPI_ID = 'aicraftalchemy@upi';
const RECIPIENT_NAME = 'Alchemy AI Research';

interface PaymentApp {
  id: string;
  name: string;
  icon: string;
  color: string;
  scheme: string;
}

const PAYMENT_APPS: PaymentApp[] = [
  {
    id: 'gpay',
    name: 'Google Pay',
    icon: 'https://www.gstatic.com/images/branding/product/1x/gpay_512dp.png',
    color: 'bg-white',
    scheme: `googlepay://pay?pa=${UPI_ID}&pn=${RECIPIENT_NAME}&cu=INR`,
  },
  {
    id: 'phonepe',
    name: 'PhonePe',
    icon: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/phonepe-logo-icon.png',
    color: 'bg-white',
    scheme: `phonepe://pay?pa=${UPI_ID}&pn=${RECIPIENT_NAME}&cu=INR`,
  },
  {
    id: 'paytm',
    name: 'Paytm',
    icon: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/paytm-icon.png',
    color: 'bg-white',
    scheme: `paytmmp://pay?pa=${UPI_ID}&pn=${RECIPIENT_NAME}&cu=INR`,
  },
  {
    id: 'any',
    name: 'Any UPI App',
    icon: '', // Handled by icon component
    color: 'bg-blue-600',
    scheme: `upi://pay?pa=${UPI_ID}&pn=${RECIPIENT_NAME}&cu=INR`,
  }
];

export default function UPIPayment() {
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const genericUpiLink = `upi://pay?pa=${UPI_ID}&pn=${RECIPIENT_NAME}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(genericUpiLink)}`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4 md:p-8 font-sans selection:bg-indigo-100">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
      >
        {/* Header - Geometric Balance Dark Motif */}
        <header className="bg-slate-900 p-8 text-white flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest opacity-60 font-medium">Paying To</span>
            <h1 className="text-2xl font-bold tracking-tight mt-1">{RECIPIENT_NAME}</h1>
            <div className="flex items-center gap-2 text-sm opacity-60 mt-1">
              <span className="font-medium tracking-wide">Secure Transaction Enabled</span>
            </div>
          </div>
          <div className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
        </header>

        <div className="p-8 md:p-10 space-y-8">
          {/* Main Interface */}
          <div className="text-center space-y-1">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Secure Payment Transfer</span>
              <p className="text-sm text-slate-500 mt-1">Select your preferred payment method below</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {PAYMENT_APPS.map((app, index) => {
              if (app.id === 'any') return null;
              return (
                <motion.a
                  key={app.id}
                  href={app.scheme}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex flex-col items-center justify-center p-6 border-2 border-slate-100 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-white mb-3 shadow-inner p-2.5 transition-colors">
                    <img 
                      src={app.icon} 
                      alt={app.name} 
                      className="w-full h-full object-contain" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-700">{app.name}</span>
                </motion.a>
              );
            })}
            
            {/* Any UPI App / Universal Option */}
            <motion.a
              href={PAYMENT_APPS.find(a => a.id === 'any')?.scheme}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="col-span-2 md:col-span-1 flex flex-col items-center justify-center p-6 border-2 border-slate-100 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 group"
            >
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-white mb-3 shadow-inner transition-colors">
                <Smartphone className="w-6 h-6 text-slate-500 group-hover:text-indigo-500" />
              </div>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-700 uppercase tracking-tight">Any UPI App</span>
            </motion.a>

            <motion.button
              onClick={() => setShowQR(!showQR)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="col-span-2 md:col-span-1 flex flex-col items-center justify-center p-6 border-2 border-slate-100 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-white mb-3 shadow-inner transition-colors">
                <QrCode className="w-6 h-6 text-slate-500 group-hover:text-indigo-500" />
              </div>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-700 uppercase tracking-tight">
                {showQR ? 'Hide QR' : 'Show QR'}
              </span>
            </motion.button>
          </div>

          <AnimatePresence>
            {showQR && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col items-center gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-inner border border-slate-100">
                    <img 
                      src={qrCodeUrl} 
                      alt="Scan to pay" 
                      className="w-40 h-40 md:w-48 md:h-48 rounded"
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  <div className="text-center px-4">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Universal Scanner</p>
                    <p className="text-xs text-slate-500 mt-1">Scan using any UPI enabled app</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-4 text-center">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-4 font-bold">Trusted by Industry Leaders</p>
            <div className="flex justify-center items-center space-x-8 opacity-30 grayscale contrast-125">
              <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/upi-icon.png" alt="UPI" className="h-6 object-contain" referrerPolicy="no-referrer" />
              <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/visa-icon.png" alt="Visa" className="h-4 object-contain" referrerPolicy="no-referrer" />
              <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/mastercard-icon.png" alt="Mastercard" className="h-6 object-contain" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="bg-slate-50 py-4 px-8 border-t border-slate-100 flex justify-center items-center space-x-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-full border border-slate-200 shadow-sm">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">PCI-DSS Compliant</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-full border border-slate-200 shadow-sm">
            <ShieldCheck size={12} className="text-indigo-500" />
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">256-Bit SSL</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
