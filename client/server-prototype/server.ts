import Fastify from "fastify";
import { fastifyStatic } from "@fastify/static";
import * as path from "node:path";

const fastify = Fastify()


fastify.register(fastifyStatic, {
  root: path.resolve("."),
})

fastify.addHook("preHandler", (req, resp, done) => {
  resp.header("Access-Control-Allow-Origin", "*")
  done()
})

fastify.listen({
  port: 8080
})

