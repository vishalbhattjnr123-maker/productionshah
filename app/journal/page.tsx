import type { Metadata } from 'next'
import Link from 'next/link'
import { ARTICLES } from '@/lib/journalData'

export const metadata: Metadata = {
  title: 'Journal — Notes on Love, Light & Wedding Cinema | SHAH SCENES',
  description: 'Expert wedding planning advice, photography guides, destination celebration ideas, and timeline planning from SHAH SCENES.',
  alternates: {
    canonical: 'https://shahscenes.com/journal',
  },
}

export default function JournalPage() {
  const C = {
    obsidian: '#030303',
    espresso: '#17110D',
    bronze: '#4A2C1D',
    gold: '#C6A15B',
    champagne: '#E8C982',
    ivory: '#EDE2D0',
    muted: '#B8AA98',
  }

  return (
    <div style={{ background: C.obsidian, minHeight: '100vh', color: C.ivory, fontFamily: "'Manrope', system-ui, sans-serif" }}>
      {/* Top Header */}
      <header
        style={{
          borderBottom: `1px solid ${C.bronze}60`,
          padding: '24px 0',
          background: 'rgba(8,6,5,0.85)',
          backdropFilter: 'blur(16px)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <img
              src="/logo.webp"
              alt="Shah Scenes Emblem"
              width={38}
              height={38}
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid rgba(198,161,91,0.5)',
              }}
            />
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.25rem',
                letterSpacing: '0.18em',
                color: C.ivory,
              }}
            >
              SHAH SCENES
            </span>
          </Link>

          <Link
            href="/"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.62rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: C.gold,
              textDecoration: 'none',
              border: `1px solid ${C.bronze}`,
              padding: '8px 18px',
              transition: 'all 0.3s ease',
            }}
          >
            ← BACK TO HOME
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 32px 100px' }}>
        <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 64px' }}>
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.62rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: C.gold,
              display: 'block',
              marginBottom: 12,
            }}
          >
            Notes on Love, Light &amp; Artistry
          </span>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
              color: C.ivory,
              lineHeight: 1.15,
              marginBottom: 18,
            }}
          >
            The Wedding <em style={{ color: C.gold, fontStyle: 'italic' }}>Journal.</em>
          </h1>

          <div style={{ width: 56, height: 1, background: `linear-gradient(90deg, ${C.gold}, ${C.champagne})`, margin: '0 auto 24px' }} />

          <p style={{ fontSize: '0.84rem', color: C.muted, lineHeight: 1.85 }}>
            Thoughtful essays, planning guides, and photographic insights for couples seeking timeless royal celebrations.
          </p>
        </div>

        {/* Articles Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 40 }}>
          {ARTICLES.map(a => (
            <article
              key={a.id}
              style={{
                border: `1px solid ${C.bronze}60`,
                background: C.espresso,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                  }}
                />
              </div>

              <div style={{ padding: '28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '0.55rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: C.gold,
                    display: 'block',
                    marginBottom: 8,
                  }}
                >
                  {a.cat} · {a.date}
                </span>

                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 400,
                    fontSize: '1.3rem',
                    color: C.ivory,
                    lineHeight: 1.35,
                    marginBottom: 12,
                  }}
                >
                  {a.title}
                </h2>

                <p style={{ fontSize: '0.78rem', color: C.muted, lineHeight: 1.7, flex: 1, marginBottom: 20 }}>
                  {a.excerpt}
                </p>

                <Link
                  href={`/journal/${a.slug}/`}
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: C.gold,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  READ FULL ESSAY →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Footer minimal */}
      <footer style={{ borderTop: `1px solid ${C.bronze}40`, padding: '28px 0', textAlign: 'center', fontSize: '0.68rem', color: C.muted }}>
        <p>© {new Date().getFullYear()} SHAH SCENES. All Rights Reserved. Luxury Wedding &amp; Portrait Photography.</p>
      </footer>
    </div>
  )
}
