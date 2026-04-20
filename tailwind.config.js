/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                // Satoshi is shown in the reference image; fall back to Inter
                sans: ['Satoshi', 'Inter', 'sans-serif'],
            },
            colors: {
                // ── Packgeon brand palette ────────────────────────────
                background: '#FAF0E8',   // warm cream page bg
                surface:    '#FFFFFF',   // card surfaces
                accent: {
                    DEFAULT: '#F36929',  // brand orange
                    light:   '#F7894E',  // lighter tint
                    dark:    '#D4521A',  // pressed / hover
                },
                secondary: {
                    DEFAULT: '#6B8C2A',  // olive green (badges, tags)
                    light:   '#8CAD3E',
                    dark:    '#4E6820',
                },
                charcoal:  '#1E1A17',   // asphalt / primary text
                muted:     '#8C7B6E',   // warm gray / secondary text
            },
            boxShadow: {
                card:       '0 2px 16px rgba(243,105,41,0.08)',
                'card-hover':'0 8px 32px rgba(243,105,41,0.18)',
            },
        },
    },
    plugins: [],
}
