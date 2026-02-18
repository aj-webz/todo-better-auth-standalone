import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "api", 
  format: ["esm"],
  target: "node20",
  bundle: true,
  splitting: false,
  clean: true,
 noExternal: ["@repo/shared", "@repo/db", "@repo/auth"], 
  external: ["events", "fs", "path", "os", "crypto", "async_hooks"], 
  dts: false, 
  minify: true,
});
