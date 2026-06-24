import { NextRequest, NextResponse } from 'next/server'
import { lookupPlayers } from '@/lib/api/fortnite'

export async function GET(request: NextRequest) {
	const username = request.nextUrl.searchParams.get('username')
	if (!username) {
		return NextResponse.json({ error: 'username required' }, { status: 400 })
	}
	const data = await lookupPlayers(username)
	return NextResponse.json(data)
}
