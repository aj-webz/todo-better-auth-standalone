import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "api",
  format: ["esm"],
  target: "node20", 
  bundle: true,
  splitting: false,
  clean: true,
  platform: "node",
  minify: true,
  
  shims: true, 
  banner: {
    js: `import { createRequire } from 'module'; const require = createRequire(import.meta.url);`,},
 
  external: ["events", "fs", "path", "os", "crypto", "async_hooks", "http", "https", "stream", "url", "util"],
  noExternal: ["@repo/shared", "@repo/db"],
});
