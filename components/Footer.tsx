'use client'

import { useState, useEffect } from 'react'

const C = { espresso: '#17110D', bronze: '#4A2C1D', gold: '#C6A15B', champagne: '#E8C982', ivory: '#EDE2D0', muted: '#B8AA98', obsidian: '#030303' }
const serif = "'Cormorant Garamond', Georgia, serif"
const sans = "'Manrope', system-ui, sans-serif"

const NAV_LINKS = ['Home', 'Portfolio', 'Weddings', 'Films', 'About', 'Journal', 'Contact', 'Privacy Policy']
const HREFS = ['#home', '#portfolio', '#services', '#films', '#about', '#journal', '#enquiry', '/privacy/']

const SOCIALS = [
    {
        label: 'Instagram', href: 'https://www.instagram.com/shahscenes',
        icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>,
    },
    {
        label: 'Pinterest', href: 'https://www.pinterest.com/shahscenes',
        icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" /></svg>,
    },
    {
        label: 'YouTube', href: 'https://www.youtube.com/@shahscenes',
        icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>,
    },
]

function go(href: string) {
    if (href.startsWith('#')) {
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
}

export default function Footer() {
    const [year, setYear] = useState(2026)

    useEffect(() => {
        setYear(new Date().getFullYear())
    }, [])

    return (
        <footer style={{ background: C.espresso, paddingTop: 72, paddingBottom: 28, position: 'relative' }}>
            {/* Top separator */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(232,201,130,0.35), transparent)' }} />

            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
                {/* Main grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 48, marginBottom: 56 }}>

                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                            <img
                                src="/logo.webp"
                                alt="Shah Scenes Emblem"
                                width={54}
                                height={54}
                                style={{
                                    width: 54,
                                    height: 54,
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '1px solid rgba(198,161,91,0.5)',
                                    boxShadow: '0 4px 14px rgba(0,0,0,0.6)',
                                    flexShrink: 0,
                                }}
                            />
                            <div>
                                <span style={{ fontFamily: serif, fontSize: '1.45rem', letterSpacing: '0.2em', color: C.ivory, display: 'block', lineHeight: 1.1 }}>
                                    SHAH SCENES
                                </span>
                                <span style={{ fontFamily: sans, fontSize: '0.42rem', letterSpacing: '0.34em', textTransform: 'uppercase', color: C.gold, display: 'block', marginTop: 4 }}>
                                    Photography &amp; Films
                                </span>
                            </div>
                        </div>
                        <p style={{ fontFamily: serif, fontSize: '0.95rem', fontStyle: 'italic', color: C.muted, marginBottom: 24, maxWidth: 260, lineHeight: 1.7 }}>
                            &ldquo;Photographs that bring you back.&rdquo;
                        </p>
                        <div style={{ display: 'flex', gap: 18 }}>
                            {SOCIALS.map(s => (
                                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                                    aria-label={`Shah Scenes on ${s.label}`}
                                    style={{ color: C.muted, textDecoration: 'none', transition: 'color 0.3s' }}
                                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = C.gold}
                                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = C.muted}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <span style={{ fontFamily: sans, fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: C.gold, display: 'block', marginBottom: 20 }}>Navigation</span>
                        <nav aria-label="Footer navigation">
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {NAV_LINKS.map((label, i) => (
                                    <li key={label}>
                                        <a href={HREFS[i]}
                                            onClick={e => {
                                                if (HREFS[i].startsWith('#')) {
                                                    e.preventDefault()
                                                    go(HREFS[i])
                                                }
                                            }}
                                            style={{ fontFamily: sans, fontSize: '0.72rem', color: C.muted, textDecoration: 'none', letterSpacing: '0.06em', transition: 'color 0.3s' }}
                                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = C.gold}
                                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = C.muted}
                                        >
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Contact placeholder */}
                    <div>
                        <span style={{ fontFamily: sans, fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: C.gold, display: 'block', marginBottom: 20 }}>Get In Touch</span>
                        <p style={{ fontFamily: sans, fontSize: '0.75rem', color: C.muted, lineHeight: 1.85, marginBottom: 18 }}>
                            Available for weddings across India and international destinations.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
                            <a href="tel:+918146486537" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: sans, fontSize: '0.74rem', color: C.ivory, textDecoration: 'none', transition: 'color 0.3s' }}
                                onMouseEnter={e => (e.currentTarget.style.color = C.champagne)}
                                onMouseLeave={e => (e.currentTarget.style.color = C.ivory)}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                +91 81464 86537
                            </a>
                            <a href="https://wa.me/918146486537?text=Hello%20Shah%20Scenes%2C%20I%20would%20like%20to%20enquire%20about%20wedding%20photography%20services" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: sans, fontSize: '0.74rem', color: C.ivory, textDecoration: 'none', transition: 'color 0.3s' }}
                                onMouseEnter={e => (e.currentTarget.style.color = '#25D366')}
                                onMouseLeave={e => (e.currentTarget.style.color = C.ivory)}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.15c-.24.68-1.4 1.24-1.93 1.32-.49.07-1.11.1-1.79-.12-.41-.13-.94-.3-1.63-.6-2.87-1.24-4.73-4.14-4.87-4.33-.14-.19-1.17-1.55-1.17-2.96 0-1.41.74-2.1 1-2.38.26-.29.58-.36.77-.36.2 0 .39.01.56.01.18.01.41-.07.64.48.24.58.82 2 .89 2.15.07.15.12.33.02.53-.1.19-.15.31-.29.48-.15.17-.31.37-.44.5-.15.14-.3.3-.13.59.17.3.76 1.25 1.63 2.02 1.12.99 2.07 1.3 2.36 1.44.29.15.46.13.63-.07.17-.2.74-.86.94-1.15.2-.29.39-.24.66-.14.27.1.1.72 1.73.96.24.12.4.18.46.28.06.1.06.58-.18 1.26z"/></svg>
                                WhatsApp Concierge
                            </a>
                        </div>
                        <a href="#enquiry" onClick={e => { e.preventDefault(); go('#enquiry') }}
                            style={{
                                display: 'inline-block', fontFamily: sans,
                                fontSize: '0.6rem', letterSpacing: '0.2em',
                                textTransform: 'uppercase', color: C.obsidian,
                                background: C.gold, padding: '11px 22px',
                                textDecoration: 'none', transition: 'background 0.3s',
                            }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.champagne}
                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.gold}
                        >
                            BEGIN ENQUIRY
                        </a>
                    </div>

                </div>

                {/* Bottom bar */}
                <div style={{ borderTop: `1px solid ${C.bronze}40`, paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 }}>
                    <p style={{ fontFamily: sans, fontSize: '0.52rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: C.bronze }}>
                        © {year} SHAH SCENES. ALL RIGHTS RESERVED.
                    </p>
                    <p style={{ fontFamily: sans, fontSize: '0.52rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: C.bronze }}>
                        Luxury Wedding Photography &amp; Cinematic Films
                    </p>
                </div>
            </div>
        </footer>
    )
}
