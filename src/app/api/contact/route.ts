import { NextResponse } from 'next/server';
import emailjs from '@emailjs/nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, queryType, message } = body;

    // Validate inputs
    if (!name || !email || !subject || !queryType || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    if (!serviceId || !templateId || !publicKey || !privateKey) {
      console.error('EmailJS credentials are not configured in environment variables');
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 },
      );
    }

    // Prepare template parameters matching standard EmailJS setups
    const templateParams = {
      user_name: name,
      user_email: email,
      subject: subject,
      query_type: queryType,
      message: message,
    };

    // Send the email via EmailJS NodeJS SDK
    await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      {
        publicKey: publicKey,
        privateKey: privateKey,
      }
    );

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error sending email via EmailJS:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorText = (error as any).text || (error as any).response?.text || '';
    return NextResponse.json(
      { error: 'Failed to send email', details: `${errorMessage} ${errorText}`.trim() },
      { status: 500 },
    );
  }
}
