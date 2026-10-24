import '../styles/animation.css'
import type { CSSProperties, ReactNode } from "react";

const defaults = {
    color1: "#1e3cc8",
    color2: "#06081e",
    color3: "#96d7ff",
    speed: 0.5,
    scale: 2,
    noise: 0.7,
};

type GlassFoldProps = {
    children?: ReactNode;
    color1?: string;
    color2?: string;
    color3?: string;
    speed?: number;
    scale?: number;
    noise?: number;
    className?: string;
};

export default function GlassFold({
    children,
    color1 = defaults.color1,
    color2 = defaults.color2,
    color3 = defaults.color3,
    speed = defaults.speed,
    scale = defaults.scale,
    noise = defaults.noise,
    className = "",
}: GlassFoldProps) {
    const durationSeconds = Math.max(0.1, 12 / Math.max(0.1, speed));

    return (
        <div
            className={`glass-fold ${className}`}
            style={{
                "--color-1": color1,
                "--color-2": color2,
                "--color-3": color3,
                "--scale": scale,
                "--duration": `${durationSeconds}s`,
                "--duration-two": `${durationSeconds * 1.3}s`,
                "--duration-three": `${durationSeconds * 1.7}s`,
                "--duration-reflection": `${durationSeconds * 1.2}s`,
                "--duration-glow": `${durationSeconds * 1.5}s`,
                "--noise": noise,
            } as CSSProperties}
        >
            <div className="glass-fold__glow" />

            <svg
                className="glass-fold__svg"
                viewBox="0 0 1200 800"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
            >
                <defs>
                    <linearGradient id="fold-blue" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={color1} />
                        <stop offset="45%" stopColor={color3} />
                        <stop offset="100%" stopColor={color2} />
                    </linearGradient>

                    <linearGradient id="fold-light" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={color2} />
                        <stop offset="40%" stopColor={color3} />
                        <stop offset="70%" stopColor={color1} />
                        <stop offset="100%" stopColor={color2} />
                    </linearGradient>

                    <linearGradient id="fold-dark" x1="0" y1="0" x2="0.9" y2="1">
                        <stop offset="0%" stopColor={color3} stopOpacity="0.8" />
                        <stop offset="35%" stopColor={color1} stopOpacity="0.65" />
                        <stop offset="100%" stopColor={color2} stopOpacity="0.95" />
                    </linearGradient>

                    <filter id="fold-blur" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="22" />
                    </filter>

                    <filter id="fold-noise">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.7"
                            numOctaves="2"
                            seed="8"
                        />
                        <feColorMatrix type="saturate" values="0" />
                        <feComponentTransfer>
                            <feFuncA type="table" tableValues="0 0.13" />
                        </feComponentTransfer>
                        <feBlend in="SourceGraphic" mode="soft-light" />
                    </filter>
                </defs>

                {/* Soft background lighting */}
                <ellipse
                    cx="600"
                    cy="400"
                    rx="520"
                    ry="350"
                    fill={color1}
                    opacity="0.3"
                    filter="url(#fold-blur)"
                />

                {/* Main flowing glass surface */}
                <g className="fold-layer fold-layer--one">
                    <path
                        d="M-150 150 C150 -100 350 650 650 280 S1000 50 1350 280
               L1350 650 C1000 420 800 900 500 620 S100 450 -150 750 Z"
                        fill="url(#fold-blue)"
                        opacity="0.8"
                    />
                </g>

                {/* Translucent central fold */}
                <g className="fold-layer fold-layer--two">
                    <path
                        d="M-150 450 C150 100 400 1000 650 450 S1000 200 1350 100
               L1350 350 C1000 500 850 650 600 700 S150 350 -150 650 Z"
                        fill="url(#fold-light)"
                        opacity="0.7"
                    />
                </g>

                {/* Deep blue shadow */}
                <g className="fold-layer fold-layer--three">
                    <path
                        d="M-150 550 C100 200 350 450 550 350 S900 700 1350 300
               L1350 900 L-150 900 Z"
                        fill="url(#fold-dark)"
                        opacity="0.85"
                    />
                </g>

                {/* Thin glass reflection */}
                <g className="fold-layer fold-layer--four">
                    <path
                        d="M-100 250 C200 50 350 700 650 400 S1050 150 1300 300"
                        fill="none"
                        stroke={color3}
                        strokeWidth="3"
                        strokeOpacity="0.75"
                    />

                    <path
                        d="M-100 280 C200 80 350 730 650 430 S1050 180 1300 330"
                        fill="none"
                        stroke="white"
                        strokeWidth="1"
                        strokeOpacity="0.45"
                    />
                </g>
            </svg>

            {/* Atmospheric light */}
            <div className="glass-fold__atmosphere" />

            {/* Fine texture */}
            <div className="glass-fold__texture" />

            <div className="glass-fold__content">{children}</div>
        </div>
    );
}
