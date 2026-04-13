// It receives an email, validates it, and adds it to your Mailchimp audience list.
import { logger } from '@/lib/logger';
import { NextRequest, NextResponse } from 'next/server';

// Simple server-side email regex (same pattern as client)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        // ---- Validate ----
        if (!email || !EMAIL_REGEX.test(email)) {
            return NextResponse.json(
                { error: 'Please enter a valid email address.' },
                { status: 400 }
            );
        }

        // ---- Pull env vars (set in .env.local) ----
        const API_KEY = process.env.MAILCHIMP_API_KEY;
        const LIST_ID = process.env.MAILCHIMP_AUDIENCE_ID;
        const DATACENTER = process.env.MAILCHIMP_DATACENTER;

        if (!API_KEY || !LIST_ID || !DATACENTER) {
            logger.error('Mailchimp env vars missing');
            return NextResponse.json(
                { error: 'Server configuration error.' },
                { status: 500 }
            );
        }

        // ---- Call Mailchimp API ----
        const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
            },
            body: JSON.stringify({
                email_address: email,
                status: 'subscribed',
            }),
        });

        const data = await response.json();

        // ---- Handle Mailchimp response ----
        if (response.ok) {
            return NextResponse.json({ success: true }, { status: 200 });
        }

        // Member already exists
        if (data.title === 'Member Exists') {
            return NextResponse.json(
                { error: 'already_subscribed' },
                { status: 409 }
            );
        }

        // Any other Mailchimp error
        logger.error('Mailchimp error:', data);
        return NextResponse.json(
            { error: data.detail || 'Something went wrong.' },
            { status: response.status }
        );

    } catch (err) {
        logger.error('Subscribe route error:', err);
        return NextResponse.json(
            { error: 'Internal server error.' },
            { status: 500 }
        );
    }
}