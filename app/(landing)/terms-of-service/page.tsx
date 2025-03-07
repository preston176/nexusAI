import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function TermsOfService() {
  return (
    <main className="flex-1 overflow-scroll p-2 lg:p-5 bg-gradient-to-bl from-white to bg-blue-600">
        <Navbar />
      <div className="bg-white pt-24 pb-4 sm:pt-32 rounded-md drop-shadow-xl">
        <div className="mx-auto max-w-2xl text-center px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            By using our services, you agree to the following terms and conditions. 
            Please read them carefully.
          </p>
        </div>

        {/* Terms Content Section */}
        <div className="mx-auto max-w-4xl px-6 lg:px-8 mt-10 text-gray-600 leading-7">
          <h2 className="text-xl font-semibold text-gray-900">1. Introduction</h2>
          <p className="mt-2">
            Welcome to <span className="font-bold text-indigo-600">NexusAI</span>. These Terms of Service govern your use of 
            our website and services. By accessing or using our platform, you agree to comply with these terms.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">2. User Responsibilities</h2>
          <p className="mt-2">
            As a user, you must ensure that your use of our services is lawful and does not infringe 
            on the rights of others. You agree not to engage in any unauthorized activities, including but not 
            limited to hacking, spamming, or distributing malicious content.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">3. Privacy Policy</h2>
          <p className="mt-2">
            Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your 
            personal data. By using our services, you agree to the terms outlined in our Privacy Policy.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">4. Service Availability</h2>
          <p className="mt-2">
            We strive to keep our services available at all times. However, we do not guarantee 
            uninterrupted access and may modify or discontinue services at any time without prior notice.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">5. Termination of Service</h2>
          <p className="mt-2">
            We reserve the right to suspend or terminate your account if you violate these Terms of Service 
            or engage in activities that harm our platform or users.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">6. Contact Us</h2>
          <p className="mt-2">
            If you have any questions about these terms, please{" "}
            <a href="/contact" className="text-indigo-600 font-semibold hover:underline">
              contact us
            </a>.
          </p>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
