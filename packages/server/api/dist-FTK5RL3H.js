import "./chunk-MLKGABMK.js";

// ../../node_modules/.pnpm/zod-openapi@4.2.4_zod@4.3.6/node_modules/zod-openapi/dist/extendZodSymbols.chunk.mjs
var currentSymbol = /* @__PURE__ */ Symbol("current");
var previousSymbol = /* @__PURE__ */ Symbol("previous");

// ../../node_modules/.pnpm/zod-openapi@4.2.4_zod@4.3.6/node_modules/zod-openapi/dist/components.chunk.mjs
var isZodType = (zodType, typeName) => {
  var _a;
  return ((_a = zodType == null ? void 0 : zodType._def) == null ? void 0 : _a.typeName) === typeName;
};
var isAnyZodType = (zodType) => {
  var _a;
  return Boolean(
    (_a = zodType == null ? void 0 : zodType._def) == null ? void 0 : _a.typeName
  );
};
var openApiVersions = [
  "3.0.0",
  "3.0.1",
  "3.0.2",
  "3.0.3",
  "3.1.0"
];
var satisfiesVersion = (test, against) => openApiVersions.indexOf(test) >= openApiVersions.indexOf(against);
var createDescriptionMetadata = (schema, description, state) => {
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
var isValueEqual = (value, previous) => {
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
var enhanceWithMetadata = (schema, metadata, state, previous) => {
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
var createArraySchema = (zodArray, state) => {
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
var createBigIntSchema = (_zodBigInt) => ({
  type: "schema",
  schema: {
    type: "integer",
    format: "int64"
  }
});
var createBooleanSchema = (_zodBoolean) => ({
  type: "schema",
  schema: {
    type: "boolean"
  }
});
var createBrandedSchema = (zodBranded, state) => createSchemaObject(zodBranded._def.type, state, ["brand"]);
var createCatchSchema = (zodCatch, state, previous) => {
  const schemaObject = createSchemaObject(zodCatch._def.innerType, state, [
    "default"
  ]);
  const catchResult = zodCatch.safeParse(void 0);
  const maybeDefaultValue = catchResult.success ? {
    default: catchResult.data
  } : {};
  return enhanceWithMetadata(schemaObject, maybeDefaultValue, state, previous);
};
var createDateSchema = (_zodDate, state) => {
  var _a;
  return {
    type: "schema",
    schema: ((_a = state.documentOptions) == null ? void 0 : _a.defaultDateSchema) ?? {
      type: "string"
    }
  };
};
var createDefaultSchema = (zodDefault, state, previous) => {
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
var createNativeEnumSchema = (zodEnum, state) => {
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
var getValidEnumValues = (enumValues) => {
  const keys = Object.keys(enumValues).filter(
    (key) => typeof enumValues[enumValues[key]] !== "number"
  );
  return keys.map((key) => enumValues[key]);
};
var sortStringsAndNumbers = (values) => ({
  strings: values.filter((value) => typeof value === "string"),
  numbers: values.filter((value) => typeof value === "number")
});
var createTransformSchema = (zodTransform, state) => {
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
var createManualOutputTransformSchema = (zodTransform, state) => {
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
var getZodTypeName = (zodType) => {
  if (isZodType(zodType, "ZodEffects")) {
    return `${zodType._def.typeName} - ${zodType._def.effect.type}`;
  }
  return zodType._def.typeName;
};
var throwTransformError = (effect) => {
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
var resolveSingleEffect = (effect, state) => {
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
var resolveEffect = (effects, state) => {
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
var verifyEffects = (effects, state) => {
  const resolved = resolveEffect(effects, state);
  if ((resolved == null ? void 0 : resolved.creationType) && resolved.creationType !== state.type) {
    throwTransformError(resolved);
  }
};
var flattenEffects = (effects) => {
  const allEffects = effects.reduce((acc, effect) => {
    if (effect) {
      return acc.concat(effect);
    }
    return acc;
  }, []);
  return allEffects.length ? allEffects : void 0;
};
var createDiscriminatedUnionSchema = (zodDiscriminatedUnion, state) => {
  const options = zodDiscriminatedUnion.options;
  const schemas = options.map(
    (option, index) => createSchemaObject(option, state, [`discriminated union option ${index}`])
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
var unwrapLiterals = (zodType, state) => {
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
var mapDiscriminator = (schemas, zodObjects, discriminator, state) => {
  var _a;
  if (typeof discriminator !== "string") {
    return void 0;
  }
  const mapping = {};
  for (const [index, zodObject] of zodObjects.entries()) {
    const schema = schemas[index];
    const componentSchemaRef = "$ref" in schema ? schema == null ? void 0 : schema.$ref : void 0;
    if (!componentSchemaRef) {
      if ((_a = state.documentOptions) == null ? void 0 : _a.enforceDiscriminatedUnionComponents) {
        throw new Error(
          `Discriminated Union member ${index} at ${state.path.join(" > ")} is not registered as a component`
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
var createEnumSchema = (zodEnum) => ({
  type: "schema",
  schema: {
    type: "string",
    enum: zodEnum._def.values
  }
});
var createIntersectionSchema = (zodIntersection, state) => {
  const schemas = flattenIntersection(zodIntersection);
  const allOfs = schemas.map(
    (schema, index) => createSchemaObject(schema, state, [`intersection ${index}`])
  );
  return {
    type: "schema",
    schema: {
      allOf: allOfs.map((schema) => schema.schema)
    },
    effects: flattenEffects(allOfs.map((schema) => schema.effects))
  };
};
var flattenIntersection = (zodType) => {
  if (!isZodType(zodType, "ZodIntersection")) {
    return [zodType];
  }
  const leftSchemas = flattenIntersection(zodType._def.left);
  const rightSchemas = flattenIntersection(zodType._def.right);
  return [...leftSchemas, ...rightSchemas];
};
var createLazySchema = (zodLazy, state) => {
  const innerSchema = zodLazy._def.getter();
  return createSchemaObject(innerSchema, state, ["lazy schema"]);
};
var createNullSchema = () => ({
  type: "schema",
  schema: {
    type: "null"
  }
});
var createLiteralSchema = (zodLiteral, state) => {
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
var createManualTypeSchema = (zodSchema, state) => {
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
var createNullableSchema = (zodNullable, state) => {
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
var mapNullType = (type) => {
  if (!type) {
    return "null";
  }
  if (Array.isArray(type)) {
    return [...type, "null"];
  }
  return [type, "null"];
};
var mapNullOf = (ofSchema, openapi) => {
  if (satisfiesVersion(openapi, "3.1.0")) {
    return [...ofSchema, { type: "null" }];
  }
  return [...ofSchema, { nullable: true }];
};
var createNumberSchema = (zodNumber, state) => {
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
var mapMultipleOf = (zodNumberCheck) => zodNumberCheck.multipleOf ? { multipleOf: zodNumberCheck.multipleOf.value } : void 0;
var mapMaximum = (zodNumberCheck, openapi) => {
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
var mapMinimum = (zodNumberCheck, openapi) => {
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
var getZodNumberChecks = (zodNumber) => zodNumber._def.checks.reduce((acc, check) => {
  acc[check.kind] = check;
  return acc;
}, {});
var mapNumberType = (zodNumberChecks) => zodNumberChecks.int ? "integer" : "number";
var createOptionalSchema = (zodOptional, state) => createSchemaObject(zodOptional.unwrap(), state, ["optional"]);
var isOptionalObjectKey = (zodSchema) => isZodType(zodSchema, "ZodNever") || isZodType(zodSchema, "ZodUndefined") || isZodType(zodSchema, "ZodLiteral") && zodSchema._def.value === void 0;
var createObjectSchema = (zodObject, previous, state) => {
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
var createExtendedSchema = (zodObject, baseZodObject, state) => {
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
var createDiffOpts = (baseOpts, extendedOpts) => {
  if (baseOpts.unknownKeys === "strict" || !isZodType(baseOpts.catchAll, "ZodNever")) {
    return void 0;
  }
  return {
    catchAll: extendedOpts.catchAll,
    unknownKeys: extendedOpts.unknownKeys
  };
};
var createShapeDiff = (baseObj, extendedObj) => {
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
var mapAdditionalProperties = ({ unknownKeys, catchAll }, state) => {
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
var createObjectSchemaFromShape = (shape, { unknownKeys, catchAll }, state, omitType) => {
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
var mapRequired = (properties, shape, state) => {
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
var mapProperties = (shape, state) => {
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
var createPipelineSchema = (zodPipeline, state) => {
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
var createPreprocessSchema = (zodPreprocess, state) => createSchemaObject(zodPreprocess._def.schema, state, ["preprocess schema"]);
var createReadonlySchema = (zodReadonly, state) => (
  // Readonly doesn't change OpenAPI schema
  createSchemaObject(zodReadonly._def.innerType, state, ["readonly"])
);
var createRecordSchema = (zodRecord, state) => {
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
var createRefineSchema = (zodRefine, state) => createSchemaObject(zodRefine._def.schema, state, ["refine schema"]);
var createSetSchema = (zodSet, state) => {
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
var createStringSchema = (zodString, state) => {
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
var getZodStringChecks = (zodString) => zodString._def.checks.reduce(
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
var mapPatterns = (zodStringChecks) => {
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
var mapStartsWith = (zodStringChecks) => {
  var _a, _b;
  if ((_b = (_a = zodStringChecks.startsWith) == null ? void 0 : _a[0]) == null ? void 0 : _b.value) {
    return `^${zodStringChecks.startsWith[0].value}`;
  }
  return void 0;
};
var mapEndsWith = (zodStringChecks) => {
  var _a, _b;
  if ((_b = (_a = zodStringChecks.endsWith) == null ? void 0 : _a[0]) == null ? void 0 : _b.value) {
    return `${zodStringChecks.endsWith[0].value}$`;
  }
  return void 0;
};
var mapRegex = (zodStringChecks) => {
  var _a;
  return (_a = zodStringChecks.regex) == null ? void 0 : _a.map((regexCheck) => regexCheck.regex.source);
};
var mapIncludes = (zodStringChecks) => {
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
var mapStringFormat = (zodStringChecks) => {
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
var mapContentEncoding = (zodStringChecks) => {
  if (zodStringChecks.base64) {
    return "base64";
  }
  return void 0;
};
var createTupleSchema = (zodTuple, state) => {
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
var mapPrefixItems = (items, state) => {
  if (items.length) {
    const schemas = items.map(
      (item, index) => createSchemaObject(item, state, [`tuple item ${index}`])
    );
    return {
      effects: flattenEffects(schemas.map((s) => s.effects)),
      schemas
    };
  }
  return void 0;
};
var createUnionSchema = (zodUnion, state) => {
  var _a, _b, _c;
  const schemas = zodUnion.options.reduce((acc, option, index) => {
    if (!isOptionalObjectKey(option)) {
      acc.push(createSchemaObject(option, state, [`union option ${index}`]));
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
var createUnknownSchema = (_zodUnknown) => ({
  type: "schema",
  schema: {}
});
var createSchemaSwitch = (zodSchema, previous, state) => {
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
var createNewSchema = ({
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
var createNewRef = ({
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
var createExistingRef = (zodSchema, component, state) => {
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
var createSchemaOrRef = (zodSchema, state, onlyRef) => {
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
var createSchemaObject = (zodSchema, state, subpath) => {
  state.path.push(...subpath);
  const schema = createSchemaOrRef(zodSchema, state);
  if (!schema) {
    throw new Error("Schema does not exist");
  }
  state.path.pop();
  return schema;
};
var createSchema = (zodSchema, state, subpath) => {
  const schema = createSchemaObject(zodSchema, state, subpath);
  if (schema.effects) {
    verifyEffects(schema.effects, state);
  }
  return schema.schema;
};
var createMediaTypeSchema = (schemaObject, components, type, subpath, documentOptions) => {
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
var createMediaTypeObject = (mediaTypeObject, components, type, subpath, documentOptions) => {
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
var createContent = (contentObject, components, type, subpath, documentOptions) => Object.entries(contentObject).reduce(
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
var createComponentParamRef = (ref) => `#/components/parameters/${ref}`;
var createBaseParameter = (schema, components, subpath, documentOptions) => {
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
var createParamOrRef = (zodSchema, components, subpath, type, name, documentOptions) => {
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
var createParameters = (type, zodObjectType, components, subpath, documentOptions) => {
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
var createRequestParams = (requestParams, components, subpath, documentOptions) => {
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
var createManualParameters = (parameters, components, subpath, documentOptions) => (parameters == null ? void 0 : parameters.map((param, index) => {
  if (isAnyZodType(param)) {
    return createParamOrRef(
      param,
      components,
      [...subpath, `param index ${index}`],
      void 0,
      void 0,
      documentOptions
    );
  }
  return param;
})) ?? [];
var createParametersObject = (parameters, requestParams, components, subpath, documentOptions) => {
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
var getZodObject = (schema, type) => {
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
var isISpecificationExtension = (key) => key.startsWith("x-");
var createResponseHeaders = (responseHeaders, components, documentOptions) => {
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
var createHeaderOrRef = (schema, components, documentOptions) => {
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
var createBaseHeader = (schema, components, documentOptions) => {
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
var createComponentHeaderRef = (ref) => `#/components/headers/${ref}`;
var createResponse = (responseObject, components, subpath, documentOptions) => {
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
var createResponses = (responsesObject, components, subpath, documentOptions) => Object.entries(responsesObject).reduce(
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
var createRequestBody = (requestBodyObject, components, subpath, documentOptions) => {
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
var createOperation = (operationObject, components, subpath, documentOptions) => {
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
var createPathItem = (pathObject, components, path, documentOptions) => Object.entries(pathObject).reduce(
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
var createPaths = (pathsObject, components, documentOptions) => {
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
var createCallback = (callbackObject, components, subpath, documentOptions) => {
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
var createCallbacks = (callbacksObject, components, subpath, documentOptions) => {
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
var getDefaultComponents = (componentsObject, openapi = "3.1.0") => {
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
var getSchemas = (schemas, components) => {
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
var getParameters = (parameters, components) => {
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
var getHeaders = (responseHeaders, components) => {
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
var getResponses = (responses, components) => {
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
var getRequestBodies = (requestBodies, components) => {
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
var getCallbacks = (callbacks, components) => {
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
var createComponentSchemaRef = (schemaRef, componentPath) => `${componentPath ?? "#/components/schemas/"}${schemaRef}`;
var createComponentResponseRef = (responseRef) => `#/components/responses/${responseRef}`;
var createComponentRequestBodyRef = (requestBodyRef) => `#/components/requestBodies/${requestBodyRef}`;
var createComponentCallbackRef = (callbackRef) => `#/components/callbacks/${callbackRef}`;
var createComponents = (componentsObject, components, documentOptions) => {
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
var createSchemaComponents = (componentsObject, components, documentOptions) => {
  Array.from(components.schemas).forEach(([schema, { type }], index) => {
    var _a, _b;
    if (type === "manual") {
      const state = {
        components,
        type: ((_b = (_a = schema._def.zodOpenApi) == null ? void 0 : _a.openapi) == null ? void 0 : _b.refType) ?? "output",
        path: [],
        visited: /* @__PURE__ */ new Set(),
        documentOptions
      };
      createSchema(schema, state, [`component schema index ${index}`]);
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
var createParamComponents = (componentsObject, components, documentOptions) => {
  Array.from(components.parameters).forEach(([schema, component], index) => {
    if (component.type === "manual") {
      createParamOrRef(
        schema,
        components,
        [`component parameter index ${index}`],
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
var createHeaderComponents = (componentsObject, components, documentOptions) => {
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
var createResponseComponents = (components, documentOptions) => {
  Array.from(components.responses).forEach(([schema, component], index) => {
    if (component.type === "manual") {
      createResponse(
        schema,
        components,
        [`component response index ${index}`],
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
var createRequestBodiesComponents = (components, documentOptions) => {
  Array.from(components.requestBodies).forEach(([schema, component], index) => {
    if (component.type === "manual") {
      createRequestBody(
        schema,
        components,
        [`component request body ${index}`],
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
var createCallbackComponents = (components, documentOptions) => {
  Array.from(components.callbacks).forEach(([schema, component], index) => {
    if (component.type === "manual") {
      createCallback(
        schema,
        components,
        [`component callback ${index}`],
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

// ../../node_modules/.pnpm/zod-openapi@4.2.4_zod@4.3.6/node_modules/zod-openapi/dist/extendZod.chunk.mjs
var mergeOpenApi = (openapi, {
  ref: _ref,
  refType: _refType,
  param: _param,
  header: _header,
  ...rest
} = {}) => ({
  ...rest,
  ...openapi
});
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

// ../../node_modules/.pnpm/zod-openapi@4.2.4_zod@4.3.6/node_modules/zod-openapi/dist/index.mjs
var createDocument = (zodOpenApiObject, documentOptions) => {
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
var createSchema2 = (zodType, opts) => {
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
var oas30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
var oas31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
export {
  createDocument,
  createSchema2 as createSchema,
  extendZodWithOpenApi,
  oas30,
  oas31
};
