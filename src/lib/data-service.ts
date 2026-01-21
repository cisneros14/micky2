import { cacheTag } from 'next/cache';

// Simulation of a database delay
const SIMULATED_DELAY = 1000;

export async function getMarketStats() {
  // 'use cache' tells Next.js to cache the result of this function
  // independently of the page rendering.
  // This is the modern replacement for unstable_cache().
  "use cache";
  
  cacheTag('market-stats');

  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));

  return {
    averagePrice: 450000,
    homesSold: 120,
    daysOnMarket: 14,
    lastUpdated: new Date().toISOString(),
  };
}

export async function getPropertyDeals(location: string) {
    "use cache";
    cacheTag(`deals-${location}`); // Granular invalidation tag

    await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));

    return [
        { id: 1, address: '123 Ocean Dr', price: 300000, equity: '30%' },
        { id: 2, address: '456 Palm Ave', price: 275000, equity: '25%' },
    ]
}
