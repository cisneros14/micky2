"use client";

import { useOptimistic, useState, useTransition } from "react";
import { Heart } from "lucide-react";

// Simulated Server Action
async function toggleLikeAction(currentCount: number): Promise<number> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return currentCount + 1;
}

export default function OptimisticLikeButton({
  initialCount = 0,
}: {
  initialCount?: number;
}) {
  const [count, setCount] = useState(initialCount);
  const [isPending, startTransition] = useTransition();

  // Optimistic State: Updates immediately, then syncs with server/real state
  const [optimisticCount, addOptimisticCount] = useOptimistic(
    count,
    (state, optimisticValue: number) => state + optimisticValue,
  );

  const handleLike = async () => {
    // 1. Mostrar feedback INMEDIATO (0ms delay) -> Mejora INP brutalmente
    startTransition(async () => {
      addOptimisticCount(1);

      // 2. Ejecutar la acción real en background
      const newCount = await toggleLikeAction(count);

      // 3. Sincronizar estado real cuando termine
      setCount(newCount);
    });
  };

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 hover:bg-rose-100 transition-colors border border-rose-200"
    >
      <Heart
        className={`w-5 h-5 ${optimisticCount > initialCount ? "fill-rose-500 text-rose-500" : "text-rose-500"}`}
      />
      <span className="font-medium text-rose-700">{optimisticCount} Likes</span>
      {isPending && (
        <span className="text-xs text-rose-400 animate-pulse">(Saving...)</span>
      )}
    </button>
  );
}
