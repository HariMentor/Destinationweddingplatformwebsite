import { Camera, Video, Palette } from "lucide-react";
import { Button } from "./ui/button";

interface VendorsNavProps {
  onNavigate?: (vendor: 'photographers' | 'videographers' | 'decorators') => void;
  currentVendor?: 'photographers' | 'videographers' | 'decorators';
}

export function VendorsNav({ onNavigate, currentVendor }: VendorsNavProps) {
  return (
    <div className="border-b bg-white/80 backdrop-blur-sm sticky top-16 z-40">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center gap-6 py-4">
          <span className="text-sm text-muted-foreground">Vendors:</span>
          <button
            onClick={() => onNavigate?.('photographers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              currentVendor === 'photographers'
                ? 'bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white shadow-md'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Camera className="size-4" />
            Photographers
          </button>
          <button
            onClick={() => onNavigate?.('videographers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              currentVendor === 'videographers'
                ? 'bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white shadow-md'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Video className="size-4" />
            Videographers
          </button>
          <button
            onClick={() => onNavigate?.('decorators')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              currentVendor === 'decorators'
                ? 'bg-gradient-to-r from-[#DF6951] to-[#F1A501] text-white shadow-md'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Palette className="size-4" />
            Decorators
          </button>
        </div>
      </div>
    </div>
  );
}
