import type { APIRoute } from 'astro'
import nodemailer from 'nodemailer'

const { FROM_EMAIL, TO_EMAIL, EMAIL_PASSWORD } = import.meta.env

export const POST: APIRoute = async ({ request }) => {
  const { email, name, message } = await request.json()

  if (!(email && name && message)) {
    return new Response(JSON.stringify({ success: false, message: 'Missing fields' }), {
      status: 400
    })
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 587,
    secure: false,
    auth: {
      user: TO_EMAIL,
      pass: EMAIL_PASSWORD
    }
  })

  const mailOptions = {
    from: FROM_EMAIL,
    to: TO_EMAIL,
    subject: 'Email from Portfolio',
    text: `
      Name: ${name}
      Email: ${email}

      Message:
      ${message}
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    return new Response(JSON.stringify({ success: true, message: 'Email sent successfully' }), {
      status: 200
    })
  } catch {
    return new Response(JSON.stringify({ success: false, message: 'Failed to send email' }), {
      status: 500
    })
  }
}
