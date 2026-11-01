import { useState } from "react"
import type { FormEvent, ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"

type AuthMode = "login" | "signup" | "forgot-password"

const passwordRules = [
    { label: "At least 8 characters", test: (value: string) => value.length >= 8 },
    { label: "One uppercase letter", test: (value: string) => /[A-Z]/.test(value) },
    { label: "One lowercase letter", test: (value: string) => /[a-z]/.test(value) },
    { label: "One number", test: (value: string) => /\d/.test(value) },
    { label: "One special character", test: (value: string) => /[^A-Za-z0-9]/.test(value) },
]

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function ProviderIcon({ children }: { children: ReactNode }) {
    return (
        <svg
            aria-hidden="true"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            {children}
        </svg>
    )
}

export default function Authentication() {
    const { pathname } = useLocation()
    const mode: AuthMode = pathname === "/signup"
        ? "signup"
        : pathname === "/forgot-password"
          ? "forgot-password"
          : "login"
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [emailTouched, setEmailTouched] = useState(false)
    const [passwordTouched, setPasswordTouched] = useState(false)
    const [confirmTouched, setConfirmTouched] = useState(false)
    const [notice, setNotice] = useState("")

    const emailInvalid = !isValidEmail(email)
    const passwordValidity = passwordRules.map(({ label, test }) => ({
        label,
        valid: test(password),
    }))
    const passwordInvalid = passwordValidity.some(({ valid }) => !valid)
    const confirmInvalid = confirmPassword !== password
    const showEmailError = (submitted || emailTouched) && emailInvalid
    const showPasswordError = (submitted || passwordTouched) && passwordInvalid
    const showConfirmError = (submitted || confirmTouched) && confirmInvalid

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSubmitted(true)
        setNotice("")

        const valid = !emailInvalid &&
            (mode === "forgot-password" ||
                (!passwordInvalid && (mode !== "signup" || !confirmInvalid)))

        if (!valid) return

        setNotice(
            mode === "forgot-password"
                ? "Password reset is not available yet. Authentication is not connected."
                : "Authentication is not connected yet. Your credentials were not sent.",
        )
    }

    const handleProviderClick = (provider: string) => {
        setNotice(`${provider} sign-in is not configured yet.`)
    }

    const title = mode === "signup"
        ? "Create your account"
        : mode === "forgot-password"
          ? "Reset your password"
          : "Welcome back"
    const description = mode === "signup"
        ? "Create one account for your SmilyAI workspace."
        : mode === "forgot-password"
          ? "Enter the email address associated with your account."
          : "Sign in to pick up where you left off."

    return (
        <main className="relative z-10 flex min-h-screen items-center justify-center px-5 pb-16 pt-28 text-white sm:px-8 sm:pt-32">
            <section
                aria-labelledby="auth-title"
                className="w-full max-w-md rounded-3xl border border-white/15 bg-[#0A1021]/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8"
            >
                <div className="mb-7 text-center">
                    <Link to="/" className="text-sm font-semibold tracking-tight text-white/85 hover:text-white">
                        SmilyAI<span className="text-[#8FE3B0]">.</span>
                    </Link>
                    <h1 id="auth-title" className="mt-5 text-2xl font-semibold tracking-tight">
                        {title}
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-white/55">{description}</p>
                </div>

                {mode !== "forgot-password" && (
                    <>
                        <div className="grid gap-3 sm:grid-cols-3">
                            <button
                                type="button"
                                onClick={() => handleProviderClick("Google")}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.035] px-3 py-3 text-sm text-white/80 transition hover:border-white/30 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FE3B0]"
                            >
                                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#4285F4]">G</span>
                                Google
                            </button>
                            <button
                                type="button"
                                onClick={() => handleProviderClick("GitHub")}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.035] px-3 py-3 text-sm text-white/80 transition hover:border-white/30 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FE3B0]"
                            >
                                <ProviderIcon>
                                    <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.63c.55.1.76-.24.76-.53v-2.03c-3.1.68-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.7.08-.69.08-.69 1.12.08 1.7 1.15 1.7 1.15.99 1.7 2.58 1.2 3.2.92.1-.72.39-1.2.7-1.48-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.57 10.57 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.03.75 2.08V22c0 .29.2.63.77.52A11.1 11.1 0 0 0 12 .9Z" />
                                </ProviderIcon>
                                GitHub
                            </button>
                            <button
                                type="button"
                                onClick={() => handleProviderClick("Discord")}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.035] px-3 py-3 text-sm text-white/80 transition hover:border-white/30 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FE3B0]"
                            >
                                <ProviderIcon>
                                    <path d="M19.7 5.2A18.2 18.2 0 0 0 15.2 3.8l-.55 1.12a16.8 16.8 0 0 0-5.3 0L8.8 3.8a18.2 18.2 0 0 0-4.5 1.4C1.45 9.4.68 13.5 1.06 17.55a18.3 18.3 0 0 0 5.52 2.8l1.18-1.92a11.9 11.9 0 0 1-1.85-.9l.45-.35a13 13 0 0 0 11.28 0l.46.35c-.6.36-1.23.67-1.86.9l1.18 1.92a18.3 18.3 0 0 0 5.52-2.8c.45-4.7-.77-8.75-3.24-12.35ZM8.1 14.8c-1.1 0-2-1.02-2-2.28s.88-2.28 2-2.28 2.02 1.03 2 2.28c0 1.26-.88 2.28-2 2.28Zm7.8 0c-1.1 0-2-1.02-2-2.28s.88-2.28 2-2.28 2.02 1.03 2 2.28c0 1.26-.88 2.28-2 2.28Z" />
                                </ProviderIcon>
                                Discord
                            </button>
                        </div>
                        <div className="my-6 flex items-center gap-3 text-xs text-white/35">
                            <span className="h-px flex-1 bg-white/10" />
                            OR CONTINUE WITH EMAIL
                            <span className="h-px flex-1 bg-white/10" />
                        </div>
                    </>
                )}

                <form noValidate onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="auth-email" className="mb-2 block text-sm font-medium text-white/80">
                            Email address
                        </label>
                        <input
                            id="auth-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value)
                                setNotice("")
                            }}
                            onBlur={() => setEmailTouched(true)}
                            aria-invalid={showEmailError}
                            aria-describedby={showEmailError ? "auth-email-error" : undefined}
                            placeholder="you@example.com"
                            className={`w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#8FE3B0]/60 focus:ring-2 focus:ring-[#8FE3B0]/15 ${
                                showEmailError ? "border-rose-400/70" : "border-white/15"
                            }`}
                        />
                        {showEmailError && (
                            <p id="auth-email-error" className="mt-2 text-xs text-rose-300">
                                Enter a valid email address with an @ and a domain.
                            </p>
                        )}
                    </div>

                    {mode !== "forgot-password" && (
                        <div>
                            <div className="mb-2 flex items-center justify-between gap-3">
                                <label htmlFor="auth-password" className="text-sm font-medium text-white/80">
                                    Password
                                </label>
                                {mode === "login" && (
                                    <Link to="/forgot-password" className="text-xs text-[#A7F0C3] transition hover:text-white">
                                        Forgot password?
                                    </Link>
                                )}
                            </div>
                            <input
                                id="auth-password"
                                name="password"
                                type="password"
                                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                                required
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                    setNotice("")
                                }}
                                onBlur={() => setPasswordTouched(true)}
                                aria-invalid={showPasswordError}
                                aria-describedby="password-requirements"
                                placeholder="Enter your password"
                                className={`w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#8FE3B0]/60 focus:ring-2 focus:ring-[#8FE3B0]/15 ${
                                    showPasswordError ? "border-rose-400/70" : "border-white/15"
                                }`}
                            />
                          
                            {showPasswordError && (
                                <p className="mt-2 text-xs text-rose-300">
                                    Your password must meet every requirement.
                                </p>
                            )}
                        </div>
                    )}

                    {mode === "signup" && (
                        <div>
                            <label htmlFor="auth-confirm-password" className="mb-2 block text-sm font-medium text-white/80">
                                Confirm password
                            </label>
                            <input
                                id="auth-confirm-password"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={confirmPassword}
                                onChange={(event) => {
                                    setConfirmPassword(event.target.value)
                                    setNotice("")
                                }}
                                onBlur={() => setConfirmTouched(true)}
                                aria-invalid={showConfirmError}
                                aria-describedby={showConfirmError ? "confirm-password-error" : undefined}
                                placeholder="Re-enter your password"
                                className={`w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#8FE3B0]/60 focus:ring-2 focus:ring-[#8FE3B0]/15 ${
                                    showConfirmError ? "border-rose-400/70" : "border-white/15"
                                }`}
                            />
                            {showConfirmError && (
                                <p id="confirm-password-error" className="mt-2 text-xs text-rose-300">
                                    Passwords must match.
                                </p>
                            )}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-[#8FE3B0] px-4 py-3 text-sm font-semibold text-[#10231A] transition hover:bg-[#A7F0C3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FE3B0]"
                    >
                        {mode === "signup"
                            ? "Create account"
                            : mode === "forgot-password"
                              ? "Send reset instructions"
                              : "Log in"}
                    </button>
                </form>

                {notice && (
                    <p role="status" className="mt-4 rounded-xl border border-amber-300/20 bg-amber-200/[0.06] px-4 py-3 text-sm leading-5 text-amber-100/90">
                        {notice}
                    </p>
                )}

                <p className="mt-6 text-center text-sm text-white/55">
                    {mode === "signup" ? (
                        <>Already have an account? <Link to="/login" className="font-medium text-[#A7F0C3] hover:text-white">Log in</Link></>
                    ) : mode === "forgot-password" ? (
                        <>Remembered it? <Link to="/login" className="font-medium text-[#A7F0C3] hover:text-white">Back to log in</Link></>
                    ) : (
                        <>New to SmilyAI? <Link to="/signup" className="font-medium text-[#A7F0C3] hover:text-white">Create an account</Link></>
                    )}
                </p>
            </section>
        </main>
    )
}
