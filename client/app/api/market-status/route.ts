import { NextRequest, NextResponse } from 'next/server'

/**
 * Next.js API Route to proxy Is-Market-Open API
 * This avoids CORS issues and allows server-side caching
 * 
 * Usage: GET /api/market-status?market=NYSE
 */

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const market = searchParams.get('market') || 'NYSE'

    // Validate market parameter
    const validMarkets = ['NYSE', 'NASDAQ', 'LSE', 'TSE', 'HKEX', 'SSE', 'ASX', 'BSE', 'NSE']
    if (!validMarkets.includes(market.toUpperCase())) {
      return NextResponse.json(
        { error: `Invalid market. Valid markets: ${validMarkets.join(', ')}` },
        { status: 400 }
      )
    }

    // Fetch from Is-Market-Open API
    // Free tier: 1,000 calls/month per IP
    const apiUrl = `https://is-market-open.info/api/v1/${market.toUpperCase()}`
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'SageCoin/1.0',
      },
      // Cache for 30 seconds to reduce API calls
      next: { revalidate: 30 },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    return NextResponse.json({
      isOpen: data.isOpen || false,
      market: data.market || market.toUpperCase(),
      timezone: data.timezone || 'America/New_York',
      currentTime: data.currentTime || new Date().toISOString(),
      nextOpen: data.nextOpen,
      nextClose: data.nextClose,
    })
  } catch (error) {
    console.error('Error fetching market status:', error)
    
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        isOpen: false,
        market: request.nextUrl.searchParams.get('market') || 'NYSE',
      },
      { status: 500 }
    )
  }
}

