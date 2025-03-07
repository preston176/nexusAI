import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="flex-1 overflow-scroll p-2 lg:p-5 bg-gradient-to-bl from-white to bg-blue-600">
      <Navbar />
      <div className="bg-white pt-24 pb-4 sm:pt-32 rounded-md drop-shadow-xl">
        <div className="mx-auto max-w-2xl text-center px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal data.
          </p>
        </div>

        {/* Privacy Policy Content Section */}
        <div className="mx-auto max-w-4xl px-6 lg:px-8 mt-10 text-gray-600 leading-7">
          <h2 className="text-xl font-semibold text-gray-900">1. Introduction</h2>
          <p className="mt-2">
            Welcome to <span className="font-bold text-indigo-600">NexusAI</span>. This Privacy Policy describes how we handle and protect your personal data when you use our services.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">2. Information We Collect</h2>
          <p className="mt-2">
            We collect information that you provide directly, such as when you register for an account, contact support, or subscribe to our services. We also collect usage data automatically through cookies and analytics tools.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">3. How We Use Your Information</h2>
          <p className="mt-2">
            We use your information to provide and improve our services, communicate with you, and ensure security. We do not sell your personal data to third parties.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">4. Data Protection</h2>
          <p className="mt-2">
            We implement security measures to protect your data from unauthorized access, alteration, or disclosure. However, no online platform can guarantee 100% security.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">5. Your Rights</h2>
          <p className="mt-2">
            You have the right to access, update, or delete your personal data. If you wish to exercise these rights, please contact us.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">6. Changes to This Policy</h2>
          <p className="mt-2">
            We may update this Privacy Policy from time to time. Changes will be posted on this page, and we encourage you to review it periodically.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">7. Contact Us</h2>
          <p className="mt-2">
            If you have any questions about this Privacy Policy, please {" "}
            <Link href="/contact" className="text-indigo-600 font-semibold hover:underline">
              Contact us
            </Link>.
          </p>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
