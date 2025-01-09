import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { FilePlus } from "lucide-react";
import UpgradeButton from "./UpgradeButton";

function Header() {
  return (
    <div className="flex justify-between bg-white shadow-sm p-5 border-b">
      {/* Branding */}
      <Link href={"/dashboard"} className="text-2xl">
        Nexus <span className="text-indigo-600">AI</span>
      </Link>

      {/* Signed-in user actions */}
      <SignedIn>
        <div className="flex items-center space-x-2">
          <Button asChild variant={"link"} className="hidden md:flex">
            <Link href={"/dashboard"}>Pricing</Link>
          </Button>
          <Button asChild variant={"outline"} className="hidden md:flex">
            <Link href={"/dashboard"}>My Documents</Link>
          </Button>
          <Button asChild variant={"outline"} className="hidden md:flex">
            <Link href={"/dashboard/upload"}>
              <FilePlus />
              <span>Upload</span>
            </Link>
          </Button>
          <UpgradeButton />
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
}

export default Header;
