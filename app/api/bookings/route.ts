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

    // 2. Send notification email to venue owner
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
      console.error('Notification Email Error:', emailError);
      console.warn('Booking saved but notification email failed');
    }

    // 3. Send thank you/confirmation email to the user
    const { error: thankYouEmailError } = await resend.emails.send({
      from: 'Find My Venue <onboarding@resend.dev>',
      to: [userEmail],
      subject: `Thank you for your booking request at ${venueName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333;">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #2563eb; margin: 0; font-size: 28px; font-weight: 700;">Find My Venue</h1>
            <p style="color: #666; margin-top: 8px; font-size: 14px;">Trusted Venue Discovery</p>
          </div>

          <!-- Main Content -->
          <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h2 style="color: #1a1a1a; margin: 0 0 16px 0; font-size: 24px; font-weight: 600;">Thank You for Your Request!</h2>
            
            <p style="color: #4b5563; line-height: 1.6; margin: 0 0 24px 0; font-size: 16px;">
              We've received your booking request for <strong style="color: #1a1a1a;">${venueName}</strong>. 
              The venue manager will review your requirements and get back to you shortly.
            </p>

            <!-- Booking Details -->
            <div style="background: #f9fafb; border-left: 4px solid #2563eb; padding: 20px; border-radius: 8px; margin: 24px 0;">
              <h3 style="color: #1a1a1a; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">Your Booking Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Booking ID:</td>
                  <td style="padding: 8px 0; color: #1a1a1a; font-weight: 600; font-size: 14px; text-align: right;">${bookingData.id.substring(0, 8).toUpperCase()}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Venue:</td>
                  <td style="padding: 8px 0; color: #1a1a1a; font-weight: 600; font-size: 14px; text-align: right;">${venueName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Occasion:</td>
                  <td style="padding: 8px 0; color: #1a1a1a; font-weight: 600; font-size: 14px; text-align: right;">${occasion}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Event Date:</td>
                  <td style="padding: 8px 0; color: #1a1a1a; font-weight: 600; font-size: 14px; text-align: right;">${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Guest Count:</td>
                  <td style="padding: 8px 0; color: #1a1a1a; font-weight: 600; font-size: 14px; text-align: right;">${guestCount} guests</td>
                </tr>
                ${requirements ? `
                <tr>
                  <td colspan="2" style="padding: 16px 0 8px 0; color: #6b7280; font-size: 14px;">Special Requirements:</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 0; color: #1a1a1a; font-size: 14px; line-height: 1.6;">${requirements}</td>
                </tr>
                ` : ''}
              </table>
            </div>

            <!-- What's Next -->
            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
              <h3 style="color: #1a1a1a; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">What happens next?</h3>
              <ul style="margin: 0; padding-left: 20px; color: #4b5563; line-height: 1.8; font-size: 14px;">
                <li>The venue manager will review your request</li>
                <li>They'll check availability for your event date</li>
                <li>You'll receive a response within 24-48 hours</li>
                <li>No payment is required at this stage</li>
              </ul>
            </div>
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0 0 8px 0;">
              This is an automated confirmation email. Please do not reply to this message.
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              If you have any questions, please contact us at <a href="mailto:${process.env.NOTIFICATION_EMAIL}" style="color: #2563eb; text-decoration: none;">${process.env.NOTIFICATION_EMAIL}</a>
            </p>
          </div>
        </div>
      `,
    });

    if (thankYouEmailError) {
      console.error('Thank You Email Error:', thankYouEmailError);
      console.warn('Booking saved but thank you email failed');
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
