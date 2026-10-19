'use client'

import { useState } from 'react'

export default function FloatingContact() {
    const [hovered, setHovered] = useState<'wa' | 'call' | null>(null)

    return (
        <aside
            aria-label="Quick Contact Concierge"
            style={{
                position: 'fixed',
                bottom: 28,
                right: 28,
                zIndex: 99,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                alignItems: 'flex-end',
            }}
        >
            {/* Call Studio Floating Button */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                {hovered === 'call' && (
                    <div
                        style={{
                            position: 'absolute',
                            right: 58,
                            background: 'rgba(23, 17, 13, 0.95)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid #C6A15B',
                            color: '#EDE2D0',
                            padding: '6px 12px',
                            borderRadius: 4,
                            fontFamily: "'Manrope', sans-serif",
                            fontSize: '0.62rem',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                            pointerEvents: 'none',
                        }}
                    >
                        Call Studio: +91 81464 86537
                    </div>
                )}
                <a
                    href="tel:+918146486537"
                    aria-label="Call Shah Scenes Studio"
                    onMouseEnter={() => setHovered('call')}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #261B14, #17110D)',
                        border: '1px solid rgba(198, 161, 91, 0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#C6A15B',
                        textDecoration: 'none',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                        transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                        transform: hovered === 'call' ? 'scale(1.1)' : 'scale(1)',
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                </a>
            </div>

            {/* WhatsApp Floating Button */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                {hovered === 'wa' && (
                    <div
                        style={{
                            position: 'absolute',
                            right: 58,
                            background: 'rgba(23, 17, 13, 0.95)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid #25D366',
                            color: '#EDE2D0',
                            padding: '6px 12px',
                            borderRadius: 4,
                            fontFamily: "'Manrope', sans-serif",
                            fontSize: '0.62rem',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                            pointerEvents: 'none',
                        }}
                    >
                        Chat on WhatsApp Live
                    </div>
                )}
                <a
                    href="https://wa.me/918146486537?text=Hello%20Shah%20Scenes%2C%20I%20would%20like%20to%20enquire%20about%20wedding%20photography%20services"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Direct WhatsApp Concierge"
                    onMouseEnter={() => setHovered('wa')}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #128C7E, #25D366)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)',
                        transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                        transform: hovered === 'wa' ? 'scale(1.1)' : 'scale(1)',
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.15c-.24.68-1.4 1.24-1.93 1.32-.49.07-1.11.1-1.79-.12-.41-.13-.94-.3-1.63-.6-2.87-1.24-4.73-4.14-4.87-4.33-.14-.19-1.17-1.55-1.17-2.96 0-1.41.74-2.1 1-2.38.26-.29.58-.36.77-.36.2 0 .39.01.56.01.18.01.41-.07.64.48.24.58.82 2 .89 2.15.07.15.12.33.02.53-.1.19-.15.31-.29.48-.15.17-.31.37-.44.5-.15.14-.3.3-.13.59.17.3.76 1.25 1.63 2.02 1.12.99 2.07 1.3 2.36 1.44.29.15.46.13.63-.07.17-.2.74-.86.94-1.15.2-.29.39-.24.66-.14.27.1.1.72 1.73.96.24.12.4.18.46.28.06.1.06.58-.18 1.26z" />
                    </svg>
                </a>
            </div>
        </aside>
    )
}
