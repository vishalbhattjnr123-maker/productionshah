import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ARTICLES } from '@/lib/journalData'

export function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = ARTICLES.find((a) => a.slug === slug)
  if (!article) return {}

  return {
    title: `${article.title} — SHAH SCENES Journal`,
    description: article.excerpt,
    alternates: {
      canonical: `https://shahscenes.com/journal/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = ARTICLES.find((a) => a.slug === slug)
  if (!article) notFound()

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
      {/* Header */}
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
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
            href="/journal/"
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
            ← ALL ARTICLES
          </Link>
        </div>
      </header>

      {/* Article Container */}
      <article style={{ maxWidth: 840, margin: '0 auto', padding: '64px 32px 100px' }}>
        <div style={{ marginBottom: 16 }}>
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.62rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: C.gold,
              display: 'block',
            }}
          >
            {article.cat} · {article.date}
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 300,
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
            color: C.ivory,
            lineHeight: 1.15,
            marginBottom: 24,
          }}
        >
          {article.title}
        </h1>

        <div style={{ width: 56, height: 1, background: `linear-gradient(90deg, ${C.gold}, ${C.champagne})`, marginBottom: 36 }} />

        {/* Feature Image */}
        <div
          style={{
            aspectRatio: '16/9',
            border: `1px solid ${C.bronze}`,
            overflow: 'hidden',
            marginBottom: 48,
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
          }}
        >
          <img
            src={article.image}
            alt={article.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Body Paragraphs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontSize: '0.92rem', color: C.muted, lineHeight: 1.95 }}>
          {article.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Commission CTA Block */}
        <div
          style={{
            marginTop: 64,
            padding: '40px 32px',
            background: C.espresso,
            border: `1px solid ${C.bronze}`,
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '0.58rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: C.gold, display: 'block', marginBottom: 8 }}>
            Commission Your Celebration
          </span>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: C.ivory, fontWeight: 300, marginBottom: 12 }}>
            Ready to craft your legacy?
          </h3>
          <p style={{ fontSize: '0.8rem', color: C.muted, maxWidth: 500, margin: '0 auto 24px', lineHeight: 1.7 }}>
            We accept a strictly limited number of wedding commissions each season. Connect with Daksh Shah to discuss your dates and vision.
          </p>
          <Link
            href="/#enquiry"
            style={{
              display: 'inline-block',
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.64rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#030303',
              background: C.gold,
              padding: '13px 28px',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            BEGIN YOUR ENQUIRY
          </Link>
        </div>
      </article>

      {/* Footer minimal */}
      <footer style={{ borderTop: `1px solid ${C.bronze}40`, padding: '28px 0', textAlign: 'center', fontSize: '0.68rem', color: C.muted }}>
        <p>© {new Date().getFullYear()} SHAH SCENES. All Rights Reserved. Luxury Wedding &amp; Portrait Photography.</p>
      </footer>
    </div>
  )
}
