'use client'

import { useState } from 'react'
import { useFadeUp, fadeStyle } from '@/hooks/useFadeUp'
import { MEDIA_IMAGES, MediaImage } from '@/lib/mediaData'

const C = { obsidian: '#030303', espresso: '#17110D', bronze: '#4A2C1D', gold: '#C6A15B', champagne: '#E8C982', ivory: '#EDE2D0', muted: '#B8AA98' }
const serif = "'Cormorant Garamond', Georgia, serif"
const sans = "'Manrope', system-ui, sans-serif"

const CATS = ['All', 'Wedding', 'Events', 'Destination', 'Bridal Portrait', 'Editorial']

export default function FeaturedPortfolio() {
    const { ref, visible } = useFadeUp()
    const [active, setActive] = useState('All')
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
    const [showAll, setShowAll] = useState(false)

    const filtered = active === 'All' ? MEDIA_IMAGES : MEDIA_IMAGES.filter(p => p.cat === active)
    const displayList = showAll ? filtered : filtered.slice(0, 12)

    const currentItem = lightboxIndex !== null ? filtered[lightboxIndex] : null

    const prevItem = () => {
        if (lightboxIndex === null) return
        setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)
    }

    const nextItem = () => {
        if (lightboxIndex === null) return
        setLightboxIndex((lightboxIndex + 1) % filtered.length)
    }

    return (
        <section id="portfolio" ref={ref} style={{ background: C.obsidian, padding: '100px 0', position: 'relative' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 48 }}>
                    <div>
                        <div style={{ ...fadeStyle(visible, 0), marginBottom: 12 }}>
                            <span style={{ fontFamily: sans, fontSize: '0.62rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: C.gold }}>Selected Stories</span>
                        </div>
                        <h2 style={{ ...fadeStyle(visible, 0.08), fontFamily: serif, fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3.4rem)', color: C.ivory, lineHeight: 1.1 }}>
                            Love, in every frame.
                        </h2>
                    </div>
                    <button
                        onClick={() => setShowAll(!showAll)}
                        style={{
                            ...fadeStyle(visible, 0.14),
                            fontFamily: sans,
                            fontSize: '0.6rem',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: C.gold,
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: 0
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = C.champagne)}
                        onMouseLeave={e => (e.currentTarget.style.color = C.gold)}
                    >
                        {showAll ? 'SHOW CURATED' : `VIEW ALL (${filtered.length})`}
                        <svg width="18" height="8" viewBox="0 0 18 8" fill="none"><path d="M0 4h16M13 1l3 3-3 3" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" /></svg>
                    </button>
                </div>

                {/* Filter tabs */}
                <div style={{ ...fadeStyle(visible, 0.18), display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 52 }}>
                    {CATS.map(cat => (
                        <button key={cat} onClick={() => { setActive(cat); setShowAll(false) }}
                            style={{
                                fontFamily: sans, fontSize: '0.58rem', letterSpacing: '0.18em',
                                textTransform: 'uppercase', cursor: 'pointer',
                                padding: '8px 18px',
                                border: `1px solid ${active === cat ? C.gold : C.bronze + '80'}`,
                                color: active === cat ? C.gold : C.muted,
                                background: active === cat ? 'rgba(198,161,91,0.08)' : 'transparent',
                                transition: 'all 0.3s',
                            }}
                            onMouseEnter={e => { if (active !== cat) { (e.currentTarget as HTMLElement).style.borderColor = C.gold + '70'; (e.currentTarget as HTMLElement).style.color = C.ivory } }}
                            onMouseLeave={e => { if (active !== cat) { (e.currentTarget as HTMLElement).style.borderColor = C.bronze + '80'; (e.currentTarget as HTMLElement).style.color = C.muted } }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
                    {displayList.map((p, i) => (
                        <div key={p.id}
                            className="portfolio-card"
                            style={{ ...fadeStyle(visible, 0.14 + (i % 6) * 0.05), cursor: 'pointer' }}
                            onClick={() => {
                                const indexInFiltered = filtered.findIndex(item => item.id === p.id)
                                setLightboxIndex(indexInFiltered)
                            }}
                        >
                            {/* Image Container */}
                            <div className="zoom-wrap" style={{
                                position: 'relative',
                                aspectRatio: p.aspect === '16/9' ? '16/9' : p.aspect === '4/5' ? '4/5' : '3/4',
                                marginBottom: 16,
                                overflow: 'hidden',
                                border: `1px solid ${C.bronze}60`,
                                background: C.espresso
                            }}>
                                <img
                                    src={p.src}
                                    alt={p.title}
                                    loading="lazy"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)',
                                    }}
                                />
                                {/* Hover overlay */}
                                <div className="portfolio-overlay" style={{
                                    position: 'absolute', inset: 0,
                                    background: 'linear-gradient(to top, rgba(3,3,3,0.85) 0%, rgba(3,3,3,0.2) 60%, transparent 100%)',
                                    display: 'flex', alignItems: 'flex-end', padding: 20,
                                    opacity: 0,
                                    transition: 'opacity 0.35s ease',
                                }}>
                                    <span style={{ fontFamily: sans, fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold }}>
                                        VIEW PHOTOGRAPH →
                                    </span>
                                </div>
                            </div>
                            {/* Meta */}
                            <span style={{ fontFamily: sans, fontSize: '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold, display: 'block', marginBottom: 6 }}>{p.cat}</span>
                            <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: '1.15rem', color: C.ivory, transition: 'color 0.3s' }}
                                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = C.gold}
                                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = C.ivory}
                            >
                                {p.title}
                            </h3>
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                {!showAll && filtered.length > 9 && (
                    <div style={{ textAlign: 'center', marginTop: 56 }}>
                        <button
                            onClick={() => setShowAll(true)}
                            style={{
                                fontFamily: sans,
                                fontSize: '0.62rem',
                                letterSpacing: '0.22em',
                                textTransform: 'uppercase',
                                color: C.ivory,
                                background: 'transparent',
                                border: `1px solid ${C.bronze}`,
                                padding: '14px 32px',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                            }}
                            onMouseEnter={e => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.borderColor = C.gold;
                                el.style.color = C.gold;
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.borderColor = C.bronze;
                                el.style.color = C.ivory;
                            }}
                        >
                            EXPLORE ALL {filtered.length} PHOTOGRAPHS
                        </button>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {currentItem && (
                <div
                    onClick={() => setLightboxIndex(null)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 100,
                        background: 'rgba(3,3,3,0.96)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 24,
                    }}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        style={{
                            position: 'relative',
                            maxWidth: 1100,
                            maxHeight: '90vh',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setLightboxIndex(null)}
                            style={{
                                position: 'absolute',
                                top: -40,
                                right: 0,
                                fontFamily: sans,
                                fontSize: '0.65rem',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: C.muted,
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '6px 12px',
                                transition: 'color 0.2s',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
                            onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
                        >
                            CLOSE ×
                        </button>

                        {/* Image Frame */}
                        <div style={{
                            position: 'relative',
                            maxHeight: '75vh',
                            border: `1px solid ${C.bronze}`,
                            background: C.espresso,
                            boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
                        }}>
                            <img
                                src={currentItem.src}
                                alt={currentItem.title}
                                style={{
                                    maxHeight: '75vh',
                                    maxWidth: '90vw',
                                    objectFit: 'contain',
                                    display: 'block',
                                }}
                            />
                        </div>

                        {/* Details */}
                        <div style={{ textAlign: 'center', marginTop: 18 }}>
                            <span style={{ fontFamily: sans, fontSize: '0.58rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: C.gold, display: 'block', marginBottom: 4 }}>
                                {currentItem.cat} · {lightboxIndex! + 1} of {filtered.length}
                            </span>
                            <h3 style={{ fontFamily: serif, fontSize: '1.4rem', fontWeight: 300, color: C.ivory }}>
                                {currentItem.title}
                            </h3>
                        </div>

                        {/* Navigation controls */}
                        <button
                            onClick={prevItem}
                            style={{
                                position: 'absolute',
                                left: -60,
                                top: '45%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(3,3,3,0.7)',
                                border: `1px solid ${C.bronze}`,
                                color: C.gold,
                                width: 44,
                                height: 44,
                                borderRadius: '50%',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.borderColor = C.gold)}
                            onMouseLeave={e => (e.currentTarget.style.borderColor = C.bronze)}
                            title="Previous"
                        >
                            ←
                        </button>
                        <button
                            onClick={nextItem}
                            style={{
                                position: 'absolute',
                                right: -60,
                                top: '45%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(3,3,3,0.7)',
                                border: `1px solid ${C.bronze}`,
                                color: C.gold,
                                width: 44,
                                height: 44,
                                borderRadius: '50%',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.borderColor = C.gold)}
                            onMouseLeave={e => (e.currentTarget.style.borderColor = C.bronze)}
                            title="Next"
                        >
                            →
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}
