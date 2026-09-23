"use client";

import { useEffect, useRef, useState } from "react";
import { TerminalSquare } from "lucide-react";
import { useProjectStore } from "@/stores/useProjectStore";
import { useTerminalStore } from "@/stores/useTerminalStore";

export function TerminalPanel() {
  const project = useProjectStore((state) => state.current);
  const cwd = useTerminalStore((state) => state.cwd);
  const history = useTerminalStore((state) => state.history);
  const commandHistory = useTerminalStore((state) => state.commandHistory);
  const init = useTerminalStore((state) => state.init);
  const execute = useTerminalStore((state) => state.execute);
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    init(project?.name ?? "project");
    setInput("");
    setHistoryIndex(-1);
  }, [init, project?.id]);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight });
  }, [history]);

  const submit = async () => {
    const command = input;
    setInput("");
    setHistoryIndex(-1);
    await execute(command);
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      void submit();
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const next = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(next);
      setInput(commandHistory[next] ?? "");
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = historyIndex - 1;
      setHistoryIndex(next);
      setInput(next >= 0 ? commandHistory[next] : "");
    }
    if (event.key === "Tab") {
      event.preventDefault();
      const command = input.split(/\s+/)[0] ?? "";
      const matches = ["cd", "pwd", "ls", "mkdir", "touch", "cat", "rm", "mv", "echo", "clear", "help", "man", "run", "code", "npm", "whoami", "date", "hostname", "uname", "which", "tree"]
        .filter((item) => item.startsWith(command));
      if (matches.length === 1) setInput(matches[0] + " ");
    }
  };

  return (
    <section className="flex h-full min-h-0 flex-col bg-[#0d0d12] text-[#d4d4d4]" aria-label="Virtual terminal">
      <header className="flex h-10 shrink-0 items-center gap-2 border-b border-white/10 px-3 text-xs text-white/70">
        <TerminalSquare className="size-4 text-cyan-300" />
        <span>Mesivta virtual terminal</span>
        <span className="ml-auto text-white/40">File commands only</span>
      </header>
      <div ref={outputRef} className="min-h-0 flex-1 overflow-auto p-3 font-mono text-xs leading-5" onClick={() => inputRef.current?.focus()}>
        <div className="mb-3 text-cyan-300">Safe terminal: changes apply to this project only. Type &quot;help&quot; for commands.</div>
        {history.map((entry, index) => (
          <div key={`${index}-${entry.text}`} className={entry.isCommand ? "text-white" : "whitespace-pre-wrap text-white/75"}>
            {entry.isCommand ? <><span className="text-blue-300">{cwd} $ </span>{entry.text}</> : entry.text}
          </div>
        ))}
        <div className="mt-1 flex items-center gap-2">
          <span className="shrink-0 text-blue-300">{cwd} $</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            className="min-w-0 flex-1 bg-transparent text-white outline-none"
            aria-label="Terminal command"
            autoComplete="off"
            spellCheck={false}
            autoFocus
          />
        </div>
      </div>
    </section>
  );
}