import {
  MissingDependencyError
} from "./chunk-4MVOWR55.js";
import "./chunk-MLKGABMK.js";

// ../../node_modules/.pnpm/@standard-community+standard-json@0.3.5_@standard-schema+spec@1.1.0_@types+json-schema@_f89f0da8eb08fb1ae9b0ddcdc3aa8a2e/node_modules/@standard-community/standard-json/dist/zod-Bwrt9trS.js
var zodv4Error = new MissingDependencyError("zod v4");
async function getToJsonSchemaFn() {
  return async (schema, options) => {
    let handler;
    if ("_zod" in schema) {
      try {
        const mod = await import("zod/v4/core");
        handler = mod.toJSONSchema;
      } catch {
        throw zodv4Error;
      }
    } else {
      try {
        const mod = await import("./esm-CONLVGOX.js");
        handler = mod.zodToJsonSchema;
      } catch {
        throw new MissingDependencyError("zod-to-json-schema");
      }
    }
    return handler(schema, options);
  };
}
export {
  getToJsonSchemaFn as default
};
