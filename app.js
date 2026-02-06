const COLOR_PALETTE = [
  "#56f2c8", "#ffb703", "#8ecae6", "#f28482", "#9b87f5",
  "#80ed99", "#ffd166", "#a8dadc", "#ff8fab", "#cdb4db",
  "#bde0fe", "#ffc8dd", "#b5e48c", "#f9c74f", "#90be6d",
  "#f94144", "#43aa8b", "#4d908e", "#f3722c", "#577590",
  "#f8961e", "#9ef01a", "#ffd60a", "#48bfe3", "#ffafcc"
];

const featuredCitiesByTz = {
  "America/Toronto": { name: "Toronto", country: "Canada", lat: 43.6532, lon: -79.3832, color: "#56f2c8" },
  "Asia/Riyadh": { name: "Jeddah", country: "Saudi Arabia", lat: 21.4858, lon: 39.1925, color: "#8ecae6" },
  "Asia/Kolkata": { name: "Delhi", country: "India", lat: 28.6139, lon: 77.2090, color: "#80ed99" },
  "Australia/Sydney": { name: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093, color: "#ffd166" },
  "Asia/Tokyo": { name: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503, color: "#a8dadc" },
  "Asia/Shanghai": { name: "Beijing", country: "China", lat: 39.9042, lon: 116.4074, color: "#ff8fab" },
  "Asia/Manila": { name: "Manila", country: "Philippines", lat: 14.5995, lon: 120.9842, color: "#f28482" },
  "America/New_York": { name: "New York", country: "United States", lat: 40.7128, lon: -74.0060 },
  "Europe/London": { name: "London", country: "United Kingdom", lat: 51.5074, lon: -0.1278 },
  "Europe/Paris": { name: "Paris", country: "France", lat: 48.8566, lon: 2.3522 },
  "Europe/Berlin": { name: "Berlin", country: "Germany", lat: 52.5200, lon: 13.4050 },
  "Europe/Moscow": { name: "Moscow", country: "Russia", lat: 55.7558, lon: 37.6173 },
  "Africa/Nairobi": { name: "Nairobi", country: "Kenya", lat: -1.2921, lon: 36.8219 },
  "Africa/Johannesburg": { name: "Cape Town", country: "South Africa", lat: -33.9249, lon: 18.4241 },
  "America/Sao_Paulo": { name: "Sao Paulo", country: "Brazil", lat: -23.5558, lon: -46.6396 },
  "America/Mexico_City": { name: "Mexico City", country: "Mexico", lat: 19.4326, lon: -99.1332 },
  "America/Los_Angeles": { name: "Los Angeles", country: "United States", lat: 34.0522, lon: -118.2437 },
  "America/Chicago": { name: "Chicago", country: "United States", lat: 41.8781, lon: -87.6298 },
  "Asia/Singapore": { name: "Singapore", country: "Singapore", lat: 1.3521, lon: 103.8198 },
  "Asia/Hong_Kong": { name: "Hong Kong", country: "Hong Kong", lat: 22.3193, lon: 114.1694 },
  "Asia/Seoul": { name: "Seoul", country: "South Korea", lat: 37.5665, lon: 126.9780 },
  "Asia/Bangkok": { name: "Bangkok", country: "Thailand", lat: 13.7563, lon: 100.5018 }
};

const countryByTimeZone = {
  "America/Vancouver": "Canada",
  "America/Edmonton": "Canada",
  "America/Winnipeg": "Canada",
  "America/Regina": "Canada",
  "America/Toronto": "Canada",
  "America/Halifax": "Canada",
  "America/St_Johns": "Canada",
  "America/Whitehorse": "Canada",
  "America/Dawson": "Canada",
  "America/New_York": "United States",
  "America/Chicago": "United States",
  "America/Denver": "United States",
  "America/Los_Angeles": "United States",
  "America/Phoenix": "United States",
  "America/Anchorage": "United States",
  "Pacific/Honolulu": "United States",
  "America/Mexico_City": "Mexico",
  "America/Sao_Paulo": "Brazil",
  "America/Buenos_Aires": "Argentina",
  "Europe/London": "United Kingdom",
  "Europe/Dublin": "Ireland",
  "Europe/Paris": "France",
  "Europe/Berlin": "Germany",
  "Europe/Madrid": "Spain",
  "Europe/Rome": "Italy",
  "Europe/Amsterdam": "Netherlands",
  "Europe/Brussels": "Belgium",
  "Europe/Zurich": "Switzerland",
  "Europe/Vienna": "Austria",
  "Europe/Stockholm": "Sweden",
  "Europe/Oslo": "Norway",
  "Europe/Copenhagen": "Denmark",
  "Europe/Helsinki": "Finland",
  "Europe/Warsaw": "Poland",
  "Europe/Athens": "Greece",
  "Europe/Istanbul": "Turkey",
  "Europe/Moscow": "Russia",
  "Africa/Cairo": "Egypt",
  "Africa/Khartoum": "Sudan",
  "Africa/Johannesburg": "South Africa",
  "Africa/Nairobi": "Kenya",
  "Africa/Casablanca": "Morocco",
  "Asia/Riyadh": "Saudi Arabia",
  "Asia/Dubai": "United Arab Emirates",
  "Asia/Qatar": "Qatar",
  "Asia/Kuwait": "Kuwait",
  "Asia/Bahrain": "Bahrain",
  "Asia/Muscat": "Oman",
  "Asia/Kolkata": "India",
  "Asia/Karachi": "Pakistan",
  "Asia/Dhaka": "Bangladesh",
  "Asia/Kathmandu": "Nepal",
  "Asia/Colombo": "Sri Lanka",
  "Asia/Bangkok": "Thailand",
  "Asia/Singapore": "Singapore",
  "Asia/Kuala_Lumpur": "Malaysia",
  "Asia/Jakarta": "Indonesia",
  "Asia/Manila": "Philippines",
  "Asia/Ho_Chi_Minh": "Vietnam",
  "Asia/Hong_Kong": "Hong Kong",
  "Asia/Taipei": "Taiwan",
  "Asia/Shanghai": "China",
  "Asia/Seoul": "South Korea",
  "Asia/Tokyo": "Japan",
  "Australia/Sydney": "Australia",
  "Australia/Melbourne": "Australia",
  "Australia/Brisbane": "Australia",
  "Australia/Perth": "Australia",
  "Pacific/Auckland": "New Zealand",
  "Pacific/Fiji": "Fiji"
};

const singleCountryPrefixes = {
  "Australia": "Australia",
  "NZ": "New Zealand",
  "Indian": "India"
};

function titleFromTzPart(part) {
  return part.replace(/_/g, " ");
}

function cityNameFromTimeZone(tz) {
  const segments = tz.split("/");
  const cityPart = segments[segments.length - 1];
  return titleFromTzPart(cityPart);
}

function countryFromTimeZone(tz) {
  if (countryByTimeZone[tz]) return countryByTimeZone[tz];
  const segments = tz.split("/");
  if (segments.length < 2) return "Unknown";
  if (singleCountryPrefixes[segments[0]]) return singleCountryPrefixes[segments[0]];
  if (segments[0] === "Etc" && segments[1] === "UTC") return "UTC";
  return "Unknown";
}

function buildWorldCities() {
  const supported = typeof Intl.supportedValuesOf === "function"
    ? Intl.supportedValuesOf("timeZone")
    : Object.keys(featuredCitiesByTz);
  return supported.map((tz, index) => {
    const featured = featuredCitiesByTz[tz];
    return {
      name: featured?.name || cityNameFromTimeZone(tz),
      country: featured?.country || countryFromTimeZone(tz),
      tz,
      color: featured?.color || COLOR_PALETTE[index % COLOR_PALETTE.length],
      lat: featured?.lat,
      lon: featured?.lon
    };
  });
}

const allCities = buildWorldCities();

const DEFAULT_ACTIVE = [
  "America/Toronto",
  "Asia/Riyadh",
  "Asia/Kolkata",
  "Australia/Sydney",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Manila"
];

function loadActiveCities() {
  try {
    const raw = localStorage.getItem("activeCities");
    if (!raw) return [...DEFAULT_ACTIVE];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return [...DEFAULT_ACTIVE];
    const valid = parsed.filter((tz) => allCities.some((city) => city.tz === tz));
    return valid.length ? valid : [...DEFAULT_ACTIVE];
  } catch {
    return [...DEFAULT_ACTIVE];
  }
}

function saveActiveCities() {
  localStorage.setItem("activeCities", JSON.stringify(state.activeCities));
}

const state = {
  use12Hour: true,
  mainCity: getCityByTz("America/Toronto") || allCities[0],
  activeCities: loadActiveCities()
};

const cityGrid = document.getElementById("cityGrid");
const formatToggle = document.getElementById("formatToggle");
const baseZoneSelect = document.getElementById("baseZone");
const targetZoneSelect = document.getElementById("targetZone");
const baseTimeInput = document.getElementById("baseTime");
const targetTimeInput = document.getElementById("targetTime");
const convertResult = document.getElementById("convertResult");
const convertDate = document.getElementById("convertDate");
const convertMeta = document.getElementById("convertMeta");
const citySearch = document.getElementById("citySearch");
const citySelect = document.getElementById("citySelect");
const addCityBtn = document.getElementById("addCity");
const resetDefaultsBtn = document.getElementById("resetDefaults");
const activeCitiesEl = document.getElementById("activeCities");

function getCityByTz(tz) {
  return allCities.find((city) => city.tz === tz);
}

function formatTime(date, timeZone, use12Hour) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: use12Hour,
    timeZone
  });
  return formatter.format(date);
}

function formatDate(date, timeZone) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone
  });
  return formatter.format(date);
}

function formatZone(date, timeZone) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "short"
  });
  const parts = formatter.formatToParts(date);
  const zonePart = parts.find((part) => part.type === "timeZoneName");
  return zonePart ? zonePart.value : "";
}

function formatOffset(date, timeZone) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset"
  });
  const parts = formatter.formatToParts(date);
  const zonePart = parts.find((part) => part.type === "timeZoneName");
  return zonePart ? zonePart.value : "";
}

function getOffsetMinutes(date, timeZone) {
  const offset = formatOffset(date, timeZone);
  const match = offset.match(/GMT([+-])(\d{2}):(\d{2})/);
  if (!match) return 0;
  const sign = match[1] === "-" ? -1 : 1;
  const hours = Number.parseInt(match[2], 10);
  const minutes = Number.parseInt(match[3], 10);
  return sign * (hours * 60 + minutes);
}

function offsetDiffLabel(baseMinutes, targetMinutes) {
  const diff = targetMinutes - baseMinutes;
  if (diff === 0) return "Same as Toronto";
  const sign = diff > 0 ? "ahead" : "behind";
  const abs = Math.abs(diff);
  const hours = Math.floor(abs / 60);
  const minutes = abs % 60;
  const parts = [];
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  return `${parts.join(" ")} ${sign} Toronto`;
}

function offsetDiffLabelWithBase(baseMinutes, targetMinutes, baseLabel) {
  const diff = targetMinutes - baseMinutes;
  if (diff === 0) return `Same as ${baseLabel}`;
  const sign = diff > 0 ? "ahead" : "behind";
  const abs = Math.abs(diff);
  const hours = Math.floor(abs / 60);
  const minutes = abs % 60;
  const parts = [];
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  return `${parts.join(" ")} ${sign} ${baseLabel}`;
}

function getLocalHour(date, timeZone) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    hour12: false,
    timeZone
  });
  const parts = formatter.formatToParts(date);
  const hourPart = parts.find((part) => part.type === "hour");
  return hourPart ? Number.parseInt(hourPart.value, 10) : 0;
}

function degToRad(value) {
  return (value * Math.PI) / 180;
}

function radToDeg(value) {
  return (value * 180) / Math.PI;
}

function getDayOfYear(date) {
  const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 0));
  const diff = date - start;
  return Math.floor(diff / 86400000);
}

function getSunTimes(date, lat, lon) {
  const day = getDayOfYear(date);
  const lngHour = lon / 15;

  function calcTime(isSunrise) {
    const t = day + ((isSunrise ? 6 : 18) - lngHour) / 24;
    const M = (0.9856 * t) - 3.289;
    let L = M + (1.916 * Math.sin(degToRad(M))) + (0.020 * Math.sin(degToRad(2 * M))) + 282.634;
    L = (L + 360) % 360;

    let RA = radToDeg(Math.atan(0.91764 * Math.tan(degToRad(L))));
    RA = (RA + 360) % 360;
    const Lquadrant = Math.floor(L / 90) * 90;
    const RAquadrant = Math.floor(RA / 90) * 90;
    RA = RA + (Lquadrant - RAquadrant);
    RA = RA / 15;

    const sinDec = 0.39782 * Math.sin(degToRad(L));
    const cosDec = Math.cos(Math.asin(sinDec));

    const cosH = (Math.cos(degToRad(90.833)) - (sinDec * Math.sin(degToRad(lat)))) /
      (cosDec * Math.cos(degToRad(lat)));

    if (cosH > 1 || cosH < -1) {
      return null;
    }

    let H = isSunrise ? 360 - radToDeg(Math.acos(cosH)) : radToDeg(Math.acos(cosH));
    H = H / 15;

    const T = H + RA - (0.06571 * t) - 6.622;
    let UT = T - lngHour;
    UT = (UT + 24) % 24;
    return UT;
  }

  const sunriseUT = calcTime(true);
  const sunsetUT = calcTime(false);
  return { sunriseUT, sunsetUT };
}

function isDaylight(date, city) {
  if (city.lat === undefined || city.lon === undefined) {
    const localHour = getLocalHour(date, city.tz);
    return localHour >= 6 && localHour < 18;
  }
  const { sunriseUT, sunsetUT } = getSunTimes(date, city.lat, city.lon);
  if (sunriseUT === null || sunsetUT === null) {
    return getLocalHour(date, city.tz) >= 6 && getLocalHour(date, city.tz) < 18;
  }

  const utcMinutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  const sunriseMinutes = Math.round(sunriseUT * 60);
  const sunsetMinutes = Math.round(sunsetUT * 60);

  if (sunriseMinutes < sunsetMinutes) {
    return utcMinutes >= sunriseMinutes && utcMinutes < sunsetMinutes;
  }
  return utcMinutes >= sunriseMinutes || utcMinutes < sunsetMinutes;
}

function buildGrid() {
  cityGrid.innerHTML = "";
  state.activeCities.forEach((tz) => {
    const city = getCityByTz(tz);
    if (!city) return;
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.tz = city.tz;
    card.dataset.color = "true";
    card.style.setProperty("--card-accent", city.color);

    card.innerHTML = `
      <div class="card-header">
        <div class="city">${city.name}</div>
        <span class="badge" data-field="daynight">---</span>
      </div>
      <div class="zone">${city.country}</div>
      <div class="local" data-field="time">--:--:--</div>
      <div class="zone" data-field="date">---</div>
      <div class="zone" data-field="zone">---</div>
      <div class="zone" data-field="diff">---</div>
    `;
    cityGrid.appendChild(card);
  });
}

function populateConverter() {
  const zones = ["UTC", ...allCities.map((city) => city.tz)];
  const uniqueZones = Array.from(new Set(zones));
  baseZoneSelect.innerHTML = "";
  targetZoneSelect.innerHTML = "";
  const now = new Date();

  uniqueZones.forEach((zone) => {
    const optionA = document.createElement("option");
    optionA.value = zone;
    optionA.textContent = getZoneLabel(now, zone);
    optionA.dataset.abbr = formatZone(now, zone);
    baseZoneSelect.appendChild(optionA);

    const optionB = document.createElement("option");
    optionB.value = zone;
    optionB.textContent = getZoneLabel(now, zone);
    optionB.dataset.abbr = formatZone(now, zone);
    targetZoneSelect.appendChild(optionB);
  });

  const detectedZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (detectedZone && !uniqueZones.includes(detectedZone)) {
    const extraOptionA = document.createElement("option");
    extraOptionA.value = detectedZone;
    extraOptionA.textContent = `${detectedZone} (Local)`;
    baseZoneSelect.insertBefore(extraOptionA, baseZoneSelect.firstChild);

    const extraOptionB = document.createElement("option");
    extraOptionB.value = detectedZone;
    extraOptionB.textContent = `${detectedZone} (Local)`;
    targetZoneSelect.insertBefore(extraOptionB, targetZoneSelect.firstChild);
  }

  baseZoneSelect.value = detectedZone || "America/Toronto";
  targetZoneSelect.value = "UTC";
  const localISO = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  baseTimeInput.value = localISO;
  targetTimeInput.value = localISO;
}

let isConverting = false;

function toLocalInputValue(date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

function getZoneLabel(date, timeZone) {
  const abbr = formatZone(date, timeZone);
  return abbr ? `${abbr} - ${timeZone}` : timeZone;
}

function convertBaseToTarget(baseDate, baseZone, targetZone) {
  const baseOffset = getOffsetMinutes(baseDate, baseZone);
  const targetOffset = getOffsetMinutes(baseDate, targetZone);
  const utcMs = baseDate.getTime() - baseOffset * 60000;
  const targetDate = new Date(utcMs + targetOffset * 60000);
  return { targetDate, baseOffset, targetOffset };
}

function convertFromBase() {
  if (!baseTimeInput.value || isConverting) return;
  isConverting = true;
  const baseZone = baseZoneSelect.value;
  const targetZone = targetZoneSelect.value;
  const baseDate = new Date(baseTimeInput.value);
  if (Number.isNaN(baseDate.getTime())) return;

  const { targetDate, baseOffset, targetOffset } = convertBaseToTarget(baseDate, baseZone, targetZone);

  convertResult.textContent = formatTime(targetDate, targetZone, state.use12Hour);
  convertDate.textContent = formatDate(targetDate, targetZone);
  if (convertMeta) {
    const targetShort = formatZone(targetDate, targetZone);
    const targetOffsetLabel = formatOffset(targetDate, targetZone).replace("GMT", "UTC");
    const baseLabel = baseZone === "UTC" ? "UTC" : (getCityByTz(baseZone)?.name || baseZone);
    convertMeta.textContent = `Target: ${targetShort} (${targetOffsetLabel}) | ${offsetDiffLabelWithBase(baseOffset, targetOffset, baseLabel)}`;
  }
  targetTimeInput.value = toLocalInputValue(targetDate);
  isConverting = false;
}

function convertFromTarget() {
  if (!targetTimeInput.value || isConverting) return;
  isConverting = true;
  const baseZone = baseZoneSelect.value;
  const targetZone = targetZoneSelect.value;
  const targetDate = new Date(targetTimeInput.value);
  if (Number.isNaN(targetDate.getTime())) return;

  const targetOffset = getOffsetMinutes(targetDate, targetZone);
  const baseOffset = getOffsetMinutes(targetDate, baseZone);
  const utcMs = targetDate.getTime() - targetOffset * 60000;
  const baseDate = new Date(utcMs + baseOffset * 60000);

  baseTimeInput.value = toLocalInputValue(baseDate);
  convertResult.textContent = formatTime(targetDate, targetZone, state.use12Hour);
  convertDate.textContent = formatDate(targetDate, targetZone);
  if (convertMeta) {
    const targetShort = formatZone(targetDate, targetZone);
    const targetOffsetLabel = formatOffset(targetDate, targetZone).replace("GMT", "UTC");
    const baseLabel = baseZone === "UTC" ? "UTC" : (getCityByTz(baseZone)?.name || baseZone);
    convertMeta.textContent = `Target: ${targetShort} (${targetOffsetLabel}) | ${offsetDiffLabelWithBase(baseOffset, targetOffset, baseLabel)}`;
  }
  isConverting = false;
}

function renderActiveCities() {
  activeCitiesEl.innerHTML = "";
  state.activeCities.forEach((tz) => {
    const city = getCityByTz(tz);
    if (!city) return;
    const item = document.createElement("div");
    item.className = "active-item";
    item.innerHTML = `
      <span>${city.name}</span>
      <button class="remove-btn" data-tz="${city.tz}">Remove</button>
    `;
    activeCitiesEl.appendChild(item);
  });
}

function refreshCitySelect() {
  const searchValue = citySearch.value.trim().toLowerCase();
  const activeSet = new Set(state.activeCities);
  const filtered = allCities
    .filter((city) => !activeSet.has(city.tz))
    .filter((city) =>
      city.name.toLowerCase().includes(searchValue) ||
      city.tz.toLowerCase().includes(searchValue)
    );

  citySelect.innerHTML = "";
  filtered.forEach((city) => {
    const option = document.createElement("option");
    option.value = city.tz;
    option.textContent = `${city.name} (${city.tz})`;
    citySelect.appendChild(option);
  });
}

function addSelectedCity() {
  const tz = citySelect.value;
  if (!tz) return;
  if (!state.activeCities.includes(tz)) {
    state.activeCities.push(tz);
  }
  saveActiveCities();
  buildGrid();
  renderActiveCities();
  refreshCitySelect();
  updateClocks();
}

function removeCity(tz) {
  if (tz === "America/Toronto") return;
  state.activeCities = state.activeCities.filter((item) => item !== tz);
  saveActiveCities();
  buildGrid();
  renderActiveCities();
  refreshCitySelect();
  updateClocks();
}

function resetDefaults() {
  state.activeCities = [...DEFAULT_ACTIVE];
  saveActiveCities();
  buildGrid();
  renderActiveCities();
  refreshCitySelect();
  updateClocks();
}

function updateClocks() {
  const now = new Date();

  const mainTime = document.getElementById("mainTime");
  const mainDate = document.getElementById("mainDate");
  const utcTime = document.getElementById("utcTime");
  const utcDate = document.getElementById("utcDate");

  mainTime.textContent = formatTime(now, state.mainCity.tz, state.use12Hour);
  mainDate.textContent = formatDate(now, state.mainCity.tz);
  utcTime.textContent = formatTime(now, "UTC", state.use12Hour);
  utcDate.textContent = formatDate(now, "UTC");

  const baseOffset = getOffsetMinutes(now, "America/Toronto");

  document.querySelectorAll(".card").forEach((card) => {
    const tz = card.dataset.tz;
    const city = getCityByTz(tz);
    const timeEl = card.querySelector('[data-field="time"]');
    const dateEl = card.querySelector('[data-field="date"]');
    const zoneEl = card.querySelector('[data-field="zone"]');
    const diffEl = card.querySelector('[data-field="diff"]');
    const dayNightEl = card.querySelector('[data-field="daynight"]');

    timeEl.textContent = formatTime(now, tz, state.use12Hour);
    dateEl.textContent = formatDate(now, tz);
    const shortZone = formatZone(now, tz);
    const offsetLabel = formatOffset(now, tz).replace("GMT", "UTC");
    zoneEl.textContent = `TZ: ${shortZone} (${offsetLabel})`;
    const targetOffset = getOffsetMinutes(now, tz);
    diffEl.textContent = `Offset: ${offsetDiffLabel(baseOffset, targetOffset)}`;

    if (city && dayNightEl) {
      const isDay = isDaylight(now, city);
      if (isDay) {
        dayNightEl.innerHTML = `
          <svg viewBox="0 0 24 24" aria-label="Sun" role="img">
            <circle cx="12" cy="12" r="5" fill="currentColor"></circle>
            <g stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="12" y1="1.5" x2="12" y2="4.5"></line>
              <line x1="12" y1="19.5" x2="12" y2="22.5"></line>
              <line x1="1.5" y1="12" x2="4.5" y2="12"></line>
              <line x1="19.5" y1="12" x2="22.5" y2="12"></line>
              <line x1="4.4" y1="4.4" x2="6.7" y2="6.7"></line>
              <line x1="17.3" y1="17.3" x2="19.6" y2="19.6"></line>
              <line x1="17.3" y1="6.7" x2="19.6" y2="4.4"></line>
              <line x1="4.4" y1="19.6" x2="6.7" y2="17.3"></line>
            </g>
          </svg>
        `;
      } else {
        dayNightEl.innerHTML = `
          <svg viewBox="0 0 24 24" aria-label="Moon" role="img">
            <path fill="currentColor" d="M14.5 2.5c-1.2 1.6-1.8 3.5-1.8 5.5 0 5 4 9 9 9 0.6 0 1.2 0 1.8-0.2-1.5 3.3-4.8 5.7-8.7 5.7-5.4 0-9.8-4.4-9.8-9.8 0-4.9 3.6-9 8.5-10.2z"></path>
          </svg>
        `;
      }
      dayNightEl.classList.toggle("day", isDay);
      dayNightEl.classList.toggle("night", !isDay);
    }
  });
}

formatToggle.addEventListener("click", () => {
  state.use12Hour = !state.use12Hour;
  formatToggle.setAttribute("aria-pressed", state.use12Hour ? "true" : "false");
  updateClocks();
  convertFromBase();
});

baseZoneSelect.addEventListener("change", convertFromBase);
targetZoneSelect.addEventListener("change", convertFromBase);
baseTimeInput.addEventListener("change", convertFromBase);
baseTimeInput.addEventListener("input", convertFromBase);
targetTimeInput.addEventListener("change", convertFromTarget);
targetTimeInput.addEventListener("input", convertFromTarget);
citySearch.addEventListener("input", refreshCitySelect);
addCityBtn.addEventListener("click", addSelectedCity);
resetDefaultsBtn.addEventListener("click", resetDefaults);
activeCitiesEl.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches(".remove-btn")) {
    removeCity(target.dataset.tz);
  }
});

buildGrid();
renderActiveCities();
refreshCitySelect();
populateConverter();
updateClocks();
convertFromBase();
setInterval(updateClocks, 1000);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
