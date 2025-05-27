import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const USERS_FILE = path.join(process.cwd(), 'users.json')

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
  return NextResponse.json({ settings: user.settings || {} })
}

export async function PUT(req: NextRequest) {
  const { id, settings } = await req.json()
  let users = readUsers()
  const idx = users.findIndex((u: any) => u.id === id)
  if (idx === -1) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  users[idx] = { ...users[idx], settings }
  writeUsers(users)
  return NextResponse.json({ settings })
} 