/**
 * Animated Weather Card for Home Assistant
 * https://github.com/smalarz/animated-weather-card
 *
 * @version 1.5.0
 * @license MIT
 */

const VERSION = '1.5.0';

// ─── SVG WEATHER ICONS ───

const SVG_ICONS = {
  'sunny': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="12" fill="#FFD54F"/>
    <g stroke="#FFD54F" stroke-width="2.5" stroke-linecap="round">
      <line x1="32" y1="4" x2="32" y2="12"/><line x1="32" y1="52" x2="32" y2="60"/>
      <line x1="4" y1="32" x2="12" y2="32"/><line x1="52" y1="32" x2="60" y2="32"/>
      <line x1="12.2" y1="12.2" x2="17.9" y2="17.9"/><line x1="46.1" y1="46.1" x2="51.8" y2="51.8"/>
      <line x1="12.2" y1="51.8" x2="17.9" y2="46.1"/><line x1="46.1" y1="17.9" x2="51.8" y2="12.2"/>
    </g></svg>`,
  'clear-night': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 12C30 14 22 22 22 34c0 12 10 20 20 20 4 0 8-1 10-3-2 1-5 1-8 1-12 0-22-10-22-22 0-8 4-16 12-19z" fill="#B0BEC5"/>
    <circle cx="48" cy="14" r="1.2" fill="#fff" opacity="0.8"/><circle cx="52" cy="22" r="0.8" fill="#fff" opacity="0.6"/>
    <circle cx="14" cy="18" r="1" fill="#fff" opacity="0.7"/><circle cx="18" cy="10" r="0.8" fill="#fff" opacity="0.5"/>
    <circle cx="10" cy="28" r="0.6" fill="#fff" opacity="0.6"/></svg>`,
  'cloudy': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M48 44H16c-5.5 0-10-4.5-10-10 0-4.8 3.4-8.8 8-9.7C14.6 17 21 12 28.5 12c8.2 0 15 6 15.8 13.8C49.5 27.2 54 31.8 54 38c0 3.3-2.7 6-6 6z" fill="#B0BEC5" opacity="0.9"/></svg>`,
  'partlycloudy': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="22" r="9" fill="#FFD54F"/>
    <g stroke="#FFD54F" stroke-width="2" stroke-linecap="round">
      <line x1="24" y1="6" x2="24" y2="10"/><line x1="24" y1="34" x2="24" y2="38"/>
      <line x1="8" y1="22" x2="12" y2="22"/><line x1="36" y1="22" x2="40" y2="22"/>
      <line x1="12.7" y1="10.7" x2="15.5" y2="13.5"/><line x1="32.5" y1="30.5" x2="35.3" y2="33.3"/>
      <line x1="12.7" y1="33.3" x2="15.5" y2="30.5"/><line x1="32.5" y1="13.5" x2="35.3" y2="10.7"/>
    </g>
    <path d="M50 50H20c-4.4 0-8-3.6-8-8 0-3.8 2.7-7 6.4-7.8C19 28 24.2 24 30.5 24c6.5 0 12 4.8 12.6 11C48 36 52 39.6 52 44.4c0 3-2.5 5.6-5.6 5.6z" fill="#B0BEC5" opacity="0.85"/></svg>`,
  'rainy': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M46 36H18c-4.4 0-8-3.6-8-8 0-3.8 2.7-7 6.4-7.8C17 14 22.2 10 28.5 10c6.5 0 12 4.8 12.6 11C46 22 50 25.6 50 30c0 3.3-2 6-4 6z" fill="#78909C"/>
    <g stroke="#64B5F6" stroke-width="1.5" stroke-linecap="round">
      <line x1="22" y1="40" x2="18" y2="50"/><line x1="30" y1="40" x2="26" y2="50"/>
      <line x1="38" y1="40" x2="34" y2="50"/><line x1="46" y1="40" x2="42" y2="50"/>
    </g></svg>`,
  'pouring': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M46 32H18c-4.4 0-8-3.6-8-8 0-3.8 2.7-7 6.4-7.8C17 10 22.2 6 28.5 6c6.5 0 12 4.8 12.6 11C46 18 50 21.6 50 26c0 3.3-2 6-4 6z" fill="#546E7A"/>
    <g stroke="#64B5F6" stroke-width="2" stroke-linecap="round">
      <line x1="18" y1="36" x2="14" y2="48"/><line x1="24" y1="38" x2="20" y2="50"/>
      <line x1="30" y1="36" x2="26" y2="48"/><line x1="36" y1="38" x2="32" y2="50"/>
      <line x1="42" y1="36" x2="38" y2="48"/><line x1="48" y1="38" x2="44" y2="50"/>
    </g></svg>`,
  'snowy': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M46 34H18c-4.4 0-8-3.6-8-8 0-3.8 2.7-7 6.4-7.8C17 12 22.2 8 28.5 8c6.5 0 12 4.8 12.6 11C46 20 50 23.6 50 28c0 3.3-2 6-4 6z" fill="#90A4AE"/>
    <g fill="#E3F2FD">
      <circle cx="20" cy="42" r="2.5"/><circle cx="32" cy="44" r="2.5"/>
      <circle cx="44" cy="42" r="2.5"/><circle cx="26" cy="52" r="2"/>
      <circle cx="38" cy="52" r="2"/>
    </g></svg>`,
  'snowy-rainy': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M46 34H18c-4.4 0-8-3.6-8-8 0-3.8 2.7-7 6.4-7.8C17 12 22.2 8 28.5 8c6.5 0 12 4.8 12.6 11C46 20 50 23.6 50 28c0 3.3-2 6-4 6z" fill="#90A4AE"/>
    <g stroke="#64B5F6" stroke-width="1.5" stroke-linecap="round"><line x1="20" y1="38" x2="17" y2="46"/><line x1="36" y1="38" x2="33" y2="46"/></g>
    <g fill="#E3F2FD"><circle cx="28" cy="44" r="2.2"/><circle cx="44" cy="44" r="2.2"/></g></svg>`,
  'lightning': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M46 32H18c-4.4 0-8-3.6-8-8 0-3.8 2.7-7 6.4-7.8C17 10 22.2 6 28.5 6c6.5 0 12 4.8 12.6 11C46 18 50 21.6 50 26c0 3.3-2 6-4 6z" fill="#546E7A"/>
    <polygon points="34,32 28,44 33,44 29,58 42,40 36,40 40,32" fill="#FFD54F"/></svg>`,
  'lightning-rainy': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M46 30H18c-4.4 0-8-3.6-8-8 0-3.8 2.7-7 6.4-7.8C17 8 22.2 4 28.5 4c6.5 0 12 4.8 12.6 11C46 16 50 19.6 50 24c0 3.3-2 6-4 6z" fill="#546E7A"/>
    <polygon points="34,30 28,42 33,42 29,56 42,38 36,38 40,30" fill="#FFD54F"/>
    <g stroke="#64B5F6" stroke-width="1.5" stroke-linecap="round">
      <line x1="18" y1="34" x2="15" y2="44"/><line x1="48" y1="34" x2="45" y2="44"/>
    </g></svg>`,
  'hail': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M46 32H18c-4.4 0-8-3.6-8-8 0-3.8 2.7-7 6.4-7.8C17 10 22.2 6 28.5 6c6.5 0 12 4.8 12.6 11C46 18 50 21.6 50 26c0 3.3-2 6-4 6z" fill="#78909C"/>
    <g fill="#B0BEC5" stroke="#78909C" stroke-width="0.5">
      <circle cx="20" cy="40" r="3"/><circle cx="32" cy="42" r="3.5"/>
      <circle cx="44" cy="40" r="3"/><circle cx="26" cy="50" r="2.5"/><circle cx="38" cy="50" r="2.5"/>
    </g></svg>`,
  'fog': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#B0BEC5" stroke-width="3" stroke-linecap="round">
      <line x1="8" y1="20" x2="56" y2="20"/><line x1="12" y1="28" x2="52" y2="28"/>
      <line x1="8" y1="36" x2="56" y2="36"/><line x1="14" y1="44" x2="50" y2="44"/>
    </g></svg>`,
  'windy': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#90CAF9" stroke-width="2.5" stroke-linecap="round" fill="none">
      <path d="M8 24h32c4 0 7-3 7-7s-3-7-7-7"/><path d="M8 36h40c3.5 0 6 2.5 6 6s-2.5 6-6 6"/>
      <path d="M14 30h20c3 0 5-2 5-5s-2-5-5-5"/>
    </g></svg>`,
  'windy-variant': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#90CAF9" stroke-width="2.5" stroke-linecap="round" fill="none">
      <path d="M8 24h32c4 0 7-3 7-7s-3-7-7-7"/><path d="M8 36h40c3.5 0 6 2.5 6 6s-2.5 6-6 6"/>
      <path d="M14 30h20c3 0 5-2 5-5s-2-5-5-5"/>
    </g></svg>`,
  'exceptional': `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 6L4 56h56L32 6z" fill="#FF8A65" opacity="0.9"/>
    <text x="32" y="46" text-anchor="middle" font-size="24" font-weight="bold" fill="#fff">!</text></svg>`,
};

// ─── INTERNATIONALIZATION ───

const I18N = {
  en: {
    conditions: {
      'clear-night': 'Clear night', 'cloudy': 'Cloudy', 'fog': 'Fog',
      'hail': 'Hail', 'lightning': 'Lightning', 'lightning-rainy': 'Thunderstorm',
      'partlycloudy': 'Partly cloudy', 'pouring': 'Pouring', 'rainy': 'Rainy',
      'snowy': 'Snow', 'snowy-rainy': 'Sleet', 'sunny': 'Sunny',
      'windy': 'Windy', 'windy-variant': 'Windy', 'exceptional': 'Exceptional',
    },
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    editor: {
      entity: 'Weather entity', forecast_type: 'Forecast type',
      max_items: 'Max forecast items', name: 'Name (optional)',
      temperature_sensor: 'Temperature sensor', pressure_sensor: 'Pressure sensor',
      humidity_sensor: 'Humidity sensor', wind_speed_sensor: 'Wind speed sensor',
      daily: 'Daily', hourly: 'Hourly', twice_daily: 'Twice daily',
    },
  },
  pl: {
    conditions: {
      'clear-night': 'Bezchmurnie', 'cloudy': 'Pochmurno', 'fog': 'Mgła',
      'hail': 'Grad', 'lightning': 'Burza', 'lightning-rainy': 'Burza z deszczem',
      'partlycloudy': 'Częściowe zachmurzenie', 'pouring': 'Ulewa', 'rainy': 'Deszcz',
      'snowy': 'Śnieg', 'snowy-rainy': 'Deszcz ze śniegiem', 'sunny': 'Słonecznie',
      'windy': 'Wietrznie', 'windy-variant': 'Wietrznie', 'exceptional': 'Wyjątkowe',
    },
    days: ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'],
    editor: {
      entity: 'Encja pogodowa', forecast_type: 'Typ prognozy',
      max_items: 'Maks. pozycji prognozy', name: 'Nazwa (opcjonalna)',
      temperature_sensor: 'Sensor temperatury', pressure_sensor: 'Sensor ciśnienia',
      humidity_sensor: 'Sensor wilgotności', wind_speed_sensor: 'Sensor wiatru',
      daily: 'Dzienna', hourly: 'Godzinowa', twice_daily: '2x dziennie',
    },
  },
  de: {
    conditions: {
      'clear-night': 'Klare Nacht', 'cloudy': 'Bewölkt', 'fog': 'Nebel',
      'hail': 'Hagel', 'lightning': 'Gewitter', 'lightning-rainy': 'Gewitter mit Regen',
      'partlycloudy': 'Teilweise bewölkt', 'pouring': 'Starkregen', 'rainy': 'Regen',
      'snowy': 'Schnee', 'snowy-rainy': 'Schneeregen', 'sunny': 'Sonnig',
      'windy': 'Windig', 'windy-variant': 'Windig', 'exceptional': 'Außergewöhnlich',
    },
    days: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    editor: {
      entity: 'Wetter-Entität', forecast_type: 'Vorhersagetyp',
      max_items: 'Max. Vorhersageeinträge', name: 'Name (optional)',
      temperature_sensor: 'Temperatursensor', pressure_sensor: 'Drucksensor',
      humidity_sensor: 'Feuchtigkeitssensor', wind_speed_sensor: 'Windgeschwindigkeitssensor',
      daily: 'Täglich', hourly: 'Stündlich', twice_daily: 'Zweimal täglich',
    },
  },
  fr: {
    conditions: {
      'clear-night': 'Nuit claire', 'cloudy': 'Nuageux', 'fog': 'Brouillard',
      'hail': 'Grêle', 'lightning': 'Orage', 'lightning-rainy': 'Orage et pluie',
      'partlycloudy': 'Partiellement nuageux', 'pouring': 'Forte pluie', 'rainy': 'Pluvieux',
      'snowy': 'Neige', 'snowy-rainy': 'Pluie verglaçante', 'sunny': 'Ensoleillé',
      'windy': 'Venteux', 'windy-variant': 'Venteux', 'exceptional': 'Exceptionnel',
    },
    days: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    editor: {
      entity: 'Entité météo', forecast_type: 'Type de prévision',
      max_items: 'Max éléments prévision', name: 'Nom (optionnel)',
      temperature_sensor: 'Capteur température', pressure_sensor: 'Capteur pression',
      humidity_sensor: "Capteur humidité", wind_speed_sensor: 'Capteur vitesse vent',
      daily: 'Quotidien', hourly: 'Horaire', twice_daily: 'Bi-quotidien',
    },
  },
  es: {
    conditions: {
      'clear-night': 'Noche despejada', 'cloudy': 'Nublado', 'fog': 'Niebla',
      'hail': 'Granizo', 'lightning': 'Tormenta', 'lightning-rainy': 'Tormenta con lluvia',
      'partlycloudy': 'Parcialmente nublado', 'pouring': 'Lluvia intensa', 'rainy': 'Lluvioso',
      'snowy': 'Nieve', 'snowy-rainy': 'Aguanieve', 'sunny': 'Soleado',
      'windy': 'Ventoso', 'windy-variant': 'Ventoso', 'exceptional': 'Excepcional',
    },
    days: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    editor: {
      entity: 'Entidad meteorológica', forecast_type: 'Tipo de previsión',
      max_items: 'Máx. elementos previsión', name: 'Nombre (opcional)',
      temperature_sensor: 'Sensor temperatura', pressure_sensor: 'Sensor presión',
      humidity_sensor: 'Sensor humedad', wind_speed_sensor: 'Sensor velocidad viento',
      daily: 'Diario', hourly: 'Por hora', twice_daily: 'Dos veces al día',
    },
  },
};

function getLocale(hass) {
  if (!hass) return I18N.en;
  const lang = (hass.language || hass.locale?.language || 'en').substring(0, 2);
  return I18N[lang] || I18N.en;
}

// ─── GRADIENTS ───

const GRADIENTS = {
  day: {
    'sunny':            ['#1976D2', '#42A5F5', '#E3F2FD'],
    'partlycloudy':     ['#42A5F5', '#90CAF9', '#E1F5FE'],
    'cloudy':           ['#78909C', '#90A4AE', '#B0BEC5'],
    'fog':              ['#90A4AE', '#B0BEC5', '#CFD8DC'],
    'rainy':            ['#455A64', '#607D8B', '#78909C'],
    'pouring':          ['#37474F', '#546E7A', '#607D8B'],
    'lightning':        ['#37474F', '#455A64', '#546E7A'],
    'lightning-rainy':  ['#263238', '#37474F', '#455A64'],
    'snowy':            ['#78909C', '#B0BEC5', '#ECEFF1'],
    'snowy-rainy':      ['#78909C', '#B0BEC5', '#ECEFF1'],
    'hail':             ['#546E7A', '#78909C', '#90A4AE'],
    'windy':            ['#4FC3F7', '#81D4FA', '#B3E5FC'],
    'windy-variant':    ['#4FC3F7', '#81D4FA', '#B3E5FC'],
    'exceptional':      ['#FF8A65', '#FFAB91', '#FBE9E7'],
  },
  night: {
    'clear-night':      ['#0a1628', '#1a2a4a', '#2a3a5a'],
    'cloudy':           ['#1a2030', '#2a3040', '#3a4050'],
    'fog':              ['#1a2030', '#2a3040', '#3a4050'],
    'rainy':            ['#0d1520', '#1a2535', '#253040'],
    'pouring':          ['#0d1520', '#1a2535', '#253040'],
    'lightning':        ['#0d1520', '#1a2535', '#253040'],
    'lightning-rainy':  ['#0d1520', '#1a2535', '#253040'],
    'snowy':            ['#1a2535', '#2a3a50', '#3a4a60'],
    'snowy-rainy':      ['#1a2535', '#2a3a50', '#3a4a60'],
    'hail':             ['#1a2535', '#2a3a50', '#3a4a60'],
    'partlycloudy':     ['#0f1a2e', '#1a2a4a', '#2a3a55'],
    'windy':            ['#0f1a2e', '#1a2a4a', '#2a3a55'],
    'windy-variant':    ['#0f1a2e', '#1a2a4a', '#2a3a55'],
    'exceptional':      ['#3e1a1a', '#4a2020', '#552a2a'],
  },
  _default_day:   ['#2196F3', '#64B5F6', '#E3F2FD'],
  _default_night: ['#111827', '#1f2937', '#374151'],
};

function getGradient(condition, isNight) {
  const palette = isNight ? GRADIENTS.night : GRADIENTS.day;
  const colors = palette[condition] || (isNight ? GRADIENTS._default_night : GRADIENTS._default_day);
  return `linear-gradient(180deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`;
}

// ─── MAIN CARD ───

class AnimatedWeatherCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = {};
    this._hass = null;
    this._forecast = [];
    this._forecastSub = null;
    this._lastCondition = null;
    this._lastIsNight = null;
    this._built = false;
  }

  set hass(hass) {
    const prev = this._hass;
    this._hass = hass;
    if (!this._config.entity) return;
    if (!prev || prev.states[this._config.entity] !== hass.states[this._config.entity]) {
      this._subscribeForecast();
    }
    this._update();
  }

  setConfig(config) {
    if (!config.entity) throw new Error('Please define a weather entity');
    this._config = {
      entity: config.entity,
      forecast_type: config.forecast_type || 'daily',
      max_items: config.max_items ?? 5,
      name: config.name || '',
      show_current: config.show_current !== false,
      show_forecast: config.show_forecast !== false,
      show_animations: config.show_animations !== false,
      show_wind: config.show_wind !== false,
      show_humidity: config.show_humidity !== false,
      show_pressure: config.show_pressure !== false,
      min_item_width: config.min_item_width || 65,
      temperature_sensor: config.temperature_sensor || null,
      pressure_sensor: config.pressure_sensor || null,
      humidity_sensor: config.humidity_sensor || null,
      wind_speed_sensor: config.wind_speed_sensor || null,
      icon_style: config.icon_style || 'svg',  // 'svg' or 'emoji'
    };
    this._built = false;
    this._lastCondition = null;
    this._lastIsNight = null;
  }

  async _subscribeForecast() {
    if (!this._hass || !this._config.entity) return;
    if (this._forecastSub) {
      try { this._forecastSub(); } catch (_) {}
      this._forecastSub = null;
    }
    try {
      this._forecastSub = await this._hass.connection.subscribeMessage(
        (msg) => { if (msg.forecast) { this._forecast = msg.forecast; this._updateForecast(); } },
        { type: 'weather/subscribe_forecast', forecast_type: this._config.forecast_type, entity_id: this._config.entity }
      );
    } catch (_) {
      const s = this._hass.states[this._config.entity];
      if (s?.attributes?.forecast) this._forecast = s.attributes.forecast;
    }
  }

  disconnectedCallback() {
    if (this._forecastSub) { try { this._forecastSub(); } catch (_) {} }
  }

  _isNight() {
    if (!this._hass) return false;
    const sun = this._hass.states['sun.sun'];
    if (sun) return sun.state === 'below_horizon';
    const h = new Date().getHours();
    return h < 6 || h >= 21;
  }

  _readSensor(id, fallbackVal, fallbackUnit) {
    if (id && this._hass) {
      const s = this._hass.states[id];
      if (s && s.state !== 'unavailable' && s.state !== 'unknown') {
        return { val: parseFloat(s.state), unit: s.attributes?.unit_of_measurement || fallbackUnit };
      }
    }
    return { val: fallbackVal, unit: fallbackUnit };
  }

  _icon(condition, size = 48) {
    if (this._config.icon_style === 'emoji') {
      const EMOJI = {
        'clear-night':'🌙','cloudy':'☁️','fog':'🌫️','hail':'🌨️','lightning':'⚡',
        'lightning-rainy':'⛈️','partlycloudy':'⛅','pouring':'🌧️','rainy':'🌦️',
        'snowy':'❄️','snowy-rainy':'🌨️','sunny':'☀️','windy':'💨','windy-variant':'💨','exceptional':'⚠️',
      };
      return `<span style="font-size:${size}px;line-height:1">${EMOJI[condition] || '🌡️'}</span>`;
    }
    const svg = SVG_ICONS[condition] || SVG_ICONS['exceptional'];
    return `<div style="width:${size}px;height:${size}px">${svg}</div>`;
  }

  // ─── ANIMATIONS ───

  _buildAnimations(condition, isNight) {
    if (!this._config.show_animations) return '';
    let h = '';

    // Rain — reduced from 70 to 45 for pouring, 35→25 for rain
    if (['rainy', 'pouring', 'lightning-rainy'].includes(condition)) {
      const n = condition === 'pouring' ? 45 : 25;
      for (let i = 0; i < n; i++) {
        h += `<div class="anim-rain" style="left:${(i/n*100+Math.random()*(100/n)).toFixed(1)}%;animation-delay:${(Math.random()*2).toFixed(2)}s;animation-duration:${(0.4+Math.random()*0.3).toFixed(2)}s;opacity:${(0.3+Math.random()*0.5).toFixed(2)}"></div>`;
      }
    }
    // Snow — reduced from 45 to 30
    if (['snowy', 'snowy-rainy'].includes(condition)) {
      for (let i = 0; i < 30; i++) {
        const sz = (2 + Math.random() * 4).toFixed(1);
        h += `<div class="anim-snow" style="left:${(Math.random()*100).toFixed(1)}%;animation-delay:${(Math.random()*6).toFixed(2)}s;animation-duration:${(3+Math.random()*4).toFixed(2)}s;width:${sz}px;height:${sz}px"></div>`;
      }
    }
    // Hail — reduced from 25 to 18
    if (condition === 'hail') {
      for (let i = 0; i < 18; i++) {
        h += `<div class="anim-hail" style="left:${(Math.random()*100).toFixed(1)}%;animation-delay:${(Math.random()*2).toFixed(2)}s;animation-duration:${(0.3+Math.random()*0.2).toFixed(2)}s"></div>`;
      }
    }
    // Lightning
    if (['lightning', 'lightning-rainy'].includes(condition)) {
      h += '<div class="anim-lightning"></div>';
    }
    // Clouds — reduced fog from 6 to 4
    if (['cloudy', 'partlycloudy', 'fog', 'windy', 'windy-variant'].includes(condition)) {
      const n = condition === 'cloudy' ? 4 : condition === 'fog' ? 4 : 3;
      for (let i = 0; i < n; i++) {
        const op = condition === 'fog' ? (0.25+Math.random()*0.25) : (0.12+Math.random()*0.22);
        h += `<div class="anim-cloud" style="top:${(5+Math.random()*45).toFixed(1)}%;animation-delay:${(Math.random()*20).toFixed(2)}s;animation-duration:${(25+Math.random()*25).toFixed(2)}s;--cs:${(0.4+Math.random()*0.7).toFixed(2)};opacity:${op.toFixed(2)}"></div>`;
      }
    }
    // Stars — reduced from 30 to 20
    if (isNight && condition === 'clear-night') {
      for (let i = 0; i < 20; i++) {
        const sz = (1 + Math.random() * 2).toFixed(1);
        h += `<div class="anim-star" style="left:${(Math.random()*100).toFixed(1)}%;top:${(Math.random()*55).toFixed(1)}%;animation-delay:${(Math.random()*5).toFixed(2)}s;width:${sz}px;height:${sz}px"></div>`;
      }
    }
    return h;
  }

  // ─── BUILD & UPDATE ───

  _buildShell() {
    this.shadowRoot.innerHTML = `<style>${this._css()}</style>
      <ha-card>
        <div class="card-bg" id="bg">
          <div class="anim-layer" id="anim"></div>
          <div class="content">
            <div class="header"><span class="name" id="name"></span></div>
            <div class="main-row" id="main-row">
              <div class="main-icon" id="icon"></div>
              <div class="main-data">
                <div class="main-temp" id="temp"></div>
                <div class="main-cond" id="cond"></div>
              </div>
            </div>
            <div class="details" id="details"></div>
            <div class="forecast" id="forecast" style="--item-min:${this._config.min_item_width}px"></div>
          </div>
        </div>
      </ha-card>`;
    this._built = true;
  }

  _update() {
    if (!this._hass || !this._config.entity) return;
    const state = this._hass.states[this._config.entity];
    if (!state) {
      this.shadowRoot.innerHTML = `<ha-card><div style="padding:16px">Entity <b>${this._config.entity}</b> not found</div></ha-card>`;
      this._built = false;
      return;
    }
    if (!this._built) this._buildShell();

    const cond = state.state;
    const night = this._isNight();
    const changed = cond !== this._lastCondition || night !== this._lastIsNight;

    if (changed) {
      this._lastCondition = cond;
      this._lastIsNight = night;

      const bg = this.shadowRoot.getElementById('bg');
      bg.style.background = getGradient(cond, night);

      const dark = night || ['rainy','pouring','lightning-rainy','lightning'].includes(cond);
      const light = ['cloudy','fog','snowy','snowy-rainy'].includes(cond) && !night;
      bg.style.color = dark ? 'var(--awc-text-dark, #e2e8f0)' : (light ? 'var(--awc-text-light, #1e293b)' : 'var(--awc-text-day, #fff)');
      bg.style.textShadow = dark ? '0 1px 3px rgba(0,0,0,0.5)' : (light ? 'none' : '0 1px 3px rgba(0,0,0,0.25)');
      bg.style.setProperty('--cloud-bg', night ? 'rgba(100,120,150,0.4)' : 'rgba(255,255,255,0.4)');

      // Defer animation insertion so card content renders first
      const animEl = this.shadowRoot.getElementById('anim');
      animEl.innerHTML = '';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          animEl.innerHTML = this._buildAnimations(cond, night);
        });
      });
    }

    // Data
    const a = state.attributes;
    const locale = getLocale(this._hass);
    const t = this._readSensor(this._config.temperature_sensor, a.temperature, a.temperature_unit || '°C');
    const h = this._readSensor(this._config.humidity_sensor, a.humidity, '%');
    const w = this._readSensor(this._config.wind_speed_sensor, a.wind_speed, a.wind_speed_unit || 'km/h');
    const p = this._readSensor(this._config.pressure_sensor, a.pressure, a.pressure_unit || 'hPa');

    this.shadowRoot.getElementById('name').textContent = this._config.name || a.friendly_name || '';
    this.shadowRoot.getElementById('icon').innerHTML = this._icon(cond, 48);
    this.shadowRoot.getElementById('temp').textContent = t.val !== undefined ? `${Math.round(t.val)}°` : '--°';
    this.shadowRoot.getElementById('cond').textContent = locale.conditions[cond] || cond;

    if (this._config.show_current) {
      const d = [];
      if (this._config.show_humidity && h.val !== undefined) d.push(`<span class="detail"><svg viewBox="0 0 24 24" width="14" height="14" style="vertical-align:-2px;margin-right:2px"><path fill="currentColor" d="M12 2c-5.33 8-8 12-8 16a8 8 0 1016 0c0-4-2.67-8-8-16z"/></svg>${Math.round(h.val)}%</span>`);
      if (this._config.show_wind && w.val !== undefined) d.push(`<span class="detail"><svg viewBox="0 0 24 24" width="14" height="14" style="vertical-align:-2px;margin-right:2px"><path fill="currentColor" d="M4 10h10a4 4 0 100-4M4 14h12a4 4 0 110 4M4 18h8a3 3 0 110 3"/></svg>${Math.round(w.val)} ${w.unit}</span>`);
      if (this._config.show_pressure && p.val !== undefined) d.push(`<span class="detail"><svg viewBox="0 0 24 24" width="14" height="14" style="vertical-align:-2px;margin-right:2px"><path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3v7l5 3"/></svg>${Math.round(p.val)} ${p.unit}</span>`);
      this.shadowRoot.getElementById('details').innerHTML = d.join('');
    }
    this._updateForecast();
  }

  _updateForecast() {
    if (!this._config.show_forecast || !this._built) return;
    const el = this.shadowRoot.getElementById('forecast');
    if (!el) return;
    const items = this._forecast.slice(0, this._config.max_items);
    if (!items.length) { el.innerHTML = ''; return; }

    const locale = getLocale(this._hass);
    el.innerHTML = items.map(f => {
      const dt = new Date(f.datetime);
      const time = this._config.forecast_type === 'hourly' ? `${dt.getHours().toString().padStart(2, '0')}:00` : locale.days[dt.getDay()];
      const hi = f.temperature !== undefined ? Math.round(f.temperature) : '';
      const lo = f.templow !== undefined ? Math.round(f.templow) : '';
      const pr = f.precipitation;
      return `<div class="fc-item">
        <div class="fc-time">${time}</div>
        <div class="fc-icon">${this._icon(f.condition, 24)}</div>
        <div class="fc-temps"><span class="fc-hi">${hi}°</span>${lo !== '' ? `<span class="fc-lo">${lo}°</span>` : ''}</div>
        ${pr > 0 ? `<div class="fc-precip">${pr}mm</div>` : ''}
      </div>`;
    }).join('');
  }

  _render() { this._update(); }
  getCardSize() { return 4; }
  static getConfigElement() { return document.createElement('animated-weather-card-editor'); }
  static getStubConfig(hass) {
    const entities = Object.keys(hass.states).filter(e => e.startsWith('weather.'));
    return { entity: entities[0] || 'weather.home', forecast_type: 'daily', max_items: 5 };
  }

  // ─── CSS ───

  _css() {
    return `
      :host { display: block; --awc-radius: var(--ha-card-border-radius, 12px); }
      ha-card { overflow: hidden; border-radius: var(--awc-radius); font-family: var(--ha-card-font-family, 'Roboto', sans-serif); }
      .card-bg {
        position: relative; overflow: hidden; min-height: 180px; padding: 20px;
        display: flex; flex-direction: column; transition: background 1s ease, color .5s ease;
      }
      .anim-layer {
        position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 1;
        contain: strict;
      }
      .content { position: relative; z-index: 2; flex: 1; display: flex; flex-direction: column; }
      .header { margin-bottom: 8px; }
      .name { font-size: var(--awc-name-size, 14px); font-weight: 500; opacity: .9; letter-spacing: .5px; }
      .main-row { display: flex; align-items: center; gap: 12px; margin: 4px 0; }
      .main-icon { filter: drop-shadow(0 2px 4px rgba(0,0,0,.15)); flex-shrink: 0; }
      .main-temp { font-size: var(--awc-temp-size, 42px); font-weight: 300; line-height: 1; letter-spacing: -1px; }
      .main-cond { font-size: 13px; opacity: .85; margin-top: 2px; }
      .details { display: flex; gap: 16px; margin-top: 8px; flex-wrap: wrap; }
      .detail { font-size: 12px; opacity: .8; white-space: nowrap; }

      /* Forecast */
      .forecast {
        display: grid; grid-template-columns: repeat(auto-fit, minmax(var(--item-min), 1fr));
        gap: 4px; margin-top: auto; padding-top: 14px;
        border-top: 1px solid rgba(255,255,255,.15);
      }
      .forecast:empty { display: none; }
      .fc-item {
        display: flex; flex-direction: column; align-items: center; gap: 3px;
        padding: 6px 2px; border-radius: var(--awc-fc-radius, 8px);
        background: var(--awc-fc-bg, rgba(255,255,255,.1));
      }
      .fc-time { font-size: 11px; font-weight: 600; opacity: .9; text-transform: uppercase; letter-spacing: .5px; }
      .fc-icon { line-height: 1; }
      .fc-temps { display: flex; flex-direction: column; align-items: center; gap: 1px; }
      .fc-hi { font-size: 13px; font-weight: 600; }
      .fc-lo { font-size: 11px; opacity: .6; }
      .fc-precip { font-size: 10px; opacity: .7; }

      /* === Animations === */
      .anim-rain {
        position: absolute; top: -15px; width: 1.5px; height: 15px;
        background: linear-gradient(transparent, var(--awc-rain-color, rgba(200,220,255,.6)));
        border-radius: 0 0 2px 2px;
        will-change: transform;
        animation: _rain linear infinite;
      }
      @keyframes _rain { to { transform: translateY(350px); } }

      .anim-snow {
        position: absolute; top: -10px; background: var(--awc-snow-color, rgba(255,255,255,.85));
        border-radius: 50%;
        will-change: transform;
        animation: _snow linear infinite;
      }
      @keyframes _snow {
        0%   { transform: translateY(0)     translateX(0); }
        25%  { transform: translateY(80px)  translateX(10px); }
        50%  { transform: translateY(160px) translateX(-5px); }
        75%  { transform: translateY(240px) translateX(8px); }
        100% { transform: translateY(350px) translateX(0); }
      }

      .anim-hail {
        position: absolute; top: -10px; width: 5px; height: 5px;
        background: var(--awc-hail-color, rgba(200,220,240,.8));
        border-radius: 50%;
        will-change: transform;
        animation: _hail linear infinite;
      }
      @keyframes _hail { to { transform: translateY(350px); } }

      .anim-lightning {
        position: absolute; inset: 0;
        will-change: opacity;
        animation: _lightning 5s infinite;
      }
      @keyframes _lightning {
        0%,92%,95%,98%,100% { opacity: 0; }
        93% { opacity: 1; background: rgba(255,255,255,.35); }
        97% { opacity: 1; background: rgba(255,255,255,.15); }
      }

      .anim-cloud {
        position: absolute; width: 120px; height: 40px;
        background: var(--cloud-bg, rgba(255,255,255,.4));
        border-radius: 40px;
        will-change: transform;
        animation: _cloud linear infinite;
      }
      .anim-cloud::before {
        content: ''; position: absolute; width: 50px; height: 50px;
        background: inherit; border-radius: 50%; top: -25px; left: 20px;
      }
      .anim-cloud::after {
        content: ''; position: absolute; width: 70px; height: 45px;
        background: inherit; border-radius: 50%; top: -18px; left: 45px;
      }
      @keyframes _cloud {
        from { transform: scale(var(--cs,1)) translateX(-300px); }
        to   { transform: scale(var(--cs,1)) translateX(calc(100vw + 60px)); }
      }

      .anim-star {
        position: absolute; background: #fff; border-radius: 50%;
        will-change: opacity;
        animation: _twinkle 3s ease-in-out infinite alternate;
      }
      @keyframes _twinkle { from { opacity: .2; } to { opacity: 1; } }
    `;
  }
}

// ─── EDITOR ───

class AnimatedWeatherCardEditor extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); this._config = {}; }
  setConfig(config) { this._config = { ...config }; this._render(); }
  set hass(hass) {
    this._hass = hass;
    if (!this._rendered) this._render();
  }

  _fireChanged() {
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: { ...this._config } } }));
  }

  _getEntities(filterFn) {
    if (!this._hass) return [];
    return Object.keys(this._hass.states).filter(filterFn).sort().map(id => ({
      id, name: this._hass.states[id].attributes.friendly_name || id
    }));
  }

  _createAutocomplete(container, key, entities, placeholder) {
    const input = container.querySelector('input');
    const dropdown = container.querySelector('.ac-list');
    let selectedIdx = -1;

    const show = (items) => {
      dropdown.innerHTML = items.map((e, i) =>
        `<div class="ac-item${i === selectedIdx ? ' ac-active' : ''}" data-val="${e.id}">${e.name} <span class="ac-id">${e.id}</span></div>`
      ).join('');
      dropdown.style.display = items.length ? 'block' : 'none';
    };

    const hide = () => { setTimeout(() => { dropdown.style.display = 'none'; }, 200); };

    const filter = (q) => {
      const lq = q.toLowerCase();
      return entities.filter(e => e.id.toLowerCase().includes(lq) || e.name.toLowerCase().includes(lq)).slice(0, 50);
    };

    input.addEventListener('focus', () => { show(filter(input.value)); });
    input.addEventListener('blur', hide);
    input.addEventListener('input', () => { selectedIdx = -1; show(filter(input.value)); });
    input.addEventListener('keydown', (ev) => {
      const items = dropdown.querySelectorAll('.ac-item');
      if (ev.key === 'ArrowDown') { ev.preventDefault(); selectedIdx = Math.min(selectedIdx + 1, items.length - 1); show(filter(input.value)); items[selectedIdx]?.scrollIntoView({block:'nearest'}); }
      else if (ev.key === 'ArrowUp') { ev.preventDefault(); selectedIdx = Math.max(selectedIdx - 1, 0); show(filter(input.value)); items[selectedIdx]?.scrollIntoView({block:'nearest'}); }
      else if (ev.key === 'Enter' && selectedIdx >= 0 && items[selectedIdx]) { ev.preventDefault(); input.value = items[selectedIdx].dataset.val; dropdown.style.display = 'none'; this._config[key] = input.value; this._fireChanged(); }
      else if (ev.key === 'Escape') { dropdown.style.display = 'none'; }
    });

    dropdown.addEventListener('mousedown', (ev) => {
      const item = ev.target.closest('.ac-item');
      if (item) { input.value = item.dataset.val; dropdown.style.display = 'none'; this._config[key] = input.value; this._fireChanged(); }
    });

    input.addEventListener('change', () => {
      const v = input.value.trim();
      if (v) { this._config[key] = v; } else { delete this._config[key]; }
      this._fireChanged();
    });
  }

  _render() {
    this._rendered = true;
    const c = this._config;
    const l = getLocale(this._hass);
    const e = l.editor;
    const s = this._hass?.states || {};

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .form { padding: 16px 0; }
        .row { margin-bottom: 14px; }
        .row label {
          display: block; font-size: 12px; margin-bottom: 4px;
          color: var(--secondary-text-color); font-weight: 500;
        }
        .row input, .row select {
          width: 100%; padding: 10px; border-radius: 8px;
          border: 1px solid var(--divider-color, #e0e0e0);
          background: var(--card-background-color, #fff);
          color: var(--primary-text-color); font-size: 14px;
          box-sizing: border-box; outline: none; transition: border-color .2s;
        }
        .row input:focus, .row select:focus { border-color: var(--primary-color); }
        .section {
          font-size: 11px; text-transform: uppercase; letter-spacing: 1px;
          color: var(--secondary-text-color); margin: 18px 0 8px; font-weight: 600;
        }
        .ac-wrap { position: relative; }
        .ac-list {
          display: none; position: absolute; z-index: 999; left: 0; right: 0;
          max-height: 200px; overflow-y: auto;
          background: var(--card-background-color, #fff);
          border: 1px solid var(--divider-color, #e0e0e0);
          border-top: none; border-radius: 0 0 8px 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,.15);
        }
        .ac-item {
          padding: 8px 10px; cursor: pointer; font-size: 13px;
          color: var(--primary-text-color);
          border-bottom: 1px solid var(--divider-color, #f0f0f0);
        }
        .ac-item:last-child { border-bottom: none; }
        .ac-item:hover, .ac-active {
          background: var(--primary-color, #03a9f4); color: #fff;
        }
        .ac-item:hover .ac-id, .ac-active .ac-id { color: rgba(255,255,255,.7); }
        .ac-id { font-size: 11px; color: var(--secondary-text-color); margin-left: 6px; }
        .entity-hint {
          font-size: 11px; color: var(--secondary-text-color); margin-top: 2px;
          font-style: italic;
        }
      </style>
      <div class="form">
        <div class="row">
          <label>${e.entity}</label>
          <div class="ac-wrap">
            <input id="entity" value="${c.entity || ''}" placeholder="weather.home" autocomplete="off">
            <div class="ac-list"></div>
          </div>
          ${c.entity && s[c.entity] ? `<div class="entity-hint">${s[c.entity].attributes.friendly_name || ''}</div>` : ''}
        </div>
        <div class="row"><label>${e.name}</label><input id="name" value="${c.name || ''}"></div>
        <div class="row"><label>${e.forecast_type}</label>
          <select id="forecast_type">
            <option value="daily" ${c.forecast_type==='daily'?'selected':''}>${e.daily}</option>
            <option value="hourly" ${c.forecast_type==='hourly'?'selected':''}>${e.hourly}</option>
            <option value="twice_daily" ${c.forecast_type==='twice_daily'?'selected':''}>${e.twice_daily}</option>
          </select>
        </div>
        <div class="row"><label>${e.max_items}</label><input id="max_items" type="number" min="1" max="10" value="${c.max_items ?? 5}"></div>
        <div class="section">Sensors (optional)</div>
        <div class="row">
          <label>${e.temperature_sensor}</label>
          <div class="ac-wrap"><input id="temperature_sensor" value="${c.temperature_sensor || ''}" placeholder="sensor.temperature" autocomplete="off"><div class="ac-list"></div></div>
        </div>
        <div class="row">
          <label>${e.pressure_sensor}</label>
          <div class="ac-wrap"><input id="pressure_sensor" value="${c.pressure_sensor || ''}" placeholder="sensor.pressure" autocomplete="off"><div class="ac-list"></div></div>
        </div>
        <div class="row">
          <label>${e.humidity_sensor}</label>
          <div class="ac-wrap"><input id="humidity_sensor" value="${c.humidity_sensor || ''}" placeholder="sensor.humidity" autocomplete="off"><div class="ac-list"></div></div>
        </div>
        <div class="row">
          <label>${e.wind_speed_sensor}</label>
          <div class="ac-wrap"><input id="wind_speed_sensor" value="${c.wind_speed_sensor || ''}" placeholder="sensor.wind_speed" autocomplete="off"><div class="ac-list"></div></div>
        </div>
      </div>`;

    // Build entity lists
    const weatherEntities = this._getEntities(e => e.startsWith('weather.'));
    const tempEntities = this._getEntities(e => e.startsWith('sensor.') && (
      s[e]?.attributes.device_class === 'temperature' || e.includes('temp') || e.includes('temperatura')
    ));
    const pressEntities = this._getEntities(e => e.startsWith('sensor.') && (
      s[e]?.attributes.device_class === 'pressure' || s[e]?.attributes.device_class === 'atmospheric_pressure' || e.includes('press') || e.includes('cisn')
    ));
    const humEntities = this._getEntities(e => e.startsWith('sensor.') && (
      s[e]?.attributes.device_class === 'humidity' || e.includes('humid') || e.includes('wilgot')
    ));
    const windEntities = this._getEntities(e => e.startsWith('sensor.') && (
      s[e]?.attributes.device_class === 'wind_speed' || e.includes('wind') || e.includes('wiatr')
    ));

    // Wire up autocompletes
    const acDefs = [
      ['entity', weatherEntities],
      ['temperature_sensor', tempEntities],
      ['pressure_sensor', pressEntities],
      ['humidity_sensor', humEntities],
      ['wind_speed_sensor', windEntities],
    ];
    acDefs.forEach(([key, ents]) => {
      const wrap = this.shadowRoot.getElementById(key)?.closest('.ac-wrap');
      if (wrap) this._createAutocomplete(wrap, key, ents);
    });

    // Wire up regular inputs
    ['name', 'forecast_type', 'max_items'].forEach(id => {
      const el = this.shadowRoot.getElementById(id);
      if (!el) return;
      el.addEventListener('change', (ev) => {
        let v = ev.target.value;
        if (ev.target.type === 'number') v = parseInt(v);
        if (v === '' || v === undefined) { delete this._config[id]; } else { this._config[id] = v; }
        this._fireChanged();
      });
    });
  }
}

// ─── REGISTER ───

customElements.define('animated-weather-card', AnimatedWeatherCard);
customElements.define('animated-weather-card-editor', AnimatedWeatherCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'animated-weather-card',
  name: 'Animated Weather Card',
  description: 'Weather card with CSS animations, dynamic day/night backgrounds, and forecasts',
  preview: true,
  documentationURL: 'https://github.com/smalarz/animated-weather-card',
});

console.info(`%c ANIMATED-WEATHER-CARD %c v${VERSION} `, 'color:#fff;background:#1976D2;font-weight:700;padding:2px 6px;border-radius:4px 0 0 4px', 'color:#1976D2;background:#E3F2FD;font-weight:700;padding:2px 6px;border-radius:0 4px 4px 0');
