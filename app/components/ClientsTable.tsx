
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

} from "@/components/ui/dropdown-menu";
import { Client } from "@/model/Client";
import { useClientSelectionStore } from "@/store/useClientSelectionStore";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import React from "react";
import details from "../../public/details.png";
import edit from "../../public/edit.png";
import deletePng from "../../public/trash.png";
import { useToast } from "@/hooks/use-toast";


interface Props {
  clientsDetails: Client[];
  handleDelete: (id: number) => Promise<null>;
  handleShowClientDetails: (id: number) => void;
  handleEditProfile: (id: number) => void;
}

export default function ClientsDetails({
  clientsDetails,
  handleDelete,
  handleShowClientDetails,
  handleEditProfile,
}: Props) {
  const {
    selectedClients,
    selectClient,
    deselectClient,
    selectAllClients,
    deselectAllClients,
  } = useClientSelectionStore();

  const handleSelectClient = (id: number) => {
    if (selectedClients.includes(id)) {
      deselectClient(id);
    } else {
      selectClient(id);
      // console.log("Selectedclient", id);
    }
  };

  const handleSelectAll = () => {
    if (selectedClients.length === clientsDetails.length) {
      deselectAllClients();
    } else {
      const allClientIds = clientsDetails.map((client) => client.id);
      selectAllClients(allClientIds);
    }
  };

  const { toast } = useToast();

  const deleteClient = async (id: number) => {
    await handleDelete(id);

    toast({
      title: "Success!",
      description: "Client deleted successfully.",
      duration: 1000,
    });
  };

  const formatGMT = (timezone: string | null) => {
    if (!timezone) {
      return ''; 
    }
  
    try {
    
      const options = { timeZone: timezone, timeZoneName: 'short' } as const;
      const parts = new Intl.DateTimeFormat('en-US', options)
        .formatToParts(new Date());
  
      
      const timeZonePart = parts.find(part => part.type === 'timeZoneName');
      return timeZonePart?.value || 'Invalid timezone';
    } catch (error) {
  
      return 'Invalid timezone';
    }
  };
  
  

  return (
    <div className="p-6">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b ">
            <th className="text-center p-3">
              <input
                type="checkbox"
                checked={selectedClients.length === clientsDetails.length}
                onChange={handleSelectAll}
              />
            </th>
            <th className=" p-3 text-center">Client</th>
            <th className=" p-3 text-center">Email</th>
            <th className=" p-3 text-center">Phone</th>
            <th className=" p-3 text-center">Company</th>
            <th className=" p-3 text-center">Position</th>
            <th className=" p-3 text-center">Timezone</th>
            <th className=" p-3 text-center">Last Update</th>
            <th className="p-3 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {clientsDetails.map((client) => (
            <tr key={client.id} className="border-b ">
              <td className="p-3 text-center">
                <input
                  type="checkbox"
                  checked={selectedClients.includes(client.id)}
                  onChange={() => handleSelectClient(client.id)}
                />
              </td>
              <td className="p-3 text-center">{client.name}</td>
              <td className="p-3 text-center">{client.email}</td>
              <td className="p-3 text-center">{client.phone}</td>
              <td className="p-3 text-center">{client.company}</td>
              <td className="p-3 text-center">{client.position}</td>
              <td className="p-3 text-center">{formatGMT(client.timezone)}</td>
              <td className="p-3 text-center">
                {new Date(client.last_update).toLocaleDateString("en-US", {
                  weekday: "long", 
                  year: "numeric", 
                  month: "short", 
                  day: "numeric", 
                })}
              </td>
              <td className="p-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="font-extrabold cursor-pointer">...</div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleShowClientDetails(client.id)}
                    >
                      <Image
                        src={details}
                        alt="details"
                        width={20}
                        height={20}
                      />
                      Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleEditProfile(client.id)}
                    >
                      <Image src={edit} alt="edit" width={20} height={20} />
                      Edit Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => deleteClient(client.id)}>
                      <Image
                        src={deletePng}
                        alt="delete"
                        width={20}
                        height={20}
                      />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
         
        </tbody>
      </table>
    </div>
  );
}
