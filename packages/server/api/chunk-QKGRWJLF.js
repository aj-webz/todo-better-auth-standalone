// ../../node_modules/.pnpm/@standard-community+standard-openapi@0.2.9_@standard-community+standard-json@0.3.5_@sta_64dc72374920719b5ebc9a639a523d47/node_modules/@standard-community/standard-openapi/dist/index-DZEfthgZ.js
var errorMessageWrapper = (message) => `standard-openapi: ${message}`;
var openapiVendorMap = /* @__PURE__ */ new Map();
var getToOpenAPISchemaFn = async (vendor) => {
  const cached = openapiVendorMap.get(vendor);
  if (cached) {
    return cached;
  }
  let vendorFn;
  switch (vendor) {
    case "valibot":
      vendorFn = (await import("./valibot-D_HTw1Gn-ER4TGDEB.js")).default();
      break;
    case "zod":
      vendorFn = (await import("./zod-DSgpEGAE-6AO4QYAS.js")).default();
      break;
    default:
      vendorFn = (await import("./default-u_dwuiYb-GK3ULWT2.js")).default();
  }
  openapiVendorMap.set(vendor, vendorFn);
  return vendorFn;
};
var toOpenAPISchema = async (schema, context = {}) => {
  const fn = await getToOpenAPISchemaFn(schema["~standard"].vendor);
  const { components = {}, options } = context;
  const _schema = await fn(schema, { components, options });
  return {
    schema: _schema,
    components: Object.keys(components).length > 0 ? components : void 0
  };
};

export {
  errorMessageWrapper,
  toOpenAPISchema
};
