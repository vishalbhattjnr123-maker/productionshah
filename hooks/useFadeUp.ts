'use client'

import { useEffect, useRef, useState } from 'react'

export function useFadeUp(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
            { threshold }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [threshold])

    return { ref, visible }
}

// Inline style generator for staggered fade-up
export function fadeStyle(visible: boolean, delay = 0): React.CSSProperties {
    return {
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
    }
}
