import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

export const Weather = () => {
  return (
    <div>
      <h2 className="mb-6">Weather & Climate</h2>
      <Card className="p-6">
        {/* Current Weather */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Current Weather
              </p>
              <h3 className="mb-1 flex items-center gap-2">
                <svg
                  className="size-8 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M11 19v2m0-6v2m4-2v2m0 2v2m-8-4v2"
                  />
                </svg>
                Moderate Rain
              </h3>
              <p className="text-sm text-muted-foreground">Province of Turin</p>
            </div>
            <div className="text-right">
              <p className="text-5xl" style={{ fontFamily: "Volkhov, serif" }}>
                11°C
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Feels like 10°C
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Weather Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Temperature Range */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-white">
                <svg
                  className="size-5 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">Temp Range</p>
            </div>
            <p className="text-xl" style={{ fontFamily: "Volkhov, serif" }}>
              10°C - 14°C
            </p>
            <p className="text-xs text-muted-foreground mt-1">Min / Max</p>
          </div>

          {/* Humidity */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-white">
                <svg
                  className="size-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                  />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">Humidity</p>
            </div>
            <p className="text-xl" style={{ fontFamily: "Volkhov, serif" }}>
              60%
            </p>
            <p className="text-xs text-muted-foreground mt-1">Moderate</p>
          </div>

          {/* Wind Speed */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-50 to-cyan-100/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-white">
                <svg
                  className="size-5 text-cyan-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">Wind</p>
            </div>
            <p className="text-xl" style={{ fontFamily: "Volkhov, serif" }}>
              4.1 m/s
            </p>
            <p className="text-xs text-muted-foreground mt-1">SE Direction</p>
          </div>

          {/* Pressure */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-white">
                <svg
                  className="size-5 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">Pressure</p>
            </div>
            <p className="text-xl" style={{ fontFamily: "Volkhov, serif" }}>
              1021 hPa
            </p>
            <p className="text-xs text-muted-foreground mt-1">Sea Level</p>
          </div>

          {/* Visibility */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-white">
                <svg
                  className="size-5 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">Visibility</p>
            </div>
            <p className="text-xl" style={{ fontFamily: "Volkhov, serif" }}>
              10 km
            </p>
            <p className="text-xs text-muted-foreground mt-1">Clear</p>
          </div>

          {/* Cloud Coverage */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-white">
                <svg
                  className="size-5 text-slate-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">Clouds</p>
            </div>
            <p className="text-xl" style={{ fontFamily: "Volkhov, serif" }}>
              83%
            </p>
            <p className="text-xs text-muted-foreground mt-1">Mostly Cloudy</p>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Additional Details */}
        <div className="grid md:grid-cols-2 gap-4">
          <div
            className="flex items-center gap-3 p-3 rounded-lg"
            style={{
              backgroundColor: "rgba(2, 84, 45, 0.05)",
            }}
          >
            <div className="p-2 rounded-lg bg-white">
              <svg
                className="size-5 text-[#02542D]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rainfall (1h)</p>
              <p className="font-medium">2.73 mm</p>
            </div>
          </div>

          <div
            className="flex items-center gap-3 p-3 rounded-lg"
            style={{
              backgroundColor: "rgba(223, 105, 81, 0.05)",
            }}
          >
            <div className="p-2 rounded-lg bg-white">
              <svg
                className="size-5 text-[#DF6951]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Ground Level Pressure
              </p>
              <p className="font-medium">910 hPa</p>
            </div>
          </div>

          <div
            className="flex items-center gap-3 p-3 rounded-lg"
            style={{
              backgroundColor: "rgba(2, 84, 45, 0.05)",
            }}
          >
            <div className="p-2 rounded-lg bg-white">
              <svg
                className="size-5 text-[#02542D]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sunrise</p>
              <p className="font-medium">7:13 AM</p>
            </div>
          </div>

          <div
            className="flex items-center gap-3 p-3 rounded-lg"
            style={{
              backgroundColor: "rgba(223, 105, 81, 0.05)",
            }}
          >
            <div className="p-2 rounded-lg bg-white">
              <svg
                className="size-5 text-[#DF6951]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sunset</p>
              <p className="font-medium">7:36 PM</p>
            </div>
          </div>
        </div>

        {/* Weather Info */}
        <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
          <div className="flex items-start gap-3">
            <svg
              className="size-5 text-blue-600 mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="text-sm font-medium text-blue-900 mb-1">
                Best Time to Visit
              </p>
              <p className="text-sm text-blue-800">
                Weather data shows current conditions. For weddings, we
                recommend checking the 7-day forecast and considering the
                destination's seasonal patterns. Contact our concierge for
                personalized recommendations.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
