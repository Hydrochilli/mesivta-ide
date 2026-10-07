"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RotateCw } from "lucide-react";
import { useFileStore } from "@/stores/useFileStore";
import { useProjectStore } from "@/stores/useProjectStore";
import { buildPreview } from "@/lib/preview/buildPreview";
import { useTerminalStore } from "@/stores/useTerminalStore";

export function PreviewPanel() {
  const tree = useFileStore((s) => s.tree);
  const loading = useFileStore((s) => s.loading);
  const current = useProjectStore((s) => s.current);
  const [version, setVersion] = useState(0);
  const [runFile, setRunFile] = useState<string | undefined>();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const runRequest = useTerminalStore((s) => s.runRequest);
  const reportOutput = useTerminalStore((s) => s.reportOutput);
  const clearRunRequest = useTerminalStore((s) => s.clearRunRequest);

  // Auto-refresh: rebuild srcDoc when tree changes (debounced via effect)
  useEffect(() => {
    const t = setTimeout(() => setVersion((v) => v + 1), 400);
    return () => clearTimeout(t);
  }, [tree]);

  const srcDoc = useMemo(() => buildPreview(tree, runFile), [tree, runFile, version]);

  useEffect(() => {
    if (!runRequest) return;
    setRunFile(runRequest.filePath);
    setVersion((v) => v + 1);
    clearRunRequest();
  }, [clearRunRequest, runRequest]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow || event.data?.source !== "mesivta-preview") return;
      if (event.data.type === "console") reportOutput(`[${event.data.level}] ${event.data.args.join(" ")}`);
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [reportOutput]);

  useEffect(() => {
    if (!runFile) return;
    const timeout = window.setTimeout(() => {
      reportOutput("[timeout] Preview stopped after 5 seconds.");
      setVersion((v) => v + 1);
    }, 5000);
    return () => window.clearTimeout(timeout);
  }, [reportOutput, runFile, version]);

  if (!current) {
    return <div className="flex h-full items-center justify-center text-xs text-muted-2">No project</div>;
  }
  if (loading) {
    return <div className="flex h-full items-center justify-center text-xs text-muted-2">Loading…</div>;
  }
  if (!srcDoc) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-xs text-muted-2">
        <span>No index.html</span>
        <span className="text-muted-2/70">Add an index.html to see a preview</span>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col bg-background">
      <iframe
        key={`${runFile ?? "preview"}-${version}`}
        ref={iframeRef}
        sandbox="allow-scripts allow-modals"
        srcDoc={srcDoc}
        className="flex-1 border-0 bg-white"
        title="Preview"
      />
      <button
        onClick={() => setVersion((v) => v + 1)}
        className="absolute right-2 top-2 z-10 rounded bg-panel/80 p-1 text-muted shadow-sm backdrop-blur hover:bg-panel-2 hover:text-foreground"
        title="Refresh preview"
      >
        <RotateCw className="size-3" />
      </button>
    </div>
  );
}