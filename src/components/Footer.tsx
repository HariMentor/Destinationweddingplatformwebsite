import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h3 className="text-3xl" style={{ fontFamily: 'serif' }}>Wedzway</h3>
            <Heart className="size-5 text-rose-400 fill-rose-400" />
          </div>
          <p className="text-slate-400 mb-6">
            Making dream destination weddings a reality, one celebration at a time
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-6" />
          <p className="text-slate-500">
            © 2025 Wedzway. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
