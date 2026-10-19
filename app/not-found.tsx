import Link from 'next/link'

export default function NotFound() {
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
    <div
      style={{
        background: C.obsidian,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        textAlign: 'center',
        fontFamily: "'Manrope', system-ui, sans-serif",
        color: C.ivory,
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <img
          src="/logo.webp"
          alt="Shah Scenes Emblem"
          width={64}
          height={64}
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            objectFit: 'cover',
            border: '1px solid rgba(198,161,91,0.5)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
            display: 'block',
            margin: '0 auto',
          }}
        />
      </div>

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
        Page Not Found · 404
      </span>

      <h1
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(2.6rem, 5vw, 4.4rem)',
          fontWeight: 300,
          color: C.ivory,
          lineHeight: 1.15,
          marginBottom: 16,
        }}
      >
        This moment seems to have <br />
        <em style={{ color: C.gold, fontStyle: 'italic' }}>drifted away.</em>
      </h1>

      <div
        style={{
          width: 56,
          height: 1,
          background: `linear-gradient(90deg, ${C.gold}, ${C.champagne})`,
          margin: '0 auto 28px',
        }}
      />

      <p
        style={{
          fontSize: '0.85rem',
          color: C.muted,
          maxWidth: 440,
          lineHeight: 1.85,
          marginBottom: 36,
        }}
      >
        The page you are looking for has been moved, renamed, or does not exist. Allow us to guide you back to our visual stories.
      </p>

      <Link
        href="/"
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#030303',
          background: C.gold,
          padding: '14px 32px',
          textDecoration: 'none',
          fontWeight: 600,
          transition: 'background 0.3s',
        }}
      >
        RETURN TO HOME
      </Link>
    </div>
  )
}
