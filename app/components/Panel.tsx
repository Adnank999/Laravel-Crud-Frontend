"use client";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  CircleUser,
  ClipboardCheck,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import settings from "@/public/settings.png";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import logo from "../../public/logo.png";
import agreement from "../../public/agreement.png";
import dashboard from "../../public/dashboard.png";
import document from "../../public/document.png";
import form from "../../public/form.png";
import inbox from "../../public/inbox.png";
import invoice from "../../public/invoice.png";
import qutation from "../../public/qutation.png";
import sales from "../../public/sales.png";
import workflow from "../../public/workflow.png";
import dynamic from "next/dynamic";
import { useActiveComponentStore } from "@/store/useActiveComponentStore";
import Clients from "./Clients";
import { Client } from "@/model/Client";
import ClientsTable from "./ClientsTable";
import { AddClientModal } from "./AddClientModal";
import { useClientDetailsStore } from "@/store/useClientDetailsStore";
import ClientDetails from "./ClientDetails";
import { useShowEditProfileStore } from "@/store/useShowEditProfileStore";
import EditProfile from "./EditProfile";
import ML1 from "@/public/ML1.png"
const BreadcrumbSeparator = dynamic(() => import("./BreadCumbSeperator"), {
  ssr: false,
});

interface Props {
  clientsDetails: Client[];
  handleDelete: (id: number) => Promise<null>;
  onSubmit: (data: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country_code: string;
    company: string;
    position: string;
  }) => Promise<null>;
}

export default function Panel({
  clientsDetails,
  handleDelete,
  onSubmit,
}: Props) {
  const { activeComponent, setActiveComponent } = useActiveComponentStore();

  const selectedClientId = useClientDetailsStore(
    (state) => state.selectedClientId
  );

  const setSelectedClientId = useClientDetailsStore(
    (state) => state.setSelectedClientId
  );
  const setClientDetailsResult = useClientDetailsStore(
    (state) => state.setClientDetailsResult
  );

  const handleShowClientDetails = async (id: number) => {
    setSelectedClientId(id);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}api/clientDetails/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setClientDetailsResult(result.data);
        // console.log("Clients Details:", result);
      } else {
        const error = await response.json();
        console.error("Failed to get client:", error);
      }
    } catch (error) {
      console.error("Failed to get client:", error);
    }
  };

  const { showEditProfile } = useShowEditProfileStore();
  // console.log("showEditProfile", showEditProfile);
  const setShowEditProfile = useShowEditProfileStore(
    (state) => state.setShowEditProfile
  );

  const handleEditProfile = (id: number) => {
    setSelectedClientId(id);
    setShowEditProfile(true);
  };
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image src={logo} alt="" width={25} height={25} />
              <span className="">Tasklp</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Image src={dashboard} alt="dashboard" width={20} height={20} />
                Dashboard
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Image src={sales} alt="dashboard" width={20} height={20} />
                Sales Pipeline
              </Link>
              <div
                className="cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                onClick={() => setActiveComponent("Clients")}
              >
                <Users className="h-4 w-4" />
                Clients
              </div>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Image src={inbox} alt="dashboard" width={20} height={20} />
                Inbox
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Image src={document} alt="dashboard" width={20} height={20} />
                Documents
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Image src={qutation} alt="dashboard" width={20} height={20} />
                Quotations
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Image src={invoice} alt="dashboard" width={20} height={20} />
                Invoices
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Image src={agreement} alt="dashboard" width={20} height={20} />
                Agreements
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Image src={form} alt="dashboard" width={20} height={20} />
                Forms
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Image src={workflow} alt="dashboard" width={20} height={20} />
                Workflow
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14  items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
          </Sheet>
          <div className="flex-1">
            <form>
              <div className="flex flex-row justify-center items-center  relative">
                <Search className="absolute left-[22%] top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/2"
                />
                <div
                  style={{ border: "1px solid #E2E8F0" }}
                  className="ml-6 p-2"
                >
                  <Image src={settings} width={20} height={20} alt="settings" />
                </div>
              </div>
            </form>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex flex-row justify-center items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-auto h-8 w-8 rounded-full"
                >
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Toggle notifications</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-auto h-8 w-8 rounded-full"
                >
                  <ClipboardCheck className="h-4 w-4"/>
                 
                  <span className="sr-only">Checklist</span>
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="w-48 h-full flex flex-row justify-start items-center gap-2"
                >
                  <Image src={ML1} width={30} height={30} alt="profile"/>
                  <h1>David Patric</h1>
                  <ChevronDown />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 mt-4">
          <div className="flex flex-row justify-between items-center px-6">
            <BreadcrumbSeparator
              activeComponent={activeComponent}
              handleShowClientDetails={handleShowClientDetails}
              setSelectedClientId={setSelectedClientId}
              selectedClientId={selectedClientId}
              showEditProfile={showEditProfile}
              setShowEditProfile={setShowEditProfile}
            />
            {activeComponent === "Clients" &&
              !showEditProfile &&
              !selectedClientId && <AddClientModal onSubmit={onSubmit} />}
          </div>

          {activeComponent === "Clients" && !selectedClientId && (
            <ClientsTable
              clientsDetails={clientsDetails}
              handleDelete={handleDelete}
              handleShowClientDetails={handleShowClientDetails}
              handleEditProfile={handleEditProfile}
            />
          )}

          {activeComponent === "Clients" &&
            selectedClientId &&
            !showEditProfile && <ClientDetails clientId={selectedClientId} />}
          {activeComponent === "Clients" &&
            selectedClientId &&
            showEditProfile && <EditProfile userId={selectedClientId!} />}
        </main>
      </div>
    </div>
  );
}
