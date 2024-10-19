"use client";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { House, X } from "lucide-react";
import { useClientDetailsStore } from "@/store/useClientDetailsStore";
import { useEffect } from "react";

interface Props {
  activeComponent: string;
  handleShowClientDetails: (id: number) => void;
  selectedClientId: number | null;
  showEditProfile: boolean;
  setSelectedClientId: (id: number | null) => void;
  setShowEditProfile : (value: boolean) => void;
}

export default function BreadCumbSeperator({
  activeComponent,
  handleShowClientDetails,
  selectedClientId,
  showEditProfile,
  setSelectedClientId,
  setShowEditProfile
}: Props) {
  useEffect(() => {
    if (selectedClientId !== null) {
      handleShowClientDetails(selectedClientId);
    }
  }, [selectedClientId, handleShowClientDetails]);

  const clientDetailsResult = useClientDetailsStore(
    (state) => state.clientDetailsResult
  );

  const handleClose = ()=> {
    setSelectedClientId(null)
    setShowEditProfile(false)
  }

  // console.log('Show Client details:',  clientDetailsResult);

  return (
    <div className="w-full flex flex-row justify-between items-center">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="flex flex-row justify-center items-center gap-2">
              <House size={20} />
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <BreadcrumbPage>{activeComponent}</BreadcrumbPage>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {clientDetailsResult && selectedClientId ? (
            <BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbLink>
                <BreadcrumbPage>{clientDetailsResult?.name}</BreadcrumbPage>
              </BreadcrumbLink>
            </BreadcrumbItem>
          ) : (
            <></>
          )}

          {showEditProfile && selectedClientId? (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <BreadcrumbPage>Edit</BreadcrumbPage>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          ) : (
            <></>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      {selectedClientId && showEditProfile ? (
        <div
          className="cursor-pointer"
          onClick={handleClose}
        >
          <X />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
