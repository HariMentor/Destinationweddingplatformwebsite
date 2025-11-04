"use client";

import { ArrowLeft, Check, Copy, X } from "lucide-react";
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
      </div>
    </div>
  );
}
