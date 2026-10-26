import { useRef, useState } from "react";
import type { DragEvent, FormEvent, KeyboardEvent, ReactNode } from "react";
import { Link } from "react-router-dom";

type View = "home" | "chat" | "image" | "video" | "files";
type LocalFile = { id: number; file: File };
type Message = { id: number; text: string; files: LocalFile[] };

const views: { id: View; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "chat", label: "Chat" },
    { id: "image", label: "Image" },
    { id: "video", label: "Video" },
    { id: "files", label: "Files" },
];

const models = [
    { provider: "OpenAI", name: "GPT-4o", detail: "Fast, capable, multimodal" },
    { provider: "Anthropic", name: "Claude 3.7 Sonnet", detail: "Reasoning and writing" },
    { provider: "Google", name: "Gemini 2.5 Pro", detail: "Advanced multimodal" },
];

const starterHistory = [
    "Compare the latest models",
    "Planning a new project",
    "Draft a product brief",
];

const sharedButtonStyles =
    "rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FE3B0]";

function Icon({
    children,
    className = "h-5 w-5",
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <svg
            aria-hidden="true"
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {children}
        </svg>
    );
}

function formatSize(size: number) {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function FileIcon({ className = "h-5 w-5" }: { className?: string }) {
    return (
        <Icon className={className}>
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
            <path d="M14 3v5h5" />
        </Icon>
    );
}

export default function ChatInterFace() {
    const [activeView, setActiveView] = useState<View>("chat");
    const [selectedModel, setSelectedModel] = useState(models[0]);
    const [modelMenuOpen, setModelMenuOpen] = useState(false);
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const [keysOpen, setKeysOpen] = useState(false);
    const [draft, setDraft] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [history, setHistory] = useState(starterHistory);
    const [activeHistory, setActiveHistory] = useState<string | null>(null);
    const [libraryFiles, setLibraryFiles] = useState<LocalFile[]>([]);
    const [attachedFiles, setAttachedFiles] = useState<LocalFile[]>([]);
    const [isDraggingFiles, setIsDraggingFiles] = useState(false);
    const nextFileId = useRef(0);
    const attachInput = useRef<HTMLInputElement>(null);
    const libraryInput = useRef<HTMLInputElement>(null);

    const addFiles = (files: FileList | File[], attach = false) => {
        const addedFiles = Array.from(files).map((file) => ({
            id: nextFileId.current++,
            file,
        }));
        setLibraryFiles((current) => [...current, ...addedFiles]);
        if (attach) setAttachedFiles((current) => [...current, ...addedFiles]);
    };

    const removeLibraryFile = (id: number) => {
        setLibraryFiles((current) => current.filter((item) => item.id !== id));
        setAttachedFiles((current) => current.filter((item) => item.id !== id));
    };

    const sendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const text = draft.trim();
        if (!text && attachedFiles.length === 0) return;

        const nextMessage: Message = {
            id: Date.now(),
            text,
            files: attachedFiles,
        };
        setMessages((current) => [...current, nextMessage]);
        if (!activeHistory) {
            const title = text.slice(0, 36) || attachedFiles[0]?.file.name || "New chat";
            setHistory((current) => [title, ...current]);
            setActiveHistory(title);
        }
        setActiveView("chat");
        setDraft("");
        setAttachedFiles([]);
    };

    const onComposerKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
        }
    };

    const startNewChat = () => {
        setActiveView("chat");
        setMessages([]);
        setDraft("");
        setAttachedFiles([]);
        setActiveHistory(null);
    };

    const title =
        activeHistory ??
        ({
            home: "Welcome back",
            chat: "New chat",
            image: "Image generation",
            video: "Video generation",
            files: "Your files",
        } satisfies Record<View, string>)[activeView];

    const subtitle =
        activeView === "home"
            ? "Your models, all in one workspace."
            : activeView === "chat"
                ? selectedModel.detail
                : activeView === "image"
                    ? "Create images with the models connected to your workspace."
                    : activeView === "video"
                        ? "Turn an idea into a video."
                        : "Files you upload stay available to attach to a chat.";

    const chatOrGenerationView =
        activeView === "chat" || activeView === "image" || activeView === "video";
    const viewHeading =
        activeView === "image"
            ? "What image should we create?"
            : activeView === "video"
                ? "What video should we create?"
                : "What are we working on?";

    const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsDraggingFiles(false);
        if (event.dataTransfer.files.length > 0) addFiles(event.dataTransfer.files);
    };

    return (
        <div className="flex min-h-screen bg-[#0E1013] font-sans text-[15px] leading-6 text-[#ECEDEF]">
            <aside className="hidden min-h-screen w-[260px] shrink-0 flex-col gap-5 border-r border-[#2A2F38] bg-[#14171C] px-4 py-5 sm:flex">
                <div className="flex items-center gap-2.5 px-2">
                    <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[#8FE3B0] text-[#0B1A12]">
                        <Icon className="h-[18px] w-[18px]">
                            <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />
                        </Icon>
                    </span>
                    <span className="text-[17px] font-bold tracking-tight">Prism</span>
                </div>

                <nav aria-label="Workspace" className="flex flex-col gap-1">
                    {views.map(({ id, label }) => (
                        <button
                            key={id}
                            type="button"
                            onClick={() => setActiveView(id)}
                            className={`${sharedButtonStyles} flex min-h-11 items-center gap-3 px-3 text-left ${activeView === id
                                ? "bg-[#232933] font-semibold text-[#8FE3B0]"
                                : "text-[#B4BAC5] hover:bg-[#1B1F26] hover:text-[#ECEDEF]"
                                }`}
                        >
                            {id === "home" ? (
                                <Icon>
                                    <path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" />
                                </Icon>
                            ) : id === "chat" ? (
                                <Icon>
                                    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
                                </Icon>
                            ) : id === "image" ? (
                                <Icon>
                                    <rect x="3" y="3" width="18" height="18" rx="3" />
                                    <circle cx="9" cy="9" r="1.6" />
                                    <path d="M21 16l-5-5-8 8" />
                                </Icon>
                            ) : id === "video" ? (
                                <Icon>
                                    <rect x="2" y="5" width="14" height="14" rx="3" />
                                    <path d="M16 10l6-3v10l-6-3z" />
                                </Icon>
                            ) : (
                                <FileIcon />
                            )}
                            <span>{label}</span>
                        </button>
                    ))}
                </nav>

                <section className="flex min-h-0 flex-1 flex-col gap-2">
                    <div className="flex items-center justify-between px-2">
                        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#9BA1AD]">
                            <Icon className="h-3.5 w-3.5">
                                <circle cx="12" cy="12" r="9" />
                                <path d="M12 7v5l3 2" />
                            </Icon>
                            Chat history
                        </span>
                        <button
                            type="button"
                            aria-label="New chat"
                            onClick={startNewChat}
                            className={`${sharedButtonStyles} grid h-10 w-10 place-items-center text-[#ECEDEF] hover:bg-[#2A303A]`}
                        >
                            <Icon className="h-[18px] w-[18px]">
                                <path d="M12 5v14M5 12h14" />
                            </Icon>
                        </button>
                    </div>
                    <div className="flex max-h-[460px] flex-col gap-0.5 overflow-y-auto">
                        {history.map((item, index) => (
                            <button
                                key={`${item}-${index}`}
                                type="button"
                                onClick={() => {
                                    setActiveHistory(item);
                                    setActiveView("chat");
                                }}
                                className={`${sharedButtonStyles} truncate px-3 py-2 text-left text-sm ${activeHistory === item
                                    ? "bg-[#1B1F26] text-[#ECEDEF]"
                                    : "text-[#B4BAC5] hover:bg-[#1B1F26]"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </section>

                <button
                    type="button"
                    onClick={() => setKeysOpen(true)}
                    className={`${sharedButtonStyles} flex min-h-12 items-center gap-3 border border-[#2A2F38] bg-[#1B1F26] px-3 text-left hover:bg-[#2A303A]`}
                >
                    <Icon className="h-5 w-5 text-[#8FE3B0]">
                        <circle cx="8" cy="15" r="4" />
                        <path d="M11 12l9-9M16 7l3 3M14 9l2 2" />
                    </Icon>
                    <span className="flex-1 font-semibold">API keys</span>
                    <span className="font-mono text-xs text-[#9BA1AD]">0</span>
                </button>
                <Link
                    to="/about"
                    className="px-2 text-xs text-[#9BA1AD] transition-colors hover:text-[#ECEDEF]"
                >
                    About SmilyAI
                </Link>
            </aside>

            <main className="flex min-h-screen min-w-0 flex-1 flex-col">
                <header className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-[#2A2F38] bg-[#0E1013] px-4 py-4 md:px-7">
                    <div className="flex min-w-0 flex-col">
                        <h1 className="m-0 truncate text-lg font-semibold tracking-tight">
                            {title}
                        </h1>
                        <span className="truncate text-[13px] text-[#9BA1AD]">{subtitle}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        {chatOrGenerationView && (
                            <div className="relative">
                                <button
                                    type="button"
                                    aria-haspopup="listbox"
                                    aria-expanded={modelMenuOpen}
                                    onClick={() => {
                                        setModelMenuOpen((open) => !open);
                                        setAccountMenuOpen(false);
                                    }}
                                    className={`${sharedButtonStyles} flex min-h-12 min-w-0 items-center gap-3 border border-[#2A2F38] bg-[#1B1F26] px-3 text-left hover:bg-[#2A303A] sm:min-w-[260px] sm:px-3.5`}
                                >
                                    <span className="flex min-w-0 flex-1 flex-col">
                                        <span className="truncate font-semibold">{selectedModel.name}</span>
                                        <span className="truncate font-mono text-[11px] text-[#9BA1AD]">
                                            {selectedModel.provider}
                                        </span>
                                    </span>
                                    <Icon className="h-[18px] w-[18px] shrink-0">
                                        <path d="M6 9l6 6 6-6" />
                                    </Icon>
                                </button>
                                {modelMenuOpen && (
                                    <>
                                        <button
                                            type="button"
                                            aria-label="Close model menu"
                                            onClick={() => setModelMenuOpen(false)}
                                            className="fixed inset-0 z-30 cursor-default"
                                        />
                                        <div
                                            role="listbox"
                                            aria-label="Models"
                                            className="absolute right-0 top-14 z-40 max-h-[440px] w-[min(340px,calc(100vw-32px))] overflow-y-auto rounded-[14px] border border-[#2A2F38] bg-[#14171C] p-2 shadow-2xl"
                                        >
                                            {models.map((model) => (
                                                <button
                                                    key={model.name}
                                                    type="button"
                                                    role="option"
                                                    aria-selected={selectedModel.name === model.name}
                                                    onClick={() => {
                                                        setSelectedModel(model);
                                                        setModelMenuOpen(false);
                                                    }}
                                                    className={`${sharedButtonStyles} flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left hover:bg-[#2A303A]`}
                                                >
                                                    <span className="flex min-w-0 flex-col">
                                                        <span className="truncate font-semibold">{model.name}</span>
                                                        <span className="truncate text-xs text-[#9BA1AD]">
                                                            {model.provider} · {model.detail}
                                                        </span>
                                                    </span>
                                                    {selectedModel.name === model.name && (
                                                        <Icon className="h-[18px] w-[18px] shrink-0 text-[#8FE3B0]">
                                                            <path d="M5 12l5 5 9-10" />
                                                        </Icon>
                                                    )}
                                                </button>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setKeysOpen(true);
                                                    setModelMenuOpen(false);
                                                }}
                                                className={`${sharedButtonStyles} mt-1 w-full px-3 py-2.5 text-left text-sm text-[#8FE3B0] hover:bg-[#2A303A]`}
                                            >
                                                Manage API keys
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        <div className="relative">
                            <button
                                type="button"
                                aria-haspopup="menu"
                                aria-expanded={accountMenuOpen}
                                aria-label="Account menu"
                                onClick={() => {
                                    setAccountMenuOpen((open) => !open);
                                    setModelMenuOpen(false);
                                }}
                                className={`${sharedButtonStyles} grid h-11 w-11 place-items-center rounded-full bg-[#8FE3B0] font-bold text-[#0B1A12] hover:brightness-95`}
                            >
                                S
                            </button>
                            {accountMenuOpen && (
                                <>
                                    <button
                                        type="button"
                                        aria-label="Close account menu"
                                        onClick={() => setAccountMenuOpen(false)}
                                        className="fixed inset-0 z-30 cursor-default"
                                    />
                                    <div
                                        role="menu"
                                        aria-label="Account"
                                        className="absolute right-0 top-[52px] z-40 flex w-[280px] max-w-[calc(100vw-32px)] flex-col gap-1 rounded-[14px] border border-[#2A2F38] bg-[#14171C] p-2 shadow-2xl"
                                    >
                                        <div className="mb-1 flex flex-col gap-0.5 border-b border-[#2A2F38] px-2.5 pb-3 pt-2.5">
                                            <span className="text-xs text-[#9BA1AD]">Workspace</span>
                                            <span className="font-mono text-[13px]">SmilyAI</span>
                                        </div>
                                        <button
                                            type="button"
                                            role="menuitem"
                                            onClick={() => {
                                                setKeysOpen(true);
                                                setAccountMenuOpen(false);
                                            }}
                                            className={`${sharedButtonStyles} flex min-h-11 items-center gap-3 px-2.5 text-left hover:bg-[#2A303A]`}
                                        >
                                            <Icon>
                                                <circle cx="8" cy="15" r="4" />
                                                <path d="M11 12l9-9M16 7l3 3M14 9l2 2" />
                                            </Icon>
                                            API keys
                                        </button>
                                        <button
                                            type="button"
                                            role="menuitem"
                                            onClick={() => {
                                                setActiveView("files");
                                                setAccountMenuOpen(false);
                                            }}
                                            className={`${sharedButtonStyles} flex min-h-11 items-center gap-3 px-2.5 text-left hover:bg-[#2A303A]`}
                                        >
                                            <FileIcon />
                                            Files
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {activeView === "home" && (
                    <section className="flex flex-1 flex-col items-center px-5 py-10 md:px-7">
                        <div className="flex w-full max-w-[980px] flex-col gap-10">
                            <div className="flex flex-col gap-2.5">
                                <h2 className="m-0 text-[clamp(30px,5vw,44px)] font-semibold leading-tight tracking-tight">
                                    Welcome back
                                </h2>
                                <p className="m-0 max-w-[52ch] text-[17px] text-[#9BA1AD]">
                                    Every model your keys unlock, in one place. Pick a workspace to
                                    start.
                                </p>
                            </div>
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(210px,100%),1fr))] gap-4">
                                {(["chat", "image", "video", "files"] as const).map((view) => (
                                    <button
                                        key={view}
                                        type="button"
                                        onClick={() => setActiveView(view)}
                                        className={`${sharedButtonStyles} flex min-h-40 flex-col items-start gap-4 border border-[#2A2F38] bg-[#14171C] p-5 text-left hover:bg-[#2A303A]`}
                                    >
                                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#232933] text-[#8FE3B0]">
                                            {view === "chat" ? (
                                                <Icon className="h-[22px] w-[22px]">
                                                    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
                                                </Icon>
                                            ) : view === "image" ? (
                                                <Icon className="h-[22px] w-[22px]">
                                                    <rect x="3" y="3" width="18" height="18" rx="3" />
                                                    <circle cx="9" cy="9" r="1.6" />
                                                    <path d="M21 16l-5-5-8 8" />
                                                </Icon>
                                            ) : view === "video" ? (
                                                <Icon className="h-[22px] w-[22px]">
                                                    <rect x="2" y="5" width="14" height="14" rx="3" />
                                                    <path d="M16 10l6-3v10l-6-3z" />
                                                </Icon>
                                            ) : (
                                                <FileIcon className="h-[22px] w-[22px]" />
                                            )}
                                        </span>
                                        <span className="mt-auto flex flex-col gap-0.5">
                                            <span className="text-lg font-semibold capitalize">{view}</span>
                                            <span className="text-[13px] text-[#9BA1AD]">
                                                {view === "chat"
                                                    ? "Chat with your favorite models"
                                                    : view === "image"
                                                        ? "Create an image from a prompt"
                                                        : view === "video"
                                                            ? "Bring a story to life"
                                                            : "Add files to your workspace"}
                                            </span>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {activeView === "chat" && (
                    <section className="flex min-h-0 flex-1 flex-col items-center px-5 py-7 md:px-7">
                        <div className="flex w-full max-w-[760px] flex-1 flex-col gap-6 overflow-y-auto">
                            {messages.length === 0 ? (
                                <div className="flex flex-1 flex-col justify-center gap-2 py-12">
                                    <h2 className="m-0 text-[32px] font-semibold leading-tight tracking-tight">
                                        {viewHeading}
                                    </h2>
                                    <p className="m-0 max-w-[46ch] text-[#9BA1AD]">
                                        Choose a model from the menu above, then type below. Switch
                                        models between messages whenever you like.
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-6 py-2">
                                    {messages.map((message) => (
                                        <div key={message.id} className="flex justify-end">
                                            <div className="flex max-w-[85%] flex-col gap-2 rounded-[16px_16px_4px_16px] bg-[#232933] px-4 py-3">
                                                {message.files.length > 0 && (
                                                    <span className="font-mono text-xs text-[#B4BAC5]">
                                                        {message.files.map((item) => item.file.name).join(", ")}
                                                    </span>
                                                )}
                                                {message.text && (
                                                    <span className="whitespace-pre-wrap">{message.text}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {(activeView === "image" || activeView === "video") && (
                    <section className="flex min-h-0 flex-1 flex-col items-center px-5 py-7 md:px-7">
                        <div className="flex w-full max-w-[980px] flex-1 flex-col gap-5">
                            <div className="flex flex-1 flex-col justify-center gap-2 py-12">
                                <h2 className="m-0 text-[32px] font-semibold leading-tight tracking-tight">
                                    {viewHeading}
                                </h2>
                                <p className="m-0 max-w-[46ch] text-[#9BA1AD]">
                                    {activeView === "image"
                                        ? "Describe a scene, style, or idea to get started."
                                        : "Describe the scene and motion you have in mind."}
                                </p>
                            </div>
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-4">
                                {[0, 1].map((tile) => (
                                    <figure key={tile} className="m-0 flex flex-col gap-2">
                                        <div className="flex aspect-[16/10] items-center justify-center rounded-xl border border-[#2A2F38] bg-[repeating-linear-gradient(135deg,#1B1F26_0_10px,#171A20_10px_20px)]">
                                            <span className="font-mono text-xs text-[#9BA1AD]">
                                                {activeView === "image" ? "Image preview" : "Video preview"}
                                            </span>
                                        </div>
                                        <figcaption className="text-xs text-[#9BA1AD]">
                                            Connect a provider to generate content.
                                        </figcaption>
                                    </figure>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {activeView === "files" && (
                    <section className="flex flex-1 flex-col items-center px-5 py-7 md:px-7">
                        <div className="flex w-full max-w-[760px] flex-col gap-6">
                            <label
                                htmlFor="files-in"
                                onDragOver={(event) => {
                                    event.preventDefault();
                                    setIsDraggingFiles(true);
                                }}
                                onDragLeave={() => setIsDraggingFiles(false)}
                                onDrop={handleDrop}
                                className={`${sharedButtonStyles} relative flex min-h-56 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-6 text-center ${isDraggingFiles
                                    ? "border-[#8FE3B0] bg-[#1B1F26]"
                                    : "border-[#3A404B] hover:bg-[#14171C]"
                                    }`}
                            >
                                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#232933] text-[#8FE3B0]">
                                    <Icon className="h-6 w-6">
                                        <path d="M12 16V4M7 9l5-5 5 5M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
                                    </Icon>
                                </span>
                                <span className="text-[17px] font-semibold">
                                    Drop files here, or{" "}
                                    <span className="text-[#8FE3B0] underline">browse</span>
                                </span>
                                <span className="text-sm text-[#9BA1AD]">
                                    Documents, images, PDFs and code. Attach them to a chat from the
                                    paperclip.
                                </span>
                                <input
                                    ref={libraryInput}
                                    id="files-in"
                                    type="file"
                                    multiple
                                    onChange={(event) => {
                                        if (event.target.files) addFiles(event.target.files);
                                        event.target.value = "";
                                    }}
                                    className="sr-only"
                                />
                            </label>

                            <div className="flex flex-col gap-2.5">
                                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#9BA1AD]">
                                    {libraryFiles.length} {libraryFiles.length === 1 ? "file" : "files"}
                                </span>
                                {libraryFiles.length === 0 ? (
                                    <div className="rounded-xl border border-dashed border-[#3A404B] p-4 text-[#9BA1AD]">
                                        Nothing uploaded yet.
                                    </div>
                                ) : (
                                    libraryFiles.map(({ id, file }) => (
                                        <div
                                            key={id}
                                            className="flex items-center gap-3 rounded-xl border border-[#2A2F38] bg-[#14171C] p-2 pl-3.5"
                                        >
                                            <FileIcon className="shrink-0 text-[#9BA1AD]" />
                                            <span className="min-w-0 flex-1 truncate">{file.name}</span>
                                            <span className="shrink-0 font-mono text-xs text-[#9BA1AD]">
                                                {formatSize(file.size)}
                                            </span>
                                            <button
                                                type="button"
                                                aria-label={`Remove ${file.name}`}
                                                onClick={() => removeLibraryFile(id)}
                                                className={`${sharedButtonStyles} grid h-10 w-10 shrink-0 place-items-center text-[#FF9A92] hover:bg-[#2A303A]`}
                                            >
                                                <Icon className="h-[18px] w-[18px]">
                                                    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                                                </Icon>
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {chatOrGenerationView && (
                    <div className="flex flex-col items-center gap-3 px-5 pb-6 md:px-7">
                        {attachedFiles.length > 0 && (
                            <div className="flex w-full max-w-[760px] flex-wrap gap-2">
                                {attachedFiles.map(({ id, file }) => (
                                    <span
                                        key={id}
                                        className="inline-flex min-h-9 max-w-full items-center gap-1 rounded-[10px] border border-[#2A2F38] bg-[#1B1F26] pl-3 pr-1"
                                    >
                                        <span className="truncate text-[13px]">{file.name}</span>
                                        <span className="shrink-0 font-mono text-[11px] text-[#9BA1AD]">
                                            {formatSize(file.size)}
                                        </span>
                                        <button
                                            type="button"
                                            aria-label={`Remove ${file.name} from message`}
                                            onClick={() =>
                                                setAttachedFiles((current) =>
                                                    current.filter((item) => item.id !== id),
                                                )
                                            }
                                            className={`${sharedButtonStyles} grid h-8 w-8 shrink-0 place-items-center hover:bg-[#2A303A]`}
                                        >
                                            <Icon className="h-3.5 w-3.5">
                                                <path d="M6 6l12 12M18 6L6 18" />
                                            </Icon>
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}

                        <form
                            onSubmit={sendMessage}
                            className="flex w-full max-w-[760px] items-end gap-3 rounded-2xl border border-[#2A2F38] bg-[#14171C] p-2.5 pl-4"
                        >
                            {activeView === "chat" && (
                                <button
                                    type="button"
                                    aria-label="Attach files"
                                    onClick={() => attachInput.current?.click()}
                                    className={`${sharedButtonStyles} grid h-11 w-11 shrink-0 place-items-center bg-[#1B1F26] hover:bg-[#2A303A]`}
                                >
                                    <Icon>
                                        <path d="M20 11l-8.5 8.5a5 5 0 0 1-7-7L13 4a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L14 7" />
                                    </Icon>
                                </button>
                            )}
                            <input
                                ref={attachInput}
                                type="file"
                                multiple
                                onChange={(event) => {
                                    if (event.target.files) addFiles(event.target.files, true);
                                    event.target.value = "";
                                }}
                                className="sr-only"
                                aria-label="Choose attachments"
                            />
                            <label htmlFor="prompt" className="sr-only">
                                Message
                            </label>
                            <textarea
                                id="prompt"
                                rows={2}
                                value={draft}
                                onChange={(event) => setDraft(event.target.value)}
                                onKeyDown={onComposerKeyDown}
                                placeholder={
                                    activeView === "chat"
                                        ? "Message your model..."
                                        : activeView === "image"
                                            ? "Describe an image..."
                                            : "Describe a video..."
                                }
                                className="min-w-0 flex-1 resize-none bg-transparent py-2 leading-6 outline-none placeholder:text-[#8A909C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FE3B0]"
                            />
                            <button
                                type="submit"
                                aria-label={activeView === "chat" ? "Send message" : "Generate"}
                                disabled={!draft.trim() && attachedFiles.length === 0}
                                className={`${sharedButtonStyles} grid h-11 w-11 shrink-0 place-items-center bg-[#8FE3B0] text-[#0B1A12] hover:brightness-95 disabled:cursor-not-allowed disabled:bg-[#2A303A] disabled:text-[#747B86]`}
                            >
                                <Icon>
                                    <path d="M12 19V5M5 12l7-7 7 7" />
                                </Icon>
                            </button>
                        </form>
                        <span className="text-xs text-[#9BA1AD]">
                            Enter to send · Shift+Enter for a new line
                        </span>
                    </div>
                )}
            </main>

            {keysOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[rgba(5,6,8,0.72)] px-4 py-12"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) setKeysOpen(false);
                    }}
                >
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="keys-title"
                        className="flex w-full max-w-[620px] flex-col gap-6 rounded-[18px] border border-[#2A2F38] bg-[#14171C] p-6 shadow-2xl"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex flex-col gap-1">
                                <h2 id="keys-title" className="m-0 text-[22px] font-semibold">
                                    API keys
                                </h2>
                                <p className="m-0 text-sm text-[#9BA1AD]">
                                    Connect a provider to use its models in your workspace.
                                </p>
                            </div>
                            <button
                                type="button"
                                aria-label="Close API keys dialog"
                                onClick={() => setKeysOpen(false)}
                                className={`${sharedButtonStyles} grid h-9 w-9 shrink-0 place-items-center hover:bg-[#2A303A]`}
                            >
                                <Icon className="h-[18px] w-[18px]">
                                    <path d="M6 6l12 12M18 6L6 18" />
                                </Icon>
                            </button>
                        </div>
                        <div className="rounded-xl border border-[#2A2F38] bg-[#1B1F26] p-4 text-sm text-[#B4BAC5]">
                            API key management is not connected in this interface yet. No
                            credentials are collected or stored here.
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setKeysOpen(false)}
                                className={`${sharedButtonStyles} min-h-11 bg-[#8FE3B0] px-4 font-semibold text-[#0B1A12] hover:brightness-95`}
                            >
                                Done
                            </button>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}