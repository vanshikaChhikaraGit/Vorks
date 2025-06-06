// app/protected/layout.tsx

import DefaultNavbar from "@/components/mainHeader/page";
import { CartProvider } from "@/context/cart";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
        <div className=" flex flex-col">
          <DefaultNavbar />
          <main className="flex-1">{children}</main>
        </div>
    </CartProvider>
  );
}
