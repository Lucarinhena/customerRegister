import Fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import { routes } from "./routes/routes";

const app = Fastify({logger: true})
dotenv.config();

const start = async () => {
  await app.register(cors);
  await app.register(routes);

  try {
    await app.listen({port: 3000});
    console.log(`Server running at ${process.env.PORT}`);
  } catch (err) { 
    process.exit(1)
  }
}

start()