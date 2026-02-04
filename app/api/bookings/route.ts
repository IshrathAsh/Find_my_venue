import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function POST(request: Request) {
    try {
        const { venueId, venueName, guestCount, date, requirements, userEmail } = await request.json();

        // 1. Store in Supabase
        const { data, error: sbError } = await supabase
            .from('bookings')
            .insert([
                {
                    venue_id: venueId,
                    venue_name: venueName,
                    guest_count: guestCount,
                    event_date: date,
                    requirements,
                    user_email: userEmail
                }
            ]);

        if (sbError) {
            console.error('Supabase Error:', sbError);
            // Note: You need to create a 'bookings' table in your Supabase dashboard first!
            // Table columns: id (uuid/int), venue_id (text), venue_name (text), guest_count (int), event_date (date), requirements (text), user_email (text), created_at (timestamp)
        }

        // 2. Send email via Resend
        const { error: emailError } = await resend.emails.send({
            from: 'Find My Venue <onboarding@resend.dev>', // Use your verified domain in production
            to: [process.env.NOTIFICATION_EMAIL || 'ishrath@example.com'],
            subject: `Booking Request: ${userEmail} for ${venueName}`,
            html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #1a1a1a;">Hi there,</h2>
          <p style="font-size: 16px; line-height: 1.5;">
            <strong>${userEmail}</strong> has requested to book <strong>${venueName}</strong>.
          </p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Event Date:</strong> ${date}</p>
            <p><strong>Guests:</strong> ${guestCount}</p>
            <p><strong>Requirements:</strong> ${requirements || 'No special requirements listed.'}</p>
          </div>
          <p style="margin-top: 20px; font-size: 14px; color: #666;">
            You can reach out to them directly at ${userEmail} to finalize the details.
          </p>
        </div>
      `,
        });

        if (emailError) {
            console.error('Resend Error:', emailError);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
