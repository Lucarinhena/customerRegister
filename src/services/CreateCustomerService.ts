import prismaClient from "../prisma";

interface CreateCustomerProps {
  name: string;
  email: string;
}

class CreateCustomerService {
  async execute({ name, email }: CreateCustomerProps) {
    if (!name || !email) {
      throw new Error("Name and email are required");
    }
    const existingEmailCustomer = await prismaClient.customer.findFirst({
      where: {
        email,
      },
    })

    if(existingEmailCustomer) {
      throw new Error("Email already exists");
    }

    const customer = await prismaClient.customer.create({
      data: {
        name,
        email,
        status: true,
      },
    });
    
    return customer;
  }
}

export { CreateCustomerService };
