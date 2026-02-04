import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { venueId, venueName, guestCount, date, occasion, requirements, userEmail } = await request.json();

    // Get the authorization header to authenticate the user
    const authHeader = request.headers.get('authorization');

    // Create Supabase client with the user's session token
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      {
        global: {
          headers: authHeader ? { Authorization: authHeader } : {},
        },
      }
    );

    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({
        success: false,
        error: 'User not authenticated',
        hint: 'Please sign in to make a booking.'
      }, { status: 401 });
    }

    // 1. Store booking in Supabase
    const { data: bookingData, error: sbError } = await supabase
      .from('bookings')
      .insert([
        {
          user_id: user.id,
          user_email: userEmail,
          venue_id: venueId,
          venue_name: venueName,
          guest_count: guestCount,
          event_date: date,
          occasion: occasion,
          special_requirements: requirements || null,
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (sbError) {
      console.error('Supabase Error:', sbError);
      return NextResponse.json({
        success: false,
        error: 'Failed to save booking',
        hint: sbError.message
      }, { status: 500 });
    }

    // 2. Send email notification via Resend
    const { error: emailError } = await resend.emails.send({
      from: 'Find My Venue <onboarding@resend.dev>', // Use your verified domain in production
      to: [process.env.NOTIFICATION_EMAIL || 'ishrathash675@gmail.com'],
      subject: `New Booking Request: ${userEmail} for ${venueName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #1a1a1a;">New Booking Request</h2>
          <p style="font-size: 16px; line-height: 1.5;">
            <strong>${userEmail}</strong> has requested to book <strong>${venueName}</strong>.
          </p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Booking ID:</strong> ${bookingData.id}</p>
            <p><strong>Occasion:</strong> ${occasion}</p>
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
      // Don't fail the request if email fails - booking is already saved
      console.warn('Booking saved but email notification failed');
    }

    return NextResponse.json({
      success: true,
      bookingId: bookingData.id,
      message: 'Booking request submitted successfully'
    });
  } catch (error: any) {
    console.error('Booking API Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Internal server error'
    }, { status: 500 });
  }
}
