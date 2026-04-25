"use client";

import { cn } from "@/lib/utils";

type LibraryButtonProps = {
  onClick: () => void;
  variant: "add" | "remove" | "edit";
  children: React.ReactNode;
};

export function LibraryButton({ onClick, variant, children }: LibraryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md px-4 py-2 text-sm font-medium text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        variant === "add" && "bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-600",
        variant === "remove" && "bg-red-600 hover:bg-red-700 focus-visible:ring-red-600",
        variant === "edit" && "bg-amber-600 hover:bg-amber-700 focus-visible:ring-amber-600"
      )}
    >
      {children}
    </button>
  );
}
