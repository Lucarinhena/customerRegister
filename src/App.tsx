import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState, useRef, FormEvent } from "react";
import { api } from "./services/api";

interface CustomerPros {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

export default function App() {
  const [customers, setCustomers] = useState<CustomerPros[]>([]);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    const response = await api.get("/customer");
    setCustomers(response.data);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!nameRef.current?.value || !emailRef.current?.value) return;
    const response = await api.post("/customers", {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
    });
    console.log(response.data);
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl ">
        <h1 className="text-4xl font-medium text-white flex justify-center">
          Clientes
        </h1>
        <form className="flex flex-col my-6 " onSubmit={handleSubmit}>
          <label className="font-medium text-white mb-2 mt-2 ">Nome:</label>
          <input
            type="text"
            placeholder="Digite seu nome completo"
            className="rounded-lg border-indigo-500/100 bg-black text-white  p-4"
            ref={nameRef}
          />
          <label className="font-medium text-white mb-2 mt-2 ">Email:</label>
          <input
            type="email"
            placeholder="Digite seu email"
            className="rounded-lg border-indigo-500/100 bg-black text-white  p-4"
            ref={emailRef}
          />

          <button
            type="submit"
            className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium flex justify-center text-center  mt-4 "
          >
            Cadastrar
          </button>
        </form>

        <section className="flex flex-col gap-4">
          {customers.map((customer) => (
            <article
              key={customer.id}
              className=" bg-white rounded p-2 w-full relative hover:scale-105 duration-300"
            >
              <p className="font-medium ">
                <span>Nome:</span> {customer.name}
              </p>
              <p className="font-medium">
                <span>Email:</span> {customer.email}
              </p>
              <p className="font-medium">
                <span>Status:</span> {customer.status ? "ATIVO" : "INATIVO"}
              </p>

              <button className="bg-red-700 w-7 h-7 flex items-center justify-center rounded-full absolute right-1 -top-1">
                <MdDeleteForever size={18} color="#fff" />
              </button>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
