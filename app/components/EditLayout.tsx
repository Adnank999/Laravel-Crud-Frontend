import Link from "next/link"
import { CircleUser, Menu, Package2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import AboutClient from "./AboutClient"
import { useActiveComponentStore } from "@/store/useActiveComponentStore"
import { useEditLayoutStore } from "@/store/useEditLayoutStore"
import DemoGraphicForm from "./DemoGraphicForm"
import BillingForm from "./BillingForm"
import DetailsRefForm from "./DetailsRefForm"
import FileUploadForm from "./FileUploadForm"
import ClientSettingsUpdate from "./ClientSettingsUpdate"

interface Props{
  userId: number;
}

export default function EditLayout({userId}:Props) {
  const { activeSection, setActiveSection } = useEditLayoutStore();
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-3 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link href="#" onClick={() => setActiveSection('aboutClient')} className={`font-semibold ${activeSection === 'aboutClient' ? 'text-primary' : ''}`}>
              About Client
            </Link>
            <Link href="#" onClick={() => setActiveSection('demographic')} className={`font-semibold ${activeSection === 'demographic' ? 'text-primary' : ''}`}>
              Demographic
            </Link>
            <Link href="#" onClick={() => setActiveSection('billing')} className={`font-semibold ${activeSection === 'billing' ? 'text-primary' : ''}`}>
              Billing
            </Link>
            <Link href="#" onClick={() => setActiveSection('details-reference')} className={` font-semibold ${activeSection === 'details-reference' ? 'text-primary' : ''}`}>
              Details and Reference
            </Link>
            <Link href="#" onClick={() => setActiveSection('shared-files')} className={`font-semibold ${activeSection === 'shared-files' ? 'text-primary' : ''}`}>
              Shared Files
            </Link>
            <Link href="#" onClick={() => setActiveSection('settings')} className={`font-semibold ${activeSection === 'settings' ? 'text-primary' : ''}`}>
              Settings
            </Link>
          </nav>

          <div>
            {activeSection === 'aboutClient' && <AboutClient userId={userId}/>}
            {activeSection === 'demographic' && <DemoGraphicForm userId={userId}/>}
            {activeSection === 'billing' && <BillingForm userId={userId}/>}
            {activeSection === 'details-reference' && <DetailsRefForm userId={userId}/>}
            {activeSection === 'shared-files' && <FileUploadForm userId={userId}/>}
            {activeSection === 'settings' && <ClientSettingsUpdate userId={userId}/>}
          </div>
        </div>
      </main>
    </div>
  )
}
