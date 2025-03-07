"use client";

import { useState } from "react";
import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { FilePlus, Menu, X } from "lucide-react";
import UpgradeButton from "./UpgradeButton";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-none sticky w-full top-0 left-0 z-50 border-b">
      <div className="container mx-auto px-6 lg:px-8 flex justify-between items-center py-4">
        {/* Logo */}
        <Link href="/dashboard" className="text-2xl">
          Nexus <span className="text-indigo-600">AI</span>
        </Link>

        {/* Desktop Menu */}
        <SignedIn>
          <div className="hidden md:flex items-center space-x-4">
            <NavLink href="/dashboard/upgrade">Pricing</NavLink>
            <NavLink href="/dashboard">My Documents</NavLink>
            <Button asChild variant="outline">
              <Link href="/dashboard/upload">
                <FilePlus />
                <span>Upload</span>
              </Link>
            </Button>
            <UpgradeButton />
            <UserButton />
          </div>
        </SignedIn>

        {/* Mobile Menu Button */}
        <SignedIn>
          <button className="md:hidden text-gray-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </SignedIn>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <SignedIn>
          <div className="md:hidden bg-white shadow-md py-4">
            <div className="container mx-auto px-6 flex flex-col space-y-4">
              <NavLink href="/dashboard" onClick={() => setIsOpen(false)}>Pricing</NavLink>
              <NavLink href="/dashboard" onClick={() => setIsOpen(false)}>My Documents</NavLink>
              <Button asChild variant="outline">
                <Link href="/dashboard/upload" onClick={() => setIsOpen(false)}>
                  <FilePlus />
                  <span>Upload</span>
                </Link>
              </Button>
              <UpgradeButton />
              <UserButton />
            </div>
          </div>
        </SignedIn>
      )}
    </header>
  );
}

// Reusable NavLink component
function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="text-gray-600 hover:text-indigo-600 font-medium">
      {children}
    </Link>
  );
}
