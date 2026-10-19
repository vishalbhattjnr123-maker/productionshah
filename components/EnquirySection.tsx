'use client'

import { useState } from 'react'
import { useFadeUp, fadeStyle } from '@/hooks/useFadeUp'

const C = { espresso: '#17110D', bronze: '#4A2C1D', gold: '#C6A15B', champagne: '#E8C982', ivory: '#EDE2D0', muted: '#B8AA98', obsidian: '#030303' }
const serif = "'Cormorant Garamond', Georgia, serif"
const sans = "'Manrope', system-ui, sans-serif"

const SERVICES = ['Wedding Photography', 'Fine Art Couple Portraits', 'Cinematic Wedding Film', 'Destination Wedding', 'Bridal Portraits', 'Engagement Photography', 'Multiple Services']

type State = 'idle' | 'sending' | 'success' | 'error'

const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: `1px solid ${C.bronze}`,
    color: C.ivory,
    fontFamily: sans,
    fontSize: '0.86rem',
    padding: '12px 0',
    outline: 'none',
    borderRadius: 0,
    WebkitAppearance: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
}
const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: sans,
    fontSize: '0.58rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: C.muted,
    marginBottom: 6,
}

function Field({ id, label, type = 'text', required = false, placeholder = '' }: { id: string; label: string; type?: string; required?: boolean; placeholder?: string }) {
    return (
        <div>
            <label htmlFor={id} style={labelStyle}>{label}{required && ' *'}</label>
            <input
                id={id} name={id} type={type} required={required}
                placeholder={placeholder}
                autoComplete="off"
                style={inputStyle}
                onFocus={e => {
                    e.currentTarget.style.borderBottomColor = C.gold
                    e.currentTarget.style.boxShadow = `0 1px 0 0 ${C.gold}`
                }}
                onBlur={e => {
                    e.currentTarget.style.borderBottomColor = C.bronze
                    e.currentTarget.style.boxShadow = 'none'
                }}
            />
        </div>
    )
}

export default function EnquirySection() {
    const { ref, visible } = useFadeUp()
    const [state, setState] = useState<State>('idle')
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        const get = (k: string) => (fd.get(k) as string || '').trim()
        const errs: Record<string, string> = {}
        if (!get('name')) errs.name = 'Name is required.'
        if (!get('email') || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get('email'))) errs.email = 'Valid email required.'
        if (!get('phone')) errs.phone = 'Phone is required.'
        if (!get('service')) errs.service = 'Please select a service.'
        if (Object.keys(errs).length) { setErrors(errs); return }
        setErrors({}); setState('sending')
        // ── Wire to your backend / Formspree / EmailJS before launch ──
        await new Promise(r => setTimeout(r, 1200))
        setState('success')
    }

    return (
        <section id="enquiry" ref={ref} style={{ background: C.espresso, padding: '100px 0', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #4A2C1D, transparent)' }} />

            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 72 }}>

                {/* Intro */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ ...fadeStyle(visible, 0), marginBottom: 12 }}>
                        <span style={{ fontFamily: sans, fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.gold }}>
                            Commission Your Celebration
                        </span>
                    </div>
                    <h2 style={{ ...fadeStyle(visible, 0.08), fontFamily: serif, fontWeight: 300, fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', color: C.ivory, lineHeight: 1.12, marginBottom: 24 }}>
                        Let&apos;s craft<br /><em style={{ color: C.gold, fontStyle: 'italic' }}>your legacy together.</em>
                    </h2>
                    <div style={{ ...fadeStyle(visible, 0.14), width: 56, height: 1, background: `linear-gradient(90deg, ${C.gold}, ${C.champagne})`, marginBottom: 24 }} />
                    <p style={{ ...fadeStyle(visible, 0.18), fontFamily: sans, fontSize: '0.84rem', color: C.muted, lineHeight: 1.85, maxWidth: 440, marginBottom: 32 }}>
                        Every royal love story deserves an unhurried, bespoke visual legacy. Share your vision, ceremonies, and destination with us — we would be honored to document your union.
                    </p>
                    <div style={{ ...fadeStyle(visible, 0.22) }}>
                        <p style={{ fontFamily: sans, fontSize: '0.62rem', color: C.champagne, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>
                            Prefer instant conversation?
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                            {/* WhatsApp Button */}
                            <a
                                href="https://wa.me/918146486537?text=Hello%20Shah%20Scenes%2C%20I%20would%20like%20to%20enquire%20about%20wedding%20photography%20services"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 10,
                                    fontFamily: sans, fontSize: '0.62rem', letterSpacing: '0.18em',
                                    textTransform: 'uppercase', color: C.ivory, textDecoration: 'none',
                                    border: `1px solid ${C.gold}90`, padding: '13px 22px',
                                    background: 'rgba(198,161,91,0.08)',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = '#25D366'
                                    e.currentTarget.style.background = 'rgba(37,211,102,0.12)'
                                    e.currentTarget.style.color = '#25D366'
                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,211,102,0.2)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = `${C.gold}90`
                                    e.currentTarget.style.background = 'rgba(198,161,91,0.08)'
                                    e.currentTarget.style.color = C.ivory
                                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)'
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.15c-.24.68-1.4 1.24-1.93 1.32-.49.07-1.11.1-1.79-.12-.41-.13-.94-.3-1.63-.6-2.87-1.24-4.73-4.14-4.87-4.33-.14-.19-1.17-1.55-1.17-2.96 0-1.41.74-2.1 1-2.38.26-.29.58-.36.77-.36.2 0 .39.01.56.01.18.01.41-.07.64.48.24.58.82 2 .89 2.15.07.15.12.33.02.53-.1.19-.15.31-.29.48-.15.17-.31.37-.44.5-.15.14-.3.3-.13.59.17.3.76 1.25 1.63 2.02 1.12.99 2.07 1.3 2.36 1.44.29.15.46.13.63-.07.17-.2.74-.86.94-1.15.2-.29.39-.24.66-.14.27.1.1.72 1.73.96.24.12.4.18.46.28.06.1.06.58-.18 1.26z" />
                                </svg>
                                <span>WhatsApp Concierge</span>
                            </a>

                            {/* Direct Call Button */}
                            <a
                                href="tel:+918146486537"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 10,
                                    fontFamily: sans, fontSize: '0.62rem', letterSpacing: '0.18em',
                                    textTransform: 'uppercase', color: C.ivory, textDecoration: 'none',
                                    border: `1px solid ${C.bronze}`, padding: '13px 22px',
                                    background: 'rgba(74,44,29,0.22)',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = C.gold
                                    e.currentTarget.style.background = 'rgba(198,161,91,0.15)'
                                    e.currentTarget.style.color = C.champagne
                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(198,161,91,0.25)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = C.bronze
                                    e.currentTarget.style.background = 'rgba(74,44,29,0.22)'
                                    e.currentTarget.style.color = C.ivory
                                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)'
                                }}
                            >
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <span>Call: +91 81464 86537</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div style={{ ...fadeStyle(visible, 0.16) }}>
                    {state === 'success' ? (
                        <div style={{ paddingTop: 48 }}>
                            <div style={{ width: 56, height: 1, background: `linear-gradient(90deg, ${C.gold}, ${C.champagne})`, marginBottom: 28 }} />
                            <h3 style={{ fontFamily: serif, fontWeight: 300, fontSize: '2.2rem', color: C.ivory, marginBottom: 16 }}>Thank you.</h3>
                            <p style={{ fontFamily: sans, fontSize: '0.8rem', color: C.muted, lineHeight: 1.85, maxWidth: 380, marginBottom: 28 }}>
                                Your enquiry has been received. We&apos;ll be in touch within 24–48 hours to discuss your celebration.
                            </p>
                            <button onClick={() => setState('idle')}
                                style={{ fontFamily: sans, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7 }}
                                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = C.champagne}
                                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = C.gold}
                            >
                                SEND ANOTHER ENQUIRY →
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                <div>
                                    <Field id="name" label="Full Name" required placeholder="Your name" />
                                    {errors.name && <p style={{ color: '#f87171', fontSize: '0.6rem', marginTop: 4 }}>{errors.name}</p>}
                                </div>
                                <div>
                                    <Field id="email" label="Email Address" type="email" required placeholder="hello@you.com" />
                                    {errors.email && <p style={{ color: '#f87171', fontSize: '0.6rem', marginTop: 4 }}>{errors.email}</p>}
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                <div>
                                    <Field id="phone" label="Phone Number" type="tel" required placeholder="+91 81464 86537" />
                                    {errors.phone && <p style={{ color: '#f87171', fontSize: '0.6rem', marginTop: 4 }}>{errors.phone}</p>}
                                </div>
                                <Field id="weddingDate" label="Wedding Date" type="date" />
                            </div>
                            <Field id="location" label="Wedding Location" placeholder="City, Venue or Country" />
                            <div>
                                <label htmlFor="service" style={labelStyle}>Photography Service *</label>
                                <select id="service" name="service" required
                                    style={{
                                        ...inputStyle,
                                        cursor: 'pointer',
                                        background: `${C.espresso} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='none' stroke='%23C6A15B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' d='M1 1.5l5 5 5-5'/%3E%3C/svg%3E") no-repeat right 8px center`,
                                        backgroundSize: '12px 8px',
                                        paddingRight: 28,
                                    }}
                                    onFocus={e => {
                                        e.currentTarget.style.borderBottomColor = C.gold
                                        e.currentTarget.style.boxShadow = `0 1px 0 0 ${C.gold}`
                                    }}
                                    onBlur={e => {
                                        e.currentTarget.style.borderBottomColor = C.bronze
                                        e.currentTarget.style.boxShadow = 'none'
                                    }}
                                >
                                    <option value="" style={{ background: '#17110D', color: '#B8AA98' }}>Select a service…</option>
                                    {SERVICES.map(s => <option key={s} value={s} style={{ background: '#17110D', color: '#EDE2D0' }}>{s}</option>)}
                                </select>
                                {errors.service && <p style={{ color: '#f87171', fontSize: '0.6rem', marginTop: 4 }}>{errors.service}</p>}
                            </div>
                            <Field id="budget" label="Estimated Budget" placeholder="e.g. ₹1,50,000 – ₹3,00,000" />
                            <div>
                                <label htmlFor="message" style={labelStyle}>Tell Us About Your Plans</label>
                                <textarea id="message" name="message" rows={4}
                                    placeholder="Share what matters most to you…"
                                    style={{ ...inputStyle, resize: 'none' }}
                                    onFocus={e => {
                                        e.currentTarget.style.borderBottomColor = C.gold
                                        e.currentTarget.style.boxShadow = `0 1px 0 0 ${C.gold}`
                                    }}
                                    onBlur={e => {
                                        e.currentTarget.style.borderBottomColor = C.bronze
                                        e.currentTarget.style.boxShadow = 'none'
                                    }}
                                />
                            </div>
                            {/* Honeypot */}
                            <input type="text" name="_hp" aria-hidden="true" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                            <button type="submit" disabled={state === 'sending'}
                                style={{
                                    fontFamily: sans, fontSize: '0.64rem', letterSpacing: '0.2em',
                                    textTransform: 'uppercase', color: '#030303',
                                    background: C.gold, padding: '15px 32px',
                                    border: 'none', cursor: state === 'sending' ? 'wait' : 'pointer',
                                    opacity: state === 'sending' ? 0.65 : 1,
                                    transition: 'background 0.3s', alignSelf: 'flex-start',
                                }}
                                onMouseEnter={e => { if (state !== 'sending') (e.currentTarget as HTMLElement).style.background = C.champagne }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = C.gold }}
                            >
                                {state === 'sending' ? 'SENDING…' : 'BEGIN YOUR ENQUIRY'}
                            </button>

                            {state === 'error' && <p style={{ color: '#f87171', fontSize: '0.72rem' }}>Something went wrong. Please try again or reach us on WhatsApp.</p>}
                        </form>
                    )}
                </div>

            </div>

            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #4A2C1D, transparent)' }} />
        </section>
    )
}
