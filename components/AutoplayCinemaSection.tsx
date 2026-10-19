'use client'

import { useState, useRef } from 'react'
import { useFadeUp, fadeStyle } from '@/hooks/useFadeUp'

const C = { obsidian: '#030303', espresso: '#17110D', bronze: '#4A2C1D', gold: '#C6A15B', champagne: '#E8C982', ivory: '#EDE2D0', muted: '#B8AA98' }
const serif = "'Cormorant Garamond', Georgia, serif"
const sans = "'Manrope', system-ui, sans-serif"

const FEATURED_AUTOPLAY_REELS = [
    {
        id: 'new-01',
        title: 'Royal Bridal Splendor',
        tag: 'Royal Bridal Cinema',
        desc: 'A regal portraiture film capturing timeless bridal poise and sacred beauty.',
        src: '/media/videos/new-film-01.mp4',
        poster: '/media/thumbnails/new-film-01-thumb.webp',
        dur: '0:37'
    },
    {
        id: 'new-02',
        title: 'The Grand Mandap Entry',
        tag: 'Ceremonial Procession',
        desc: 'An unforgettable walk under blossoms, bathed in golden courtyard light.',
        src: '/media/videos/new-film-02.mp4',
        poster: '/media/thumbnails/new-film-02-thumb.webp',
        dur: '0:37'
    },
    {
        id: 'new-03',
        title: 'A Garden Odyssey of Love',
        tag: 'Destination Wedding',
        desc: 'Lush daylight celebration capturing pure joy, movement, and genuine soul.',
        src: '/media/videos/new-film-03.mp4',
        poster: '/media/thumbnails/new-film-03-thumb.webp',
        dur: '1:27'
    },
    {
        id: 'wedding-01',
        title: 'The Grand Wedding Symphony',
        tag: 'Royal Wedding Cinema',
        desc: 'Sacred ceremonies, timeless heritage and pure celebration captured in vivid motion.',
        src: '/media/videos/wedding-film-01.mp4',
        poster: '/media/thumbnails/wedding-film-01-thumb.webp',
        dur: '0:48'
    },
    {
        id: 'wedding-02',
        title: 'Golden Hour Vows',
        tag: 'Intimate Ceremonies',
        desc: 'Gentle laughter, emotional vows and sunset rituals against the palace silhouette.',
        src: '/media/videos/wedding-film-02.mp4',
        poster: '/media/thumbnails/wedding-film-02-thumb.webp',
        dur: '0:45'
    },
    {
        id: 'event-03',
        title: 'The Grand Finale Celebration',
        tag: 'Grand Event & Gala',
        desc: 'Electrifying stage performances, red carpet entries and thunderous applause.',
        src: '/media/videos/event-film-03.mp4',
        poster: '/media/thumbnails/event-film-03-thumb.webp',
        dur: '1:05'
    },
    {
        id: 'food-01',
        title: 'Savora Cafe Experience',
        tag: 'Commercial & Sensory',
        desc: 'Artisan roast coffee, glowing candlelight, and curated gastronomic moments.',
        src: '/media/videos/food-film-01.mp4',
        poster: '/media/thumbnails/food-film-01-thumb.webp',
        dur: '0:22'
    },
    {
        id: 'film-02',
        title: 'Petal & Co. Grand Reveal',
        tag: 'Signature Wedding Reel',
        desc: 'Signature cinematic slow-motion highlights and intimate glances.',
        src: '/media/videos/film-02.mp4',
        poster: '/media/thumbnails/film-02-thumb.webp',
        dur: '0:17'
    }
]

export default function AutoplayCinemaSection() {
    const { ref, visible } = useFadeUp()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isMuted, setIsMuted] = useState(true)
    const [isPlaying, setIsPlaying] = useState(true)
    const videoRef = useRef<HTMLVideoElement>(null)

    const activeReel = FEATURED_AUTOPLAY_REELS[currentIndex]

    const toggleMute = () => {
        if (!videoRef.current) return
        videoRef.current.muted = !videoRef.current.muted
        setIsMuted(videoRef.current.muted)
    }

    const togglePlay = () => {
        if (!videoRef.current) return
        if (videoRef.current.paused) {
            videoRef.current.play()
            setIsPlaying(true)
        } else {
            videoRef.current.pause()
            setIsPlaying(false)
        }
    }

    const selectReel = (idx: number) => {
        setCurrentIndex(idx)
        setIsPlaying(true)
        if (videoRef.current) {
            videoRef.current.load()
            videoRef.current.play()
        }
    }

    return (
        <section id="cinema" ref={ref} style={{ background: '#080605', padding: '110px 0', position: 'relative', overflow: 'hidden' }}>
            {/* Top gold line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #C6A15B40, transparent)' }} />

            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
                
                {/* Header */}
                <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 48px' }}>
                    <div style={{ ...fadeStyle(visible, 0), display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#E8C982', display: 'inline-block', boxShadow: '0 0 10px #C6A15B' }} />
                        <span style={{ fontFamily: sans, fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.gold }}>
                            LIVE CINEMATIC SHOWCASE · AUTOPLAY
                        </span>
                    </div>
                    <h2 style={{ ...fadeStyle(visible, 0.08), fontFamily: serif, fontWeight: 300, fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', color: C.ivory, lineHeight: 1.15, marginBottom: 16 }}>
                        Where memories <em style={{ color: C.gold, fontStyle: 'italic' }}>continue to breathe.</em>
                    </h2>
                    <p style={{ ...fadeStyle(visible, 0.14), fontFamily: sans, fontSize: '0.8rem', color: C.muted, lineHeight: 1.8 }}>
                        Experience the raw emotional atmosphere, movement, and music behind our films.
                    </p>
                </div>

                {/* Main Video Cinema Container */}
                <div style={{
                    ...fadeStyle(visible, 0.2),
                    position: 'relative',
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: `1px solid ${C.bronze}`,
                    background: '#030303',
                    boxShadow: '0 30px 90px rgba(0,0,0,0.85)',
                    aspectRatio: '16/9',
                    maxHeight: '75vh',
                }}>
                    <video
                        ref={videoRef}
                        key={activeReel.src}
                        src={activeReel.src}
                        poster={activeReel.poster}
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            filter: 'brightness(0.92) contrast(1.04)',
                        }}
                    />

                    {/* Gradient overlays for cinematic depth and text contrast */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(3,3,3,0.92) 0%, rgba(3,3,3,0.3) 40%, rgba(3,3,3,0.2) 70%, rgba(3,3,3,0.6) 100%)',
                        pointerEvents: 'none',
                    }} />

                    {/* Top Status Bar */}
                    <div style={{
                        position: 'absolute',
                        top: 24,
                        left: 24,
                        right: 24,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        zIndex: 5,
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(3,3,3,0.6)', padding: '6px 14px', border: `1px solid ${C.bronze}80`, backdropFilter: 'blur(6px)' }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
                            <span style={{ fontFamily: sans, fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.champagne }}>
                                {activeReel.tag} · {activeReel.dur}
                            </span>
                        </div>

                        {/* Controls (Mute / Play) */}
                        <div style={{ display: 'flex', gap: 10 }}>
                            <button
                                onClick={toggleMute}
                                style={{
                                    background: isMuted ? 'rgba(3,3,3,0.7)' : 'rgba(198,161,91,0.3)',
                                    border: `1px solid ${isMuted ? C.bronze : C.gold}`,
                                    color: C.ivory,
                                    padding: '7px 14px',
                                    fontFamily: sans,
                                    fontSize: '0.58rem',
                                    letterSpacing: '0.16em',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    backdropFilter: 'blur(6px)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 6,
                                    transition: 'all 0.3s',
                                }}
                            >
                                {isMuted ? '🔇 SOUND OFF (CLICK TO UNMUTE)' : '🔊 SOUND ON'}
                            </button>

                            <button
                                onClick={togglePlay}
                                style={{
                                    background: 'rgba(3,3,3,0.7)',
                                    border: `1px solid ${C.bronze}`,
                                    color: C.gold,
                                    padding: '7px 14px',
                                    fontFamily: sans,
                                    fontSize: '0.58rem',
                                    letterSpacing: '0.16em',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    backdropFilter: 'blur(6px)',
                                    transition: 'all 0.3s',
                                }}
                            >
                                {isPlaying ? 'PAUSE' : 'PLAY'}
                            </button>
                        </div>
                    </div>

                    {/* Bottom Caption Overlay */}
                    <div style={{
                        position: 'absolute',
                        bottom: 28,
                        left: 28,
                        right: 28,
                        zIndex: 5,
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 20,
                    }}>
                        <div style={{ maxWidth: 540 }}>
                            <span style={{ fontFamily: sans, fontSize: '0.58rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: C.gold, display: 'block', marginBottom: 6 }}>
                                FEATURED REEL {currentIndex + 1} OF {FEATURED_AUTOPLAY_REELS.length}
                            </span>
                            <h3 style={{ fontFamily: serif, fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)', fontWeight: 300, color: C.ivory, marginBottom: 8 }}>
                                {activeReel.title}
                            </h3>
                            <p style={{ fontFamily: sans, fontSize: '0.78rem', color: C.muted, lineHeight: 1.6 }}>
                                {activeReel.desc}
                            </p>
                        </div>

                        {/* Reel Navigation Arrows */}
                        <div style={{ display: 'flex', gap: 10 }}>
                            <button
                                onClick={() => selectReel((currentIndex - 1 + FEATURED_AUTOPLAY_REELS.length) % FEATURED_AUTOPLAY_REELS.length)}
                                style={{
                                    width: 44,
                                    height: 44,
                                    border: `1px solid ${C.bronze}`,
                                    background: 'rgba(3,3,3,0.8)',
                                    color: C.gold,
                                    cursor: 'pointer',
                                    fontSize: '1.1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.25s',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.borderColor = C.gold)}
                                onMouseLeave={e => (e.currentTarget.style.borderColor = C.bronze)}
                            >
                                ←
                            </button>
                            <button
                                onClick={() => selectReel((currentIndex + 1) % FEATURED_AUTOPLAY_REELS.length)}
                                style={{
                                    width: 44,
                                    height: 44,
                                    border: `1px solid ${C.bronze}`,
                                    background: 'rgba(3,3,3,0.8)',
                                    color: C.gold,
                                    cursor: 'pointer',
                                    fontSize: '1.1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.25s',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.borderColor = C.gold)}
                                onMouseLeave={e => (e.currentTarget.style.borderColor = C.bronze)}
                            >
                                →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Playlist Selector Pills */}
                <div style={{
                    ...fadeStyle(visible, 0.28),
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 12,
                    marginTop: 20,
                }}>
                    {FEATURED_AUTOPLAY_REELS.map((item, idx) => (
                        <button
                            key={item.id}
                            onClick={() => selectReel(idx)}
                            style={{
                                textAlign: 'left',
                                padding: '14px 18px',
                                background: currentIndex === idx ? 'rgba(198,161,91,0.1)' : 'rgba(23,17,13,0.5)',
                                border: `1px solid ${currentIndex === idx ? C.gold : C.bronze + '60'}`,
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                            }}
                            onMouseEnter={e => {
                                if (currentIndex !== idx) {
                                    (e.currentTarget as HTMLElement).style.borderColor = C.gold + '60'
                                }
                            }}
                            onMouseLeave={e => {
                                if (currentIndex !== idx) {
                                    (e.currentTarget as HTMLElement).style.borderColor = C.bronze + '60'
                                }
                            }}
                        >
                            <span style={{ fontFamily: sans, fontSize: '0.52rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.gold, display: 'block', marginBottom: 4 }}>
                                0{idx + 1} · {item.dur}
                            </span>
                            <span style={{ fontFamily: serif, fontSize: '0.98rem', color: currentIndex === idx ? C.champagne : C.ivory, display: 'block' }}>
                                {item.title}
                            </span>
                        </button>
                    ))}
                </div>

            </div>

            {/* Bottom separator */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #C6A15B40, transparent)' }} />
        </section>
    )
}
