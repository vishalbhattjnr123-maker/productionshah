'use client'

import { useState } from 'react'
import { useFadeUp, fadeStyle } from '@/hooks/useFadeUp'
import { MEDIA_VIDEOS, MediaVideo } from '@/lib/mediaData'

const C = { obsidian: '#030303', espresso: '#17110D', bronze: '#4A2C1D', gold: '#C6A15B', champagne: '#E8C982', ivory: '#EDE2D0', muted: '#B8AA98' }
const serif = "'Cormorant Garamond', Georgia, serif"
const sans = "'Manrope', system-ui, sans-serif"

const FILM_CATS = ['All', 'Wedding Films', 'Event Films', 'Cinematic Reels', 'Commercial & Food']

export default function FilmsSection() {
    const { ref, visible } = useFadeUp()
    const [activeCat, setActiveCat] = useState('All')
    const [activeFilmIndex, setActiveFilmIndex] = useState<number | null>(null)
    const [viewMode, setViewMode] = useState<'featured' | 'all'>('featured')

    const filteredFilms = activeCat === 'All' ? MEDIA_VIDEOS : MEDIA_VIDEOS.filter(f => f.cat === activeCat)
    const displayFilms = viewMode === 'featured' ? filteredFilms.slice(0, 6) : filteredFilms

    const activeFilm: MediaVideo | null = activeFilmIndex !== null ? filteredFilms[activeFilmIndex] : null

    const prevFilm = () => {
        if (activeFilmIndex === null) return
        setActiveFilmIndex((activeFilmIndex - 1 + filteredFilms.length) % filteredFilms.length)
    }

    const nextFilm = () => {
        if (activeFilmIndex === null) return
        setActiveFilmIndex((activeFilmIndex + 1) % filteredFilms.length)
    }

    return (
        <section id="films" ref={ref} style={{ background: C.espresso, padding: '100px 0', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #4A2C1D, transparent)' }} />

            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 40 }}>
                    <div>
                        <div style={{ ...fadeStyle(visible, 0), marginBottom: 12 }}>
                            <span style={{ fontFamily: sans, fontSize: '0.62rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: C.gold }}>
                                Cinematic Films &amp; Reels ({MEDIA_VIDEOS.length} Total)
                            </span>
                        </div>
                        <h2 style={{ ...fadeStyle(visible, 0.08), fontFamily: serif, fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3.4rem)', color: C.ivory, lineHeight: 1.1 }}>
                            Stories that <em style={{ color: C.gold, fontStyle: 'italic' }}>move you.</em>
                        </h2>
                    </div>

                    {/* Toggle View */}
                    <div style={{ ...fadeStyle(visible, 0.12), display: 'flex', gap: 12, alignItems: 'center' }}>
                        <button
                            onClick={() => setViewMode(viewMode === 'featured' ? 'all' : 'featured')}
                            style={{
                                fontFamily: sans,
                                fontSize: '0.6rem',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: C.gold,
                                background: 'transparent',
                                border: `1px solid ${C.bronze}`,
                                padding: '10px 20px',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                            }}
                            onMouseEnter={e => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.borderColor = C.gold;
                                el.style.color = C.champagne;
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.borderColor = C.bronze;
                                el.style.color = C.gold;
                            }}
                        >
                            {viewMode === 'featured' ? `VIEW ALL (${filteredFilms.length})` : 'SHOW FEATURED'}
                        </button>
                    </div>
                </div>

                {/* Category Filter Tabs */}
                <div style={{ ...fadeStyle(visible, 0.15), display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 48 }}>
                    {FILM_CATS.map(cat => {
                        const count = cat === 'All' ? MEDIA_VIDEOS.length : MEDIA_VIDEOS.filter(f => f.cat === cat).length
                        return (
                            <button
                                key={cat}
                                onClick={() => { setActiveCat(cat); setViewMode('featured') }}
                                style={{
                                    fontFamily: sans,
                                    fontSize: '0.58rem',
                                    letterSpacing: '0.18em',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    padding: '8px 18px',
                                    border: `1px solid ${activeCat === cat ? C.gold : C.bronze + '80'}`,
                                    color: activeCat === cat ? C.gold : C.muted,
                                    background: activeCat === cat ? 'rgba(198,161,91,0.08)' : 'transparent',
                                    transition: 'all 0.3s',
                                }}
                                onMouseEnter={e => {
                                    if (activeCat !== cat) {
                                        (e.currentTarget as HTMLElement).style.borderColor = C.gold + '70';
                                        (e.currentTarget as HTMLElement).style.color = C.ivory;
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (activeCat !== cat) {
                                        (e.currentTarget as HTMLElement).style.borderColor = C.bronze + '80';
                                        (e.currentTarget as HTMLElement).style.color = C.muted;
                                    }
                                }}
                            >
                                {cat} ({count})
                            </button>
                        )
                    })}
                </div>

                {/* Films Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: 32,
                }}>
                    {displayFilms.map((film, i) => {
                        const isHorizontal = film.cat === 'Event Films' || film.cat === 'Commercial & Food'
                        return (
                            <div
                                key={film.id}
                                style={{ ...fadeStyle(visible, 0.1 + (i % 6) * 0.06), cursor: 'pointer' }}
                                onClick={() => {
                                    const idx = filteredFilms.findIndex(f => f.id === film.id)
                                    setActiveFilmIndex(idx)
                                }}
                            >
                                {/* Card Media */}
                                <div
                                    style={{
                                        position: 'relative',
                                        aspectRatio: isHorizontal ? '16/9' : '9/16',
                                        maxHeight: isHorizontal ? 260 : 480,
                                        width: '100%',
                                        marginBottom: 16,
                                        overflow: 'hidden',
                                        border: `1px solid ${C.bronze}`,
                                        background: '#0d0a08',
                                    }}
                                    onMouseEnter={e => {
                                        const btn = e.currentTarget.querySelector('.play-btn') as HTMLElement
                                        if (btn) {
                                            btn.style.transform = 'scale(1.15)'
                                            btn.style.background = 'rgba(198,161,91,0.25)'
                                        }
                                        const img = e.currentTarget.querySelector('img')
                                        if (img) img.style.transform = 'scale(1.04)'
                                    }}
                                    onMouseLeave={e => {
                                        const btn = e.currentTarget.querySelector('.play-btn') as HTMLElement
                                        if (btn) {
                                            btn.style.transform = 'scale(1)'
                                            btn.style.background = 'rgba(198,161,91,0.12)'
                                        }
                                        const img = e.currentTarget.querySelector('img')
                                        if (img) img.style.transform = 'scale(1)'
                                    }}
                                >
                                    {/* Thumbnail */}
                                    <img
                                        src={film.poster}
                                        alt={film.title}
                                        loading="lazy"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)',
                                        }}
                                    />

                                    {/* Dark Gradient Overlay */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to top, rgba(3,3,3,0.85) 0%, rgba(3,3,3,0.2) 50%, rgba(3,3,3,0.4) 100%)',
                                        pointerEvents: 'none',
                                    }} />

                                    {/* Play Button Accent */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 2,
                                    }}>
                                        <div
                                            className="play-btn"
                                            style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: '50%',
                                                border: `1px solid rgba(232,201,130,0.6)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: 'rgba(198,161,91,0.15)',
                                                backdropFilter: 'blur(4px)',
                                                transition: 'all 0.35s ease',
                                            }}
                                        >
                                            <svg width="20" height="22" viewBox="0 0 18 20" fill="none" style={{ marginLeft: 3 }}>
                                                <path d="M2 2l14 8-14 8V2z" fill="#E8C982" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Duration Badge */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 12,
                                        right: 12,
                                        zIndex: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                    }}>
                                        <span style={{
                                            fontFamily: sans,
                                            fontSize: '0.52rem',
                                            letterSpacing: '0.14em',
                                            color: C.gold,
                                            background: 'rgba(3,3,3,0.85)',
                                            border: `1px solid ${C.bronze}`,
                                            padding: '3px 8px',
                                        }}>
                                            {film.dur}
                                        </span>
                                    </div>
                                </div>

                                {/* Film Meta */}
                                <span style={{ fontFamily: sans, fontSize: '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold, display: 'block', marginBottom: 4 }}>
                                    {film.cat}
                                </span>
                                <h3 style={{
                                    fontFamily: serif,
                                    fontWeight: 400,
                                    fontSize: '1.2rem',
                                    color: C.ivory,
                                    marginBottom: 6,
                                    transition: 'color 0.3s',
                                }}>
                                    {film.title}
                                </h3>
                                <p style={{ fontFamily: sans, fontSize: '0.74rem', color: C.muted, lineHeight: 1.6 }}>
                                    {film.desc}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Video Playback Modal */}
            {activeFilm !== null && (
                <div
                    onClick={() => setActiveFilmIndex(null)}
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
                            width: '100%',
                            maxWidth: activeFilm.cat === 'Event Films' || activeFilm.cat === 'Commercial & Food' ? 840 : 440,
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setActiveFilmIndex(null)}
                            style={{
                                position: 'absolute',
                                top: -38,
                                right: 0,
                                fontFamily: sans,
                                fontSize: '0.62rem',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: C.muted,
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'color 0.2s',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
                            onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
                        >
                            CLOSE ×
                        </button>

                        {/* Video Player */}
                        <div style={{
                            width: '100%',
                            aspectRatio: activeFilm.cat === 'Event Films' || activeFilm.cat === 'Commercial & Food' ? '16/9' : '9/16',
                            maxHeight: '75vh',
                            background: '#000',
                            border: `1px solid ${C.bronze}`,
                            boxShadow: '0 25px 70px rgba(0,0,0,0.9)',
                            overflow: 'hidden',
                        }}>
                            <video
                                key={activeFilm.src}
                                src={activeFilm.src}
                                poster={activeFilm.poster}
                                controls
                                autoPlay
                                playsInline
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    background: '#030303',
                                }}
                            />
                        </div>

                        {/* Title & Navigation */}
                        <div style={{ textAlign: 'center', marginTop: 14, width: '100%' }}>
                            <span style={{ fontFamily: sans, fontSize: '0.54rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold, display: 'block', marginBottom: 4 }}>
                                {activeFilm.cat} · {activeFilm.dur}
                            </span>
                            <h3 style={{ fontFamily: serif, fontSize: '1.35rem', fontWeight: 300, color: C.ivory, marginBottom: 4 }}>
                                {activeFilm.title}
                            </h3>
                            <p style={{ fontFamily: sans, fontSize: '0.72rem', color: C.muted }}>
                                {activeFilm.desc} ({activeFilmIndex! + 1} of {filteredFilms.length})
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12 }}>
                                <button
                                    onClick={prevFilm}
                                    style={{
                                        background: 'rgba(198,161,91,0.08)',
                                        border: `1px solid ${C.bronze}`,
                                        color: C.gold,
                                        padding: '6px 16px',
                                        fontFamily: sans,
                                        fontSize: '0.58rem',
                                        letterSpacing: '0.16em',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.borderColor = C.gold)}
                                    onMouseLeave={e => (e.currentTarget.style.borderColor = C.bronze)}
                                >
                                    ← PREV FILM
                                </button>
                                <button
                                    onClick={nextFilm}
                                    style={{
                                        background: 'rgba(198,161,91,0.08)',
                                        border: `1px solid ${C.bronze}`,
                                        color: C.gold,
                                        padding: '6px 16px',
                                        fontFamily: sans,
                                        fontSize: '0.58rem',
                                        letterSpacing: '0.16em',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.borderColor = C.gold)}
                                    onMouseLeave={e => (e.currentTarget.style.borderColor = C.bronze)}
                                >
                                    NEXT FILM →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #4A2C1D, transparent)' }} />
        </section>
    )
}
