import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })
}

// Send booking confirmation email
export const sendBookingEmail = async (booking) => {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'imservices4444@gmail.com',
      to: process.env.ADMIN_EMAIL || 'imservices4444@gmail.com',
      subject: `New Service Booking - ${booking.serviceType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">New Service Booking Request</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Customer Information</h3>
            <p><strong>Name:</strong> ${booking.name}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Phone:</strong> ${booking.phone}</p>
            ${booking.company ? `<p><strong>Company:</strong> ${booking.company}</p>` : ''}
            <p><strong>Location:</strong> ${booking.location}</p>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Service Details</h3>
            <p><strong>Service Type:</strong> ${booking.serviceType}</p>
            ${booking.machineType ? `<p><strong>Machine Type:</strong> ${booking.machineType}</p>` : ''}
            ${booking.machineBrand ? `<p><strong>Machine Brand:</strong> ${booking.machineBrand}</p>` : ''}
            ${booking.preferredDate ? `<p><strong>Preferred Date:</strong> ${new Date(booking.preferredDate).toLocaleDateString()}</p>` : ''}
            ${booking.preferredTime ? `<p><strong>Preferred Time:</strong> ${booking.preferredTime}</p>` : ''}
          </div>

          ${booking.message ? `
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e293b; margin-top: 0;">Additional Information</h3>
              <p>${booking.message}</p>
            </div>
          ` : ''}

          <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
            This booking was submitted on ${new Date(booking.createdAt).toLocaleString()}
          </p>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)
    console.log('✅ Booking email sent successfully')
  } catch (error) {
    console.error('❌ Email sending error:', error)
    throw error
  }
}

// Send contact form email
export const sendContactEmail = async (contact) => {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'imservices4444@gmail.com',
      to: process.env.ADMIN_EMAIL || 'imservices4444@gmail.com',
      subject: `Contact Form: ${contact.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">New Contact Message</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Phone:</strong> ${contact.phone}</p>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Subject</h3>
            <p>${contact.subject}</p>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${contact.message}</p>
          </div>

          <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
            This message was submitted on ${new Date(contact.createdAt).toLocaleString()}
          </p>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)
    console.log('✅ Contact email sent successfully')
  } catch (error) {
    console.error('❌ Email sending error:', error)
    throw error
  }
}
