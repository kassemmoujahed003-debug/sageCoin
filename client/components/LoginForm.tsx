'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login attempt:', { email, password })
  }

  return (
    <div className="w-full max-w-md relative group">
        {/* === THE HUD BRACKETS (Corner Accents) === */}
        <div className="absolute -top-[2px] -left-[2px] w-8 h-8 border-t-2 border-l-2 border-accent z-20 opacity-70"></div>
        <div className="absolute -top-[2px] -right-[2px] w-8 h-8 border-t-2 border-r-2 border-accent z-20 opacity-70"></div>
        <div className="absolute -bottom-[2px] -left-[2px] w-8 h-8 border-b-2 border-l-2 border-accent z-20 opacity-70"></div>
        <div className="absolute -bottom-[2px] -right-[2px] w-8 h-8 border-b-2 border-r-2 border-accent z-20 opacity-70"></div>

      {/* Main Login Console Container */}
      <div className="relative bg-primary-dark border border-white/10 p-8 sm:p-10 text-center overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]">
        
        {/* Technical Grid Background Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
        
        {/* Ambient Blue Glow */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/10 blur-[80px] rounded-full pointer-events-none mix-blend-screen"></div>


        <div className="relative z-10">
            {/* WELCOMING HEADER */}
            <div className="mb-10 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-xs font-mono uppercase tracking-widest mb-2 rounded-full">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
                    Secure Terminal
                </div>
                <h1 className="text-3xl font-bold text-base-white leading-tight">
                Ready to Master the Markets?
                </h1>
                <p className="text-accent/80 text-sm leading-relaxed font-medium max-w-xs mx-auto">
                Log in to access institutional-grade insights and start your journey to financial success.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* Email Field */}
            <div>
                <label htmlFor="email" className="block text-accent text-xs font-mono uppercase tracking-wider mb-2">
                Email Address
                </label>
                <div className="relative">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-primary-dark/50 border border-white/10 text-base-white px-4 py-3 rounded focus:outline-none focus:border-accent transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] placeholder-white/30"
                        placeholder="Enter your email"
                        required
                    />
                    {/* Decorative corner ticks for inputs */}
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/50 pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-accent/50 pointer-events-none"></div>
                </div>
            </div>

            {/* Password Field */}
            <div>
                <label htmlFor="password" className="block text-accent text-xs font-mono uppercase tracking-wider mb-2">
                Password
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-primary-dark/50 border border-white/10 text-base-white px-4 py-3 rounded focus:outline-none focus:border-accent transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] placeholder-white/30 pr-12"
                        placeholder="Enter your password"
                        required
                    />
                    {/* Decorative corner ticks */}
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/50 pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-accent/50 pointer-events-none"></div>

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-accent/50 hover:text-accent focus:outline-none p-1 transition-colors"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                        ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Log In Button */}
            <button
                type="submit"
                className="btn-primary w-full py-3 text-lg font-bold tracking-wide relative overflow-hidden group/btn"
            >
                <span className="relative z-10">Initiate Session</span>
                <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-300 pointer-events-none"></div>
            </button>

            {/* Divider */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs font-mono uppercase">
                <span className="px-2 bg-primary-dark text-accent/60">Alternative Access</span>
                </div>
            </div>

            {/* Patreon Login Button - Restyled for Dark Theme */}
            <button
                type="button"
                className="w-full flex items-center justify-center space-x-2 py-3 bg-[#FF424D]/10 border border-[#FF424D]/30 text-[#FF424D] hover:bg-[#FF424D]/20 hover:text-white transition-colors rounded font-semibold"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M15.17 2.17c-3.87 0-7 3.13-7 7 0 3.87 3.13 7 7 7s7-3.13 7-7c0-3.87-3.13-7-7-7zm0 11.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z" />
                </svg>
                <span>Log in with Patreon</span>
            </button>

            {/* Forgot Password Link */}
            <div className="text-center mt-6">
                <Link
                href="/forgot-password"
                className="text-sm text-accent/70 hover:text-accent transition-colors duration-200 font-mono"
                >
                &gt; Reset Credentials
                </Link>
            </div>
            </form>
        </div>
      </div>
    </div>
  )
}