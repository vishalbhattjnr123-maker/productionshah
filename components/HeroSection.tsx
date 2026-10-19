'use client'

import { useEffect, useRef, useState } from 'react'

const HERO_VIDEOS = [
    {
        id: 'vid-1',
        src: '/media/videos/new-film-01.mp4',
        poster: '/media/thumbnails/new-film-01-thumb.webp',
        title: 'Royal Bridal Splendor',
        location: 'Heritage Nuptials',
    },
    {
        id: 'vid-2',
        src: '/media/videos/new-film-02.mp4',
        poster: '/media/thumbnails/new-film-02-thumb.webp',
        title: 'The Grand Mandap Entry',
        location: 'Palace Courtyard Symphony',
    },
    {
        id: 'vid-3',
        src: '/media/videos/new-film-03.mp4',
        poster: '/media/thumbnails/new-film-03-thumb.webp',
        title: 'A Garden Odyssey of Love',
        location: 'Destination Celebration',
    },
]

export default function HeroSection() {
    const lineRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [currentIdx, setCurrentIdx] = useState(0)
    const [isMuted, setIsMuted] = useState(true)

    const activeVid = HERO_VIDEOS[currentIdx]

    useEffect(() => {
        const timer = setTimeout(() => {
            if (lineRef.current) lineRef.current.style.opacity = '1'
        }, 400)
        return () => clearTimeout(timer)
    }, [])

    // Ensure playback triggers reliably when switching videos
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted
            videoRef.current.play().catch(() => {})
        }
    }, [currentIdx, isMuted])

    const handleVideoEnded = () => {
        // Continuous 3-video loop
        setCurrentIdx(prev => (prev + 1) % HERO_VIDEOS.length)
    }

    const toggleHeroSound = () => {
        if (!videoRef.current) return
        videoRef.current.muted = !videoRef.current.muted
        setIsMuted(videoRef.current.muted)
    }

    return (
        <section
            id="home"
            style={{
                position: 'relative',
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                paddingTop: 'clamp(110px, 14vh, 150px)',
                paddingBottom: 'clamp(44px, 6vh, 64px)',
                boxSizing: 'border-box',
                overflow: 'hidden',
                background: '#030303',
            }}
        >

            {/* ── Background Video Container with 3 Seamless Looping Videos ── */}
            <div style={{
                position: 'absolute', inset: 0,
                background: '#0d0a08',
                overflow: 'hidden',
            }}>
                <video
                    ref={videoRef}
                    key={activeVid.src}
                    src={activeVid.src}
                    poster={activeVid.poster}
                    autoPlay
                    muted={isMuted}
                    playsInline
                    preload="auto"
                    onEnded={handleVideoEnded}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.84,
                        filter: 'brightness(1.04) contrast(1.05)',
                        transition: 'opacity 0.6s ease',
                    }}
                />

                {/* Subtle luxury grain accent */}
                <div style={{
                    position: 'absolute', inset: 0, opacity: 0.03,
                    backgroundImage: 'linear-gradient(#E8C982 1px, transparent 1px), linear-gradient(90deg, #E8C982 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                    pointerEvents: 'none',
                }} />

                {/* Soft Vignette Overlays (Clear center & right, gentle shadow on left for crisp text contrast) */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, rgba(3,3,3,0.85) 0%, rgba(3,3,3,0.52) 36%, rgba(3,3,3,0.12) 70%, transparent 100%)',
                    pointerEvents: 'none',
                }} />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, #030303 0%, rgba(3,3,3,0.4) 30%, transparent 60%)',
                    pointerEvents: 'none',
                }} />
            </div>

            {/* ── Content ── */}
            <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: '0 32px', width: '100%' }}>

                {/* Gold eyebrow badge */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#C6A15B', display: 'inline-block', boxShadow: '0 0 10px #C6A15B' }} />
                    <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#E8C982' }}>
                        ROYAL WEDDING &amp; EDITORIAL CINEMA
                    </span>
                </div>

                {/* Animated gold line */}
                <div ref={lineRef} style={{
                    width: 56, height: 1, background: 'linear-gradient(90deg, #C6A15B, #E8C982)',
                    marginBottom: 26, opacity: 0, transition: 'opacity 0.8s ease 0.5s',
                }} />

                {/* Headline */}
                <h1 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(3.4rem, 8.5vw, 6.8rem)',
                    fontWeight: 300, lineHeight: 1.04,
                    color: '#EDE2D0', marginBottom: 22,
                    letterSpacing: '-0.01em',
                }}>
                    Where Grandeur Meets<br />
                    <em style={{ color: '#C6A15B', fontStyle: 'italic', fontWeight: 300 }}>Unfiltered Soul.</em>
                </h1>

                {/* Supporting text */}
                <p style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '0.88rem', letterSpacing: '0.04em',
                    color: '#D4C7B5', maxWidth: 480,
                    marginBottom: 36, lineHeight: 1.85,
                }}>
                    Handcrafted royal wedding heirlooms and bespoke cinematic films for couples who celebrate love with intention, passion, and timeless artistry.
                </p>

                {/* CTAs */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
                    <a href="#portfolio"
                        onClick={e => { e.preventDefault(); document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }) }}
                        style={{
                            fontFamily: "'Manrope', sans-serif",
                            fontSize: '0.65rem', letterSpacing: '0.2em',
                            textTransform: 'uppercase', color: '#030303',
                            background: '#C6A15B', padding: '15px 30px',
                            border: '1px solid #C6A15B', cursor: 'pointer',
                            textDecoration: 'none', transition: 'all 0.3s',
                            display: 'inline-block',
                            fontWeight: 600,
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#E8C982'; (e.currentTarget as HTMLElement).style.borderColor = '#E8C982' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#C6A15B'; (e.currentTarget as HTMLElement).style.borderColor = '#C6A15B' }}
                    >
                        EXPLORE PORTFOLIO
                    </a>
                    <a href="#founder"
                        onClick={e => { e.preventDefault(); document.querySelector('#founder')?.scrollIntoView({ behavior: 'smooth' }) }}
                        style={{
                            fontFamily: "'Manrope', sans-serif",
                            fontSize: '0.65rem', letterSpacing: '0.2em',
                            textTransform: 'uppercase', color: '#EDE2D0',
                            background: 'rgba(3,3,3,0.4)', padding: '15px 30px',
                            border: '1px solid rgba(237,226,208,0.35)', cursor: 'pointer',
                            textDecoration: 'none', transition: 'all 0.3s',
                            display: 'inline-block',
                            backdropFilter: 'blur(6px)',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C6A15B'; (e.currentTarget as HTMLElement).style.color = '#C6A15B' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(237,226,208,0.35)'; (e.currentTarget as HTMLElement).style.color = '#EDE2D0' }}
                    >
                        MEET DAKSH SHAH
                    </a>
                </div>

                {/* Trust Proof Strip & 3-Video Switcher */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    gap: 24,
                    marginTop: 40,
                    paddingTop: 28,
                    borderTop: '1px solid rgba(198,161,91,0.22)',
                }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px 36px' }}>
                        <div>
                            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: '#E8C982', display: 'block', lineHeight: 1 }}>500+</span>
                            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.52rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#B8AA98', marginTop: 4, display: 'block' }}>Royal Unions Documented</span>
                        </div>
                        <div style={{ width: 1, height: 26, background: 'rgba(198,161,91,0.2)' }} />
                        <div>
                            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: '#E8C982', display: 'block', lineHeight: 1 }}>VOGUE &amp; WMG</span>
                            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.52rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#B8AA98', marginTop: 4, display: 'block' }}>Featured In Leading Press</span>
                        </div>
                        <div style={{ width: 1, height: 26, background: 'rgba(198,161,91,0.2)' }} />
                        <div>
                            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: '#E8C982', display: 'block', lineHeight: 1 }}>PAN-INDIA &amp; GLOBAL</span>
                            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.52rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#B8AA98', marginTop: 4, display: 'block' }}>Destination Coverage</span>
                        </div>
                    </div>

                    {/* 3 Video Loop Switcher Dots */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.52rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C6A15B' }}>
                            SCENE {currentIdx + 1}/3
                        </span>
                        {HERO_VIDEOS.map((v, idx) => (
                            <button
                                key={v.id}
                                onClick={() => setCurrentIdx(idx)}
                                title={v.title}
                                style={{
                                    width: currentIdx === idx ? 28 : 10,
                                    height: 4,
                                    borderRadius: 2,
                                    background: currentIdx === idx ? '#E8C982' : 'rgba(232,201,130,0.3)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.35s ease',
                                    padding: 0,
                                }}
                            />
                        ))}
                    </div>
                </div>

            </div>

            {/* ── Sound Toggle & Scroll indicator ── */}
            <div style={{
                position: 'absolute', bottom: 36, right: 36, zIndex: 15,
                display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16,
            }}>
                {/* Floating Sound Toggle */}
                <button
                    onClick={toggleHeroSound}
                    style={{
                        background: isMuted ? 'rgba(3,3,3,0.7)' : 'rgba(198,161,91,0.25)',
                        border: `1px solid ${isMuted ? 'rgba(198,161,91,0.35)' : '#C6A15B'}`,
                        color: '#EDE2D0',
                        padding: '8px 16px',
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: '0.55rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        transition: 'all 0.3s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#C6A15B')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = isMuted ? 'rgba(198,161,91,0.35)' : '#C6A15B')}
                >
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: isMuted ? '#999' : '#4ade80' }} />
                    {isMuted ? 'UNMUTE CINEMA' : 'SOUND ACTIVE'}
                </button>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginRight: 8 }}>
                    <span style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: '0.48rem', letterSpacing: '0.28em',
                        textTransform: 'uppercase', color: '#C6A15B',
                        writingMode: 'vertical-rl', marginBottom: 4,
                    }}>
                        Scroll
                    </span>
                    <div className="scroll-line" style={{
                        width: 1, height: 42,
                        background: 'linear-gradient(to bottom, #C6A15B, transparent)',
                    }} />
                </div>
            </div>
        </section>
    )
}
