import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { readFileSync } from "fs";
import path from "path";
import { gql } from "graphql-tag";
import express from "express";
import http from "http";
import cors from "cors";

const app = express();
app.use(cors<cors.CorsRequest>());
app.use(express.json());

const httpServer = http.createServer(app);

const typeDefs = gql(
  readFileSync(path.resolve(__dirname, "./schema.gql"), {
    encoding: "utf-8",
  })
);

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use("/", expressMiddleware(server));
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`
    🚀  Server is running!
    📭  Query at http://localhost:4000/
  `);
}

startApolloServer();
