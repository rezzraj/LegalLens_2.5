import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  RotateCcw,
  ShieldCheck,
  FileSearch,
  Sparkles,
  Loader2,
  Scale
} from "lucide-react";

const API_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8000/ask"
    : "/ask";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-black ring-1 ring-white/15 shadow-2xl">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-zinc-700/40 via-black to-amber-500/20" />
        <Scale className="relative z-10 text-amber-300" size={23} strokeWidth={1.8} />
      </div>

      <div>
        <h1 className="text-lg font-semibold tracking-tight text-white">
          LegalLens AI
        </h1>
        <p className="text-xs text-zinc-500">Legal intelligence assistant</p>
      </div>
    </div>
  );
}

function EmptyState({ setQuestion }) {
  const examples = [
    {
      title: "Explain a section",
      text: "Explain Section 66 of the IT Act.",
      icon: FileSearch
    },
    {
      title: "Find punishment",
      text: "What punishment is given for identity theft?",
      icon: ShieldCheck
    },
    {
      title: "Understand offence",
      text: "What is cyber terrorism under the IT Act?",
      icon: Sparkles
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex max-w-3xl flex-col items-center px-4 pt-16 text-center"
    >
      <div className="mb-7">
        <LogoMarkLarge />
      </div>

      <h2 className="inline-block bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text pb-3 text-4xl font-bold leading-[1.25] tracking-tight text-transparent sm:text-5xl sm:leading-[1.25]">
  Legal research, refined.
</h2>

      <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
        RAG-powered legal assistant for the Information Technology Act, 2000.
      </p>

      <div className="mt-10 grid w-full gap-3 sm:grid-cols-3">
        {examples.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              onClick={() => setQuestion(item.text)}
              className="group rounded-3xl border border-white/10 bg-white/[0.035] p-5 text-left transition hover:border-blue-400/40 hover:bg-white/[0.06]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 ring-1 ring-white/10 group-hover:bg-blue-500/10">
                <Icon size={18} className="text-blue-300" />
              </div>

              <p className="text-sm font-medium text-slate-100">
                {item.title}
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                {item.text}
              </p>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

function LogoMarkLarge() {
  return (
    <div className="relative h-24 w-24">
      <div className="absolute inset-0 rounded-[2rem] bg-amber-500/20 blur-2xl" />

      <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-black ring-1 ring-white/15 shadow-2xl">
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-zinc-700/40 via-black to-amber-500/20" />
        <Scale className="relative z-10 text-amber-300" size={46} strokeWidth={1.5} />
      </div>
    </div>
  );
}

function UserMessage({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="flex justify-end"
    >
      <div className="max-w-[82%] rounded-3xl rounded-br-xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-4 shadow-lg shadow-amber-500/10">
        <p className="whitespace-pre-wrap text-sm leading-7 text-white">
          {text}
        </p>
      </div>
    </motion.div>
  );
}

function AssistantMessage({ text }) {
  const safeText =
    typeof text === "string"
      ? text
      : JSON.stringify(text, null, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="flex justify-start"
    >
      <div className="glass max-w-[82%] rounded-3xl rounded-bl-xl px-5 py-4 shadow-xl shadow-black/20">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-amber-300" />
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            LegalLens
          </p>
        </div>

        <div className="text-sm leading-7 text-zinc-200">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => (
                <p className="mb-3 leading-7 text-zinc-200">{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-white">{children}</strong>
              ),
              ol: ({ children }) => (
                <ol className="mb-3 ml-5 list-decimal space-y-2">{children}</ol>
              ),
              ul: ({ children }) => (
                <ul className="mb-3 ml-5 list-disc space-y-2">{children}</ul>
              ),
              li: ({ children }) => (
                <li className="pl-1 text-zinc-200">{children}</li>
              ),
              h1: ({ children }) => (
                <h1 className="mb-3 text-xl font-bold text-white">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="mb-3 text-lg font-bold text-white">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-2 text-base font-semibold text-white">{children}</h3>
              )
            }}
          >
            {safeText}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}
function LoadingMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="glass rounded-3xl rounded-bl-xl px-5 py-4 shadow-xl shadow-black/20">
        <div className="flex items-center gap-3 text-slate-400">
          <Loader2 size={16} className="animate-spin text-amber-300" />
          <span className="text-sm">Generating answer</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const chatRef = useRef(null);
  const textareaRef = useRef(null);

  const hasMessages = messages.length > 0;

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  function autoResize() {
    const area = textareaRef.current;

    if (!area) return;

    area.style.height = "auto";
    area.style.height = `${area.scrollHeight}px`;
  }

  async function askBackend() {
  const cleanQuestion = question.trim();

  if (!cleanQuestion || isLoading) return;

  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      text: cleanQuestion
    }
  ]);

  setQuestion("");
  setIsLoading(true);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: cleanQuestion
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.detail || "Backend error");
    }

    const answerText =
      typeof data.answer === "string"
        ? data.answer
        : JSON.stringify(data.answer, null, 2) || "No answer received.";

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: answerText
      }
    ]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: "Could not connect to the backend. Check if FastAPI is running."
      }
    ]);
  } finally {
    setIsLoading(false);
    textareaRef.current?.focus();
  }
}
  function clearChat() {
    setMessages([]);
    setQuestion("");
  }

  return (
    <div className="noise relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="grid-bg pointer-events-none absolute inset-0" />

      <div className="relative flex h-screen">
        <aside className="glass hidden w-80 shrink-0 border-r border-white/10 p-5 lg:flex lg:flex-col lg:justify-between">
          <div>
            <Logo />

            <div className="mt-10 space-y-3">
              <button
                onClick={() => setQuestion("Explain Section 26 of the IT Act.")}
                className="w-full rounded-3xl border border-white/10 bg-white/[0.035] p-4 text-left transition hover:border-blue-400/40 hover:bg-white/[0.06]"
              >
                <p className="text-sm font-medium text-slate-100">
                  Section explainer
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Convert legal text into simple meaning.
                </p>
              </button>

              <button
                onClick={() =>
                  setQuestion("What punishment is given for identity theft?")
                }
                className="w-full rounded-3xl border border-white/10 bg-white/[0.035] p-4 text-left transition hover:border-blue-400/40 hover:bg-white/[0.06]"
              >
                <p className="text-sm font-medium text-slate-100">
                  Penalty search
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Ask punishment and offence questions.
                </p>
              </button>

              <button
                onClick={() =>
                  setQuestion("What is cyber terrorism under the IT Act?")
                }
                className="w-full rounded-3xl border border-white/10 bg-white/[0.035] p-4 text-left transition hover:border-blue-400/40 hover:bg-white/[0.06]"
              >
                <p className="text-sm font-medium text-slate-100">
                  Legal concept
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Understand difficult legal terms.
                </p>
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-600">
              System
            </p>

            <div className="mt-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <p className="text-sm text-slate-300">FastAPI endpoint ready</p>
            </div>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col">
          <header className="glass flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5 lg:px-8">
            <div className="lg:hidden">
              <Logo />
            </div>

            <div className="hidden lg:block">
              <p className="text-sm font-medium text-slate-200">
                Legal Q&A Workspace
              </p>

            </div>

            <button
              onClick={clearChat}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/[0.06]"
            >
              <RotateCcw size={15} />
              Clear
            </button>
          </header>

          <section
            ref={chatRef}
            className="flex-1 overflow-y-auto px-4 py-8"
          >
            {!hasMessages ? (
              <EmptyState setQuestion={setQuestion} />
            ) : (
              <div className="mx-auto max-w-3xl space-y-6">
                <AnimatePresence>
                  {messages.map((message, index) =>
                    message.role === "user" ? (
                      <UserMessage key={index} text={message.text} />
                    ) : (
                      <AssistantMessage key={index} text={message.text} />
                    )
                  )}

                  {isLoading && <LoadingMessage />}
                </AnimatePresence>
              </div>
            )}
          </section>

          <footer className="px-4 pb-5">
            <div className="glass mx-auto max-w-3xl rounded-[2rem] p-3 shadow-2xl shadow-black/40">
              <div className="flex items-end gap-3">
                <textarea
                  ref={textareaRef}
                  value={question}
                  onChange={(event) => {
                    setQuestion(event.target.value);
                    autoResize();
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      askBackend();
                    }
                  }}
                  rows={1}
                  placeholder="Ask a legal question..."
                  className="max-h-44 min-h-11 flex-1 resize-none bg-transparent px-4 py-3 text-sm leading-6 text-slate-100 outline-none placeholder:text-slate-600"
                />

                <button
                  onClick={askBackend}
                  disabled={isLoading || !question.trim()}
                  className="inline-flex h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-zinc-900 via-black to-amber-700 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:from-zinc-800 hover:to-amber-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send size={16} />
                  Send
                </button>
              </div>

              <p className="px-4 pb-1 pt-1 text-[11px] text-slate-600">
                Enter to send. Shift + Enter for a new line.
              </p>
            </div>
          </footer>
          <div className="pb-4 text-center">
  <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-600">
    Created by Akshit Raj
  </p>
</div>
        </main>
      </div>
    </div>
  );
}