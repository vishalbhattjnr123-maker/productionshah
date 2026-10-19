'use client'

import { useFadeUp, fadeStyle } from '@/hooks/useFadeUp'

const C = { espresso: '#17110D', bronze: '#4A2C1D', gold: '#C6A15B', champagne: '#E8C982', ivory: '#EDE2D0', muted: '#B8AA98' }
const serif = "'Cormorant Garamond', Georgia, serif"
const sans = "'Manrope', system-ui, sans-serif"

const TESTIMONIALS = [
    {
        q: "Shah Scenes didn't just document our wedding — they immortalized the way our hearts raced during the pheras. When our wedding film premiered, our entire family wept tears of joy. Pure royal cinema.",
        couple: 'Ananya & Kabir',
        location: 'The Leela Palace, Udaipur',
        date: 'Winter 2025'
    },
    {
        q: "Their team moved like quiet poetry — utterly respectful, invisible during intimate moments, yet captured every sacred tear and stolen smile we thought went unnoticed. Unmatched editorial finesse.",
        couple: 'Meera & Devraj',
        location: 'Rambagh Palace, Jaipur',
        date: 'Royal Nuptials'
    },
    {
        q: "From our sunset couple session to the midnight sangeet, working with Shah Scenes felt effortless and liberating. The color grading and original sound in our film are breathtaking.",
        couple: 'Tara & Siddharth',
        location: 'Alila Diwa, Goa',
        date: 'Sunset Celebration'
    },
    {
        q: "Every single photograph looks as though it belongs on the cover of Vogue. The handcrafted album is our most prized possession — a living heirloom our grandchildren will hold.",
        couple: 'Rhea & Vivaan',
        location: 'Taj Falaknuma Palace, Hyderabad',
        date: 'Palace Union'
    },
]

export default function TestimonialsSection() {
    const { ref, visible } = useFadeUp()

    return (
        <section id="testimonials" ref={ref} style={{ background: C.espresso, padding: '110px 0', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #4A2C1D, transparent)' }} />

            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
                <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 68px' }}>
                    <div style={{ ...fadeStyle(visible, 0), marginBottom: 12 }}>
                        <span style={{ fontFamily: sans, fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.gold }}>
                            Client Reverence
                        </span>
                    </div>
                    <h2 style={{ ...fadeStyle(visible, 0.08), fontFamily: serif, fontWeight: 300, fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)', color: C.ivory, lineHeight: 1.15 }}>
                        Words from our <em style={{ color: C.gold, fontStyle: 'italic' }}>patrons.</em>
                    </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 32 }}>
                    {TESTIMONIALS.map((t, i) => (
                        <blockquote key={i} style={{
                            ...fadeStyle(visible, 0.12 + i * 0.08),
                            borderLeft: `1px solid ${C.bronze}`,
                            background: 'rgba(74,44,29,0.06)',
                            padding: '32px 28px 24px',
                            display: 'flex', flexDirection: 'column',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                        }}>
                            <span style={{ fontFamily: serif, fontSize: '2.8rem', lineHeight: 1, color: `${C.gold}40`, display: 'block', marginBottom: 4 }}>&ldquo;</span>
                            <p style={{ fontFamily: serif, fontSize: '1.08rem', fontStyle: 'italic', fontWeight: 300, color: C.ivory, lineHeight: 1.75, flex: 1, marginBottom: 24 }}>
                                {t.q}
                            </p>
                            <footer style={{ borderTop: `1px solid ${C.bronze}40`, paddingTop: 14 }}>
                                <span style={{ fontFamily: sans, fontSize: '0.78rem', fontWeight: 600, color: C.champagne, display: 'block' }}>{t.couple}</span>
                                <span style={{ fontFamily: sans, fontSize: '0.65rem', color: C.muted, letterSpacing: '0.08em', marginTop: 3, display: 'block' }}>{t.location} · {t.date}</span>
                            </footer>
                        </blockquote>
                    ))}
                </div>
            </div>

            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #4A2C1D, transparent)' }} />
        </section>
    )
}
