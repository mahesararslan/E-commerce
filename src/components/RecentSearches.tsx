"use client"
import { useFetchRecentSearches } from '@/hooks/useFetchRecentSearches';
import React, { useEffect } from "react";

interface RecentSearchesProps {
  onSelect: (search: string) => void;
}

export function RecentSearches({ onSelect }: RecentSearchesProps) {
  const { recentSearches, loading } = useFetchRecentSearches();

  useEffect(() => {
    if (recentSearches) console.log("RecentSearches: ", recentSearches);
    else alert("no recent searches");
  }, [recentSearches]);

  if (loading || recentSearches.length === 0) {
    return null;
  }

  return (
    <div
      className="absolute top-full left-0 w-full bg-background border border-input rounded-md shadow-lg mt-1 z-10"
      onMouseDown={(e) => e.preventDefault()} // Prevent onBlur hiding dropdown before click
    >
      <ul className="py-2 w-full">
        {recentSearches.map((search: any, index: number) => (
          <li
            key={index}
            className="px-4 py-2 hover:bg-accent cursor-pointer w-full"
            onMouseDown={(e) => {
              e.stopPropagation(); // Prevent other events from interfering
              onSelect(search);
            }}
          >
            {search}
          </li>
        ))}
      </ul>
    </div>
  );
}
