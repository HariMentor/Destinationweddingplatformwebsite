"use client";

import { 
  ArrowLeft, 
  Check, 
  Copy, 
  X,
  Heart,
  Share2,
  ArrowLeftRight,
  MapPin,
  Star,
  Users,
  BadgeCheck,
  Sparkles,
  Volume2,
  Dog,
  Wine,
  Building2,
  Sunset,
  Trees,
  Wifi,
  Music,
  Utensils,
  Camera,
  Car,
  Clock,
  Home,
  Receipt,
  Bed,
  CloudSun,
  Thermometer,
  Droplets,
  Wind,
  Calendar,
  ArrowRight,
  Mail,
  Phone,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Search,
  TrendingUp,
  Award,
  Video,
  Palette,
  Filter,
  ShoppingCart,
  Tag,
  Crown,
  Gift,
  Percent,
  Grid3x3,
  List,
  Eye,
  Play,
  Satellite,
  Plane,
  Settings,
  Shield,
  Send,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { Separator } from "./ui/separator";

interface BrandGuidelinesPageProps {
  onBack: () => void;
}

export function BrandGuidelinesPage({ onBack }: BrandGuidelinesPageProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedColor(label);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (error) {
      // Fallback: Create a temporary text area to copy
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedColor(label);
        setTimeout(() => setCopiedColor(null), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
      textArea.remove();
    }
  };

  const brandColors = {
    primary: [
      { name: "Primary Teal", hex: "#02542D", usage: "Primary buttons, CTAs, links" },
      { name: "Primary Orange", hex: "#DF6951", usage: "Service icons, accents, highlights, secondary CTAs" },
    ],
    secondary: [
      { name: "Warm Peach", hex: "#F8B195", usage: "Accents, highlights" },
      { name: "Soft Coral", hex: "#F67280", usage: "Secondary CTAs, badges" },
      { name: "Golden Yellow", hex: "#F1A501", usage: "Gradient pairs, decorative elements" },
    ],
    pastels: [
      { name: "Purple 50", hex: "#FAF5FF", usage: "Backgrounds, cards" },
      { name: "Purple 600", hex: "#9333EA", usage: "Icons, borders" },
      { name: "Blue 50", hex: "#EFF6FF", usage: "Backgrounds, cards" },
      { name: "Blue 600", hex: "#2563EB", usage: "Icons, borders" },
      { name: "Orange 50", hex: "#FFF7ED", usage: "Backgrounds, cards" },
      { name: "Orange 600", hex: "#EA580C", usage: "Icons, borders" },
      { name: "Pink 50", hex: "#FDF2F8", usage: "Backgrounds, cards" },
      { name: "Pink 600", hex: "#DB2777", usage: "Icons, borders" },
      { name: "Green 50", hex: "#F0FDF4", usage: "Backgrounds, cards" },
      { name: "Green 600", hex: "#16A34A", usage: "Icons, borders" },
    ],
    neutrals: [
      { name: "Background", hex: "#FFFFFF", usage: "Page background" },
      { name: "Muted", hex: "#ECECF0", usage: "Subtle backgrounds" },
      { name: "Muted Foreground", hex: "#717182", usage: "Secondary text" },
      { name: "Border", hex: "rgba(0, 0, 0, 0.1)", usage: "Dividers, borders" },
    ],
    gradients: [
      { name: "Teal Gradient", value: "linear-gradient(135deg, #02542D 0%, #034A26 100%)", usage: "Primary buttons, hero sections" },
      { name: "Warm Gradient", value: "linear-gradient(135deg, #DF6951 0%, #F1A501 100%)", usage: "Featured CTAs, highlights" },
      { name: "Soft Gradient", value: "linear-gradient(135deg, #F8B195 0%, #F67280 100%)", usage: "Accent elements, cards" },
    ],
  };

  const typography = {
    headings: {
      font: "Volkhov",
      type: "Serif",
      sizes: [
        { name: "H1", size: "var(--text-2xl)", weight: "500" },
        { name: "H2", size: "var(--text-xl)", weight: "500" },
        { name: "H3", size: "var(--text-lg)", weight: "500" },
        { name: "H4", size: "var(--text-base)", weight: "500" },
      ],
    },
    body: {
      font: "System UI / Poppins",
      type: "Sans-serif",
      sizes: [
        { name: "Body", size: "var(--text-base)", weight: "400" },
        { name: "Small", size: "var(--text-sm)", weight: "400" },
        { name: "Label", size: "var(--text-base)", weight: "500" },
      ],
    },
  };

  const spacing = [
    { name: "xs", value: "0.5rem", pixels: "8px" },
    { name: "sm", value: "0.75rem", pixels: "12px" },
    { name: "md", value: "1rem", pixels: "16px" },
    { name: "lg", value: "1.5rem", pixels: "24px" },
    { name: "xl", value: "2rem", pixels: "32px" },
    { name: "2xl", value: "3rem", pixels: "48px" },
    { name: "3xl", value: "4rem", pixels: "64px" },
  ];

  const borderRadius = [
    { name: "sm", value: "calc(var(--radius) - 4px)", usage: "Small elements" },
    { name: "md", value: "calc(var(--radius) - 2px)", usage: "Medium elements" },
    { name: "lg", value: "var(--radius)", usage: "Cards, buttons (10px)" },
    { name: "xl", value: "calc(var(--radius) + 4px)", usage: "Large elements" },
    { name: "full", value: "9999px", usage: "Circular elements, pills" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-purple-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="shrink-0"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <div>
              <h1 className="mb-1">Wedzway Brand Guidelines</h1>
              <p className="text-sm text-muted-foreground">
                Design system and brand assets for the Wedzway platform
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Brand Overview */}
        <section className="mb-16">
          <Card className="p-8 bg-gradient-to-br from-[#02542D] to-[#034A26] text-white">
            <h2 className="mb-4 text-white">Brand Overview</h2>
            <p className="text-white/90 mb-6 max-w-3xl">
              Wedzway is a destination wedding platform connecting couples with verified wedding service
              providers globally. Our design reflects warmth, trust, and the joy of celebrating love
              across beautiful destinations worldwide.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-white/70 mb-1">Design Style</div>
                <div className="text-white">Modern travel aesthetic</div>
              </div>
              <div>
                <div className="text-sm text-white/70 mb-1">Color Palette</div>
                <div className="text-white">Warm & welcoming</div>
              </div>
              <div>
                <div className="text-sm text-white/70 mb-1">Typography</div>
                <div className="text-white">Volkhov serif & system</div>
              </div>
            </div>
          </Card>
        </section>

        {/* Color Palette */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="mb-2">Color Palette</h2>
            <p className="text-muted-foreground">
              Our color system combines professional teal tones with warm, inviting accents
            </p>
          </div>

          {/* Primary Colors */}
          <div className="mb-8">
            <h3 className="mb-4">Primary Colors</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {brandColors.primary.map((color) => (
                <Card key={color.name} className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="size-20 rounded-xl shrink-0 shadow-md"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="mb-1">{color.name}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <code className="text-sm text-muted-foreground">
                          {color.hex}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7"
                          onClick={() => copyToClipboard(color.hex, color.name)}
                        >
                          {copiedColor === color.name ? (
                            <Check className="size-3 text-green-600" />
                          ) : (
                            <Copy className="size-3" />
                          )}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {color.usage}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Secondary Colors */}
          <div className="mb-8">
            <h3 className="mb-4">Secondary Colors</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {brandColors.secondary.map((color) => (
                <Card key={color.name} className="p-6">
                  <div
                    className="h-24 rounded-xl mb-4 shadow-md"
                    style={{ backgroundColor: color.hex }}
                  />
                  <h4 className="mb-1">{color.name}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <code className="text-sm text-muted-foreground">
                      {color.hex}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7"
                      onClick={() => copyToClipboard(color.hex, color.name)}
                    >
                      {copiedColor === color.name ? (
                        <Check className="size-3 text-green-600" />
                      ) : (
                        <Copy className="size-3" />
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{color.usage}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Pastel Colors */}
          <div className="mb-8">
            <h3 className="mb-4">Pastel Colors (Component Backgrounds)</h3>
            <div className="grid md:grid-cols-5 gap-4">
              {brandColors.pastels.map((color) => (
                <Card key={color.name} className="p-4">
                  <div
                    className="h-20 rounded-xl mb-3 shadow-sm"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="mb-1 text-sm">{color.name}</div>
                  <div className="flex items-center gap-1 mb-2">
                    <code className="text-xs text-muted-foreground">
                      {color.hex}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6"
                      onClick={() => copyToClipboard(color.hex, color.name)}
                    >
                      {copiedColor === color.name ? (
                        <Check className="size-2.5 text-green-600" />
                      ) : (
                        <Copy className="size-2.5" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{color.usage}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Neutral Colors */}
          <div className="mb-8">
            <h3 className="mb-4">Neutral Colors</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {brandColors.neutrals.map((color) => (
                <Card key={color.name} className="p-6">
                  <div
                    className="h-24 rounded-xl mb-4 border shadow-sm"
                    style={{ backgroundColor: color.hex }}
                  />
                  <h4 className="mb-1">{color.name}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <code className="text-sm text-muted-foreground">
                      {color.hex}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7"
                      onClick={() => copyToClipboard(color.hex, color.name)}
                    >
                      {copiedColor === color.name ? (
                        <Check className="size-3 text-green-600" />
                      ) : (
                        <Copy className="size-3" />
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{color.usage}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Gradients */}
          <div className="mb-8">
            <h3 className="mb-4">Gradients</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {brandColors.gradients.map((gradient) => (
                <Card key={gradient.name} className="p-6">
                  <div
                    className="h-32 rounded-xl mb-4 shadow-md"
                    style={{ background: gradient.value }}
                  />
                  <h4 className="mb-1">{gradient.name}</h4>
                  <code className="text-xs text-muted-foreground block mb-2">
                    {gradient.value}
                  </code>
                  <p className="text-sm text-muted-foreground">{gradient.usage}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Separator className="my-16" />

        {/* Typography */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="mb-2">Typography</h2>
            <p className="text-muted-foreground">
              Our typography system uses Volkhov serif for headings and system fonts for body text
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Headings */}
            <Card className="p-6">
              <div className="mb-6">
                <h3 className="mb-1">{typography.headings.font}</h3>
                <Badge variant="secondary">{typography.headings.type}</Badge>
              </div>
              <div className="space-y-4">
                {typography.headings.sizes.map((size) => (
                  <div key={size.name} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{size.name}</span>
                      <div className="flex gap-3 text-xs text-muted-foreground">
                        <span>{size.size}</span>
                        <span>Weight: {size.weight}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: size.size, fontWeight: size.weight, fontFamily: 'Volkhov, serif' }}>
                      The quick brown fox
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Body Text */}
            <Card className="p-6">
              <div className="mb-6">
                <h3 className="mb-1">{typography.body.font}</h3>
                <Badge variant="secondary">{typography.body.type}</Badge>
              </div>
              <div className="space-y-4">
                {typography.body.sizes.map((size) => (
                  <div key={size.name} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{size.name}</span>
                      <div className="flex gap-3 text-xs text-muted-foreground">
                        <span>{size.size}</span>
                        <span>Weight: {size.weight}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: size.size, fontWeight: size.weight }}>
                      The quick brown fox jumps over the lazy dog
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <Separator className="my-16" />

        {/* Spacing */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="mb-2">Spacing Scale</h2>
            <p className="text-muted-foreground">
              Consistent spacing system used throughout the platform
            </p>
          </div>

          <Card className="p-6">
            <div className="space-y-4">
              {spacing.map((space) => (
                <div key={space.name} className="flex items-center gap-6">
                  <div className="w-20 text-sm text-muted-foreground">
                    {space.name}
                  </div>
                  <div
                    className="h-8 bg-gradient-to-r from-[#02542D] to-[#034A26] rounded"
                    style={{ width: space.value }}
                  />
                  <div className="flex gap-3 text-sm text-muted-foreground">
                    <code>{space.value}</code>
                    <span>({space.pixels})</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <Separator className="my-16" />

        {/* Border Radius */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="mb-2">Border Radius</h2>
            <p className="text-muted-foreground">
              Rounded corners used across components
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {borderRadius.map((radius) => (
              <Card key={radius.name} className="p-6">
                <div
                  className="h-24 bg-gradient-to-br from-purple-100 to-blue-100 mb-4 border-2 border-purple-200"
                  style={{ borderRadius: radius.value }}
                />
                <h4 className="mb-1 capitalize">{radius.name}</h4>
                <code className="text-xs text-muted-foreground block mb-2">
                  {radius.value}
                </code>
                <p className="text-sm text-muted-foreground">{radius.usage}</p>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-16" />

        {/* Component Examples */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="mb-2">Component Examples</h2>
            <p className="text-muted-foreground">
              Common UI components with brand styling
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Buttons */}
            <Card className="p-6">
              <h3 className="mb-4">Buttons</h3>
              <div className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-[#02542D] to-[#034A26] hover:opacity-90"
                >
                  Primary Button
                </Button>
                <Button variant="outline" className="w-full">
                  Secondary Button
                </Button>
                <Button variant="ghost" className="w-full">
                  Ghost Button
                </Button>
              </div>
            </Card>

            {/* Badges */}
            <Card className="p-6">
              <h3 className="mb-4">Badges</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                  Purple
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                  Blue
                </Badge>
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  Orange
                </Badge>
                <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-100">
                  Pink
                </Badge>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  Verified
                </Badge>
              </div>
            </Card>

            {/* Cards */}
            <Card className="p-6">
              <h3 className="mb-4">Cards</h3>
              <div className="space-y-3">
                <div className="p-4 rounded-lg border bg-white shadow-sm">
                  <div className="mb-2">Card Title</div>
                  <p className="text-sm text-muted-foreground">
                    Card with white background and subtle shadow
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                  <div className="mb-2">Colored Card</div>
                  <p className="text-sm text-muted-foreground">
                    Card with pastel background
                  </p>
                </div>
              </div>
            </Card>

            {/* Icon Colors */}
            <Card className="p-6">
              <h3 className="mb-4">Icon Styles</h3>
              <div className="grid grid-cols-4 gap-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 rounded-xl bg-purple-50">
                    <Check className="size-6 text-purple-600" />
                  </div>
                  <span className="text-xs text-muted-foreground">Purple</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 rounded-xl bg-blue-50">
                    <Check className="size-6 text-blue-600" />
                  </div>
                  <span className="text-xs text-muted-foreground">Blue</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 rounded-xl bg-orange-50">
                    <Check className="size-6 text-orange-600" />
                  </div>
                  <span className="text-xs text-muted-foreground">Orange</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 rounded-xl bg-pink-50">
                    <Check className="size-6 text-pink-600" />
                  </div>
                  <span className="text-xs text-muted-foreground">Pink</span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <Separator className="my-16" />

        {/* Usage Guidelines */}
        <section>
          <div className="mb-8">
            <h2 className="mb-2">Usage Guidelines</h2>
            <p className="text-muted-foreground">
              Best practices for applying brand elements
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-green-200 bg-green-50/50">
              <h3 className="mb-4 text-green-900">Do's</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <Check className="size-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Use the teal gradient (#02542D) for primary CTAs</span>
                </li>
                <li className="flex gap-2">
                  <Check className="size-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Apply warm colors for accent elements and highlights</span>
                </li>
                <li className="flex gap-2">
                  <Check className="size-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Use Volkhov serif for headings and titles</span>
                </li>
                <li className="flex gap-2">
                  <Check className="size-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Maintain consistent spacing using the spacing scale</span>
                </li>
                <li className="flex gap-2">
                  <Check className="size-4 text-green-600 shrink-0 mt-0.5" />
                  <span>Use colorful icons with matching pastel backgrounds</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-red-200 bg-red-50/50">
              <h3 className="mb-4 text-red-900">Don'ts</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <X className="size-4 text-red-600 shrink-0 mt-0.5" />
                  <span>Don't use non-brand colors for primary elements</span>
                </li>
                <li className="flex gap-2">
                  <X className="size-4 text-red-600 shrink-0 mt-0.5" />
                  <span>Don't mix serif and sans-serif fonts within headings</span>
                </li>
                <li className="flex gap-2">
                  <X className="size-4 text-red-600 shrink-0 mt-0.5" />
                  <span>Don't use arbitrary spacing values</span>
                </li>
                <li className="flex gap-2">
                  <X className="size-4 text-red-600 shrink-0 mt-0.5" />
                  <span>Don't override typography classes unnecessarily</span>
                </li>
                <li className="flex gap-2">
                  <X className="size-4 text-red-600 shrink-0 mt-0.5" />
                  <span>Don't use sharp corners on primary UI elements</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        <Separator className="my-16" />

        {/* UI Components & Styles */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="mb-2">UI Components & Styles</h2>
            <p className="text-muted-foreground">
              Comprehensive component styling guide for buttons, forms, cards, and other UI elements
            </p>
          </div>

          {/* Button Styles */}
          <div className="mb-12">
            <h3 className="mb-6">Button Styles</h3>
            
            {/* Primary Buttons */}
            <Card className="p-6 mb-6">
              <h4 className="mb-4">Primary Buttons (CTAs)</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <Button className="bg-gradient-to-r from-[#02542D] to-[#02542D]/90 hover:from-[#02542D]/90 hover:to-[#02542D]/80">
                      Primary Button
                    </Button>
                    <Button className="bg-gradient-to-r from-[#02542D] to-[#02542D]/90 hover:from-[#02542D]/90 hover:to-[#02542D]/80" size="sm">
                      Small
                    </Button>
                    <Button className="bg-gradient-to-r from-[#02542D] to-[#02542D]/90 hover:from-[#02542D]/90 hover:to-[#02542D]/80" size="lg">
                      Large
                    </Button>
                  </div>
                  <code className="text-xs text-muted-foreground block">
                    className="bg-gradient-to-r from-[#02542D] to-[#02542D]/90 hover:from-[#02542D]/90 hover:to-[#02542D]/80"
                  </code>
                </div>
                
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <Button className="bg-gradient-to-r from-[#DF6951] to-[#DF6951]/90 hover:from-[#DF6951]/90 hover:to-[#DF6951]/80">
                      <Search className="mr-2 size-4" />
                      Secondary CTA
                    </Button>
                    <Button className="bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:opacity-90">
                      Warm Gradient
                    </Button>
                  </div>
                  <code className="text-xs text-muted-foreground block">
                    className="bg-gradient-to-r from-[#DF6951] to-[#DF6951]/90"
                  </code>
                </div>
              </div>
            </Card>

            {/* Secondary Buttons */}
            <Card className="p-6 mb-6">
              <h4 className="mb-4">Secondary & Outline Buttons</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <Button variant="outline">
                      Outline Default
                    </Button>
                    <Button variant="outline" className="border-[#02542D] text-[#02542D] hover:bg-[#02542D]/10">
                      Outline Teal
                    </Button>
                    <Button variant="outline" className="border-[#DF6951] text-[#DF6951] hover:bg-[#DF6951]/10">
                      Outline Orange
                    </Button>
                  </div>
                  <code className="text-xs text-muted-foreground block">
                    variant="outline" className="border-[#02542D] text-[#02542D] hover:bg-[#02542D]/10"
                  </code>
                </div>
              </div>
            </Card>

            {/* Ghost & Icon Buttons */}
            <Card className="p-6 mb-6">
              <h4 className="mb-4">Ghost & Icon Buttons</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <Button variant="ghost">
                      Ghost Button
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Heart className="size-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="size-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="border-[#02542D] text-[#02542D] hover:bg-[#02542D]/10">
                      <Search className="size-5" />
                    </Button>
                  </div>
                  <code className="text-xs text-muted-foreground block">
                    variant="ghost" | variant="outline" size="icon"
                  </code>
                </div>
              </div>
            </Card>

            {/* Button States */}
            <Card className="p-6">
              <h4 className="mb-4">Button States</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <Button className="bg-gradient-to-r from-[#02542D] to-[#02542D]/90">
                      Default
                    </Button>
                    <Button className="bg-gradient-to-r from-[#02542D] to-[#02542D]/90" disabled>
                      Disabled
                    </Button>
                    <Button className="bg-gradient-to-r from-[#02542D] to-[#02542D]/90">
                      <span className="animate-spin mr-2">⏳</span>
                      Loading
                    </Button>
                  </div>
                  <code className="text-xs text-muted-foreground block">
                    disabled prop for disabled state
                  </code>
                </div>
              </div>
            </Card>
          </div>

          {/* Form Input Styles */}
          <div className="mb-12">
            <h3 className="mb-6">Form Input Styles</h3>
            
            {/* Text Inputs */}
            <Card className="p-6 mb-6">
              <h4 className="mb-4">Text Inputs & Labels</h4>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Label Text
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter text..." 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02542D] focus:border-transparent"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Helper text goes here</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Required Field <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Required input..." 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02542D] focus:border-transparent"
                    required
                  />
                </div>
                
                <code className="text-xs text-muted-foreground block">
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02542D] focus:border-transparent"
                </code>
              </div>
            </Card>

            {/* Select & Dropdown */}
            <Card className="p-6 mb-6">
              <h4 className="mb-4">Select & Dropdown Inputs</h4>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Option
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02542D] focus:border-transparent">
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                </div>
                
                <code className="text-xs text-muted-foreground block">
                  Same className as text inputs for consistency
                </code>
              </div>
            </Card>

            {/* Textarea */}
            <Card className="p-6 mb-6">
              <h4 className="mb-4">Textarea</h4>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea 
                    placeholder="Enter your message..." 
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02542D] focus:border-transparent resize-none"
                  />
                </div>
                
                <code className="text-xs text-muted-foreground block">
                  Add resize-none for fixed textarea height
                </code>
              </div>
            </Card>

            {/* Checkbox & Radio */}
            <Card className="p-6 mb-6">
              <h4 className="mb-4">Checkboxes & Radio Buttons</h4>
              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="check1" className="size-4 text-[#02542D] border-gray-300 rounded focus:ring-[#02542D]" />
                    <label htmlFor="check1" className="text-sm">Checkbox option 1</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="check2" className="size-4 text-[#02542D] border-gray-300 rounded focus:ring-[#02542D]" checked readOnly />
                    <label htmlFor="check2" className="text-sm">Checkbox option 2 (checked)</label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="radio" name="radio" id="radio1" className="size-4 text-[#02542D] border-gray-300 focus:ring-[#02542D]" />
                    <label htmlFor="radio1" className="text-sm">Radio option 1</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="radio" name="radio" id="radio2" className="size-4 text-[#02542D] border-gray-300 focus:ring-[#02542D]" checked readOnly />
                    <label htmlFor="radio2" className="text-sm">Radio option 2 (selected)</label>
                  </div>
                </div>
              </div>
            </Card>

            {/* Phone Input with OTP */}
            <Card className="p-6 mb-6">
              <h4 className="mb-4">Phone Input with OTP Verification</h4>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="tel" 
                      placeholder="Enter your Phone Number" 
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02542D] focus:border-transparent"
                    />
                    <Button className="bg-[#DF6951] hover:bg-[#DF6951]/90">
                      Send OTP
                    </Button>
                  </div>
                </div>
                
                <code className="text-xs text-muted-foreground block">
                  Phone input with Send OTP button inline (orange button)
                </code>
              </div>
            </Card>

            {/* OTP Input */}
            <Card className="p-6 mb-6">
              <h4 className="mb-4">OTP Verification Input</h4>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Enter OTP <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Enter 6-digit OTP" 
                      maxLength={6}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02542D] focus:border-transparent"
                    />
                    <Button className="bg-[#02542D] hover:bg-[#02542D]/90">
                      <Shield className="mr-1 size-4" />
                      Verify
                    </Button>
                  </div>
                </div>
                
                <code className="text-xs text-muted-foreground block">
                  OTP input with Verify button (teal color for verification)
                </code>
              </div>
            </Card>

            {/* Number Input */}
            <Card className="p-6 mb-6">
              <h4 className="mb-4">Number Inputs</h4>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of People <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="number" 
                    placeholder="0" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02542D] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Budget <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="number" 
                    placeholder="0" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02542D] focus:border-transparent"
                  />
                </div>
                
                <code className="text-xs text-muted-foreground block">
                  type="number" for numeric inputs
                </code>
              </div>
            </Card>

            {/* Email Input */}
            <Card className="p-6">
              <h4 className="mb-4">Email Input</h4>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    placeholder="Enter your Email" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02542D] focus:border-transparent"
                  />
                </div>
                
                <code className="text-xs text-muted-foreground block">
                  type="email" for email validation
                </code>
              </div>
            </Card>
          </div>

          {/* Advanced Form Components */}
          <div className="mb-12">
            <h3 className="mb-6">Advanced Form Components (Venue Form)</h3>
            
            {/* Date Range Picker */}
            <Card className="p-6 mb-6">
              <h4 className="mb-4">Date Range Picker</h4>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Dates <span className="text-red-500">*</span>
                  </label>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-10"
                  >
                    <Calendar className="mr-2 size-4" />
                    <span className="text-muted-foreground">Pick a date range</span>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    Uses Popover + Calendar components from shadcn/ui
                  </p>
                </div>
                
                <code className="text-xs text-muted-foreground block">
                  {`<Popover>\n  <PopoverTrigger asChild>\n    <Button variant="outline">\n      <Calendar className="mr-2 size-4" />\n      {dateRange.from ? format(dateRange.from, "LLL dd, y") : "Pick date"}\n    </Button>\n  </PopoverTrigger>\n  <PopoverContent className="w-auto p-0" align="start">\n    <CalendarComponent mode="range" selected={dateRange} />\n  </PopoverContent>\n</Popover>`}
                </code>
              </div>
            </Card>

            {/* Select Dropdown (Package) */}
            <Card className="p-6 mb-6">
              <h4 className="mb-4">Select Dropdown (shadcn/ui)</h4>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Package
                  </label>
                  <div className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-muted-foreground flex items-center justify-between">
                    <span>Select Package</span>
                    <ChevronDown className="size-4" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Uses Select, SelectTrigger, SelectContent, SelectItem from shadcn/ui
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Event Type <span className="text-red-500">*</span>
                  </label>
                  <div className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-muted-foreground flex items-center justify-between">
                    <span>Select Event Type</span>
                    <ChevronDown className="size-4" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Options: Wedding, Pre-Wedding, Engagement, Reception, Sangeet, Mehendi, Other
                  </p>
                </div>
                
                <code className="text-xs text-muted-foreground block">
                  {`<Select value={value} onValueChange={setValue}>\n  <SelectTrigger className="mt-1">\n    <SelectValue placeholder="Select Package" />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="option1">Option 1</SelectItem>\n  </SelectContent>\n</Select>`}
                </code>
              </div>
            </Card>

            {/* Checkbox with Label */}
            <Card className="p-6 mb-6">
              <h4 className="mb-4">Checkbox with Text Label</h4>
              <div className="space-y-4 max-w-md">
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="flexible" 
                    className="size-4 text-[#02542D] border-gray-300 rounded focus:ring-[#02542D]"
                  />
                  <label htmlFor="flexible" className="text-sm cursor-pointer">
                    I have flexible dates
                  </label>
                </div>
                
                <code className="text-xs text-muted-foreground block">
                  Checkbox with clickable label using htmlFor attribute
                </code>
              </div>
            </Card>

            {/* Multi-step Form Buttons */}
            <Card className="p-6">
              <h4 className="mb-4">Multi-step Form Actions</h4>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <ChevronLeft className="mr-2 size-4" />
                    Back
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-[#02542D] to-[#02542D]/90 hover:from-[#02542D]/90 hover:to-[#02542D]/80">
                    Next
                    <ChevronRight className="ml-2 size-4" />
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <ChevronLeft className="mr-2 size-4" />
                    Back
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-[#02542D] to-[#02542D]/90 hover:from-[#02542D]/90 hover:to-[#02542D]/80">
                    <Mail className="mr-2 size-5" />
                    Submit Enquiry
                  </Button>
                </div>
                
                <code className="text-xs text-muted-foreground block">
                  Back button (outline) + Primary action button with icons
                </code>
              </div>
            </Card>
          </div>

          {/* Tab Components */}
          <div className="mb-12">
            <h3 className="mb-6">Tab Components (Venue Form)</h3>
            
            <Card className="p-6">
              <h4 className="mb-4">Gradient Tab Switcher</h4>
              <div className="space-y-4">
                <div className="flex gap-2 p-1 bg-gray-100 rounded-full w-fit">
                  <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#02542D] to-[#DF6951] text-white transition-all duration-200">
                    <Sparkles className="size-4" />
                    <span className="text-sm">Concierge</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#02542D]/10 to-[#DF6951]/10 transition-all duration-200">
                    <Send className="size-4" />
                    <span className="text-sm">Venue</span>
                  </button>
                </div>
                
                <code className="text-xs text-muted-foreground block">
                  {`Active: bg-gradient-to-r from-[#02542D] to-[#DF6951] text-white\nInactive: from-[#02542D]/10 to-[#DF6951]/10`}
                </code>
              </div>
            </Card>
          </div>

          {/* Card Styles */}
          <div className="mb-12">
            <h3 className="mb-6">Card Styles</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Cards */}
              <Card className="p-6">
                <h4 className="mb-4">Basic Card</h4>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg border bg-white shadow-sm">
                    <h4 className="mb-2">White Card</h4>
                    <p className="text-sm text-muted-foreground">
                      Default white background with border and subtle shadow
                    </p>
                  </div>
                  <code className="text-xs text-muted-foreground block">
                    className="p-4 rounded-lg border bg-white shadow-sm"
                  </code>
                </div>
              </Card>

              {/* Colored Cards */}
              <Card className="p-6">
                <h4 className="mb-4">Colored Cards</h4>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                    <h4 className="mb-2 text-purple-900">Purple Card</h4>
                    <p className="text-sm text-purple-700">
                      Pastel background with matching border
                    </p>
                  </div>
                  <code className="text-xs text-muted-foreground block">
                    bg-purple-50 border border-purple-100
                  </code>
                </div>
              </Card>

              {/* Gradient Cards */}
              <Card className="p-6">
                <h4 className="mb-4">Gradient Cards</h4>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-[#02542D] to-[#034A26] text-white">
                    <h4 className="mb-2 text-white">Gradient Card</h4>
                    <p className="text-sm text-white/90">
                      Used for featured content and highlights
                    </p>
                  </div>
                  <code className="text-xs text-muted-foreground block">
                    bg-gradient-to-br from-[#02542D] to-[#034A26]
                  </code>
                </div>
              </Card>

              {/* Hover Cards */}
              <Card className="p-6">
                <h4 className="mb-4">Interactive Cards</h4>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg border bg-white shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                    <h4 className="mb-2">Hover Card</h4>
                    <p className="text-sm text-muted-foreground">
                      Hover to see lift effect
                    </p>
                  </div>
                  <code className="text-xs text-muted-foreground block">
                    hover:shadow-xl hover:scale-[1.02] transition-all
                  </code>
                </div>
              </Card>
            </div>
          </div>

          {/* Badge Styles */}
          <div className="mb-12">
            <h3 className="mb-6">Badge Styles</h3>
            
            <Card className="p-6">
              <h4 className="mb-4">Badge Variants</h4>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                    <Check className="mr-1 size-3" />
                    Purple
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                    <Star className="mr-1 size-3" />
                    Blue
                  </Badge>
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                    <Crown className="mr-1 size-3" />
                    Orange
                  </Badge>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    <BadgeCheck className="mr-1 size-3" />
                    Verified
                  </Badge>
                </div>
                
                <code className="text-xs text-muted-foreground block">
                  Custom: className="bg-purple-100 text-purple-700 hover:bg-purple-100"
                </code>
              </div>
            </Card>
          </div>

          {/* Special Components */}
          <div className="mb-12">
            <h3 className="mb-6">Special Components</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Verified Badge */}
              <Card className="p-6">
                <h4 className="mb-4">Verified Badge</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-md border border-gray-200 w-fit">
                    <div className="bg-blue-500 rounded-full p-1 flex items-center justify-center">
                      <Check className="size-3 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-gray-800">Verified</span>
                  </div>
                  <code className="text-xs text-muted-foreground block">
                    Blue checkmark with "Verified" text in white card
                  </code>
                </div>
              </Card>

              {/* Gradient Icons */}
              <Card className="p-6">
                <h4 className="mb-4">Gradient Icon Backgrounds</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#02542D]/10 to-[#DF6951]/10">
                      <Sparkles className="size-4 text-[#DF6951]" />
                      <span className="text-sm text-[#02542D]">Featured</span>
                    </div>
                  </div>
                  <code className="text-xs text-muted-foreground block">
                    bg-gradient-to-r from-[#02542D]/10 to-[#DF6951]/10
                  </code>
                </div>
              </Card>

              {/* Progress Indicator */}
              <Card className="p-6">
                <h4 className="mb-4">Progress Steps</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full bg-[#02542D] text-white flex items-center justify-center">
                      1
                    </div>
                    <div className="h-0.5 w-12 bg-[#02542D]"></div>
                    <div className="size-8 rounded-full bg-[#02542D] text-white flex items-center justify-center">
                      2
                    </div>
                    <div className="h-0.5 w-12 bg-gray-200"></div>
                    <div className="size-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                      3
                    </div>
                  </div>
                  <code className="text-xs text-muted-foreground block">
                    Circular steps with connecting lines
                  </code>
                </div>
              </Card>

              {/* Search Bar */}
              <Card className="p-6">
                <h4 className="mb-4">Search Bar</h4>
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search destinations..." 
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02542D] focus:border-transparent"
                    />
                  </div>
                  <code className="text-xs text-muted-foreground block">
                    Icon positioned with absolute left-3
                  </code>
                </div>
              </Card>
            </div>
          </div>

          {/* Shadow & Elevation */}
          <div className="mb-12">
            <h3 className="mb-6">Shadow & Elevation Scale</h3>
            
            <Card className="p-6">
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <div className="h-24 bg-white rounded-lg shadow-sm mb-3"></div>
                  <h4 className="mb-1">Small</h4>
                  <code className="text-xs text-muted-foreground">shadow-sm</code>
                </div>
                <div>
                  <div className="h-24 bg-white rounded-lg shadow-md mb-3"></div>
                  <h4 className="mb-1">Medium</h4>
                  <code className="text-xs text-muted-foreground">shadow-md</code>
                </div>
                <div>
                  <div className="h-24 bg-white rounded-lg shadow-lg mb-3"></div>
                  <h4 className="mb-1">Large</h4>
                  <code className="text-xs text-muted-foreground">shadow-lg</code>
                </div>
                <div>
                  <div className="h-24 bg-white rounded-lg shadow-xl mb-3"></div>
                  <h4 className="mb-1">Extra Large</h4>
                  <code className="text-xs text-muted-foreground">shadow-xl</code>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <Separator className="my-16" />

        {/* Icon System */}
        <section>
          <div className="mb-8">
            <h2 className="mb-2">Icon System</h2>
            <p className="text-muted-foreground">
              Comprehensive icon usage across all pages and sections using Lucide React
            </p>
          </div>

          {/* Venue Details Page Icons */}
          <div className="mb-12">
            <h3 className="mb-6">Venue Details Page</h3>
            
            <div className="space-y-6">
              {/* Header Actions */}
              <Card className="p-6">
                <div className="mb-4">
                  <h4 className="mb-2">Header & Actions</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Navigation and interaction icons in the page header
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <ArrowLeft className="size-5 text-[#DF6951]" />
                    <span className="text-sm">Back</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="size-5 text-[#DF6951]" />
                    <span className="text-sm">Save/Favorite</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Share2 className="size-5 text-[#DF6951]" />
                    <span className="text-sm">Share</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowLeftRight className="size-5 text-[#DF6951]" />
                    <span className="text-sm">Compare</span>
                  </div>
                </div>
              </Card>

              {/* Venue Info & Rating */}
              <Card className="p-6">
                <div className="mb-4">
                  <h4 className="mb-2">Venue Information</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Location, ratings, and basic venue details
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-5 text-[#DF6951]" />
                    <span className="text-sm">Location</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="size-5 text-amber-500" />
                    <span className="text-sm">Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="size-5 text-blue-600" />
                    <span className="text-sm">Capacity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="size-5 text-green-600" />
                    <span className="text-sm">Verified</span>
                  </div>
                </div>
              </Card>

              {/* Why Couples Love (Highlights) */}
              <Card className="p-6">
                <div className="mb-4">
                  <h4 className="mb-2">Why Couples Love (Highlights)</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Key venue features and unique selling points
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-5 text-purple-600" />
                    <span className="text-sm">Fireworks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Volume2 className="size-5 text-blue-600" />
                    <span className="text-sm">Sound Policy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dog className="size-5 text-orange-600" />
                    <span className="text-sm">Pet Friendly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wine className="size-5 text-pink-600" />
                    <span className="text-sm">Open Bar</span>
                  </div>
                </div>
              </Card>

              {/* Venue Areas */}
              <Card className="p-6">
                <div className="mb-4">
                  <h4 className="mb-2">Venue Areas</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Different event spaces within the venue
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="size-5 text-blue-600" />
                    <span className="text-sm">Banquet (Indoor)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sunset className="size-5 text-orange-600" />
                    <span className="text-sm">Terrace (Outdoor)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trees className="size-5 text-green-600" />
                    <span className="text-sm">Lawn (Outdoor)</span>
                  </div>
                </div>
              </Card>

              {/* Amenities */}
              <Card className="p-6">
                <div className="mb-4">
                  <h4 className="mb-2">Amenities</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Services and facilities available at the venue
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Wifi className="size-5 text-blue-600" />
                    <span className="text-sm">WiFi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Music className="size-5 text-purple-600" />
                    <span className="text-sm">Sound System</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Utensils className="size-5 text-orange-600" />
                    <span className="text-sm">Catering</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="size-5 text-pink-600" />
                    <span className="text-sm">Photo Spots</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-5 text-purple-600" />
                    <span className="text-sm">Decor Services</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wine className="size-5 text-pink-600" />
                    <span className="text-sm">Bar & Beverages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="size-5 text-blue-600" />
                    <span className="text-sm">Valet Parking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-5 text-green-600" />
                    <span className="text-sm">24/7 Support</span>
                  </div>
                </div>
              </Card>

              {/* Good to Know Section */}
              <Card className="p-6">
                <div className="mb-4">
                  <h4 className="mb-2">Good to Know (Policies)</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Venue policies and important information
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="size-5 text-blue-600" />
                    <span className="text-sm">Minimum Pax</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="size-5 text-purple-600" />
                    <span className="text-sm">Room/Buyout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wine className="size-5 text-pink-600" />
                    <span className="text-sm">Alcohol Policy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Music className="size-5 text-purple-600" />
                    <span className="text-sm">DJ Policy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="size-5 text-pink-600" />
                    <span className="text-sm">Decor Policy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Receipt className="size-5 text-orange-600" />
                    <span className="text-sm">Payment Terms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Utensils className="size-5 text-orange-600" />
                    <span className="text-sm">Catering Policy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="size-5 text-blue-600" />
                    <span className="text-sm">Accommodation</span>
                  </div>
                </div>
              </Card>

              {/* Weather Section */}
              <Card className="p-6">
                <div className="mb-4">
                  <h4 className="mb-2">Weather & Climate</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Weather information and climate indicators
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <CloudSun className="size-5 text-blue-600" />
                    <span className="text-sm">Weather</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="size-5 text-orange-600" />
                    <span className="text-sm">Temperature</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="size-5 text-blue-600" />
                    <span className="text-sm">Humidity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="size-5 text-cyan-600" />
                    <span className="text-sm">Wind Speed</span>
                  </div>
                </div>
              </Card>

              {/* Packages Section */}
              <Card className="p-6">
                <div className="mb-4">
                  <h4 className="mb-2">Packages & Booking</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Package features and booking actions
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-5 text-purple-600" />
                    <span className="text-sm">Number of Days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="size-5 text-blue-600" />
                    <span className="text-sm">Total Pax</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="size-5 text-purple-600" />
                    <span className="text-sm">Rooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-5 text-green-600" />
                    <span className="text-sm">Features/Inclusions</span>
                  </div>
                </div>
              </Card>

              {/* Contact Section */}
              <Card className="p-6">
                <div className="mb-4">
                  <h4 className="mb-2">Contact & Communication</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contact methods and inquiry actions
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="size-5 text-blue-600" />
                    <span className="text-sm">Email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="size-5 text-green-600" />
                    <span className="text-sm">Phone</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="size-5 text-purple-600" />
                    <span className="text-sm">Message/Chat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="size-5 text-[#DF6951]" />
                    <span className="text-sm">View More/Navigate</span>
                  </div>
                </div>
              </Card>

              {/* Image Gallery Navigation */}
              <Card className="p-6">
                <div className="mb-4">
                  <h4 className="mb-2">Gallery & Navigation</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Image carousel and modal controls
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <ChevronLeft className="size-5 text-[#02542D]" />
                    <span className="text-sm">Previous</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="size-5 text-[#02542D]" />
                    <span className="text-sm">Next</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronDown className="size-5 text-muted-foreground" />
                    <span className="text-sm">Expand</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronUp className="size-5 text-muted-foreground" />
                    <span className="text-sm">Collapse</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="size-5 text-muted-foreground" />
                    <span className="text-sm">Close</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Destinations Page Icons */}
          <div className="mb-12">
            <h3 className="mb-6">Destinations Page</h3>
            <Card className="p-6">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Search, filtering, and destination cards
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Search className="size-5 text-[#02542D]" />
                  <span className="text-sm">Search</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-[#DF6951]" />
                  <span className="text-sm">Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="size-5 text-amber-500" />
                  <span className="text-sm">Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-5 text-green-600" />
                  <span className="text-sm">Trending</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-5 text-purple-600" />
                  <span className="text-sm">Date Picker</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="size-5 text-blue-600" />
                  <span className="text-sm">Guest Count</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Planners Page Icons */}
          <div className="mb-12">
            <h3 className="mb-6">Planners Page</h3>
            <Card className="p-6">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Wedding planner profiles and credentials
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Search className="size-5 text-[#02542D]" />
                  <span className="text-sm">Search</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-[#DF6951]" />
                  <span className="text-sm">Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="size-5 text-amber-500" />
                  <span className="text-sm">Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="size-5 text-purple-600" />
                  <span className="text-sm">Awards/Credentials</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-5 text-blue-600" />
                  <span className="text-sm">Experience/Years</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChevronDown className="size-5 text-muted-foreground" />
                  <span className="text-sm">Dropdown/Filters</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Vendors Page Icons */}
          <div className="mb-12">
            <h3 className="mb-6">Vendors Page</h3>
            <Card className="p-6">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Photographers, videographers, and decorator profiles
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Search className="size-5 text-[#02542D]" />
                  <span className="text-sm">Search</span>
                </div>
                <div className="flex items-center gap-2">
                  <Camera className="size-5 text-pink-600" />
                  <span className="text-sm">Photographer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="size-5 text-blue-600" />
                  <span className="text-sm">Videographer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Palette className="size-5 text-purple-600" />
                  <span className="text-sm">Decorator</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-[#DF6951]" />
                  <span className="text-sm">Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="size-5 text-amber-500" />
                  <span className="text-sm">Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="size-5 text-purple-600" />
                  <span className="text-sm">Awards</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChevronDown className="size-5 text-muted-foreground" />
                  <span className="text-sm">Filters</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Marketplace Page Icons */}
          <div className="mb-12">
            <h3 className="mb-6">Marketplace Page</h3>
            <Card className="p-6">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Shopping, products, and e-commerce features
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Search className="size-5 text-[#02542D]" />
                  <span className="text-sm">Search</span>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="size-5 text-[#02542D]" />
                  <span className="text-sm">Filter</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="size-5 text-[#DF6951]" />
                  <span className="text-sm">Cart</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="size-5 text-pink-600" />
                  <span className="text-sm">Wishlist</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="size-5 text-amber-500" />
                  <span className="text-sm">Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="size-5 text-blue-600" />
                  <span className="text-sm">Tags/Categories</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-5 text-green-600" />
                  <span className="text-sm">Trending</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="size-5 text-purple-600" />
                  <span className="text-sm">Featured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="size-5 text-amber-600" />
                  <span className="text-sm">Premium</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="size-5 text-pink-600" />
                  <span className="text-sm">Gift Registry</span>
                </div>
                <div className="flex items-center gap-2">
                  <Percent className="size-5 text-green-600" />
                  <span className="text-sm">Discount</span>
                </div>
                <div className="flex items-center gap-2">
                  <X className="size-5 text-muted-foreground" />
                  <span className="text-sm">Remove/Close</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChevronDown className="size-5 text-muted-foreground" />
                  <span className="text-sm">Dropdown</span>
                </div>
                <div className="flex items-center gap-2">
                  <Grid3x3 className="size-5 text-[#02542D]" />
                  <span className="text-sm">Grid View</span>
                </div>
                <div className="flex items-center gap-2">
                  <List className="size-5 text-[#02542D]" />
                  <span className="text-sm">List View</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Inspirations Page Icons */}
          <div className="mb-12">
            <h3 className="mb-6">Inspirations Page</h3>
            <Card className="p-6">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Gallery and inspiration boards
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Search className="size-5 text-[#02542D]" />
                  <span className="text-sm">Search</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="size-5 text-pink-600" />
                  <span className="text-sm">Like/Save</span>
                </div>
                <div className="flex items-center gap-2">
                  <Share2 className="size-5 text-blue-600" />
                  <span className="text-sm">Share</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="size-5 text-purple-600" />
                  <span className="text-sm">Views</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Tours Page Icons */}
          <div className="mb-12">
            <h3 className="mb-6">Tours & Activities Page</h3>
            <Card className="p-6">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Tour packages and activity listings
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-[#DF6951]" />
                  <span className="text-sm">Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-5 text-blue-600" />
                  <span className="text-sm">Duration</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="size-5 text-amber-500" />
                  <span className="text-sm">Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="size-5 text-blue-600" />
                  <span className="text-sm">Group Size</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="size-5 text-pink-600" />
                  <span className="text-sm">Favorite</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-5 text-purple-600" />
                  <span className="text-sm">Date Selection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="size-5 text-[#02542D]" />
                  <span className="text-sm">Filter</span>
                </div>
                <div className="flex items-center gap-2">
                  <Search className="size-5 text-[#02542D]" />
                  <span className="text-sm">Search</span>
                </div>
                <div className="flex items-center gap-2">
                  <X className="size-5 text-muted-foreground" />
                  <span className="text-sm">Clear/Close</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChevronDown className="size-5 text-muted-foreground" />
                  <span className="text-sm">Expand Options</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Home/Landing Page Icons */}
          <div className="mb-12">
            <h3 className="mb-6">Home & Landing Pages</h3>
            <Card className="p-6">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Hero sections and service highlights
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Play className="size-5 text-[#DF6951]" />
                  <span className="text-sm">Play Video</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="size-5 text-[#DF6951]" />
                  <span className="text-sm">Call to Action</span>
                </div>
                <div className="flex items-center gap-2">
                  <Satellite className="size-5 text-purple-600" />
                  <span className="text-sm">Weather/Tech</span>
                </div>
                <div className="flex items-center gap-2">
                  <Plane className="size-5 text-blue-600" />
                  <span className="text-sm">Flights</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="size-5 text-orange-600" />
                  <span className="text-sm">Local Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="size-5 text-[#02542D]" />
                  <span className="text-sm">Customization</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Icon Usage Guidelines */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <h4 className="mb-4">Icon Usage Guidelines</h4>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <Check className="size-4 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Use Lucide React Icons</p>
                  <p className="text-muted-foreground">All icons are imported from the lucide-react package for consistency</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Check className="size-4 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Apply Brand Colors</p>
                  <p className="text-muted-foreground">Primary icons use #DF6951 (orange), #02542D (teal), or contextual colors (blue, purple, green, pink) based on their function</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Check className="size-4 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Consistent Sizing</p>
                  <p className="text-muted-foreground">Use size-4 (16px), size-5 (20px), or size-6 (24px) for icons depending on context and hierarchy</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Check className="size-4 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Pair with Backgrounds</p>
                  <p className="text-muted-foreground">Feature icons often use rounded backgrounds with matching pastel colors (e.g., bg-purple-50 with text-purple-600)</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Check className="size-4 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Interactive States</p>
                  <p className="text-muted-foreground">Add hover effects with color transitions and scale transforms for clickable icons</p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
