/**
 * Market Status Service
 * Uses the Is-Market-Open API (free tier: 1,000 calls/month per IP)
 * Documentation: https://is-market-open.info
 */

export interface MarketStatus {
  isOpen: boolean
  market: string
  timezone: string
  currentTime: string
  nextOpen?: string
  nextClose?: string
}

export interface MarketStatusResponse {
  isOpen: boolean
  market: string
  timezone: string
  currentTime: string
  nextOpen?: string
  nextClose?: string
  error?: string
}

/**
 * Fetch market status from Is-Market-Open API
 * @param market - Market identifier (e.g., 'NYSE', 'NASDAQ', 'LSE', 'TSE')
 * @returns Promise with market status data
 */
export async function getMarketStatus(market: string = 'NYSE'): Promise<MarketStatusResponse> {
  try {
    // Use Next.js API route to proxy the request (avoids CORS and allows caching)
    // The API route proxies to: https://is-market-open.info/api/v1/{market}
    // Free tier: 1,000 calls/month per IP
    const response = await fetch(`/api/market-status?market=${encodeURIComponent(market)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    return {
      isOpen: data.isOpen || false,
      market: data.market || market,
      timezone: data.timezone || 'America/New_York',
      currentTime: data.currentTime || new Date().toISOString(),
      nextOpen: data.nextOpen,
      nextClose: data.nextClose,
    }
  } catch (error) {
    console.error('Error fetching market status:', error)
    return {
      isOpen: false,
      market: market,
      timezone: 'America/New_York',
      currentTime: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Get multiple market statuses at once
 * @param markets - Array of market identifiers
 * @returns Promise with array of market statuses
 */
export async function getMultipleMarketStatuses(
  markets: string[] = ['NYSE', 'NASDAQ']
): Promise<MarketStatusResponse[]> {
  try {
    const promises = markets.map(market => getMarketStatus(market))
    return await Promise.all(promises)
  } catch (error) {
    console.error('Error fetching multiple market statuses:', error)
    return []
  }
}

