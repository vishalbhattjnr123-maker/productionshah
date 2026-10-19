'use client'

import { useFadeUp, fadeStyle } from '@/hooks/useFadeUp'

const C = { obsidian: '#030303', bronze: '#4A2C1D', gold: '#C6A15B', champagne: '#E8C982', ivory: '#EDE2D0', muted: '#B8AA98' }
const serif = "'Cormorant Garamond', Georgia, serif"
const sans = "'Manrope', system-ui, sans-serif"

const PRINCIPLES = [
    {
        n: '01',
        title: 'The Unscripted Soul',
        desc: 'Real emotions, spontaneous laughter, and sacred moments that no direction could ever produce. We create a relaxed, trusting atmosphere so you can stay fully present while we document the authentic magic.'
    },
    {
        n: '02',
        title: 'The Couture Eye',
        desc: 'Intentional geometry, painterly natural light, and high-fashion editorial storytelling. Every single frame is thoughtfully considered — balancing fine-art grandeur with intimate warmth.'
    },
    {
        n: '03',
        title: 'Generational Heirlooms',
        desc: 'Artistic color harmony and heirloom-grade films designed to endure for generations — completely free from fleeting social media filters, trendy presets, and passing fads.'
    },
]

export default function ExperienceSection() {
    const { ref, visible } = useFadeUp()

    return (
        <section id="experience" ref={ref} style={{ background: C.obsidian, padding: '100px 0' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>

                {/* Headline centered */}
                <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 72px' }}>
                    <div style={{ ...fadeStyle(visible, 0), marginBottom: 12 }}>
                        <span style={{ fontFamily: sans, fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.gold }}>
                            The Shah Scenes Approach
                        </span>
                    </div>
                    <h2 style={{ ...fadeStyle(visible, 0.08), fontFamily: serif, fontWeight: 300, fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', color: C.ivory, lineHeight: 1.15, marginBottom: 24 }}>
                        More than photographs.<br />
                        <em style={{ color: C.gold, fontStyle: 'italic' }}>An effortless legacy you will cherish.</em>
                    </h2>
                    <div style={{ ...fadeStyle(visible, 0.14), width: 56, height: 1, background: `linear-gradient(90deg, ${C.gold}, ${C.champagne})`, margin: '0 auto' }} />
                </div>

                {/* Three columns */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
                    {PRINCIPLES.map((p, i) => (
                        <div key={p.n} style={{
                            ...fadeStyle(visible, 0.16 + i * 0.12),
                            position: 'relative',
                            padding: '48px 40px',
                            border: `1px solid ${C.bronze}30`,
                            background: i === 1 ? 'rgba(74,44,29,0.06)' : 'transparent',
                        }}>
                            {/* Vertical accent */}
                            <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${C.gold}, transparent)`, marginBottom: 24 }} />
                            <span style={{ fontFamily: sans, fontSize: '0.6rem', letterSpacing: '0.24em', color: C.gold, display: 'block', marginBottom: 14 }}>{p.n}</span>
                            <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: '1.8rem', color: C.ivory, marginBottom: 16 }}>{p.title}</h3>
                            <p style={{ fontFamily: sans, fontSize: '0.78rem', color: C.muted, lineHeight: 1.85 }}>{p.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
