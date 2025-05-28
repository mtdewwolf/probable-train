import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const USERS_FILE = '/tmp/users.json'

function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return []
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'))
}

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  const users = readUsers()
  const user = users.find((u: any) => u.email === email && u.password === password)
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
  return NextResponse.json({ id: user.id, name: user.name, email: user.email })
} 