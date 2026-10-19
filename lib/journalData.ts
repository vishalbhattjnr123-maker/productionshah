export interface Article {
  id: number
  cat: string
  title: string
  date: string
  slug: string
  image: string
  excerpt: string
  content: string[]
}

export const ARTICLES: Article[] = [
  {
    id: 1,
    cat: 'Guide',
    title: 'How to Choose Your Wedding Photographer',
    date: 'September 2024',
    slug: 'how-to-choose-wedding-photographer',
    image: '/media/images/wedding-moment-01.webp',
    excerpt: 'Key questions, stylistic considerations, and artistic chemistry to look for when choosing the guardians of your wedding memories.',
    content: [
      'Choosing the artist who documents your wedding is among the most intimate and consequential decisions of your entire celebration. While floral installations wither and catering menus are savored for an evening, your wedding photographs and cinematic films remain as generational heirlooms that will speak to your grandchildren decades from now.',
      'Begin by identifying your aesthetic alignment. Do you gravitate toward painterly, natural-light fine art, high-fashion editorial portraiture, or raw documentary photojournalism? At SHAH SCENES, we believe true luxury lies at the intersection of haute-couture composition and unscripted emotional authenticity.',
      'Beyond reviewing curated highlight reels on social media, always ask to view full gallery deliveries from complete wedding weekends. This demonstrates how a photographer navigates unpredictable lighting conditions, intimate family rituals, and the fast-paced energy of late-night sangeet celebrations.',
      'Most importantly, consider personal chemistry. Your lead photographer and cinematographer will be standing just feet away from you during your most vulnerable, sacred vows and spontaneous tears. Trusting their presence enables you to let go, stay fully immersed in the moment, and allow genuine memories to unfold effortlessly.'
    ]
  },
  {
    id: 2,
    cat: 'Planning',
    title: 'A Guide to Planning Your Intimate Couple Session',
    date: 'August 2024',
    slug: 'couple-session-guide',
    image: '/media/images/wedding-moment-03.webp',
    excerpt: 'How to create space for serene, unhurried fine-art couple portraits amidst the whirlwind of Indian wedding ceremonies.',
    content: [
      'The multi-day whirlwind of ceremonies, family greetings, and celebrations can leave couples with little quiet time to simply absorb the magnitude of their union. An intimate couple portrait session offers an oasis of calm.',
      'Timing is everything. Golden hour — the 45 to 60 minutes leading up to sunset — provides the gentle, painterly light that flatters couture fabrics, jewellery, and skin tones. We always work closely with wedding planners to carve out this dedicated window on your timeline.',
      'Choose a location with architectural drama or natural serenity: a palace courtyard bathed in twilight, stone colonnades, or a tranquil terrace overlooking the water. When you step into an environment of quiet grandeur, artificial posing falls away, replaced by genuine tenderness and regal poise.'
    ]
  },
  {
    id: 3,
    cat: 'Timeline',
    title: 'Wedding Photography Timeline: A Complete Guide',
    date: 'July 2024',
    slug: 'wedding-photography-timeline',
    image: '/media/images/cinematic-landscape-01.webp',
    excerpt: 'Step-by-step guidance on structuring your ceremonies to ensure every ritual, heirloom detail, and candid glance is captured flawlessly.',
    content: [
      'A seamless wedding film and photography coverage relies heavily on thoughtful scheduling. When schedules are rushed, anxiety inevitably registers in subtle facial expressions and body language.',
      'For bridal and groom getting-ready suites, allow at least 60 to 90 minutes after makeup and wardrobe styling are complete. This allows for quiet, dignified bridal portraits, jewelry close-ups, and spontaneous moments with parents and siblings before the procession begins.',
      'During the pheras and mandap rituals, discuss sightlines with your officiant so that sacred fire, garlands, and vows can be filmed from multiple cinematic angles without intrusion. Thoughtful planning guarantees that your visual legacy is documented with breathtaking depth.'
    ]
  },
  {
    id: 4,
    cat: 'Destination',
    title: 'Destination Wedding Photography Ideas',
    date: 'June 2024',
    slug: 'destination-wedding-photography-ideas',
    image: '/media/images/story-07.webp',
    excerpt: 'Embracing local architectural heritage, dramatic landscapes, and multi-day celebrations across royal palatial destinations.',
    content: [
      'Destination celebrations offer an unparalleled canvas for cinematic visual storytelling. Whether against the lake palaces of Udaipur, the sandstone ramparts of Jodhpur, or seaside villas in Goa and Amalfi, your surroundings become an essential character in your love story.',
      'Incorporate the architectural genius of your venue. Symmetrical archways, intricate jharokhas, and ambient candlelit pavilions elevate wedding frames into royal historical tableaux.',
      'We recommend documenting the entire journey — from welcoming cocktail sundowners to late-night afterparties. The full three-day arc captures the collective joy and camaraderie of your closest friends and families coming together from across the globe.'
    ]
  }
]
