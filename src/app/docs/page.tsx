"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ExternalLink,
  FileCode2,
  Globe2,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import { LessonView } from "@/components/guide/CodingGuide";
import { FLAT_LESSONS, GUIDE_SECTIONS } from "@/components/guide/guideContent";
import { Markdown } from "@/components/ai/Markdown";
import { JAVASCRIPT_FUNDAMENTALS } from "@/components/guide/javascriptFundamentals";

const documentation = [
  {
    title: "Mesivta HTML, CSS & JavaScript",
    description: "Our step-by-step beginner series with examples, previews, and common mistakes.",
    kind: "Mesivta guide",
    icon: FileCode2,
    href: "/docs?guide=mesivta",
    internal: true,
  },
  {
    title: "JavaScript Fundamentals",
    description: "A numbered Mesivta series covering programming basics, JavaScript, Git, debugging, HTML, and CSS.",
    kind: "Mesivta guide",
    icon: Sparkles,
    href: "/docs?guide=javascript",
    internal: true,
  },
  {
    title: "MDN Web Docs",
    description: "The reference library for web platform technologies, APIs, HTML, CSS, and JavaScript.",
    kind: "Third-party reference",
    icon: Globe2,
    href: "https://developer.mozilla.org/en-US/docs/Web",
    internal: false,
  },
  {
    title: "JavaScript.info",
    description: "A detailed JavaScript tutorial that grows from the basics to modern browser programming.",
    kind: "Third-party tutorial",
    icon: Sparkles,
    href: "https://javascript.info/",
    internal: false,
  },
  {
    title: "CSS-Tricks Almanac",
    description: "Practical CSS reference material and examples for building polished web pages.",
    kind: "Third-party reference",
    icon: BookOpen,
    href: "https://css-tricks.com/almanac/",
    internal: false,
  },
];

const javascriptLessonCache = new Map<string, string>();

export default function DocsPage() {
  return (
    <Suspense>
      <DocsPageInner />
    </Suspense>
  );
}

function DocsPageInner() {
  const searchParams = useSearchParams();
  const showMesivtaGuide = searchParams.get("guide") === "mesivta";
  const showJavascriptGuide = searchParams.get("guide") === "javascript";

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <header className="flex h-24 shrink-0 items-center gap-4 border-b border-border bg-panel px-4">
        <Link href="/" aria-label="Go to Mesivta Code home">
          <img
            src="/white-logo.png"
            alt="Mesivta Code"
            width={64}
            height={74}
            className="drop-shadow-[0_2px_8px_rgba(0,179,255,0.3)]"
          />
        </Link>
        <span className="text-xl font-semibold tracking-tight">Mesivta Code</span>
        <span className="text-xs uppercase tracking-[0.2em] text-muted-2">Documentation</span>
        <div className="flex-1" />
        <a
          href="/dashboard"
          className="inline-flex items-center gap-1.5 rounded border border-border px-3 py-1.5 text-xs font-medium text-muted transition hover:border-border-strong hover:text-foreground"
        >
          <LayoutDashboard className="size-3.5" />
          Dashboard
        </a>
        <a
          href="/ide"
          className="rounded bg-accent px-3 py-1.5 text-xs font-medium text-accent-fg transition hover:opacity-90"
        >
          Open the IDE
        </a>
      </header>

      {showMesivtaGuide ? (
        <GuideReader />
      ) : showJavascriptGuide ? (
        <JavascriptReader />
      ) : (
        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <section className="mb-10 max-w-2xl">
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                <BookOpen className="size-4" />
                Learning library
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Choose your documentation</h1>
              <p className="mt-3 text-sm leading-6 text-muted">
                Start with the Mesivta guide, or choose a trusted reference when you want to go deeper.
              </p>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              {documentation.map((doc) => {
                const Icon = doc.icon;
                const content = (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <span className={`rounded-md p-2 ${doc.internal ? "bg-accent-soft text-accent" : "bg-panel-2 text-muted"}`}>
                        <Icon className="size-5" />
                      </span>
                      {!doc.internal ? (
                        <ExternalLink className="size-4 text-muted-2" />
                      ) : (
                        <span className="rounded-full bg-accent-soft px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent">
                          Start here
                        </span>
                      )}
                    </div>
                    <div className="mt-8">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-2">{doc.kind}</p>
                      <h2 className="mt-2 text-lg font-semibold">{doc.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-muted">{doc.description}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                        {doc.internal ? "Open guide" : "Open resource"}
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </>
                );

                if (!doc.internal) {
                  return (
                    <a
                      key={doc.title}
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group min-h-64 rounded-lg border border-border bg-panel p-6 transition hover:-translate-y-0.5 hover:border-accent/50 hover:bg-panel-2"
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <Link
                    key={doc.title}
                    href={doc.href}
                    className="group min-h-64 rounded-lg border border-accent/40 bg-panel p-6 text-left transition hover:-translate-y-0.5 hover:border-accent hover:bg-panel-2"
                  >
                    {content}
                  </Link>
                );
              })}
            </section>

            <p className="mt-8 text-xs text-muted-2">
              Third-party resources open in a new tab. More Mesivta-written guides can be added here as the club develops.
            </p>
          </div>
        </main>
      )}
    </div>
  );
}

function GuideReader() {
  const searchParams = useSearchParams();
  const selectedLessonId = searchParams.get("lesson") ?? FLAT_LESSONS[0].id;
  const selectedLesson = FLAT_LESSONS.find((lesson) => lesson.id === selectedLessonId) ?? FLAT_LESSONS[0];

  function lessonHref(lessonId: string) {
    return `/docs?guide=mesivta&lesson=${encodeURIComponent(lessonId)}`;
  }

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <aside className="hidden w-72 shrink-0 overflow-y-auto border-r border-border bg-panel md:block">
        <div className="border-b border-border px-4 py-3">
          <a href="/docs" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground">
            <ArrowLeft className="size-3.5" />
            All documentation
          </a>
          <h2 className="mt-4 text-sm font-semibold">Mesivta guide</h2>
          <p className="mt-1 text-xs leading-5 text-muted">Choose a section, then open a lesson.</p>
        </div>
        <nav className="p-3" aria-label="Mesivta guide contents">
          {GUIDE_SECTIONS.map((section) => (
            <div key={section.id} className="mb-4">
              <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                {section.title}
              </p>
              <div className="space-y-0.5">
                {section.lessons.map((lesson) => (
                  <a
                    key={lesson.id}
                    href={lessonHref(lesson.id)}
                    className={`block w-full rounded px-2 py-1.5 text-left text-xs transition ${
                      selectedLesson.id === lesson.id
                        ? "bg-accent-soft font-medium text-foreground"
                        : "text-muted hover:bg-panel-2 hover:text-foreground"
                    }`}
                  >
                    {lesson.title}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 flex-1 overflow-y-auto bg-editor">
        <div className="border-b border-border bg-panel px-4 py-3 md:hidden">
          <label htmlFor="lesson-select" className="text-xs font-medium text-muted">Choose a lesson</label>
          <select
            id="lesson-select"
            value={selectedLesson.id}
            onChange={(event) => { window.location.href = lessonHref(event.target.value); }}
            className="mt-1.5 w-full rounded border border-border bg-background px-2 py-1.5 text-xs text-foreground"
          >
            {GUIDE_SECTIONS.map((section) => (
              <optgroup key={section.id} label={section.title}>
                {section.lessons.map((lesson) => <option key={lesson.id} value={lesson.id}>{lesson.title}</option>)}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="mx-auto max-w-3xl px-6 py-8">
          <LessonView lesson={selectedLesson} />
        </div>
      </main>
    </div>
  );
}

function JavascriptReader() {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("lesson") ?? JAVASCRIPT_FUNDAMENTALS[0].id;
  const selectedLesson = JAVASCRIPT_FUNDAMENTALS.find((lesson) => lesson.id === selectedId) ?? JAVASCRIPT_FUNDAMENTALS[0];
  const cachedContent = javascriptLessonCache.get(selectedLesson.filename);
  const [fetched, setFetched] = useState<{ filename: string; text: string } | null>(null);
  const [error, setError] = useState<{ filename: string; message: string } | null>(null);

  useEffect(() => {
    if (javascriptLessonCache.has(selectedLesson.filename)) return;
    let cancelled = false;
    fetch(`/notes/javascript-fundamentals/${selectedLesson.filename}`)
      .then((response) => {
        if (!response.ok) throw new Error("This lesson could not be loaded.");
        return response.text();
      })
      .then((text) => {
        if (cancelled) return;
        javascriptLessonCache.set(selectedLesson.filename, text);
        setFetched({ filename: selectedLesson.filename, text });
      })
      .catch((reason: Error) => {
        if (!cancelled) setError({ filename: selectedLesson.filename, message: reason.message });
      });
    return () => {
      cancelled = true;
    };
  }, [selectedLesson.filename]);

  const content = cachedContent ?? (fetched?.filename === selectedLesson.filename ? fetched.text : "");
  const loadError = error?.filename === selectedLesson.filename ? error.message : null;

  function lessonHref(id: string) {
    return `/docs?guide=javascript&lesson=${encodeURIComponent(id)}`;
  }

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <aside className="hidden w-72 shrink-0 overflow-y-auto border-r border-border bg-panel md:block">
        <div className="border-b border-border px-4 py-3">
          <a href="/docs" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground">
            <ArrowLeft className="size-3.5" />
            All documentation
          </a>
          <h2 className="mt-4 text-sm font-semibold">JavaScript Fundamentals</h2>
          <p className="mt-1 text-xs leading-5 text-muted">17 numbered lessons from the Mesivta notes.</p>
        </div>
        <nav className="p-3" aria-label="JavaScript Fundamentals contents">
          <div className="space-y-0.5">
            {JAVASCRIPT_FUNDAMENTALS.map((lesson) => (
              <a
                key={lesson.id}
                href={lessonHref(lesson.id)}
                className={`block w-full rounded px-2 py-1.5 text-left text-xs transition ${
                  selectedLesson.id === lesson.id
                    ? "bg-accent-soft font-medium text-foreground"
                    : "text-muted hover:bg-panel-2 hover:text-foreground"
                }`}
              >
                <span className="mr-2 text-muted-2">{lesson.number}.</span>
                {lesson.title}
              </a>
            ))}
          </div>
        </nav>
      </aside>

      <main className="min-w-0 flex-1 overflow-y-auto bg-editor">
        <div className="border-b border-border bg-panel px-4 py-3 md:hidden">
          <label htmlFor="javascript-lesson-select" className="text-xs font-medium text-muted">Choose a lesson</label>
          <select
            id="javascript-lesson-select"
            value={selectedLesson.id}
            onChange={(event) => { window.location.href = lessonHref(event.target.value); }}
            className="mt-1.5 w-full rounded border border-border bg-background px-2 py-1.5 text-xs text-foreground"
          >
            {JAVASCRIPT_FUNDAMENTALS.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>{lesson.number}. {lesson.title}</option>
            ))}
          </select>
        </div>
        <article className="mx-auto max-w-3xl px-6 py-8">
          <div className="mb-5 border-b border-border pb-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">Lesson {selectedLesson.number} of 17</p>
            <h1 className="mt-2 text-2xl font-semibold">{selectedLesson.title}</h1>
          </div>
          {loadError ? (
            <p className="rounded border border-danger/40 bg-danger/10 p-3 text-sm text-danger">{loadError}</p>
          ) : content ? (
            <Markdown content={content} highlight={false} />
          ) : (
            <p className="text-sm text-muted">Loading lesson...</p>
          )}
        </article>
      </main>
    </div>
  );
}