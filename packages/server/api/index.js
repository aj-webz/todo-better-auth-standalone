var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../../node_modules/.pnpm/quansync@0.2.11/node_modules/quansync/dist/index.mjs
function isThenable(value) {
  return value && typeof value === "object" && typeof value.then === "function";
}
function isQuansyncGenerator(value) {
  return value && typeof value === "object" && typeof value[Symbol.iterator] === "function" && "__quansync" in value;
}
function fromObject(options) {
  const generator = function* (...args) {
    const isAsync = yield GET_IS_ASYNC;
    if (isAsync)
      return yield options.async.apply(this, args);
    return options.sync.apply(this, args);
  };
  function fn(...args) {
    const iter = generator.apply(this, args);
    iter.then = (...thenArgs) => options.async.apply(this, args).then(...thenArgs);
    iter.__quansync = true;
    return iter;
  }
  fn.sync = options.sync;
  fn.async = options.async;
  return fn;
}
function fromPromise(promise) {
  return fromObject({
    async: () => Promise.resolve(promise),
    sync: () => {
      if (isThenable(promise))
        throw new QuansyncError();
      return promise;
    }
  });
}
function unwrapYield(value, isAsync) {
  if (value === GET_IS_ASYNC)
    return isAsync;
  if (isQuansyncGenerator(value))
    return isAsync ? iterateAsync(value) : iterateSync(value);
  if (!isAsync && isThenable(value))
    throw new QuansyncError();
  return value;
}
function iterateSync(generator, onYield = DEFAULT_ON_YIELD) {
  let current = generator.next();
  while (!current.done) {
    try {
      current = generator.next(unwrapYield(onYield(current.value, false)));
    } catch (err) {
      current = generator.throw(err);
    }
  }
  return unwrapYield(current.value);
}
async function iterateAsync(generator, onYield = DEFAULT_ON_YIELD) {
  let current = generator.next();
  while (!current.done) {
    try {
      current = generator.next(await unwrapYield(onYield(current.value, true), true));
    } catch (err) {
      current = generator.throw(err);
    }
  }
  return current.value;
}
function fromGeneratorFn(generatorFn, options) {
  return fromObject({
    name: generatorFn.name,
    async(...args) {
      return iterateAsync(generatorFn.apply(this, args), options?.onYield);
    },
    sync(...args) {
      return iterateSync(generatorFn.apply(this, args), options?.onYield);
    }
  });
}
function quansync(input, options) {
  if (isThenable(input))
    return fromPromise(input);
  if (typeof input === "function")
    return fromGeneratorFn(input, options);
  else
    return fromObject(input);
}
var GET_IS_ASYNC, QuansyncError, DEFAULT_ON_YIELD, getIsAsync;
var init_dist = __esm({
  "../../node_modules/.pnpm/quansync@0.2.11/node_modules/quansync/dist/index.mjs"() {
    "use strict";
    GET_IS_ASYNC = /* @__PURE__ */ Symbol.for("quansync.getIsAsync");
    QuansyncError = class extends Error {
      constructor(message = "Unexpected promise in sync context") {
        super(message);
        this.name = "QuansyncError";
      }
    };
    DEFAULT_ON_YIELD = (value) => value;
    getIsAsync = quansync({
      async: () => Promise.resolve(true),
      sync: () => false
    });
  }
});

// ../../node_modules/.pnpm/@standard-community+standard-json@0.3.5_@standard-schema+spec@1.1.0_@types+json-schema@_f89f0da8eb08fb1ae9b0ddcdc3aa8a2e/node_modules/@standard-community/standard-json/dist/arktype-aI7TBD0R.js
var arktype_aI7TBD0R_exports = {};
__export(arktype_aI7TBD0R_exports, {
  default: () => getToJsonSchemaFn
});
function getToJsonSchemaFn() {
  return (schema, options) => schema.toJsonSchema(options);
}
var init_arktype_aI7TBD0R = __esm({
  "../../node_modules/.pnpm/@standard-community+standard-json@0.3.5_@standard-schema+spec@1.1.0_@types+json-schema@_f89f0da8eb08fb1ae9b0ddcdc3aa8a2e/node_modules/@standard-community/standard-json/dist/arktype-aI7TBD0R.js"() {
    "use strict";
  }
});

// ../../node_modules/.pnpm/@standard-community+standard-json@0.3.5_@standard-schema+spec@1.1.0_@types+json-schema@_f89f0da8eb08fb1ae9b0ddcdc3aa8a2e/node_modules/@standard-community/standard-json/dist/effect-QlVUlMFu.js
var effect_QlVUlMFu_exports = {};
__export(effect_QlVUlMFu_exports, {
  default: () => getToJsonSchemaFn2
});
async function getToJsonSchemaFn2() {
  try {
    const { JSONSchema } = await import("effect");
    return (schema) => JSONSchema.make(schema);
  } catch {
    throw new MissingDependencyError("effect");
  }
}
var init_effect_QlVUlMFu = __esm({
  "../../node_modules/.pnpm/@standard-community+standard-json@0.3.5_@standard-schema+spec@1.1.0_@types+json-schema@_f89f0da8eb08fb1ae9b0ddcdc3aa8a2e/node_modules/@standard-community/standard-json/dist/effect-QlVUlMFu.js"() {
    "use strict";
    init_index_CLddUTqr();
  }
});

// ../../node_modules/.pnpm/@standard-community+standard-json@0.3.5_@standard-schema+spec@1.1.0_@types+json-schema@_f89f0da8eb08fb1ae9b0ddcdc3aa8a2e/node_modules/@standard-community/standard-json/dist/sury-CWZTCd75.js
var sury_CWZTCd75_exports = {};
__export(sury_CWZTCd75_exports, {
  default: () => getToJsonSchemaFn3
});
async function getToJsonSchemaFn3() {
  try {
    const { toJSONSchema } = await import("sury");
    return toJSONSchema;
  } catch {
    throw new MissingDependencyError("sury");
  }
}
var init_sury_CWZTCd75 = __esm({
  "../../node_modules/.pnpm/@standard-community+standard-json@0.3.5_@standard-schema+spec@1.1.0_@types+json-schema@_f89f0da8eb08fb1ae9b0ddcdc3aa8a2e/node_modules/@standard-community/standard-json/dist/sury-CWZTCd75.js"() {
    "use strict";
    init_index_CLddUTqr();
  }
});

// ../../node_modules/.pnpm/@standard-community+standard-json@0.3.5_@standard-schema+spec@1.1.0_@types+json-schema@_f89f0da8eb08fb1ae9b0ddcdc3aa8a2e/node_modules/@standard-community/standard-json/dist/typebox-Dei93FPO.js
var typebox_Dei93FPO_exports = {};
__export(typebox_Dei93FPO_exports, {
  default: () => getToJsonSchemaFn4
});
function getToJsonSchemaFn4() {
  return (schema) => JSON.parse(JSON.stringify(schema.Type()));
}
var init_typebox_Dei93FPO = __esm({
  "../../node_modules/.pnpm/@standard-community+standard-json@0.3.5_@standard-schema+spec@1.1.0_@types+json-schema@_f89f0da8eb08fb1ae9b0ddcdc3aa8a2e/node_modules/@standard-community/standard-json/dist/typebox-Dei93FPO.js"() {
    "use strict";
  }
});

// ../../node_modules/.pnpm/@standard-community+standard-json@0.3.5_@standard-schema+spec@1.1.0_@types+json-schema@_f89f0da8eb08fb1ae9b0ddcdc3aa8a2e/node_modules/@standard-community/standard-json/dist/valibot--1zFm7rT.js
var valibot_1zFm7rT_exports = {};
__export(valibot_1zFm7rT_exports, {
  default: () => getToJsonSchemaFn5
});
async function getToJsonSchemaFn5() {
  try {
    const { toJsonSchema: toJsonSchema2 } = await import("@valibot/to-json-schema");
    return toJsonSchema2;
  } catch {
    throw new MissingDependencyError("@valibot/to-json-schema");
  }
}
var init_valibot_1zFm7rT = __esm({
  "../../node_modules/.pnpm/@standard-community+standard-json@0.3.5_@standard-schema+spec@1.1.0_@types+json-schema@_f89f0da8eb08fb1ae9b0ddcdc3aa8a2e/node_modules/@standard-community/standard-json/dist/valibot--1zFm7rT.js"() {
    "use strict";
    init_index_CLddUTqr();
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/Options.js
var ignoreOverride, jsonDescription, defaultOptions, getDefaultOptions;
var init_Options = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/Options.js"() {
    "use strict";
    ignoreOverride = /* @__PURE__ */ Symbol("Let zodToJsonSchema decide on which parser to use");
    jsonDescription = (jsonSchema, def) => {
      if (def.description) {
        try {
          return {
            ...jsonSchema,
            ...JSON.parse(def.description)
          };
        } catch {
        }
      }
      return jsonSchema;
    };
    defaultOptions = {
      name: void 0,
      $refStrategy: "root",
      basePath: ["#"],
      effectStrategy: "input",
      pipeStrategy: "all",
      dateStrategy: "format:date-time",
      mapStrategy: "entries",
      removeAdditionalStrategy: "passthrough",
      allowedAdditionalProperties: true,
      rejectedAdditionalProperties: false,
      definitionPath: "definitions",
      target: "jsonSchema7",
      strictUnions: false,
      definitions: {},
      errorMessages: false,
      markdownDescription: false,
      patternStrategy: "escape",
      applyRegexFlags: false,
      emailStrategy: "format:email",
      base64Strategy: "contentEncoding:base64",
      nameStrategy: "ref",
      openAiAnyTypeName: "OpenAiAnyType"
    };
    getDefaultOptions = (options) => typeof options === "string" ? {
      ...defaultOptions,
      name: options
    } : {
      ...defaultOptions,
      ...options
    };
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/Refs.js
var getRefs;
var init_Refs = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/Refs.js"() {
    "use strict";
    init_Options();
    getRefs = (options) => {
      const _options = getDefaultOptions(options);
      const currentPath = _options.name !== void 0 ? [..._options.basePath, _options.definitionPath, _options.name] : _options.basePath;
      return {
        ..._options,
        flags: { hasReferencedOpenAiAnyType: false },
        currentPath,
        propertyPath: void 0,
        seen: new Map(Object.entries(_options.definitions).map(([name, def]) => [
          def._def,
          {
            def: def._def,
            path: [..._options.basePath, _options.definitionPath, name],
            // Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
            jsonSchema: void 0
          }
        ]))
      };
    };
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/errorMessages.js
function addErrorMessage(res, key, errorMessage, refs) {
  if (!refs?.errorMessages)
    return;
  if (errorMessage) {
    res.errorMessage = {
      ...res.errorMessage,
      [key]: errorMessage
    };
  }
}
function setResponseValueAndErrors(res, key, value, errorMessage, refs) {
  res[key] = value;
  addErrorMessage(res, key, errorMessage, refs);
}
var init_errorMessages = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/errorMessages.js"() {
    "use strict";
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/getRelativePath.js
var getRelativePath;
var init_getRelativePath = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/getRelativePath.js"() {
    "use strict";
    getRelativePath = (pathA, pathB) => {
      let i = 0;
      for (; i < pathA.length && i < pathB.length; i++) {
        if (pathA[i] !== pathB[i])
          break;
      }
      return [(pathA.length - i).toString(), ...pathB.slice(i)].join("/");
    };
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/any.js
function parseAnyDef(refs) {
  if (refs.target !== "openAi") {
    return {};
  }
  const anyDefinitionPath = [
    ...refs.basePath,
    refs.definitionPath,
    refs.openAiAnyTypeName
  ];
  refs.flags.hasReferencedOpenAiAnyType = true;
  return {
    $ref: refs.$refStrategy === "relative" ? getRelativePath(anyDefinitionPath, refs.currentPath) : anyDefinitionPath.join("/")
  };
}
var init_any = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/any.js"() {
    "use strict";
    init_getRelativePath();
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/array.js
import { ZodFirstPartyTypeKind } from "zod/v3";
function parseArrayDef(def, refs) {
  const res = {
    type: "array"
  };
  if (def.type?._def && def.type?._def?.typeName !== ZodFirstPartyTypeKind.ZodAny) {
    res.items = parseDef(def.type._def, {
      ...refs,
      currentPath: [...refs.currentPath, "items"]
    });
  }
  if (def.minLength) {
    setResponseValueAndErrors(res, "minItems", def.minLength.value, def.minLength.message, refs);
  }
  if (def.maxLength) {
    setResponseValueAndErrors(res, "maxItems", def.maxLength.value, def.maxLength.message, refs);
  }
  if (def.exactLength) {
    setResponseValueAndErrors(res, "minItems", def.exactLength.value, def.exactLength.message, refs);
    setResponseValueAndErrors(res, "maxItems", def.exactLength.value, def.exactLength.message, refs);
  }
  return res;
}
var init_array = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/array.js"() {
    "use strict";
    init_errorMessages();
    init_parseDef();
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/bigint.js
function parseBigintDef(def, refs) {
  const res = {
    type: "integer",
    format: "int64"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}
var init_bigint = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/bigint.js"() {
    "use strict";
    init_errorMessages();
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/boolean.js
function parseBooleanDef() {
  return {
    type: "boolean"
  };
}
var init_boolean = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/boolean.js"() {
    "use strict";
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/branded.js
function parseBrandedDef(_def, refs) {
  return parseDef(_def.type._def, refs);
}
var init_branded = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/branded.js"() {
    "use strict";
    init_parseDef();
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/catch.js
var parseCatchDef;
var init_catch = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/catch.js"() {
    "use strict";
    init_parseDef();
    parseCatchDef = (def, refs) => {
      return parseDef(def.innerType._def, refs);
    };
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/date.js
function parseDateDef(def, refs, overrideDateStrategy) {
  const strategy = overrideDateStrategy ?? refs.dateStrategy;
  if (Array.isArray(strategy)) {
    return {
      anyOf: strategy.map((item, i) => parseDateDef(def, refs, item))
    };
  }
  switch (strategy) {
    case "string":
    case "format:date-time":
      return {
        type: "string",
        format: "date-time"
      };
    case "format:date":
      return {
        type: "string",
        format: "date"
      };
    case "integer":
      return integerDateParser(def, refs);
  }
}
var integerDateParser;
var init_date = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/date.js"() {
    "use strict";
    init_errorMessages();
    integerDateParser = (def, refs) => {
      const res = {
        type: "integer",
        format: "unix-time"
      };
      if (refs.target === "openApi3") {
        return res;
      }
      for (const check of def.checks) {
        switch (check.kind) {
          case "min":
            setResponseValueAndErrors(
              res,
              "minimum",
              check.value,
              // This is in milliseconds
              check.message,
              refs
            );
            break;
          case "max":
            setResponseValueAndErrors(
              res,
              "maximum",
              check.value,
              // This is in milliseconds
              check.message,
              refs
            );
            break;
        }
      }
      return res;
    };
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/default.js
function parseDefaultDef(_def, refs) {
  return {
    ...parseDef(_def.innerType._def, refs),
    default: _def.defaultValue()
  };
}
var init_default = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/default.js"() {
    "use strict";
    init_parseDef();
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/effects.js
function parseEffectsDef(_def, refs) {
  return refs.effectStrategy === "input" ? parseDef(_def.schema._def, refs) : parseAnyDef(refs);
}
var init_effects = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/effects.js"() {
    "use strict";
    init_parseDef();
    init_any();
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/enum.js
function parseEnumDef(def) {
  return {
    type: "string",
    enum: Array.from(def.values)
  };
}
var init_enum = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/enum.js"() {
    "use strict";
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/intersection.js
function parseIntersectionDef(def, refs) {
  const allOf = [
    parseDef(def.left._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "0"]
    }),
    parseDef(def.right._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "1"]
    })
  ].filter((x) => !!x);
  let unevaluatedProperties = refs.target === "jsonSchema2019-09" ? { unevaluatedProperties: false } : void 0;
  const mergedAllOf = [];
  allOf.forEach((schema) => {
    if (isJsonSchema7AllOfType(schema)) {
      mergedAllOf.push(...schema.allOf);
      if (schema.unevaluatedProperties === void 0) {
        unevaluatedProperties = void 0;
      }
    } else {
      let nestedSchema = schema;
      if ("additionalProperties" in schema && schema.additionalProperties === false) {
        const { additionalProperties, ...rest } = schema;
        nestedSchema = rest;
      } else {
        unevaluatedProperties = void 0;
      }
      mergedAllOf.push(nestedSchema);
    }
  });
  return mergedAllOf.length ? {
    allOf: mergedAllOf,
    ...unevaluatedProperties
  } : void 0;
}
var isJsonSchema7AllOfType;
var init_intersection = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/intersection.js"() {
    "use strict";
    init_parseDef();
    isJsonSchema7AllOfType = (type) => {
      if ("type" in type && type.type === "string")
        return false;
      return "allOf" in type;
    };
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/literal.js
function parseLiteralDef(def, refs) {
  const parsedType = typeof def.value;
  if (parsedType !== "bigint" && parsedType !== "number" && parsedType !== "boolean" && parsedType !== "string") {
    return {
      type: Array.isArray(def.value) ? "array" : "object"
    };
  }
  if (refs.target === "openApi3") {
    return {
      type: parsedType === "bigint" ? "integer" : parsedType,
      enum: [def.value]
    };
  }
  return {
    type: parsedType === "bigint" ? "integer" : parsedType,
    const: def.value
  };
}
var init_literal = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/literal.js"() {
    "use strict";
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/string.js
function parseStringDef(def, refs) {
  const res = {
    type: "string"
  };
  if (def.checks) {
    for (const check of def.checks) {
      switch (check.kind) {
        case "min":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          break;
        case "max":
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "email":
          switch (refs.emailStrategy) {
            case "format:email":
              addFormat(res, "email", check.message, refs);
              break;
            case "format:idn-email":
              addFormat(res, "idn-email", check.message, refs);
              break;
            case "pattern:zod":
              addPattern(res, zodPatterns.email, check.message, refs);
              break;
          }
          break;
        case "url":
          addFormat(res, "uri", check.message, refs);
          break;
        case "uuid":
          addFormat(res, "uuid", check.message, refs);
          break;
        case "regex":
          addPattern(res, check.regex, check.message, refs);
          break;
        case "cuid":
          addPattern(res, zodPatterns.cuid, check.message, refs);
          break;
        case "cuid2":
          addPattern(res, zodPatterns.cuid2, check.message, refs);
          break;
        case "startsWith":
          addPattern(res, RegExp(`^${escapeLiteralCheckValue(check.value, refs)}`), check.message, refs);
          break;
        case "endsWith":
          addPattern(res, RegExp(`${escapeLiteralCheckValue(check.value, refs)}$`), check.message, refs);
          break;
        case "datetime":
          addFormat(res, "date-time", check.message, refs);
          break;
        case "date":
          addFormat(res, "date", check.message, refs);
          break;
        case "time":
          addFormat(res, "time", check.message, refs);
          break;
        case "duration":
          addFormat(res, "duration", check.message, refs);
          break;
        case "length":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "includes": {
          addPattern(res, RegExp(escapeLiteralCheckValue(check.value, refs)), check.message, refs);
          break;
        }
        case "ip": {
          if (check.version !== "v6") {
            addFormat(res, "ipv4", check.message, refs);
          }
          if (check.version !== "v4") {
            addFormat(res, "ipv6", check.message, refs);
          }
          break;
        }
        case "base64url":
          addPattern(res, zodPatterns.base64url, check.message, refs);
          break;
        case "jwt":
          addPattern(res, zodPatterns.jwt, check.message, refs);
          break;
        case "cidr": {
          if (check.version !== "v6") {
            addPattern(res, zodPatterns.ipv4Cidr, check.message, refs);
          }
          if (check.version !== "v4") {
            addPattern(res, zodPatterns.ipv6Cidr, check.message, refs);
          }
          break;
        }
        case "emoji":
          addPattern(res, zodPatterns.emoji(), check.message, refs);
          break;
        case "ulid": {
          addPattern(res, zodPatterns.ulid, check.message, refs);
          break;
        }
        case "base64": {
          switch (refs.base64Strategy) {
            case "format:binary": {
              addFormat(res, "binary", check.message, refs);
              break;
            }
            case "contentEncoding:base64": {
              setResponseValueAndErrors(res, "contentEncoding", "base64", check.message, refs);
              break;
            }
            case "pattern:zod": {
              addPattern(res, zodPatterns.base64, check.message, refs);
              break;
            }
          }
          break;
        }
        case "nanoid": {
          addPattern(res, zodPatterns.nanoid, check.message, refs);
        }
        case "toLowerCase":
        case "toUpperCase":
        case "trim":
          break;
        default:
          /* @__PURE__ */ ((_) => {
          })(check);
      }
    }
  }
  return res;
}
function escapeLiteralCheckValue(literal, refs) {
  return refs.patternStrategy === "escape" ? escapeNonAlphaNumeric(literal) : literal;
}
function escapeNonAlphaNumeric(source) {
  let result = "";
  for (let i = 0; i < source.length; i++) {
    if (!ALPHA_NUMERIC.has(source[i])) {
      result += "\\";
    }
    result += source[i];
  }
  return result;
}
function addFormat(schema, value, message, refs) {
  if (schema.format || schema.anyOf?.some((x) => x.format)) {
    if (!schema.anyOf) {
      schema.anyOf = [];
    }
    if (schema.format) {
      schema.anyOf.push({
        format: schema.format,
        ...schema.errorMessage && refs.errorMessages && {
          errorMessage: { format: schema.errorMessage.format }
        }
      });
      delete schema.format;
      if (schema.errorMessage) {
        delete schema.errorMessage.format;
        if (Object.keys(schema.errorMessage).length === 0) {
          delete schema.errorMessage;
        }
      }
    }
    schema.anyOf.push({
      format: value,
      ...message && refs.errorMessages && { errorMessage: { format: message } }
    });
  } else {
    setResponseValueAndErrors(schema, "format", value, message, refs);
  }
}
function addPattern(schema, regex, message, refs) {
  if (schema.pattern || schema.allOf?.some((x) => x.pattern)) {
    if (!schema.allOf) {
      schema.allOf = [];
    }
    if (schema.pattern) {
      schema.allOf.push({
        pattern: schema.pattern,
        ...schema.errorMessage && refs.errorMessages && {
          errorMessage: { pattern: schema.errorMessage.pattern }
        }
      });
      delete schema.pattern;
      if (schema.errorMessage) {
        delete schema.errorMessage.pattern;
        if (Object.keys(schema.errorMessage).length === 0) {
          delete schema.errorMessage;
        }
      }
    }
    schema.allOf.push({
      pattern: stringifyRegExpWithFlags(regex, refs),
      ...message && refs.errorMessages && { errorMessage: { pattern: message } }
    });
  } else {
    setResponseValueAndErrors(schema, "pattern", stringifyRegExpWithFlags(regex, refs), message, refs);
  }
}
function stringifyRegExpWithFlags(regex, refs) {
  if (!refs.applyRegexFlags || !regex.flags) {
    return regex.source;
  }
  const flags = {
    i: regex.flags.includes("i"),
    m: regex.flags.includes("m"),
    s: regex.flags.includes("s")
    // `.` matches newlines
  };
  const source = flags.i ? regex.source.toLowerCase() : regex.source;
  let pattern = "";
  let isEscaped = false;
  let inCharGroup = false;
  let inCharRange = false;
  for (let i = 0; i < source.length; i++) {
    if (isEscaped) {
      pattern += source[i];
      isEscaped = false;
      continue;
    }
    if (flags.i) {
      if (inCharGroup) {
        if (source[i].match(/[a-z]/)) {
          if (inCharRange) {
            pattern += source[i];
            pattern += `${source[i - 2]}-${source[i]}`.toUpperCase();
            inCharRange = false;
          } else if (source[i + 1] === "-" && source[i + 2]?.match(/[a-z]/)) {
            pattern += source[i];
            inCharRange = true;
          } else {
            pattern += `${source[i]}${source[i].toUpperCase()}`;
          }
          continue;
        }
      } else if (source[i].match(/[a-z]/)) {
        pattern += `[${source[i]}${source[i].toUpperCase()}]`;
        continue;
      }
    }
    if (flags.m) {
      if (source[i] === "^") {
        pattern += `(^|(?<=[\r
]))`;
        continue;
      } else if (source[i] === "$") {
        pattern += `($|(?=[\r
]))`;
        continue;
      }
    }
    if (flags.s && source[i] === ".") {
      pattern += inCharGroup ? `${source[i]}\r
` : `[${source[i]}\r
]`;
      continue;
    }
    pattern += source[i];
    if (source[i] === "\\") {
      isEscaped = true;
    } else if (inCharGroup && source[i] === "]") {
      inCharGroup = false;
    } else if (!inCharGroup && source[i] === "[") {
      inCharGroup = true;
    }
  }
  try {
    new RegExp(pattern);
  } catch {
    console.warn(`Could not convert regex pattern at ${refs.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`);
    return regex.source;
  }
  return pattern;
}
var emojiRegex, zodPatterns, ALPHA_NUMERIC;
var init_string = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/string.js"() {
    "use strict";
    init_errorMessages();
    emojiRegex = void 0;
    zodPatterns = {
      /**
       * `c` was changed to `[cC]` to replicate /i flag
       */
      cuid: /^[cC][^\s-]{8,}$/,
      cuid2: /^[0-9a-z]+$/,
      ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
      /**
       * `a-z` was added to replicate /i flag
       */
      email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
      /**
       * Constructed a valid Unicode RegExp
       *
       * Lazily instantiate since this type of regex isn't supported
       * in all envs (e.g. React Native).
       *
       * See:
       * https://github.com/colinhacks/zod/issues/2433
       * Fix in Zod:
       * https://github.com/colinhacks/zod/commit/9340fd51e48576a75adc919bff65dbc4a5d4c99b
       */
      emoji: () => {
        if (emojiRegex === void 0) {
          emojiRegex = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u");
        }
        return emojiRegex;
      },
      /**
       * Unused
       */
      uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
      /**
       * Unused
       */
      ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
      ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
      /**
       * Unused
       */
      ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
      ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
      base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
      base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
      nanoid: /^[a-zA-Z0-9_-]{21}$/,
      jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
    };
    ALPHA_NUMERIC = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/record.js
import { ZodFirstPartyTypeKind as ZodFirstPartyTypeKind2 } from "zod/v3";
function parseRecordDef(def, refs) {
  if (refs.target === "openAi") {
    console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead.");
  }
  if (refs.target === "openApi3" && def.keyType?._def.typeName === ZodFirstPartyTypeKind2.ZodEnum) {
    return {
      type: "object",
      required: def.keyType._def.values,
      properties: def.keyType._def.values.reduce((acc, key) => ({
        ...acc,
        [key]: parseDef(def.valueType._def, {
          ...refs,
          currentPath: [...refs.currentPath, "properties", key]
        }) ?? parseAnyDef(refs)
      }), {}),
      additionalProperties: refs.rejectedAdditionalProperties
    };
  }
  const schema = {
    type: "object",
    additionalProperties: parseDef(def.valueType._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    }) ?? refs.allowedAdditionalProperties
  };
  if (refs.target === "openApi3") {
    return schema;
  }
  if (def.keyType?._def.typeName === ZodFirstPartyTypeKind2.ZodString && def.keyType._def.checks?.length) {
    const { type, ...keyType } = parseStringDef(def.keyType._def, refs);
    return {
      ...schema,
      propertyNames: keyType
    };
  } else if (def.keyType?._def.typeName === ZodFirstPartyTypeKind2.ZodEnum) {
    return {
      ...schema,
      propertyNames: {
        enum: def.keyType._def.values
      }
    };
  } else if (def.keyType?._def.typeName === ZodFirstPartyTypeKind2.ZodBranded && def.keyType._def.type._def.typeName === ZodFirstPartyTypeKind2.ZodString && def.keyType._def.type._def.checks?.length) {
    const { type, ...keyType } = parseBrandedDef(def.keyType._def, refs);
    return {
      ...schema,
      propertyNames: keyType
    };
  }
  return schema;
}
var init_record = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/record.js"() {
    "use strict";
    init_parseDef();
    init_string();
    init_branded();
    init_any();
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/map.js
function parseMapDef(def, refs) {
  if (refs.mapStrategy === "record") {
    return parseRecordDef(def, refs);
  }
  const keys = parseDef(def.keyType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "0"]
  }) || parseAnyDef(refs);
  const values = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "1"]
  }) || parseAnyDef(refs);
  return {
    type: "array",
    maxItems: 125,
    items: {
      type: "array",
      items: [keys, values],
      minItems: 2,
      maxItems: 2
    }
  };
}
var init_map = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/map.js"() {
    "use strict";
    init_parseDef();
    init_record();
    init_any();
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/nativeEnum.js
function parseNativeEnumDef(def) {
  const object2 = def.values;
  const actualKeys = Object.keys(def.values).filter((key) => {
    return typeof object2[object2[key]] !== "number";
  });
  const actualValues = actualKeys.map((key) => object2[key]);
  const parsedTypes = Array.from(new Set(actualValues.map((values) => typeof values)));
  return {
    type: parsedTypes.length === 1 ? parsedTypes[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: actualValues
  };
}
var init_nativeEnum = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/nativeEnum.js"() {
    "use strict";
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/never.js
function parseNeverDef(refs) {
  return refs.target === "openAi" ? void 0 : {
    not: parseAnyDef({
      ...refs,
      currentPath: [...refs.currentPath, "not"]
    })
  };
}
var init_never = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/never.js"() {
    "use strict";
    init_any();
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/null.js
function parseNullDef(refs) {
  return refs.target === "openApi3" ? {
    enum: ["null"],
    nullable: true
  } : {
    type: "null"
  };
}
var init_null = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/null.js"() {
    "use strict";
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/union.js
function parseUnionDef(def, refs) {
  if (refs.target === "openApi3")
    return asAnyOf(def, refs);
  const options = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
  if (options.every((x) => x._def.typeName in primitiveMappings && (!x._def.checks || !x._def.checks.length))) {
    const types = options.reduce((types2, x) => {
      const type = primitiveMappings[x._def.typeName];
      return type && !types2.includes(type) ? [...types2, type] : types2;
    }, []);
    return {
      type: types.length > 1 ? types : types[0]
    };
  } else if (options.every((x) => x._def.typeName === "ZodLiteral" && !x.description)) {
    const types = options.reduce((acc, x) => {
      const type = typeof x._def.value;
      switch (type) {
        case "string":
        case "number":
        case "boolean":
          return [...acc, type];
        case "bigint":
          return [...acc, "integer"];
        case "object":
          if (x._def.value === null)
            return [...acc, "null"];
        case "symbol":
        case "undefined":
        case "function":
        default:
          return acc;
      }
    }, []);
    if (types.length === options.length) {
      const uniqueTypes = types.filter((x, i, a) => a.indexOf(x) === i);
      return {
        type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
        enum: options.reduce((acc, x) => {
          return acc.includes(x._def.value) ? acc : [...acc, x._def.value];
        }, [])
      };
    }
  } else if (options.every((x) => x._def.typeName === "ZodEnum")) {
    return {
      type: "string",
      enum: options.reduce((acc, x) => [
        ...acc,
        ...x._def.values.filter((x2) => !acc.includes(x2))
      ], [])
    };
  }
  return asAnyOf(def, refs);
}
var primitiveMappings, asAnyOf;
var init_union = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/union.js"() {
    "use strict";
    init_parseDef();
    primitiveMappings = {
      ZodString: "string",
      ZodNumber: "number",
      ZodBigInt: "integer",
      ZodBoolean: "boolean",
      ZodNull: "null"
    };
    asAnyOf = (def, refs) => {
      const anyOf = (def.options instanceof Map ? Array.from(def.options.values()) : def.options).map((x, i) => parseDef(x._def, {
        ...refs,
        currentPath: [...refs.currentPath, "anyOf", `${i}`]
      })).filter((x) => !!x && (!refs.strictUnions || typeof x === "object" && Object.keys(x).length > 0));
      return anyOf.length ? { anyOf } : void 0;
    };
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/nullable.js
function parseNullableDef(def, refs) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(def.innerType._def.typeName) && (!def.innerType._def.checks || !def.innerType._def.checks.length)) {
    if (refs.target === "openApi3") {
      return {
        type: primitiveMappings[def.innerType._def.typeName],
        nullable: true
      };
    }
    return {
      type: [
        primitiveMappings[def.innerType._def.typeName],
        "null"
      ]
    };
  }
  if (refs.target === "openApi3") {
    const base2 = parseDef(def.innerType._def, {
      ...refs,
      currentPath: [...refs.currentPath]
    });
    if (base2 && "$ref" in base2)
      return { allOf: [base2], nullable: true };
    return base2 && { ...base2, nullable: true };
  }
  const base = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "0"]
  });
  return base && { anyOf: [base, { type: "null" }] };
}
var init_nullable = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/nullable.js"() {
    "use strict";
    init_parseDef();
    init_union();
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/number.js
function parseNumberDef(def, refs) {
  const res = {
    type: "number"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "int":
        res.type = "integer";
        addErrorMessage(res, "type", check.message, refs);
        break;
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}
var init_number = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/number.js"() {
    "use strict";
    init_errorMessages();
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/object.js
function parseObjectDef(def, refs) {
  const forceOptionalIntoNullable = refs.target === "openAi";
  const result = {
    type: "object",
    properties: {}
  };
  const required = [];
  const shape = def.shape();
  for (const propName in shape) {
    let propDef = shape[propName];
    if (propDef === void 0 || propDef._def === void 0) {
      continue;
    }
    let propOptional = safeIsOptional(propDef);
    if (propOptional && forceOptionalIntoNullable) {
      if (propDef._def.typeName === "ZodOptional") {
        propDef = propDef._def.innerType;
      }
      if (!propDef.isNullable()) {
        propDef = propDef.nullable();
      }
      propOptional = false;
    }
    const parsedDef = parseDef(propDef._def, {
      ...refs,
      currentPath: [...refs.currentPath, "properties", propName],
      propertyPath: [...refs.currentPath, "properties", propName]
    });
    if (parsedDef === void 0) {
      continue;
    }
    result.properties[propName] = parsedDef;
    if (!propOptional) {
      required.push(propName);
    }
  }
  if (required.length) {
    result.required = required;
  }
  const additionalProperties = decideAdditionalProperties(def, refs);
  if (additionalProperties !== void 0) {
    result.additionalProperties = additionalProperties;
  }
  return result;
}
function decideAdditionalProperties(def, refs) {
  if (def.catchall._def.typeName !== "ZodNever") {
    return parseDef(def.catchall._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    });
  }
  switch (def.unknownKeys) {
    case "passthrough":
      return refs.allowedAdditionalProperties;
    case "strict":
      return refs.rejectedAdditionalProperties;
    case "strip":
      return refs.removeAdditionalStrategy === "strict" ? refs.allowedAdditionalProperties : refs.rejectedAdditionalProperties;
  }
}
function safeIsOptional(schema) {
  try {
    return schema.isOptional();
  } catch {
    return true;
  }
}
var init_object = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/object.js"() {
    "use strict";
    init_parseDef();
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/optional.js
var parseOptionalDef;
var init_optional = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/optional.js"() {
    "use strict";
    init_parseDef();
    init_any();
    parseOptionalDef = (def, refs) => {
      if (refs.currentPath.toString() === refs.propertyPath?.toString()) {
        return parseDef(def.innerType._def, refs);
      }
      const innerSchema = parseDef(def.innerType._def, {
        ...refs,
        currentPath: [...refs.currentPath, "anyOf", "1"]
      });
      return innerSchema ? {
        anyOf: [
          {
            not: parseAnyDef(refs)
          },
          innerSchema
        ]
      } : parseAnyDef(refs);
    };
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/pipeline.js
var parsePipelineDef;
var init_pipeline = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/pipeline.js"() {
    "use strict";
    init_parseDef();
    parsePipelineDef = (def, refs) => {
      if (refs.pipeStrategy === "input") {
        return parseDef(def.in._def, refs);
      } else if (refs.pipeStrategy === "output") {
        return parseDef(def.out._def, refs);
      }
      const a = parseDef(def.in._def, {
        ...refs,
        currentPath: [...refs.currentPath, "allOf", "0"]
      });
      const b = parseDef(def.out._def, {
        ...refs,
        currentPath: [...refs.currentPath, "allOf", a ? "1" : "0"]
      });
      return {
        allOf: [a, b].filter((x) => x !== void 0)
      };
    };
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/promise.js
function parsePromiseDef(def, refs) {
  return parseDef(def.type._def, refs);
}
var init_promise = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/promise.js"() {
    "use strict";
    init_parseDef();
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/set.js
function parseSetDef(def, refs) {
  const items = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items"]
  });
  const schema = {
    type: "array",
    uniqueItems: true,
    items
  };
  if (def.minSize) {
    setResponseValueAndErrors(schema, "minItems", def.minSize.value, def.minSize.message, refs);
  }
  if (def.maxSize) {
    setResponseValueAndErrors(schema, "maxItems", def.maxSize.value, def.maxSize.message, refs);
  }
  return schema;
}
var init_set = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/set.js"() {
    "use strict";
    init_errorMessages();
    init_parseDef();
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/tuple.js
function parseTupleDef(def, refs) {
  if (def.rest) {
    return {
      type: "array",
      minItems: def.items.length,
      items: def.items.map((x, i) => parseDef(x._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i}`]
      })).reduce((acc, x) => x === void 0 ? acc : [...acc, x], []),
      additionalItems: parseDef(def.rest._def, {
        ...refs,
        currentPath: [...refs.currentPath, "additionalItems"]
      })
    };
  } else {
    return {
      type: "array",
      minItems: def.items.length,
      maxItems: def.items.length,
      items: def.items.map((x, i) => parseDef(x._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i}`]
      })).reduce((acc, x) => x === void 0 ? acc : [...acc, x], [])
    };
  }
}
var init_tuple = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/tuple.js"() {
    "use strict";
    init_parseDef();
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/undefined.js
function parseUndefinedDef(refs) {
  return {
    not: parseAnyDef(refs)
  };
}
var init_undefined = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/undefined.js"() {
    "use strict";
    init_any();
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/unknown.js
function parseUnknownDef(refs) {
  return parseAnyDef(refs);
}
var init_unknown = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/unknown.js"() {
    "use strict";
    init_any();
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/readonly.js
var parseReadonlyDef;
var init_readonly = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parsers/readonly.js"() {
    "use strict";
    init_parseDef();
    parseReadonlyDef = (def, refs) => {
      return parseDef(def.innerType._def, refs);
    };
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/selectParser.js
import { ZodFirstPartyTypeKind as ZodFirstPartyTypeKind3 } from "zod/v3";
var selectParser;
var init_selectParser = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/selectParser.js"() {
    "use strict";
    init_any();
    init_array();
    init_bigint();
    init_boolean();
    init_branded();
    init_catch();
    init_date();
    init_default();
    init_effects();
    init_enum();
    init_intersection();
    init_literal();
    init_map();
    init_nativeEnum();
    init_never();
    init_null();
    init_nullable();
    init_number();
    init_object();
    init_optional();
    init_pipeline();
    init_promise();
    init_record();
    init_set();
    init_string();
    init_tuple();
    init_undefined();
    init_union();
    init_unknown();
    init_readonly();
    selectParser = (def, typeName, refs) => {
      switch (typeName) {
        case ZodFirstPartyTypeKind3.ZodString:
          return parseStringDef(def, refs);
        case ZodFirstPartyTypeKind3.ZodNumber:
          return parseNumberDef(def, refs);
        case ZodFirstPartyTypeKind3.ZodObject:
          return parseObjectDef(def, refs);
        case ZodFirstPartyTypeKind3.ZodBigInt:
          return parseBigintDef(def, refs);
        case ZodFirstPartyTypeKind3.ZodBoolean:
          return parseBooleanDef();
        case ZodFirstPartyTypeKind3.ZodDate:
          return parseDateDef(def, refs);
        case ZodFirstPartyTypeKind3.ZodUndefined:
          return parseUndefinedDef(refs);
        case ZodFirstPartyTypeKind3.ZodNull:
          return parseNullDef(refs);
        case ZodFirstPartyTypeKind3.ZodArray:
          return parseArrayDef(def, refs);
        case ZodFirstPartyTypeKind3.ZodUnion:
        case ZodFirstPartyTypeKind3.ZodDiscriminatedUnion:
          return parseUnionDef(def, refs);
        case ZodFirstPartyTypeKind3.ZodIntersection:
          return parseIntersectionDef(def, refs);
        case ZodFirstPartyTypeKind3.ZodTuple:
          return parseTupleDef(def, refs);
        case ZodFirstPartyTypeKind3.ZodRecord:
          return parseRecordDef(def, refs);
        case ZodFirstPartyTypeKind3.ZodLiteral:
          return parseLiteralDef(def, refs);
        case ZodFirstPartyTypeKind3.ZodEnum:
          return parseEnumDef(def);
        case ZodFirstPartyTypeKind3.ZodNativeEnum:
          return parseNativeEnumDef(def);
        case ZodFirstPartyTypeKind3.ZodNullable:
          return parseNullableDef(def, refs);
        case ZodFirstPartyTypeKind3.ZodOptional:
          return parseOptionalDef(def, refs);
        case ZodFirstPartyTypeKind3.ZodMap:
          return parseMapDef(def, refs);
        case ZodFirstPartyTypeKind3.ZodSet:
          return parseSetDef(def, refs);
        case ZodFirstPartyTypeKind3.ZodLazy:
          return () => def.getter()._def;
        case ZodFirstPartyTypeKind3.ZodPromise:
          return parsePromiseDef(def, refs);
        case ZodFirstPartyTypeKind3.ZodNaN:
        case ZodFirstPartyTypeKind3.ZodNever:
          return parseNeverDef(refs);
        case ZodFirstPartyTypeKind3.ZodEffects:
          return parseEffectsDef(def, refs);
        case ZodFirstPartyTypeKind3.ZodAny:
          return parseAnyDef(refs);
        case ZodFirstPartyTypeKind3.ZodUnknown:
          return parseUnknownDef(refs);
        case ZodFirstPartyTypeKind3.ZodDefault:
          return parseDefaultDef(def, refs);
        case ZodFirstPartyTypeKind3.ZodBranded:
          return parseBrandedDef(def, refs);
        case ZodFirstPartyTypeKind3.ZodReadonly:
          return parseReadonlyDef(def, refs);
        case ZodFirstPartyTypeKind3.ZodCatch:
          return parseCatchDef(def, refs);
        case ZodFirstPartyTypeKind3.ZodPipeline:
          return parsePipelineDef(def, refs);
        case ZodFirstPartyTypeKind3.ZodFunction:
        case ZodFirstPartyTypeKind3.ZodVoid:
        case ZodFirstPartyTypeKind3.ZodSymbol:
          return void 0;
        default:
          return /* @__PURE__ */ ((_) => void 0)(typeName);
      }
    };
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parseDef.js
function parseDef(def, refs, forceResolution = false) {
  const seenItem = refs.seen.get(def);
  if (refs.override) {
    const overrideResult = refs.override?.(def, refs, seenItem, forceResolution);
    if (overrideResult !== ignoreOverride) {
      return overrideResult;
    }
  }
  if (seenItem && !forceResolution) {
    const seenSchema = get$ref(seenItem, refs);
    if (seenSchema !== void 0) {
      return seenSchema;
    }
  }
  const newItem = { def, path: refs.currentPath, jsonSchema: void 0 };
  refs.seen.set(def, newItem);
  const jsonSchemaOrGetter = selectParser(def, def.typeName, refs);
  const jsonSchema = typeof jsonSchemaOrGetter === "function" ? parseDef(jsonSchemaOrGetter(), refs) : jsonSchemaOrGetter;
  if (jsonSchema) {
    addMeta(def, refs, jsonSchema);
  }
  if (refs.postProcess) {
    const postProcessResult = refs.postProcess(jsonSchema, def, refs);
    newItem.jsonSchema = jsonSchema;
    return postProcessResult;
  }
  newItem.jsonSchema = jsonSchema;
  return jsonSchema;
}
var get$ref, addMeta;
var init_parseDef = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parseDef.js"() {
    "use strict";
    init_Options();
    init_selectParser();
    init_getRelativePath();
    init_any();
    get$ref = (item, refs) => {
      switch (refs.$refStrategy) {
        case "root":
          return { $ref: item.path.join("/") };
        case "relative":
          return { $ref: getRelativePath(refs.currentPath, item.path) };
        case "none":
        case "seen": {
          if (item.path.length < refs.currentPath.length && item.path.every((value, index2) => refs.currentPath[index2] === value)) {
            console.warn(`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`);
            return parseAnyDef(refs);
          }
          return refs.$refStrategy === "seen" ? parseAnyDef(refs) : void 0;
        }
      }
    };
    addMeta = (def, refs, jsonSchema) => {
      if (def.description) {
        jsonSchema.description = def.description;
        if (refs.markdownDescription) {
          jsonSchema.markdownDescription = def.description;
        }
      }
      return jsonSchema;
    };
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parseTypes.js
var init_parseTypes = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/parseTypes.js"() {
    "use strict";
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/zodToJsonSchema.js
var zodToJsonSchema;
var init_zodToJsonSchema = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/zodToJsonSchema.js"() {
    "use strict";
    init_parseDef();
    init_Refs();
    init_any();
    zodToJsonSchema = (schema, options) => {
      const refs = getRefs(options);
      let definitions = typeof options === "object" && options.definitions ? Object.entries(options.definitions).reduce((acc, [name2, schema2]) => ({
        ...acc,
        [name2]: parseDef(schema2._def, {
          ...refs,
          currentPath: [...refs.basePath, refs.definitionPath, name2]
        }, true) ?? parseAnyDef(refs)
      }), {}) : void 0;
      const name = typeof options === "string" ? options : options?.nameStrategy === "title" ? void 0 : options?.name;
      const main = parseDef(schema._def, name === void 0 ? refs : {
        ...refs,
        currentPath: [...refs.basePath, refs.definitionPath, name]
      }, false) ?? parseAnyDef(refs);
      const title = typeof options === "object" && options.name !== void 0 && options.nameStrategy === "title" ? options.name : void 0;
      if (title !== void 0) {
        main.title = title;
      }
      if (refs.flags.hasReferencedOpenAiAnyType) {
        if (!definitions) {
          definitions = {};
        }
        if (!definitions[refs.openAiAnyTypeName]) {
          definitions[refs.openAiAnyTypeName] = {
            // Skipping "object" as no properties can be defined and additionalProperties must be "false"
            type: ["string", "number", "integer", "boolean", "array", "null"],
            items: {
              $ref: refs.$refStrategy === "relative" ? "1" : [
                ...refs.basePath,
                refs.definitionPath,
                refs.openAiAnyTypeName
              ].join("/")
            }
          };
        }
      }
      const combined = name === void 0 ? definitions ? {
        ...main,
        [refs.definitionPath]: definitions
      } : main : {
        $ref: [
          ...refs.$refStrategy === "relative" ? [] : refs.basePath,
          refs.definitionPath,
          name
        ].join("/"),
        [refs.definitionPath]: {
          ...definitions,
          [name]: main
        }
      };
      if (refs.target === "jsonSchema7") {
        combined.$schema = "http://json-schema.org/draft-07/schema#";
      } else if (refs.target === "jsonSchema2019-09" || refs.target === "openAi") {
        combined.$schema = "https://json-schema.org/draft/2019-09/schema#";
      }
      if (refs.target === "openAi" && ("anyOf" in combined || "oneOf" in combined || "allOf" in combined || "type" in combined && Array.isArray(combined.type))) {
        console.warn("Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property.");
      }
      return combined;
    };
  }
});

// ../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  addErrorMessage: () => addErrorMessage,
  default: () => esm_default,
  defaultOptions: () => defaultOptions,
  getDefaultOptions: () => getDefaultOptions,
  getRefs: () => getRefs,
  getRelativePath: () => getRelativePath,
  ignoreOverride: () => ignoreOverride,
  jsonDescription: () => jsonDescription,
  parseAnyDef: () => parseAnyDef,
  parseArrayDef: () => parseArrayDef,
  parseBigintDef: () => parseBigintDef,
  parseBooleanDef: () => parseBooleanDef,
  parseBrandedDef: () => parseBrandedDef,
  parseCatchDef: () => parseCatchDef,
  parseDateDef: () => parseDateDef,
  parseDef: () => parseDef,
  parseDefaultDef: () => parseDefaultDef,
  parseEffectsDef: () => parseEffectsDef,
  parseEnumDef: () => parseEnumDef,
  parseIntersectionDef: () => parseIntersectionDef,
  parseLiteralDef: () => parseLiteralDef,
  parseMapDef: () => parseMapDef,
  parseNativeEnumDef: () => parseNativeEnumDef,
  parseNeverDef: () => parseNeverDef,
  parseNullDef: () => parseNullDef,
  parseNullableDef: () => parseNullableDef,
  parseNumberDef: () => parseNumberDef,
  parseObjectDef: () => parseObjectDef,
  parseOptionalDef: () => parseOptionalDef,
  parsePipelineDef: () => parsePipelineDef,
  parsePromiseDef: () => parsePromiseDef,
  parseReadonlyDef: () => parseReadonlyDef,
  parseRecordDef: () => parseRecordDef,
  parseSetDef: () => parseSetDef,
  parseStringDef: () => parseStringDef,
  parseTupleDef: () => parseTupleDef,
  parseUndefinedDef: () => parseUndefinedDef,
  parseUnionDef: () => parseUnionDef,
  parseUnknownDef: () => parseUnknownDef,
  primitiveMappings: () => primitiveMappings,
  selectParser: () => selectParser,
  setResponseValueAndErrors: () => setResponseValueAndErrors,
  zodPatterns: () => zodPatterns,
  zodToJsonSchema: () => zodToJsonSchema
});
var esm_default;
var init_esm = __esm({
  "../../node_modules/.pnpm/zod-to-json-schema@3.25.1_zod@4.3.6/node_modules/zod-to-json-schema/dist/esm/index.js"() {
    "use strict";
    init_Options();
    init_Refs();
    init_errorMessages();
    init_getRelativePath();
    init_parseDef();
    init_parseTypes();
    init_any();
    init_array();
    init_bigint();
    init_boolean();
    init_branded();
    init_catch();
    init_date();
    init_default();
    init_effects();
    init_enum();
    init_intersection();
    init_literal();
    init_map();
    init_nativeEnum();
    init_never();
    init_null();
    init_nullable();
    init_number();
    init_object();
    init_optional();
    init_pipeline();
    init_promise();
    init_readonly();
    init_record();
    init_set();
    init_string();
    init_tuple();
    init_undefined();
    init_union();
    init_unknown();
    init_selectParser();
    init_zodToJsonSchema();
    init_zodToJsonSchema();
    esm_default = zodToJsonSchema;
  }
});

// ../../node_modules/.pnpm/@standard-community+standard-json@0.3.5_@standard-schema+spec@1.1.0_@types+json-schema@_f89f0da8eb08fb1ae9b0ddcdc3aa8a2e/node_modules/@standard-community/standard-json/dist/zod-Bwrt9trS.js
var zod_Bwrt9trS_exports = {};
__export(zod_Bwrt9trS_exports, {
  default: () => getToJsonSchemaFn6
});
async function getToJsonSchemaFn6() {
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
        const mod = await Promise.resolve().then(() => (init_esm(), esm_exports));
        handler = mod.zodToJsonSchema;
      } catch {
        throw new MissingDependencyError("zod-to-json-schema");
      }
    }
    return handler(schema, options);
  };
}
var zodv4Error;
var init_zod_Bwrt9trS = __esm({
  "../../node_modules/.pnpm/@standard-community+standard-json@0.3.5_@standard-schema+spec@1.1.0_@types+json-schema@_f89f0da8eb08fb1ae9b0ddcdc3aa8a2e/node_modules/@standard-community/standard-json/dist/zod-Bwrt9trS.js"() {
    "use strict";
    init_index_CLddUTqr();
    zodv4Error = new MissingDependencyError("zod v4");
  }
});

// ../../node_modules/.pnpm/@standard-community+standard-json@0.3.5_@standard-schema+spec@1.1.0_@types+json-schema@_f89f0da8eb08fb1ae9b0ddcdc3aa8a2e/node_modules/@standard-community/standard-json/dist/index-CLddUTqr.js
var validationMapper, UnsupportedVendorError, MissingDependencyError, getToJsonSchemaFn7, toJsonSchema;
var init_index_CLddUTqr = __esm({
  "../../node_modules/.pnpm/@standard-community+standard-json@0.3.5_@standard-schema+spec@1.1.0_@types+json-schema@_f89f0da8eb08fb1ae9b0ddcdc3aa8a2e/node_modules/@standard-community/standard-json/dist/index-CLddUTqr.js"() {
    "use strict";
    init_dist();
    validationMapper = /* @__PURE__ */ new Map();
    UnsupportedVendorError = class extends Error {
      constructor(vendor) {
        super(`standard-json: Unsupported schema vendor "${vendor}".`);
      }
    };
    MissingDependencyError = class extends Error {
      constructor(packageName) {
        super(`standard-json: Missing dependencies "${packageName}".`);
      }
    };
    getToJsonSchemaFn7 = async (vendor) => {
      const cached = validationMapper.get(vendor);
      if (cached) {
        return cached;
      }
      let vendorFnPromise;
      switch (vendor) {
        case "arktype":
          vendorFnPromise = (await Promise.resolve().then(() => (init_arktype_aI7TBD0R(), arktype_aI7TBD0R_exports))).default();
          break;
        case "effect":
          vendorFnPromise = (await Promise.resolve().then(() => (init_effect_QlVUlMFu(), effect_QlVUlMFu_exports))).default();
          break;
        case "sury":
          vendorFnPromise = (await Promise.resolve().then(() => (init_sury_CWZTCd75(), sury_CWZTCd75_exports))).default();
          break;
        case "typebox":
          vendorFnPromise = (await Promise.resolve().then(() => (init_typebox_Dei93FPO(), typebox_Dei93FPO_exports))).default();
          break;
        case "valibot":
          vendorFnPromise = (await Promise.resolve().then(() => (init_valibot_1zFm7rT(), valibot_1zFm7rT_exports))).default();
          break;
        case "zod":
          vendorFnPromise = (await Promise.resolve().then(() => (init_zod_Bwrt9trS(), zod_Bwrt9trS_exports))).default();
          break;
        default:
          throw new UnsupportedVendorError(vendor);
      }
      const vendorFn = await vendorFnPromise;
      validationMapper.set(vendor, vendorFn);
      return vendorFn;
    };
    toJsonSchema = quansync({
      sync: (schema, options) => {
        const vendor = schema["~standard"].vendor;
        const fn = validationMapper.get(vendor);
        if (!fn) {
          throw new UnsupportedVendorError(vendor);
        }
        return fn(schema, options);
      },
      async: async (schema, options) => {
        const fn = await getToJsonSchemaFn7(schema["~standard"].vendor);
        return fn(schema, options);
      }
    });
  }
});

// ../../node_modules/.pnpm/@standard-community+standard-json@0.3.5_@standard-schema+spec@1.1.0_@types+json-schema@_f89f0da8eb08fb1ae9b0ddcdc3aa8a2e/node_modules/@standard-community/standard-json/dist/index.js
var init_dist2 = __esm({
  "../../node_modules/.pnpm/@standard-community+standard-json@0.3.5_@standard-schema+spec@1.1.0_@types+json-schema@_f89f0da8eb08fb1ae9b0ddcdc3aa8a2e/node_modules/@standard-community/standard-json/dist/index.js"() {
    "use strict";
    init_index_CLddUTqr();
  }
});

// ../../node_modules/.pnpm/@standard-community+standard-openapi@0.2.9_@standard-community+standard-json@0.3.5_@sta_64dc72374920719b5ebc9a639a523d47/node_modules/@standard-community/standard-openapi/dist/vendors/convert.js
function convertToOpenAPISchema(jsonSchema, context) {
  const _jsonSchema = JSON.parse(JSON.stringify(jsonSchema));
  if ("nullable" in _jsonSchema && _jsonSchema.nullable === true) {
    if (_jsonSchema.type) {
      if (Array.isArray(_jsonSchema.type)) {
        if (!_jsonSchema.type.includes("null")) {
          _jsonSchema.type.push("null");
        }
      } else {
        _jsonSchema.type = [_jsonSchema.type, "null"];
      }
    } else {
      _jsonSchema.type = ["null"];
    }
    delete _jsonSchema.nullable;
  }
  if (_jsonSchema.$schema) {
    delete _jsonSchema.$schema;
  }
  const nestedSchemaKeys = [
    "properties",
    "additionalProperties",
    "items",
    "additionalItems",
    "allOf",
    "anyOf",
    "oneOf",
    "not",
    "if",
    "then",
    "else",
    "definitions",
    "$defs",
    "patternProperties",
    "propertyNames",
    "contains"
    // "unevaluatedProperties",
    // "unevaluatedItems",
  ];
  nestedSchemaKeys.forEach((key) => {
    if (_jsonSchema[key] && (typeof _jsonSchema[key] === "object" || Array.isArray(_jsonSchema[key]))) {
      if (key === "properties" || key === "definitions" || key === "$defs" || key === "patternProperties") {
        for (const subKey in _jsonSchema[key]) {
          _jsonSchema[key][subKey] = convertToOpenAPISchema(
            _jsonSchema[key][subKey],
            context
          );
        }
      } else if (key === "allOf" || key === "anyOf" || key === "oneOf") {
        _jsonSchema[key] = _jsonSchema[key].map(
          (item) => convertToOpenAPISchema(item, context)
        );
      } else if (key === "items") {
        if (Array.isArray(_jsonSchema[key])) {
          _jsonSchema[key] = _jsonSchema[key].map(
            (item) => convertToOpenAPISchema(item, context)
          );
        } else {
          _jsonSchema[key] = convertToOpenAPISchema(_jsonSchema[key], context);
        }
      } else {
        _jsonSchema[key] = convertToOpenAPISchema(_jsonSchema[key], context);
      }
    }
  });
  if (_jsonSchema.ref || _jsonSchema.$id) {
    const { ref, $id, ...component } = _jsonSchema;
    const id = ref || $id;
    context.components.schemas = {
      ...context.components.schemas,
      [id]: component
    };
    return {
      $ref: `#/components/schemas/${id}`
    };
  } else if (_jsonSchema.$ref) {
    const { $ref, $defs } = _jsonSchema;
    const ref = $ref.split("/").pop();
    context.components.schemas = {
      ...context.components.schemas,
      ...$defs
    };
    return {
      $ref: `#/components/schemas/${ref}`
    };
  }
  return _jsonSchema;
}
var init_convert = __esm({
  "../../node_modules/.pnpm/@standard-community+standard-openapi@0.2.9_@standard-community+standard-json@0.3.5_@sta_64dc72374920719b5ebc9a639a523d47/node_modules/@standard-community/standard-openapi/dist/vendors/convert.js"() {
    "use strict";
  }
});

// ../../node_modules/.pnpm/@standard-community+standard-openapi@0.2.9_@standard-community+standard-json@0.3.5_@sta_64dc72374920719b5ebc9a639a523d47/node_modules/@standard-community/standard-openapi/dist/valibot-D_HTw1Gn.js
var valibot_D_HTw1Gn_exports = {};
__export(valibot_D_HTw1Gn_exports, {
  default: () => getToOpenAPISchemaFn
});
function getToOpenAPISchemaFn() {
  return async (schema, context) => {
    const openapiSchema = await toJsonSchema(schema, {
      errorMode: "ignore",
      // @ts-expect-error
      overrideAction: ({ valibotAction, jsonSchema }) => {
        const _jsonSchema = convertToOpenAPISchema(jsonSchema, context);
        if (valibotAction.kind === "metadata" && valibotAction.type === "metadata" && !("$ref" in _jsonSchema)) {
          const metadata = valibotAction.metadata;
          if (metadata.example !== void 0) {
            _jsonSchema.example = metadata.example;
          }
          if (metadata.examples && metadata.examples.length > 0) {
            _jsonSchema.examples = metadata.examples;
          }
          if (metadata.ref) {
            context.components.schemas = {
              ...context.components.schemas,
              [metadata.ref]: _jsonSchema
            };
            return {
              $ref: `#/components/schemas/${metadata.ref}`
            };
          }
        }
        return _jsonSchema;
      },
      ...context.options
    });
    if ("$schema" in openapiSchema) {
      delete openapiSchema.$schema;
    }
    return openapiSchema;
  };
}
var init_valibot_D_HTw1Gn = __esm({
  "../../node_modules/.pnpm/@standard-community+standard-openapi@0.2.9_@standard-community+standard-json@0.3.5_@sta_64dc72374920719b5ebc9a639a523d47/node_modules/@standard-community/standard-openapi/dist/valibot-D_HTw1Gn.js"() {
    "use strict";
    init_dist2();
    init_convert();
  }
});

// ../../node_modules/.pnpm/@standard-community+standard-openapi@0.2.9_@standard-community+standard-json@0.3.5_@sta_64dc72374920719b5ebc9a639a523d47/node_modules/@standard-community/standard-openapi/dist/default-u_dwuiYb.js
var default_u_dwuiYb_exports = {};
__export(default_u_dwuiYb_exports, {
  default: () => getToOpenAPISchemaFn2
});
function getToOpenAPISchemaFn2() {
  return async (schema, context) => convertToOpenAPISchema(
    await toJsonSchema(schema, context.options),
    context
  );
}
var init_default_u_dwuiYb = __esm({
  "../../node_modules/.pnpm/@standard-community+standard-openapi@0.2.9_@standard-community+standard-json@0.3.5_@sta_64dc72374920719b5ebc9a639a523d47/node_modules/@standard-community/standard-openapi/dist/default-u_dwuiYb.js"() {
    "use strict";
    init_dist2();
    init_convert();
  }
});

// ../../node_modules/.pnpm/zod-openapi@4.2.4_zod@4.3.6/node_modules/zod-openapi/dist/extendZodSymbols.chunk.mjs
var currentSymbol, previousSymbol;
var init_extendZodSymbols_chunk = __esm({
  "../../node_modules/.pnpm/zod-openapi@4.2.4_zod@4.3.6/node_modules/zod-openapi/dist/extendZodSymbols.chunk.mjs"() {
    "use strict";
    currentSymbol = /* @__PURE__ */ Symbol("current");
    previousSymbol = /* @__PURE__ */ Symbol("previous");
  }
});

// ../../node_modules/.pnpm/zod-openapi@4.2.4_zod@4.3.6/node_modules/zod-openapi/dist/components.chunk.mjs
var isZodType, isAnyZodType, openApiVersions, satisfiesVersion, createDescriptionMetadata, isValueEqual, enhanceWithMetadata, createArraySchema, createBigIntSchema, createBooleanSchema, createBrandedSchema, createCatchSchema, createDateSchema, createDefaultSchema, createNativeEnumSchema, getValidEnumValues, sortStringsAndNumbers, createTransformSchema, createManualOutputTransformSchema, getZodTypeName, throwTransformError, resolveSingleEffect, resolveEffect, verifyEffects, flattenEffects, createDiscriminatedUnionSchema, unwrapLiterals, mapDiscriminator, createEnumSchema, createIntersectionSchema, flattenIntersection, createLazySchema, createNullSchema, createLiteralSchema, createManualTypeSchema, createNullableSchema, mapNullType, mapNullOf, createNumberSchema, mapMultipleOf, mapMaximum, mapMinimum, getZodNumberChecks, mapNumberType, createOptionalSchema, isOptionalObjectKey, createObjectSchema, createExtendedSchema, createDiffOpts, createShapeDiff, mapAdditionalProperties, createObjectSchemaFromShape, mapRequired, mapProperties, createPipelineSchema, createPreprocessSchema, createReadonlySchema, createRecordSchema, createRefineSchema, createSetSchema, createStringSchema, getZodStringChecks, mapPatterns, mapStartsWith, mapEndsWith, mapRegex, mapIncludes, mapStringFormat, mapContentEncoding, createTupleSchema, mapPrefixItems, createUnionSchema, createUnknownSchema, createSchemaSwitch, createNewSchema, createNewRef, createExistingRef, createSchemaOrRef, createSchemaObject, createSchema, createMediaTypeSchema, createMediaTypeObject, createContent, createComponentParamRef, createBaseParameter, createParamOrRef, createParameters, createRequestParams, createManualParameters, createParametersObject, getZodObject, isISpecificationExtension, createResponseHeaders, createHeaderOrRef, createBaseHeader, createComponentHeaderRef, createResponse, createResponses, createRequestBody, createOperation, createPathItem, createPaths, createCallback, createCallbacks, getDefaultComponents, getSchemas, getParameters, getHeaders, getResponses, getRequestBodies, getCallbacks, createComponentSchemaRef, createComponentResponseRef, createComponentRequestBodyRef, createComponentCallbackRef, createComponents, createSchemaComponents, createParamComponents, createHeaderComponents, createResponseComponents, createRequestBodiesComponents, createCallbackComponents;
var init_components_chunk = __esm({
  "../../node_modules/.pnpm/zod-openapi@4.2.4_zod@4.3.6/node_modules/zod-openapi/dist/components.chunk.mjs"() {
    "use strict";
    init_extendZodSymbols_chunk();
    isZodType = (zodType, typeName) => {
      var _a;
      return ((_a = zodType == null ? void 0 : zodType._def) == null ? void 0 : _a.typeName) === typeName;
    };
    isAnyZodType = (zodType) => {
      var _a;
      return Boolean(
        (_a = zodType == null ? void 0 : zodType._def) == null ? void 0 : _a.typeName
      );
    };
    openApiVersions = [
      "3.0.0",
      "3.0.1",
      "3.0.2",
      "3.0.3",
      "3.1.0"
    ];
    satisfiesVersion = (test, against) => openApiVersions.indexOf(test) >= openApiVersions.indexOf(against);
    createDescriptionMetadata = (schema, description, state) => {
      if (satisfiesVersion(state.components.openapi, "3.1.0")) {
        return {
          type: "ref",
          schema: {
            $ref: schema.schema.$ref,
            description
          },
          zodType: schema.zodType,
          effects: schema.effects,
          schemaObject: schema.schemaObject
        };
      }
      return {
        type: "schema",
        schema: {
          description,
          allOf: [schema.schema]
        },
        effects: schema.effects
      };
    };
    isValueEqual = (value, previous) => {
      if (typeof value !== typeof previous) {
        return false;
      }
      if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        return value === previous;
      }
      if (Array.isArray(value) && Array.isArray(previous)) {
        const sorted = [...value].sort();
        const previousSorted = [...previous].sort();
        return sorted.every((v, i) => isValueEqual(v, previousSorted[i]));
      }
      if (value === null || previous === null) {
        return value === previous;
      }
      if (typeof value === "object" && typeof previous === "object") {
        const keys = Object.keys(value);
        return keys.every(
          (key) => isValueEqual(
            value[key],
            previous[key]
          )
        );
      }
      return value === previous;
    };
    enhanceWithMetadata = (schema, metadata, state, previous) => {
      const values = Object.entries(metadata).reduce(
        (acc, [key, value]) => {
          if (value === void 0) {
            return acc;
          }
          acc[key] = value;
          return acc;
        },
        {}
      );
      const length = Object.values(values).length;
      if (schema.type === "ref") {
        if (length === 0) {
          return schema;
        }
        if (length === 1 && metadata.description) {
          return createDescriptionMetadata(schema, metadata.description, state);
        }
        return {
          type: "schema",
          schema: {
            allOf: [schema.schema],
            ...metadata
          },
          effects: schema.effects
        };
      }
      if (previous && schema.schema.type !== "object") {
        const diff = Object.entries({ ...schema.schema, ...values }).reduce(
          (acc, [key, value]) => {
            if (previous.schemaObject && isValueEqual(
              previous.schemaObject[key],
              value
            )) {
              return acc;
            }
            acc[key] = value;
            return acc;
          },
          {}
        );
        const diffLength = Object.values(diff).length;
        if (diffLength === 0) {
          return {
            type: "ref",
            schema: {
              $ref: previous.schema.$ref
            },
            effects: schema.effects,
            schemaObject: previous.schemaObject,
            zodType: previous.zodType
          };
        }
        if (diffLength === 1 && typeof diff.description === "string") {
          return createDescriptionMetadata(previous, diff.description, state);
        }
        return {
          type: "schema",
          schema: { allOf: [previous.schema], ...diff },
          effects: schema.effects
        };
      }
      return {
        type: "schema",
        schema: {
          ...schema.schema,
          ...metadata
        },
        effects: schema.effects
      };
    };
    createArraySchema = (zodArray, state) => {
      var _a, _b, _c, _d;
      const zodType = zodArray._def.type;
      const minItems = ((_a = zodArray._def.exactLength) == null ? void 0 : _a.value) ?? ((_b = zodArray._def.minLength) == null ? void 0 : _b.value);
      const maxItems = ((_c = zodArray._def.exactLength) == null ? void 0 : _c.value) ?? ((_d = zodArray._def.maxLength) == null ? void 0 : _d.value);
      const items = createSchemaObject(zodType, state, ["array items"]);
      return {
        type: "schema",
        schema: {
          type: "array",
          items: items.schema,
          ...minItems !== void 0 && { minItems },
          ...maxItems !== void 0 && { maxItems }
        },
        effects: items.effects
      };
    };
    createBigIntSchema = (_zodBigInt) => ({
      type: "schema",
      schema: {
        type: "integer",
        format: "int64"
      }
    });
    createBooleanSchema = (_zodBoolean) => ({
      type: "schema",
      schema: {
        type: "boolean"
      }
    });
    createBrandedSchema = (zodBranded, state) => createSchemaObject(zodBranded._def.type, state, ["brand"]);
    createCatchSchema = (zodCatch, state, previous) => {
      const schemaObject = createSchemaObject(zodCatch._def.innerType, state, [
        "default"
      ]);
      const catchResult = zodCatch.safeParse(void 0);
      const maybeDefaultValue = catchResult.success ? {
        default: catchResult.data
      } : {};
      return enhanceWithMetadata(schemaObject, maybeDefaultValue, state, previous);
    };
    createDateSchema = (_zodDate, state) => {
      var _a;
      return {
        type: "schema",
        schema: ((_a = state.documentOptions) == null ? void 0 : _a.defaultDateSchema) ?? {
          type: "string"
        }
      };
    };
    createDefaultSchema = (zodDefault, state, previous) => {
      const schemaObject = createSchemaObject(zodDefault._def.innerType, state, [
        "default"
      ]);
      return enhanceWithMetadata(
        schemaObject,
        {
          default: zodDefault._def.defaultValue()
        },
        state,
        previous
      );
    };
    createNativeEnumSchema = (zodEnum, state) => {
      const enumValues = getValidEnumValues(zodEnum._def.values);
      const { numbers, strings } = sortStringsAndNumbers(enumValues);
      if (strings.length && numbers.length) {
        if (satisfiesVersion(state.components.openapi, "3.1.0")) {
          return {
            type: "schema",
            schema: {
              type: ["string", "number"],
              enum: [...strings, ...numbers]
            }
          };
        }
        return {
          type: "schema",
          schema: {
            oneOf: [
              { type: "string", enum: strings },
              { type: "number", enum: numbers }
            ]
          }
        };
      }
      if (strings.length) {
        return {
          type: "schema",
          schema: {
            type: "string",
            enum: strings
          }
        };
      }
      return {
        type: "schema",
        schema: {
          type: "number",
          enum: numbers
        }
      };
    };
    getValidEnumValues = (enumValues) => {
      const keys = Object.keys(enumValues).filter(
        (key) => typeof enumValues[enumValues[key]] !== "number"
      );
      return keys.map((key) => enumValues[key]);
    };
    sortStringsAndNumbers = (values) => ({
      strings: values.filter((value) => typeof value === "string"),
      numbers: values.filter((value) => typeof value === "number")
    });
    createTransformSchema = (zodTransform, state) => {
      var _a, _b, _c, _d, _e, _f;
      if (((_b = (_a = zodTransform._def.zodOpenApi) == null ? void 0 : _a.openapi) == null ? void 0 : _b.effectType) === "output") {
        return {
          type: "schema",
          schema: createManualOutputTransformSchema(zodTransform, state)
        };
      }
      if (((_d = (_c = zodTransform._def.zodOpenApi) == null ? void 0 : _c.openapi) == null ? void 0 : _d.effectType) === "input" || ((_f = (_e = zodTransform._def.zodOpenApi) == null ? void 0 : _e.openapi) == null ? void 0 : _f.effectType) === "same") {
        return createSchemaObject(zodTransform._def.schema, state, [
          "transform input"
        ]);
      }
      if (state.type === "output") {
        return {
          type: "schema",
          schema: createManualOutputTransformSchema(zodTransform, state)
        };
      }
      const schema = createSchemaObject(zodTransform._def.schema, state, [
        "transform input"
      ]);
      return {
        ...schema,
        effects: flattenEffects([
          [
            {
              type: "schema",
              creationType: "input",
              zodType: zodTransform,
              path: [...state.path]
            }
          ],
          schema.effects
        ])
      };
    };
    createManualOutputTransformSchema = (zodTransform, state) => {
      var _a, _b, _c;
      if (!((_b = (_a = zodTransform._def.zodOpenApi) == null ? void 0 : _a.openapi) == null ? void 0 : _b.type)) {
        const zodType = zodTransform.constructor.name;
        const schemaName = `${zodType} - ${zodTransform._def.effect.type}`;
        throw new Error(
          `Failed to determine a type for ${schemaName} at ${state.path.join(
            " > "
          )}. Please change the 'effectType' to 'same' or 'input', wrap it in a ZodPipeline or assign it a manual 'type'.`
        );
      }
      return {
        type: (_c = zodTransform._def.zodOpenApi) == null ? void 0 : _c.openapi.type
      };
    };
    getZodTypeName = (zodType) => {
      if (isZodType(zodType, "ZodEffects")) {
        return `${zodType._def.typeName} - ${zodType._def.effect.type}`;
      }
      return zodType._def.typeName;
    };
    throwTransformError = (effect) => {
      const typeName = getZodTypeName(effect.zodType);
      const input = effect.creationType;
      const opposite = input === "input" ? "output" : "input";
      throw new Error(
        `The ${typeName} at ${effect.path.join(
          " > "
        )} is used within a registered compoment schema${effect.component ? ` (${effect.component.ref})` : ""} and contains an ${input} transformation${effect.component ? ` (${getZodTypeName(
          effect.component.zodType
        )}) defined at ${effect.component.path.join(" > ")}` : ""} which is also used in an ${opposite} schema.

This may cause the schema to render incorrectly and is most likely a mistake. You can resolve this by:

1. Setting an \`effectType\` on one of the transformations to \`same\` (Not applicable for ZodDefault), \`input\` or \`output\` eg. \`.openapi({type: 'same'})\`
2. Wrapping the transformation in a ZodPipeline
3. Assigning a manual type to the transformation eg. \`.openapi({type: 'string'})\`
4. Removing the transformation
5. Deregister the component containing the transformation`
      );
    };
    resolveSingleEffect = (effect, state) => {
      if (effect.type === "schema") {
        return {
          creationType: effect.creationType,
          path: effect.path,
          zodType: effect.zodType
        };
      }
      if (effect.type === "component") {
        if (state.visited.has(effect.zodType)) {
          return;
        }
        const component = state.components.schemas.get(effect.zodType);
        if ((component == null ? void 0 : component.type) !== "complete") {
          throw new Error("Something went wrong, component schema is not complete");
        }
        if (component.resolvedEffect) {
          return {
            creationType: component.resolvedEffect.creationType,
            path: effect.path,
            zodType: effect.zodType,
            component: {
              ref: component.ref,
              zodType: component.resolvedEffect.zodType,
              path: component.resolvedEffect.path
            }
          };
        }
        if (!component.effects) {
          return void 0;
        }
        state.visited.add(effect.zodType);
        const resolved = resolveEffect(component.effects, state);
        state.visited.delete(effect.zodType);
        if (!resolved) {
          return void 0;
        }
        component.resolvedEffect = resolved;
        return resolved;
      }
      return void 0;
    };
    resolveEffect = (effects, state) => {
      const { input, output } = effects.reduce(
        (acc, effect) => {
          const resolvedSchemaEffect = resolveSingleEffect(effect, state);
          if ((resolvedSchemaEffect == null ? void 0 : resolvedSchemaEffect.creationType) === "input") {
            acc.input.push(resolvedSchemaEffect);
          }
          if ((resolvedSchemaEffect == null ? void 0 : resolvedSchemaEffect.creationType) === "output") {
            acc.output.push(resolvedSchemaEffect);
          }
          if (resolvedSchemaEffect && acc.input.length > 1 && acc.output.length > 1) {
            throwTransformError(resolvedSchemaEffect);
          }
          return acc;
        },
        { input: [], output: [] }
      );
      if (input.length > 0) {
        return input[0];
      }
      if (output.length > 0) {
        return output[0];
      }
      return void 0;
    };
    verifyEffects = (effects, state) => {
      const resolved = resolveEffect(effects, state);
      if ((resolved == null ? void 0 : resolved.creationType) && resolved.creationType !== state.type) {
        throwTransformError(resolved);
      }
    };
    flattenEffects = (effects) => {
      const allEffects = effects.reduce((acc, effect) => {
        if (effect) {
          return acc.concat(effect);
        }
        return acc;
      }, []);
      return allEffects.length ? allEffects : void 0;
    };
    createDiscriminatedUnionSchema = (zodDiscriminatedUnion, state) => {
      const options = zodDiscriminatedUnion.options;
      const schemas = options.map(
        (option, index2) => createSchemaObject(option, state, [`discriminated union option ${index2}`])
      );
      const schemaObjects = schemas.map((schema) => schema.schema);
      const discriminator = mapDiscriminator(
        schemaObjects,
        options,
        zodDiscriminatedUnion.discriminator,
        state
      );
      return {
        type: "schema",
        schema: {
          oneOf: schemaObjects,
          ...discriminator && { discriminator }
        },
        effects: flattenEffects(schemas.map((schema) => schema.effects))
      };
    };
    unwrapLiterals = (zodType, state) => {
      if (isZodType(zodType, "ZodLiteral")) {
        if (typeof zodType._def.value !== "string") {
          return void 0;
        }
        return [zodType._def.value];
      }
      if (isZodType(zodType, "ZodNativeEnum")) {
        const schema = createNativeEnumSchema(zodType, state);
        if (schema.type === "schema" && schema.schema.type === "string") {
          return schema.schema.enum;
        }
      }
      if (isZodType(zodType, "ZodEnum")) {
        return zodType._def.values;
      }
      if (isZodType(zodType, "ZodBranded")) {
        return unwrapLiterals(zodType._def.type, state);
      }
      if (isZodType(zodType, "ZodReadonly")) {
        return unwrapLiterals(zodType._def.innerType, state);
      }
      if (isZodType(zodType, "ZodCatch")) {
        return unwrapLiterals(zodType._def.innerType, state);
      }
      return void 0;
    };
    mapDiscriminator = (schemas, zodObjects, discriminator, state) => {
      var _a;
      if (typeof discriminator !== "string") {
        return void 0;
      }
      const mapping = {};
      for (const [index2, zodObject] of zodObjects.entries()) {
        const schema = schemas[index2];
        const componentSchemaRef = "$ref" in schema ? schema == null ? void 0 : schema.$ref : void 0;
        if (!componentSchemaRef) {
          if ((_a = state.documentOptions) == null ? void 0 : _a.enforceDiscriminatedUnionComponents) {
            throw new Error(
              `Discriminated Union member ${index2} at ${state.path.join(" > ")} is not registered as a component`
            );
          }
          return void 0;
        }
        const value = zodObject.shape[discriminator];
        const literals = unwrapLiterals(value, state);
        if (!literals) {
          return void 0;
        }
        for (const enumValue of literals) {
          mapping[enumValue] = componentSchemaRef;
        }
      }
      return {
        propertyName: discriminator,
        mapping
      };
    };
    createEnumSchema = (zodEnum) => ({
      type: "schema",
      schema: {
        type: "string",
        enum: zodEnum._def.values
      }
    });
    createIntersectionSchema = (zodIntersection, state) => {
      const schemas = flattenIntersection(zodIntersection);
      const allOfs = schemas.map(
        (schema, index2) => createSchemaObject(schema, state, [`intersection ${index2}`])
      );
      return {
        type: "schema",
        schema: {
          allOf: allOfs.map((schema) => schema.schema)
        },
        effects: flattenEffects(allOfs.map((schema) => schema.effects))
      };
    };
    flattenIntersection = (zodType) => {
      if (!isZodType(zodType, "ZodIntersection")) {
        return [zodType];
      }
      const leftSchemas = flattenIntersection(zodType._def.left);
      const rightSchemas = flattenIntersection(zodType._def.right);
      return [...leftSchemas, ...rightSchemas];
    };
    createLazySchema = (zodLazy, state) => {
      const innerSchema = zodLazy._def.getter();
      return createSchemaObject(innerSchema, state, ["lazy schema"]);
    };
    createNullSchema = () => ({
      type: "schema",
      schema: {
        type: "null"
      }
    });
    createLiteralSchema = (zodLiteral, state) => {
      if (zodLiteral.value === null) {
        return createNullSchema();
      }
      if (satisfiesVersion(state.components.openapi, "3.1.0")) {
        return {
          type: "schema",
          schema: {
            type: typeof zodLiteral.value,
            const: zodLiteral.value
          }
        };
      }
      return {
        type: "schema",
        schema: {
          type: typeof zodLiteral.value,
          enum: [zodLiteral.value]
        }
      };
    };
    createManualTypeSchema = (zodSchema, state) => {
      var _a, _b, _c;
      if (!((_b = (_a = zodSchema._def.zodOpenApi) == null ? void 0 : _a.openapi) == null ? void 0 : _b.type)) {
        const schemaName = zodSchema.constructor.name;
        throw new Error(
          `Unknown schema ${schemaName} at ${state.path.join(
            " > "
          )}. Please assign it a manual 'type'.`
        );
      }
      return {
        type: "schema",
        schema: {
          type: (_c = zodSchema._def.zodOpenApi) == null ? void 0 : _c.openapi.type
        }
      };
    };
    createNullableSchema = (zodNullable, state) => {
      const schemaObject = createSchemaObject(zodNullable.unwrap(), state, [
        "nullable"
      ]);
      if (satisfiesVersion(state.components.openapi, "3.1.0")) {
        if (schemaObject.type === "ref" || schemaObject.schema.allOf) {
          return {
            type: "schema",
            schema: {
              oneOf: mapNullOf([schemaObject.schema], state.components.openapi)
            },
            effects: schemaObject.effects
          };
        }
        if (schemaObject.schema.oneOf) {
          const { oneOf, ...schema3 } = schemaObject.schema;
          return {
            type: "schema",
            schema: {
              oneOf: mapNullOf(oneOf, state.components.openapi),
              ...schema3
            },
            effects: schemaObject.effects
          };
        }
        if (schemaObject.schema.anyOf) {
          const { anyOf, ...schema3 } = schemaObject.schema;
          return {
            type: "schema",
            schema: {
              anyOf: mapNullOf(anyOf, state.components.openapi),
              ...schema3
            },
            effects: schemaObject.effects
          };
        }
        const { type: type2, const: schemaConst, ...schema2 } = schemaObject.schema;
        if (schemaConst) {
          return {
            type: "schema",
            schema: {
              type: mapNullType(type2),
              enum: [schemaConst, null],
              ...schema2
            },
            effects: schemaObject.effects
          };
        }
        return {
          type: "schema",
          schema: {
            type: mapNullType(type2),
            ...schema2,
            // https://github.com/json-schema-org/json-schema-spec/issues/258
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            ...schema2.enum && { enum: [...schema2.enum, null] }
          },
          effects: schemaObject.effects
        };
      }
      if (schemaObject.type === "ref") {
        return {
          type: "schema",
          schema: {
            allOf: [schemaObject.schema],
            nullable: true
          },
          effects: schemaObject.effects
        };
      }
      const { type, ...schema } = schemaObject.schema;
      return {
        type: "schema",
        schema: {
          ...type && { type },
          nullable: true,
          ...schema,
          // https://github.com/OAI/OpenAPI-Specification/blob/main/proposals/2019-10-31-Clarify-Nullable.md#if-a-schema-specifies-nullable-true-and-enum-1-2-3-does-that-schema-allow-null-values-see-1900
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          ...schema.enum && { enum: [...schema.enum, null] }
        },
        effects: schemaObject.effects
      };
    };
    mapNullType = (type) => {
      if (!type) {
        return "null";
      }
      if (Array.isArray(type)) {
        return [...type, "null"];
      }
      return [type, "null"];
    };
    mapNullOf = (ofSchema, openapi) => {
      if (satisfiesVersion(openapi, "3.1.0")) {
        return [...ofSchema, { type: "null" }];
      }
      return [...ofSchema, { nullable: true }];
    };
    createNumberSchema = (zodNumber, state) => {
      const zodNumberChecks = getZodNumberChecks(zodNumber);
      const minimum = mapMinimum(zodNumberChecks, state.components.openapi);
      const maximum = mapMaximum(zodNumberChecks, state.components.openapi);
      const multipleOf = mapMultipleOf(zodNumberChecks);
      return {
        type: "schema",
        schema: {
          type: mapNumberType(zodNumberChecks),
          ...multipleOf && multipleOf,
          ...minimum && minimum,
          // Union types are not easy to tame
          ...maximum && maximum
        }
      };
    };
    mapMultipleOf = (zodNumberCheck) => zodNumberCheck.multipleOf ? { multipleOf: zodNumberCheck.multipleOf.value } : void 0;
    mapMaximum = (zodNumberCheck, openapi) => {
      if (!zodNumberCheck.max) {
        return void 0;
      }
      const maximum = zodNumberCheck.max.value;
      if (zodNumberCheck.max.inclusive) {
        return { ...maximum !== void 0 && { maximum } };
      }
      if (satisfiesVersion(openapi, "3.1.0")) {
        return { exclusiveMaximum: maximum };
      }
      return { maximum, exclusiveMaximum: true };
    };
    mapMinimum = (zodNumberCheck, openapi) => {
      if (!zodNumberCheck.min) {
        return void 0;
      }
      const minimum = zodNumberCheck.min.value;
      if (zodNumberCheck.min.inclusive) {
        return { ...minimum !== void 0 && { minimum } };
      }
      if (satisfiesVersion(openapi, "3.1.0")) {
        return { exclusiveMinimum: minimum };
      }
      return { minimum, exclusiveMinimum: true };
    };
    getZodNumberChecks = (zodNumber) => zodNumber._def.checks.reduce((acc, check) => {
      acc[check.kind] = check;
      return acc;
    }, {});
    mapNumberType = (zodNumberChecks) => zodNumberChecks.int ? "integer" : "number";
    createOptionalSchema = (zodOptional, state) => createSchemaObject(zodOptional.unwrap(), state, ["optional"]);
    isOptionalObjectKey = (zodSchema) => isZodType(zodSchema, "ZodNever") || isZodType(zodSchema, "ZodUndefined") || isZodType(zodSchema, "ZodLiteral") && zodSchema._def.value === void 0;
    createObjectSchema = (zodObject, previous, state) => {
      const extendedSchema = createExtendedSchema(
        zodObject,
        previous == null ? void 0 : previous.zodType,
        state
      );
      if (extendedSchema) {
        return extendedSchema;
      }
      return createObjectSchemaFromShape(
        zodObject.shape,
        {
          unknownKeys: zodObject._def.unknownKeys,
          catchAll: zodObject._def.catchall
        },
        state
      );
    };
    createExtendedSchema = (zodObject, baseZodObject, state) => {
      var _a, _b, _c, _d, _e;
      if (!baseZodObject) {
        return void 0;
      }
      const component = state.components.schemas.get(baseZodObject);
      if (component ?? ((_b = (_a = baseZodObject._def.zodOpenApi) == null ? void 0 : _a.openapi) == null ? void 0 : _b.ref)) {
        createSchemaObject(baseZodObject, state, ["extended schema"]);
      }
      const completeComponent = state.components.schemas.get(baseZodObject);
      if (!completeComponent) {
        return void 0;
      }
      const diffOpts = createDiffOpts(
        {
          unknownKeys: baseZodObject._def.unknownKeys,
          catchAll: baseZodObject._def.catchall
        },
        {
          unknownKeys: zodObject._def.unknownKeys,
          catchAll: zodObject._def.catchall
        }
      );
      if (!diffOpts) {
        return void 0;
      }
      const diffShape = createShapeDiff(
        baseZodObject._def.shape(),
        zodObject._def.shape()
      );
      if (!diffShape) {
        return void 0;
      }
      const extendedSchema = createObjectSchemaFromShape(
        diffShape,
        diffOpts,
        state,
        true
      );
      const schemaLength = Object.keys(extendedSchema.schema).length;
      const effects = flattenEffects([
        completeComponent.type === "complete" ? completeComponent.effects : [],
        completeComponent.type === "in-progress" ? [
          {
            type: "component",
            zodType: zodObject,
            path: [...state.path]
          }
        ] : [],
        extendedSchema.effects
      ]);
      if (schemaLength === 0) {
        return {
          type: "ref",
          schema: {
            $ref: createComponentSchemaRef(
              completeComponent.ref,
              (_c = state.documentOptions) == null ? void 0 : _c.componentRefPath
            )
          },
          schemaObject: completeComponent.type === "complete" ? completeComponent.schemaObject : void 0,
          zodType: zodObject,
          effects
        };
      }
      if (schemaLength === 1 && extendedSchema.schema.description) {
        return createDescriptionMetadata(
          {
            type: "ref",
            schema: {
              $ref: createComponentSchemaRef(
                completeComponent.ref,
                (_d = state.documentOptions) == null ? void 0 : _d.componentRefPath
              )
            },
            schemaObject: completeComponent.type === "complete" ? completeComponent.schemaObject : void 0,
            zodType: zodObject,
            effects
          },
          extendedSchema.schema.description,
          state
        );
      }
      return {
        type: "schema",
        schema: {
          allOf: [
            {
              $ref: createComponentSchemaRef(
                completeComponent.ref,
                (_e = state.documentOptions) == null ? void 0 : _e.componentRefPath
              )
            }
          ],
          ...extendedSchema.schema
        },
        effects: flattenEffects([
          completeComponent.type === "complete" ? completeComponent.effects : [],
          completeComponent.type === "in-progress" ? [
            {
              type: "component",
              zodType: zodObject,
              path: [...state.path]
            }
          ] : [],
          extendedSchema.effects
        ])
      };
    };
    createDiffOpts = (baseOpts, extendedOpts) => {
      if (baseOpts.unknownKeys === "strict" || !isZodType(baseOpts.catchAll, "ZodNever")) {
        return void 0;
      }
      return {
        catchAll: extendedOpts.catchAll,
        unknownKeys: extendedOpts.unknownKeys
      };
    };
    createShapeDiff = (baseObj, extendedObj) => {
      const acc = {};
      for (const [key, val] of Object.entries(extendedObj)) {
        const baseValue = baseObj[key];
        if (val === baseValue) {
          continue;
        }
        if (baseValue === void 0) {
          acc[key] = extendedObj[key];
          continue;
        }
        return null;
      }
      return acc;
    };
    mapAdditionalProperties = ({ unknownKeys, catchAll }, state) => {
      if (!isZodType(catchAll, "ZodNever")) {
        return createSchemaObject(catchAll, state, ["additional properties"]);
      }
      if (unknownKeys === "strict") {
        return false;
      }
      if (unknownKeys === "passthrough") {
        return true;
      }
      return void 0;
    };
    createObjectSchemaFromShape = (shape, { unknownKeys, catchAll }, state, omitType) => {
      const properties = mapProperties(shape, state);
      const required = mapRequired(properties, shape, state);
      const additionalProperties = mapAdditionalProperties(
        { catchAll, unknownKeys },
        state
      );
      return {
        type: "schema",
        schema: {
          ...!omitType && { type: "object" },
          ...properties && { properties: properties.properties },
          ...(required == null ? void 0 : required.required.length) && { required: required.required },
          ...additionalProperties !== void 0 && {
            additionalProperties: typeof additionalProperties === "object" ? additionalProperties.schema : additionalProperties
          }
        },
        effects: flattenEffects([
          ...(properties == null ? void 0 : properties.effects) ?? [],
          typeof additionalProperties === "object" && (additionalProperties == null ? void 0 : additionalProperties.effects),
          required == null ? void 0 : required.effects
        ])
      };
    };
    mapRequired = (properties, shape, state) => {
      if (!properties) {
        return void 0;
      }
      const { required, effects } = Object.entries(properties.schemas).reduce(
        (acc, [key, schemaOrRef]) => {
          const zodSchema = shape[key];
          if (!zodSchema) {
            throw new Error("Property somehow doesn't exist in shape");
          }
          const result = zodSchema.safeParse(void 0);
          if (!result.success) {
            acc.required.push(key);
            return acc;
          }
          if (result.data !== void 0) {
            const baseEffect = {
              zodType: zodSchema,
              path: [...state.path, `property: ${key}`]
            };
            const effect = schemaOrRef.type === "ref" ? {
              ...baseEffect,
              type: "component"
            } : {
              ...baseEffect,
              type: "schema",
              creationType: state.type
            };
            acc.effects.push(effect);
            if (state.type === "output") {
              acc.required.push(key);
            }
          }
          return acc;
        },
        {
          required: [],
          effects: []
        }
      );
      return { required, effects };
    };
    mapProperties = (shape, state) => {
      const shapeEntries = Object.entries(shape);
      if (!shapeEntries.length) {
        return void 0;
      }
      return shapeEntries.reduce(
        (acc, [key, zodSchema]) => {
          if (isOptionalObjectKey(zodSchema)) {
            return acc;
          }
          const schema = createSchemaObject(zodSchema, state, [`property: ${key}`]);
          acc.schemas[key] = schema;
          acc.properties[key] = schema.schema;
          acc.effects.push(schema.effects);
          return acc;
        },
        {
          schemas: {},
          properties: {},
          effects: []
        }
      );
    };
    createPipelineSchema = (zodPipeline, state) => {
      var _a, _b, _c, _d, _e, _f;
      if (((_b = (_a = zodPipeline._def.zodOpenApi) == null ? void 0 : _a.openapi) == null ? void 0 : _b.effectType) === "input" || ((_d = (_c = zodPipeline._def.zodOpenApi) == null ? void 0 : _c.openapi) == null ? void 0 : _d.effectType) === "same") {
        return createSchemaObject(zodPipeline._def.in, state, ["pipeline input"]);
      }
      if (((_f = (_e = zodPipeline._def.zodOpenApi) == null ? void 0 : _e.openapi) == null ? void 0 : _f.effectType) === "output") {
        return createSchemaObject(zodPipeline._def.out, state, ["pipeline output"]);
      }
      if (state.type === "input") {
        const schema2 = createSchemaObject(zodPipeline._def.in, state, [
          "pipeline input"
        ]);
        return {
          ...schema2,
          effects: flattenEffects([
            [
              {
                type: "schema",
                creationType: "input",
                path: [...state.path],
                zodType: zodPipeline
              }
            ],
            schema2.effects
          ])
        };
      }
      const schema = createSchemaObject(zodPipeline._def.out, state, [
        "pipeline output"
      ]);
      return {
        ...schema,
        effects: flattenEffects([
          [
            {
              type: "schema",
              creationType: "output",
              path: [...state.path],
              zodType: zodPipeline
            }
          ],
          schema.effects
        ])
      };
    };
    createPreprocessSchema = (zodPreprocess, state) => createSchemaObject(zodPreprocess._def.schema, state, ["preprocess schema"]);
    createReadonlySchema = (zodReadonly, state) => (
      // Readonly doesn't change OpenAPI schema
      createSchemaObject(zodReadonly._def.innerType, state, ["readonly"])
    );
    createRecordSchema = (zodRecord, state) => {
      const additionalProperties = createSchemaObject(
        zodRecord.valueSchema,
        state,
        ["record value"]
      );
      const keySchema = createSchemaObject(zodRecord.keySchema, state, [
        "record key"
      ]);
      const maybeComponent = state.components.schemas.get(zodRecord.keySchema);
      const isComplete = maybeComponent && maybeComponent.type === "complete";
      const maybeSchema = isComplete && maybeComponent.schemaObject;
      const maybeEffects = isComplete && maybeComponent.effects || void 0;
      const renderedKeySchema = maybeSchema || keySchema.schema;
      if ("enum" in renderedKeySchema && renderedKeySchema.enum) {
        return {
          type: "schema",
          schema: {
            type: "object",
            properties: renderedKeySchema.enum.reduce((acc, key) => {
              acc[key] = additionalProperties.schema;
              return acc;
            }, {}),
            additionalProperties: false
          },
          effects: flattenEffects([
            keySchema.effects,
            additionalProperties.effects,
            maybeEffects
          ])
        };
      }
      if (satisfiesVersion(state.components.openapi, "3.1.0") && "type" in renderedKeySchema && renderedKeySchema.type === "string" && Object.keys(renderedKeySchema).length > 1) {
        return {
          type: "schema",
          schema: {
            type: "object",
            propertyNames: keySchema.schema,
            additionalProperties: additionalProperties.schema
          },
          effects: flattenEffects([
            keySchema.effects,
            additionalProperties.effects
          ])
        };
      }
      return {
        type: "schema",
        schema: {
          type: "object",
          additionalProperties: additionalProperties.schema
        },
        effects: additionalProperties.effects
      };
    };
    createRefineSchema = (zodRefine, state) => createSchemaObject(zodRefine._def.schema, state, ["refine schema"]);
    createSetSchema = (zodSet, state) => {
      var _a, _b;
      const schema = zodSet._def.valueType;
      const minItems = (_a = zodSet._def.minSize) == null ? void 0 : _a.value;
      const maxItems = (_b = zodSet._def.maxSize) == null ? void 0 : _b.value;
      const itemSchema = createSchemaObject(schema, state, ["set items"]);
      return {
        type: "schema",
        schema: {
          type: "array",
          items: itemSchema.schema,
          uniqueItems: true,
          ...minItems !== void 0 && { minItems },
          ...maxItems !== void 0 && { maxItems }
        },
        effects: itemSchema.effects
      };
    };
    createStringSchema = (zodString, state) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const zodStringChecks = getZodStringChecks(zodString);
      const format = mapStringFormat(zodStringChecks);
      const patterns = mapPatterns(zodStringChecks);
      const minLength = ((_b = (_a = zodStringChecks.length) == null ? void 0 : _a[0]) == null ? void 0 : _b.value) ?? ((_d = (_c = zodStringChecks.min) == null ? void 0 : _c[0]) == null ? void 0 : _d.value);
      const maxLength = ((_f = (_e = zodStringChecks.length) == null ? void 0 : _e[0]) == null ? void 0 : _f.value) ?? ((_h = (_g = zodStringChecks.max) == null ? void 0 : _g[0]) == null ? void 0 : _h.value);
      const contentEncoding = satisfiesVersion(state.components.openapi, "3.1.0") ? mapContentEncoding(zodStringChecks) : void 0;
      if (patterns.length <= 1) {
        return {
          type: "schema",
          schema: {
            type: "string",
            ...format && { format },
            ...patterns[0] && { pattern: patterns[0] },
            ...minLength !== void 0 && { minLength },
            ...maxLength !== void 0 && { maxLength },
            ...contentEncoding && { contentEncoding }
          }
        };
      }
      return {
        type: "schema",
        schema: {
          allOf: [
            {
              type: "string",
              ...format && { format },
              ...patterns[0] && { pattern: patterns[0] },
              ...minLength !== void 0 && { minLength },
              ...maxLength !== void 0 && { maxLength },
              ...contentEncoding && { contentEncoding }
            },
            ...patterns.slice(1).map(
              (pattern) => ({
                type: "string",
                pattern
              })
            )
          ]
        }
      };
    };
    getZodStringChecks = (zodString) => zodString._def.checks.reduce(
      (acc, check) => {
        const mapping = acc[check.kind];
        if (mapping) {
          mapping.push(check);
          return acc;
        }
        acc[check.kind] = [check];
        return acc;
      },
      {}
    );
    mapPatterns = (zodStringChecks) => {
      const startsWith = mapStartsWith(zodStringChecks);
      const endsWith = mapEndsWith(zodStringChecks);
      const regex = mapRegex(zodStringChecks);
      const includes = mapIncludes(zodStringChecks);
      const patterns = [
        ...regex ?? [],
        ...startsWith ? [startsWith] : [],
        ...endsWith ? [endsWith] : [],
        ...includes ?? []
      ];
      return patterns;
    };
    mapStartsWith = (zodStringChecks) => {
      var _a, _b;
      if ((_b = (_a = zodStringChecks.startsWith) == null ? void 0 : _a[0]) == null ? void 0 : _b.value) {
        return `^${zodStringChecks.startsWith[0].value}`;
      }
      return void 0;
    };
    mapEndsWith = (zodStringChecks) => {
      var _a, _b;
      if ((_b = (_a = zodStringChecks.endsWith) == null ? void 0 : _a[0]) == null ? void 0 : _b.value) {
        return `${zodStringChecks.endsWith[0].value}$`;
      }
      return void 0;
    };
    mapRegex = (zodStringChecks) => {
      var _a;
      return (_a = zodStringChecks.regex) == null ? void 0 : _a.map((regexCheck) => regexCheck.regex.source);
    };
    mapIncludes = (zodStringChecks) => {
      var _a;
      return (_a = zodStringChecks.includes) == null ? void 0 : _a.map((includeCheck) => {
        if (includeCheck.position === 0) {
          return `^${includeCheck.value}`;
        }
        if (includeCheck.position) {
          return `^.{${includeCheck.position}}${includeCheck.value}`;
        }
        return includeCheck.value;
      });
    };
    mapStringFormat = (zodStringChecks) => {
      var _a, _b, _c, _d;
      if (zodStringChecks.uuid) {
        return "uuid";
      }
      if (zodStringChecks.datetime) {
        return "date-time";
      }
      if (zodStringChecks.date) {
        return "date";
      }
      if (zodStringChecks.time) {
        return "time";
      }
      if (zodStringChecks.duration) {
        return "duration";
      }
      if (zodStringChecks.email) {
        return "email";
      }
      if (zodStringChecks.url) {
        return "uri";
      }
      if ((_a = zodStringChecks.ip) == null ? void 0 : _a.every((ip) => ip.version === "v4")) {
        return "ipv4";
      }
      if ((_b = zodStringChecks.ip) == null ? void 0 : _b.every((ip) => ip.version === "v6")) {
        return "ipv6";
      }
      if ((_c = zodStringChecks.cidr) == null ? void 0 : _c.every((ip) => ip.version === "v4")) {
        return "ipv4";
      }
      if ((_d = zodStringChecks.cidr) == null ? void 0 : _d.every((ip) => ip.version === "v6")) {
        return "ipv6";
      }
      return void 0;
    };
    mapContentEncoding = (zodStringChecks) => {
      if (zodStringChecks.base64) {
        return "base64";
      }
      return void 0;
    };
    createTupleSchema = (zodTuple, state) => {
      const items = zodTuple.items;
      const rest = zodTuple._def.rest;
      const prefixItems = mapPrefixItems(items, state);
      if (satisfiesVersion(state.components.openapi, "3.1.0")) {
        if (!rest) {
          return {
            type: "schema",
            schema: {
              type: "array",
              maxItems: items.length,
              minItems: items.length,
              ...prefixItems && {
                prefixItems: prefixItems.schemas.map((item) => item.schema)
              }
            },
            effects: prefixItems == null ? void 0 : prefixItems.effects
          };
        }
        const itemSchema = createSchemaObject(rest, state, ["tuple items"]);
        return {
          type: "schema",
          schema: {
            type: "array",
            items: itemSchema.schema,
            ...prefixItems && {
              prefixItems: prefixItems.schemas.map((item) => item.schema)
            }
          },
          effects: flattenEffects([prefixItems == null ? void 0 : prefixItems.effects, itemSchema.effects])
        };
      }
      if (!rest) {
        return {
          type: "schema",
          schema: {
            type: "array",
            maxItems: items.length,
            minItems: items.length,
            ...prefixItems && {
              items: { oneOf: prefixItems.schemas.map((item) => item.schema) }
            }
          },
          effects: prefixItems == null ? void 0 : prefixItems.effects
        };
      }
      if (prefixItems) {
        const restSchema = createSchemaObject(rest, state, ["tuple items"]);
        return {
          type: "schema",
          schema: {
            type: "array",
            items: {
              oneOf: [
                ...prefixItems.schemas.map((item) => item.schema),
                restSchema.schema
              ]
            }
          },
          effects: flattenEffects([restSchema.effects, prefixItems.effects])
        };
      }
      return {
        type: "schema",
        schema: {
          type: "array"
        }
      };
    };
    mapPrefixItems = (items, state) => {
      if (items.length) {
        const schemas = items.map(
          (item, index2) => createSchemaObject(item, state, [`tuple item ${index2}`])
        );
        return {
          effects: flattenEffects(schemas.map((s) => s.effects)),
          schemas
        };
      }
      return void 0;
    };
    createUnionSchema = (zodUnion, state) => {
      var _a, _b, _c;
      const schemas = zodUnion.options.reduce((acc, option, index2) => {
        if (!isOptionalObjectKey(option)) {
          acc.push(createSchemaObject(option, state, [`union option ${index2}`]));
        }
        return acc;
      }, []);
      if (((_b = (_a = zodUnion._def.zodOpenApi) == null ? void 0 : _a.openapi) == null ? void 0 : _b.unionOneOf) ?? ((_c = state.documentOptions) == null ? void 0 : _c.unionOneOf)) {
        return {
          type: "schema",
          schema: {
            oneOf: schemas.map((s) => s.schema)
          },
          effects: flattenEffects(schemas.map((s) => s.effects))
        };
      }
      return {
        type: "schema",
        schema: {
          anyOf: schemas.map((s) => s.schema)
        },
        effects: flattenEffects(schemas.map((s) => s.effects))
      };
    };
    createUnknownSchema = (_zodUnknown) => ({
      type: "schema",
      schema: {}
    });
    createSchemaSwitch = (zodSchema, previous, state) => {
      var _a, _b;
      if ((_b = (_a = zodSchema._def.zodOpenApi) == null ? void 0 : _a.openapi) == null ? void 0 : _b.type) {
        return createManualTypeSchema(zodSchema, state);
      }
      if (isZodType(zodSchema, "ZodString")) {
        return createStringSchema(zodSchema, state);
      }
      if (isZodType(zodSchema, "ZodNumber")) {
        return createNumberSchema(zodSchema, state);
      }
      if (isZodType(zodSchema, "ZodBoolean")) {
        return createBooleanSchema();
      }
      if (isZodType(zodSchema, "ZodEnum")) {
        return createEnumSchema(zodSchema);
      }
      if (isZodType(zodSchema, "ZodLiteral")) {
        return createLiteralSchema(zodSchema, state);
      }
      if (isZodType(zodSchema, "ZodNativeEnum")) {
        return createNativeEnumSchema(zodSchema, state);
      }
      if (isZodType(zodSchema, "ZodArray")) {
        return createArraySchema(zodSchema, state);
      }
      if (isZodType(zodSchema, "ZodObject")) {
        return createObjectSchema(zodSchema, previous, state);
      }
      if (isZodType(zodSchema, "ZodUnion")) {
        return createUnionSchema(zodSchema, state);
      }
      if (isZodType(zodSchema, "ZodDiscriminatedUnion")) {
        return createDiscriminatedUnionSchema(zodSchema, state);
      }
      if (isZodType(zodSchema, "ZodNull")) {
        return createNullSchema();
      }
      if (isZodType(zodSchema, "ZodNullable")) {
        return createNullableSchema(zodSchema, state);
      }
      if (isZodType(zodSchema, "ZodOptional")) {
        return createOptionalSchema(zodSchema, state);
      }
      if (isZodType(zodSchema, "ZodReadonly")) {
        return createReadonlySchema(zodSchema, state);
      }
      if (isZodType(zodSchema, "ZodDefault")) {
        return createDefaultSchema(zodSchema, state, previous);
      }
      if (isZodType(zodSchema, "ZodRecord")) {
        return createRecordSchema(zodSchema, state);
      }
      if (isZodType(zodSchema, "ZodTuple")) {
        return createTupleSchema(zodSchema, state);
      }
      if (isZodType(zodSchema, "ZodDate")) {
        return createDateSchema(zodSchema, state);
      }
      if (isZodType(zodSchema, "ZodPipeline")) {
        return createPipelineSchema(zodSchema, state);
      }
      if (isZodType(zodSchema, "ZodEffects") && zodSchema._def.effect.type === "transform") {
        return createTransformSchema(zodSchema, state);
      }
      if (isZodType(zodSchema, "ZodEffects") && zodSchema._def.effect.type === "preprocess") {
        return createPreprocessSchema(zodSchema, state);
      }
      if (isZodType(zodSchema, "ZodEffects") && zodSchema._def.effect.type === "refinement") {
        return createRefineSchema(zodSchema, state);
      }
      if (isZodType(zodSchema, "ZodNativeEnum")) {
        return createNativeEnumSchema(zodSchema, state);
      }
      if (isZodType(zodSchema, "ZodIntersection")) {
        return createIntersectionSchema(zodSchema, state);
      }
      if (isZodType(zodSchema, "ZodCatch")) {
        return createCatchSchema(zodSchema, state, previous);
      }
      if (isZodType(zodSchema, "ZodUnknown") || isZodType(zodSchema, "ZodAny")) {
        return createUnknownSchema();
      }
      if (isZodType(zodSchema, "ZodLazy")) {
        return createLazySchema(zodSchema, state);
      }
      if (isZodType(zodSchema, "ZodBranded")) {
        return createBrandedSchema(zodSchema, state);
      }
      if (isZodType(zodSchema, "ZodSet")) {
        return createSetSchema(zodSchema, state);
      }
      if (isZodType(zodSchema, "ZodBigInt")) {
        return createBigIntSchema();
      }
      return createManualTypeSchema(zodSchema, state);
    };
    createNewSchema = ({
      zodSchema,
      previous,
      state
    }) => {
      var _a;
      if (state.visited.has(zodSchema)) {
        throw new Error(
          `The schema at ${state.path.join(
            " > "
          )} needs to be registered because it's circularly referenced`
        );
      }
      state.visited.add(zodSchema);
      const {
        effectType,
        param,
        header,
        ref,
        refType,
        unionOneOf,
        ...additionalMetadata
      } = ((_a = zodSchema._def.zodOpenApi) == null ? void 0 : _a.openapi) ?? {};
      const schema = createSchemaSwitch(zodSchema, previous, state);
      const schemaWithMetadata = enhanceWithMetadata(
        schema,
        additionalMetadata,
        state,
        previous
      );
      state.visited.delete(zodSchema);
      return schemaWithMetadata;
    };
    createNewRef = ({
      previous,
      ref,
      zodSchema,
      state
    }) => {
      var _a;
      state.components.schemas.set(zodSchema, {
        type: "in-progress",
        ref
      });
      const newSchema = createNewSchema({
        zodSchema,
        previous,
        state: {
          ...state,
          visited: /* @__PURE__ */ new Set()
        }
      });
      state.components.schemas.set(zodSchema, {
        type: "complete",
        ref,
        schemaObject: newSchema.schema,
        effects: newSchema.effects
      });
      return {
        type: "ref",
        schema: {
          $ref: createComponentSchemaRef(
            ref,
            (_a = state.documentOptions) == null ? void 0 : _a.componentRefPath
          )
        },
        schemaObject: newSchema.schema,
        effects: newSchema.effects ? [
          {
            type: "component",
            zodType: zodSchema,
            path: [...state.path]
          }
        ] : void 0,
        zodType: zodSchema
      };
    };
    createExistingRef = (zodSchema, component, state) => {
      var _a, _b;
      if (component && component.type === "complete") {
        return {
          type: "ref",
          schema: {
            $ref: createComponentSchemaRef(
              component.ref,
              (_a = state.documentOptions) == null ? void 0 : _a.componentRefPath
            )
          },
          schemaObject: component.schemaObject,
          effects: component.effects ? [
            {
              type: "component",
              zodType: zodSchema,
              path: [...state.path]
            }
          ] : void 0,
          zodType: zodSchema
        };
      }
      if (component && component.type === "in-progress") {
        return {
          type: "ref",
          schema: {
            $ref: createComponentSchemaRef(
              component.ref,
              (_b = state.documentOptions) == null ? void 0 : _b.componentRefPath
            )
          },
          schemaObject: void 0,
          effects: [
            {
              type: "component",
              zodType: zodSchema,
              path: [...state.path]
            }
          ],
          zodType: zodSchema
        };
      }
      return;
    };
    createSchemaOrRef = (zodSchema, state, onlyRef) => {
      var _a, _b, _c, _d;
      const component = state.components.schemas.get(zodSchema);
      const existingRef = createExistingRef(zodSchema, component, state);
      if (existingRef) {
        return existingRef;
      }
      const previous = ((_a = zodSchema._def.zodOpenApi) == null ? void 0 : _a[previousSymbol]) ? createSchemaOrRef(
        zodSchema._def.zodOpenApi[previousSymbol],
        state,
        true
      ) : void 0;
      const current = ((_b = zodSchema._def.zodOpenApi) == null ? void 0 : _b[currentSymbol]) && zodSchema._def.zodOpenApi[currentSymbol] !== zodSchema ? createSchemaOrRef(
        zodSchema._def.zodOpenApi[currentSymbol],
        state,
        true
      ) : void 0;
      const ref = ((_d = (_c = zodSchema._def.zodOpenApi) == null ? void 0 : _c.openapi) == null ? void 0 : _d.ref) ?? (component == null ? void 0 : component.ref);
      if (ref) {
        return current ? createNewSchema({ zodSchema, previous: current, state }) : createNewRef({ ref, zodSchema, previous, state });
      }
      if (onlyRef) {
        return previous ?? current;
      }
      return createNewSchema({ zodSchema, previous: previous ?? current, state });
    };
    createSchemaObject = (zodSchema, state, subpath) => {
      state.path.push(...subpath);
      const schema = createSchemaOrRef(zodSchema, state);
      if (!schema) {
        throw new Error("Schema does not exist");
      }
      state.path.pop();
      return schema;
    };
    createSchema = (zodSchema, state, subpath) => {
      const schema = createSchemaObject(zodSchema, state, subpath);
      if (schema.effects) {
        verifyEffects(schema.effects, state);
      }
      return schema.schema;
    };
    createMediaTypeSchema = (schemaObject, components, type, subpath, documentOptions) => {
      if (!schemaObject) {
        return void 0;
      }
      if (!isAnyZodType(schemaObject)) {
        return schemaObject;
      }
      return createSchema(
        schemaObject,
        {
          components,
          type,
          path: [],
          visited: /* @__PURE__ */ new Set(),
          documentOptions
        },
        subpath
      );
    };
    createMediaTypeObject = (mediaTypeObject, components, type, subpath, documentOptions) => {
      if (!mediaTypeObject) {
        return void 0;
      }
      return {
        ...mediaTypeObject,
        schema: createMediaTypeSchema(
          mediaTypeObject.schema,
          components,
          type,
          [...subpath, "schema"],
          documentOptions
        )
      };
    };
    createContent = (contentObject, components, type, subpath, documentOptions) => Object.entries(contentObject).reduce(
      (acc, [mediaType, zodOpenApiMediaTypeObject]) => {
        const mediaTypeObject = createMediaTypeObject(
          zodOpenApiMediaTypeObject,
          components,
          type,
          [...subpath, mediaType],
          documentOptions
        );
        if (mediaTypeObject) {
          acc[mediaType] = mediaTypeObject;
        }
        return acc;
      },
      {}
    );
    createComponentParamRef = (ref) => `#/components/parameters/${ref}`;
    createBaseParameter = (schema, components, subpath, documentOptions) => {
      var _a, _b, _c, _d;
      const { ref, ...rest } = ((_b = (_a = schema._def.zodOpenApi) == null ? void 0 : _a.openapi) == null ? void 0 : _b.param) ?? {};
      const state = {
        components,
        type: "input",
        path: [],
        visited: /* @__PURE__ */ new Set(),
        documentOptions
      };
      const schemaObject = createSchema(schema, state, [...subpath, "schema"]);
      const required = !schema.isOptional();
      const description = ((_d = (_c = schema._def.zodOpenApi) == null ? void 0 : _c.openapi) == null ? void 0 : _d.description) ?? schema._def.description;
      return {
        ...description && { description },
        ...rest,
        ...schema && { schema: schemaObject },
        ...required && { required }
      };
    };
    createParamOrRef = (zodSchema, components, subpath, type, name, documentOptions) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      const component = components.parameters.get(zodSchema);
      const paramType = ((_c = (_b = (_a = zodSchema._def.zodOpenApi) == null ? void 0 : _a.openapi) == null ? void 0 : _b.param) == null ? void 0 : _c.in) ?? (component == null ? void 0 : component.in) ?? type;
      const paramName = ((_f = (_e = (_d = zodSchema._def.zodOpenApi) == null ? void 0 : _d.openapi) == null ? void 0 : _e.param) == null ? void 0 : _f.name) ?? (component == null ? void 0 : component.name) ?? name;
      if (!paramType) {
        throw new Error("Parameter type missing");
      }
      if (!paramName) {
        throw new Error("Parameter name missing");
      }
      if (component && component.type === "complete") {
        if (!("$ref" in component.paramObject) && (component.in !== paramType || component.name !== paramName)) {
          throw new Error(`parameterRef "${component.ref}" is already registered`);
        }
        return {
          $ref: createComponentParamRef(component.ref)
        };
      }
      const baseParamOrRef = createBaseParameter(
        zodSchema,
        components,
        subpath,
        documentOptions
      );
      if ("$ref" in baseParamOrRef) {
        throw new Error("Unexpected Error: received a reference object");
      }
      const ref = ((_i = (_h = (_g = zodSchema == null ? void 0 : zodSchema._def.zodOpenApi) == null ? void 0 : _g.openapi) == null ? void 0 : _h.param) == null ? void 0 : _i.ref) ?? (component == null ? void 0 : component.ref);
      const paramObject = {
        in: paramType,
        name: paramName,
        ...baseParamOrRef
      };
      if (ref) {
        components.parameters.set(zodSchema, {
          type: "complete",
          paramObject,
          ref,
          in: paramType,
          name: paramName
        });
        return {
          $ref: createComponentParamRef(ref)
        };
      }
      return paramObject;
    };
    createParameters = (type, zodObjectType, components, subpath, documentOptions) => {
      if (!zodObjectType) {
        return [];
      }
      const zodObject = getZodObject(zodObjectType, "input").shape;
      return Object.entries(zodObject).map(
        ([key, zodSchema]) => createParamOrRef(
          zodSchema,
          components,
          [...subpath, key],
          type,
          key,
          documentOptions
        )
      );
    };
    createRequestParams = (requestParams, components, subpath, documentOptions) => {
      if (!requestParams) {
        return [];
      }
      const pathParams = createParameters(
        "path",
        requestParams.path,
        components,
        [...subpath, "path"],
        documentOptions
      );
      const queryParams = createParameters(
        "query",
        requestParams.query,
        components,
        [...subpath, "query"],
        documentOptions
      );
      const cookieParams = createParameters(
        "cookie",
        requestParams.cookie,
        components,
        [...subpath, "cookie"],
        documentOptions
      );
      const headerParams = createParameters(
        "header",
        requestParams.header,
        components,
        [...subpath, "header"],
        documentOptions
      );
      return [...pathParams, ...queryParams, ...cookieParams, ...headerParams];
    };
    createManualParameters = (parameters, components, subpath, documentOptions) => (parameters == null ? void 0 : parameters.map((param, index2) => {
      if (isAnyZodType(param)) {
        return createParamOrRef(
          param,
          components,
          [...subpath, `param index ${index2}`],
          void 0,
          void 0,
          documentOptions
        );
      }
      return param;
    })) ?? [];
    createParametersObject = (parameters, requestParams, components, subpath, documentOptions) => {
      const manualParameters = createManualParameters(
        parameters,
        components,
        subpath,
        documentOptions
      );
      const createdParams = createRequestParams(
        requestParams,
        components,
        subpath,
        documentOptions
      );
      const combinedParameters = [
        ...manualParameters,
        ...createdParams
      ];
      return combinedParameters.length ? combinedParameters : void 0;
    };
    getZodObject = (schema, type) => {
      if (isZodType(schema, "ZodObject")) {
        return schema;
      }
      if (isZodType(schema, "ZodLazy")) {
        return getZodObject(schema.schema, type);
      }
      if (isZodType(schema, "ZodEffects")) {
        return getZodObject(schema.innerType(), type);
      }
      if (isZodType(schema, "ZodBranded")) {
        return getZodObject(schema.unwrap(), type);
      }
      if (isZodType(schema, "ZodPipeline")) {
        if (type === "input") {
          return getZodObject(schema._def.in, type);
        }
        return getZodObject(schema._def.out, type);
      }
      throw new Error("failed to find ZodObject in schema");
    };
    isISpecificationExtension = (key) => key.startsWith("x-");
    createResponseHeaders = (responseHeaders, components, documentOptions) => {
      if (!responseHeaders) {
        return void 0;
      }
      if (isAnyZodType(responseHeaders)) {
        return Object.entries(responseHeaders.shape).reduce((acc, [key, zodSchema]) => {
          acc[key] = createHeaderOrRef(zodSchema, components, documentOptions);
          return acc;
        }, {});
      }
      return responseHeaders;
    };
    createHeaderOrRef = (schema, components, documentOptions) => {
      var _a, _b, _c;
      const component = components.headers.get(schema);
      if (component && component.type === "complete") {
        return {
          $ref: createComponentHeaderRef(component.ref)
        };
      }
      const baseHeader = createBaseHeader(schema, components, documentOptions);
      if ("$ref" in baseHeader) {
        throw new Error("Unexpected Error: received a reference object");
      }
      const ref = ((_c = (_b = (_a = schema._def.zodOpenApi) == null ? void 0 : _a.openapi) == null ? void 0 : _b.header) == null ? void 0 : _c.ref) ?? (component == null ? void 0 : component.ref);
      if (ref) {
        components.headers.set(schema, {
          type: "complete",
          headerObject: baseHeader,
          ref
        });
        return {
          $ref: createComponentHeaderRef(ref)
        };
      }
      return baseHeader;
    };
    createBaseHeader = (schema, components, documentOptions) => {
      var _a, _b;
      const { ref, ...rest } = ((_b = (_a = schema._def.zodOpenApi) == null ? void 0 : _a.openapi) == null ? void 0 : _b.header) ?? {};
      const state = {
        components,
        type: "output",
        path: [],
        visited: /* @__PURE__ */ new Set(),
        documentOptions
      };
      const schemaObject = createSchema(schema, state, ["header"]);
      const optionalResult = schema.safeParse(void 0);
      const required = !optionalResult.success || optionalResult !== void 0;
      return {
        ...rest,
        ...schema && { schema: schemaObject },
        ...required && { required }
      };
    };
    createComponentHeaderRef = (ref) => `#/components/headers/${ref}`;
    createResponse = (responseObject, components, subpath, documentOptions) => {
      if ("$ref" in responseObject) {
        return responseObject;
      }
      const component = components.responses.get(responseObject);
      if (component && component.type === "complete") {
        return { $ref: createComponentResponseRef(component.ref) };
      }
      const { content, headers, ref, ...rest } = responseObject;
      const maybeHeaders = createResponseHeaders(
        headers,
        components,
        documentOptions
      );
      const response = {
        ...rest,
        ...maybeHeaders && { headers: maybeHeaders },
        ...content && {
          content: createContent(
            content,
            components,
            "output",
            [...subpath, "content"],
            documentOptions
          )
        }
      };
      const responseRef = ref ?? (component == null ? void 0 : component.ref);
      if (responseRef) {
        components.responses.set(responseObject, {
          responseObject: response,
          ref: responseRef,
          type: "complete"
        });
        return {
          $ref: createComponentResponseRef(responseRef)
        };
      }
      return response;
    };
    createResponses = (responsesObject, components, subpath, documentOptions) => Object.entries(responsesObject).reduce(
      (acc, [statusCode, responseObject]) => {
        if (isISpecificationExtension(statusCode)) {
          acc[statusCode] = responseObject;
          return acc;
        }
        acc[statusCode] = createResponse(
          responseObject,
          components,
          [...subpath, statusCode],
          documentOptions
        );
        return acc;
      },
      {}
    );
    createRequestBody = (requestBodyObject, components, subpath, documentOptions) => {
      if (!requestBodyObject) {
        return void 0;
      }
      const component = components.requestBodies.get(requestBodyObject);
      if (component && component.type === "complete") {
        return {
          $ref: createComponentRequestBodyRef(component.ref)
        };
      }
      const ref = requestBodyObject.ref ?? (component == null ? void 0 : component.ref);
      const requestBody = {
        ...requestBodyObject,
        content: createContent(
          requestBodyObject.content,
          components,
          "input",
          [...subpath, "content"],
          documentOptions
        )
      };
      if (ref) {
        components.requestBodies.set(requestBodyObject, {
          type: "complete",
          ref,
          requestBodyObject: requestBody
        });
        return {
          $ref: createComponentRequestBodyRef(ref)
        };
      }
      return requestBody;
    };
    createOperation = (operationObject, components, subpath, documentOptions) => {
      const { parameters, requestParams, requestBody, responses, ...rest } = operationObject;
      const maybeParameters = createParametersObject(
        parameters,
        requestParams,
        components,
        [...subpath, "parameters"],
        documentOptions
      );
      const maybeRequestBody = createRequestBody(
        operationObject.requestBody,
        components,
        [...subpath, "request body"],
        documentOptions
      );
      const maybeResponses = createResponses(
        operationObject.responses,
        components,
        [...subpath, "responses"],
        documentOptions
      );
      const maybeCallbacks = createCallbacks(
        operationObject.callbacks,
        components,
        [...subpath, "callbacks"],
        documentOptions
      );
      return {
        ...rest,
        ...maybeParameters && { parameters: maybeParameters },
        ...maybeRequestBody && { requestBody: maybeRequestBody },
        ...maybeResponses && { responses: maybeResponses },
        ...maybeCallbacks && { callbacks: maybeCallbacks }
      };
    };
    createPathItem = (pathObject, components, path, documentOptions) => Object.entries(pathObject).reduce(
      (acc, [key, value]) => {
        if (!value) {
          return acc;
        }
        if (key === "get" || key === "put" || key === "post" || key === "delete" || key === "options" || key === "head" || key === "patch" || key === "trace") {
          acc[key] = createOperation(
            value,
            components,
            [...path, key],
            documentOptions
          );
          return acc;
        }
        acc[key] = value;
        return acc;
      },
      {}
    );
    createPaths = (pathsObject, components, documentOptions) => {
      if (!pathsObject) {
        return void 0;
      }
      return Object.entries(pathsObject).reduce(
        (acc, [path, pathItemObject]) => {
          if (isISpecificationExtension(path)) {
            acc[path] = pathItemObject;
            return acc;
          }
          acc[path] = createPathItem(
            pathItemObject,
            components,
            [path],
            documentOptions
          );
          return acc;
        },
        {}
      );
    };
    createCallback = (callbackObject, components, subpath, documentOptions) => {
      const { ref, ...callbacks } = callbackObject;
      const callback = Object.entries(
        callbacks
      ).reduce((acc, [callbackName, pathItemObject]) => {
        if (isISpecificationExtension(callbackName)) {
          acc[callbackName] = pathItemObject;
          return acc;
        }
        acc[callbackName] = createPathItem(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          pathItemObject,
          components,
          [...subpath, callbackName],
          documentOptions
        );
        return acc;
      }, {});
      if (ref) {
        components.callbacks.set(callbackObject, {
          type: "complete",
          ref,
          callbackObject: callback
        });
        return {
          $ref: createComponentCallbackRef(ref)
        };
      }
      return callback;
    };
    createCallbacks = (callbacksObject, components, subpath, documentOptions) => {
      if (!callbacksObject) {
        return void 0;
      }
      return Object.entries(callbacksObject).reduce(
        (acc, [callbackName, callbackObject]) => {
          if (isISpecificationExtension(callbackName)) {
            acc[callbackName] = callbackObject;
            return acc;
          }
          acc[callbackName] = createCallback(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            callbackObject,
            components,
            [...subpath, callbackName],
            documentOptions
          );
          return acc;
        },
        {}
      );
    };
    getDefaultComponents = (componentsObject, openapi = "3.1.0") => {
      const defaultComponents = {
        schemas: /* @__PURE__ */ new Map(),
        parameters: /* @__PURE__ */ new Map(),
        headers: /* @__PURE__ */ new Map(),
        requestBodies: /* @__PURE__ */ new Map(),
        responses: /* @__PURE__ */ new Map(),
        callbacks: /* @__PURE__ */ new Map(),
        openapi
      };
      if (!componentsObject) {
        return defaultComponents;
      }
      getSchemas(componentsObject.schemas, defaultComponents);
      getParameters(componentsObject.parameters, defaultComponents);
      getRequestBodies(componentsObject.requestBodies, defaultComponents);
      getHeaders(componentsObject.headers, defaultComponents);
      getResponses(componentsObject.responses, defaultComponents);
      getCallbacks(componentsObject.callbacks, defaultComponents);
      return defaultComponents;
    };
    getSchemas = (schemas, components) => {
      if (!schemas) {
        return;
      }
      Object.entries(schemas).forEach(([key, schema]) => {
        var _a, _b;
        if (isAnyZodType(schema)) {
          if (components.schemas.has(schema)) {
            throw new Error(
              `Schema ${JSON.stringify(schema._def)} is already registered`
            );
          }
          const ref = ((_b = (_a = schema._def.zodOpenApi) == null ? void 0 : _a.openapi) == null ? void 0 : _b.ref) ?? key;
          components.schemas.set(schema, {
            type: "manual",
            ref
          });
        }
      });
    };
    getParameters = (parameters, components) => {
      if (!parameters) {
        return;
      }
      Object.entries(parameters).forEach(([key, schema]) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i;
        if (isAnyZodType(schema)) {
          if (components.parameters.has(schema)) {
            throw new Error(
              `Parameter ${JSON.stringify(schema._def)} is already registered`
            );
          }
          const ref = ((_c = (_b = (_a = schema._def.zodOpenApi) == null ? void 0 : _a.openapi) == null ? void 0 : _b.param) == null ? void 0 : _c.ref) ?? key;
          const name = (_f = (_e = (_d = schema._def.zodOpenApi) == null ? void 0 : _d.openapi) == null ? void 0 : _e.param) == null ? void 0 : _f.name;
          const location = (_i = (_h = (_g = schema._def.zodOpenApi) == null ? void 0 : _g.openapi) == null ? void 0 : _h.param) == null ? void 0 : _i.in;
          if (!name || !location) {
            throw new Error("`name` or `in` missing in .openapi()");
          }
          components.parameters.set(schema, {
            type: "manual",
            ref,
            in: location,
            name
          });
        }
      });
    };
    getHeaders = (responseHeaders, components) => {
      if (!responseHeaders) {
        return;
      }
      Object.entries(responseHeaders).forEach(([key, schema]) => {
        var _a, _b, _c;
        if (isAnyZodType(schema)) {
          if (components.parameters.has(schema)) {
            throw new Error(
              `Header ${JSON.stringify(schema._def)} is already registered`
            );
          }
          const ref = ((_c = (_b = (_a = schema._def.zodOpenApi) == null ? void 0 : _a.openapi) == null ? void 0 : _b.param) == null ? void 0 : _c.ref) ?? key;
          components.headers.set(schema, {
            type: "manual",
            ref
          });
        }
      });
    };
    getResponses = (responses, components) => {
      if (!responses) {
        return;
      }
      Object.entries(responses).forEach(([key, responseObject]) => {
        if (components.responses.has(responseObject)) {
          throw new Error(
            `Header ${JSON.stringify(responseObject)} is already registered`
          );
        }
        const ref = (responseObject == null ? void 0 : responseObject.ref) ?? key;
        components.responses.set(responseObject, {
          type: "manual",
          ref
        });
      });
    };
    getRequestBodies = (requestBodies, components) => {
      if (!requestBodies) {
        return;
      }
      Object.entries(requestBodies).forEach(([key, requestBody]) => {
        if (components.requestBodies.has(requestBody)) {
          throw new Error(
            `Header ${JSON.stringify(requestBody)} is already registered`
          );
        }
        const ref = (requestBody == null ? void 0 : requestBody.ref) ?? key;
        components.requestBodies.set(requestBody, {
          type: "manual",
          ref
        });
      });
    };
    getCallbacks = (callbacks, components) => {
      if (!callbacks) {
        return;
      }
      Object.entries(callbacks).forEach(([key, callback]) => {
        if (components.callbacks.has(callback)) {
          throw new Error(
            `Callback ${JSON.stringify(callback)} is already registered`
          );
        }
        const ref = (callback == null ? void 0 : callback.ref) ?? key;
        components.callbacks.set(callback, {
          type: "manual",
          ref
        });
      });
    };
    createComponentSchemaRef = (schemaRef, componentPath) => `${componentPath ?? "#/components/schemas/"}${schemaRef}`;
    createComponentResponseRef = (responseRef) => `#/components/responses/${responseRef}`;
    createComponentRequestBodyRef = (requestBodyRef) => `#/components/requestBodies/${requestBodyRef}`;
    createComponentCallbackRef = (callbackRef) => `#/components/callbacks/${callbackRef}`;
    createComponents = (componentsObject, components, documentOptions) => {
      const combinedSchemas = createSchemaComponents(
        componentsObject,
        components,
        documentOptions
      );
      const combinedParameters = createParamComponents(
        componentsObject,
        components,
        documentOptions
      );
      const combinedHeaders = createHeaderComponents(
        componentsObject,
        components,
        documentOptions
      );
      const combinedResponses = createResponseComponents(
        components,
        documentOptions
      );
      const combinedRequestBodies = createRequestBodiesComponents(
        components,
        documentOptions
      );
      const combinedCallbacks = createCallbackComponents(
        components,
        documentOptions
      );
      const { schemas, parameters, headers, responses, requestBodies, ...rest } = componentsObject;
      const finalComponents = {
        ...rest,
        ...combinedSchemas && { schemas: combinedSchemas },
        ...combinedParameters && { parameters: combinedParameters },
        ...combinedRequestBodies && { requestBodies: combinedRequestBodies },
        ...combinedHeaders && { headers: combinedHeaders },
        ...combinedResponses && { responses: combinedResponses },
        ...combinedCallbacks && { callbacks: combinedCallbacks }
      };
      return Object.keys(finalComponents).length ? finalComponents : void 0;
    };
    createSchemaComponents = (componentsObject, components, documentOptions) => {
      Array.from(components.schemas).forEach(([schema, { type }], index2) => {
        var _a, _b;
        if (type === "manual") {
          const state = {
            components,
            type: ((_b = (_a = schema._def.zodOpenApi) == null ? void 0 : _a.openapi) == null ? void 0 : _b.refType) ?? "output",
            path: [],
            visited: /* @__PURE__ */ new Set(),
            documentOptions
          };
          createSchema(schema, state, [`component schema index ${index2}`]);
        }
      });
      const customComponents = Object.entries(
        componentsObject.schemas ?? {}
      ).reduce(
        (acc, [key, value]) => {
          if (isAnyZodType(value)) {
            return acc;
          }
          if (acc[key]) {
            throw new Error(`Schema "${key}" is already registered`);
          }
          acc[key] = value;
          return acc;
        },
        {}
      );
      const finalComponents = Array.from(components.schemas).reduce((acc, [_zodType, component]) => {
        if (component.type === "complete") {
          if (acc[component.ref]) {
            throw new Error(`Schema "${component.ref}" is already registered`);
          }
          acc[component.ref] = component.schemaObject;
        }
        return acc;
      }, customComponents);
      return Object.keys(finalComponents).length ? finalComponents : void 0;
    };
    createParamComponents = (componentsObject, components, documentOptions) => {
      Array.from(components.parameters).forEach(([schema, component], index2) => {
        if (component.type === "manual") {
          createParamOrRef(
            schema,
            components,
            [`component parameter index ${index2}`],
            component.in,
            component.ref,
            documentOptions
          );
        }
      });
      const customComponents = Object.entries(
        componentsObject.parameters ?? {}
      ).reduce(
        (acc, [key, value]) => {
          if (!isAnyZodType(value)) {
            if (acc[key]) {
              throw new Error(`Parameter "${key}" is already registered`);
            }
            acc[key] = value;
          }
          return acc;
        },
        {}
      );
      const finalComponents = Array.from(components.parameters).reduce((acc, [_zodType, component]) => {
        if (component.type === "complete") {
          if (acc[component.ref]) {
            throw new Error(`Parameter "${component.ref}" is already registered`);
          }
          acc[component.ref] = component.paramObject;
        }
        return acc;
      }, customComponents);
      return Object.keys(finalComponents).length ? finalComponents : void 0;
    };
    createHeaderComponents = (componentsObject, components, documentOptions) => {
      Array.from(components.headers).forEach(([schema, component]) => {
        if (component.type === "manual") {
          createHeaderOrRef(schema, components, documentOptions);
        }
      });
      const headers = componentsObject.headers ?? {};
      const customComponents = Object.entries(headers).reduce((acc, [key, value]) => {
        if (!isAnyZodType(value)) {
          if (acc[key]) {
            throw new Error(`Header Ref "${key}" is already registered`);
          }
          acc[key] = value;
        }
        return acc;
      }, {});
      const finalComponents = Array.from(components.headers).reduce((acc, [_zodType, component]) => {
        if (component.type === "complete") {
          if (acc[component.ref]) {
            throw new Error(`Header "${component.ref}" is already registered`);
          }
          acc[component.ref] = component.headerObject;
        }
        return acc;
      }, customComponents);
      return Object.keys(finalComponents).length ? finalComponents : void 0;
    };
    createResponseComponents = (components, documentOptions) => {
      Array.from(components.responses).forEach(([schema, component], index2) => {
        if (component.type === "manual") {
          createResponse(
            schema,
            components,
            [`component response index ${index2}`],
            documentOptions
          );
        }
      });
      const finalComponents = Array.from(components.responses).reduce((acc, [_zodType, component]) => {
        if (component.type === "complete") {
          if (acc[component.ref]) {
            throw new Error(`Response "${component.ref}" is already registered`);
          }
          acc[component.ref] = component.responseObject;
        }
        return acc;
      }, {});
      return Object.keys(finalComponents).length ? finalComponents : void 0;
    };
    createRequestBodiesComponents = (components, documentOptions) => {
      Array.from(components.requestBodies).forEach(([schema, component], index2) => {
        if (component.type === "manual") {
          createRequestBody(
            schema,
            components,
            [`component request body ${index2}`],
            documentOptions
          );
        }
      });
      const finalComponents = Array.from(components.requestBodies).reduce((acc, [_zodType, component]) => {
        if (component.type === "complete") {
          if (acc[component.ref]) {
            throw new Error(`RequestBody "${component.ref}" is already registered`);
          }
          acc[component.ref] = component.requestBodyObject;
        }
        return acc;
      }, {});
      return Object.keys(finalComponents).length ? finalComponents : void 0;
    };
    createCallbackComponents = (components, documentOptions) => {
      Array.from(components.callbacks).forEach(([schema, component], index2) => {
        if (component.type === "manual") {
          createCallback(
            schema,
            components,
            [`component callback ${index2}`],
            documentOptions
          );
        }
      });
      const finalComponents = Array.from(components.callbacks).reduce((acc, [_zodType, component]) => {
        if (component.type === "complete") {
          if (acc[component.ref]) {
            throw new Error(`Callback "${component.ref}" is already registered`);
          }
          acc[component.ref] = component.callbackObject;
        }
        return acc;
      }, {});
      return Object.keys(finalComponents).length ? finalComponents : void 0;
    };
  }
});

// ../../node_modules/.pnpm/zod-openapi@4.2.4_zod@4.3.6/node_modules/zod-openapi/dist/extendZod.chunk.mjs
function extendZodWithOpenApi(zod) {
  if (typeof zod.ZodType.prototype.openapi !== "undefined") {
    return;
  }
  zod.ZodType.prototype.openapi = function(openapi) {
    const { zodOpenApi, ...rest } = this._def;
    const result = new this.constructor({
      ...rest,
      zodOpenApi: {
        openapi: mergeOpenApi(
          openapi,
          zodOpenApi == null ? void 0 : zodOpenApi.openapi
        )
      }
    });
    result._def.zodOpenApi[currentSymbol] = result;
    if (zodOpenApi) {
      result._def.zodOpenApi[previousSymbol] = this;
    }
    return result;
  };
  const zodDescribe = zod.ZodType.prototype.describe;
  zod.ZodType.prototype.describe = function(...args) {
    const result = zodDescribe.apply(this, args);
    const def = result._def;
    if (def.zodOpenApi) {
      const cloned = { ...def.zodOpenApi };
      cloned.openapi = mergeOpenApi({ description: args[0] }, cloned.openapi);
      cloned[previousSymbol] = this;
      cloned[currentSymbol] = result;
      def.zodOpenApi = cloned;
    } else {
      def.zodOpenApi = {
        openapi: { description: args[0] },
        [currentSymbol]: result
      };
    }
    return result;
  };
  const zodObjectExtend = zod.ZodObject.prototype.extend;
  zod.ZodObject.prototype.extend = function(...args) {
    const extendResult = zodObjectExtend.apply(this, args);
    const zodOpenApi = extendResult._def.zodOpenApi;
    if (zodOpenApi) {
      const cloned = { ...zodOpenApi };
      cloned.openapi = mergeOpenApi({}, cloned.openapi);
      cloned[previousSymbol] = this;
      extendResult._def.zodOpenApi = cloned;
    } else {
      extendResult._def.zodOpenApi = {
        [previousSymbol]: this
      };
    }
    return extendResult;
  };
  const zodObjectOmit = zod.ZodObject.prototype.omit;
  zod.ZodObject.prototype.omit = function(...args) {
    const omitResult = zodObjectOmit.apply(this, args);
    const zodOpenApi = omitResult._def.zodOpenApi;
    if (zodOpenApi) {
      const cloned = { ...zodOpenApi };
      cloned.openapi = mergeOpenApi({}, cloned.openapi);
      delete cloned[previousSymbol];
      delete cloned[currentSymbol];
      omitResult._def.zodOpenApi = cloned;
    }
    return omitResult;
  };
  const zodObjectPick = zod.ZodObject.prototype.pick;
  zod.ZodObject.prototype.pick = function(...args) {
    const pickResult = zodObjectPick.apply(this, args);
    const zodOpenApi = pickResult._def.zodOpenApi;
    if (zodOpenApi) {
      const cloned = { ...zodOpenApi };
      cloned.openapi = mergeOpenApi({}, cloned.openapi);
      delete cloned[previousSymbol];
      delete cloned[currentSymbol];
      pickResult._def.zodOpenApi = cloned;
    }
    return pickResult;
  };
}
var mergeOpenApi;
var init_extendZod_chunk = __esm({
  "../../node_modules/.pnpm/zod-openapi@4.2.4_zod@4.3.6/node_modules/zod-openapi/dist/extendZod.chunk.mjs"() {
    "use strict";
    init_extendZodSymbols_chunk();
    mergeOpenApi = (openapi, {
      ref: _ref,
      refType: _refType,
      param: _param,
      header: _header,
      ...rest
    } = {}) => ({
      ...rest,
      ...openapi
    });
  }
});

// ../../node_modules/.pnpm/zod-openapi@4.2.4_zod@4.3.6/node_modules/zod-openapi/dist/index.mjs
var dist_exports = {};
__export(dist_exports, {
  createDocument: () => createDocument,
  createSchema: () => createSchema2,
  extendZodWithOpenApi: () => extendZodWithOpenApi,
  oas30: () => oas30,
  oas31: () => oas31
});
var createDocument, createSchema2, oas30, oas31;
var init_dist3 = __esm({
  "../../node_modules/.pnpm/zod-openapi@4.2.4_zod@4.3.6/node_modules/zod-openapi/dist/index.mjs"() {
    "use strict";
    init_components_chunk();
    init_extendZod_chunk();
    createDocument = (zodOpenApiObject, documentOptions) => {
      const { paths, webhooks, components = {}, ...rest } = zodOpenApiObject;
      const defaultComponents = getDefaultComponents(
        components,
        zodOpenApiObject.openapi
      );
      const createdPaths = createPaths(paths, defaultComponents, documentOptions);
      const createdWebhooks = createPaths(
        webhooks,
        defaultComponents,
        documentOptions
      );
      const createdComponents = createComponents(
        components,
        defaultComponents,
        documentOptions
      );
      return {
        ...rest,
        ...createdPaths && { paths: createdPaths },
        ...createdWebhooks && { webhooks: createdWebhooks },
        ...createdComponents && { components: createdComponents }
      };
    };
    createSchema2 = (zodType, opts) => {
      const components = getDefaultComponents(
        {
          schemas: opts == null ? void 0 : opts.components
        },
        opts == null ? void 0 : opts.openapi
      );
      const state = {
        components,
        type: (opts == null ? void 0 : opts.schemaType) ?? "output",
        path: [],
        visited: /* @__PURE__ */ new Set(),
        documentOptions: opts
      };
      const schema = createSchema(zodType, state, ["createSchema"]);
      const schemaComponents = createSchemaComponents({}, components);
      return {
        schema,
        components: schemaComponents
      };
    };
    oas30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null
    }, Symbol.toStringTag, { value: "Module" }));
    oas31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null
    }, Symbol.toStringTag, { value: "Module" }));
  }
});

// ../../node_modules/.pnpm/@standard-community+standard-openapi@0.2.9_@standard-community+standard-json@0.3.5_@sta_64dc72374920719b5ebc9a639a523d47/node_modules/@standard-community/standard-openapi/dist/zod-DSgpEGAE.js
var zod_DSgpEGAE_exports = {};
__export(zod_DSgpEGAE_exports, {
  default: () => getToOpenAPISchemaFn3
});
function getToOpenAPISchemaFn3() {
  return async (schema, context) => {
    if ("_zod" in schema) {
      return getToOpenAPISchemaFn2()(schema, {
        components: context.components,
        options: { io: "input", ...context.options }
      });
    }
    try {
      const { createSchema: createSchema3 } = await Promise.resolve().then(() => (init_dist3(), dist_exports));
      const { schema: _schema, components } = createSchema3(
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
var init_zod_DSgpEGAE = __esm({
  "../../node_modules/.pnpm/@standard-community+standard-openapi@0.2.9_@standard-community+standard-json@0.3.5_@sta_64dc72374920719b5ebc9a639a523d47/node_modules/@standard-community/standard-openapi/dist/zod-DSgpEGAE.js"() {
    "use strict";
    init_default_u_dwuiYb();
    init_index_DZEfthgZ();
    init_dist2();
    init_convert();
  }
});

// ../../node_modules/.pnpm/@standard-community+standard-openapi@0.2.9_@standard-community+standard-json@0.3.5_@sta_64dc72374920719b5ebc9a639a523d47/node_modules/@standard-community/standard-openapi/dist/index-DZEfthgZ.js
var errorMessageWrapper, openapiVendorMap, getToOpenAPISchemaFn4, toOpenAPISchema;
var init_index_DZEfthgZ = __esm({
  "../../node_modules/.pnpm/@standard-community+standard-openapi@0.2.9_@standard-community+standard-json@0.3.5_@sta_64dc72374920719b5ebc9a639a523d47/node_modules/@standard-community/standard-openapi/dist/index-DZEfthgZ.js"() {
    "use strict";
    errorMessageWrapper = (message) => `standard-openapi: ${message}`;
    openapiVendorMap = /* @__PURE__ */ new Map();
    getToOpenAPISchemaFn4 = async (vendor) => {
      const cached = openapiVendorMap.get(vendor);
      if (cached) {
        return cached;
      }
      let vendorFn;
      switch (vendor) {
        case "valibot":
          vendorFn = (await Promise.resolve().then(() => (init_valibot_D_HTw1Gn(), valibot_D_HTw1Gn_exports))).default();
          break;
        case "zod":
          vendorFn = (await Promise.resolve().then(() => (init_zod_DSgpEGAE(), zod_DSgpEGAE_exports))).default();
          break;
        default:
          vendorFn = (await Promise.resolve().then(() => (init_default_u_dwuiYb(), default_u_dwuiYb_exports))).default();
      }
      openapiVendorMap.set(vendor, vendorFn);
      return vendorFn;
    };
    toOpenAPISchema = async (schema, context = {}) => {
      const fn = await getToOpenAPISchemaFn4(schema["~standard"].vendor);
      const { components = {}, options } = context;
      const _schema = await fn(schema, { components, options });
      return {
        schema: _schema,
        components: Object.keys(components).length > 0 ? components : void 0
      };
    };
  }
});

// src/index.ts
import { Hono } from "hono";
import { eq } from "drizzle-orm";
import "hono/jwt";
import { logger } from "hono/logger";
import { nanoid } from "nanoid";

// ../db/src/index.ts
import pkg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

// ../db/src/schema.ts
var schema_exports = {};
__export(schema_exports, {
  todoStatusEnum: () => todoStatusEnum,
  todos: () => todos,
  userRoleEnum: () => userRoleEnum,
  users: () => users
});
import {
  pgTable,
  text,
  boolean,
  timestamp,
  pgEnum,
  uuid
} from "drizzle-orm/pg-core";
var userRoleEnum = pgEnum("user_role", ["user", "admin"]);
var users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    role: userRoleEnum("role").notNull().default("user"),
    createdAt: timestamp("created_at").defaultNow().notNull()
  }
);
var todoStatusEnum = pgEnum("todo_status", [
  "todo",
  "in-progress",
  "backlog",
  "completed",
  "cancelled"
]);
var todos = pgTable("todoworker", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: todoStatusEnum("status").notNull().default("todo"),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date"
  }).notNull().defaultNow(),
  endAt: timestamp("end_at", {
    withTimezone: true,
    mode: "date"
  })
});

// ../db/src/auth-schema.ts
import { relations } from "drizzle-orm";
import { pgTable as pgTable2, text as text2, timestamp as timestamp2, boolean as boolean2, index } from "drizzle-orm/pg-core";
var user = pgTable2("user", {
  id: text2("id").primaryKey(),
  name: text2("name").notNull(),
  email: text2("email").notNull().unique(),
  emailVerified: boolean2("email_verified").default(false).notNull(),
  image: text2("image"),
  createdAt: timestamp2("created_at").defaultNow().notNull(),
  updatedAt: timestamp2("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
});
var session = pgTable2(
  "session",
  {
    id: text2("id").primaryKey(),
    expiresAt: timestamp2("expires_at").notNull(),
    token: text2("token").notNull().unique(),
    createdAt: timestamp2("created_at").defaultNow().notNull(),
    updatedAt: timestamp2("updated_at").$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
    ipAddress: text2("ip_address"),
    userAgent: text2("user_agent"),
    userId: text2("user_id").notNull().references(() => user.id, { onDelete: "cascade" })
  },
  (table) => [index("session_userId_idx").on(table.userId)]
);
var account = pgTable2(
  "account",
  {
    id: text2("id").primaryKey(),
    accountId: text2("account_id").notNull(),
    providerId: text2("provider_id").notNull(),
    userId: text2("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    accessToken: text2("access_token"),
    refreshToken: text2("refresh_token"),
    idToken: text2("id_token"),
    accessTokenExpiresAt: timestamp2("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp2("refresh_token_expires_at"),
    scope: text2("scope"),
    password: text2("password"),
    createdAt: timestamp2("created_at").defaultNow().notNull(),
    updatedAt: timestamp2("updated_at").$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [index("account_userId_idx").on(table.userId)]
);
var verification = pgTable2(
  "verification",
  {
    id: text2("id").primaryKey(),
    identifier: text2("identifier").notNull(),
    value: text2("value").notNull(),
    expiresAt: timestamp2("expires_at").notNull(),
    createdAt: timestamp2("created_at").defaultNow().notNull(),
    updatedAt: timestamp2("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)]
);
var userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account)
}));
var sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id]
  })
}));
var accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id]
  })
}));

// ../db/src/index.ts
var { Pool } = pkg;
var pool = null;
var db = null;
function getDb() {
  if (db) return db;
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is missing");
  }
  const isLocal = DATABASE_URL.includes("localhost") || DATABASE_URL.includes("postgres:5432");
  pool = new Pool({
    connectionString: DATABASE_URL,
    max: 2,
    connectionTimeoutMillis: 5e3,
    idleTimeoutMillis: 1e4,
    ssl: isLocal ? false : {
      rejectUnauthorized: false
    }
  });
  db = drizzle(pool, { schema: schema_exports });
  return db;
}

// src/index.ts
import * as z2 from "zod";

// ../shared/src/todo.schema.ts
import { z } from "zod";
var TodoStatusEnum = z.enum([
  "todo",
  "in-progress",
  "backlog",
  "completed",
  "cancelled"
]);
var TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: TodoStatusEnum,
  completed: z.boolean(),
  createdAt: z.coerce.date(),
  endAt: z.coerce.date().nullable()
});
var CreateTodoFormSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  dueDate: z.date(),
  dueTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Time must be HH:mm:ss")
});
var CreateTodoSchema = CreateTodoFormSchema.transform((data) => {
  const parts = data.dueTime.split(":");
  const h = Number(parts[0]);
  const m = Number(parts[1]);
  const s = Number(parts[2]);
  const end = new Date(data.dueDate);
  end.setHours(h, m, s, 0);
  return {
    title: data.title,
    description: data.description,
    status: "todo",
    completed: false,
    createdAt: /* @__PURE__ */ new Date(),
    endAt: end
  };
});
var RegisterSchema = z.object(
  {
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(["user", "admin"])
  }
);
var UserResponseSchema = z.object(
  {
    success: z.boolean(),
    user: z.object({
      id: z.string().uuid(),
      email: z.string().email(),
      password: z.string(),
      role: z.enum(["user", "admin"]),
      createdAt: z.string().datetime()
    })
  }
);
var ErrorSchema = z.object({
  error: z.string()
});
var MessageSchema = z.object({
  message: z.string()
});
var sessionResponseSchema = z.object({
  authenticated: z.boolean(),
  user: z.object({
    sub: z.string(),
    email: z.string(),
    role: z.enum(["user", "admin"]),
    exp: z.number()
  })
});

// src/index.ts
import "hono/cookie";

// ../../node_modules/.pnpm/hono-openapi@1.2.0_@hono+standard-validator@0.2.2_@standard-schema+spec@1.1.0_hono@4.11_faa345e172b6c4f28c11705edf9db2c1/node_modules/hono-openapi/dist/index.js
import { findTargetHandler } from "hono/utils/handler";

// ../../node_modules/.pnpm/@hono+standard-validator@0.2.2_@standard-schema+spec@1.1.0_hono@4.11.8/node_modules/@hono/standard-validator/dist/index.js
import { validator } from "hono/validator";
var RESTRICTED_DATA_FIELDS = { header: ["cookie"] };
function sanitizeIssues(issues, vendor, target) {
  if (!(target in RESTRICTED_DATA_FIELDS)) return issues;
  const restrictedFields = RESTRICTED_DATA_FIELDS[target] || [];
  if (vendor === "arktype") return sanitizeArktypeIssues(issues, restrictedFields);
  if (vendor === "valibot") return sanitizeValibotIssues(issues, restrictedFields);
  return issues;
}
function sanitizeArktypeIssues(issues, restrictedFields) {
  return issues.map((issue) => {
    if (issue && typeof issue === "object" && "data" in issue && typeof issue.data === "object" && issue.data !== null && !Array.isArray(issue.data)) {
      const dataCopy = { ...issue.data };
      for (const field of restrictedFields) delete dataCopy[field];
      const sanitizedIssue = Object.create(Object.getPrototypeOf(issue));
      Object.assign(sanitizedIssue, issue, { data: dataCopy });
      return sanitizedIssue;
    }
    return issue;
  });
}
function sanitizeValibotIssues(issues, restrictedFields) {
  return issues.map((issue) => {
    if (issue && typeof issue === "object" && "path" in issue && Array.isArray(issue.path)) {
      for (const path of issue.path) if (typeof path === "object" && "input" in path && typeof path.input === "object" && path.input !== null && !Array.isArray(path.input)) for (const field of restrictedFields) delete path.input[field];
    }
    return issue;
  });
}
var sValidator = (target, schema, hook) => validator(target, async (value, c) => {
  const result = await schema["~standard"].validate(value);
  if (hook) {
    const hookResult = await hook(result.issues ? {
      data: value,
      error: result.issues,
      success: false,
      target
    } : {
      data: value,
      success: true,
      target
    }, c);
    if (hookResult) {
      if (hookResult instanceof Response) return hookResult;
      if ("response" in hookResult) return hookResult.response;
    }
  }
  if (result.issues) {
    const processedIssues = sanitizeIssues(result.issues, schema["~standard"].vendor, target);
    return c.json({
      data: value,
      error: processedIssues,
      success: false
    }, 400);
  }
  return result.value;
});

// ../../node_modules/.pnpm/hono-openapi@1.2.0_@hono+standard-validator@0.2.2_@standard-schema+spec@1.1.0_hono@4.11_faa345e172b6c4f28c11705edf9db2c1/node_modules/hono-openapi/dist/index.js
init_dist2();

// ../../node_modules/.pnpm/@standard-community+standard-openapi@0.2.9_@standard-community+standard-json@0.3.5_@sta_64dc72374920719b5ebc9a639a523d47/node_modules/@standard-community/standard-openapi/dist/index.js
init_index_DZEfthgZ();

// ../../node_modules/.pnpm/hono-openapi@1.2.0_@hono+standard-validator@0.2.2_@standard-schema+spec@1.1.0_hono@4.11_faa345e172b6c4f28c11705edf9db2c1/node_modules/hono-openapi/dist/index.js
var uniqueSymbol = /* @__PURE__ */ Symbol("openapi");
var ALLOWED_METHODS = [
  "GET",
  "PUT",
  "POST",
  "DELETE",
  "OPTIONS",
  "HEAD",
  "PATCH",
  "TRACE"
];
var toOpenAPIPathSegment = (segment) => {
  let tmp = segment;
  if (tmp.startsWith(":")) {
    const match = tmp.match(/^:([^{?]+)(?:{(.+)})?(\?)?$/);
    if (match) {
      const paramName = match[1];
      tmp = `{${paramName}}`;
    } else {
      tmp = tmp.slice(1, tmp.length);
      if (tmp.endsWith("?")) tmp = tmp.slice(0, -1);
      tmp = `{${tmp}}`;
    }
  }
  return tmp;
};
var toOpenAPIPath = (path) => path.split("/").map(toOpenAPIPathSegment).join("/");
var toPascalCase = (text3) => text3.split(/[\W_]+/).filter(Boolean).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
var generateOperationId = (route) => {
  let operationId = route.method.toLowerCase();
  if (route.path === "/") return `${operationId}Index`;
  for (const segment of route.path.split("/")) {
    const openApiPathSegment = toOpenAPIPathSegment(segment);
    if (openApiPathSegment.charCodeAt(0) === 123) {
      operationId += `By${toPascalCase(openApiPathSegment.slice(1, -1))}`;
    } else {
      operationId += toPascalCase(openApiPathSegment);
    }
  }
  return operationId;
};
var paramKey = (param) => "$ref" in param ? param.$ref : `${param.in} ${param.name}`;
function mergeParameters(...params) {
  const merged = params.flatMap((x) => x ?? []).reduce((acc, param) => {
    acc.set(paramKey(param), param);
    return acc;
  }, /* @__PURE__ */ new Map());
  return Array.from(merged.values());
}
var specsByPathContext = /* @__PURE__ */ new Map();
function getPathContext(path) {
  const context = [];
  for (const [key, data] of specsByPathContext) {
    if (data && path.match(key)) {
      context.push(data);
    }
  }
  return context;
}
function clearSpecsContext() {
  specsByPathContext.clear();
}
function mergeSpecs(route, ...specs) {
  return specs.reduce(
    (prev, spec) => {
      if (!spec || !prev) return prev;
      for (const [key, value] of Object.entries(spec)) {
        if (value == null) continue;
        if (key in prev && (typeof value === "object" || typeof value === "function" && key === "operationId")) {
          if (Array.isArray(value)) {
            const values = [...prev[key] ?? [], ...value];
            if (key === "tags") {
              prev[key] = Array.from(new Set(values));
            } else if (key === "parameters") {
              prev[key] = mergeParameters(values);
            } else {
              prev[key] = values;
            }
          } else if (typeof value === "function") {
            prev[key] = value(route);
          } else {
            if (key === "parameters") {
              prev[key] = mergeParameters(prev[key], value);
            } else {
              prev[key] = {
                ...prev[key],
                ...value
              };
            }
          }
        } else {
          prev[key] = value;
        }
      }
      return prev;
    },
    {
      operationId: generateOperationId(route)
    }
  );
}
function registerSchemaPath({
  route,
  specs,
  paths
}) {
  const path = toOpenAPIPath(route.path);
  const method = route.method.toLowerCase();
  if (method === "all") {
    if (!specs) return;
    if (specsByPathContext.has(path)) {
      const prev = specsByPathContext.get(path) ?? {};
      specsByPathContext.set(path, mergeSpecs(route, prev, specs));
    } else {
      specsByPathContext.set(path, specs);
    }
  } else {
    const pathContext = getPathContext(path);
    if (!(path in paths)) {
      paths[path] = {};
    }
    if (paths[path]) {
      paths[path][method] = mergeSpecs(
        route,
        ...pathContext,
        paths[path]?.[method],
        specs
      );
    }
  }
}
function removeExcludedPaths(paths, ctx) {
  const { exclude, excludeStaticFile } = ctx.options;
  const newPaths = {};
  const _exclude = Array.isArray(exclude) ? exclude : [exclude];
  for (const [key, value] of Object.entries(paths)) {
    if (value == null) continue;
    const isExplicitlyExcluded = _exclude.some((x) => {
      if (typeof x === "string") return key === x;
      return x.test(key);
    });
    if (isExplicitlyExcluded) continue;
    const isWildcardWithoutParameters = key.includes("*") && !key.includes("{");
    if (isWildcardWithoutParameters) continue;
    if (excludeStaticFile) {
      const hasPathParameters = key.includes("{");
      const lastSegment = key.split("/").pop() || "";
      const looksLikeStaticFile = lastSegment.includes(".");
      const shouldExcludeAsStaticFile = !hasPathParameters && looksLikeStaticFile;
      if (shouldExcludeAsStaticFile) continue;
    }
    for (const method of Object.keys(value)) {
      const schema = value[method];
      if (schema == null) continue;
      if (key.includes("{")) {
        schema.parameters = schema.parameters ? [...schema.parameters] : [];
        const pathParameters = key.split("/").filter(
          (x) => x.startsWith("{") && !schema.parameters.find(
            (params) => params.in === "path" && params.name === x.slice(1, x.length - 1)
          )
        );
        for (const param of pathParameters) {
          const paramName = param.slice(1, param.length - 1);
          const index2 = schema.parameters.findIndex(
            (x) => {
              if ("$ref" in x) {
                const pos = x.$ref.split("/").pop();
                if (pos) {
                  const param2 = ctx.components.parameters?.[pos];
                  if (param2 && !("$ref" in param2)) {
                    return param2.in === "path" && param2.name === paramName;
                  }
                }
                return false;
              }
              return x.in === "path" && x.name === paramName;
            }
          );
          if (index2 === -1) {
            schema.parameters.push({
              schema: { type: "string" },
              in: "path",
              name: paramName,
              required: true
            });
          }
        }
      }
      if (!schema.responses) {
        schema.responses = {
          200: {}
        };
      }
    }
    const filteredValue = {};
    for (const method of Object.keys(value)) {
      if (value[method] != null) {
        filteredValue[method] = value[method];
      }
    }
    if (Object.keys(filteredValue).length > 0) {
      newPaths[key] = filteredValue;
    }
  }
  return newPaths;
}
var DEFAULT_OPTIONS = {
  documentation: {},
  excludeStaticFile: true,
  exclude: [],
  excludeMethods: ["OPTIONS"],
  excludeTags: []
};
function openAPIRouteHandler(hono, options) {
  let specs;
  return async (c) => {
    if (specs) return c.json(specs);
    specs = await generateSpecs(hono, options, c);
    return c.json(specs);
  };
}
async function generateSpecs(hono, options = DEFAULT_OPTIONS, c) {
  const ctx = {
    components: {},
    // @ts-expect-error
    options: {
      ...DEFAULT_OPTIONS,
      ...options
    }
  };
  const _documentation = ctx.options.documentation ?? {};
  clearSpecsContext();
  const paths = await generatePaths(hono, ctx);
  for (const path in paths) {
    for (const method in paths[path]) {
      const isHidden = getHiddenValue({
        valueOrFunc: paths[path][method]?.hide,
        method,
        path,
        c
      });
      if (isHidden) {
        paths[path][method] = void 0;
      }
    }
  }
  const components = mergeComponentsObjects(
    _documentation.components,
    ctx.components
  );
  return {
    openapi: "3.1.0",
    ..._documentation,
    tags: _documentation.tags?.filter(
      (tag) => !ctx.options.excludeTags?.includes(tag?.name)
    ),
    info: {
      title: "Hono Documentation",
      description: "Development documentation",
      version: "0.0.0",
      ..._documentation.info
    },
    paths: {
      ...removeExcludedPaths(paths, ctx),
      ..._documentation.paths
    },
    components
  };
}
async function generatePaths(hono, ctx) {
  const paths = {};
  for (const route of hono.routes) {
    const middlewareHandler = findTargetHandler(route.handler)[uniqueSymbol];
    if (!middlewareHandler) {
      if (ctx.options.includeEmptyPaths) {
        registerSchemaPath({
          route,
          paths
        });
      }
      continue;
    }
    const routeMethod = route.method;
    if (routeMethod !== "ALL") {
      if (ctx.options.excludeMethods?.includes(routeMethod)) {
        continue;
      }
      if (!ALLOWED_METHODS.includes(routeMethod)) {
        continue;
      }
    }
    const defaultOptionsForThisMethod = ctx.options.defaultOptions?.[routeMethod] && { ...ctx.options.defaultOptions[routeMethod] };
    const { schema: routeSpecs, components = {} } = await getSpec(
      middlewareHandler,
      defaultOptionsForThisMethod
    );
    ctx.components = mergeComponentsObjects(ctx.components, components);
    registerSchemaPath({
      route,
      specs: routeSpecs,
      paths
    });
  }
  return paths;
}
function getHiddenValue(options) {
  const { valueOrFunc, c, method, path } = options;
  if (valueOrFunc != null) {
    if (typeof valueOrFunc === "boolean") {
      return valueOrFunc;
    }
    if (typeof valueOrFunc === "function") {
      return valueOrFunc({ c, method, path });
    }
  }
  return false;
}
async function getSpec(middlewareHandler, defaultOptions2) {
  if ("spec" in middlewareHandler) {
    let components = {};
    const tmp = {
      ...defaultOptions2,
      ...middlewareHandler.spec,
      responses: {
        ...defaultOptions2?.responses,
        ...middlewareHandler.spec.responses
      }
    };
    if (tmp.responses) {
      for (const key of Object.keys(tmp.responses)) {
        const response = tmp.responses[key];
        if (!response || !("content" in response)) continue;
        for (const contentKey of Object.keys(response.content ?? {})) {
          const raw = response.content?.[contentKey];
          if (!raw) continue;
          if (raw.schema && "toOpenAPISchema" in raw.schema) {
            const result2 = await raw.schema.toOpenAPISchema();
            raw.schema = result2.schema;
            if (result2.components) {
              components = mergeComponentsObjects(
                components,
                result2.components
              );
            }
          }
        }
      }
    }
    return { schema: tmp, components };
  }
  const result = await middlewareHandler.toOpenAPISchema();
  const docs = { ...defaultOptions2 };
  if (middlewareHandler.target === "form" || middlewareHandler.target === "json") {
    const media = middlewareHandler.options?.media ?? middlewareHandler.target === "json" ? "application/json" : "multipart/form-data";
    if (!docs.requestBody || !("content" in docs.requestBody) || !docs.requestBody.content) {
      docs.requestBody = {
        content: {
          [media]: {
            schema: result.schema
          }
        }
      };
    } else {
      docs.requestBody.content[media] = {
        schema: result.schema
      };
    }
  } else {
    let parameters = [];
    if ("$ref" in result.schema) {
      const ref = result.schema.$ref;
      const pos = ref.split("/").pop();
      if (pos && result.components?.schemas?.[pos]) {
        const schema = result.components.schemas[pos];
        const newParameters = generateParameters(
          middlewareHandler.target,
          schema
        )[0];
        if (!result.components.parameters) {
          result.components.parameters = {};
        }
        result.components.parameters[pos] = newParameters;
        delete result.components.schemas[pos];
        parameters.push({
          $ref: `#/components/parameters/${pos}`
        });
      }
    } else {
      parameters = generateParameters(middlewareHandler.target, result.schema);
    }
    docs.parameters = parameters;
  }
  return { schema: docs, components: result.components };
}
function generateParameters(target, schema) {
  const parameters = [];
  for (const [key, value] of Object.entries(schema.properties ?? {})) {
    const def = {
      in: target === "param" ? "path" : target,
      name: key,
      // @ts-expect-error
      schema: value
    };
    const isRequired = schema.required?.includes(key);
    if (isRequired) {
      def.required = true;
    }
    if (def.schema && "description" in def.schema && def.schema.description) {
      def.description = def.schema.description;
      def.schema.description = void 0;
    }
    parameters.push(def);
  }
  return parameters;
}
function mergeComponentsObjects(...components) {
  return components.reduce(
    (prev, component, index2) => {
      if (component == null || index2 === 0) return prev;
      if (prev.schemas && Object.keys(prev.schemas).length > 0 || component.schemas && Object.keys(component.schemas).length > 0) {
        prev.schemas = {
          ...prev.schemas,
          ...component.schemas
        };
      }
      if (prev.parameters && Object.keys(prev.parameters).length > 0 || component.parameters && Object.keys(component.parameters).length > 0) {
        prev.parameters = {
          ...prev.parameters,
          ...component.parameters
        };
      }
      return prev;
    },
    components[0] ?? {}
  );
}
function resolver(schema, userDefinedOptions) {
  return {
    vendor: schema["~standard"].vendor,
    validate: schema["~standard"].validate,
    toJSONSchema: (customOptions) => toJsonSchema(schema, { ...userDefinedOptions, ...customOptions }),
    toOpenAPISchema: (customOptions) => toOpenAPISchema(schema, { ...userDefinedOptions, ...customOptions })
  };
}
function validator2(target, schema, hook, options) {
  const middleware = sValidator(target, schema, hook);
  return Object.assign(middleware, {
    [uniqueSymbol]: {
      target,
      ...resolver(schema, options),
      options
    }
  });
}
function describeRoute(spec) {
  const middleware = async (_c, next) => {
    await next();
  };
  return Object.assign(middleware, {
    [uniqueSymbol]: {
      spec
    }
  });
}

// ../../node_modules/.pnpm/@scalar+core@0.3.38/node_modules/@scalar/core/dist/libs/html-rendering/html-rendering.js
var addIndent = (str, spaces = 2, initialIndent = false) => {
  const indent = " ".repeat(spaces);
  const lines = str.split("\n");
  return lines.map((line, index2) => {
    if (index2 === 0 && !initialIndent) {
      return line;
    }
    return `${indent}${line}`;
  }).join("\n");
};
var getStyles = (configuration, customTheme2) => {
  const styles = [];
  if (configuration.customCss) {
    styles.push("/* Custom CSS */");
    styles.push(configuration.customCss);
  }
  if (!configuration.theme && customTheme2) {
    styles.push("/* Custom Theme */");
    styles.push(customTheme2);
  }
  if (styles.length === 0) {
    return "";
  }
  return `
    <style type="text/css">
      ${addIndent(styles.join("\n\n"), 6)}
    </style>`;
};
var getHtmlDocument = (givenConfiguration, customTheme2 = "") => {
  const { cdn, pageTitle, customCss, theme, ...rest } = givenConfiguration;
  const configuration = getConfiguration({
    ...rest,
    ...theme ? { theme } : {},
    customCss
  });
  const content = `<!doctype html>
<html>
  <head>
    <title>${pageTitle ?? "Scalar API Reference"}</title>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1" />${getStyles(configuration, customTheme2)}
  </head>
  <body>
    <div id="app"></div>${getScriptTags(configuration, cdn)}
  </body>
</html>`;
  return content;
};
var serializeArrayWithFunctions = (arr) => {
  return `[${arr.map((item) => typeof item === "function" ? item.toString() : JSON.stringify(item)).join(", ")}]`;
};
function getScriptTags(configuration, cdn) {
  const restConfig = { ...configuration };
  const functionProps = [];
  for (const [key, value] of Object.entries(configuration)) {
    if (typeof value === "function") {
      functionProps.push(`"${key}": ${value.toString()}`);
      delete restConfig[key];
    } else if (Array.isArray(value) && value.some((item) => typeof item === "function")) {
      functionProps.push(`"${key}": ${serializeArrayWithFunctions(value)}`);
      delete restConfig[key];
    }
  }
  const configString = JSON.stringify(restConfig, null, 2).split("\n").map((line, index2) => index2 === 0 ? line : "      " + line).join("\n").replace(/\s*}$/, "");
  const functionPropsString = functionProps.length ? `,
        ${functionProps.join(",\n        ")}
      }` : "}";
  return `
    <!-- Load the Script -->
    <script src="${cdn ?? "https://cdn.jsdelivr.net/npm/@scalar/api-reference"}"></script>

    <!-- Initialize the Scalar API Reference -->
    <script type="text/javascript">
      Scalar.createApiReference('#app', ${configString}${functionPropsString})
    </script>`;
}
var getConfiguration = (givenConfiguration) => {
  const configuration = {
    ...givenConfiguration
  };
  if (typeof configuration.content === "function") {
    configuration.content = configuration.content();
  }
  if (configuration.content && configuration.url) {
    delete configuration.content;
  }
  return configuration;
};

// ../../node_modules/.pnpm/@scalar+hono-api-reference@0.9.41_hono@4.11.8/node_modules/@scalar/hono-api-reference/dist/scalar.js
var DEFAULT_CONFIGURATION = {
  _integration: "hono"
};
var customTheme = `
.dark-mode {
  color-scheme: dark;
  --scalar-color-1: rgba(255, 255, 245, .86);
  --scalar-color-2: rgba(255, 255, 245, .6);
  --scalar-color-3: rgba(255, 255, 245, .38);
  --scalar-color-disabled: rgba(255, 255, 245, .25);
  --scalar-color-ghost: rgba(255, 255, 245, .25);
  --scalar-color-accent: #e36002;
  --scalar-background-1: #1e1e20;
  --scalar-background-2: #2a2a2a;
  --scalar-background-3: #505053;
  --scalar-background-4: rgba(255, 255, 255, 0.06);
  --scalar-background-accent: #e360021f;

  --scalar-border-color: rgba(255, 255, 255, 0.1);
  --scalar-scrollbar-color: rgba(255, 255, 255, 0.24);
  --scalar-scrollbar-color-active: rgba(255, 255, 255, 0.48);
  --scalar-lifted-brightness: 1.45;
  --scalar-backdrop-brightness: 0.5;

  --scalar-shadow-1: 0 1px 3px 0 rgb(0, 0, 0, 0.1);
  --scalar-shadow-2: rgba(15, 15, 15, 0.2) 0px 3px 6px,
    rgba(15, 15, 15, 0.4) 0px 9px 24px, 0 0 0 1px rgba(255, 255, 255, 0.1);

  --scalar-button-1: #f6f6f6;
  --scalar-button-1-color: #000;
  --scalar-button-1-hover: #e7e7e7;

  --scalar-color-green: #3dd68c;
  --scalar-color-red: #f66f81;
  --scalar-color-yellow: #f9b44e;
  --scalar-color-blue: #5c73e7;
  --scalar-color-orange: #ff8d4d;
  --scalar-color-purple: #b191f9;
}
/* Sidebar */
.dark-mode .sidebar {
  --scalar-sidebar-background-1: #161618;
  --scalar-sidebar-item-hover-color: var(--scalar-color-accent);
  --scalar-sidebar-item-hover-background: transparent;
  --scalar-sidebar-item-active-background: transparent;
  --scalar-sidebar-border-color: transparent;
  --scalar-sidebar-color-1: var(--scalar-color-1);
  --scalar-sidebar-color-2: var(--scalar-color-2);
  --scalar-sidebar-color-active: var(--scalar-color-accent);
  --scalar-sidebar-search-background: #252529;
  --scalar-sidebar-search-border-color: transparent;
  --scalar-sidebar-search-color: var(--scalar-color-3);
}
`;
var Scalar = (configOrResolver) => {
  return async (c) => {
    let resolvedConfig = {};
    if (typeof configOrResolver === "function") {
      resolvedConfig = await configOrResolver(c);
    } else {
      resolvedConfig = configOrResolver;
    }
    const configuration = {
      ...DEFAULT_CONFIGURATION,
      ...resolvedConfig
    };
    return c.html(getHtmlDocument(configuration, customTheme));
  };
};

// src/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { expo } from "@better-auth/expo";
if (!process.env.BETTER_AUTH_URL) {
  throw new Error("Not found Better auth");
}
if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error("Auth secret not found");
}
var auth = betterAuth({
  database: drizzleAdapter(getDb(), {
    provider: "pg",
    schema: {
      user,
      session,
      account
    }
  }),
  emailAndPassword: {
    enabled: true
  },
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://todo-better-auth-standalone-server.vercel.app",
    "https://todo-better-auth-standalone-web.vercel.app",
    "my-expo-app://"
  ],
  advanced: {
    crossOriginCookies: true,
    trustedProxyHeaders: true,
    defaultCookieAttributes: {
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true
    }
  },
  plugins: [expo()],
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL
});

// src/index.ts
import { cors } from "hono/cors";
var app = new Hono().basePath("/api");
app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    allowHeaders: ["Content-Type", "Authorization", "Cookie"],
    allowMethods: ["POST", "GET", "OPTIONS", "PATCH", "DELETE"],
    credentials: true
    //exposeHeaders: ["user"]
  })
);
app.all("/auth/*", (c) => {
  return auth.handler(c.req.raw);
});
app.use("*", logger());
var hour = 60 * 60;
app.get(
  "/todos",
  describeRoute({
    description: "Get all todos",
    responses: {
      200: {
        description: "Todos retrieved",
        content: {
          "application/json": {
            schema: resolver(TodoSchema.array())
          }
        }
      },
      401: {
        description: "Unauthorized",
        content: {
          "application/json": { schema: resolver(ErrorSchema) }
        }
      }
    }
  }),
  //authGuard,
  async (c) => {
    const db2 = getDb();
    const data = await db2.select().from(todos);
    return c.json(TodoSchema.array().parse(data));
  }
);
app.post(
  "/todos",
  describeRoute({
    description: "Create new todo",
    responses: {
      201: {
        description: "Todo created",
        content: {
          "application/json": {
            schema: resolver(TodoSchema)
          }
        }
      },
      400: {
        description: "Validation error",
        content: {
          "application/json": { schema: resolver(ErrorSchema) }
        }
      },
      401: {
        description: "Unauthorized",
        content: {
          "application/json": { schema: resolver(ErrorSchema) }
        }
      }
    }
  }),
  validator2("json", CreateTodoFormSchema),
  // authGuard,
  async (c) => {
    const db2 = getDb();
    const body = c.req.valid("json");
    const parsed = CreateTodoSchema.parse(body);
    const [row] = await db2.insert(todos).values({
      id: nanoid(),
      ...parsed
    }).returning();
    return c.json(TodoSchema.parse(row), 201);
  }
);
var UpdateStatusSchema = z2.object({
  status: TodoStatusEnum
});
app.patch(
  "/todos/:id/status",
  describeRoute({
    description: "Update todo status",
    responses: {
      200: {
        description: "Updated",
        content: {
          "application/json": {
            schema: resolver(TodoSchema)
          }
        }
      },
      400: {
        description: "Invalid status",
        content: {
          "application/json": { schema: resolver(ErrorSchema) }
        }
      },
      404: {
        description: "Todo not found",
        content: {
          "application/json": { schema: resolver(MessageSchema) }
        }
      },
      401: {
        description: "Unauthorized",
        content: {
          "application/json": { schema: resolver(ErrorSchema) }
        }
      }
    }
  }),
  validator2("json", UpdateStatusSchema),
  // authGuard,
  async (c) => {
    const db2 = getDb();
    const { id } = c.req.param();
    const { status } = c.req.valid("json");
    const [row] = await db2.update(todos).set({ status, completed: status === "completed" }).where(eq(todos.id, id)).returning();
    if (!row) {
      return c.json({ message: "Not found" }, 404);
    }
    return c.json(TodoSchema.parse(row));
  }
);
app.delete(
  "/todos/:id",
  describeRoute({
    description: "Delete todo",
    responses: {
      204: {
        description: "Todo deleted",
        content: {}
      },
      404: {
        description: "Todo not found",
        content: {
          "application/json": {
            schema: resolver(MessageSchema)
          }
        }
      },
      401: {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: resolver(ErrorSchema)
          }
        }
      }
    }
  }),
  //authGuard,
  async (c) => {
    const db2 = getDb();
    const { id } = c.req.param();
    const result = await db2.delete(todos).where(eq(todos.id, id)).returning();
    if (!result.length) {
      return c.json({ message: "Not found" }, 404);
    }
    return c.body(null, 204);
  }
);
app.get("/doc", openAPIRouteHandler(app, {
  documentation: {
    servers: [{
      url: "/api"
    }]
  }
}));
app.get("/scalar-docs", Scalar((c) => ({
  url: new URL("/api/doc", c.req.url).toString(),
  theme: "deepSpace",
  layout: "modern"
})));
var index_default = app.fetch.bind(app);
export {
  app,
  index_default as default
};
