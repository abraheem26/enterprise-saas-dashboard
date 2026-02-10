import { NextResponse } from 'next/server'
import { MOCK_USERS } from '@/services/auth.service' // reuse existing mock users

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json(MOCK_USERS)
}
