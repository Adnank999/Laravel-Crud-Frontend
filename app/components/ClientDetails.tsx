import { useClientDetailsStore } from "@/store/useClientDetailsStore";
import { FilePenLine, X } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  clientId: number | null;
}
const ClientDetails = ({ clientId }: Props) => {
  const setSelectedClientId = useClientDetailsStore(
    (state) => state.setSelectedClientId
  );

  const clientDetails = useClientDetailsStore(
    (state) => state.clientDetailsResult
  );

  const handleClose = () => {
    setSelectedClientId(null);
  };
  // console.log("clientDetails", clientDetails);
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">About Client</h1>
        <div className="flex gap-4">
          <button className="text-black hover:underline">
            <FilePenLine />
          </button>

          <button
            className="text-red-600 hover:underline"
            onClick={handleClose}
          >
            <X />
          </button>
        </div>
      </div>

      {/* <div className="flex flex-col justify-start items-start gap-4">
        <div className="flex flex-row justify-start items-center space-x-12">
          <div>
            <p className="font-semibold">Client</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4">
            {clientDetails?.profile_pic ? (
              <Image
                src={clientDetails.profile_pic}
                alt={clientDetails.name}
                width={20}
                height={20}
                className="rounded-full"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center ">
                <span className="text-white text-sm">N/A</span>
              </div>
            )}
            <p>{clientDetails?.name}</p>
          </div>
        </div>

        <div className="flex flex-row justify-start items-center space-x-12">
          <p className="font-semibold">Email</p>
          <p>{clientDetails?.email || "N/A"}</p>
        </div>

        <div className="flex flex-row justify-start items-center space-x-12">
          <p className="font-semibold">Phone</p>
          <p>{clientDetails?.phone || "N/A"}</p>
        </div>

        <div className="flex flex-row justify-start items-center space-x-12">
          <p className="font-semibold">Company</p>

          <div className="flex flex-row justify-start items-center space-x-4">
            <p>{clientDetails?.company || "N/A"}</p>
          </div>
        </div>

        <div className="flex flex-row justify-start items-center space-x-12">
          <p className="font-semibold">Position</p>
          <p>{clientDetails?.position || "N/A"}</p>
        </div>

        <div className="w-[800px] border-b border-grey-400">
          {" "}
          <hr />
        </div>

        <div className="flex flex-row justify-start items-center space-x-12">
          <p className="font-semibold">Timezone</p>
          <p>{clientDetails?.timezone || "N/A"}</p>
        </div>

        <div className="flex flex-row justify-start items-center space-x-12">
          <p className="font-semibold">Country</p>
          <p>{clientDetails?.country || "N/A"}</p>
        </div>

        <div className="flex flex-row justify-start items-center space-x-12">
          <p className="font-semibold">State/City</p>
          <p>{clientDetails?.state || clientDetails?.city || "N/A"}</p>
        </div>

        <div className="flex flex-row justify-start items-center space-x-12">
          <p className="font-semibold">Address</p>
          <p>{clientDetails?.address || "N/A"}</p>
        </div>

        <div className="flex flex-row justify-start items-center space-x-12">
          <p className="font-semibold">Languages</p>
          {clientDetails?.language
            ? <p>{JSON.parse(clientDetails.language).join(", ") }</p>
            : "N/A"}
        </div>
      </div> */}

      <div className="flex flex-col justify-start items-start gap-4 w-[600px]">
        <div className="flex flex-row justify-start items-center gap-x-20 w-full ">
          <p className="font-semibold">Client</p>
          <div className="flex flex-row justify-center items-center gap-4">
            {clientDetails?.profile_pic ? (
              <Image
                src={clientDetails.profile_pic}
                alt={clientDetails.name}
                width={20}
                height={20}
                className="rounded-full"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">N/A</span>
              </div>
            )}
            <p>{clientDetails?.name || "N/A"}</p>
          </div>
        </div>

        <div className="flex flex-row justify-start items-center gap-x-20 w-full">
          <p className="font-semibold">Email</p>
          <p>{clientDetails?.email || "N/A"}</p>
        </div>

        <div className="flex flex-row justify-start items-center gap-x-[90px] w-full">
          <p className="font-semibold">Phone</p>
          <p>{clientDetails?.phone || "N/A"}</p>
        </div>

        <div className="flex flex-row justify-start items-center gap-x-12 w-full">
          <p className="font-semibold">Company</p>
          <p>{clientDetails?.company || "N/A"}</p>
        </div>

        <div className="flex flex-row justify-start items-center gap-x-[72px] w-full">
          <p className="font-semibold">Position</p>
          <p>{clientDetails?.position || "N/A"}</p>
        </div>

        <div className="w-full border-b border-gray-400">
          <hr />
        </div>

        <div className="flex flex-row justify-start items-center gap-x-12 w-full">
          <p className="font-semibold">Timezone</p>
          <p>{clientDetails?.timezone || "N/A"}</p>
        </div>

        <div className="flex flex-row justify-start items-center gap-x-[74px] w-full">
          <p className="font-semibold">Country</p>
          <p>{clientDetails?.country || "N/A"}</p>
        </div>

        <div className="flex flex-row justify-start items-center gap-x-12 w-full">
          <p className="font-semibold">State/City</p>
          <p>
            {clientDetails?.state && clientDetails.city
              ? `${clientDetails.state}, ${clientDetails.city}`
              : "N/A"}
          </p>
        </div>

        <div className="flex flex-row justify-start items-center gap-x-[76px] w-full">
          <p className="font-semibold">Address</p>
          <p>{clientDetails?.address || "N/A"}</p>
        </div>

        <div className="flex flex-row justify-start items-center gap-x-10 w-full">
          <p className="font-semibold">Languages</p>
          <p>
            {clientDetails?.language
              ? JSON.parse(clientDetails.language).join(", ")
              : "N/A"}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <ul className="flex border-b">
          <li className="mr-4 pb-2">
            <a href="#">Invoices</a>
          </li>
          <li className="mr-4 pb-2">
            <a href="#">Quotations</a>
          </li>
          <li className="mr-4 pb-2">
            <a href="#">Billing</a>
          </li>

          <li className="mr-4 pb-2 border-blue-500 border-b-2">
            <a href="#">Details & Reference</a>
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Description</h2>
        <p>
          {clientDetails?.details ||
            "This is one of our finest clients. We have been working with them for more than 4+ years."}
        </p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Reference</h2>
        <p>{clientDetails?.reference || "N/A"}</p>
      </div>
    </div>
  );
};

export default ClientDetails;
