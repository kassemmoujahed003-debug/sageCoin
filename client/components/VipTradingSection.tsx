'use client'

import { useLanguage } from '@/contexts/LanguageContext'

interface VipTradingSectionProps {
  joinedVip: boolean
}

// (Trade interface and activeTrades data placeholder - same as before)
interface Trade {
  id: string
  symbol: string
  type: 'BUY' | 'SELL'
  entryPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
  status: 'OPEN' | 'CLOSED'
  timestamp: string
}

const activeTrades: Trade[] = [
    { id: '1', symbol: 'EUR/USD', type: 'BUY', entryPrice: 1.0850, currentPrice: 1.0920, pnl: 70, pnlPercent: 0.65, status: 'OPEN', timestamp: '2024-01-15 10:30' },
    { id: '2', symbol: 'GBP/USD', type: 'SELL', entryPrice: 1.2650, currentPrice: 1.2580, pnl: 70, pnlPercent: 0.55, status: 'OPEN', timestamp: '2024-01-15 11:15' },
    { id: '3', symbol: 'USD/JPY', type: 'BUY', entryPrice: 149.50, currentPrice: 150.20, pnl: 70, pnlPercent: 0.47, status: 'OPEN', timestamp: '2024-01-15 14:20' },
]

export default function VipTradingSection({ joinedVip }: VipTradingSectionProps) {
  const { t, isRTL } = useLanguage()

  // VIP LOGGED IN VIEW (Table) - Unchanged
  if (joinedVip) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
         {/* ... (Same Table Code as before) ... */}
         <div className="flex items-center gap-4 mb-8">
            <div className="w-3 h-3 bg-accent rotate-45 shadow-[0_0_10px_rgba(var(--accent-rgb),0.8)]"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-base-white">
                {t('vip.activeTrades')}
            </h2>
        </div>
        <div className="bg-secondary-surface border border-accent rounded-2xl overflow-hidden shadow-xl">
           <div className="grid grid-cols-7 gap-4 p-5 bg-primary-dark border-b border-accent text-sm font-semibold text-base-white tracking-wide">
            <div>{t('vip.symbol')}</div>
            <div>{t('vip.type')}</div>
            <div>{t('vip.entryPrice')}</div>
            <div>{t('vip.currentPrice')}</div>
            <div>{t('vip.pnl')}</div>
            <div>{t('vip.pnlPercent')}</div>
            <div>{t('vip.time')}</div>
          </div>
          <div className="divide-y divide-accent/20">
            {activeTrades.map((trade) => (
              <div key={trade.id} className="grid grid-cols-7 gap-4 p-5 hover:bg-primary-dark/50 transition-colors items-center">
                <div className="text-base-white font-medium flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent/50 rotate-45"></div>
                    {trade.symbol}
                </div>
                <div><span className={`px-3 py-1 rounded-sm text-xs font-bold tracking-wider ${trade.type === 'BUY' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>{trade.type === 'BUY' ? t('vip.buy') : t('vip.sell')}</span></div>
                <div className="text-accent/80 font-mono">{trade.entryPrice}</div>
                <div className="text-base-white font-mono">{trade.currentPrice}</div>
                <div className={`font-bold font-mono ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>${trade.pnl.toFixed(2)}</div>
                <div className={`font-bold font-mono ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>{trade.pnlPercent > 0 ? '+' : ''}{trade.pnlPercent.toFixed(2)}%</div>
                <div className="text-accent/60 text-sm">{trade.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // =========================================
  // NON-VIP VIEW (The 3-Diamond Logo Structure)
  // =========================================
  return (
    <section className="relative w-full overflow-visible py-24 lg:py-32">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[80px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* MAIN CONTAINER - Two Column Layout */}
        <div className={`flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* LEFT SIDE - 3 Diamonds (Right side in RTL) */}
          <div className="flex-1 flex flex-col items-center justify-center">

            {/* ========================================================
                1. THE TOP BIG DIAMOND (VIP Access CTA)
                
                SIZE CHANGE: Reduced from w-[30rem] to w-[22rem] (approx 25% smaller).
                ROTATION LOGIC:
                - Outer div: `rotate-45` creates the diamond shape.
                - Inner Content div: `-rotate-45` cancels the rotation for text.
            ======================================================== */}
            <div className="relative group w-[18rem] h-[18rem] lg:w-[22rem] lg:h-[22rem] z-20">
               
               {/* DIAMOND SHAPE (Rotated 45deg) */}
               <div className="absolute inset-0 rotate-45 bg-gradient-to-br from-secondary-surface via-primary-dark to-primary-dark border-2 border-accent rounded-[2.5rem] shadow-[0_0_50px_-10px_rgba(var(--accent-rgb),0.4)] transition-transform duration-500 hover:scale-[1.02] overflow-hidden">
                  {/* Inner Glow Ring */}
                  <div className="absolute inset-3 border border-accent/20 rounded-[2rem] pointer-events-none"></div>
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
               </div>

               {/* CONTENT CONTAINER (Counter-Rotated -45deg to be straight) 
                   We apply h-full w-full flex items-center justify-center 
                   ABOVE the rotation to ensure centering works before rotating back.
               */}
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex flex-col items-center justify-center text-center p-8 pointer-events-auto">
                      <h2 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-accent to-white animate-text-shine mb-3 drop-shadow-md">
                      VIP ACCESS
                      </h2>
                      <p className="text-sm md:text-base text-accent/90 mb-6 max-w-[180px] leading-relaxed font-medium">
                      {t('vip.unlockTitle')}
                      </p>
                  </div>
               </div>
            </div>


            {/* ========================================================
                2. THE BOTTOM ROW CONTAINER (Two Small Diamonds)
                
                SIZE CHANGE: Reduced from w-80 to w-60 (approx 25% smaller).
                MARGIN CHANGE: Adjusted negative margin (-mt-12 lg:-mt-20) to fit tighter.
            ======================================================== */}
            <div className="flex flex-col md:flex-row gap-12 lg:gap-24 -mt-12 lg:-mt-20 z-10">

            {/* === SMALL DIAMOND LEFT (Live Signals) === */}
            <div className="relative group w-56 h-56 lg:w-60 lg:h-60">
                
                {/* DIAMOND SHAPE (Rotated 45deg) */}
                <div className="absolute inset-0 rotate-45 bg-secondary-surface/90 border border-accent/30 rounded-[2rem] shadow-[0_0_20px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-500 group-hover:bg-secondary-surface group-hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.2)] group-hover:scale-105"></div>
                
                {/* CONTENT (Counter-Rotated) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="flex flex-col items-center justify-center text-center p-6 pointer-events-auto">
                        <div className="w-10 h-10 mb-3 bg-accent/10 rounded-full flex items-center justify-center text-accent ring-1 ring-accent/20">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-base-white mb-2">{t('vip.liveSignals')}</h3>
                        <p className="text-xs text-accent/80 leading-relaxed max-w-[130px]">
                            {t('vip.realTimeSignals')}
                        </p>
                    </div>
                </div>
            </div>

            {/* === SMALL DIAMOND RIGHT (Expert Analysis) === */}
            <div className="relative group w-56 h-56 lg:w-60 lg:h-60">
                
                {/* DIAMOND SHAPE (Rotated 45deg) */}
                <div className="absolute inset-0 rotate-45 bg-secondary-surface/90 border border-accent/30 rounded-[2rem] shadow-[0_0_20px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-500 group-hover:bg-secondary-surface group-hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.2)] group-hover:scale-105"></div>
                
                {/* CONTENT (Counter-Rotated) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="flex flex-col items-center justify-center text-center p-6 pointer-events-auto">
                        <div className="w-10 h-10 mb-3 bg-accent/10 rounded-full flex items-center justify-center text-accent ring-1 ring-accent/20">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-8a8 8 0 100 16 8 8 0 000-16z" clipRule="evenodd" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-base-white mb-2">{t('vip.expertAnalysis')}</h3>
                        <p className="text-xs text-accent/80 leading-relaxed max-w-[130px]">
                            {t('vip.dailyInsights')}
                        </p>
                    </div>
                </div>
            </div>

            </div>

          </div>

          {/* RIGHT SIDE - Text Content (Left side in RTL) */}
          <div className="flex-1 flex flex-col justify-center space-y-6 lg:max-w-lg">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-accent rotate-45 shadow-[0_0_10px_rgba(var(--accent-rgb),0.8)]"></div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-white">
                {t('vip.title')}
              </h2>
            </div>
            <p className="text-lg md:text-xl text-accent/90 leading-relaxed">
              {t('vip.unlockDescription')}
            </p>
            <button className="btn-primary text-base font-bold px-8 py-3 shadow-lg hover:shadow-accent/50 transition-all rounded-xl self-start">
              {t('vip.subscribe')}
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}