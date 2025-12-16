# Market Status API Integration

## Overview
This project integrates with the **Is-Market-Open API** to display real-time market status.

## Free Tier Details
- **1,000 API calls per month** per IP address
- **No API key required** for free tier
- **No credit card needed**

## Supported Markets
- NYSE (New York Stock Exchange)
- NASDAQ
- LSE (London Stock Exchange)
- TSE (Tokyo Stock Exchange)
- HKEX (Hong Kong Exchange)
- SSE (Shanghai Stock Exchange)
- ASX (Australian Stock Exchange)
- BSE (Bombay Stock Exchange)
- NSE (National Stock Exchange of India)

## Usage

### 1. Using the React Hook (Recommended)

```tsx
import { useMarketStatus } from '@/hooks/useMarketStatus'

function MyComponent() {
  const { marketStatus, isLoading, error, refetch } = useMarketStatus({
    market: 'NYSE',        // Optional: default is 'NYSE'
    pollInterval: 60000,  // Optional: poll every 60 seconds (set to 0 to disable)
    autoFetch: true,      // Optional: automatically fetch on mount
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <p>Market: {marketStatus?.market}</p>
      <p>Status: {marketStatus?.isOpen ? 'Open' : 'Closed'}</p>
    </div>
  )
}
```

### 2. Using the Service Directly

```tsx
import { getMarketStatus } from '@/services/marketStatusService'

async function checkMarket() {
  const status = await getMarketStatus('NYSE')
  console.log('Market is open:', status.isOpen)
}
```

### 3. Using the MarketStatusBadge Component

```tsx
import MarketStatusBadge from '@/components/MarketStatusBadge'

<MarketStatusBadge 
  market="NYSE" 
  showPercentage={true} 
/>
```

## API Architecture

### Client-Side Flow
1. Component calls `useMarketStatus()` hook
2. Hook calls `getMarketStatus()` service
3. Service makes request to `/api/market-status` (Next.js API route)
4. API route proxies request to `https://is-market-open.info/api/v1/{market}`
5. Response is cached for 30 seconds to reduce API calls

### Benefits of Proxy Route
- ✅ Avoids CORS issues
- ✅ Server-side caching (reduces API calls)
- ✅ Centralized error handling
- ✅ Rate limiting protection

## Rate Limiting Strategy

To stay within the 1,000 calls/month limit:

1. **Polling Interval**: Default is 60 seconds (1 call per minute)
   - 1,440 calls/day if polling continuously
   - **Recommendation**: Increase to 5 minutes (288 calls/day) or disable polling

2. **Server-Side Caching**: API route caches responses for 30 seconds
   - Reduces duplicate requests from multiple users

3. **Manual Refresh**: Use `refetch()` only when needed

## Example: Optimized Usage

```tsx
// Poll every 5 minutes instead of every minute
const { marketStatus } = useMarketStatus({
  market: 'NYSE',
  pollInterval: 300000, // 5 minutes
})

// Or disable auto-polling and refresh manually
const { marketStatus, refetch } = useMarketStatus({
  market: 'NYSE',
  pollInterval: 0, // Disable polling
  autoFetch: true, // Only fetch on mount
})

// Refresh manually on button click
<button onClick={refetch}>Refresh Status</button>
```

## Monitoring API Usage

The API provider tracks usage by IP address. To monitor:
- Check browser console for API errors
- Monitor Next.js server logs
- Consider adding usage tracking in production

## Upgrading to Paid Tier

If you need more than 1,000 calls/month:
1. Contact: ismarketopen@mailbox.org
2. Visit: https://is-market-open.info/about-api/
3. Request private API key for higher limits

## Troubleshooting

### CORS Errors
- ✅ Already handled via Next.js API route proxy

### Rate Limit Exceeded
- Increase `pollInterval` to reduce frequency
- Disable polling and use manual refresh
- Consider upgrading to paid tier

### API Not Responding
- Check network connectivity
- Verify market code is valid
- Check Next.js API route logs

## Files Structure

```
client/
├── services/
│   └── marketStatusService.ts    # API service functions
├── hooks/
│   └── useMarketStatus.ts        # React hook for market status
├── components/
│   └── MarketStatusBadge.tsx     # UI component
└── app/
    └── api/
        └── market-status/
            └── route.ts          # Next.js API route (proxy)
```

