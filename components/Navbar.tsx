'use client'

import { useState, useEffect } from 'react'

const NAV = [
    { label: 'Home', href: '#home' },
    { label: 'Founder', href: '#founder' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Weddings', href: '#services' },
    { label: 'Films', href: '#films' },
    { label: 'Cinema', href: '#cinema' },
    { label: 'About', href: '#about' },
    { label: 'Journal', href: '#journal' },
]

function go(href: string) {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', fn, { passive: true })
        return () => window.removeEventListener('scroll', fn)
    }, [])

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [open])

    return (
        <>
            {/* ─── Main Bar ─── */}
            <nav
                style={{
                    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
                    padding: scrolled ? '12px 0' : '18px 0',
                    background: scrolled ? 'rgba(10,7,5,0.96)' : 'rgba(8,6,5,0.78)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderBottom: scrolled ? '1px solid rgba(198,161,91,0.28)' : '1px solid rgba(198,161,91,0.15)',
                    boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.6)' : '0 4px 20px rgba(0,0,0,0.3)',
                    transition: 'all 0.35s ease',
                }}
            >
                <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

                    {/* Brand */}
                    <a
                        href="#home"
                        onClick={e => { e.preventDefault(); go('#home') }}
                        style={{
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 14,
                            flexShrink: 0,
                        }}
                    >
                        <img
                            src="/logo.webp"
                            alt="Shah Scenes Emblem"
                            width={44}
                            height={44}
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '1px solid rgba(198,161,91,0.55)',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.6)',
                                display: 'block',
                                flexShrink: 0,
                            }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontSize: '1.45rem',
                                letterSpacing: '0.18em',
                                color: '#EDE2D0',
                                display: 'block',
                                lineHeight: 1.05,
                                fontWeight: 500,
                            }}>
                                SHAH SCENES
                            </span>
                            <span style={{
                                fontFamily: "'Manrope', sans-serif",
                                fontSize: '0.44rem',
                                letterSpacing: '0.34em',
                                textTransform: 'uppercase',
                                color: '#C6A15B',
                                display: 'block',
                                marginTop: 4,
                                fontWeight: 500,
                            }}>
                                Photography &amp; Films
                            </span>
                        </div>
                    </a>

                    {/* Desktop nav */}
                    <ul
                        style={{
                            display: 'flex',
                            gap: 'clamp(14px, 1.8vw, 30px)',
                            alignItems: 'center',
                            listStyle: 'none',
                            margin: 0,
                            padding: 0,
                        }}
                        className="hidden-mobile"
                    >
                        {NAV.map(n => (
                            <li key={n.label}>
                                <a href={n.href} onClick={e => { e.preventDefault(); go(n.href) }} className="nav-link">
                                    {n.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* CTA + hamburger */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexShrink: 0 }}>
                        <a
                            href="#enquiry"
                            onClick={e => { e.preventDefault(); go('#enquiry') }}
                            className="hidden-mobile"
                            style={{
                                fontFamily: "'Manrope', sans-serif",
                                fontSize: '0.62rem',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: '#030303',
                                background: '#C6A15B',
                                padding: '10px 22px',
                                border: '1px solid #C6A15B',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                textDecoration: 'none',
                                fontWeight: 600,
                                whiteSpace: 'nowrap',
                            }}
                            onMouseEnter={e => {
                                const el = e.currentTarget as HTMLElement
                                el.style.background = '#E8C982'
                                el.style.borderColor = '#E8C982'
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget as HTMLElement
                                el.style.background = '#C6A15B'
                                el.style.borderColor = '#C6A15B'
                            }}
                        >
                            LET&apos;S CONNECT
                        </a>

                        {/* Hamburger */}
                        <button
                            onClick={() => setOpen(p => !p)}
                            aria-label={open ? 'Close menu' : 'Open menu'}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}
                            className="show-mobile"
                        >
                            <span style={{ display: 'block', width: 24, height: 1, background: '#EDE2D0', transition: 'all 0.3s', transform: open ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
                            <span style={{ display: 'block', width: 16, height: 1, background: '#C6A15B', transition: 'all 0.3s', opacity: open ? 0 : 1 }} />
                            <span style={{ display: 'block', width: 24, height: 1, background: '#EDE2D0', transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* ─── Mobile Menu ─── */}
            <div style={{
                position: 'fixed', inset: 0, zIndex: 40,
                background: '#030303',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                opacity: open ? 1 : 0,
                pointerEvents: open ? 'all' : 'none',
                transition: 'opacity 0.35s ease',
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #C6A15B, transparent)' }} />

                <div style={{
                    marginBottom: 28,
                    transform: open ? 'translateY(0)' : 'translateY(15px)',
                    opacity: open ? 1 : 0,
                    transition: 'all 0.4s ease',
                    textAlign: 'center',
                }}>
                    <img
                        src="/logo.webp"
                        alt="Shah Scenes Emblem"
                        width={68}
                        height={68}
                        style={{
                            width: 68,
                            height: 68,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '1px solid rgba(198,161,91,0.5)',
                            boxShadow: '0 4px 18px rgba(0,0,0,0.7)',
                            margin: '0 auto 10px',
                            display: 'block',
                        }}
                    />
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', letterSpacing: '0.22em', color: '#EDE2D0', display: 'block' }}>
                        SHAH SCENES
                    </span>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
                    {NAV.map((n, i) => (
                        <a
                            key={n.label}
                            href={n.href}
                            onClick={e => { e.preventDefault(); setOpen(false); setTimeout(() => go(n.href), 350) }}
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: '2.4rem', letterSpacing: '0.12em',
                                color: '#EDE2D0', textDecoration: 'none',
                                transform: open ? 'translateY(0)' : 'translateY(20px)',
                                opacity: open ? 1 : 0,
                                transition: `all 0.4s ease ${i * 0.07}s`,
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#C6A15B' }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#EDE2D0' }}
                        >
                            {n.label}
                        </a>
                    ))}
                </nav>

                <a
                    href="#enquiry"
                    onClick={e => { e.preventDefault(); setOpen(false); setTimeout(() => go('#enquiry'), 350) }}
                    style={{
                        marginTop: 48,
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: '0.65rem', letterSpacing: '0.2em',
                        textTransform: 'uppercase', color: '#030303',
                        background: '#C6A15B', padding: '14px 32px',
                        textDecoration: 'none',
                        opacity: open ? 1 : 0,
                        transition: 'opacity 0.4s ease 0.4s',
                    }}
                >
                    BEGIN YOUR ENQUIRY
                </a>
            </div>

            <style>{`
        @media (min-width: 768px) { .hidden-mobile { display: flex !important; } .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
      `}</style>
        </>
    )
}
