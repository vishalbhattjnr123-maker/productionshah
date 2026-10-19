import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — SHAH SCENES',
  description: 'Privacy Policy and client data protection guidelines for SHAH SCENES luxury wedding photography and films.',
  alternates: {
    canonical: 'https://shahscenes.com/privacy',
  },
}

export default function PrivacyPage() {
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
      <main style={{ maxWidth: 840, margin: '0 auto', padding: '72px 32px 100px' }}>
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
            Legal &amp; Client Trust
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 300,
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
            color: C.ivory,
            lineHeight: 1.15,
            marginBottom: 20,
          }}
        >
          Privacy <em style={{ color: C.gold, fontStyle: 'italic' }}>Policy</em>
        </h1>

        <div style={{ width: 56, height: 1, background: `linear-gradient(90deg, ${C.gold}, ${C.champagne})`, marginBottom: 48 }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 36, lineHeight: 1.85, fontSize: '0.88rem', color: C.muted }}>
          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.4rem', color: C.ivory, marginBottom: 12, fontWeight: 400 }}>
              1. Our Commitment to Your Privacy
            </h2>
            <p>
              At <strong>SHAH SCENES</strong>, we recognize that planning a wedding and commissioning bespoke photography or cinematography is an intensely personal and sacred journey. We treat the confidentiality of your personal details, celebration schedules, guest information, and visual media with the highest level of discretion, professionalism, and security.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.4rem', color: C.ivory, marginBottom: 12, fontWeight: 400 }}>
              2. Information We Collect
            </h2>
            <p style={{ marginBottom: 12 }}>
              When you interact with our website or submit an inquiry through our digital concierge form, WhatsApp, or telephone, we may collect:
            </p>
            <ul style={{ paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>Contact details: Name, email address, phone number, and location.</li>
              <li>Celebration details: Wedding dates, ceremony venues, estimated budget, and service preferences.</li>
              <li>Communications: Messages, creative visions, and correspondence shared during consultations.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.4rem', color: C.ivory, marginBottom: 12, fontWeight: 400 }}>
              3. Purpose of Processing
            </h2>
            <p style={{ marginBottom: 12 }}>
              Your information is exclusively used for the following purposes:
            </p>
            <ul style={{ paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>Responding to your commission inquiry and checking calendar availability.</li>
              <li>Scheduling introductory video consultations and customized wedding proposals.</li>
              <li>Drafting photography and cinematography commissioning agreements.</li>
              <li>Coordinating logistics and delivering your private high-resolution online galleries and master films.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.4rem', color: C.ivory, marginBottom: 12, fontWeight: 400 }}>
              4. Visual Media &amp; Portfolio Publishing
            </h2>
            <p>
              We celebrate love stories through intentional artistry. Prior to featuring any client photograph or cinematic reel on our public portfolio, social channels, or publication features, we honor and respect client preferences. If your wedding or private family celebration requires strict privacy or non-disclosure (NDA), please inform us during your initial consultation so that customized privacy stipulations can be integrated into your commission agreement.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.4rem', color: C.ivory, marginBottom: 12, fontWeight: 400 }}>
              5. Third-Party Sharing &amp; Data Security
            </h2>
            <p>
              We never sell, rent, or trade your personal information to third-party advertisers or data brokers. Information is only shared with trusted direct team members and secure cloud infrastructure providers (such as encrypted cloud storage and gallery delivery platforms) strictly necessary for fulfilling our services.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.4rem', color: C.ivory, marginBottom: 12, fontWeight: 400 }}>
              6. Contact Our Concierge
            </h2>
            <p style={{ marginBottom: 14 }}>
              If you have any questions regarding your data or privacy preferences, our studio concierge is readily available:
            </p>
            <div style={{ background: C.espresso, border: `1px solid ${C.bronze}`, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p><strong style={{ color: C.champagne }}>SHAH SCENES Studio</strong></p>
              <p>Phone: <a href="tel:+918146486537" style={{ color: C.gold, textDecoration: 'none' }}>+91 81464 86537</a></p>
              <p>WhatsApp: <a href="https://wa.me/918146486537" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', textDecoration: 'none' }}>+91 81464 86537</a></p>
              <p>Website: <a href="https://shahscenes.com" style={{ color: C.ivory, textDecoration: 'none' }}>https://shahscenes.com</a></p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer minimal */}
      <footer style={{ borderTop: `1px solid ${C.bronze}40`, padding: '28px 0', textAlign: 'center', fontSize: '0.68rem', color: C.muted }}>
        <p>© {new Date().getFullYear()} SHAH SCENES. All Rights Reserved. Luxury Wedding &amp; Portrait Photography.</p>
      </footer>
    </div>
  )
}
