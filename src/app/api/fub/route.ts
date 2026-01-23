import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { source, type, message, person } = body;

    const auth = Buffer.from(`${process.env.FUB_API_KEY}:`).toString('base64');

    const response = await fetch('https://api.followupboss.com/v1/events', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: source || process.env.NEXT_PUBLIC_SITE_NAME || 'Easy Closers Web',
        system: 'Web Form',
        type: type || 'Registration',
        message: message || '',
        person: person,
      }),
    });

    if (response.ok) {
      return NextResponse.json({ success: true }, { status: 201 });
    } else {
      const errorData = await response.json();
      console.error('FUB API Error:', errorData);
      return NextResponse.json({ success: false, error: errorData }, { status: response.status });
    }
  } catch (error) {
    console.error('FUB Integration Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
