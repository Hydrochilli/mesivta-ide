import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root,
  },
  // Allows loading the dev server from a phone/other device on the LAN.
  allowedDevOrigins: ["192.168.0.20"],
};

export default nextConfig;