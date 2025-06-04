import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, FileText, AlertTriangle, CheckCircle, Gavel } from "lucide-react"

export const metadata = {
  title: "Terms of Service | Aqua Advantage",
  description: "Terms and conditions for Aqua Advantage pool and spa services. Important information about service agreements and policies.",
}

export default function TermsOfService() {
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
              <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
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
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Agreement Overview</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              These Terms of Service ("Terms") govern your use of Aqua Advantage services and website. 
              By engaging our services or using our website, you agree to be bound by these Terms. 
              Please read them carefully before using our services.
            </p>
          </div>

          {/* Acceptance of Terms */}
          <section className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Acceptance of Terms</h3>
            </div>
            
            <div className="space-y-3 text-gray-700">
              <p>By accessing our website or engaging our services, you acknowledge that you:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Are at least 18 years old or have parental/guardian consent</li>
                <li>Have the legal authority to enter into this agreement</li>
                <li>Agree to comply with all applicable laws and regulations</li>
                <li>Accept full responsibility for any use of our services under your account</li>
              </ul>
            </div>
          </section>

          {/* Services Description */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Services</h3>
            
            <div className="space-y-4 text-gray-700">
              <p>Aqua Advantage provides the following services:</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Pool Services</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Pool cleaning and maintenance</li>
                    <li>• Chemical balancing and testing</li>
                    <li>• Equipment repair and replacement</li>
                    <li>• Seasonal opening and closing</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Spa Services</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Hot tub maintenance and repair</li>
                    <li>• Water testing and chemical balancing</li>
                    <li>• Equipment installation and service</li>
                    <li>• Spa product sales</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Service Agreements */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Agreements and Scheduling</h3>
            
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Scheduling and Access</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Services are scheduled by mutual agreement between customer and Aqua Advantage</li>
                  <li>Customer must provide safe and reasonable access to pool/spa area</li>
                  <li>24-hour notice required for service cancellations to avoid charges</li>
                  <li>Weather or safety conditions may require service rescheduling</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Service Scope</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Services performed according to agreed-upon service agreement</li>
                  <li>Additional services require separate authorization and billing</li>
                  <li>Emergency repairs may be performed with customer consent</li>
                  <li>Chemical and equipment recommendations are advisory only</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Payment Terms */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Terms and Billing</h3>
            
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Payment Methods</h4>
                <p>We accept cash, check, and major credit cards. Payment is due upon completion of service unless other arrangements are made.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Billing and Collections</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Monthly service customers are billed in advance</li>
                  <li>Late payments may incur service charges and interest</li>
                  <li>Accounts over 30 days past due may result in service suspension</li>
                  <li>Collection costs and attorney fees may be added to overdue accounts</li>
                </ul>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-yellow-800 mb-1">Important Billing Information</h5>
                    <p className="text-yellow-700 text-sm">
                      Customers are responsible for payment regardless of property ownership changes. 
                      Pool/spa condition may affect service scope and pricing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Liability and Insurance */}
          <section className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Gavel className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Liability and Insurance</h3>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Our Insurance Coverage</h4>
                <p>Aqua Advantage maintains comprehensive general liability and workers' compensation insurance for all service operations.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Limitation of Liability</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Our liability is limited to the value of services provided</li>
                  <li>We are not responsible for pre-existing equipment or structural issues</li>
                  <li>Customer assumes risk for equipment over 10 years old</li>
                  <li>Weather-related service delays are beyond our control</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Customer Responsibilities</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Maintain safe access to pool/spa area</li>
                  <li>Notify us of any safety hazards or equipment issues</li>
                  <li>Secure pets during service visits</li>
                  <li>Report service concerns within 48 hours</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Warranties */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Warranties and Guarantees</h3>
            
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Service Warranty</h4>
                <p>We guarantee our workmanship for 30 days from service completion. Warranty covers labor only; parts carry manufacturer warranties.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Product Warranties</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Spa products carry manufacturer warranties as specified</li>
                  <li>Chemical products are sold "as is" without warranty</li>
                  <li>Installation services have 1-year workmanship warranty</li>
                  <li>Warranty service requires proof of purchase and professional installation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Termination */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Termination</h3>
            
            <div className="space-y-3 text-gray-700">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Customer Termination</h4>
                <p>Customers may terminate services with 14 days written notice. Prepaid services will be refunded on a pro-rated basis.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Company Termination</h4>
                <p>We reserve the right to terminate services for non-payment, safety concerns, or violation of these terms with appropriate notice.</p>
              </div>
            </div>
          </section>

          {/* Website Terms */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Website Use Terms</h3>
            
            <div className="space-y-3 text-gray-700">
              <p>Use of our website is subject to these additional terms:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Content is for informational purposes only</li>
                <li>Pricing and availability subject to change without notice</li>
                <li>Product specifications may vary from displayed information</li>
                <li>User-generated content may be monitored and removed</li>
                <li>Commercial use of website content is prohibited</li>
              </ul>
            </div>
          </section>

          {/* Privacy */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Privacy and Data Protection</h3>
            <p className="text-gray-700">
              Your privacy is important to us. Please review our{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              {" "}for detailed information about how we collect, use, and protect your personal information.
            </p>
          </section>

          {/* Dispute Resolution */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Dispute Resolution</h3>
            
            <div className="space-y-3 text-gray-700">
              <p>In the event of disputes, we encourage resolution through:</p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Direct communication with our customer service team</li>
                <li>Mediation through a mutually agreed third party</li>
                <li>Arbitration under Idaho state rules if mediation fails</li>
                <li>Small claims court for disputes under jurisdictional limits</li>
              </ol>
              
              <p className="mt-4">
                These Terms are governed by Idaho state law. Any legal proceedings must be brought in 
                Cassia County, Idaho courts.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Changes to Terms</h3>
            <p className="text-gray-700">
              We may update these Terms periodically to reflect changes in our services or legal requirements. 
              Updated Terms will be posted on our website with a new effective date. Continued use of our 
              services constitutes acceptance of updated Terms.
            </p>
          </section>

          {/* Contact Information */}
          <section className="border-t pt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-2 text-gray-700">
              <p>For questions about these Terms of Service, please contact us:</p>
              <div className="mt-4 space-y-1">
                <p><strong>Aqua Advantage</strong></p>
                <p>334 E Main St, Burley, ID 83318</p>
                <p>Phone: <a href="tel:+12087277909" className="text-blue-600 hover:underline">(208) 727-7909</a></p>
                <p>Email: <a href="mailto:info@aquaadvantage.com" className="text-blue-600 hover:underline">info@aquaadvantage.com</a></p>
                <p>Business Hours: Monday-Friday 8:00 AM - 6:00 PM, Saturday 9:00 AM - 4:00 PM</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 