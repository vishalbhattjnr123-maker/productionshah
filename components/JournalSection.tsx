'use client'

import { useFadeUp, fadeStyle } from '@/hooks/useFadeUp'

const C = { obsidian: '#030303', bronze: '#4A2C1D', gold: '#C6A15B', champagne: '#E8C982', ivory: '#EDE2D0', muted: '#B8AA98' }
const serif = "'Cormorant Garamond', Georgia, serif"
const sans = "'Manrope', system-ui, sans-serif"

const ARTICLES = [
    { id: 1, cat: 'Guide', title: 'How to Choose Your Wedding Photographer', date: 'September 2024', slug: 'how-to-choose-wedding-photographer', image: '/media/images/wedding-moment-01.webp' },
    { id: 2, cat: 'Planning', title: 'A Guide to Planning Your Intimate Couple Session', date: 'August 2024', slug: 'couple-session-guide', image: '/media/images/wedding-moment-03.webp' },
    { id: 3, cat: 'Timeline', title: 'Wedding Photography Timeline: A Complete Guide', date: 'July 2024', slug: 'wedding-photography-timeline', image: '/media/images/cinematic-landscape-01.webp' },
    { id: 4, cat: 'Destination', title: 'Destination Wedding Photography Ideas', date: 'June 2024', slug: 'destination-wedding-photography-ideas', image: '/media/images/story-07.webp' },
]

export default function JournalSection() {
    const { ref, visible } = useFadeUp()

    return (
        <section id="journal" ref={ref} style={{ background: C.obsidian, padding: '100px 0' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 52 }}>
                    <div>
                        <div style={{ ...fadeStyle(visible, 0), marginBottom: 12 }}>
                            <span style={{ fontFamily: sans, fontSize: '0.62rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: C.gold }}>Notes on Love &amp; Light</span>
                        </div>
                        <h2 style={{ ...fadeStyle(visible, 0.08), fontFamily: serif, fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: C.ivory }}>
                            From the journal.
                        </h2>
                    </div>
                    <a href="#" style={{ ...fadeStyle(visible, 0.12), fontFamily: sans, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = C.champagne}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = C.gold}
                    >
                        ALL ARTICLES
                        <svg width="18" height="8" viewBox="0 0 18 8" fill="none"><path d="M0 4h16M13 1l3 3-3 3" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" /></svg>
                    </a>
                </div>

                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 32 }}>
                    {ARTICLES.map((a, i) => (
                        <article key={a.id} style={{ ...fadeStyle(visible, 0.14 + i * 0.07), cursor: 'pointer' }}>
                            <div className="zoom-wrap" style={{ aspectRatio: '4/3', marginBottom: 18, overflow: 'hidden', border: `1px solid ${C.bronze}` }}>
                                <img
                                    src={a.image}
                                    alt={a.title}
                                    loading="lazy"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                                />
                            </div>
                            <span style={{ fontFamily: sans, fontSize: '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold, display: 'block', marginBottom: 8 }}>
                                {a.cat} · {a.date}
                            </span>
                            <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: '1.1rem', color: C.ivory, lineHeight: 1.4, marginBottom: 14, transition: 'color 0.3s' }}
                                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = C.gold}
                                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = C.ivory}
                            >
                                {a.title}
                            </h3>
                            <a href={`/journal/${a.slug}`}
                                style={{ fontFamily: sans, fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7, transition: 'color 0.3s' }}
                                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = C.champagne}
                                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = C.gold}
                            >
                                READ ARTICLE
                                <svg width="14" height="7" viewBox="0 0 14 7" fill="none"><path d="M0 3.5h12M9.5 1l3 2.5-3 2.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" /></svg>
                            </a>
                        </article>
                    ))}
                </div>

            </div>
        </section>
    )
}
