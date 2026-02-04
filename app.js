const allCities = [
  { name: "Toronto", tz: "America/Toronto", color: "#56f2c8", lat: 43.6532, lon: -79.3832 },
  { name: "Khartoum", tz: "Africa/Khartoum", color: "#ffb703", lat: 15.5007, lon: 32.5599 },
  { name: "Jeddah", tz: "Asia/Riyadh", color: "#8ecae6", lat: 21.4858, lon: 39.1925 },
  { name: "Cairo", tz: "Africa/Cairo", color: "#f28482", lat: 30.0444, lon: 31.2357 },
  { name: "Dubai", tz: "Asia/Dubai", color: "#9b87f5", lat: 25.2048, lon: 55.2708 },
  { name: "Delhi", tz: "Asia/Kolkata", color: "#80ed99", lat: 28.6139, lon: 77.2090 },
  { name: "Sydney", tz: "Australia/Sydney", color: "#ffd166", lat: -33.8688, lon: 151.2093 },
  { name: "Tokyo", tz: "Asia/Tokyo", color: "#a8dadc", lat: 35.6762, lon: 139.6503 },
  { name: "Beijing", tz: "Asia/Shanghai", color: "#ff8fab", lat: 39.9042, lon: 116.4074 },
  { name: "New York", tz: "America/New_York", color: "#cdb4db", lat: 40.7128, lon: -74.0060 },
  { name: "London", tz: "Europe/London", color: "#bde0fe", lat: 51.5074, lon: -0.1278 },
  { name: "Paris", tz: "Europe/Paris", color: "#ffc8dd", lat: 48.8566, lon: 2.3522 },
  { name: "Berlin", tz: "Europe/Berlin", color: "#b5e48c", lat: 52.5200, lon: 13.4050 },
  { name: "Moscow", tz: "Europe/Moscow", color: "#f9c74f", lat: 55.7558, lon: 37.6173 },
  { name: "Riyadh", tz: "Asia/Riyadh", color: "#90be6d", lat: 24.7136, lon: 46.6753 },
  { name: "Nairobi", tz: "Africa/Nairobi", color: "#f94144", lat: -1.2921, lon: 36.8219 },
  { name: "Cape Town", tz: "Africa/Johannesburg", color: "#43aa8b", lat: -33.9249, lon: 18.4241 },
  { name: "Sao Paulo", tz: "America/Sao_Paulo", color: "#4d908e", lat: -23.5558, lon: -46.6396 },
  { name: "Mexico City", tz: "America/Mexico_City", color: "#f3722c", lat: 19.4326, lon: -99.1332 },
  { name: "Los Angeles", tz: "America/Los_Angeles", color: "#577590", lat: 34.0522, lon: -118.2437 },
  { name: "Chicago", tz: "America/Chicago", color: "#f8961e", lat: 41.8781, lon: -87.6298 },
  { name: "Singapore", tz: "Asia/Singapore", color: "#9ef01a", lat: 1.3521, lon: 103.8198 },
  { name: "Hong Kong", tz: "Asia/Hong_Kong", color: "#ffd60a", lat: 22.3193, lon: 114.1694 },
  { name: "Seoul", tz: "Asia/Seoul", color: "#48bfe3", lat: 37.5665, lon: 126.9780 },
  { name: "Bangkok", tz: "Asia/Bangkok", color: "#ffafcc", lat: 13.7563, lon: 100.5018 }
];

const DEFAULT_ACTIVE = [
  "America/Toronto",
  "Africa/Khartoum",
  "Asia/Riyadh",
  "Africa/Cairo",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Australia/Sydney",
  "Asia/Tokyo",
  "Asia/Shanghai"
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
  mainCity: allCities[0],
  activeCities: loadActiveCities()
};

const cityGrid = document.getElementById("cityGrid");
const formatToggle = document.getElementById("formatToggle");
const baseZoneSelect = document.getElementById("baseZone");
const targetZoneSelect = document.getElementById("targetZone");
const baseTimeInput = document.getElementById("baseTime");
const convertResult = document.getElementById("convertResult");
const convertDate = document.getElementById("convertDate");
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
    return true;
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

  uniqueZones.forEach((zone) => {
    const optionA = document.createElement("option");
    optionA.value = zone;
    optionA.textContent = zone;
    baseZoneSelect.appendChild(optionA);

    const optionB = document.createElement("option");
    optionB.value = zone;
    optionB.textContent = zone;
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
  const now = new Date();
  const localISO = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  baseTimeInput.value = localISO;
}

function convertTime() {
  if (!baseTimeInput.value) return;
  const baseZone = baseZoneSelect.value;
  const targetZone = targetZoneSelect.value;
  const baseDate = new Date(baseTimeInput.value);
  if (Number.isNaN(baseDate.getTime())) return;

  const baseOffset = getOffsetMinutes(baseDate, baseZone);
  const targetOffset = getOffsetMinutes(baseDate, targetZone);
  const utcMs = baseDate.getTime() - baseOffset * 60000;
  const targetDate = new Date(utcMs + targetOffset * 60000);

  convertResult.textContent = formatTime(targetDate, targetZone, state.use12Hour);
  convertDate.textContent = formatDate(targetDate, targetZone);
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
    .filter((city) => city.name.toLowerCase().includes(searchValue));

  citySelect.innerHTML = "";
  filtered.forEach((city) => {
    const option = document.createElement("option");
    option.value = city.tz;
    option.textContent = city.name;
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
  convertTime();
});

baseZoneSelect.addEventListener("change", convertTime);
targetZoneSelect.addEventListener("change", convertTime);
baseTimeInput.addEventListener("change", convertTime);
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
convertTime();
setInterval(updateClocks, 1000);
