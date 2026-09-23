"use client";

import { create } from "zustand";
import { useFileStore } from "@/stores/useFileStore";
import { useProjectStore } from "@/stores/useProjectStore";
import type { FileDTO } from "@/lib/api/client";

export interface TerminalEntry {
  text: string;
  isCommand: boolean;
}

interface TerminalState {
  cwd: string;
  history: TerminalEntry[];
  commandHistory: string[];
  serverRunning: boolean;
  runRequest: { filePath: string; token: number } | null;
  init: (projectName: string) => void;
  execute: (input: string) => Promise<void>;
  killServer: () => void;
  reportOutput: (text: string) => void;
  clearRunRequest: () => void;
}

const COMMANDS = new Set([
  "cd", "pwd", "ls", "mkdir", "touch", "cat", "rm", "mv", "echo",
  "clear", "help", "man", "run", "code", "npm", "whoami", "date", "hostname",
  "uname", "which", "tree",
]);

function normalizePath(cwd: string, value = ".") {
  const parts = (value.startsWith("/") ? value : `${cwd}/${value}`).split("/");
  const result: string[] = [];
  for (const part of parts) {
    if (!part || part === ".") continue;
    if (part === "..") result.pop();
    else result.push(part);
  }
  return `/${result.join("/")}`.replace(/\/$/, "") || "/";
}

function splitArgs(input: string): string[] {
  const matches = input.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) ?? [];
  return matches.map((part) => part.replace(/^(['"])(.*)\1$/, "$2"));
}

function childrenAt(tree: FileDTO[], path: string): FileDTO[] | null {
  if (path === "/") return tree;
  let nodes = tree;
  for (const part of path.split("/").filter(Boolean)) {
    const folder = nodes.find((node) => node.type === "folder" && node.name === part);
    if (!folder?.children) return null;
    nodes = folder.children;
  }
  return nodes;
}

function nodeAt(tree: FileDTO[], path: string): FileDTO | null {
  if (path === "/") return null;
  const parts = path.split("/").filter(Boolean);
  const name = parts.pop();
  const parent = childrenAt(tree, `/${parts.join("/")}` || "/");
  return parent?.find((node) => node.name === name) ?? null;
}

function parentPath(path: string) {
  const parts = path.split("/").filter(Boolean);
  parts.pop();
  return `/${parts.join("/")}` || "/";
}

function nameOf(path: string) {
  return path.split("/").filter(Boolean).pop() ?? "";
}

function collectTree(nodes: FileDTO[], prefix = ""): string[] {
  return nodes.flatMap((node) => {
    const path = `${prefix}/${node.name}`;
    return node.children ? [path + "/", ...collectTree(node.children, path)] : [path];
  });
}

function safeSystemOutput(command: string) {
  if (["npm", "code"].includes(command)) return `${command}: real command execution is disabled in this terminal.`;
  if (["hostname", "uname", "which"].includes(command)) return `${command}: system access is disabled in this terminal.`;
  return `${command}: command is available as a learning placeholder, but does not run on the server.`;
}

export const useTerminalStore = create<TerminalState>((set, get) => ({
  cwd: "/",
  history: [],
  commandHistory: [],
  serverRunning: false,
  runRequest: null,
  init: () => set({ cwd: "/", history: [], commandHistory: [], serverRunning: false }),
  killServer: () => set({ serverRunning: false }),
  reportOutput: (text) => set((state) => ({ history: [...state.history, { text, isCommand: false }] })),
  clearRunRequest: () => set({ runRequest: null }),
  execute: async (input) => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const args = splitArgs(trimmed);
    const command = args[0]?.toLowerCase() ?? "";
    const add = (text: string) => set((state) => ({ history: [...state.history, { text, isCommand: false }] }));
    set((state) => ({
      history: [...state.history, { text: trimmed, isCommand: true }],
      commandHistory: [trimmed, ...state.commandHistory.filter((item) => item !== trimmed)].slice(0, 50),
    }));

    if (!COMMANDS.has(command)) {
      add(`${command}: command not found. Type "help" for available commands.`);
      return;
    }

    const project = useProjectStore.getState().current;
    const fileStore = useFileStore.getState();
    const tree = fileStore.tree;
    const target = normalizePath(get().cwd, args[1]);

    switch (command) {
      case "clear":
        set({ history: [] });
        return;
      case "help":
      case "man":
        add("Virtual terminal commands: cd pwd ls mkdir touch cat rm mv echo clear help man run tree");
        add("npm, code, hostname, uname, and which are safe placeholders; no server commands run.");
        return;
      case "run": {
        const node = nodeAt(tree, target);
        if (!node || node.type !== "file") {
          add(`run: no such file: ${args[1] ?? ""}`);
          return;
        }
        const extension = nameOf(target).split(".").pop()?.toLowerCase();
        if (extension !== "html" && extension !== "js" && extension !== "mjs") {
          add("run: only HTML and JavaScript files can run in the browser preview");
          return;
        }
        set({ runRequest: { filePath: target, token: Date.now() } });
        add(`Started ${target} in the sandboxed browser preview (5 second limit).`);
        return;
      }
      case "pwd": add(get().cwd); return;
      case "cd":
        if (target !== "/" && nodeAt(tree, target)?.type !== "folder") add(`cd: no such directory: ${args[1] ?? "."}`);
        else set({ cwd: target });
        return;
      case "ls": {
        const entries = childrenAt(tree, normalizePath(get().cwd, args[1])) ?? [];
        add(entries.map((node) => node.type === "folder" ? `${node.name}/` : node.name).join("  ") || "(empty)");
        return;
      }
      case "tree": add(collectTree(childrenAt(tree, normalizePath(get().cwd, args[1])) ?? []).join("\n") || "(empty)"); return;
      case "cat": {
        const node = nodeAt(tree, target);
        if (!node || node.type !== "file") add(`cat: no such file: ${args[1] ?? ""}`);
        else add(node.content ?? "");
        return;
      }
      case "echo": add(args.slice(1).join(" ")); return;
      case "mkdir":
      case "touch": {
        if (!project) { add("No project selected."); return; }
        const parent = nodeAt(tree, parentPath(target));
        const parentId = parent?.type === "folder" ? parent.id : null;
        if (parentPath(target) !== "/" && !parentId) { add(`${command}: parent directory does not exist`); return; }
        if (nodeAt(tree, target)) { add(`${command}: ${nameOf(target)} already exists`); return; }
        await fileStore.createFile(project.id, parentId, nameOf(target), command === "mkdir" ? "folder" : "file", "");
        add(`${command}: created ${nameOf(target)}`);
        return;
      }
      case "rm": {
        const node = nodeAt(tree, target);
        if (!node) { add(`rm: no such file or directory: ${args[1] ?? ""}`); return; }
        const descendants = node.children ? collectIds(node.children) : [];
        for (const id of [...descendants, node.id]) await fileStore.deleteFile(id);
        add(`removed ${nameOf(target)}`);
        return;
      }
      case "mv": {
        const source = nodeAt(tree, normalizePath(get().cwd, args[1]));
        const destination = normalizePath(get().cwd, args[2]);
        if (!source || !args[2]) { add("mv: source and destination are required"); return; }
        const destinationParent = nodeAt(tree, parentPath(destination));
        await fileStore.updateFile(source.id, {
          name: nameOf(destination),
          parent_folder_id: destinationParent?.type === "folder" ? destinationParent.id : null,
        });
        add(`moved ${nameOf(normalizePath(get().cwd, args[1]))} to ${destination}`);
        return;
      }
      case "whoami": add("mesivta-member"); return;
      case "date": add(new Date().toString()); return;
      default: add(safeSystemOutput(command));
    }
  },
}));

function collectIds(nodes: FileDTO[]): string[] {
  return nodes.flatMap((node) => [node.id, ...(node.children ? collectIds(node.children) : [])]);
}