import type { ReactNode } from "react"
import { Link } from "react-router-dom"

function Icon({ children, className = "h-5 w-5" }: { children: ReactNode; className?: string }) {
    return (
        <svg
            aria-hidden="true"
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {children}
        </svg>
    )
}

const capabilities = [
    {
        number: "01",
        title: "Chat with any model",
        description:
            "Move between available language models without moving between provider dashboards. Find the right fit for the task at hand.",
        icon: (
            <>
                <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H6l-3 2v-6.5a7.5 7.5 0 1 1 17-3Z" />
                <path d="M8 11h8M8 14h5" />
            </>
        ),
    },
    {
        number: "02",
        title: "Make images",
        description:
            "Turn a prompt into a visual idea with image-generation models, all from the same place you chat.",
        icon: (
            <>
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
            </>
        ),
    },
    {
        number: "03",
        title: "Explore video",
        description:
            "Bring your ideas to video-generation models and keep creative work alongside your other AI workflows.",
        icon: (
            <>
                <rect x="3" y="5" width="13" height="14" rx="2" />
                <path d="m16 10 5-3v10l-5-3" />
            </>
        ),
    },
]

const steps = [
    { number: "01", title: "Connect", text: "Add API keys from the providers you use." },
    { number: "02", title: "Choose", text: "Pick an available model for your task." },
    { number: "03", title: "Create", text: "Get a consistent, usable result in SmilyAI." },
]

export default function About() {
    return (
        <main className="relative z-10 min-h-screen px-5 pb-20 pt-28 text-white sm:px-8 sm:pt-32">
            <div className="mx-auto max-w-6xl">
                <section className="grid items-center gap-12 pb-20 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-28">
                    <div>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#8FE3B0]/25 bg-[#8FE3B0]/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-[#A7F0C3]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#8FE3B0]" />
                            ONE WORKSPACE. MANY MODELS.
                        </div>
                        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
                            AI should feel like{" "}
                            <span className="bg-gradient-to-r from-[#9AD6FF] via-white to-[#8FE3B0] bg-clip-text text-transparent">
                                one tool,
                            </span>{" "}
                            not a dozen.
                        </h1>
                        <p className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                            SmilyAI brings your API keys, free-to-use models, and AI
                            creation tools together—so you can focus on what you want to
                            make, not where each model lives.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <Link
                                to="/chat"
                                className="inline-flex items-center gap-2 rounded-xl bg-[#8FE3B0] px-5 py-3 text-sm font-semibold text-[#10231A] transition hover:bg-[#A7F0C3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FE3B0]"
                            >
                                Explore the workspace
                                <Icon className="h-4 w-4">
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                </Icon>
                            </Link>
                            <a
                                href="#how-it-works"
                                className="rounded-xl px-4 py-3 text-sm font-medium text-white/75 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FE3B0]"
                            >
                                How it works
                            </a>
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-lg">
                        <div className="absolute -inset-8 rounded-[2rem] bg-[#547DFF]/15 blur-3xl" />
                        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#0A1021]/75 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <div>
                                    <p className="text-sm font-semibold">Your AI workspace</p>
                                    <p className="mt-1 text-xs text-white/45">Everything, in one place</p>
                                </div>
                                <span className="rounded-lg border border-[#8FE3B0]/20 bg-[#8FE3B0]/10 px-2.5 py-1 text-[11px] font-medium text-[#A7F0C3]">
                                    READY
                                </span>
                            </div>

                            <div className="mt-5 space-y-3">
                                <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className="text-xs text-white/50">Connected providers</span>
                                        <span className="text-xs text-[#A7F0C3]">Your API keys</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {["OpenAI", "Anthropic", "Google", "+ more"].map((provider) => (
                                            <span
                                                key={provider}
                                                className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/75"
                                            >
                                                {provider}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { label: "Chat", icon: <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H6l-3 2v-6.5a7.5 7.5 0 1 1 17-3Z" /> },
                                        { label: "Images", icon: <><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></> },
                                        { label: "Video", icon: <><rect x="3" y="5" width="13" height="14" rx="2" /><path d="m16 10 5-3v10l-5-3" /></> },
                                    ].map(({ label, icon }) => (
                                        <div
                                            key={label}
                                            className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.035] py-4 text-xs text-white/70"
                                        >
                                            <Icon className="h-5 w-5 text-[#9AD6FF]">{icon}</Icon>
                                            {label}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center gap-3 rounded-2xl border border-[#9AD6FF]/15 bg-[#9AD6FF]/[0.06] p-4">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#9AD6FF]/10 text-[#9AD6FF]">
                                        <Icon>
                                            <path d="M12 3v18M3 12h18" />
                                            <circle cx="12" cy="12" r="9" />
                                        </Icon>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-white/90">One consistent experience</p>
                                        <p className="mt-1 text-[11px] leading-5 text-white/50">
                                            Provider responses, made easier to use.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="about-capabilities" className="border-t border-white/10 py-16 sm:py-20">
                    <div className="mb-9 max-w-2xl">
                        <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-[#8FE3B0]">ONE PLACE FOR AI</p>
                        <h2 id="about-capabilities" className="text-3xl font-semibold tracking-tight sm:text-4xl">
                            Your models. Your workflow.
                        </h2>
                        <p className="mt-4 leading-7 text-white/60">
                            Use multiple provider keys in one place and explore the free
                            models available to you, without juggling separate interfaces.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {capabilities.map(({ number, title, description, icon }) => (
                            <article
                                key={number}
                                className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition duration-200 hover:-translate-y-1 hover:border-[#9AD6FF]/30 hover:bg-white/[0.055]"
                            >
                                <div className="mb-8 flex items-center justify-between">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#9AD6FF]/15 bg-[#9AD6FF]/[0.08] text-[#9AD6FF] transition group-hover:border-[#9AD6FF]/30">
                                        <Icon>{icon}</Icon>
                                    </span>
                                    <span className="text-xs tracking-widest text-white/30">{number}</span>
                                </div>
                                <h3 className="text-lg font-semibold">{title}</h3>
                                <p className="mt-2 text-sm leading-6 text-white/60">{description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    id="how-it-works"
                    aria-labelledby="about-flow"
                    className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.025] px-6 py-10 sm:px-10 sm:py-12"
                >
                    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                        <div>
                            <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-[#8FE3B0]">FROM PROMPT TO RESULT</p>
                            <h2 id="about-flow" className="text-3xl font-semibold tracking-tight">
                                Less switching.<br />More creating.
                            </h2>
                            <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
                                SmilyAI sits between you and AI providers, transforming
                                raw provider responses into a more consistent, usable
                                experience.
                            </p>
                        </div>
                        <ol className="grid gap-3 sm:grid-cols-3">
                            {steps.map(({ number, title, text }, index) => (
                                <li key={number} className="relative rounded-2xl border border-white/10 bg-[#080D1C]/50 p-5">
                                    <span className="text-xs font-medium tracking-widest text-[#9AD6FF]">{number}</span>
                                    <h3 className="mt-4 font-semibold">{title}</h3>
                                    <p className="mt-2 text-xs leading-5 text-white/55">{text}</p>
                                    {index < steps.length - 1 && (
                                        <span aria-hidden="true" className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 rotate-45 border-r border-t border-white/20 bg-[#0B1020] sm:block" />
                                    )}
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <section className="py-16 text-center sm:py-20">
                    <p className="text-sm text-white/60">Ready to bring your AI tools together?</p>
                    <Link
                        to="/chat"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.08] px-5 py-3 text-sm font-medium text-white transition hover:border-[#8FE3B0]/40 hover:bg-[#8FE3B0]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FE3B0]"
                    >
                        Open SmilyAI
                        <Icon className="h-4 w-4">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                        </Icon>
                    </Link>
                </section>
            </div>
        </main>
    )
}
