'use client'

import { useFadeUp, fadeStyle } from '@/hooks/useFadeUp'

const C = { obsidian: '#030303', espresso: '#17110D', bronze: '#4A2C1D', gold: '#C6A15B', champagne: '#E8C982', ivory: '#EDE2D0', muted: '#B8AA98' }
const serif = "'Cormorant Garamond', Georgia, serif"
const sans = "'Manrope', system-ui, sans-serif"

const SERVICES = [
    {
        n: '01',
        title: 'Wedding Photography',
        desc: 'Ceremonies, rituals, candid emotions, family moments, and meaningful details — every chapter of your day, documented with care.',
        image: '/media/images/wedding-moment-01.webp',
        alt: 'Royal Wedding Photography Ceremony'
    },
    {
        n: '02',
        title: 'Fine Art Couple Portraits',
        desc: 'Personalised couple sessions in beautiful locations, with natural expressions and considered editorial composition.',
        image: '/media/images/wedding-moment-03.webp',
        alt: 'Fine Art Couple Portraits'
    },
    {
        n: '03',
        title: 'Cinematic Wedding Films',
        desc: 'Thoughtfully edited films that preserve the atmosphere, emotion, movement, and sound of your celebration.',
        image: '/media/thumbnails/wedding-film-01-thumb.webp',
        alt: 'Cinematic Wedding Film Reel',
        isVideo: true
    },
    {
        n: '04',
        title: 'Destination Weddings',
        desc: 'Photography and filmmaking for destination celebrations across India and internationally. We travel for love.',
        image: '/media/images/cinematic-landscape-02.webp',
        alt: 'Destination Palace Wedding'
    },
    {
        n: '05',
        title: 'Bridal Portraits',
        desc: 'Elegant portraits focused on styling, details, personality, and natural expression — created solely for you.',
        image: '/media/images/hero-portrait.webp',
        alt: 'Editorial Bridal Portrait'
    },
    {
        n: '06',
        title: 'Engagement Photography',
        desc: 'Intimate sessions documenting the beginning of your next chapter, with warmth and spontaneity.',
        image: '/media/images/wedding-story-06.webp',
        alt: 'Intimate Engagement Celebrations'
    },
]

export default function ServicesSection() {
    const { ref, visible } = useFadeUp()

    return (
        <section id="services" ref={ref} style={{ background: C.espresso, padding: '100px 0', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #4A2C1D, transparent)' }} />

            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
                {/* Header */}
                <div style={{ marginBottom: 64 }}>
                    <div style={{ ...fadeStyle(visible, 0), marginBottom: 12 }}>
                        <span style={{ fontFamily: sans, fontSize: '0.62rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: C.gold }}>
                            What We Document
                        </span>
                    </div>
                    <h2 style={{ ...fadeStyle(visible, 0.08), fontFamily: serif, fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3.4rem)', color: C.ivory, lineHeight: 1.1 }}>
                        Every chapter.<br /><em>Beautifully preserved.</em>
                    </h2>
                </div>

                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '48px 32px' }}>
                    {SERVICES.map((s, i) => (
                        <div key={s.n}
                            style={{ ...fadeStyle(visible, 0.1 + i * 0.07), display: 'flex', flexDirection: 'column' }}
                        >
                            {/* Image Container */}
                            <div className="zoom-wrap" style={{
                                aspectRatio: '3/4',
                                marginBottom: 20,
                                position: 'relative',
                                overflow: 'hidden',
                                border: `1px solid ${C.bronze}`,
                                background: C.obsidian,
                                boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                            }}>
                                <img
                                    src={s.image}
                                    alt={s.alt}
                                    loading="lazy"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)',
                                    }}
                                />

                                {/* Subtle gradient overlay */}
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(3,3,3,0.7) 0%, rgba(3,3,3,0.1) 40%, transparent 100%)',
                                    pointerEvents: 'none',
                                }} />

                                {/* Video Play Pill if video */}
                                {s.isVideo && (
                                    <div style={{
                                        position: 'absolute',
                                        top: 14,
                                        right: 14,
                                        background: 'rgba(3,3,3,0.75)',
                                        border: `1px solid ${C.gold}80`,
                                        borderRadius: '50%',
                                        width: 38,
                                        height: 38,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backdropFilter: 'blur(4px)',
                                    }}>
                                        <svg width="12" height="14" viewBox="0 0 18 20" fill="none" style={{ marginLeft: 2 }}>
                                            <path d="M2 2l14 8-14 8V2z" fill="#E8C982" />
                                        </svg>
                                    </div>
                                )}

                                {/* Category pill on image bottom */}
                                <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                                    <span style={{
                                        fontFamily: sans,
                                        fontSize: '0.52rem',
                                        letterSpacing: '0.18em',
                                        textTransform: 'uppercase',
                                        color: C.champagne,
                                        background: 'rgba(23,17,13,0.85)',
                                        border: `1px solid ${C.bronze}`,
                                        padding: '4px 10px',
                                        backdropFilter: 'blur(4px)',
                                    }}>
                                        {s.title}
                                    </span>
                                </div>
                            </div>

                            {/* Number + line */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                <span style={{ fontFamily: sans, fontSize: '0.6rem', letterSpacing: '0.2em', color: C.gold }}>{s.n}</span>
                                <div style={{ flex: 1, height: 1, background: `${C.bronze}60` }} />
                            </div>

                            <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: '1.3rem', color: C.ivory, marginBottom: 10, transition: 'color 0.3s' }}
                                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = C.gold}
                                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = C.ivory}
                            >
                                {s.title}
                            </h3>
                            <p style={{ fontFamily: sans, fontSize: '0.75rem', color: C.muted, lineHeight: 1.8, flex: 1, marginBottom: 16 }}>
                                {s.desc}
                            </p>
                            <a href="#enquiry"
                                onClick={e => { e.preventDefault(); document.querySelector('#enquiry')?.scrollIntoView({ behavior: 'smooth' }) }}
                                style={{ fontFamily: sans, fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7, transition: 'color 0.3s' }}
                                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = C.champagne}
                                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = C.gold}
                            >
                                DISCOVER MORE
                                <svg width="14" height="7" viewBox="0 0 14 7" fill="none"><path d="M0 3.5h12M9.5 1l3 2.5-3 2.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" /></svg>
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #4A2C1D, transparent)' }} />
        </section>
    )
}
