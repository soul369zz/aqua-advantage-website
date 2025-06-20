import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()
    const { name, email, phone, message } = body

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Create the email content
    const emailContent = {
      to: "logan@aquaadvantage.net",
      from: "contact@aquaadvantage.net", // This should be your verified domain
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #1e40af; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0;">Aqua Advantage Website</p>
          </div>
          
          <div style="padding: 30px; background-color: #f9fafb;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Contact Details</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #1e40af;">
              <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 0;"><strong>Phone:</strong> ${phone || "Not provided"}</p>
            </div>
            
            <h3 style="color: #1f2937; margin-bottom: 15px;">Message</h3>
            <div style="background-color: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
              <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background-color: #eff6ff; border-radius: 8px;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                <strong>Note:</strong> This message was sent through the Aqua Advantage website contact form on ${new Date().toLocaleString()}.
              </p>
            </div>
          </div>
          
          <div style="background-color: #374151; color: #d1d5db; padding: 20px; text-align: center;">
            <p style="margin: 0; font-size: 14px;">Aqua Advantage - Pool & Spa Services</p>
            <p style="margin: 5px 0 0 0; font-size: 14px;">Burley, ID | (208) 727-7909</p>
          </div>
        </div>
      `,
    }

    // Handle email sending
    try {
      // Check if Resend API key is configured
      if (process.env.RESEND_API_KEY) {
        // Initialize Resend only when API key is available
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send(emailContent)
        console.log("✅ Email sent successfully to logan@aquaadvantage.net")
      } else {
        // Development/testing mode - log the email content instead
        console.log("🚧 DEVELOPMENT MODE - Email would be sent to logan@aquaadvantage.net")
        console.log("📧 Email content:", {
          to: emailContent.to,
          from: emailContent.from,
          subject: emailContent.subject,
          message: `Name: ${name}, Email: ${email}, Phone: ${phone || "Not provided"}, Message: ${message}`
        })
        
        // Simulate email sending delay for realistic testing
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    } catch (emailError) {
      console.error("❌ Error sending email:", emailError)
      // Continue execution - we don't want to fail the form submission if email fails
      // The form will still succeed from the user's perspective
    }

    return NextResponse.json(
      { message: "Contact form submitted successfully" },
      { status: 200 }
    )

  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 