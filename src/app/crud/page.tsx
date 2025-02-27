import { CrudInitialize } from "@/components/crud/crud-ui";
import { WalletButton } from "@/components/WalletButton";
import { montserrat } from "@/lib/fonts";

export default function page() {
  return (
    <div className="h-screen max-w-3xl m-auto py-10 flex flex-col items-center gap-4">
      <h1 className={`text-3xl text-center font-semibold ${montserrat.className}`}>Use CRUD program</h1>

      <WalletButton />
      <CrudInitialize />
    </div>
  )
}
