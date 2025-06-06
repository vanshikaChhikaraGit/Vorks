import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../../../components/ui/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen min-w-full">
        <AppSidebar />
        <div className="flex-1 overflow-auto p-4 bg-gray-100 "> {/* Moved padding and bg here */}
          <main className="min-w-full"> {/* Full width container */}
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}