import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Shield, Lock, Eye, UserCheck } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | Aqua Advantage",
  description: "Learn how Aqua Advantage protects your personal information and privacy. Our commitment to data security and transparency.",
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Image
                src="/images/logo/logo-64.png"
                alt="Aqua Advantage Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-gray-600">Last updated: January 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Introduction */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Our Commitment to Privacy</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              At Aqua Advantage, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
              or use our pool and spa services.
            </p>
          </div>

          {/* Information We Collect */}
          <section className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Information We Collect</h3>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Personal Information</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Name, address, phone number, and email address</li>
                  <li>Service preferences and pool/spa specifications</li>
                  <li>Payment information for billing purposes</li>
                  <li>Communication history and service requests</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Automatically Collected Information</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>IP address, browser type, and device information</li>
                  <li>Website usage patterns and page views</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Location data when services are provided</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <UserCheck className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">How We Use Your Information</h3>
            </div>
            
            <ul className="space-y-2 text-gray-700 list-disc list-inside ml-4">
              <li>Provide pool and spa maintenance, cleaning, and repair services</li>
              <li>Schedule appointments and send service reminders</li>
              <li>Process payments and manage billing</li>
              <li>Communicate about services, promotions, and updates</li>
              <li>Improve our website and service offerings</li>
              <li>Comply with legal obligations and resolve disputes</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Information Sharing and Disclosure</h3>
            
            <div className="space-y-4 text-gray-700">
              <p>We do not sell, trade, or rent your personal information. We may share information only in these limited circumstances:</p>
              
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Service Providers:</strong> Trusted third parties who assist in our operations (payment processing, scheduling software)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of business assets</li>
                <li><strong>With Your Consent:</strong> Any other purpose with your explicit permission</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Lock className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Data Security</h3>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p>We implement appropriate security measures to protect your personal information:</p>
              
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>SSL encryption for all data transmissions</li>
                <li>Secure servers and regular security audits</li>
                <li>Access controls limiting employee access to necessary information</li>
                <li>Regular training on data protection best practices</li>
              </ul>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> While we strive to protect your information, no method of transmission over the internet 
                  is 100% secure. We cannot guarantee absolute security.
                </p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Privacy Rights</h3>
            
            <div className="space-y-3 text-gray-700">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Access and review your personal information</li>
                <li>Request corrections to inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your data in a portable format</li>
              </ul>
              
              <p className="mt-4">
                To exercise these rights, please contact us at{" "}
                <a href="mailto:privacy@aquaadvantage.com" className="text-blue-600 hover:underline">
                  privacy@aquaadvantage.com
                </a>
                {" "}or call{" "}
                <a href="tel:+12087277909" className="text-blue-600 hover:underline">
                  (208) 727-7909
                </a>
                .
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h3>
            
            <div className="space-y-3 text-gray-700">
              <p>Our website uses cookies to enhance your experience:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand website usage</li>
                <li><strong>Marketing Cookies:</strong> Used to show relevant advertisements</li>
              </ul>
              
              <p>You can control cookies through your browser settings, though this may affect website functionality.</p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Children's Privacy</h3>
            <p className="text-gray-700">
              Our services are not directed to children under 13. We do not knowingly collect personal information from 
              children under 13. If you believe we have collected information from a child under 13, please contact us 
              immediately to have it removed.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Changes to This Privacy Policy</h3>
            <p className="text-gray-700">
              We may update this Privacy Policy periodically. We will notify you of any material changes by posting the 
              updated policy on our website with a new "Last updated" date. Your continued use of our services after 
              changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact Information */}
          <section className="border-t pt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-700">
              <p>If you have questions about this Privacy Policy, please contact us:</p>
              <div className="mt-4 space-y-1">
                <p><strong>Aqua Advantage</strong></p>
                <p>334 E Main St, Burley, ID 83318</p>
                <p>Phone: <a href="tel:+12087277909" className="text-blue-600 hover:underline">(208) 727-7909</a></p>
                <p>Email: <a href="mailto:privacy@aquaadvantage.com" className="text-blue-600 hover:underline">privacy@aquaadvantage.com</a></p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 