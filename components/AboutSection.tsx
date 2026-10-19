'use client'

import { useFadeUp, fadeStyle } from '@/hooks/useFadeUp'

const C = { obsidian: '#030303', bronze: '#4A2C1D', gold: '#C6A15B', champagne: '#E8C982', ivory: '#EDE2D0', muted: '#B8AA98' }
const serif = "'Cormorant Garamond', Georgia, serif"
const sans = "'Manrope', system-ui, sans-serif"

export default function AboutSection() {
    const { ref, visible } = useFadeUp()

    return (
        <section id="about" ref={ref} style={{ background: C.obsidian, padding: '100px 0' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 72, alignItems: 'center' }}>

                {/* Photo */}
                <div style={{ ...fadeStyle(visible, 0), position: 'relative' }}>
                    <div style={{
                        position: 'relative',
                        aspectRatio: '3/4',
                        width: '100%',
                        maxWidth: 380,
                        overflow: 'hidden',
                        border: `1px solid ${C.bronze}`,
                        background: C.obsidian,
                    }}>
                        <img
                            src="/media/images/monochrome-03.webp"
                            alt="Shah Scenes Photographer Portrait"
                            loading="lazy"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                        />
                    </div>
                </div>

                {/* Text */}
                <div>
                    <div style={{ ...fadeStyle(visible, 0.08), marginBottom: 12 }}>
                        <span style={{ fontFamily: sans, fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.gold }}>
                            The Studio &amp; Vision
                        </span>
                    </div>
                    <h2 style={{ ...fadeStyle(visible, 0.14), fontFamily: serif, fontWeight: 300, fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)', color: C.ivory, lineHeight: 1.12, marginBottom: 24 }}>
                        Behind every frame,<br />
                        <em style={{ color: C.gold, fontStyle: 'italic' }}>an indelible pulse of emotion.</em>
                    </h2>
                    <div style={{ ...fadeStyle(visible, 0.2), width: 56, height: 1, background: `linear-gradient(90deg, ${C.gold}, ${C.champagne})`, marginBottom: 28 }} />
                    <div style={{ ...fadeStyle(visible, 0.25), display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480, marginBottom: 36 }}>
                        {[
                            'Founded on a relentless devotion to romance, beauty, and truth, SHAH SCENES stands at the intersection of royal Indian heritage and modern haute-couture cinema.',
                            'We view weddings as living epics. Our purpose is to preserve not merely how your celebration looked, but the electric anticipation in the air, the sacred silence before the vows, and the joyful tidal wave of family love.',
                            'To maintain our uncompromising standard of artistry, we accept a strictly limited number of wedding commissions each season — dedicating our full passion and craft to your legacy.',
                        ].map((p, i) => (
                            <p key={i} style={{ fontFamily: sans, fontSize: '0.84rem', color: C.muted, lineHeight: 1.9 }}>{p}</p>
                        ))}
                    </div>
                    <div style={{ ...fadeStyle(visible, 0.32) }}>
                        <a href="#enquiry"
                            onClick={e => { e.preventDefault(); document.querySelector('#enquiry')?.scrollIntoView({ behavior: 'smooth' }) }}
                            style={{
                                display: 'inline-block', fontFamily: sans, fontSize: '0.64rem',
                                letterSpacing: '0.2em', textTransform: 'uppercase',
                                color: '#030303', background: C.gold,
                                padding: '13px 28px', border: `1px solid ${C.gold}`,
                                textDecoration: 'none', transition: 'all 0.3s',
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = C.champagne }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = C.gold }}
                        >
                            GET TO KNOW US
                        </a>
                    </div>
                </div>

            </div>
        </section>
    )
}
