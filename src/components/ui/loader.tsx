import { Loader2 } from "lucide-react";
import { cn } from "./utils";

interface LoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  fullPage?: boolean;
}

const sizeClasses = {
  sm: "size-4",
  md: "size-8",
  lg: "size-12",
  xl: "size-16",
};

export function Loader({ className, size = "md", text, fullPage = false }: LoaderProps) {
  const loader = (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <Loader2 className={cn(sizeClasses[size], "animate-spin text-[#02542D]")} />
      {text && (
        <p className="text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        {loader}
      </div>
    );
  }

  return loader;
}

// Card skeleton loader for list views
export function CardSkeletonLoader({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl border bg-card overflow-hidden animate-pulse">
          {/* Image skeleton */}
          <div className="h-64 bg-muted" />
          
          {/* Content skeleton */}
          <div className="p-6 space-y-4">
            {/* Title */}
            <div className="h-6 bg-muted rounded w-3/4" />
            
            {/* Subtitle */}
            <div className="h-4 bg-muted rounded w-1/2" />
            
            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-5/6" />
            </div>
            
            {/* Footer badges/stats */}
            <div className="flex gap-2 pt-2">
              <div className="h-6 bg-muted rounded w-16" />
              <div className="h-6 bg-muted rounded w-20" />
              <div className="h-6 bg-muted rounded w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Branded loader with logo animation
export function BrandedLoader({ text }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      {/* Animated rings */}
      <div className="relative size-20">
        <div className="absolute inset-0 rounded-full border-4 border-[#02542D] border-t-transparent animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-[#DF6951] border-b-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-8 rounded-full bg-gradient-to-br from-[#02542D] to-[#DF6951] animate-pulse" />
        </div>
      </div>
      
      {text && (
        <p className="text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  );
}
