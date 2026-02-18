import { NextResponse } from 'next/server'
import { MOCK_USERS as users } from '@/lib/mockDb'

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const body = await request.json()
  const { id } = await context.params

  const userIndex = users.findIndex((u) => u.id === id)

  if (userIndex === -1) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }

  users[userIndex] = {
    ...users[userIndex],
    ...body,
  }

  return NextResponse.json(users[userIndex])
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  const userIndex = users.findIndex((u) => u.id === id)

  if (userIndex === -1) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }

  const deletedUser = users.splice(userIndex, 1)

  return NextResponse.json(deletedUser[0])
}
