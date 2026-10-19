'use client'

import { useFadeUp, fadeStyle } from '@/hooks/useFadeUp'

// ── Inline style tokens ────────────────────────────────────
const C = {
    obsidian: '#030303', espresso: '#17110D', bronze: '#4A2C1D',
    gold: '#C6A15B', champagne: '#E8C982', ivory: '#EDE2D0', muted: '#B8AA98',
}
const serif = "'Cormorant Garamond', Georgia, serif"
const sans = "'Manrope', system-ui, sans-serif"

function GoldLine() {
    return <div style={{ width: 56, height: 1, background: `linear-gradient(90deg, ${C.gold}, ${C.champagne})` }} />
}

// ── Founder & Philosophy Section ───────────────────────────
export default function IntroductionSection() {
    const { ref, visible } = useFadeUp()

    return (
        <section id="founder" ref={ref} style={{ background: C.obsidian, padding: '110px 0', position: 'relative' }}>
            {/* Top delicate separator */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(198,161,91,0.25), transparent)' }} />

            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px 80px', alignItems: 'center' }}>

                {/* Left: Founder Story & Vision */}
                <div>
                    {/* Eyebrow */}
                    <div style={{ ...fadeStyle(visible, 0), display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.gold, display: 'inline-block', boxShadow: `0 0 8px ${C.gold}` }} />
                        <span style={{ fontFamily: sans, fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.champagne }}>
                            MEET THE FOUNDER &amp; CREATIVE DIRECTOR
                        </span>
                    </div>

                    {/* Headline */}
                    <h2 style={{
                        ...fadeStyle(visible, 0.08),
                        fontFamily: serif, fontWeight: 300,
                        fontSize: 'clamp(2.4rem, 4.4vw, 4rem)',
                        color: C.ivory, lineHeight: 1.1, marginBottom: 22,
                    }}>
                        “We don’t just capture light.<br />
                        <em style={{ color: C.gold, fontStyle: 'italic' }}>We immortalize your legacy.”</em>
                    </h2>

                    <div style={{ ...fadeStyle(visible, 0.14), marginBottom: 26 }}>
                        <GoldLine />
                    </div>

                    {/* Soulful Narrative */}
                    <div style={{ ...fadeStyle(visible, 0.2), display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 520 }}>
                        <p style={{ fontFamily: serif, fontSize: '1.18rem', fontStyle: 'italic', color: C.champagne, lineHeight: 1.6, fontWeight: 300 }}>
                            “A wedding is never a staged photo shoot — it is a sacred convergence of trembling hands, quiet vows, ancestral heritage, and unrestrained family euphoria.”
                        </p>

                        <p style={{ fontFamily: sans, fontSize: '0.84rem', color: C.muted, lineHeight: 1.9 }}>
                            When I founded <strong>SHAH SCENES</strong>, my conviction was simple: true luxury lives in authenticity. We do not manufacture artificial poses or chase fleeting internet filters. We stand beside you as trusted companions and couture visual storytellers, documenting the raw, unscripted heartbeat of your celebration.
                        </p>

                        <p style={{ fontFamily: sans, fontSize: '0.84rem', color: C.muted, lineHeight: 1.9 }}>
                            Every photograph and film crafted under my direction is treated as a multi-generational heirloom — meticulously graded and scored to make your heart race forty years from now just as it did on your wedding day.
                        </p>
                    </div>

                    {/* Founder Signature Block */}
                    <div style={{ ...fadeStyle(visible, 0.28), marginTop: 32, paddingTop: 24, borderTop: `1px solid ${C.bronze}60`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
                        <div>
                            <span style={{ fontFamily: serif, fontSize: '2.1rem', fontStyle: 'italic', color: C.champagne, display: 'block', lineHeight: 1, letterSpacing: '0.02em' }}>
                                Daksh Shah
                            </span>
                            <span style={{ fontFamily: sans, fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold, marginTop: 6, display: 'block' }}>
                                Founder &amp; Lead Cinematographer
                            </span>
                        </div>

                        {/* CTAs */}
                        <div style={{ display: 'flex', gap: 12 }}>
                            <a href="#portfolio"
                                onClick={e => { e.preventDefault(); document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }) }}
                                style={{
                                    fontFamily: sans, fontSize: '0.62rem', letterSpacing: '0.2em',
                                    textTransform: 'uppercase', color: C.ivory,
                                    border: `1px solid ${C.bronze}`, padding: '12px 22px',
                                    textDecoration: 'none', transition: 'all 0.3s',
                                    display: 'inline-block',
                                }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = C.gold; (e.currentTarget as HTMLElement).style.color = C.gold }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.bronze; (e.currentTarget as HTMLElement).style.color = C.ivory }}
                            >
                                VIEW OUR WORK
                            </a>
                            <a href="#enquiry"
                                onClick={e => { e.preventDefault(); document.querySelector('#enquiry')?.scrollIntoView({ behavior: 'smooth' }) }}
                                style={{
                                    fontFamily: sans, fontSize: '0.62rem', letterSpacing: '0.2em',
                                    textTransform: 'uppercase', color: '#030303',
                                    background: C.gold, padding: '12px 22px',
                                    border: `1px solid ${C.gold}`, textDecoration: 'none',
                                    transition: 'all 0.3s', display: 'inline-block',
                                    fontWeight: 600,
                                }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = C.champagne }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = C.gold }}
                            >
                                CONNECT WITH DAKSH
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right: Founder Signature Portrait */}
                <div style={{ ...fadeStyle(visible, 0.22), position: 'relative', maxWidth: 440, marginLeft: 'auto', width: '100%' }}>
                    {/* Double-layered Architectural Frame */}
                    <div style={{
                        position: 'relative',
                        aspectRatio: '3/4',
                        width: '100%',
                        overflow: 'hidden',
                        border: `1px solid ${C.bronze}`,
                        background: '#0d0a08',
                        boxShadow: '0 25px 70px rgba(0,0,0,0.9)',
                    }}>
                        <img
                            src="/media/images/founder-daksh-shah.webp"
                            alt="Daksh Shah - Founder & Creative Director of Shah Scenes"
                            loading="lazy"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                        />

                        {/* Soft Vignette Overlay */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(3,3,3,0.88) 0%, rgba(3,3,3,0.2) 40%, transparent 100%)',
                            pointerEvents: 'none',
                        }} />

                        {/* Founder Floating Card Badge on the Portrait */}
                        <div style={{
                            position: 'absolute',
                            bottom: 20,
                            left: 20,
                            right: 20,
                            background: 'rgba(23,17,13,0.85)',
                            border: `1px solid ${C.bronze}`,
                            backdropFilter: 'blur(10px)',
                            padding: '16px 20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <div>
                                <span style={{ fontFamily: serif, fontSize: '1.25rem', color: C.ivory, display: 'block', fontWeight: 400 }}>
                                    Daksh Shah
                                </span>
                                <span style={{ fontFamily: sans, fontSize: '0.52rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold, marginTop: 2, display: 'block' }}>
                                    Founder &amp; Creative Director
                                </span>
                            </div>
                            <span style={{ fontFamily: sans, fontSize: '0.48rem', letterSpacing: '0.18em', color: C.muted, textTransform: 'uppercase', border: `1px solid ${C.bronze}80`, padding: '4px 8px' }}>
                                SHAH SCENES
                            </span>
                        </div>
                    </div>

                    {/* Founder Accolades Strip beneath Portrait */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 12,
                        marginTop: 18,
                    }}>
                        <div style={{ padding: '12px 16px', background: 'rgba(74,44,29,0.08)', border: `1px solid ${C.bronze}50` }}>
                            <span style={{ fontFamily: serif, fontSize: '1.2rem', color: C.champagne, display: 'block' }}>500+ Unions</span>
                            <span style={{ fontFamily: sans, fontSize: '0.5rem', letterSpacing: '0.14em', color: C.muted, textTransform: 'uppercase', marginTop: 2, display: 'block' }}>Personally Directed</span>
                        </div>
                        <div style={{ padding: '12px 16px', background: 'rgba(74,44,29,0.08)', border: `1px solid ${C.bronze}50` }}>
                            <span style={{ fontFamily: serif, fontSize: '1.2rem', color: C.champagne, display: 'block' }}>Pan-India &amp; Global</span>
                            <span style={{ fontFamily: sans, fontSize: '0.5rem', letterSpacing: '0.14em', color: C.muted, textTransform: 'uppercase', marginTop: 2, display: 'block' }}>Destination Travel</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
