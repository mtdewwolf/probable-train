import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const GAMES_FILE = path.join(process.cwd(), 'games.json')

function readGames() {
  if (!fs.existsSync(GAMES_FILE)) return []
  return JSON.parse(fs.readFileSync(GAMES_FILE, 'utf-8'))
}

function writeGames(games: any[]) {
  fs.writeFileSync(GAMES_FILE, JSON.stringify(games, null, 2))
}

export async function GET() {
  const games = readGames()
  return NextResponse.json(games)
}

export async function POST(req: NextRequest) {
  const { sport, location, datetime, description, maxPlayers } = await req.json()
  let games = readGames()
  const newGame = {
    id: Date.now().toString(),
    sport,
    location,
    datetime,
    description,
    maxPlayers: Number(maxPlayers),
  }
  games.push(newGame)
  writeGames(games)
  return NextResponse.json(newGame, { status: 201 })
} 