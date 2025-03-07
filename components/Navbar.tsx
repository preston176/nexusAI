"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-none sticky w-full top-0 left-0 z-50">
            <div className="container mx-auto px-6 lg:px-8 flex justify-between items-center py-4">
                {/* Logo */}
                <Link href={"/"} className="text-2xl">
                    Nexus <span className="text-indigo-600">AI</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/about">About</NavLink>
                    <NavLink href="/features">Features</NavLink>
                    <NavLink href="/pricing">Pricing</NavLink>
                    <NavLink href="/contact">Contact</NavLink>
                </div>

                {/* CTA Button (Desktop) */}
                <div className="hidden md:block">
                    <Button asChild>
                        <Link href="/dashboard">Get Started</Link>
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-600"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-md py-4">
                    <div className="container mx-auto px-6 flex flex-col space-y-4">
                        <NavLink href="/" onClick={() => setIsOpen(false)}>Home</NavLink>
                        <NavLink href="/about" onClick={() => setIsOpen(false)}>About</NavLink>
                        <NavLink href="/features" onClick={() => setIsOpen(false)}>Features</NavLink>
                        <NavLink href="/pricing" onClick={() => setIsOpen(false)}>Pricing</NavLink>
                        <NavLink href="/contact" onClick={() => setIsOpen(false)}>Contact</NavLink>

                        {/* CTA Button (Mobile) */}
                        <Button asChild className="w-full">
                            <Link href="/dashboard" onClick={() => setIsOpen(false)}>Get Started</Link>
                        </Button>
                    </div>
                </div>
            )}
        </nav>
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
