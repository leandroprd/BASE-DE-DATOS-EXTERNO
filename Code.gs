const SPREADSHEET_ID = "PEGAR_ID_DE_SHEET_AQUI";
const CACHE_TTL_SECONDS = 600; // 10 minutos

function doGet(e) {
  const mode = e?.parameter?.mode || "";
  if (mode === "data") {
    const refresh = e?.parameter?.refresh === "1";
    const payload = getDbPayload_(refresh);
    return ContentService.createTextOutput(JSON.stringify(payload))
      .setMimeType(ContentService.MimeType.JSON);
  }
  return HtmlService.createHtmlOutputFromFile("Index");
}

function getDbPayload_(refresh) {
  const cache = CacheService.getScriptCache();
  if (!refresh) {
    const cached = cache.get("db_payload");
    if (cached) return JSON.parse(cached);
  }

  const payload = buildDbPayload_();
  cache.put("db_payload", JSON.stringify(payload), CACHE_TTL_SECONDS);
  return payload;
}

function buildDbPayload_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const config = readConfig_(ss);
  const lamas_table = readLamasTable_(ss);
  const montagesData = readMontages_(ss);
  const catalogo = readCatalogo_(ss);
  const descripciones = readKeyValueSheet_(ss, "DESCRIPCIONES");

  const dbVersion = config.db_version || config.DB_VERSION || config.version || "";

  return {
    meta: {
      generated_at: new Date().toISOString(),
      db_version: dbVersion
    },
    config,
    lamas_table,
    montages: montagesData.montages,
    montages_details: montagesData.montages_details,
    tipo_material: catalogo.tipo_material,
    perfiles: catalogo.perfiles,
    accesorios: catalogo.accesorios,
    descripciones
  };
}

function readConfig_(ss) {
  const sheet = ss.getSheetByName("CONFIG");
  if (!sheet) return {};
  const values = sheet.getDataRange().getValues();
  if (!values.length) return {};

  const firstCell = String(values[0][0] || "").toLowerCase();
  const hasHeader = firstCell.includes("key") || firstCell.includes("clave");
  const startRow = hasHeader ? 1 : 0;
  const config = {};

  for (let i = startRow; i < values.length; i++) {
    const row = values[i];
    const key = String(row[0] || "").trim();
    if (!key) continue;
    const value = parseConfigValue_(row[1]);
    config[key] = value;
  }
  return config;
}

function readLamasTable_(ss) {
  const sheet = ss.getSheetByName("LAMAS_TABLE");
  if (!sheet) return [];
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map(h => String(h || "").trim().toLowerCase());
  const nIndex = headers.indexOf("n");
  const minIndex = headers.indexOf("min");
  const maxIndex = headers.indexOf("max");

  return values.slice(1).reduce((acc, row) => {
    const n = nIndex >= 0 ? row[nIndex] : row[0];
    const min = minIndex >= 0 ? row[minIndex] : row[1];
    const max = maxIndex >= 0 ? row[maxIndex] : row[2];
    if (n === "" || n === null || min === "" || min === null || max === "" || max === null) return acc;
    acc.push({
      n: Number(n),
      min: Number(min),
      max: Number(max)
    });
    return acc;
  }, []);
}

function readMontages_(ss) {
  const sheet = ss.getSheetByName("MONTAGES");
  if (!sheet) return { montages: {}, montages_details: {} };
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return { montages: {}, montages_details: {} };

  const headers = values[0].map(h => String(h || "").trim().toLowerCase());
  const keyIndex = headers.indexOf("key");
  const labelIndex = headers.indexOf("label");
  const detailIndex = headers.indexOf("detail");

  const montages = {};
  const montages_details = {};

  values.slice(1).forEach(row => {
    const key = String(row[keyIndex >= 0 ? keyIndex : 0] || "").trim();
    if (!key) return;
    const label = String(row[labelIndex >= 0 ? labelIndex : 1] || "").trim();
    const detail = String(row[detailIndex >= 0 ? detailIndex : 2] || "").trim();
    if (label) montages[key] = label;
    if (detail) montages_details[key] = detail;
  });

  return { montages, montages_details };
}

function readCatalogo_(ss) {
  const sheet = ss.getSheetByName("CATALOGO");
  if (!sheet) return { tipo_material: {}, perfiles: {}, accesorios: {} };
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return { tipo_material: {}, perfiles: {}, accesorios: {} };

  const headers = values[0].map(h => String(h || "").trim());
  const lowerHeaders = headers.map(h => h.toLowerCase());

  const refIndex = lowerHeaders.indexOf("ref") >= 0 ? lowerHeaders.indexOf("ref") : lowerHeaders.indexOf("referencia");
  const tipoIndex = lowerHeaders.indexOf("tipo") >= 0 ? lowerHeaders.indexOf("tipo") : lowerHeaders.indexOf("categoria");

  const tipo_material = {};
  const perfiles = {};
  const accesorios = {};

  values.slice(1).forEach(row => {
    const refValue = row[refIndex >= 0 ? refIndex : 0];
    const ref = String(refValue || "").trim();
    if (!ref) return;

    const tipoValue = row[tipoIndex >= 0 ? tipoIndex : 1];
    const tipo = String(tipoValue || "").trim().toLowerCase();

    const item = {};
    headers.forEach((header, idx) => {
      if (!header) return;
      const value = parseCatalogValue_(row[idx], header.toLowerCase());
      if (value === null) return;
      item[header] = value;
    });

    item.ref = ref;
    delete item.tipo;
    delete item.Tipo;
    delete item.categoria;
    delete item.Categoria;
    delete item.referencia;
    delete item.Referencia;

    if (tipo === "perfil") {
      perfiles[ref] = item;
      tipo_material[ref] = "perfil";
    } else if (tipo === "accesorio") {
      accesorios[ref] = item;
      tipo_material[ref] = "accesorio";
    }
  });

  return { tipo_material, perfiles, accesorios };
}

function readKeyValueSheet_(ss, name) {
  const sheet = ss.getSheetByName(name);
  if (!sheet) return {};
  const values = sheet.getDataRange().getValues();
  if (!values.length) return {};

  const firstCell = String(values[0][0] || "").toLowerCase();
  const hasHeader = firstCell.includes("key") || firstCell.includes("clave");
  const startRow = hasHeader ? 1 : 0;
  const map = {};

  for (let i = startRow; i < values.length; i++) {
    const row = values[i];
    const key = String(row[0] || "").trim();
    if (!key) continue;
    map[key] = String(row[1] || "");
  }
  return map;
}

function parseConfigValue_(value) {
  if (value === null || value === "") return "";
  if (typeof value === "number") return value;
  const trimmed = String(value).trim();
  if (!trimmed) return "";
  if ((trimmed.startsWith("{") && trimmed.endsWith("}")) || (trimmed.startsWith("[") && trimmed.endsWith("]"))) {
    try {
      return JSON.parse(trimmed);
    } catch (err) {
      return trimmed;
    }
  }
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  return trimmed;
}

function parseCatalogValue_(value, header) {
  if (value === null || value === "") return null;
  if (typeof value === "number") return value;
  const trimmed = String(value).trim();
  if (!trimmed) return null;

  if ((trimmed.startsWith("{") && trimmed.endsWith("}")) || (trimmed.startsWith("[") && trimmed.endsWith("]"))) {
    try {
      return JSON.parse(trimmed);
    } catch (err) {
      return trimmed;
    }
  }

  if (header === "longitudes_barra") {
    const parts = trimmed.split(",").map(v => Number(v.trim())).filter(v => !Number.isNaN(v));
    return parts.length ? parts : null;
  }

  const numericHeaders = new Set([
    "peso_kg_m",
    "perimetro_total_mm",
    "perimetro_ext_mm",
    "perimetro_int_mm"
  ]);
  if (numericHeaders.has(header) && /^-?\d+(\.\d+)?$/.test(trimmed)) {
    return Number(trimmed);
  }

  return trimmed;
}

/*
Pruebas:
- Abrir URL_WEBAPP?mode=data => devuelve JSON
- Abrir URL_WEBAPP => carga interfaz y calcula igual
- Cambiar un precio en Sheets y refrescar => cambia resultado
*/
