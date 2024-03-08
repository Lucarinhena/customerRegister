import { FastifyRequest, FastifyReply } from "fastify";
import {ListCustomerService} from '../services/ListCustomerService'

class ListCustomerController {
    async handle(request: FastifyRequest, reply: FastifyReply)  {
        const customerService = new ListCustomerService();
        const customers = await customerService.execute();
        reply.send(customers)

    }
}

export {ListCustomerController}