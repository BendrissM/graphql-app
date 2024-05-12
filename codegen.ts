import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "./src/schema.gql",
    generates: {
        "./src/types.ts": {
            plugins: ["typescript", "typescript-resolvers"],
        }
    }
};

export default config;
