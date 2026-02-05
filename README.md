# Animated Weather Card

A custom weather card for [Home Assistant](https://www.home-assistant.io/) with CSS animations, dynamic day/night backgrounds, and multi-day or hourly forecasts.

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://hacs.xyz/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)]()

<!-- Add your screenshots here -->
<!-- ![Day](screenshots/day.png) -->
<!-- ![Night](screenshots/night.png) -->

## Features

- **Dynamic backgrounds** — gradient changes based on weather condition and day/night cycle (uses `sun.sun` entity)
- **CSS animations** — rain, snow, hail, lightning, drifting clouds, twinkling stars
- **SVG weather icons** — crisp at any resolution, consistent across platforms (emoji fallback available)
- **Forecasts** — daily, hourly, or twice-daily via HA's forecast subscribe API (with legacy fallback)
- **External sensors** — override temperature, pressure, humidity, or wind speed with dedicated sensor entities
- **Internationalization** — English, Polish, German, French, Spanish (auto-detected from HA language setting)
- **Themeable** — CSS custom properties for colors, sizes, and radii
- **Visual editor** — full GUI configuration in the HA dashboard editor
- **Lightweight** — pure CSS animations, zero external dependencies, selective DOM updates for performance

## Installation

### HACS (recommended)

1. Open HACS → **Frontend**
2. Click the three dots (⋮) → **Custom repositories**
3. Add repository URL: `https://github.com/smalarz/animated-weather-card`
4. Category: **Lovelace**
5. Click **Add** → find "Animated Weather Card" → **Install**
6. Restart Home Assistant

### Manual

1. Download `animated-weather-card.js` from the [latest release](https://github.com/smalarz/animated-weather-card/releases)
2. Copy to `/config/www/animated-weather-card.js`
3. Go to **Settings → Dashboards → ⋮ → Resources → Add Resource**
   - URL: `/local/animated-weather-card.js`
   - Type: **JavaScript Module**
4. Hard-refresh your browser: `Ctrl+Shift+R`

## Configuration

Add the card via the visual editor (search for "Animated Weather Card") or manually in YAML:

### Minimal

```yaml
type: custom:animated-weather-card
entity: weather.home
```

### Full

```yaml
type: custom:animated-weather-card
entity: weather.home
name: My Weather
forecast_type: daily          # daily | hourly | twice_daily
max_items: 5                  # 1–10
show_current: true
show_forecast: true
show_animations: true
show_wind: true
show_humidity: true
show_pressure: true
icon_style: svg               # svg | emoji
min_item_width: 65            # px, adjusts forecast grid
# Override with dedicated sensors (optional)
temperature_sensor: sensor.outdoor_temperature
pressure_sensor: sensor.atmospheric_pressure
humidity_sensor: sensor.outdoor_humidity
wind_speed_sensor: sensor.wind_speed
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Weather entity ID |
| `name` | string | entity name | Card title |
| `forecast_type` | string | `daily` | `daily`, `hourly`, or `twice_daily` |
| `max_items` | number | `5` | Max forecast items (1–10) |
| `show_current` | boolean | `true` | Show current weather section |
| `show_forecast` | boolean | `true` | Show forecast section |
| `show_animations` | boolean | `true` | Enable CSS animations |
| `show_wind` | boolean | `true` | Show wind speed |
| `show_humidity` | boolean | `true` | Show humidity |
| `show_pressure` | boolean | `true` | Show atmospheric pressure |
| `icon_style` | string | `svg` | `svg` for vector icons, `emoji` for emoji |
| `min_item_width` | number | `65` | Min width (px) of forecast items |
| `temperature_sensor` | string | — | External temperature sensor entity |
| `pressure_sensor` | string | — | External pressure sensor entity |
| `humidity_sensor` | string | — | External humidity sensor entity |
| `wind_speed_sensor` | string | — | External wind speed sensor entity |

### External sensors

When configured, external sensors take priority over the weather entity's attributes. If a sensor becomes `unavailable` or `unknown`, the card automatically falls back to the weather entity's value. Units are read from the sensor's `unit_of_measurement` attribute.

## Theming

Override card appearance with CSS custom properties in your HA theme:

```yaml
# In your theme YAML
animated-weather-card:
  --awc-text-dark: "#e2e8f0"      # Text color in dark conditions
  --awc-text-light: "#1e293b"     # Text color in light conditions (cloudy day)
  --awc-text-day: "#ffffff"       # Text color in bright conditions (sunny)
  --awc-name-size: "14px"         # Card name font size
  --awc-temp-size: "42px"         # Temperature font size
  --awc-fc-radius: "8px"          # Forecast item border radius
  --awc-fc-bg: "rgba(255,255,255,.1)"  # Forecast item background
  --awc-rain-color: "rgba(200,220,255,.6)"
  --awc-snow-color: "rgba(255,255,255,.85)"
  --awc-hail-color: "rgba(200,220,240,.8)"
```

Or use `card_mod`:

```yaml
type: custom:animated-weather-card
entity: weather.home
card_mod:
  style: |
    :host {
      --awc-temp-size: 48px;
    }
```

## Supported conditions

All standard Home Assistant weather conditions are supported:

| Condition | Day gradient | Night gradient | Animation |
|-----------|-------------|----------------|-----------|
| `sunny` | Blue sky | — | — |
| `clear-night` | — | Deep blue | Twinkling stars |
| `partlycloudy` | Light blue | Dark blue | Drifting clouds |
| `cloudy` | Gray | Dark gray | Dense clouds |
| `fog` | Light gray | Dark gray | Dense slow clouds |
| `rainy` | Blue-gray | Dark | Rain drops |
| `pouring` | Dark gray | Dark | Heavy rain |
| `lightning` | Dark | Dark | Lightning flash |
| `lightning-rainy` | Dark | Dark | Lightning + rain |
| `snowy` | Light gray | Dark blue | Snowflakes |
| `snowy-rainy` | Light gray | Dark blue | Snow + rain |
| `hail` | Gray | Dark blue | Hailstones |
| `windy` | Light blue | Dark blue | Fast clouds |
| `exceptional` | Orange | Dark red | — |

## Languages

The card auto-detects the language from your Home Assistant settings. Currently supported:

- 🇬🇧 English
- 🇵🇱 Polish
- 🇩🇪 German
- 🇫🇷 French
- 🇪🇸 Spanish

Want to add your language? PRs welcome! See the `I18N` object in the source.

## Troubleshooting

**Card not showing / old version displayed:**
- Clear browser cache: `Ctrl+Shift+R`
- If using manual install, add version suffix to resource URL: `/local/animated-weather-card.js?v=2`

**Animations not playing:**
- Check `show_animations: true` in config
- Verify your browser supports CSS animations (all modern browsers do)

**Forecast not showing:**
- Requires Home Assistant 2023.12+ for the forecast subscribe API
- Verify your weather integration supports the selected `forecast_type`
- Check if your weather entity has forecast data in Developer Tools → States

**Sensor values not showing:**
- Verify sensor entity IDs in Developer Tools → States
- Sensors with `unavailable` or `unknown` state fall back to weather entity

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

### Adding a language

Add your locale to the `I18N` object following the existing structure (conditions, day names, editor labels).

## License

[MIT](LICENSE)

## Credits

Built with ❤️ for the Home Assistant community.
