import React, { Suspense } from "react";
import { getMarketStats } from "@/lib/data-service";

// Este componente es DINÁMICO (fetches data)
async function MarketStats() {
  const stats = await getMarketStats();

  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="p-4 border rounded">
        <div className="text-gray-500 text-sm">Avg Price</div>
        <div className="text-2xl font-bold">
          ${stats.averagePrice.toLocaleString()}
        </div>
      </div>
      <div className="p-4 border rounded">
        <div className="text-gray-500 text-sm">Sold</div>
        <div className="text-2xl font-bold">{stats.homesSold}</div>
      </div>
      <div className="p-4 border rounded">
        <div className="text-gray-500 text-sm">Speed</div>
        <div className="text-2xl font-bold">{stats.daysOnMarket} days</div>
      </div>
      <div className="col-span-3 text-xs text-gray-400 mt-2">
        Updated: {stats.lastUpdated}
      </div>
    </div>
  );
}

// Este es el componente principal (Shell)
export default function HybridDashboard() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">
        Real Estate Dashboard{" "}
        <span className="text-sm font-normal text-blue-600 border border-blue-200 bg-blue-50 px-2 py-1 rounded ml-2">
          PPR Enabled
        </span>
      </h1>

      {/* 
        ESTO ES EL SECRETO DE PPR: 
        El contenido estático (Título, Layout) se envía INMEDIATAMENTE.
        El Suspense boundary define el "agujero" dinámico que se llenará via streaming.
      */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
        <Suspense
          fallback={
            <div className="h-40 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">
              Loading Market Data...
            </div>
          }
        >
          <MarketStats />
        </Suspense>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="h-64 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
          Static Chart Placeholder (Instant Load)
        </div>
        <div className="h-64 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
          Static Activity Feed (Instant Load)
        </div>
      </div>
    </div>
  );
}
