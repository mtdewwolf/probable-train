import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const USERS_FILE = '/tmp/users.json'

function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return []
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'))
}

function writeUsers(users: any[]) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const users = readUsers()
  const user = users.find((u: any) => u.id === id)
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  return NextResponse.json({ id: user.id, name: user.name, email: user.email, profile: user.profile })
}

export async function PUT(req: NextRequest) {
  const { id, name, email, profile } = await req.json()
  let users = readUsers()
  const idx = users.findIndex((u: any) => u.id === id)
  if (idx === -1) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  users[idx] = { ...users[idx], name, email, profile }
  writeUsers(users)
  return NextResponse.json({ id, name, email, profile })
} 