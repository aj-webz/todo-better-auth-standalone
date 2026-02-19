import {
  MissingDependencyError
} from "./chunk-4MVOWR55.js";
import "./chunk-MLKGABMK.js";

// ../../node_modules/.pnpm/@standard-community+standard-json@0.3.5_@standard-schema+spec@1.1.0_@types+json-schema@_f89f0da8eb08fb1ae9b0ddcdc3aa8a2e/node_modules/@standard-community/standard-json/dist/effect-QlVUlMFu.js
async function getToJsonSchemaFn() {
  try {
    const { JSONSchema } = await import("effect");
    return (schema) => JSONSchema.make(schema);
  } catch {
    throw new MissingDependencyError("effect");
  }
}
export {
  getToJsonSchemaFn as default
};
