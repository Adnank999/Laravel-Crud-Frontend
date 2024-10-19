"use server";

import { FormSchema } from "./components/AddClientModal";
import Panel from "./components/Panel";
import { revalidateTag } from "next/cache";

export default async function Home() {
  const allClientsDetails = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}api/clients`,
    { cache: "no-store", next: { tags: ["clients"] } }
  );

  const allClientsData = await allClientsDetails?.json();

  async function deleteClient(id: number) {
    "use server";

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}api/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        revalidateTag("clients");
      } else {
        const error = await response.json();
        console.error("Failed to delete client:", error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    return null;
  }

  async function onSubmit(data: FormSchema) {
    "use server";
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}api/addClients`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return errorData.message || "Failed to add client";
      }

      const result = await response.json();
      console.log("Client added successfully:", result);
      revalidateTag("clients");
      return null;
    } catch (error) {
      console.error("An error occurred:", error);
      return error?.message || "An unknown error occurred";
    }
  }

  return (
    <Panel
      clientsDetails={allClientsData.data}
      handleDelete={deleteClient}
      onSubmit={onSubmit}
    />
  );
}
