import fastify, {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyRequest,
    FastifyReply,
  } from "fastify";
  import { CreateCustomerController } from "../controllers/CreateCustomerController";
  import { ListCustomerController } from "../controllers/ListCustomerController";
  import { DeleteCustomerController } from "../controllers/DeleteCustomerController";
  
  export async function routes(
    fastify: FastifyInstance,
    options: FastifyPluginOptions
  ) {
    fastify.get("/customer", async (req: FastifyRequest, reply: FastifyReply) => {
      return new ListCustomerController().handle(req, reply);
    });
  
    fastify.post("/customers", (req: FastifyRequest, reply: FastifyReply) => {
      return new CreateCustomerController().handle(req, reply);
    });
  
    fastify.delete(
      "/customer",
      async (req: FastifyRequest, reply: FastifyReply) => {
        return new DeleteCustomerController().handle(req, reply);
      }
    );
  }
  