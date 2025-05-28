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

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json()
  let users = readUsers()
  if (users.find((u: any) => u.email === email)) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  }
  const newUser = { id: Date.now().toString(), name, email, password, settings: {}, profile: {} }
  users.push(newUser)
  writeUsers(users)
  return NextResponse.json({ id: newUser.id, name, email })
} 