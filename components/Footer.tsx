import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <footer className="mt-16 border-t border-gray-200 py-6 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} NexusAI. Built by <Link className='font-semibold hover:underline' href="https://github.com/preston176">Preston M</Link> and  <Link className='font-semibold hover:underline' href="https://github.com/shaddy1234">Shadrack Kimaau</Link></p>
            <nav className="mt-4 flex justify-center space-x-6">
                <Link href="/privacy-policy" className="hover:text-indigo-600">
                    Privacy Policy
                </Link>
                <Link href="/terms-of-service" className="hover:text-indigo-600">
                    Terms of Service
                </Link>
                <Link href="/contact" className="hover:text-indigo-600">
                    Contact Us
                </Link>
            </nav>
        </footer>
    )
}

export default Footer