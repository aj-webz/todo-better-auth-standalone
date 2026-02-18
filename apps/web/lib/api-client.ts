import createClient from "openapi-fetch";
import createReactQueryHooks from "openapi-react-query";
import type { paths } from "./api-schema";

const client = createClient<paths>({baseUrl:
    "/api"
});
export const api = createReactQueryHooks(client);

export { paths }