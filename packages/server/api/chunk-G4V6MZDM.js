import {
  convertToOpenAPISchema
} from "./chunk-22T4I6T5.js";
import {
  toJsonSchema
} from "./chunk-4MVOWR55.js";

// ../../node_modules/.pnpm/@standard-community+standard-openapi@0.2.9_@standard-community+standard-json@0.3.5_@sta_64dc72374920719b5ebc9a639a523d47/node_modules/@standard-community/standard-openapi/dist/default-u_dwuiYb.js
function getToOpenAPISchemaFn() {
  return async (schema, context) => convertToOpenAPISchema(
    await toJsonSchema(schema, context.options),
    context
  );
}

export {
  getToOpenAPISchemaFn
};
