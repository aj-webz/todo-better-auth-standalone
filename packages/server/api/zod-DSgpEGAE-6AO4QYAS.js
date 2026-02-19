import {
  getToOpenAPISchemaFn
} from "./chunk-G4V6MZDM.js";
import "./chunk-22T4I6T5.js";
import {
  errorMessageWrapper
} from "./chunk-QKGRWJLF.js";
import "./chunk-G3RKBAZL.js";
import "./chunk-4MVOWR55.js";
import "./chunk-MLKGABMK.js";

// ../../node_modules/.pnpm/@standard-community+standard-openapi@0.2.9_@standard-community+standard-json@0.3.5_@sta_64dc72374920719b5ebc9a639a523d47/node_modules/@standard-community/standard-openapi/dist/zod-DSgpEGAE.js
function getToOpenAPISchemaFn2() {
  return async (schema, context) => {
    if ("_zod" in schema) {
      return getToOpenAPISchemaFn()(schema, {
        components: context.components,
        options: { io: "input", ...context.options }
      });
    }
    try {
      const { createSchema } = await import("./dist-FTK5RL3H.js");
      const { schema: _schema, components } = createSchema(
        // @ts-expect-error
        schema,
        { schemaType: "input", ...context.options }
      );
      if (components) {
        context.components.schemas = {
          ...context.components.schemas,
          ...components
        };
      }
      return _schema;
    } catch {
      throw new Error(
        errorMessageWrapper(`Missing dependencies "zod-openapi v4".`)
      );
    }
  };
}
export {
  getToOpenAPISchemaFn2 as default
};
