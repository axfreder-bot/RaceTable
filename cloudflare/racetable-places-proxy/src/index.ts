/**
 * RaceTable Places Proxy Worker
 * 
 * Proxies Google Places API requests to avoid exposing API keys in the mobile app.
 * Also handles CORS and response normalization.
 * 
 * Deploy with:
 *   cd cloudflare/racetable-places-proxy
 *   npx wrangler secret put GOOGLE_PLACES_API_KEY
 *   npx wrangler deploy
 */

interface Env {
  GOOGLE_PLACES_API_KEY: string;
  PLACES_CACHE: {
    get(key: string): Promise<string | null>;
    put(key: string, value: string, options?: {expirationTtl?: number}): Promise<void>;
  };
}

interface PlaceResult {
  placeId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  rating?: number;
  priceLevel?: number;
  cuisine?: string;
  photoRef?: string;
  openNow?: boolean;
}

// Cache TTL in seconds (1 hour)
const CACHE_TTL = 3600;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Only allow GET
    if (request.method !== 'GET') {
      return jsonResponse({error: 'Method not allowed'}, 405);
    }

    const lat = parseFloat(url.searchParams.get('lat') || '');
    const lng = parseFloat(url.searchParams.get('lng') || '');
    const query = url.searchParams.get('query') || 'restaurant';
    const radius = parseInt(url.searchParams.get('radius') || '5000', 10);

    if (isNaN(lat) || isNaN(lng)) {
      return jsonResponse({error: 'Missing or invalid lat/lng'}, 400);
    }

    // Build cache key
    const cacheKey = `places:${lat.toFixed(4)}:${lng.toFixed(4)}:${query}:${radius}`;
    
    // Try cache first
    try {
      const cached = await env.PLACES_CACHE.get(cacheKey);
      if (cached) {
        return jsonResponse(JSON.parse(cached), 200, {
          'X-Cache': 'HIT',
          'Cache-Control': 'public, max-age=3600',
        });
      }
    } catch (e) {
      // KV get failed, proceed without cache
    }

    // Build Google Places API URL
    const places: PlaceResult[] = [];

    try {
      // 1. Nearby Search
      const nearbyUrl = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
      nearbyUrl.searchParams.set('location', `${lat},${lng}`);
      nearbyUrl.searchParams.set('radius', String(radius));
      nearbyUrl.searchParams.set('keyword', query);
      nearbyUrl.searchParams.set('type', 'restaurant');
      nearbyUrl.searchParams.set('key', env.GOOGLE_PLACES_API_KEY);

      const nearbyResponse = await fetch(nearbyUrl.toString());
      const nearbyData = await nearbyResponse.json() as {results?: any[]};

      if (nearbyData.results) {
        for (const place of nearbyData.results.slice(0, 10)) {
          places.push(normalizePlace(place));
        }
      }

      // 2. Text Search for more specific query matches
      if (query && query !== 'restaurant') {
        const textUrl = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json');
        textUrl.searchParams.set('query', `${query} near ${lat},${lng}`);
        textUrl.searchParams.set('location', `${lat},${lng}`);
        textUrl.searchParams.set('radius', String(radius));
        textUrl.searchParams.set('key', env.GOOGLE_PLACES_API_KEY);

        const textResponse = await fetch(textUrl.toString());
        const textData = await textResponse.json() as {results?: any[]};

        if (textData.results) {
          for (const place of textData.results.slice(0, 5)) {
            const normalized = normalizePlace(place);
            if (!places.find(p => p.placeId === normalized.placeId)) {
              places.push(normalized);
            }
          }
        }
      }
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      return jsonResponse({error: 'Failed to fetch from Google Places', details: errorMessage}, 502);
    }

    // Deduplicate by placeId
    const uniquePlaces = places.filter((p, i, arr) => 
      arr.findIndex(x => x.placeId === p.placeId) === i
    );

    const result = {places: uniquePlaces, count: uniquePlaces.length};

    // Cache the result
    try {
      await env.PLACES_CACHE.put(cacheKey, JSON.stringify(result), {
        expirationTtl: CACHE_TTL,
      });
    } catch (e) {
      // Cache put failed, return anyway
    }

    return jsonResponse(result, 200, {
      'X-Cache': 'MISS',
      'Cache-Control': 'public, max-age=3600',
    });
  },
};

function normalizePlace(place: any): PlaceResult {
  return {
    placeId: place.place_id || '',
    name: place.name || '',
    address: place.vicinity || place.formatted_address || '',
    lat: place.geometry?.location?.lat || 0,
    lng: place.geometry?.location?.lng || 0,
    rating: place.rating,
    priceLevel: place.price_level,
    cuisine: place.types?.[0] || 'restaurant',
    photoRef: place.photos?.[0]?.photo_reference,
    openNow: place.opening_hours?.open_now,
  };
}

function jsonResponse(data: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...headers,
    },
  });
}
