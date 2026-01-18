import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { token } = await req.json()
  if (!token) {
    return NextResponse.json({ success: false, error: 'No token provided' }, { status: 400 })
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
     return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 })
  }
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`

  const googleRes = await fetch(verifyUrl, { method: 'POST' })
  const data = await googleRes.json()

  if (!data.success) {
    return NextResponse.json({ success: false, error: 'reCAPTCHA failed', details: data }, { status: 403 })
  }

  return NextResponse.json({ success: true })
}
