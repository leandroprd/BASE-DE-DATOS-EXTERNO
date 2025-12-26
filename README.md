<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Presupuestador pérgola bioclimática - Galisur</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <!-- Librería html2pdf.js para generación de PDF -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"></script>

  <style>
    :root {
      --blue-main: #0054a6;
      --blue-dark: #003b7a;
      --blue-soft: #e6f0fb;
      --bg: #f5f7fb;
      --card-bg: #ffffff;
      --border: #d1d9e6;
      --border-subtle: #d7deea;
      --primary-color: var(--blue-main);
      --text: #0f172a;
      --text-soft: #4b5563;
      --danger: #b91c1c;
      --radius: 0.9rem;
      --shadow-soft: 0 14px 35px rgba(15, 23, 42, 0.12);
    }
    * {
      box-sizing:border-box;
      font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
    }
    body{
      margin:0;
      background:radial-gradient(circle at top left,#e3edff,#f5f7fb 40%);
      color:var(--text);
    }
    .app{
      max-width:1200px;
      margin:0 auto 2rem;
      background:transparent;
    }

    /* Cabecera página (título, versión…) */
    .page-title-block{
      padding:0.8rem 1.5rem 0.4rem;
    }
    .title-row{
      display:flex;
      justify-content:space-between;
      align-items:flex-start;
      gap:1rem;
    }
    h1{margin:0; font-size:1.45rem; color:var(--blue-dark);}
    .subtitle{margin:0.25rem 0 0; color:var(--text-soft); font-size:0.9rem;}
    .version-pill{
      font-size:0.75rem;
      border-radius:999px;
      padding:0.25rem 0.7rem;
      border:1px solid rgba(148,163,184,0.7);
      background:#ffffffd9;
      display:inline-flex;
      align-items:center;
      gap:0.35rem;
      color:var(--text-soft);
    }
    .version-dot{
      width:7px; height:7px; border-radius:999px;
      background:#16a34a;
    }

    .internal-note{display:none!important;}

    .page-break-before{
      page-break-before:auto;
      break-before:auto;
    }

    .documento-pdf{display:none;}
    .pdf-mode .step-badge{display:none;}

    /* Layout principal */
    .layout{
      display:grid;
      grid-template-columns:minmax(0,1.05fr) minmax(0,1.3fr);
      gap:1.25rem;
      padding:0.4rem 1.5rem 0;
    }
    @media (max-width:960px){
      .layout{
        grid-template-columns:minmax(0,1fr);
        padding:0.4rem 0.9rem 0;
      }
    }

    .card{
      background:var(--card-bg);
      border-radius:var(--radius);
      box-shadow:var(--shadow-soft);
      border:1px solid var(--border);
      padding:1.1rem 1.25rem;
    }
    .card-header{
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin-bottom:0.9rem;
      gap:0.75rem;
    }
    .card-title{
      font-size:1.02rem;
      font-weight:600;
      color:var(--blue-dark);
      display:flex;
      align-items:center;
      gap:0.5rem;
    }
    .step-badge{
      width:24px; height:24px;
      border-radius:999px;
      background:var(--blue-soft);
      color:var(--blue-main);
      display:inline-flex;
      align-items:center;
      justify-content:center;
      font-size:0.8rem;
      font-weight:700;
    }
    .pill{
      display:inline-flex;
      align-items:center;
      padding:0.2rem 0.6rem;
      border-radius:999px;
      font-size:0.7rem;
      background:var(--blue-soft);
      color:var(--blue-main);
      text-transform:uppercase;
      letter-spacing:0.05em;
    }

    .grid{display:grid; gap:0.65rem 1rem;}
    .grid-2{grid-template-columns:repeat(2,minmax(0,1fr));}
    .grid-3{grid-template-columns:repeat(3,minmax(0,1fr));}
    @media (max-width:800px){
      .grid-2,.grid-3{grid-template-columns:minmax(0,1fr);}
    }

    .field{display:flex; flex-direction:column;}
    label{
      display:block;
      font-size:0.8rem;
      color:var(--text-soft);
      margin-bottom:0.15rem;
      font-weight:600;
    }
    input[type="number"],input[type="text"],select{
      width:100%;
      padding:0.4rem 0.55rem;
      border-radius:0.6rem;
      border:1px solid var(--border);
      font-size:0.86rem;
      background:#f9fafb;
      outline:none;
      transition:border-color .15s, box-shadow .15s, background .15s;
    }
    input::placeholder{color:#9ca3af;}
    input:focus,select:focus{
      border-color:var(--blue-main);
      background:#ffffff;
      box-shadow:0 0 0 1px rgba(37,99,235,0.2);
    }
    .field-note{
      font-size:0.74rem;
      color:var(--text-soft);
      margin-top:0.15rem;
    }
    .field-error{
      font-size:0.75rem;
      color:var(--danger);
      margin-top:0.1rem;
    }
    .inline-checkbox{
      display:flex;
      align-items:center;
      gap:0.4rem;
      margin-top:0.2rem;
    }
    .inline-checkbox input[type="checkbox"]{
      width:15px; height:15px;
    }

    .pill-group{display:flex; flex-wrap:wrap; gap:0.4rem;}
    .pill-option{position:relative;}
    .pill-option input{
      position:absolute;
      opacity:0;
      pointer-events:none;
    }
    .pill-option span{
      display:inline-flex;
      align-items:center;
      padding:0.25rem 0.8rem;
      border-radius:999px;
      border:1px solid var(--border);
      font-size:0.78rem;
      background:#f9fafb;
      color:var(--text-soft);
      cursor:pointer;
      transition:all .15s;
    }
    .pill-option input:checked + span{
      background:var(--blue-main);
      color:#fff;
      border-color:var(--blue-main);
      box-shadow:0 10px 24px rgba(37,99,235,0.5);
    }

    .note{
      margin-top:0.55rem;
      padding:0.45rem 0.55rem;
      border-radius:0.6rem;
      border:1px dashed #cbd5f1;
      background:#f3f6ff;
      font-size:0.72rem;
      color:var(--text-soft);
      display:flex;
      gap:0.35rem;
      align-items:flex-start;
    }
    .note strong{color:var(--blue-dark);}
    .note-icon{font-size:0.9rem; line-height:1;}

    .pilares-pill{
      display:inline-flex;
      align-items:center;
      justify-content:center;
      padding:0.25rem 0.85rem;
      border-radius:999px;
      background:#eef2ff;
      color:#3730a3;
      font-size:0.82rem;
      font-weight:600;
      min-width:52px;
    }

    .btn-row{
      display:flex;
      justify-content:flex-end;
      gap:0.5rem;
      margin-top:0.75rem;
      flex-wrap:wrap;
    }
    .pdf-actions-footer{
      display:flex;
      justify-content:flex-end;
      margin-top:0.75rem;
    }
    button{
      border-radius:999px;
      border:none;
      font-size:0.82rem;
      font-weight:600;
      padding:0.45rem 1rem;
      cursor:pointer;
      display:inline-flex;
      align-items:center;
      gap:0.35rem;
      transition:transform .08s, box-shadow .08s, background .12s;
    }
    button.primary{
      background:var(--blue-main);
      color:#fff;
      box-shadow:0 10px 26px rgba(0,84,166,0.5);
    }
    button.primary:hover{
      transform:translateY(-1px);
      box-shadow:0 14px 32px rgba(0,84,166,0.6);
    }
    button.secondary{
      background:#e5e7eb;
      color:#111827;
    }
    button.secondary:hover{
      background:#d1d5db;
    }

    .warning{
      margin-top:0.3rem;
      font-size:0.8rem;
      color:var(--danger);
    }

    .aviso-amarillo{
      margin-top:0.4rem;
      padding:0.55rem 0.65rem;
      border-radius:0.65rem;
      background:#fef9c3;
      color:#92400e;
      border:1px solid #fcd34d;
      font-size:0.82rem;
      line-height:1.35;
    }

    .refuerzo-bloque{
      margin-top:0.35rem;
      display:flex;
      flex-direction:column;
      gap:0.25rem;
    }

    /* Bloque datos generales */
    .datos-presupuesto{
      padding:0 1.5rem 0.4rem;
    }
    .datos-grid{
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:0.7rem;
    }
    @media(max-width:900px){
      .datos-presupuesto{padding:0 0.9rem 0.4rem;}
      .datos-grid{grid-template-columns:minmax(0,1fr);}
    }

    /* Columna derecha */
    .split-right{
      display:flex;
      flex-direction:column;
      gap:0.9rem;
    }
    .diagram-wrapper{
      border-radius:0.7rem;
      border:1px solid var(--border);
      background:#f9fafb;
      padding:0.45rem;
      display:flex;
      justify-content:center;
      align-items:center;
    }
    svg{max-width:100%; height:auto;}
    .diagram-caption{
      font-size:0.74rem;
      color:var(--text-soft);
      margin-top:0.35rem;
    }
    #pdfDiagramSection .diagram-wrapper{max-width:420px; margin:0 auto; overflow:visible;}
    #pdfDiagramSection svg{max-width:82%; height:auto;}
    .solo-pdf{display:none;}
    .solo-web{display:block;}
    .pdf-mode .solo-pdf{display:block;}
    .pdf-mode .solo-pdf[data-show-pdf="0"]{display:none!important;}
    .pdf-mode .solo-web{display:none!important;}
    .pdf-mode .step-badge{display:none!important;}
    .pdf-mode .pdf-section-break{page-break-before:always; break-before:page; margin-top:18mm !important;}
    .pdf-mode #materialesCard{
      page-break-before:always;
      break-before:page;
      margin-top:24mm !important;
      page-break-inside:avoid;
      break-inside:avoid;
      border:none;
      box-shadow:none;
      background:transparent;
    }
    .pdf-mode #pdfDiagramSection .diagram-wrapper{max-width:360px; overflow:visible;}
    .pdf-mode #pdfDiagramSection svg{max-width:72%; width:300px; height:212px;}

    .summary-block{
      border-radius:0.6rem;
      border:1px dashed #cbd5f1;
      background:#f8fafc;
      padding:0.45rem 0.6rem;
      font-size:0.8rem;
      color:var(--text-soft);
      margin-top:0.15rem;
    }
    .summary-block h3{
      margin:0 0 0.25rem;
      font-size:0.86rem;
      font-weight:600;
      color:var(--blue-dark);
    }
    .summary-list{
      margin:0;
      padding-left:1rem;
    }
    .summary-list li{margin-bottom:0.15rem;}

    .price-totals{display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:0.45rem;}
    .price-chip{padding:0.4rem 0.55rem; border-radius:0.6rem; background:#eef2ff; color:var(--blue-dark); font-weight:600; font-size:0.85rem;}
    .price-chip .label{display:block; color:var(--text-soft); font-weight:500; font-size:0.75rem;}

    /* Bloque Presupuesto (PDF + web) */
    #doc-presupuesto-resumen{
      border:none;
      background:transparent;
      padding:0;
    }

    .budget-card{
      background:linear-gradient(135deg,#f9fafb 0%,#eef2ff 100%);
      border:none;
      border-radius:1rem;
      box-shadow:var(--shadow-soft);
      padding:1rem 1.2rem;
      color:var(--text);
    }

    .budget-header{
      display:flex;
      justify-content:space-between;
      align-items:flex-end;
      gap:0.75rem;
      margin-bottom:0.65rem;
    }

    .budget-header h3{
      margin:0;
      font-size:1rem;
      color:var(--blue-dark);
    }

    .budget-total{
      font-size:1.4rem;
      font-weight:700;
      color:var(--blue-dark);
      line-height:1.1;
    }

    .budget-items{
      display:flex;
      flex-direction:column;
      border:1px solid var(--border-subtle);
      border-radius:0.8rem;
      background:#ffffff;
      padding:0.35rem 0.75rem;
    }

    .budget-row{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:0.5rem;
      padding:0.4rem 0;
      border-bottom:1px solid var(--border-subtle);
    }

    .budget-row:last-child{border-bottom:none;}

    .budget-row-label{
      display:flex;
      align-items:center;
      gap:0.4rem;
      font-size:0.86rem;
      color:var(--text-soft);
    }

    .budget-icon{
      font-size:1rem;
      margin-right:0.5rem;
      color:var(--primary-color);
    }

    .budget-value{
      font-weight:700;
      font-size:0.95rem;
      color:var(--blue-dark);
    }

    .budget-discount{
      display:flex;
      flex-direction:column;
      align-items:flex-end;
      gap:0.2rem;
    }

    .budget-discount-input{
      display:flex;
      align-items:center;
      gap:0.3rem;
    }

    .budget-discount-input input{
      width:70px;
      padding:0.25rem 0.35rem;
      border-radius:0.55rem;
      border:1px solid var(--border-subtle);
      background:#f8fafc;
      font-size:0.85rem;
      text-align:right;
    }

    .budget-discount-amount{
      font-size:0.78rem;
      color:var(--text-soft);
    }

    .descuento-row{
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:0.5rem;
    }

    .descuento-izq{
      display:flex;
      align-items:center;
      gap:0.5rem;
    }

    .descuento-input-wrap{
      display:flex;
      align-items:center;
      gap:0.15rem;
    }

    .descuento-input-wrap input{
      width:55px;
      padding:0.2rem 0.35rem;
      border-radius:6px;
      border:1px solid var(--border-subtle);
      text-align:right;
      font-size:0.75rem;
    }

    .descuento-simbolo{
      font-size:0.75rem;
      opacity:0.8;
    }

    .descuento-euros{
      font-weight:600;
      font-size:0.85rem;
      text-align:right;
    }

    .budget-gauge{
      margin-top:0.8rem;
      display:flex;
      align-items:center;
      gap:0.75rem;
      justify-content:space-between;
    }

    .budget-gauge-label{
      font-size:0.85rem;
      color:var(--text-soft);
      white-space:nowrap;
    }

    .budget-gauge-bar{
      flex:1;
      height:0.4rem;
      background:var(--blue-soft);
      border-radius:999px;
      overflow:hidden;
    }

    .budget-gauge-fill{
      height:100%;
      background:var(--primary-color);
      border-radius:999px;
    }

    .budget-gauge-value{
      font-weight:700;
      font-size:0.95rem;
      color:var(--blue-dark);
      margin-left:0.4rem;
      white-space:nowrap;
    }

    .budget-note{
      margin:0.35rem 0 0;
      font-size:0.82rem;
      color:var(--text-soft);
      line-height:1.4;
    }

    /* Tabla materiales */
    table{ 
      width:100%;
      border-collapse:collapse;
      font-size:0.8rem;
      margin-top:0.35rem;
    }
    table tr{page-break-inside:avoid; break-inside:avoid;}
    th,td{
      padding:0.35rem 0.4rem;
      border-bottom:1px solid #e5e7eb;
      text-align:left;
    }
    th{
      font-size:0.72rem;
      text-transform:uppercase;
      letter-spacing:0.04em;
      color:var(--text-soft);
      background:#f9fafb;
    }
    tr:nth-child(even) td{background:#f9fafb;}
    .section-row td{
      background:#e6f0fb;
      font-size:0.76rem;
      font-weight:600;
      text-transform:uppercase;
      letter-spacing:0.05em;
    }
    .table-subtitle{font-weight:700; color:var(--blue-dark); margin-bottom:0.35rem;}
    .informe-block + .informe-block{margin-top:1.1rem;}
    .table-footnote{
      margin-top:0.4rem;
      font-size:0.74rem;
      color:var(--text-soft);
    }
    .table-wrapper{overflow-x:auto;}

    /* Info resumen: comercial/cliente */
    .budget-info{
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:0.25rem;
      font-size:0.78rem;
      margin-bottom:0.45rem;
    }
    .budget-info-item span.label{
      color:var(--text-soft);
      font-weight:500;
    }
    .budget-info-item span.value{
      font-weight:600;
    }
    .ref-line{
      font-size:0.78rem;
      color:var(--text-soft);
      margin-top:0.1rem;
    }

    footer{
      margin-top:1rem;
      padding:0.6rem 1.5rem 0.8rem;
      font-size:0.72rem;
      color:var(--text-soft);
      text-align:center;
    }

    .hide-in-pdf{display:none !important;}

    /* Cabecera PDF (estilo igual iluminación) */
    .pdf-header{
      margin:0 0 0.85rem 0;
      padding:0.25rem 0.15rem 0;
    }
    .pdf-logo-row{
      display:flex;
      align-items:center;
      gap:0.6rem;
      flex-wrap:wrap;
    }
    .pdf-logo-brand{
      display:flex;
      align-items:center;
      gap:0.45rem;
      min-width:240px;
    }
    .pdf-logo-img{
      height:34px;
      width:auto;
      object-fit:contain;
      image-rendering:auto;
    }
    .pdf-logo-main{
      font-weight:700;
      letter-spacing:0.14em;
      text-transform:uppercase;
      font-size:0.8rem;
      color:var(--blue-main);
    }
    .pdf-logo-sub{
      font-size:0.7rem;
      color:var(--text-soft);
      text-transform:uppercase;
      letter-spacing:0.12em;
    }
    .pdf-logo-right{
      margin-left:auto;
      font-size:0.7rem;
      color:var(--text-soft);
      text-align:right;
    }
    .pdf-separator{
      border:none;
      border-top:1px solid #e2e8f0;
      margin-top:0.5rem;
    }
/* 1. Ocultar tabla "Número de lamas según salida" solo en PDF */
    .pdf-mode #resumenLamas{
      display:none !important;
    }

/* 2. Limpiar recuadros extra del esquema en PDF */
   .pdf-mode #pdfDiagramSection{
     border:none;
     box-shadow:none;
     background:#ffffff;
     padding:0;
     margin-bottom:0.6rem;
   }

/* 3. El bloque económico + rendimiento no se parte entre páginas */

   .pdf-mode #pdfPresupuestoBloqueEconomico{
     page-break-inside: avoid;
     break-inside: avoid;
   }

/* 4. Compactar un poco el bloque en PDF para que quepa todo en una carilla */

   .pdf-mode #doc-presupuesto-resumen .budget-card{
     margin-top:0.3rem;
     margin-bottom:0.6rem;
     padding:0.8rem 1rem;
     box-shadow:none;
   }

   .pdf-mode #doc-presupuesto-resumen .budget-total{font-size:1.3rem;}

   .pdf-mode #doc-presupuesto-resumen h3{
    margin-top:0;
     margin-bottom:0.4rem;
     font-size:0.95rem;
   }

   .pdf-mode #doc-presupuesto-resumen #textoRendimientoCliente,
   .pdf-mode #doc-presupuesto-resumen #textoRecomendacionMedidas{
     font-size:0.82rem;
     line-height:1.35;
   }

    @media print{
      .card,
      .summary-block,
      .diagram-wrapper{
        page-break-inside:avoid;
      }
      tr,th,td{
        page-break-inside:avoid;
      }
    }
  </style>
</head>
<!-- Versión de la calculadora Doha Sun: 1.0.0 -->
<body>
<div class="app">

  <!-- CABECERA PÁGINA -->
  <div class="page-title-block">
    <div class="title-row">
      <div>
        <h1>Presupuestador pérgola bioclimática</h1>
        <p class="subtitle">Serie Doha Sun</p>
      </div>
      <div class="version-pill">
        <span class="version-dot"></span>
        <span id="versionLabel">Versión</span>
      </div>
    </div>
  </div>

  <!-- DATOS GENERALES PRESUPUESTO -->
  <div class="datos-presupuesto">
    <div class="datos-grid">
      <div class="field">
        <label for="comercial">Nombre comercial</label>
        <input type="text" id="comercial" placeholder="Ej.: Juan Pérez" />
      </div>
      <div class="field">
        <label for="cliente">Cliente</label>
        <input type="text" id="cliente" placeholder="Ej.: Carpintería XYZ" />
      </div>
      <div class="field">
        <label for="refObra">Ref. obra</label>
        <input type="text" id="refObra" placeholder="Ej.: PERG-2025-001" />
      </div>
    </div>

    <!-- Número de presupuesto siempre visible -->
    <div id="presupuestoBadge" style="
      margin-top: 0.6rem;
      font-size: 0.9rem;
      display: block;
    ">
      <span style="
        padding: 6px 12px;
        background: #eef2ff;
        border: 1px solid #c7d2fe;
        border-radius: 6px;
        color: #1e1b4b;
        font-weight: 600;
      ">
        Nº de presupuesto: <span id="refCode"></span>
      </span>
    </div>
  </div>

  <!-- LAYOUT PRINCIPAL -->
  <div class="layout">
    <!-- COLUMNA IZQUIERDA -->
    <div>
      <!-- 1. Datos geométricos -->
        <section class="card">
        <div class="card-header">
          <div class="card-title">
            <span class="step-badge">1</span>
            Datos geométricos y módulos
          </div>
          <span class="pill">Entrada</span>
        </div>

        <div class="grid grid-3">
          <div class="field">
            <label for="salida">Largo / salida [m]</label>
            <input id="salida" type="number" step="0.01" min="1.5" max="6.0" placeholder="Ej.: 4,00" />
            <div class="field-note">Largo útil de pérgola. Mínimo 1,50 m · Máximo 6,00 m.</div>
            <div class="field-error" id="salidaError"></div>
          </div>
          <div class="field">
            <label for="ancho">Ancho pérgola [m]</label>
            <input id="ancho" type="number" step="0.01" min="1.5" placeholder="Ej.: 3,50" />
            <div class="field-note">
              Ancho en sentido de lamas. Mínimo 1,50 m. Máx. 4,00 m por módulo (se modulará automáticamente si es mayor).
            </div>
            <div class="field-error" id="anchoError"></div>
          </div>
        </div>

        <div class="note">
          <span class="note-icon">ℹ️</span>
          <span><strong>Dirección de las lamas:</strong> siempre en la dirección del <strong>ancho</strong> de la pérgola.</span>
        </div>

        <div class="grid grid-2" style="margin-top:0.7rem;">
          <div class="field">
            <label>Módulos</label>
            <div class="inline-checkbox">
              <input type="checkbox" id="chkVariosModulos" />
              <span class="field-note">Marca si la pérgola lleva más de un módulo.</span>
            </div>
          </div>
          <div class="field" id="campoModulos" style="display:none;">
            <label for="modulos">Número de módulos</label>
            <input id="modulos" type="number" min="2" step="1" placeholder="Ej.: 2" />
            <div class="field-note">Puedes aumentar el nº de módulos. Debe cumplirse siempre 1,50–4,00 m por módulo.</div>
          </div>
        </div>
      </section>

      <!-- 2. Montaje, pilares y motor -->
      <section class="card" style="margin-top:0.85rem;">
        <div class="card-header">
          <div class="card-title">
            <span class="step-badge">2</span>
            Montaje, pilares y motor
          </div>
          <span class="pill">Configuración</span>
        </div>

          <div class="grid grid-2">
            <div class="field">
              <label>Tipo de montaje</label>
              <div class="pill-group" id="grupoMontaje">
                <label class="pill-option">
                  <input type="radio" name="montaje" value="pilares" checked />
                  <span>Sobre pilares</span>
                </label>
                <label class="pill-option">
                  <input type="radio" name="montaje" value="pared-ancho" />
                  <span>A pared · sobre ancho</span>
                </label>
                <label class="pill-option">
                  <input type="radio" name="montaje" value="pared-largo" />
                  <span>A pared · sobre largo</span>
                </label>
                <label class="pill-option">
                  <input type="radio" name="montaje" value="entre-paredes" />
                  <span>Entre paredes</span>
                </label>
              </div>
              <div class="field-note" id="textoMontaje"></div>
              <div class="field-note internal-note" id="textoMontajeDetallado" aria-hidden="true"></div>
              <div id="bloqueRefuerzo" class="refuerzo-bloque" style="display:none;">
                <label class="inline-checkbox">
                  <input type="checkbox" id="chkPilaresRefuerzo" />
                  <span>Añadir pilares de refuerzo en el lateral apoyado en pared</span>
                </label>
                <div class="aviso-amarillo" id="avisoRefuerzo" style="display:none;"></div>
              </div>
            </div>
            <div class="field">
              <label>Nº de pilares (calculado)</label>
              <div id="pilaresDisplay" class="pilares-pill">—</div>
              <div class="field-note" id="calibrePilaresDisplay">Calibre de los pilares: —</div>
              <div class="field" style="margin-top:0.6rem;">
                <label for="altura">Altura libre [m]</label>
                <input id="altura" type="number" step="0.01" min="2.0" max="2.8" placeholder="Ej.: 2,50" />
                <div class="field-note">Introduce la altura libre (máximo 2,80 m).</div>
                <div class="field-error" id="alturaError"></div>
              </div>
            </div>
          </div>

          <div class="warning" id="warning" style="display:none;"></div>

          <div class="grid grid-2" style="margin-top:0.7rem;">
            <div class="field" id="campoPosicionPared" style="display:none;">
              <label for="posicionPared">Posición de la pared</label>
              <select id="posicionPared"></select>
            </div>
            <div class="field" id="campoEntreParedes" style="display:none;">
              <label for="tipoEntreParedes">Paredes</label>
              <select id="tipoEntreParedes">
                <option value="laterales">Laterales</option>
                <option value="frontales">Frontales</option>
              </select>
            </div>
          </div>

        <div class="grid grid-2" style="margin-top:0.7rem;">
          <div class="field">
            <label>Configuración de motores</label>
            <div class="pill-group" id="grupoModoMotor">
              <label class="pill-option">
                <input type="radio" name="modoMotor" value="todos-izquierda" checked />
                <span id="labelMotorIzquierda">Motor a izquierda</span>
              </label>
              <label class="pill-option">
                <input type="radio" name="modoMotor" value="todos-derecha" />
                <span id="labelMotorDerecha">Motor a derecha</span>
              </label>
              <label class="pill-option" id="pillPersonalizado">
                <input type="radio" name="modoMotor" value="personalizado" />
                <span id="labelMotorPersonalizado">Personalizado por módulo</span>
              </label>
            </div>
          </div>
          <div class="field">
            <label for="mando">Mando</label>
            <select id="mando">
              <option value="con">Con mando</option>
              <option value="sin">Sin mando</option>
            </select>
          </div>
        </div>

        <div class="field" id="motorPorModuloWrapper" style="display:none; margin-top:0.7rem;">
          <label>Motores por módulo</label>
          <div id="motorPorModuloContainer" class="grid grid-2"></div>
        </div>

        <div class="botones-calculo" style="display:flex; gap:10px; margin-top:10px; justify-content:flex-end;">
          <button class="secondary" id="btnRecalcular" type="button">Limpiar</button>
          <button id="btnNuevoPresupuesto" class="btn btn-danger" type="button">Nuevo presupuesto</button>
        </div>
      </section>
 <section class="card solo-web" id="preciosCard" style="margin-top:0.9rem;">
          <div class="card-header">
            <div class="card-title">
              <span class="step-badge">3</span>
              Acabados
            </div>
            <span class="pill">Acabados</span>
          </div>

          <div class="grid grid-2 solo-web">
            <div class="field">
              <label>Colores de la pérgola</label>
              <div class="pill-group" id="grupoColorPergola">
                <label class="pill-option">
                  <input type="radio" name="colorModo" value="mono" checked />
                  <span>Pérgola monocolor</span>
                </label>
                <label class="pill-option">
                  <input type="radio" name="colorModo" value="bicolor" />
                  <span>Pérgola bicolor</span>
                </label>
              </div>
              <div class="grid grid-2" style="margin-top:0.5rem;">
                <div class="field" id="campoColorGlobal">
                  <label for="colorGlobal">Acabado general</label>
                  <select id="colorGlobal">
                    <option value="blanco">Blanco</option>
                    <option value="textura">Textura</option>
                    <option value="color">Color</option>
                    <option value="anodizado">Anodizado</option>
                    <option value="nature">Nature</option>
                  </select>
                </div>
                <div class="field" id="campoColorLamas" style="display:none;">
                  <label for="colorLamas">Color lamas</label>
                  <select id="colorLamas">
                    <option value="blanco">Blanco</option>
                    <option value="textura">Textura</option>
                    <option value="color">Color</option>
                    <option value="anodizado">Anodizado</option>
                    <option value="nature">Nature</option>
                  </select>
                </div>
                <div class="field" id="campoColorPerimetro" style="display:none;">
                  <label for="colorPerimetro">Color perímetro</label>
                  <select id="colorPerimetro">
                    <option value="blanco">Blanco</option>
                    <option value="textura">Textura</option>
                    <option value="color">Color</option>
                    <option value="anodizado">Anodizado</option>
                    <option value="nature">Nature</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-2" style="margin-top:0.5rem;">
                <div class="field" id="refAcabadoGlobalWrap">
                  <label for="refAcabadoGlobal">Referencia acabado general</label>
                  <input id="refAcabadoGlobal" type="text" placeholder="Ej.: RAL 9016, ANOD PLATA MATE" />
                </div>
                <div class="field" id="refAcabadoLamasWrap" style="display:none;">
                  <label for="refAcabadoLamas">Referencia acabado lamas</label>
                  <input id="refAcabadoLamas" type="text" placeholder="Ej.: RAL 7016" />
                </div>
                <div class="field" id="refAcabadoPerimetroWrap" style="display:none;">
                  <label for="refAcabadoPerimetro">Referencia acabado perímetro</label>
                  <input id="refAcabadoPerimetro" type="text" placeholder="Ej.: RAL 9010" />
                </div>
              </div>
            </div>
          </div>

        </section>

    </div>

    <!-- COLUMNA DERECHA -->
    <div class="split-right">
      <!-- 3. Esquema -->
        <section class="card solo-web">
        <div class="card-header">
          <div class="card-title">
            <span class="step-badge">3</span>
            Vista esquemática de la pérgola
          </div>
        </div>
          <div class="diagram-wrapper">
            <svg id="pergolaSvg" viewBox="0 0 340 240"></svg>
          </div>
        <div class="diagram-caption" id="diagramCaption">
          Introduce largo, ancho y configuración para ver el esquema.
        </div>

<div style="
  width:100%;
  max-width:520px;
  margin: 6px auto 0 auto;
  font-size: 10px;
  color:#4B5563;
  line-height: 1.4;
">
  <strong>Leyenda:</strong>
  <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:3px;">
    <span><span style="color:#16a34a;">■</span> Pilares estructurales</span>
    <span><span style="color:#facc15;">■</span> Pilares de refuerzo</span>
    <span><span style="color:#9ca3af;">■</span> Pared existente</span>
    <span><span style="color:#f97316;">■</span> Motor</span>
    <span>↔ Dirección de lamas</span>
  </div>
</div>

      </section>

      <!-- ÁREA QUE IRÁ AL PDF (resumen + materiales) -->
      <div id="pdfArea">
        <!-- Cabecera solo para PDF (texto corporativo) -->
        <div id="pdfHeader" class="pdf-header" style="display:none;">
          <div class="pdf-logo-row">
            <div class="pdf-logo-brand">
              <img
		class="pdf-logo-img"
  		src="data:image/png;base64,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" alt="Aluminios Galisur" />
              <div>
                <div class="pdf-logo-main">ALUMINIOS GALISUR</div>
                <div class="pdf-logo-sub">Presupuesto pérgola bioclimática · Doha Sun</div>
              </div>
            </div>
            <div class="pdf-logo-right">
              <div id="pdfFecha"></div>
            </div>
          </div>
          <hr class="pdf-separator" />
        </div>

        <!-- 4. Resumen configuración -->
        <section class="card" id="resumenCard">
          <div class="card-header">
            <div>
              <div class="card-title">
                <span class="step-badge">4</span>
                Resumen de configuración
              </div>
              <div class="ref-line" id="refLine">
                Ref. presupuesto: <span id="refCodeInline"></span>
              </div>
            </div>
            <span class="pill">Previo a materiales</span>
          </div>

          <div id="budgetInfo" class="budget-info" style="display:none;">
            <div class="budget-info-item">
              <span class="label">Comercial: </span>
              <span class="value" id="biComercial"></span>
            </div>
            <div class="budget-info-item">
              <span class="label">Cliente: </span>
              <span class="value" id="biCliente"></span>
            </div>
            <div class="budget-info-item">
              <span class="label">Ref. obra: </span>
              <span class="value" id="biRefObra"></span>
            </div>
          </div>

          <div id="resumenConfig" class="summary-block">
            <h3>Datos principales</h3>
            <p>Introduce los datos para generar automáticamente el resumen.</p>
          </div>

          <div id="resumenLamas" class="summary-block" style="margin-top:0.45rem;">
            <h3>Número de lamas según salida</h3>
            <p>Introduce la salida en metros para ver el número orientativo de lamas y los rangos de medida sin despunte.</p>
          </div>
          <div id="resumenAvisosMontaje" class="aviso-amarillo solo-pdf" data-show-pdf="0"></div>
        </section>

       <section class="card solo-pdf" id="pdfDiagramSection" style="margin-top:0.9rem; display:none;">
  <div class="card-header">
    <div class="card-title">
      <span class="step-badge">3</span>
      Vista superior esquemática
    </div>
  </div>
  <div class="diagram-wrapper">
    <svg id="pergolaSvgPdf" viewBox="0 0 340 240"></svg>
  </div>
<div style="
  width:100%;
  max-width:520px;
  margin: 6px auto 0 auto;
  font-size: 10px;
  color:#4B5563;
  line-height: 1.4;
">
  <strong>Leyenda:</strong>
  <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:3px;">
    <span><span style="color:#16a34a;">■</span> Pilares estructurales</span>
    <span><span style="color:#facc15;">■</span> Pilares de refuerzo</span>
    <span><span style="color:#9ca3af;">■</span> Pared existente</span>
    <span><span style="color:#f97316;">■</span> Motor</span>
    <span>↔ Dirección de lamas</span>
  </div>
</div>
</section>
        <section class="card solo-web" id="informesCard" style="margin-top:0.9rem;">
          <div class="card-header">
            <div class="card-title">
              <span class="step-badge">5</span>
              Informes económicos Doha Sun
            </div>
            <span class="pill">Informes</span>
          </div>

              <div class="note" style="margin-bottom:0.75rem;">
                <div class="note-icon">📄</div>
                <div class="grid grid-2" style="gap:0.5rem; align-items:flex-end;">
                  <label style="display:flex; flex-direction:column; gap:0.35rem; font-weight:600; color:var(--text-soft);">
                    Documento a visualizar / imprimir
                    <select id="selectorDocumento">
                      <option value="presupuesto">Presupuesto</option>
                      <option value="material">Informe de material</option>
                      <option value="peso">Peso y perímetros</option>
                      <option value="corte">Hoja de corte</option>
                    </select>
                  </label>
                  <div class="btn-row" style="display:flex; gap:0.5rem; justify-content:flex-end;">
                    <button type="button" class="secondary" id="btnCompartirPDF">
                      <span>⤴</span>
                      <span>Compartir</span>
                    </button>
                    <button class="primary" id="btnGenerarPDF" type="button">
                      <span>🖨</span>
                      <span>Imprimir PDF</span>
                    </button>
                  </div>
                </div>
              </div>

          <div class="documento-preview">
            <div id="doc-presupuesto" class="documento-pdf">	
              <h2 style="margin:0 0 0.5rem;">Presupuesto</h2>
              <div id="doc-presupuesto-resumen" class="summary-block"></div>
            </div>
            <div id="doc-material" class="documento-pdf">
              <h2 style="margin:0 0 0.5rem;">Informe de material</h2>
              <div id="doc-material-resumen" class="summary-block"></div>
              <div class="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Tipo</th><th>Ref.</th><th>Descripción</th><th>Acabado</th><th>Ref. acabado</th><th>Long. barra (m)</th><th>Nº barras / uds</th><th>Precio unit.</th><th>Importe</th>
                    </tr>
                  </thead>
                  <tbody id="doc-material-body"></tbody>
                </table>
              </div>
              <div id="doc-material-totales" class="summary-block"></div>
            </div>
            <div id="doc-peso" class="documento-pdf">
              <h2 style="margin:0 0 0.5rem;">Peso y perímetros</h2>
              <div class="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Ref.</th><th>Descripción</th><th>Acabado</th><th>Peso total (kg)</th><th>Perímetro total (mm)</th>
                    </tr>
                  </thead>
                  <tbody id="doc-peso-body"></tbody>
                </table>
              </div>
            </div>
            <div id="doc-corte" class="documento-pdf">
              <h2 style="margin:0 0 0.5rem;">Hoja de corte</h2>
              <div id="doc-corte-body" class="table-wrapper"></div>
            </div>
          </div>
        </section>

      <div style="display:none;">
        <table><tbody id="tablaMateriales"></tbody></table>
      </div>
      </div>
    </div>
  </div>

  <footer>
    Aluminios Galisur · Presupuestador interno serie Doha Sun.
  </footer>
</div>

<script>
  /* --------- Tabla de lamas (catálogo) --------- */
  const LAMAS_TABLE = [
    { n: 5,  min: 0.896, max: 1.089 },
    { n: 6,  min: 1.059, max: 1.252 },
    { n: 7,  min: 1.222, max: 1.415 },
    { n: 8,  min: 1.385, max: 1.578 },
    { n: 9,  min: 1.548, max: 1.741 },
    { n: 10, min: 1.711, max: 1.904 },
    { n: 11, min: 1.874, max: 2.067 },
    { n: 12, min: 2.037, max: 2.230 },
    { n: 13, min: 2.200, max: 2.393 },
    { n: 14, min: 2.363, max: 2.556 },
    { n: 15, min: 2.526, max: 2.719 },
    { n: 16, min: 2.689, max: 2.882 },
    { n: 17, min: 2.852, max: 3.045 },
    { n: 18, min: 3.015, max: 3.208 },
    { n: 19, min: 3.178, max: 3.371 },
    { n: 20, min: 3.341, max: 3.534 },
    { n: 21, min: 3.504, max: 3.697 },
    { n: 22, min: 3.667, max: 3.860 },
    { n: 23, min: 3.830, max: 4.023 },
    { n: 24, min: 3.993, max: 4.186 },
    { n: 25, min: 4.156, max: 4.349 },
    { n: 26, min: 4.319, max: 4.512 },
    { n: 27, min: 4.482, max: 4.675 },
    { n: 28, min: 4.645, max: 4.838 },
    { n: 29, min: 4.808, max: 5.001 },
    { n: 30, min: 4.971, max: 5.164 },
    { n: 31, min: 5.134, max: 5.327 },
    { n: 32, min: 5.297, max: 5.490 },
    { n: 33, min: 5.460, max: 5.653 },
    { n: 34, min: 5.623, max: 5.816 },
    { n: 35, min: 5.786, max: 6.000 }
  ];

  /* --------- Descripciones de referencias --------- */
  const DESCRIPCIONES = {
    "6391":  "Perfil portante lateral Doha Sun",
    "6212":  "Perfil frontal Doha Sun",
    "7616":  "Canalón Doha Sun",
    "6436":  "Larguero doble Doha Sun",
    "6816":  "Lama Doha Sun",
    "6867":  "Lama motor Doha Sun",
    "9125":  "Lama Doha Sun LED",
    "6218":  "Lama compensadora Doha Sun",
    "6217":  "Soporte lama compensación",
    "7985B": "Soporte tubular mecánico Doha Sun",
    "6323":  "Pilar 125x125 c/portatornillo",
    "7497":  "Frontal Doha 100x55",
    "6863":  "Perfil LED cornisa",
    "1015B": "Rect. 20x10 x1,3 mec. B inc.",
    "PB0005": "Tapa canalón",
    "PB0032": "Tapa lama dcha",
    "PB0033": "Tapa lama izda",
    "PB0035": "Tapa lama motor izda",
    "PB0034": "Tapa lama motor dcha",
    "PB0036": "Tapa final lama motor dcha",
    "PB0037": "Tapa final lama motor izda",
    "PB0038": "Tapa frontal motor izda",
    "PB0039": "Tapa frontal motor dcha",
    "PB0042": "Tapa frontal final izda",
    "PB0043": "Tapa frontal final dcha",
    "PB0041": "Soporte motor izda",
    "PB0040": "Soporte motor dcha",
    "PB0044": "Tapa superior pilar",
    "PB0015": "Tapa inferior anclaje pilar",
    "PB0052": "Tapa pilar larguero doble",
    "PB0012": "Embellecedor esquina dcha",
    "PB0013": "Embellecedor esquina izda",
    "PB0050": "Soporte pared larguero simple",
    "PB0051": "Soporte pared larguero doble",
    "PB0030": "Kit tornillería lama",
    "PB0031": "Kit tornillería pérgola",
    "MO4004": "Motor Wave 40Nm pérgola bio",
    "PB4505": "Adaptador 50 red ranurado",
    "TM A5367": "Emisor giro monocanal",
    "TA2010": "Tapón 20x10",
    "PE 5254": "Tira LED recta 2 m",
    "GO 5248": "Goma ext. marco clip"
  };

  /* Clasificación para separar perfiles / accesorios */
  const TIPO_MATERIAL = {
    "6391": "perfil",
    "6212": "perfil",
    "7616": "perfil",
    "6436": "perfil",
    "6816": "perfil",
    "6867": "perfil",
    "9125": "perfil",
    "6218": "perfil",
    "6217": "perfil",
    "7985B": "perfil",
    "6323": "perfil",
    "7497": "perfil",
    "6863": "perfil",
    "1015B": "perfil",
    // resto se consideran accesorios
  };

  const DESCRIPCIONES_MONT = {
    "pilares": "Sobre pilares",
    "pared-ancho": "A pared (ancho)",
    "pared-largo": "A pared (largo)",
    "entre-paredes": "Entre paredes"
  };

  const DESCRIPCIONES_MONT_DETALLADAS = {
    "pilares":
      "Sobre pilares: estructura autoportante. 1 módulo → 4 pilares, 2 módulos → 6, 3 módulos → 8, etc.",
    "pared-ancho":
      "A pared sobre ancho: uno de los laterales cortos se apoya en pared; el lado opuesto y los divisores llevan pilares.",
    "pared-largo":
      "A pared sobre largo: uno de los laterales largos se apoya en pared; el otro lleva pilares en esquinas y divisores.",
    "entre-paredes":
      "Entre paredes: la pérgola apoya entre muros frontales o laterales; los pilares solo se usan, si procede, en los divisores."
  };

  // Parámetros de corte y márgenes
  const MERMA_CORTE_MM = 5; // merma de sierra por corte
  const MARGEN_PUNTA_MM = 30; // margen mínimo en cada punta de la barra

  // Versión de la herramienta (actualízala manualmente cuando hagas cambios)
  const APP_VERSION = "1.0.0";
  const versionLabel = document.getElementById("versionLabel");
  if (versionLabel) versionLabel.textContent = `Versión ${APP_VERSION}`;

  const AVISO_REFUERZO_TEXTO_PARED =
    "Si no se añaden pilares de refuerzo en esta configuración, el perfil lateral apoyado en pared deberá ir muy bien anclado a la pared para sustituir la función de estos pilares.";

  const AVISO_REFUERZO_TEXTO_ENTRE =
    "Si no se añaden pilares de refuerzo en esta configuración, los perfiles laterales apoyados en pared deberán ir muy bien anclados para sustituir la función de estos pilares.";

  const CALIBRE_PILAR_IA = (() => {
    const desc = DESCRIPCIONES["6323"] || "";
    const match = desc.match(/Pilar\s+([^\s]+)\s/);
    return match ? match[1] : (desc || "—");
  })();

  // === INICIO MÓDULO PRECIOS DOHA SUN ===
  const precio_perfiles = {
    "6816": {
      ref: "6816",
      nombre: "Lama Doha Sun",
      grupo_color: "lamas",
      longitudes_barra: [4.0, 6.5],
      precio_m: { blanco: 40.9, textura: 43.4, color: 44.03, anodizado: 42.67, nature: 47.52 },
      peso_kg_m: 2.944,
      perimetro_total_mm: 104.2,
      perimetro_ext_mm: 53.85,
      perimetro_int_mm: 50.35
    },
    "9125": {
      ref: "9125",
      nombre: "Lama LED Doha Sun",
      grupo_color: "lamas",
      longitudes_barra: [4.0, 6.5],
      precio_m: { blanco: 41.96, textura: 44.54, color: 45.18, anodizado: 44.09, nature: 49.31 },
      peso_kg_m: 0,
      perimetro_total_mm: 0,
      perimetro_ext_mm: 0,
      perimetro_int_mm: 0
    },
    "6436": {
      ref: "6436",
      nombre: "Larguero doble Doha Sun",
      grupo_color: "perimetro",
      longitudes_barra: [4.5, 6.0],
      precio_m: { blanco: 102.18, textura: 105.5, color: 106.33, anodizado: 105.84, nature: 113.25 },
      peso_kg_m: 7.802,
      perimetro_total_mm: 138.2,
      perimetro_ext_mm: 82.3,
      perimetro_int_mm: 55.9
    },
    "6867": {
      ref: "6867",
      nombre: "Lama motor Doha Sun",
      grupo_color: "lamas",
      longitudes_barra: [4.0, 6.5],
      precio_m: { blanco: 40.34, textura: 42.82, color: 42.88, anodizado: 41.01, nature: 45.07 },
      peso_kg_m: 2.894,
      perimetro_total_mm: 105.51,
      perimetro_ext_mm: 45.13,
      perimetro_int_mm: 60.38
    },
    "7616": {
      ref: "7616",
      nombre: "Canalón Doha",
      grupo_color: "perimetro",
      longitudes_barra: [4.5, 6.5],
      precio_m: { blanco: 20.36, textura: 21.62, color: 21.94, anodizado: 24.31, nature: 29.04 },
      peso_kg_m: 1.52,
      perimetro_total_mm: 54.34,
      perimetro_ext_mm: 0,
      perimetro_int_mm: 54.34
    },
    "6391": {
      ref: "6391",
      nombre: "Perfil portante Doha",
      grupo_color: "perimetro",
      longitudes_barra: [4.5, 6.5],
      precio_m: { blanco: 78.52, textura: 81.34, color: 82.04, anodizado: 80.96, nature: 86.74 },
      peso_kg_m: 5.955,
      perimetro_total_mm: 117.25,
      perimetro_ext_mm: 64.27,
      perimetro_int_mm: 52.98
    },
    "6212": {
      ref: "6212",
      nombre: "Perfil frontal Doha",
      grupo_color: "perimetro",
      longitudes_barra: [4.5, 6.5],
      precio_m: { blanco: 0, textura: 0, color: 0, anodizado: 0, nature: 0 },
      peso_kg_m: 3.403,
      perimetro_total_mm: 96.98,
      perimetro_ext_mm: 0,
      perimetro_int_mm: 96.98
    },
    "6218": {
      ref: "6218",
      nombre: "Lama compensadora Doha",
      grupo_color: "lamas",
      longitudes_barra: [4.5, 6.5],
      precio_m: { blanco: 19.56, textura: 20.84, color: 21.16, anodizado: 23.56, nature: 28.37 },
      peso_kg_m: 1.395,
      perimetro_total_mm: 53.38,
      perimetro_ext_mm: 0,
      perimetro_int_mm: 53.38
    },
    "6217": {
      ref: "6217",
      nombre: "Soporte lama compensación",
      grupo_color: "lamas",
      longitudes_barra: [4.5, 6.5],
      precio_m: { blanco: 3.74, textura: 4.03, color: 4.1, anodizado: 4.63, nature: 5.7 },
      peso_kg_m: 0.261,
      perimetro_total_mm: 11.87,
      perimetro_ext_mm: 0,
      perimetro_int_mm: 11.87
    },
    "5960": {
      ref: "5960",
      nombre: "Tapeta 22 mm clipada",
      grupo_color: "lamas",
      longitudes_barra: [4.5, 6.5],
      precio_m: { blanco: 1.62, textura: 1.86, color: 1.92, anodizado: 2.37, nature: 3.27 },
      peso_kg_m: 0.095,
      perimetro_total_mm: 10,
      perimetro_ext_mm: 10,
      perimetro_int_mm: 0
    },
    "7985B": {
      ref: "7985B",
      nombre: "Soporte tubo mecánica",
      grupo_color: "perimetro",
      longitudes_barra: [4.5, 6.5],
      precio_m: { blanco: 14.04, textura: 14.65, color: 14.8, anodizado: 15.21, nature: 16.93 },
      peso_kg_m: 0,
      perimetro_total_mm: 0,
      perimetro_ext_mm: 0,
      perimetro_int_mm: 0
    },
    "1015B": {
      ref: "1015B",
      nombre: "Rect. 20×10×1,3 mecanizado",
      grupo_color: "perimetro",
      longitudes_barra: [4.5, 6.5],
      precio_m: { blanco: 4.36, textura: 4.62, color: 4.69, anodizado: 4.58, nature: 5.12 },
      peso_kg_m: 0.192,
      perimetro_total_mm: 11,
      perimetro_ext_mm: 10,
      perimetro_int_mm: 1
    },
    "7497": {
      ref: "7497",
      nombre: "Frontal Doha 100×55",
      grupo_color: "perimetro",
      longitudes_barra: [4.0, 6.5],
      precio_m: { blanco: 22.06, textura: 23.71, color: 24.12, anodizado: 23.32, nature: 26.58 },
      peso_kg_m: 1.543,
      perimetro_total_mm: 68.5,
      perimetro_ext_mm: 36.2,
      perimetro_int_mm: 32.3
    },
    "6323": {
      ref: "6323",
      nombre: "Pilar 125×125",
      grupo_color: "perimetro",
      longitudes_barra: [4.0, 6.5],
      precio_m: { blanco: 53.87, textura: 56.63, color: 57.32, anodizado: 54.61, nature: 59.05 },
      peso_kg_m: 3.959,
      perimetro_total_mm: 115,
      perimetro_ext_mm: 49.3,
      perimetro_int_mm: 65.7
    },
    "6863": {
      ref: "6863",
      nombre: "Perfil LED cornisa",
      grupo_color: "perimetro",
      longitudes_barra: [4.0, 6.5],
      precio_m: { blanco: 2.16, textura: 2.4, color: 2.46, anodizado: 2.91, nature: 3.81 },
      peso_kg_m: 0.139,
      perimetro_total_mm: 10,
      perimetro_ext_mm: 10,
      perimetro_int_mm: 0
    }
  };

  const precio_accesorios = {
    "PB0038": { ref: "PB0038", nombre: "Tapa frontal motor IZQ", grupo_color: "estructura", precios: { sa: 8.62, blanco: 8.62, color: 10.83, textura: 10.83 } },
    "PB0039": { ref: "PB0039", nombre: "Tapa frontal motor DCH", grupo_color: "estructura", precios: { sa: 8.62, blanco: 8.62, color: 10.83, textura: 10.83 } },
    "PB0033": { ref: "PB0033", nombre: "Tapa lama izquierda", grupo_color: "lamas", precios: { sa: 4.05, blanco: 6.26, color: 6.26, textura: 6.26 } },
    "PB0032": { ref: "PB0032", nombre: "Tapa lama derecha", grupo_color: "lamas", precios: { sa: 4.05, blanco: 6.26, color: 6.26, textura: 6.26 } },
    "PB0035": { ref: "PB0035", nombre: "Tapa lama motor IZQDO", grupo_color: "lamas", precios: { sa: 3.67, blanco: 5.12, color: 5.12, textura: 5.12 } },
    "PB0034": { ref: "PB0034", nombre: "Tapa lama motor DCHO", grupo_color: "lamas", precios: { sa: 3.67, blanco: 5.12, color: 5.12, textura: 5.12 } },
    "PB0036": { ref: "PB0036", nombre: "Tapa final lama motor DCH", grupo_color: "lamas", precios: { sa: 3.67, blanco: 5.12, color: 5.12, textura: 5.12 } },
    "PB0037": { ref: "PB0037", nombre: "Tapa final lama motor IZQ", grupo_color: "lamas", precios: { sa: 3.67, blanco: 5.12, color: 5.12, textura: 5.12 } },
    "PB0005": { ref: "PB0005", nombre: "Tapa canalón", grupo_color: "estructura", precios: { sa: 4.03, blanco: 5.05, color: 5.05, textura: 5.05 } },
    "PB0044": { ref: "PB0044", nombre: "Tapa superior pilar", grupo_color: "estructura", precios: { sa: 22.87, blanco: 24.91, color: 24.91, textura: 24.91 } },
    "PB0015": { ref: "PB0015", nombre: "Tapa inferior anclaje pilar", grupo_color: "estructura", precios: { sa: 25.93, blanco: 31.03, color: 31.03, textura: 31.03 } },
    "PB0042": { ref: "PB0042", nombre: "Tapa frontal final IZQ", grupo_color: "estructura", precios: { sa: 7.96, blanco: 10.0, color: 10.0, textura: 10.0 } },
    "PB0043": { ref: "PB0043", nombre: "Tapa frontal final DCH", grupo_color: "estructura", precios: { sa: 7.96, blanco: 10.0, color: 10.0, textura: 10.0 } },
    "PB0041": { ref: "PB0041", nombre: "Placa soporte motor IZQ", grupo_color: "estructura", precios: { sa: 5.2, blanco: 6.39, color: 6.39, textura: 6.39 } },
    "PB0040": { ref: "PB0040", nombre: "Placa soporte motor DCH", grupo_color: "estructura", precios: { sa: 5.2, blanco: 6.22, color: 6.22, textura: 6.22 } },
    "PB0009": { ref: "PB0009", nombre: "Tapa compensadora", grupo_color: "lamas", precios: { sa: 6.41, blanco: 9.47, color: 9.47, textura: 9.47 } },
    "PB0030": { ref: "PB0030", nombre: "Kit tornillería lama", grupo_color: "lamas", precios: { sa: 9.61 } },
    "PB0031": { ref: "PB0031", nombre: "Kit tornillería pérgola", grupo_color: "estructura", precios: { sa: 52.19 } },
    "PB4505": { ref: "PB4505", nombre: "Adaptador motor", grupo_color: "neutro", precios: { sa: 3.27 } },
    "MO4004": { ref: "MO4004", nombre: "Motor 40Nm", grupo_color: "neutro", precios: { sa: 246.29 } },
    "TM A5369": { ref: "TM A5369", nombre: "Emisor giro plus warmgrey", grupo_color: "neutro", precios: { sa: 59.35 } },
    "PE 5254": { ref: "PE 5254", nombre: "Tira LED recta 2m", grupo_color: "neutro", precios: { sa: 4.95 } },
    "TA2010": { ref: "TA2010", nombre: "Tapón 20×10", grupo_color: "neutro", precios: { sa: 0.04 } },
    "PB0050": { ref: "PB0050", nombre: "Soporte pared larguero simple", grupo_color: "estructura", precios: { sa: 23.44, blanco: 27.01, color: 27.01, textura: 27.01 } },
    "PB0051": { ref: "PB0051", nombre: "Soporte pared larguero doble", grupo_color: "estructura", precios: { sa: 26.71, blanco: 30.79, color: 30.79, textura: 30.79 } },
    "PB0052": { ref: "PB0052", nombre: "Tapa pilar / larguero doble", grupo_color: "estructura", precios: { sa: 24.53, blanco: 28.27, color: 28.27, textura: 28.27 } },
    "PB0053": { ref: "PB0053", nombre: "Tapa larguero doble", grupo_color: "estructura", precios: { sa: 7.38, blanco: 11.49, color: 11.49, textura: 11.49 } },
    "PB HOBLO": { ref: "PB HOBLO", nombre: "Emisor Hoblo multifunción", grupo_color: "neutro", precios: { sa: 55.25 } },
    "TM 5200": { ref: "TM 5200", nombre: "Sensor lluvia", grupo_color: "neutro", precios: { sa: 191.0 } },
    "TM 5201": { ref: "TM 5201", nombre: "Sensor viento", grupo_color: "neutro", precios: { sa: 70.35 } },
    "KI CIPLS": { ref: "KI CIPLS", nombre: "Central LED silicone", grupo_color: "neutro", precios: { sa: 327.96 } },
    "KI CIFL": { ref: "KI CIFL", nombre: "Central LEDs 100 W", grupo_color: "neutro", precios: { sa: 275.94 } },
    "KI FL4W": { ref: "KI FL4W", nombre: "Foco 4 W", grupo_color: "neutro", precios: { sa: 47.89 } },
    "PB0060": { ref: "PB0060", nombre: "Kit tornillería lama FV", grupo_color: "lamas", precios: { sa: 13.43 } },
    "GO 5248": { ref: "GO 5248", nombre: "Goma ext. marco clip", grupo_color: "neutro", precios: { sa: 0.26 } },
    "TM A5367": { ref: "TM A5367", nombre: "Emisor giro monocanal", grupo_color: "neutro", precios: { sa: 0 } }
  };

  const precio_calculadores_longitud = {
  // Largueros laterales: salida total
  "6391": ctx => ctx.salidaMm,
  // Perfiles que van en el ancho del módulo
  "7616": ctx => ctx.anchoModuloMm ?? ctx.anchoMm,
  "6212": ctx => Math.max((ctx.anchoModuloMm ?? ctx.anchoMm) - 90, 0),
  // Travesaño lateral doble (entre módulos): salida total
  "6436": ctx => ctx.salidaMm,
  // Lamas y lama motor: ancho por módulo, con descuento distinto si hay varios módulos
  "6816": ctx => {
    const ancho = ctx.anchoModuloMm ?? ctx.anchoMm;
    const descuento = ctx.modulos > 1 ? 132 : 147;
    return Math.max(ancho - descuento, 0);
  },
  "6867": ctx => {
    const ancho = ctx.anchoModuloMm ?? ctx.anchoMm;
    const descuento = ctx.modulos > 1 ? 132 : 147;
    return Math.max(ancho - descuento, 0);
  },
  "9125": ctx => {
    const ancho = ctx.anchoModuloMm ?? ctx.anchoMm;
    const descuento = ctx.modulos > 1 ? 132 : 147;
    return Math.max(ancho - descuento, 0);
  },
  "6218": ctx => Math.max((ctx.anchoModuloMm ?? ctx.anchoMm) - 90, 0),
  "6217": ctx => Math.max((ctx.anchoModuloMm ?? ctx.anchoMm) - 90, 0),
  // Perfiles en sentido salida
  "7985B": ctx => ctx.salidaMm,
  "1015B": ctx => ctx.salidaMm,
  // Otros perfiles a ancho de módulo
  "7497": ctx => ctx.anchoModuloMm ?? ctx.anchoMm,
  "6863": ctx => ctx.anchoModuloMm ?? ctx.anchoMm,
  // Pilares a altura
  "6323": ctx => ctx.alturaMm || 0,
  // Canalones / soportes lamas, a ancho de módulo
  "6211": ctx => ctx.anchoModuloMm ?? ctx.anchoMm,
  "6214": ctx => ctx.anchoModuloMm ?? ctx.anchoMm,
  "6211B": ctx => ctx.anchoModuloMm ?? ctx.anchoMm
};


  let precioUltimoCalculo = null;
  let ultimoMaterialesContext = null;

  function precioFormatearEuro(v) {
  if (v === null || typeof v === "undefined") return "—";
  // Espacio no separable entre el número y el símbolo €
  return `${v.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}\u00A0€`;
}

  function precioLeerConfigColores() {
    const modo = document.querySelector("input[name='colorModo']:checked")?.value || "mono";
    const colorGlobal = document.getElementById("colorGlobal")?.value || "blanco";
    const colorLamas = document.getElementById("colorLamas")?.value || colorGlobal;
    const colorPerimetro = document.getElementById("colorPerimetro")?.value || colorGlobal;
    const descuentoInput = safeNumber(document.getElementById("descuentoAluminio")?.value);
    const descuento = Math.min(60, Math.max(0, descuentoInput || 0));
    return {
      modo,
      colorGlobal,
      colorLamas: modo === "bicolor" ? colorLamas : colorGlobal,
      colorPerimetro: modo === "bicolor" ? colorPerimetro : colorGlobal,
      descuento
    };
  }

  function precioElegirAcabado(grupo, config) {
    if (grupo === "lamas") return config.colorLamas;
    if (grupo === "perimetro" || grupo === "estructura") return config.colorPerimetro;
    return "sa";
  }

function precioGenerarPiezasPerfiles(materiales, ctx) {
  const piezas = {};

  const modulos =
    typeof ctx.modulos === "number" && ctx.modulos > 0 ? ctx.modulos : 1;
  const numLamas =
    typeof ctx.numLamas === "number" && ctx.numLamas > 0 ? ctx.numLamas : null;

  const anchoTotalMm = Math.round((ctx.ancho || 0) * 1000);
  const salidaMm = Math.round((ctx.salida || 0) * 1000);
  const alturaMm = Math.round((ctx.altura || 0) * 1000);

  // De momento consideramos módulos iguales de ancho
  const anchoModuloEsquinaMm = modulos > 0 ? Math.round(anchoTotalMm / modulos) : 0;
  const anchoModuloCentralMm = anchoModuloEsquinaMm;

  // Contexto "genérico" para el resto de perfiles (igual que antes)
  const baseCtx = {
    anchoMm: anchoTotalMm,
    salidaMm,
    alturaMm,
    modulos,
    anchoModuloMm: anchoModuloEsquinaMm
  };

  Object.entries(materiales || {}).forEach(([ref, cantidad]) => {
    if ((TIPO_MATERIAL[ref] || "accesorio") !== "perfil") return;

    // ============================
    // 1) LAMAS Y LAMA MOTOR
    // ============================
    if ((ref === "6816" || ref === "6867" || ref === "9125") && modulos > 1 && numLamas) {
      const piezasRef = [];

      const nModEsquina = Math.min(modulos, 2);
      const nModCentral = Math.max(0, modulos - nModEsquina);

      const nLamasEsquina = nModEsquina * numLamas;
      const nLamasCentral = nModCentral * numLamas;

      const largoEsquina = Math.max(anchoModuloEsquinaMm - 132, 0);
      const largoCentral = Math.max(anchoModuloCentralMm - 117, 0);

      for (let i = 0; i < nLamasEsquina; i++) piezasRef.push(largoEsquina);
      for (let i = 0; i < nLamasCentral; i++) piezasRef.push(largoCentral);

      // Por seguridad, ajustamos al "cantidad" real
      while (piezasRef.length < cantidad) piezasRef.push(largoEsquina);
      if (piezasRef.length > cantidad) piezasRef.length = cantidad;

      piezas[ref] = piezasRef;
      return;
    }

    // ============================
    // 2) PERFIL FRONTAL 6212
    // ============================
    if (ref === "6212" && modulos > 1) {
      const piezasRef = [];

      const nModEsquina = Math.min(modulos, 2);
      const nModCentral = Math.max(0, modulos - nModEsquina);

      const largoEsquina = Math.max(anchoModuloEsquinaMm - 75, 0);
      const largoCentral = Math.max(anchoModuloCentralMm - 60, 0);

      // En principio 1 frontal por módulo
      for (let i = 0; i < nModEsquina; i++) piezasRef.push(largoEsquina);
      for (let i = 0; i < nModCentral; i++) piezasRef.push(largoCentral);

      while (piezasRef.length < cantidad) piezasRef.push(largoEsquina);
      if (piezasRef.length > cantidad) piezasRef.length = cantidad;

      piezas[ref] = piezasRef;
      return;
    }

    // ============================
    // 3) TUBO FRONTAL 7497
    // ============================
    if (ref === "7497" && modulos > 1) {
      const piezasRef = [];

      const nModEsquina = Math.min(modulos, 2);
      const nModCentral = Math.max(0, modulos - nModEsquina);

      const largoEsquina = Math.max(anchoModuloEsquinaMm - 237, 0);
      const largoCentral = Math.max(anchoModuloCentralMm - 222, 0);

      for (let i = 0; i < nModEsquina; i++) piezasRef.push(largoEsquina);
      for (let i = 0; i < nModCentral; i++) piezasRef.push(largoCentral);

      while (piezasRef.length < cantidad) piezasRef.push(largoEsquina);
      if (piezasRef.length > cantidad) piezasRef.length = cantidad;

      piezas[ref] = piezasRef;
      return;
    }

    // ============================
    // 4) RESTO DE PERFILES (GENÉRICO)
    // ============================
    const calc = precio_calculadores_longitud[ref];
    const largo = calc ? calc(baseCtx) : anchoTotalMm;
    if (!largo || largo <= 0) return;
    piezas[ref] = Array.from({ length: cantidad }, () => largo);
  });

  return piezas;
}

  function construirSolucionGreedy(piezasMm, longitudesBarraMm, piezasComparator = (a, b) => b - a, longComparator = (a, b) => a - b) {
    const piezas = [...piezasMm].sort(piezasComparator);
    const longitudes = [...longitudesBarraMm].sort(longComparator);
    const barras = [];

    const crearBarra = longitudTotalMm => {
      const capacidadInicial = longitudTotalMm - 2 * MARGEN_PUNTA_MM - MERMA_CORTE_MM;
      return {
        longitud: longitudTotalMm,
        capacidadRestante: capacidadInicial,
        piezas: []
      };
    };

    const seleccionarBarraNueva = pieza => {
      const longitudMinimaNecesaria = pieza + (1 + 1) * MERMA_CORTE_MM + 2 * MARGEN_PUNTA_MM;
      const candidata = longitudes.find(l => l >= longitudMinimaNecesaria);
      return candidata !== undefined ? candidata : longitudes[longitudes.length - 1];
    };

    piezas.forEach(pieza => {
      const consumo = pieza + MERMA_CORTE_MM;
      let mejorIndice = -1;
      let mejorResto = Infinity;

      barras.forEach((barra, idx) => {
        if (consumo <= barra.capacidadRestante) {
          const resto = barra.capacidadRestante - consumo;
          if (resto < mejorResto) {
            mejorResto = resto;
            mejorIndice = idx;
          }
        }
      });

      if (mejorIndice >= 0) {
        barras[mejorIndice].capacidadRestante -= consumo;
        barras[mejorIndice].piezas.push(pieza);
      } else {
        const seleccion = seleccionarBarraNueva(pieza);
        const nuevaBarra = crearBarra(seleccion);
        nuevaBarra.capacidadRestante = Math.max(0, nuevaBarra.capacidadRestante - consumo);
        nuevaBarra.piezas.push(pieza);
        barras.push(nuevaBarra);
      }
    });

    return barras;
  }

  function evaluarSolucionBarras(barras) {
    const desperdicioTotal = barras.reduce((acc, b) => {
      const sumaPiezas = b.piezas.reduce((s, p) => s + p, 0);
      return acc + (b.longitud - sumaPiezas);
    }, 0);
    return { barras, desperdicioTotal };
  }

  function esMejorSolucion(candidata, actual) {
  if (!candidata) return false;
  if (!actual) return true;

  // 1) Primero: menor desperdicio total
  if (candidata.desperdicioTotal < actual.desperdicioTotal) return true;
  if (candidata.desperdicioTotal > actual.desperdicioTotal) return false;

  // 2) Si empatan en desperdicio, menos barras
  if (candidata.barras.length < actual.barras.length) return true;
  if (candidata.barras.length > actual.barras.length) return false;

  return false;
}

  function refinarSolucionOptima(piezasMm, longitudesBarraMm, solucionInicial) {
    let mejor = solucionInicial;
    const ordenesPiezas = [
      (a, b) => b - a,
      (a, b) => a - b
    ];
    const ordenesLongitudes = [
      (a, b) => a - b,
      (a, b) => b - a
    ];

    ordenesPiezas.forEach(op => {
      ordenesLongitudes.forEach(ol => {
        const barras = construirSolucionGreedy(piezasMm, longitudesBarraMm, op, ol);
        const evaluada = evaluarSolucionBarras(barras);
        if (esMejorSolucion(evaluada, mejor)) {
          mejor = evaluada;
        }
      });
    });

    return mejor;
  }

  function precioOptimizarBarras(ref, piezasMm) {
  const perfil = precio_perfiles[ref];
  if (!perfil || !piezasMm || !piezasMm.length) {
    return { barrasPorLongitud: {}, desperdicioTotal: 0 };
  }

  const longitudes = (perfil.longitudes_barra || [])
    .map(l => Math.round(l * 1000))
    .sort((a, b) => a - b);

  const baseBarras = construirSolucionGreedy(piezasMm, longitudes);
  let solucion = evaluarSolucionBarras(baseBarras);

  // SIEMPRE intentamos refinar y, si mejora, la usamos
  const refinada = refinarSolucionOptima(piezasMm, longitudes, solucion);
  if (esMejorSolucion(refinada, solucion)) {
    solucion = refinada;
  }

  const barrasPorLongitud = {};
  solucion.barras.forEach(b => {
    barrasPorLongitud[b.longitud] = (barrasPorLongitud[b.longitud] || 0) + 1;
  });

  return { barrasPorLongitud, desperdicioTotal: solucion.desperdicioTotal };
}

  function precioCalcularPerfiles(piezasPerfiles, config) {
    const detalle = [];
    let subtotalSinDto = 0;
    let subtotalConDto = 0;
    let pesoTotal = 0;
    let perimetroTotal = 0;

    Object.entries(piezasPerfiles || {}).forEach(([ref, piezas]) => {
      const perfil = precio_perfiles[ref] || { nombre: DESCRIPCIONES[ref] || ref, grupo_color: "perimetro", precio_m: {} };
      const acabado = precioElegirAcabado(perfil.grupo_color, config);
      const precioM = perfil.precio_m?.[acabado];
      const tienePrecio = typeof precioM === "number" && !isNaN(precioM);

      const opt = precioOptimizarBarras(ref, piezas);
      let costeRef = 0;
      if (tienePrecio) {
        Object.entries(opt.barrasPorLongitud).forEach(([longitudMm, unidades]) => {
          const metros = (Number(longitudMm) / 1000) * unidades;
          costeRef += metros * precioM;
        });
      }

      const longitudTotalM = piezas.reduce((acc, l) => acc + l, 0) / 1000;
      subtotalSinDto += costeRef;
      const costeConDto = tienePrecio ? costeRef * (1 - config.descuento / 100) : 0;
      subtotalConDto += costeConDto;

      pesoTotal += longitudTotalM * (perfil.peso_kg_m || 0);
      perimetroTotal += longitudTotalM * (perfil.perimetro_total_mm || 0);

      detalle.push({
        ref,
        descripcion: perfil.nombre,
        acabado,
        barras: opt.barrasPorLongitud,
        desperdicio: opt.desperdicioTotal,
        coste: costeConDto
      });
    });

    return { subtotalSinDto, subtotalConDto, descuento: subtotalSinDto - subtotalConDto, pesoTotal, perimetroTotal, detalle };
  }

  function precioCalcularAccesorios(unidades, config) {
    const detalle = [];
    let total = 0;

    Object.entries(unidades || {}).forEach(([ref, cantidad]) => {
      if (cantidad <= 0) return;
      const acc = precio_accesorios[ref] || { nombre: DESCRIPCIONES[ref] || ref, grupo_color: "neutro", precios: { sa: 0 } };
      const acabado = precioElegirAcabado(acc.grupo_color, config);
      const precioUnit = acc.precios?.[acabado] ?? acc.precios?.sa;
      if (precioUnit === undefined) return;
      const coste = precioUnit * cantidad;
      total += coste;
      detalle.push({ ref, descripcion: acc.nombre, acabado, barras: null, desperdicio: 0, coste });
    });

    return { total, detalle };
  }

  function precioRender(result) {
    const resumenWeb = document.getElementById("preciosResumenWeb");
    const resumenPdf = document.getElementById("preciosResumenPdf");
    const detalleWeb = document.getElementById("tablaDetallePreciosWeb");
    const detallePdf = document.getElementById("preciosDetallePdf");

    if (resumenWeb) resumenWeb.innerHTML = "";
    if (resumenPdf) resumenPdf.innerHTML = "";
    if (detalleWeb) detalleWeb.innerHTML = "";
    if (detallePdf) detallePdf.innerHTML = "";

    if (!result) return;

    const resumenHtml = `
      <div class="price-totals">
        <div class="price-chip"><span class="label">Subtotal aluminio</span>${precioFormatearEuro(result.perfiles.subtotalSinDto)}</div>
        <div class="price-chip"><span class="label">Dto. aluminio</span>${precioFormatearEuro(result.perfiles.descuento)}</div>
        <div class="price-chip"><span class="label">Total aluminio</span>${precioFormatearEuro(result.perfiles.subtotalConDto)}</div>
        <div class="price-chip"><span class="label">Total accesorios</span>${precioFormatearEuro(result.accesorios.total)}</div>
        <div class="price-chip"><span class="label">Total material</span>${precioFormatearEuro(result.totalMaterial)}</div>
      </div>
    `;

    if (resumenWeb) resumenWeb.innerHTML = resumenHtml;
    if (resumenPdf) resumenPdf.innerHTML = resumenHtml;

    const renderDetalle = (tbody, detalle) => {
      detalle.forEach(item => {
        const barras = item.barras
          ? Object.entries(item.barras)
              .map(([l, n]) => `${(Number(l) / 1000).toFixed(2)} m × ${n}`)
              .join(", ")
          : "—";
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${item.ref}</td>
          <td>${item.descripcion || ""}</td>
          <td>${item.acabado || ""}</td>
          <td>${barras}</td>
          <td>${item.barras ? `${(item.desperdicio / 1000).toFixed(2)} m` : "—"}</td>
          <td>${precioFormatearEuro(item.coste)}</td>`;
        tbody.appendChild(tr);
      });
    };

    if (detalleWeb) renderDetalle(detalleWeb, result.detalle);
    if (detallePdf) {
      const table = document.createElement("table");
      table.innerHTML = `
        <thead>
          <tr>
            <th>Ref.</th><th>Descripción</th><th>Acabado</th><th>Barras</th><th>Desperdicio</th><th>Coste</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;
      const tb = table.querySelector("tbody");
      renderDetalle(tb, result.detalle);
      detallePdf.appendChild(table);
    }
  }

  function calcularPreciosDohaSun(materiales, ctx = {}) {
    if (!materiales || !Object.keys(materiales).length) {
      precioUltimoCalculo = null;
      precioRender(null);
      return;
    }

    const config = precioLeerConfigColores();
    const piezasPerfiles = precioGenerarPiezasPerfiles(materiales, ctx);
    const perfiles = precioCalcularPerfiles(piezasPerfiles, config);

    const accesorios = precioCalcularAccesorios(
      Object.fromEntries(Object.entries(materiales).filter(([ref]) => (TIPO_MATERIAL[ref] || "accesorio") !== "perfil")),
      config
    );

    const totalMaterial = perfiles.subtotalConDto + accesorios.total;
    const detalle = [...perfiles.detalle, ...accesorios.detalle];

    precioUltimoCalculo = {
      perfiles,
      accesorios,
      totalMaterial,
      pesoTotal: perfiles.pesoTotal,
      perimetroTotal: perfiles.perimetroTotal,
      detalle
    };

    precioRender(precioUltimoCalculo);
  }

  function precioRecalcularDesdeContexto() {
    if (ultimoMaterialesContext && ultimoMaterialesContext.materiales) {
      calcularPreciosDohaSun(ultimoMaterialesContext.materiales, ultimoMaterialesContext);
      calcularInformesEconomicosDohaSun(ultimoMaterialesContext.materiales, ultimoMaterialesContext);
    }
  }

  function precioLimpiarUI() {
    precioUltimoCalculo = null;
    ultimoMaterialesContext = null;
    precioRender(null);
    limpiarInformesEconomicos();
  }

  function actualizarCamposColorPergola() {
    const modo = document.querySelector("input[name='colorModo']:checked")?.value || "mono";
    const mostrarBicolor = modo === "bicolor";
    const campoGlobal = document.getElementById("campoColorGlobal");
    const campoLamas = document.getElementById("campoColorLamas");
    const campoPerimetro = document.getElementById("campoColorPerimetro");
    const refGlobal = document.getElementById("refAcabadoGlobalWrap");
    const refLamas = document.getElementById("refAcabadoLamasWrap");
    const refPerimetro = document.getElementById("refAcabadoPerimetroWrap");
    if (campoGlobal) campoGlobal.style.display = mostrarBicolor ? "none" : "block";
    if (campoLamas) campoLamas.style.display = mostrarBicolor ? "block" : "none";
    if (campoPerimetro) campoPerimetro.style.display = mostrarBicolor ? "block" : "none";
    if (refGlobal) refGlobal.style.display = mostrarBicolor ? "none" : "block";
    if (refLamas) refLamas.style.display = mostrarBicolor ? "block" : "none";
    if (refPerimetro) refPerimetro.style.display = mostrarBicolor ? "block" : "none";
  }
  // === FIN MÓDULO PRECIOS DOHA SUN ===

  // ============== MÓDULO INFORMES DOHA SUN (UI + PDF) ==============
  const informe_perfiles = {
    ...precio_perfiles,
    "6211": {
      ref: "6211",
      nombre: "Canalón Doha",
      grupo_color: "perimetro",
      longitudes_barra: [4.5, 6.5],
      precio_m: { blanco: 0, textura: 0, color: 0, anodizado: 0, nature: 0 },
      peso_kg_m: 1.52,
      perimetro_total_mm: 54.34,
      perimetro_ext_mm: 0,
      perimetro_int_mm: 54.34
    },
    "6214": {
      ref: "6214",
      nombre: "Soporte de lamas",
      grupo_color: "lamas",
      longitudes_barra: [4.5, 6.5],
      precio_m: { blanco: 0, textura: 0, color: 0, anodizado: 0, nature: 0 },
      peso_kg_m: 0.622,
      perimetro_total_mm: 16.06,
      perimetro_ext_mm: 0,
      perimetro_int_mm: 16.06
    },
    "6211B": {
      ref: "6211B",
      nombre: "Rectángulo 20x10 x 1,3",
      grupo_color: "perimetro",
      longitudes_barra: [4.5, 6.5],
      precio_m: { blanco: 0, textura: 0, color: 0, anodizado: 0, nature: 0 },
      peso_kg_m: 0.192,
      perimetro_total_mm: 11,
      perimetro_ext_mm: 10,
      perimetro_int_mm: 1
    }
  };

  const informe_accesorios = { ...precio_accesorios };

  let informesEconomicosUltimo = null;

  function precioLeerReferenciasAcabado() {
    const modo = document.querySelector("input[name='colorModo']:checked")?.value || "mono";
    const refGlobal = (document.getElementById("refAcabadoGlobal")?.value || "").trim();
    const refLamas = (document.getElementById("refAcabadoLamas")?.value || "").trim();
    const refPerimetro = (document.getElementById("refAcabadoPerimetro")?.value || "").trim();
    return {
      global: refGlobal || "SIN ESPECIFICAR",
      lamas: modo === "bicolor" ? refLamas || "SIN ESPECIFICAR" : refGlobal || "SIN ESPECIFICAR",
      perimetro: modo === "bicolor" ? refPerimetro || "SIN ESPECIFICAR" : refGlobal || "SIN ESPECIFICAR"
    };
  }

  function econElegirAcabadoTexto(grupo, config) {
    const acabado = precioElegirAcabado(grupo, config);
    return acabado ? acabado.charAt(0).toUpperCase() + acabado.slice(1) : "";
  }

  function econElegirReferenciaAcabado(grupo, refs) {
    if (grupo === "lamas") return refs.lamas;
    if (grupo === "perimetro" || grupo === "estructura") return refs.perimetro;
    return refs.global || "SIN ESPECIFICAR";
  }

  function econOptimizarBarrasDetallado(ref, piezasMm) {
  const perfil = informe_perfiles[ref];
  if (!perfil || !piezasMm?.length) {
    return { barras: [], longitudTotalUtilM: 0, longitudTotalBarrasM: 0, desperdicioTotalM: 0 };
  }

  const longitudes = (perfil.longitudes_barra || [])
    .map(l => Math.round(l * 1000))
    .sort((a, b) => a - b);

  const baseBarras = construirSolucionGreedy(piezasMm, longitudes);
  let solucion = evaluarSolucionBarras(baseBarras);

  // Igual que en precios: siempre intentamos refinar
  const refinada = refinarSolucionOptima(piezasMm, longitudes, solucion);
  if (esMejorSolucion(refinada, solucion)) {
    solucion = refinada;
  }

  const barrasDetalladas = solucion.barras.map((b, idx) => {
    const idBarra = `${ref}.${idx + 1}`;
    let letraCode = "a".charCodeAt(0);
    const cortes = b.piezas.map(c => {
      const corteId = `${idBarra}${String.fromCharCode(letraCode++)}`;
      return { id_corte: corteId, longitud_m: c / 1000 };
    });
    const sumaPiezas = b.piezas.reduce((acc, v) => acc + v, 0);
    return {
      id_barra: idBarra,
      longitud_barra_m: b.longitud / 1000,
      cortes,
      desperdicio_m: (b.longitud - sumaPiezas) / 1000
    };
  });

  const longitudTotalBarrasM = solucion.barras.reduce((acc, b) => acc + b.longitud, 0) / 1000;
  const longitudTotalUtilM = solucion.barras.reduce(
    (acc, b) => acc + b.piezas.reduce((s, p) => s + p, 0),
    0
  ) / 1000;

  return {
    barras: barrasDetalladas,
    longitudTotalUtilM,
    longitudTotalBarrasM,
    desperdicioTotalM: longitudTotalBarrasM - longitudTotalUtilM
  };
}

  function calcularInformesEconomicosDohaSun(materiales, ctx = {}) {
    if (!materiales || !Object.keys(materiales).length) {
      informesEconomicosUltimo = null;
      renderInformesEconomicosDohaSun(null);
      return;
    }

    const configColores = precioLeerConfigColores();
    const refsAcabado = precioLeerReferenciasAcabado();
    const piezasPerfiles = precioGenerarPiezasPerfiles(materiales, ctx);
    const perfilesOptim = Object.entries(piezasPerfiles).map(([ref, piezas]) => {
      const perf = informe_perfiles[ref] || { nombre: DESCRIPCIONES[ref] || ref, grupo_color: "perimetro", precio_m: {} };
      const optim = econOptimizarBarrasDetallado(ref, piezas);
      return {
        ref,
        descripcion: perf.nombre,
        tipo: "perfil",
        acabado_tipo: econElegirAcabadoTexto(perf.grupo_color, configColores),
        acabado_ref: econElegirReferenciaAcabado(perf.grupo_color, refsAcabado),
        grupo_color: perf.grupo_color,
        barras: optim.barras,
        longitud_total_util_m: optim.longitudTotalUtilM,
        longitud_total_barras_m: optim.longitudTotalBarrasM,
        desperdicio_total_m: optim.desperdicioTotalM,
        peso_kg: (perf.peso_kg_m || 0) * optim.longitudTotalUtilM,
        perimetro_mm: (perf.perimetro_total_mm || 0) * optim.longitudTotalUtilM,
        precio_m: perf.precio_m || {}
      };
    });

    const accesorios = Object.fromEntries(
      Object.entries(materiales).filter(([ref]) => (TIPO_MATERIAL[ref] || "accesorio") !== "perfil")
    );

    const accesoriosLista = Object.entries(accesorios).map(([ref, unidades]) => {
      const acc = informe_accesorios[ref] || { nombre: DESCRIPCIONES[ref] || ref, grupo_color: "neutro", precios: { sa: 0 } };
      return {
        ref,
        descripcion: acc.nombre,
        tipo: "accesorio",
        unidades,
        acabado_tipo: econElegirAcabadoTexto(acc.grupo_color, configColores),
        acabado_ref: econElegirReferenciaAcabado(acc.grupo_color, refsAcabado)
      };
    });

    const resumen_lineas = [];
    let total_perfiles = 0;
    let total_accesorios = 0;
    let metros_comprados_total = 0;
    let metros_utiles_total = 0;

    const descuentoFactor = 1 - (configColores.descuento || 0) / 100;

    perfilesOptim.forEach(perf => {
      const infoPerf = informe_perfiles[perf.ref] || {};
      const claveAcabado = precioElegirAcabado(infoPerf.grupo_color || "perimetro", configColores);
      const precioM = infoPerf.precio_m?.[claveAcabado] || 0;
      const grupos = {};

      perf.barras.forEach(b => {
        const key = b.longitud_barra_m.toFixed(3);
        if (!grupos[key]) {
          grupos[key] = { longitud_barra_m: b.longitud_barra_m, num_barras: 0, long_util_m: 0 };
        }
        grupos[key].num_barras += 1;
        grupos[key].long_util_m += b.cortes.reduce((acc, c) => acc + c.longitud_m, 0);
      });

      Object.values(grupos).forEach(grupo => {
  const long_total_barras_m = grupo.num_barras * grupo.longitud_barra_m;
  const long_util_m = grupo.long_util_m;
  const desperdicio_m = long_total_barras_m - long_util_m;
  const desperdicio_pct = long_total_barras_m > 0 ? (desperdicio_m / long_total_barras_m) * 100 : 0;

  // Importe total (igual que antes)
  const importe = long_total_barras_m * precioM * descuentoFactor;

  // ⚠️ Nuevo: precio por barra completa (con descuento)
  const precioBarra = precioM * grupo.longitud_barra_m * descuentoFactor;

  resumen_lineas.push({
    tipo: "perfil",
    ref: perf.ref,
    denominacion: perf.descripcion,
    acabado: perf.acabado_tipo,
    ref_acabado: perf.acabado_ref,
    longitud_barra_m: grupo.longitud_barra_m,
    num_barras: grupo.num_barras,
    unidades: null,
    metros_comprados: long_total_barras_m,
    metros_utiles: long_util_m,
    desperdicio_m,
    desperdicio_pct,
    // antes: precio_unitario: precioM,
    precio_unitario: precioBarra,
    importe
  });

  metros_comprados_total += long_total_barras_m;
  metros_utiles_total += long_util_m;
  total_perfiles += importe;
});
    });

    accesoriosLista.forEach(acc => {
      const infoAcc = informe_accesorios[acc.ref] || { precios: { sa: 0 }, grupo_color: "neutro" };
      const claveAcabado = precioElegirAcabado(infoAcc.grupo_color, configColores);
      const precioUnit = infoAcc.precios?.[claveAcabado] ?? infoAcc.precios?.sa ?? 0;
      const importe = (acc.unidades || 0) * precioUnit;

      resumen_lineas.push({
        tipo: "accesorio",
        ref: acc.ref,
        denominacion: acc.descripcion,
        acabado: acc.acabado_tipo,
        ref_acabado: acc.acabado_ref,
        longitud_barra_m: null,
        num_barras: null,
        unidades: acc.unidades,
        metros_comprados: 0,
        metros_utiles: 0,
        desperdicio_m: 0,
        desperdicio_pct: 0,
        precio_unitario: precioUnit,
        importe
      });

      total_accesorios += importe;
    });

    const total_general = total_perfiles + total_accesorios;
    const desperdicio_total_m = metros_comprados_total - metros_utiles_total;
    const nivel_optimizacion_pct = metros_comprados_total > 0 ? (metros_utiles_total / metros_comprados_total) * 100 : 0;

    informesEconomicosUltimo = {
      perfiles: perfilesOptim,
      accesorios: accesoriosLista,
      refsAcabado,
      configColores,
      resumen_lineas,
      totales: {
        total_perfiles,
        total_accesorios,
        total_general,
        metros_comprados_total,
        metros_utiles_total,
        desperdicio_total_m,
        nivel_optimizacion_pct
      }
    };

    renderInformesEconomicosDohaSun(informesEconomicosUltimo);
  }

  function renderInformesEconomicosDohaSun(data) {
    const resumenWeb = document.getElementById("resumenEconomicoBodyWeb");
    const resumenPdf = document.getElementById("resumenEconomicoBodyPdf");
    const resumenMatWeb = document.getElementById("materialBodyWeb");
    const resumenMatPdf = document.getElementById("materialDocBody");
    const totalesWeb = document.getElementById("resumenEconomicoTotalesWeb");
    const totalesPdf = document.getElementById("resumenEconomicoTotalesPdf");

    [resumenWeb, resumenPdf, resumenMatWeb, resumenMatPdf, totalesWeb, totalesPdf].forEach(el => {
      if (el) el.innerHTML = "";
    });

    if (!data || !precioUltimoCalculo) return;

    const filas = data.resumen_lineas || [];

    const renderLinea = (destino, linea) => {
      const longBarra = linea.longitud_barra_m != null ? linea.longitud_barra_m.toFixed(2) : "—";
      const unidades = linea.tipo === "accesorio" ? (linea.unidades ?? 0) : (linea.num_barras ?? 0);
      const metrosComprados = linea.metros_comprados ? linea.metros_comprados.toFixed(3) : "—";
      const metrosUtiles = linea.metros_utiles ? linea.metros_utiles.toFixed(3) : "—";
      const desperdicioTexto =
        linea.metros_comprados && linea.tipo === "perfil"
          ? `${linea.desperdicio_m.toFixed(3)} m (${linea.desperdicio_pct.toFixed(1)}%)`
          : "—";

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${linea.tipo === "perfil" ? "Perfil" : "Accesorio"}</td>
        <td>${linea.ref}</td>
        <td>${linea.denominacion}</td>
        <td>${linea.acabado || ""}</td>
        <td>${linea.ref_acabado || ""}</td>
        <td>${longBarra}</td>
        <td>${unidades ?? ""}</td>
        <td>${metrosComprados}</td>
        <td>${metrosUtiles}</td>
        <td>${desperdicioTexto}</td>
        <td>${precioFormatearEuro(linea.precio_unitario)}</td>
        <td>${precioFormatearEuro(linea.importe)}</td>`;
      destino?.appendChild(tr);
    };

    filas.forEach(linea => {
      renderLinea(resumenWeb, linea);
      renderLinea(resumenPdf, linea);
      renderLinea(resumenMatWeb, linea);
      renderLinea(resumenMatPdf, linea);
    });

    const t = data.totales || {};
    const resumenTotales = `
      <div class="price-totals" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr));">
        <div class="price-chip"><span class="label">Total perfiles</span>${precioFormatearEuro(t.total_perfiles || 0)}</div>
        <div class="price-chip"><span class="label">Total accesorios</span>${precioFormatearEuro(t.total_accesorios || 0)}</div>
        <div class="price-chip"><span class="label">Total presupuesto</span>${precioFormatearEuro(t.total_general || 0)}</div>
        <div class="price-chip"><span class="label">Metros comprados</span>${(t.metros_comprados_total || 0).toFixed(3)} m</div>
        <div class="price-chip"><span class="label">Metros útiles</span>${(t.metros_utiles_total || 0).toFixed(3)} m</div>
        <div class="price-chip"><span class="label">Desperdicio</span>${(t.desperdicio_total_m || 0).toFixed(3)} m</div>
        <div class="price-chip"><span class="label">Optimización</span>${(t.nivel_optimizacion_pct || 0).toFixed(1)}%</div>
      </div>
    `;

    // En la tarjeta web ya no mostramos el resumen económico; sólo se usa en documentos/PDF
    if (totalesWeb) totalesWeb.innerHTML = "";
    if (totalesPdf) totalesPdf.innerHTML = resumenTotales;

    renderDocumentosPdf(data);
  }

  function renderDocumentosPdf(data) {
    const docIds = [
      "doc-material-body",
      "doc-peso-body",
      "doc-corte-body",
      "doc-presupuesto-resumen",
      "doc-material-resumen",
      "doc-material-totales"
    ];
    docIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = "";
    });

    if (!data || !precioUltimoCalculo) return;

    const filas = data.resumen_lineas || [];

    // =========================
    // 1) INFORME DE MATERIAL
    // =========================
    const matBody = document.getElementById("doc-material-body");
    if (matBody) {
      filas.forEach(linea => {
        const longBarra =
          linea.tipo === "perfil" && linea.longitud_barra_m != null
            ? linea.longitud_barra_m.toFixed(2)
            : "—";
        const unidades =
          linea.tipo === "accesorio"
            ? (linea.unidades ?? 0)
            : (linea.num_barras ?? 0);

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${linea.tipo === "perfil" ? "Perfil" : "Accesorio"}</td>
          <td>${linea.ref}</td>
          <td>${linea.denominacion}</td>
          <td>${linea.acabado || ""}</td>
          <td>${linea.ref_acabado || "SIN ESPECIFICAR"}</td>
          <td>${longBarra}</td>
          <td>${unidades ?? ""}</td>
          <td>${precioFormatearEuro(linea.precio_unitario)}</td>
          <td>${precioFormatearEuro(linea.importe)}</td>
          <td></td>`;
        matBody.appendChild(tr);
      });
    }

  const t = data.totales || {};

// =========================
// 2) PRESUPUESTO (COMERCIAL)
// =========================
const resumenPres = document.getElementById("doc-presupuesto-resumen");
if (resumenPres) {
  const t = data.totales || {};
  const totalPerfilesBase   = Number(t.total_perfiles   || 0);
  const totalAccesorios     = Number(t.total_accesorios || 0);
  const totalTarifa         = Number(t.total_general    || (totalPerfilesBase + totalAccesorios));
  const rendimiento         = Number(t.nivel_optimizacion_pct || 0);
  const rendimientoPct      = Math.max(0, Math.min(rendimiento, 100));

  // Ancho de pérgola -> el usuario introduce METROS
  const anchoInput =
    document.getElementById("anchoPergola") ||
    document.getElementById("ancho");
  const anchoStr = anchoInput?.value || "";
  const anchoM   = parseFloat((anchoStr + "").replace(",", ".")) || 0;   // metros
  const anchoMm  = anchoM > 0 ? anchoM * 1000 : 0;                       // milímetros

  let html = "";

  // Envolvemos todo el bloque económico + rendimiento en un wrapper
  html += `
    <div id="pdfPresupuestoBloqueEconomico" class="budget-card">
      <div class="budget-header">
        <h3>Resumen económico</h3>
        <div id="precioFinalCliente" class="budget-total"></div>
      </div>

      <div class="budget-items">
        <div class="budget-row">
          <div class="budget-row-label">
            <span class="budget-icon">≡</span>
            <span class="label">Perfiles</span>
          </div>
          <span id="precioPerfilesBase" class="budget-value">
            ${precioFormatearEuro(totalPerfilesBase)}
          </span>
        </div>

        <div class="presupuesto-row descuento-row">
          <div class="descuento-izq">
            <span class="presupuesto-label">% Descuento</span>

            <div class="descuento-input-wrap">
              <input
                id="descuentoClienteInput"
                type="number"
                min="0"
                max="100"
                step="0.1"
                placeholder="0,0"
              />
              <span class="descuento-simbolo">%</span>
            </div>
          </div>

          <div id="importeDescuentoPerfiles" class="presupuesto-value descuento-euros">
            0,00 €
          </div>
        </div>

        <div class="budget-row">
          <div class="budget-row-label">
            <span class="budget-icon">⚙️</span>
            <span class="label">Accesorios</span>
          </div>
          <span id="precioAccesorios" class="budget-value">
            ${precioFormatearEuro(totalAccesorios)}
          </span>
        </div>
      </div>

      <div class="budget-gauge">
        <div class="budget-gauge-label">Rendimiento del aluminio</div>
        <div class="budget-gauge-bar">
          <div class="budget-gauge-fill" style="width:${rendimientoPct}%;"></div>
        </div>
        <div class="budget-gauge-value">${rendimiento.toFixed(1)}%</div>
      </div>
      <p id="textoRendimientoCliente" class="budget-note"></p>
      <p id="textoRecomendacionMedidas" class="budget-note"></p>
    </div>
  `;

  resumenPres.innerHTML = html;

  // =========================
  // LÓGICA DESCUENTO (SOLO PERFILES) Y PRECIO FINAL
  // =========================
  const precioPerfilesBaseSpan = document.getElementById("precioPerfilesBase");
  const precioAccSpan          = document.getElementById("precioAccesorios");
  const dtoPerfilesSpan        = document.getElementById("importeDescuentoPerfiles");
  const finalSpan              = document.getElementById("precioFinalCliente");
  const inputDto               = document.getElementById("descuentoClienteInput");

  function refrescarPrecioCliente() {
    const raw = (inputDto?.value || "").trim();
    let pct   = parseFloat(raw.replace(",", "."));
    if (isNaN(pct) || pct < 0) pct = 0;
    if (pct > 100) pct = 100;

    // Normalizamos el campo a coma para el usuario
    if (inputDto) inputDto.value = pct ? pct.toString().replace(".", ",") : "";

    const importeDtoPerfiles = totalPerfilesBase * pct / 100;
    const perfilesNetos      = totalPerfilesBase - importeDtoPerfiles;
    const totalFinal         = perfilesNetos + totalAccesorios;

    if (precioPerfilesBaseSpan) precioPerfilesBaseSpan.textContent = precioFormatearEuro(totalPerfilesBase);
    if (precioAccSpan)          precioAccSpan.textContent          = precioFormatearEuro(totalAccesorios);
    if (dtoPerfilesSpan)        dtoPerfilesSpan.textContent        = importeDtoPerfiles
      ? `− ${precioFormatearEuro(importeDtoPerfiles)}`
      : "0,00 €";
    if (finalSpan)              finalSpan.textContent              = precioFormatearEuro(totalFinal);
  }

  if (inputDto) {
    inputDto.addEventListener("input", refrescarPrecioCliente);
  }
  refrescarPrecioCliente();

  // =========================
  // TEXTO RENDIMIENTO GLOBAL
  // =========================
  const textoRend = document.getElementById("textoRendimientoCliente");
  if (textoRend) {
    if (!rendimiento || rendimiento <= 0) {
      textoRend.textContent =
        "No se ha podido calcular el rendimiento global del aluminio con la información disponible.";
    } else if (rendimiento >= 90) {
      textoRend.textContent =
        "Rendimiento excelente: el material se aprovecha prácticamente al máximo en esta configuración.";
    } else if (rendimiento >= 80) {
      textoRend.textContent =
        "Rendimiento muy bueno: el aprovech aprovechamiento de barras es alto y los retales son muy reducidos.";
    } else if (rendimiento >= 70) {
      textoRend.textContent =
        "Rendimiento correcto: el uso del material es adecuado, aunque existe margen de optimización.";
    } else {
      textoRend.textContent =
        "El rendimiento obtenido es correcto para la configuración actual.";
    }
  }
}

    // =========================
    // 3) INFORME DE MATERIAL (RESUMEN + TOTALES)
    // =========================
    const resumenMat = document.getElementById("doc-material-resumen");
    const totalesMat = document.getElementById("doc-material-totales");

    if (resumenMat) {
      const colorModo   = document.getElementById("colorModo")?.value || "global";
      const colorGlobal = document.getElementById("colorGlobal")?.value || "";
      const colorLamas  = document.getElementById("colorLamas")?.value || "";
      const colorPerim  = document.getElementById("colorPerimetro")?.value || "";
      const refGlobal   = document.getElementById("refAcabadoGlobal")?.value || "";
      const refLamas    = document.getElementById("refAcabadoLamas")?.value || "";
      const refPerim    = document.getElementById("refAcabadoPerimetro")?.value || "";

      let htmlAcabados = '<h3>Acabados seleccionados</h3><ul class="summary-list">';
      if (colorModo === "global") {
        htmlAcabados += `
          <li>
            <strong>Acabado general:</strong>
            ${colorGlobal || "—"}${refGlobal ? " (" + refGlobal + ")" : ""}
          </li>`;
      } else {
        htmlAcabados += `
          <li>
            <strong>Acabado lamas:</strong>
            ${colorLamas || "—"}${refLamas ? " (" + refLamas + ")" : ""}
          </li>
          <li>
            <strong>Acabado perímetro:</strong>
            ${colorPerim || "—"}${refPerim ? " (" + refPerim + ")" : ""}
          </li>`;
      }
      htmlAcabados += "</ul>";
      resumenMat.innerHTML = htmlAcabados;
    }

    if (totalesMat) {
      totalesMat.innerHTML = `
        <h3>Resumen económico</h3>
        <div class="price-totals" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr));">
          <div class="price-chip">
            <span class="label">Total perfiles</span>
            ${precioFormatearEuro(t.total_perfiles || 0)}
          </div>
          <div class="price-chip">
            <span class="label">Total accesorios</span>
            ${precioFormatearEuro(t.total_accesorios || 0)}
          </div>
          <div class="price-chip">
            <span class="label">Total materiales</span>
            ${precioFormatearEuro(t.total_general || 0)}
          </div>
        </div>`;
    }

    // =========================
    // 4) PESO Y PERÍMETRO
    // =========================
    const pesoBody = document.getElementById("doc-peso-body");
    if (pesoBody && data.perfiles) {
      pesoBody.innerHTML = "";
      data.perfiles.forEach(perf => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${perf.ref}</td>
          <td>${perf.descripcion}</td>
          <td>${perf.acabado_tipo || ""} (${perf.acabado_ref || "SIN ESPECIFICAR"})</td>
          <td>${perf.peso_kg.toFixed(3)}</td>
          <td>${(perf.perimetro_mm || 0).toFixed(0)}</td>`;
        pesoBody.appendChild(tr);
      });
    }

        // =========================
    // 5) HOJA DE CORTE (AGRUPADA POR PATRÓN DE BARRA)
    // =========================
    const corteBody = document.getElementById("doc-corte-body");
    if (corteBody && data.perfiles) {
      corteBody.innerHTML = "";
      data.perfiles.forEach(perf => {
        if (!perf.barras || !perf.barras.length) return;

        const perfWrap = document.createElement("div");
        perfWrap.style.marginBottom = "0.6rem";
        perfWrap.innerHTML = `<strong>${perf.ref} – ${perf.descripcion} – Acabado: ${perf.acabado_tipo || ""} (${perf.acabado_ref || "SIN ESPECIFICAR"})</strong>`;

        // Agrupamos barras con misma longitud y mismo patrón de cortes
        const grupos = {};

        perf.barras.forEach(barra => {
          // mapa de cortes de ESTA barra: mm -> nº piezas
          const patronMap = {};
          barra.cortes.forEach(c => {
            const mm = Math.round(c.longitud_m * 1000);
            patronMap[mm] = (patronMap[mm] || 0) + 1;
          });

          // clave de patrón ordenada para poder agrupar
          const patronKey = Object.entries(patronMap)
            .sort((a, b) => Number(a[0]) - Number(b[0]))
            .map(([mm, cnt]) => `${mm}x${cnt}`)
            .join("|");

          const key = `${barra.longitud_bar_m || barra.longitud_barra_m}_${patronKey}`;
          const longBarra = barra.longitud_barra_m ?? barra.longitud_bar_m;

          if (!grupos[key]) {
            grupos[key] = {
              longitud_barra_m: longBarra,
              num_barras: 0,
              patronMap
            };
          }
          grupos[key].num_barras += 1;
        });

        const table = document.createElement("table");
        table.innerHTML = `
          <thead>
            <tr>
              <th>Longitud barra (m)</th>
              <th>Nº barras</th>
              <th>Piezas por barra</th>
              <th>Total piezas</th>
            </tr>
          </thead>
          <tbody></tbody>`;
        const tb = table.querySelector("tbody");

        Object.values(grupos)
          .sort((a, b) => a.longitud_barra_m - b.longitud_barra_m)
          .forEach(gr => {
            const piezasPorBarra = Object.entries(gr.patronMap)
              .sort((a, b) => Number(a[0]) - Number(b[0]))
              .map(([mm, cnt]) => `${cnt} piezas de ${mm} mm`)
              .join(", ");

            const totalPiezas =
              Object.values(gr.patronMap).reduce((acc, cnt) => acc + cnt, 0) *
              gr.num_barras;

            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td>${gr.longitud_barra_m.toFixed(3)}</td>
              <td>${gr.num_barras}</td>
              <td>${piezasPorBarra}</td>
              <td>${totalPiezas}</td>`;
            tb.appendChild(tr);
          });

        perfWrap.appendChild(table);
        corteBody.appendChild(perfWrap);
      });
    }
    actualizarVisibilidadInformes();
  }

  function limpiarInformesEconomicos() {
    informesEconomicosUltimo = null;
    renderInformesEconomicosDohaSun(null);
  }
  // ============ FIN MÓDULO INFORMES DOHA SUN (UI + PDF) ============

  let salidaValida = false;
  let anchoValido = false;

  function desactivarAutocompletado() {
    document.querySelectorAll("input, select, textarea").forEach(el => {
      el.setAttribute("autocomplete", "off");
    });
  }

  function safeNumber(v) {
    const n = parseFloat(String(v).replace(",", "."));
    return isNaN(n) ? null : n;
  }

  function mostrarError(idInput, mensaje) {
    const input = document.getElementById(idInput);
    const error = document.getElementById(idInput + "Error");
    if (!input || !error) return;
    error.textContent = mensaje || "";
    error.style.display = mensaje ? "block" : "none";
  }

  function requiereRefuerzo(tipoMontaje) {
    const tipoEntre = document.getElementById("tipoEntreParedes")?.value || "laterales";
    return tipoMontaje === "pared-largo" || (tipoMontaje === "entre-paredes" && tipoEntre === "laterales");
  }

  function contarPilaresRefuerzo(tipoMontaje, incluirPilaresRefuerzo) {
    if (!incluirPilaresRefuerzo || !requiereRefuerzo(tipoMontaje)) return 0;
    const tipoEntre = document.getElementById("tipoEntreParedes")?.value || "laterales";
    if (tipoMontaje === "entre-paredes" && tipoEntre === "laterales") return 4;
    return 2;
  }

  function actualizarAvisoRefuerzo(tipoMontaje, incluirPilaresRefuerzo) {
    const bloque = document.getElementById("bloqueRefuerzo");
    const aviso = document.getElementById("avisoRefuerzo");
    const chk = document.getElementById("chkPilaresRefuerzo");
    const resumenAvisos = document.getElementById("resumenAvisosMontaje");

    const tipoEntre = document.getElementById("tipoEntreParedes")?.value || "laterales";
    const esParedLargo = tipoMontaje === "pared-largo";
    const esEntreLaterales = tipoMontaje === "entre-paredes" && tipoEntre === "laterales";
    const textoAviso = esEntreLaterales ? AVISO_REFUERZO_TEXTO_ENTRE : AVISO_REFUERZO_TEXTO_PARED;
    const textoCheckbox = esEntreLaterales
      ? "Añadir pilares de refuerzo en los laterales apoyados en pared"
      : "Añadir pilares de refuerzo en el lateral apoyado en pared";
    const mostrarBloque = esParedLargo || esEntreLaterales;

    if (bloque) {
      bloque.style.display = mostrarBloque ? "block" : "none";
      const chkTexto = bloque.querySelector("label.inline-checkbox span");
      if (chkTexto) chkTexto.textContent = textoCheckbox;
      if (!mostrarBloque && chk) chk.checked = false;
    }

    const mostrarAviso = mostrarBloque && !incluirPilaresRefuerzo;
    if (aviso) {
      aviso.classList.add("aviso-amarillo");
      aviso.style.display = mostrarAviso ? "block" : "none";
      aviso.textContent = mostrarAviso ? textoAviso : "";
    }

    if (resumenAvisos) {
      resumenAvisos.classList.add("aviso-amarillo");
      resumenAvisos.textContent = mostrarAviso ? textoAviso : "";
      resumenAvisos.setAttribute("data-show-pdf", mostrarAviso ? "1" : "0");
    }
  }

  function actualizarCalibrePilares(pilaresCalculados) {
    const el = document.getElementById("calibrePilaresDisplay");
    if (!el) return;
    const texto = pilaresCalculados && pilaresCalculados > 0
      ? `Calibre de los pilares: ${CALIBRE_PILAR_IA}`
      : "Calibre de los pilares: —";
    el.textContent = texto;
  }

  function validarSalida() {
    const salida = safeNumber(document.getElementById("salida").value);
    if (!salida || salida < 1.5 || salida > 6.0) {
      mostrarError("salida", "La salida debe estar entre 1,50 y 6,00 m.");
      salidaValida = false;
      return null;
    } else {
      mostrarError("salida", "");
      salidaValida = true;
    }
    return salida;
  }

  function obtenerModulos() {
    const chk = document.getElementById("chkVariosModulos").checked;
    if (!chk) return 1;
    let m = parseInt(document.getElementById("modulos").value, 10);
    if (!m || m < 2) {
      m = 2;
      document.getElementById("modulos").value = m;
    }
    return m;
  }

    function validarAncho() {
      const ancho = safeNumber(document.getElementById("ancho").value);
      const chkVarios = document.getElementById("chkVariosModulos");
    const campoModulos = document.getElementById("campoModulos");
    const inputModulos = document.getElementById("modulos");

    if (!ancho || ancho < 1.5) {
      mostrarError("ancho", "El ancho mínimo es 1,50 m.");
      anchoValido = false;
      return null;
    }

    if (ancho > 4) {
      const recomendados = Math.ceil(ancho / 4);
      if (!chkVarios.checked) {
        chkVarios.checked = true;
        campoModulos.style.display = "block";
        inputModulos.value = recomendados;
      }
    }

    let modulos = obtenerModulos();
    if (!chkVarios.checked) modulos = 1;

    const anchoPorModulo = ancho / modulos;
    if (anchoPorModulo < 1.5 || anchoPorModulo > 4.0) {
      mostrarError("ancho", "Con el ancho y nº de módulos actuales no se cumple 1,50–4,00 m por módulo.");
      anchoValido = false;
    } else {
      mostrarError("ancho", "");
      anchoValido = true;
    }

      return ancho;
    }

    function validarAltura(pilaresCalculados, alturaObligatoria = false) {
      const alturaInput = document.getElementById("altura");
      if (!alturaInput) return { valor: null, valido: true };

      const altura = safeNumber(alturaInput.value);
      const requiereAltura = alturaObligatoria || pilaresCalculados > 0;

      if (requiereAltura && altura === null) {
        mostrarError("altura", "Indica la altura libre (máx. 2,80 m) cuando hay pilares.");
        return { valor: null, valido: false };
      }

      if (altura !== null) {
        if (altura < 2.0) {
          mostrarError("altura", "La altura libre mínima es 2,00 m.");
          return { valor: null, valido: false };
        }
        if (altura > 2.8) {
          mostrarError("altura", "La altura libre no puede superar 2,80 m.");
          return { valor: null, valido: false };
        }
      }

      mostrarError("altura", "");
      return { valor: altura, valido: true };
    }

  function buscarFilaLamas(salida) {
    if (!salida) return null;
    for (const fila of LAMAS_TABLE) {
      if (salida >= fila.min && salida <= fila.max) return fila;
    }
    if (salida < LAMAS_TABLE[0].min) return LAMAS_TABLE[0];
    return LAMAS_TABLE[LAMAS_TABLE.length - 1];
  }

  function calcularNumeroLamas(salida) {
    const fila = buscarFilaLamas(salida);
    return fila ? fila.n : null;
  }

  function calcularPilares(modulos, tipoMontaje) {
    const tipoEntre = document.getElementById("tipoEntreParedes")?.value || "laterales";
    if (!modulos || modulos < 1) return 0;

    if (tipoMontaje === "pilares") {
      return 2 * modulos + 2;
    } else if (tipoMontaje === "pared-ancho") {
      return modulos + 1;
    } else if (tipoMontaje === "pared-largo") {
      return 2 * modulos;
    } else if (tipoMontaje === "entre-paredes") {
      if (tipoEntre === "laterales" && modulos > 1) return 2 * (modulos - 1);
      return 0;
    }
    return 0;
  }

  function actualizarCamposMontaje() {
    const tipo = document.querySelector("input[name='montaje']:checked")?.value || "pilares";
    const campoPared = document.getElementById("campoPosicionPared");
    const campoEntre = document.getElementById("campoEntreParedes");
    const selPared = document.getElementById("posicionPared");
    const chkRefuerzo = document.getElementById("chkPilaresRefuerzo");
    const textoDetallado = document.getElementById("textoMontajeDetallado");

    campoPared.style.display = "none";
    campoEntre.style.display = "none";
    selPared.innerHTML = "";
    if (chkRefuerzo) chkRefuerzo.checked = false;

    if (tipo === "pared-ancho") {
      campoPared.style.display = "block";
      selPared.innerHTML =
        '<option value="delantera">Delantera</option><option value="trasera">Trasera</option>';
    } else if (tipo === "pared-largo") {
      campoPared.style.display = "block";
      selPared.innerHTML =
        '<option value="izquierda">Izquierda</option><option value="derecha">Derecha</option>';
    } else if (tipo === "entre-paredes") {
      campoEntre.style.display = "block";
    }

    document.getElementById("textoMontaje").textContent = DESCRIPCIONES_MONT[tipo] || "";
    if (textoDetallado) textoDetallado.textContent = DESCRIPCIONES_MONT_DETALLADAS[tipo] || "";
    actualizarAvisoRefuerzo(tipo, chkRefuerzo?.checked);
  }

  function actualizarOpcionesMotorSegunModulos() {
    const modulos = obtenerModulos();
    const tieneVarios = modulos > 1;
    const pillPers = document.getElementById("pillPersonalizado");
    const labelIzq = document.getElementById("labelMotorIzquierda");
    const labelDer = document.getElementById("labelMotorDerecha");

    if (tieneVarios) {
      pillPers.style.display = "inline-flex";
      labelIzq.textContent = "Todos a izquierda";
      labelDer.textContent = "Todos a derecha";
    } else {
      pillPers.style.display = "none";
      labelIzq.textContent = "Motor a izquierda";
      labelDer.textContent = "Motor a derecha";
      const inputPers = document.querySelector("input[name='modoMotor'][value='personalizado']");
      const inputIzq = document.querySelector("input[name='modoMotor'][value='todos-izquierda']");
      if (inputPers && inputPers.checked && inputIzq) inputIzq.checked = true;
    }
  }

  function actualizarMotorPorModuloUI() {
    const modoMotor = document.querySelector("input[name='modoMotor']:checked")?.value || "todos-izquierda";
    const wrapper = document.getElementById("motorPorModuloWrapper");
    const container = document.getElementById("motorPorModuloContainer");
    const modulos = obtenerModulos();

    if (modoMotor !== "personalizado" || modulos <= 1) {
      wrapper.style.display = "none";
      container.innerHTML = "";
      return;
    }

    wrapper.style.display = "block";
    container.innerHTML = "";

    let base = "izquierda";
    const radioDer = document.querySelector("input[name='modoMotor'][value='todos-derecha']");
    if (radioDer && radioDer.checked) base = "derecha";

    for (let i = 1; i <= modulos; i++) {
      const div = document.createElement("div");
      div.className = "field";
      div.innerHTML = `
        <label>Módulo ${i}</label>
        <select id="motor_mod_${i}">
          <option value="izquierda">Izquierda</option>
          <option value="derecha">Derecha</option>
        </select>
      `;
      container.appendChild(div);
      const sel = div.querySelector("select");
      sel.value = base;
      sel.addEventListener("change", actualizarConfiguracionRapida);
    }
  }

  function obtenerLadosMotores(modulos, modoMotor) {
    const lados = new Array(modulos).fill("izquierda");
    if (modoMotor === "todos-derecha") {
      return lados.map(() => "derecha");
    }
    if (modoMotor === "personalizado") {
      for (let i = 0; i < modulos; i++) {
        const sel = document.getElementById(`motor_mod_${i + 1}`);
        lados[i] = sel?.value === "derecha" ? "derecha" : "izquierda";
      }
    }
    return lados;
  }

  function renderDiagram(ancho, salida, modulos, tipoMontaje, pilares, moduleSides, numLamas, incluirPilaresRefuerzo = false) {
    const svg = document.getElementById("pergolaSvg");
    const caption = document.getElementById("diagramCaption");
    svg.innerHTML = "";
    const pdfSection = document.getElementById("pdfDiagramSection");

    if (!ancho || !salida) {
      caption.textContent = "Introduce largo/salida y ancho; el esquema se actualizará automáticamente.";
      const pdfSvg = document.getElementById("pergolaSvgPdf");
      if (pdfSvg) pdfSvg.innerHTML = "";
      if (pdfSection) pdfSection.style.display = "none";
      return;
    }

      const W = 340, H = 240;
      const maxRectW = 270, maxRectH = 170;
    const scale = Math.min(maxRectW / ancho, maxRectH / salida);
    const rectW = ancho * scale;
    const rectH = salida * scale;
    const x0 = (W - rectW) / 2;
    const y0 = (H - rectH) / 2;
    const x1 = x0 + rectW;
    const y1 = y0 + rectH;

    const partes = modulos && modulos > 1 ? modulos : 1;
    const dx = rectW / partes;

    const tipoEntre = document.getElementById("tipoEntreParedes")?.value || "laterales";
    const posicionPared = document.getElementById("posicionPared")?.value || "trasera";
    const tieneParedHorizontal = tipoMontaje === "pared-ancho" || (tipoMontaje === "entre-paredes" && tipoEntre === "frontales");
    const tieneParedVertical = tipoMontaje === "pared-largo" || (tipoMontaje === "entre-paredes" && tipoEntre === "laterales");

    let elements = "";

    // Paredes
    if (tipoMontaje === "pared-ancho") {
      const paredDelantera = posicionPared === "delantera";
      const yWall = paredDelantera ? (y1 + 2) : (y0 - 8);
      elements += `<rect x="${x0 - 4}" y="${yWall}" width="${rectW + 8}" height="6" fill="#9ca3af" />`;
    } else if (tipoMontaje === "pared-largo") {
      const paredDerecha = posicionPared === "derecha";
      const xWall = paredDerecha ? (x1 + 2) : (x0 - 8);
      elements += `<rect x="${xWall}" y="${y0 - 4}" width="6" height="${rectH + 8}" fill="#9ca3af" />`;
    } else if (tipoMontaje === "entre-paredes") {
      if (tipoEntre === "frontales") {
        elements += `<rect x="${x0 - 4}" y="${y0 - 8}" width="${rectW + 8}" height="6" fill="#9ca3af" />`;
        elements += `<rect x="${x0 - 4}" y="${y1 + 2}" width="${rectW + 8}" height="6" fill="#9ca3af" />`;
      } else {
        elements += `<rect x="${x0 - 8}" y="${y0 - 4}" width="6" height="${rectH + 8}" fill="#9ca3af" />`;
        elements += `<rect x="${x1 + 2}" y="${y0 - 4}" width="6" height="${rectH + 8}" fill="#9ca3af" />`;
      }
    }

    // Contorno
    elements += `<rect x="${x0}" y="${y0}" width="${rectW}" height="${rectH}" rx="8" fill="#ffffff" stroke="#111827" stroke-width="1.3" />`;

    // Lamas
    const lamas = Math.min(numLamas || 12, 40);
    const dy = rectH / (lamas + 1);
    for (let i = 1; i <= lamas; i++) {
      const y = y0 + i * dy;
      if (partes === 1) {
        elements += `<line x1="${x0 + 6}" y1="${y.toFixed(1)}" x2="${x1 - 6}" y2="${y.toFixed(1)}" stroke="#93c5fd" stroke-width="1"/>`;
      } else {
        for (let j = 0; j < partes; j++) {
          const segX0 = x0 + j * dx;
          const segX1 = segX0 + dx;
          elements += `<line x1="${(segX0 + 6).toFixed(1)}" y1="${y.toFixed(1)}" x2="${(segX1 - 6).toFixed(1)}" y2="${y.toFixed(1)}" stroke="#93c5fd" stroke-width="1"/>`;
        }
      }
    }

    // Divisores
    if (partes > 1) {
      for (let i = 1; i < partes; i++) {
        const x = x0 + i * dx;
        elements += `<line x1="${x.toFixed(1)}" y1="${y0}" x2="${x.toFixed(1)}" y2="${y1}" stroke="#9ca3af" stroke-width="1.2"/>`;
      }
    }

    // Pilares
    const pillarSize = 7;
    const half = pillarSize / 2;
    const pillarPoints = [];
    if (pilares > 0) {
      if (tipoMontaje === "pilares") {
        for (let i = 0; i <= partes; i++) {
          const x = x0 + i * dx;
          pillarPoints.push({ x, y: y0 - 2 });
          pillarPoints.push({ x, y: y1 + 2 });
        }
      } else if (tipoMontaje === "pared-ancho") {
        const paredDelantera = posicionPared === "delantera";
        const pyLibre = paredDelantera ? (y0 - 2) : (y1 + 2);
        for (let i = 0; i <= partes; i++) {
          const x = x0 + i * dx;
          pillarPoints.push({ x, y: pyLibre });
        }
      } else if (tipoMontaje === "pared-largo") {
        const paredDerecha = posicionPared === "derecha";
        const xLibre = paredDerecha ? (x0 - 2) : (x1 + 2);
        pillarPoints.push({ x: xLibre, y: y0 - 2 });
        pillarPoints.push({ x: xLibre, y: y1 + 2 });
        if (partes > 1) {
          for (let i = 1; i < partes; i++) {
            const xDiv = x0 + i * dx;
            pillarPoints.push({ x: xDiv, y: y0 - 2 });
            pillarPoints.push({ x: xDiv, y: y1 + 2 });
          }
        }
      } else if (tipoMontaje === "entre-paredes" && tipoEntre === "laterales") {
        if (partes > 1) {
          for (let i = 1; i < partes; i++) {
            const x = x0 + i * dx;
            pillarPoints.push({ x, y: y0 - 2 });
            pillarPoints.push({ x, y: y1 + 2 });
          }
        }
      }
    }

    const refuerzoPoints = [];
    if (incluirPilaresRefuerzo && requiereRefuerzo(tipoMontaje)) {
      if (tipoMontaje === "pared-largo") {
        const paredDerecha = posicionPared === "derecha";
        const xWall = paredDerecha ? (x1 + 2) : (x0 - 2);
        refuerzoPoints.push({ x: xWall, y: y0 - 2 });
        refuerzoPoints.push({ x: xWall, y: y1 + 2 });
      } else if (tipoMontaje === "entre-paredes" && tipoEntre === "laterales") {
        const leftX = x0 - 2;
        const rightX = x1 + 2;
        refuerzoPoints.push({ x: leftX, y: y0 - 2 });
        refuerzoPoints.push({ x: leftX, y: y1 + 2 });
        refuerzoPoints.push({ x: rightX, y: y0 - 2 });
        refuerzoPoints.push({ x: rightX, y: y1 + 2 });
      }
    }

    pillarPoints.forEach(p => {
      elements += `<rect x="${(p.x - half).toFixed(1)}" y="${(p.y - half).toFixed(1)}" width="${pillarSize}" height="${pillarSize}" fill="#16a34a"/>`;
    });
    refuerzoPoints.forEach(p => {
      elements += `<rect x="${(p.x - half).toFixed(1)}" y="${(p.y - half).toFixed(1)}" width="${pillarSize}" height="${pillarSize}" fill="#facc15" stroke="#92400e" stroke-width="1"/>`;
    });

    // Motores (arriba, frente)
    const motorY = y0 - 12;
    const motorWidth = 18;
    const motorHeight = 4;
    const sides = Array.isArray(moduleSides) && moduleSides.length
      ? moduleSides
      : new Array(partes).fill("izquierda");

    for (let i = 0; i < partes; i++) {
      const segX0 = x0 + i * dx;
      const segX1 = segX0 + dx;
      const side = sides[i] === "derecha" ? "derecha" : "izquierda";
      const motorXCenter = side === "izquierda" ? segX0 + 12 : segX1 - 12;
      const mx = motorXCenter - motorWidth / 2;
      const my = motorY - motorHeight / 2;
      elements += `<rect x="${mx.toFixed(1)}" y="${my.toFixed(1)}" width="${motorWidth}" height="${motorHeight}" rx="2" fill="#f97316"/>`;
      if (i === 0) {
        elements += `<text x="${motorXCenter.toFixed(1)}" y="${(motorY - 6).toFixed(1)}" text-anchor="middle" font-size="9" fill="#374151">Motor</text>`;
      }
    }

    // Flechas dimensiones
    const arrowY = Math.min(H - 28, y1 + (tieneParedHorizontal ? 26 : 20));
    elements += `<line x1="${x0 + 20}" y1="${arrowY}" x2="${x1 - 20}" y2="${arrowY}" stroke="#4b5563" stroke-width="1.2" marker-start="url(#arrowHead)" marker-end="url(#arrowHead)"/>`;
    elements += `<text x="${(x0 + rectW / 2).toFixed(1)}" y="${(arrowY + 10).toFixed(1)}" text-anchor="middle" font-size="9" fill="#4b5563">Ancho (dirección de lamas)</text>`;

    const arrowX = Math.max(14 + (tieneParedVertical ? 8 : 0), x0 - (tieneParedVertical ? 22 : 14));
    elements += `<line x1="${arrowX}" y1="${y0 + 6}" x2="${arrowX}" y2="${y1 - 6}" stroke="#4b5563" stroke-width="1.2" marker-start="url(#arrowHead)" marker-end="url(#arrowHead)"/>`;
    const textX = Math.max(12 + (tieneParedVertical ? 8 : 0), arrowX - 2);
    const textY = y0 + rectH / 2;
    elements += `<text x="${textX}" y="${textY}" text-anchor="middle" font-size="9" fill="#4b5563" transform="rotate(-90 ${textX} ${textY})">Largo / salida</text>`;

    const defs = `
      <defs>
        <marker id="arrowHead" viewBox="0 0 10 10" refX="7" refY="5"
          markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#4b5563" />
        </marker>
      </defs>
    `;

    svg.innerHTML = defs + elements;
    caption.textContent =
      "";

    const pdfSvg = document.getElementById("pergolaSvgPdf");
    if (pdfSvg) {
      pdfSvg.setAttribute("viewBox", "0 0 340 240");
      pdfSvg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      pdfSvg.setAttribute("width", "300");
      pdfSvg.setAttribute("height", "212");
      pdfSvg.innerHTML = svg.innerHTML;
    }
  }

  function actualizarResumenLamasUI(salida) {
    const cont = document.getElementById("resumenLamas");
    if (!salida) {
      cont.innerHTML = `
        <h3>Número de lamas según salida</h3>
        <p>Introduce la salida en metros para ver el número orientativo de lamas y los rangos de medida sin despunte.</p>
      `;
      return;
    }
    const fila = buscarFilaLamas(salida);
    if (!fila) return;

    const anterior = LAMAS_TABLE.find(f => f.n === fila.n - 1) || fila;
    const siguiente = LAMAS_TABLE.find(f => f.n === fila.n + 1) || fila;

    cont.innerHTML = `
      <h3>Número de lamas según salida</h3>
      <p>Para una salida de <strong>${salida.toFixed(2)} m</strong> corresponden aproximadamente <strong>${fila.n} lamas</strong>.</p>
      <table>
        <thead>
          <tr>
            <th>Lamas</th>
            <th>Salida mínima [m]</th>
            <th>Salida máxima [m]</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${anterior.n}</td>
            <td>${anterior.min.toFixed(3)}</td>
            <td>${anterior.max.toFixed(3)}</td>
          </tr>
          <tr>
            <td><strong>${fila.n}</strong></td>
            <td><strong>${fila.min.toFixed(3)}</strong></td>
            <td><strong>${fila.max.toFixed(3)}</strong></td>
          </tr>
          <tr>
            <td>${siguiente.n}</td>
            <td>${siguiente.min.toFixed(3)}</td>
            <td>${siguiente.max.toFixed(3)}</td>
          </tr>
        </tbody>
      </table>
      <p class="table-footnote">Las medidas intermedias dentro de cada rango también son válidas. Para salidas máximas (6,00 m) se usan ${LAMAS_TABLE[LAMAS_TABLE.length - 1].n} lamas.</p>
    `;
  }

  function actualizarResumenConfig(ancho, salida, altura, modulos, tipoMontaje, pilares, numLamasTabla, modoMotor, ladosMotores, mando) {
    const cont = document.getElementById("resumenConfig");
    const motoresTexto =
      modoMotor === "personalizado"
        ? "Motores por módulo: " +
          ladosMotores.map((l, i) => `M${i + 1}:${l === "derecha" ? "Der" : "Izq"}`).join(", ")
        : `Configuración: ${modoMotor === "todos-derecha" ? "todos a derecha" : "todos a izquierda"}`;

    const mandoTexto = mando === "sin"
      ? "Sin mando incluido (se definirá aparte)."
      : "Con mando (1 ud. por instalación).";

    cont.innerHTML = `
      <h3>Datos principales</h3>
      <ul class="summary-list">
        <li><strong>Largo/salida:</strong> ${salida ? salida.toFixed(2) + " m" : "—"} · <strong>Ancho:</strong> ${ancho ? ancho.toFixed(2) + " m" : "—"} · <strong>Altura libre:</strong> ${altura ? altura.toFixed(2) + " m" : "—"}</li>
        <li><strong>Módulos:</strong> ${modulos}</li>
        <li><strong>Tipo de montaje:</strong> ${DESCRIPCIONES_MONT[tipoMontaje] || ""}</li>
        <li><strong>Nº pilares calculados:</strong> ${pilares}</li>
        <li><strong>Motores:</strong> ${motoresTexto}</li>
        <li><strong>Número de lamas (tabla):</strong> ${numLamasTabla || "no determinado"}</li>
        <li><strong>Mando:</strong> ${mandoTexto}</li>
      </ul>
    `;
  }

  function actualizarConfiguracionRapida() {
      const tipoMontaje = document.querySelector("input[name='montaje']:checked")?.value || "pilares";
      const incluirPilaresRefuerzo = requiereRefuerzo(tipoMontaje) && document.getElementById("chkPilaresRefuerzo")?.checked;

      actualizarAvisoRefuerzo(tipoMontaje, incluirPilaresRefuerzo);

      const salida = validarSalida();
      const ancho = validarAncho();
      if (!salida || !ancho) {
        document.getElementById("pilaresDisplay").textContent = "—";
        actualizarCalibrePilares(null);
        renderDiagram(null, null, null, null, null, null, null, false);
        renderTablaMateriales({}, {});
        return;
      }

      const modulos = obtenerModulos();
      const modoMotor = document.querySelector("input[name='modoMotor']:checked")?.value || "todos-izquierda";
      const mando = document.getElementById("mando").value || "con";

      actualizarOpcionesMotorSegunModulos();

      const numLamasTabla = calcularNumeroLamas(salida);
      const pilares = calcularPilares(modulos, tipoMontaje);
      const pilaresRefuerzo = contarPilaresRefuerzo(tipoMontaje, incluirPilaresRefuerzo);
      const pilaresTotales = pilares + pilaresRefuerzo;
      document.getElementById("pilaresDisplay").textContent = pilaresTotales || 0;
      actualizarCalibrePilares(pilaresTotales);

      const ladosMotores = obtenerLadosMotores(modulos, modoMotor);
      const requiereAlturaExtra = requiereRefuerzo(tipoMontaje) && incluirPilaresRefuerzo;

      const { valor: altura, valido: alturaOk } = validarAltura(pilaresTotales, requiereAlturaExtra);
      if (!alturaOk) {
        const warningEl = document.getElementById("warning");
        if (warningEl) {
          warningEl.style.display = "none";
          warningEl.textContent = "";
        }
        actualizarResumenLamasUI(salida);
        renderDiagram(ancho, salida, modulos, tipoMontaje, pilares, ladosMotores, numLamasTabla, incluirPilaresRefuerzo);
        renderTablaMateriales({}, {});
        precioLimpiarUI();
        return;
      }

      actualizarResumenConfig(ancho, salida, altura, modulos, tipoMontaje, pilaresTotales, numLamasTabla, modoMotor, ladosMotores, mando);
      actualizarResumenLamasUI(salida);
      renderDiagram(ancho, salida, modulos, tipoMontaje, pilares, ladosMotores, numLamasTabla, incluirPilaresRefuerzo);

      calcularMateriales(true, incluirPilaresRefuerzo);
  }

  /* ---------- Tabla materiales: separado perfiles / accesorios ---------- */
  function renderTablaMateriales(materiales, notas = {}) {
    const tbody = document.getElementById("tablaMateriales");
    tbody.innerHTML = "";

    const refs = Object.keys(materiales).sort();
    if (!refs.length) return;

    const perfiles = [];
    const accesorios = [];

    refs.forEach(ref => {
      const tipo = TIPO_MATERIAL[ref] || "accesorio";
      (tipo === "perfil" ? perfiles : accesorios).push(ref);
    });

    const addSection = (titulo, listaRefs) => {
      if (!listaRefs.length) return;
      const trTitulo = document.createElement("tr");
      trTitulo.className = "section-row";
      trTitulo.innerHTML = `<td colspan="4"><strong>${titulo}</strong></td>`;
      tbody.appendChild(trTitulo);

      listaRefs.forEach(ref => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${ref}</td>
          <td>${DESCRIPCIONES[ref] || ""}</td>
          <td>${materiales[ref]}</td>
          <td>${notas[ref] || ""}</td>
        `;
        tbody.appendChild(tr);
      });
    };

    addSection("Perfiles de aluminio", perfiles);
    addSection("Accesorios y herrajes", accesorios);
  }

  /* ---------- Cálculo de materiales ---------- */
    function calcularMateriales(auto = false, incluirPilaresRefuerzoParam) {
    const salida = validarSalida();
    const ancho = validarAncho();
    if (!salida || !ancho) {
      precioLimpiarUI();
      return;
    }

      const tipoMontaje = document.querySelector("input[name='montaje']:checked")?.value || "pilares";
      const modoMotor = document.querySelector("input[name='modoMotor']:checked")?.value || "todos-izquierda";
      const mando = document.getElementById("mando").value || "con";
      const modulos = obtenerModulos();
    const chkRefuerzo = document.getElementById("chkPilaresRefuerzo");
  const incluirPilaresRefuerzo =
    typeof incluirPilaresRefuerzoParam === "boolean"
      ? incluirPilaresRefuerzoParam
      : (requiereRefuerzo(tipoMontaje) && chkRefuerzo && chkRefuerzo.checked);
  const requiereAlturaExtra = requiereRefuerzo(tipoMontaje) && incluirPilaresRefuerzo;

  actualizarAvisoRefuerzo(tipoMontaje, incluirPilaresRefuerzo);

    const warningEl = document.getElementById("warning");
      warningEl.style.display = "none";
      warningEl.textContent = "";

      const advertencias = [];
      const numLamas = calcularNumeroLamas(salida);
      if (!numLamas) advertencias.push("No se ha podido determinar el nº de lamas para la salida indicada.");

  const pilares = calcularPilares(modulos, tipoMontaje);
  const pilaresRefuerzo = contarPilaresRefuerzo(tipoMontaje, incluirPilaresRefuerzo);
  const pilaresTotales = pilares + pilaresRefuerzo;
  document.getElementById("pilaresDisplay").textContent = pilaresTotales || 0;
  actualizarCalibrePilares(pilaresTotales);
  const { valor: altura, valido: alturaOk } = validarAltura(pilaresTotales, requiereAlturaExtra);
      if (!alturaOk) {
        renderTablaMateriales({}, {});
        precioLimpiarUI();
        return;
      }

      if (advertencias.length) {
        warningEl.style.display = "block";
        warningEl.textContent = advertencias.join(" ");
      }

      const ladosMotores = obtenerLadosMotores(modulos, modoMotor);
    actualizarResumenConfig(ancho, salida, altura, modulos, tipoMontaje, pilaresTotales, numLamas, modoMotor, ladosMotores, mando);
    actualizarResumenLamasUI(salida);
    renderDiagram(ancho, salida, modulos, tipoMontaje, pilares, ladosMotores, numLamas, incluirPilaresRefuerzo);

    const materiales = {};
    const notas = {};
    const anotar = (ref, texto) => {
      if (ref && texto) notas[ref] = texto;
    };
    const add = (ref, cantidad) => {
      if (!ref || !cantidad || cantidad <= 0) return;
      materiales[ref] = (materiales[ref] || 0) + cantidad;
    };

    if (!ancho || !salida || !numLamas || modulos < 1) {
      renderTablaMateriales(materiales, notas);
      return;
    }

    // Perfiles / barras por módulo
    add("6391", 2 * modulos);    // laterales
    add("7616", 2 * modulos);    // canalones
    add("6212", 2 * modulos);    // frontales
    add("7497", 2 * modulos);    // frontales 100x55
    add("1015B", 2 * modulos);   // lama tracción
    add("7985B", 2 * modulos);   // soporte lamas
    add("6867", 1 * modulos);    // lama motor
    const totalLamas = numLamas * modulos;
    add("6816", totalLamas);     // lamas normales
    add("6217", 1 * modulos);    // soporte lama compensación
    add("6218", 1 * modulos);    // lama compensadora

    if (modulos > 1) add("6436", modulos - 1); // larguero divisor

    // Tapas y kits por módulo / lama
    add("PB0005", 4 * modulos); // tapa canalón
    const totalLamasInclMotor = totalLamas + modulos;
    add("PB0032", totalLamasInclMotor); // tapa lama dcha
    add("PB0033", totalLamasInclMotor); // tapa lama izda
    add("PB0030", totalLamasInclMotor); // kit tornillería lama

    // Motor y kits
    add("MO4004", modulos);
    add("PB4505", modulos);
    add("PB4505", 2 * modulos); // fijación extra para lama compensadora
    add("PB0031", modulos);
    add("TA2010", 4 * modulos);

    // Pilares y tapas
    add("6323", pilaresTotales);
    add("PB0044", pilaresTotales);
    add("PB0015", pilaresTotales);

    if (modulos > 1) add("PB0052", 2 * (modulos - 1)); // tapa larguero doble

    if (pilaresTotales === 2) {
      add("PB0012", 1);
      add("PB0013", 1);
    } else if (pilaresTotales >= 4) {
      add("PB0012", 2);
      add("PB0013", 2);
    }

    if (tipoMontaje === "pared-ancho") {
      anotar("PB0012", "Embellecedor opcional recomendado en montaje lateral a pared.");
      anotar("PB0013", "Embellecedor opcional recomendado en montaje lateral a pared.");
    }

    if (tipoMontaje === "pared-ancho") {
      add("PB0050", 2);
      if (modulos > 1) add("PB0051", modulos - 1);
    }

    // Tapas motor según lado
    ladosMotores.forEach(side => {
      if (side === "izquierda") {
        add("PB0041", 1);
        add("PB0035", 1);
        add("PB0036", 1);
        add("PB0038", 1);
        add("PB0043", 2);
        add("PB0042", 1);
      } else {
        add("PB0040", 1);
        add("PB0034", 1);
        add("PB0037", 1);
        add("PB0039", 1);
        add("PB0042", 2);
        add("PB0043", 1);
      }
    });

    if (mando === "con") add("TM A5367", 1);

    renderTablaMateriales(materiales, notas);
    ultimoMaterialesContext = {
      materiales: { ...materiales },
      ancho,
      salida,
      modulos,
      tipoMontaje,
      numLamas,
      altura
    };
    calcularPreciosDohaSun(materiales, ultimoMaterialesContext);
    calcularInformesEconomicosDohaSun(materiales, ultimoMaterialesContext);
    actualizarDatosCabeceraPresupuesto();
  }

  /* ---------- Reset ---------- */
  function resetearCalculoParcial() {
    const camposCabecera = new Set(["comercial", "cliente", "refObra"]);
    document
      .querySelectorAll("input[type='text'], input[type='number'], textarea")
      .forEach(el => {
        if (!camposCabecera.has(el.id)) el.value = "";
      });
    document.querySelectorAll("select").forEach(sel => {
      if (sel.options.length && !camposCabecera.has(sel.id)) sel.selectedIndex = 0;
    });

    document.getElementById("chkVariosModulos").checked = false;
    document.getElementById("campoModulos").style.display = "none";
    document.querySelector("input[name='montaje'][value='pilares']").checked = true;
    actualizarCamposMontaje();
    document.querySelector("input[name='modoMotor'][value='todos-izquierda']").checked = true;
    const chkRefuerzo = document.getElementById("chkPilaresRefuerzo");
    if (chkRefuerzo) chkRefuerzo.checked = false;
    document.getElementById("mando").value = "con";
    document.getElementById("pilaresDisplay").textContent = "—";
    actualizarCalibrePilares(null);
    actualizarAvisoRefuerzo("pilares", false);
    document.getElementById("warning").style.display = "none";
    document.getElementById("warning").textContent = "";
    document.getElementById("resumenConfig").innerHTML =
      "<h3>Datos principales</h3><p>Introduce los datos; el esquema y este resumen se irán actualizando automáticamente.</p>";
    document.getElementById("resumenLamas").innerHTML =
      "<h3>Número de lamas según salida</h3><p>Introduce la salida en metros para ver el número orientativo de lamas y los rangos de medida sin despunte.</p>";
    const resumenAvisos = document.getElementById("resumenAvisosMontaje");
    if (resumenAvisos) {
      resumenAvisos.textContent = "";
      resumenAvisos.setAttribute("data-show-pdf", "0");
      resumenAvisos.style.display = "";
    }
    document.getElementById("tablaMateriales").innerHTML = "";
    document.getElementById("motorPorModuloContainer").innerHTML = "";
    document.getElementById("motorPorModuloWrapper").style.display = "none";
    mostrarError("salida", "");
    mostrarError("ancho", "");
    mostrarError("altura", "");
    salidaValida = false;
    anchoValido = false;
    renderDiagram(null, null, null, null, null, null, null, false);
    const selectorDoc = document.getElementById("selectorDocumento");
    mostrarSoloDocumento("");
    if (selectorDoc) selectorDoc.value = "presupuesto";
    actualizarVisibilidadInformes();
    document.getElementById("campoColorGlobal").style.display = "block";
    document.getElementById("campoColorLamas").style.display = "none";
    document.getElementById("campoColorPerimetro").style.display = "none";
    actualizarCamposColorPergola();
    precioLimpiarUI();
  }

  function resetear() {
    resetearCalculoParcial();
    document.getElementById("budgetInfo").style.display = "none";
    document.getElementById("comercial").value = "";
    document.getElementById("cliente").value = "";
    document.getElementById("refObra").value = "";
    const colorMono = document.querySelector("input[name='colorModo'][value='mono']");
    if (colorMono) colorMono.checked = true;
    document.getElementById("colorGlobal").value = "blanco";
    document.getElementById("colorLamas").value = "blanco";
    document.getElementById("colorPerimetro").value = "blanco";
    document.getElementById("refAcabadoGlobal").value = "";
    document.getElementById("refAcabadoLamas").value = "";
    document.getElementById("refAcabadoPerimetro").value = "";
    const selectorDoc = document.getElementById("selectorDocumento");
    const descInput = document.getElementById("descuentoAluminio");
    if (descInput) descInput.value = "0";
    mostrarSoloDocumento("");
    selectorDoc.value = "presupuesto";
    actualizarVisibilidadInformes();
    document.getElementById("campoColorGlobal").style.display = "block";
    document.getElementById("campoColorLamas").style.display = "none";
    document.getElementById("campoColorPerimetro").style.display = "none";
    actualizarCamposColorPergola();
    precioLimpiarUI();
  }

    function actualizarVisibilidadInformes() {
    const selector = document.getElementById("selectorDocumento");
    const tipo = selector?.value || "presupuesto";
    mostrarSoloDocumento(`doc-${tipo}`);
  }

  /* ---------- Datos cabecera para PDF ---------- */
  function actualizarDatosCabeceraPresupuesto() {
    const comercial = document.getElementById("comercial")?.value.trim() || "";
    const cliente   = document.getElementById("cliente")?.value.trim()   || "";
    const refObra   = document.getElementById("refObra")?.value.trim()   || "";
    const bi = document.getElementById("budgetInfo");
    if (!bi) return;

    document.getElementById("biComercial").textContent = comercial;
    document.getElementById("biCliente").textContent   = cliente;
    document.getElementById("biRefObra").textContent   = refObra;

    bi.style.display = (comercial || cliente || refObra) ? "grid" : "none";
  }

  function generarCodigoRef() {
    const now = new Date();
    const pad = n => String(n).padStart(2, "0");
    return now.getFullYear() +
      pad(now.getMonth() + 1) +
      pad(now.getDate()) + "-" +
      pad(now.getHours()) +
      pad(now.getMinutes()) +
      pad(now.getSeconds());
  }

  function inicializarNumeroPresupuesto() {
    const refSpan = document.getElementById("refCode");
    // Si no hay número, generar uno nuevo
    if (refSpan && !refSpan.textContent.trim()) {
      refSpan.textContent = generarCodigoRef();
    }
  }

  function sanitizeForFilename(str) {
    if (!str) return "";
    return str
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9 _-]/g, "")
      .trim()
      .replace(/\s+/g, "_");
  }

  function mostrarSoloDocumento(idDoc) {
    document.querySelectorAll(".documento-pdf").forEach(el => {
      el.style.display = "none";
    });
    if (idDoc) {
      const target = document.getElementById(idDoc);
      if (target) target.style.display = "block";
    }
  }

  function actualizarFechaPDF() {
    const span = document.getElementById("pdfFecha");
    if (!span) return;
    const now = new Date();
    const pad = n => String(n).padStart(2, "0");
    span.textContent = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;
  }

  /* ---------- Generación PDF / Compartir ---------- */
  function generarPDF(modo, docTipo = "presupuesto") {
    if (!ultimoMaterialesContext || !ultimoMaterialesContext.materiales || !Object.keys(ultimoMaterialesContext.materiales).length) {
      alert("Primero calcula los materiales antes de descargar el PDF.");
      return;
    }

    const comercial = document.getElementById("comercial").value.trim();
    const cliente   = document.getElementById("cliente").value.trim();
    const refObra   = document.getElementById("refObra").value.trim();
    if (!comercial || !cliente || !refObra) {
      alert("Rellena comercial, cliente y referencia de obra antes de generar el PDF.");
      return;
    }

    if (typeof html2pdf === "undefined") {
      alert("No se ha podido cargar la librería html2pdf.js.");
      return;
    }

    // Actualizamos cabecera y fecha
    actualizarDatosCabeceraPresupuesto();
    actualizarFechaPDF();

    // Código de referencia de presupuesto
    const refSpan = document.getElementById("refCode");
    const refLine = document.getElementById("refLine");
    if (refSpan && !refSpan.textContent) refSpan.textContent = generarCodigoRef();
    if (refLine) refLine.style.display = "block";

    const refInline = document.getElementById("refCodeInline");
    if (refInline && refSpan) refInline.textContent = refSpan.textContent;

    const ref = sanitizeForFilename(refSpan ? refSpan.textContent : "");
    const cliObra = sanitizeForFilename(refObra);

    let tipoPdf = "PRESUPUESTO";
    if (docTipo === "material") tipoPdf = "MATERIAL";
    else if (docTipo === "peso") tipoPdf = "PESO";
    else if (docTipo === "corte") tipoPdf = "CORTE";

    // Nombre de archivo: [REF_PRESUPUESTO] - [REF_OBRA] - [TIPO].pdf
    const filename = `${ref || tipoPdf} - ${cliObra || "OBRA"} - ${tipoPdf}.pdf`;

    const pdfHeader          = document.getElementById("pdfHeader");
    const pdfArea            = document.getElementById("pdfArea");
    const pdfLogoEl          = document.getElementById("pdfLogo");
    const pdfDiagramSection  = document.getElementById("pdfDiagramSection");
    const preciosPdfCard     = document.getElementById("preciosPdfCard");

    // Refrescamos resumen económico / documentos
    renderInformesEconomicosDohaSun(informesEconomicosUltimo);

    // Nos aseguramos de que en la vista web también solo se vea el doc seleccionado
    if (docTipo) {
      mostrarSoloDocumento(`doc-${docTipo}`);
    } else {
      mostrarSoloDocumento("");
    }

    // Clonamos el bloque de documentos y añadimos SOLO el documento seleccionado al pdfArea
    let clonedWrapper = null;
    const docPreview = document.querySelector("#informesCard .documento-preview");
    if (docPreview && pdfArea) {
      const clone = docPreview.cloneNode(true);
      // Dejar visible solo el documento elegido
      clone.querySelectorAll(".documento-pdf").forEach(el => {
        if (el.id !== `doc-${docTipo}`) {
          el.style.display = "none";
        } else {
          el.style.display = "block";
        }
      });

      // Envolvemos para poder eliminarlo fácil luego y darle un margen
      const wrapper = document.createElement("div");
      wrapper.style.marginTop = "12px";
      wrapper.appendChild(clone);
      pdfArea.appendChild(wrapper);
      clonedWrapper = wrapper;
    }

    function cleanup() {
      if (pdfHeader) pdfHeader.style.display = "none";
      if (pdfDiagramSection) pdfDiagramSection.style.display = "none";
      if (preciosPdfCard) preciosPdfCard.style.display = "none";
      document.body.classList.remove("pdf-mode");
      // Eliminamos el clon que hemos añadido para el PDF
      if (clonedWrapper && clonedWrapper.parentNode) {
        clonedWrapper.parentNode.removeChild(clonedWrapper);
      }
    }

    // Modo PDF (ocultar cosas de la interfaz mediante CSS si hace falta)
    document.body.classList.add("pdf-mode");

    // Cabecera corporativa siempre visible en todos los documentos
    if (pdfHeader) pdfHeader.style.display = "block";

    // Solo el documento PRESUPUESTO lleva vista esquemática.
    if (pdfDiagramSection) {
      pdfDiagramSection.style.display = (docTipo === "presupuesto") ? "block" : "none";
    }
    // El resumen económico (desglose) no se incluye en el PDF del presupuesto
    // ni en el resto de documentos generados desde este flujo.
    if (preciosPdfCard) {
      preciosPdfCard.style.display = "none";
    }

    // Fallback del logo si la URL remota falla
    if (pdfLogoEl && pdfLogoEl.dataset.fallback && pdfLogoEl.naturalWidth === 0) {
      pdfLogoEl.src = pdfLogoEl.dataset.fallback;
    }

    const opt = {
      margin: 10,
      filename: filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, allowTaint: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] } // sin avoid para no dejar huecos grandes
    };

    if (modo === "descargar") {
      html2pdf().set(opt).from(pdfArea).save().then(cleanup).catch(() => {
        cleanup();
        alert("No se ha podido generar el PDF.");
      });
    } else if (modo === "whatsapp") {
      html2pdf().set(opt).from(pdfArea).outputPdf("blob").then(async (blob) => {
        cleanup();
        const file = new File([blob], filename, { type: "application/pdf" });
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: filename,
              text: "Te envío el presupuesto de la pérgola bioclimática."
            });
          } catch (err) {
            console.error("Error al compartir:", err);
          }
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          alert("Tu navegador no permite enviar el PDF directamente. Se ha descargado el archivo para que lo compartas manualmente.");
        }
      }).catch(() => {
        cleanup();
        alert("No se ha podido generar el PDF.");
      });
    }
  }

  /* ---------- Logo PDF: fallback si la URL remota falla ---------- */
  const pdfLogoGlobal = document.getElementById("pdfLogo");
  const pdfLogoFallback = pdfLogoGlobal?.dataset.fallback;
  if (pdfLogoGlobal && pdfLogoFallback) {
    pdfLogoGlobal.addEventListener("error", () => {
      if (pdfLogoGlobal.src !== pdfLogoFallback) {
        pdfLogoGlobal.src = pdfLogoFallback;
      }
    });
  }

  /* ---------- Listeners ---------- */
  document.getElementById("salida").addEventListener("input", () => {
    validarSalida();
    actualizarConfiguracionRapida();
  });
  document.getElementById("ancho").addEventListener("input", () => {
    validarAncho();
    actualizarConfiguracionRapida();
  });
  document.getElementById("altura").addEventListener("input", actualizarConfiguracionRapida);

  document.getElementById("chkVariosModulos").addEventListener("change", () => {
    const campoMod = document.getElementById("campoModulos");
    campoMod.style.display = document.getElementById("chkVariosModulos").checked ? "block" : "none";
    actualizarOpcionesMotorSegunModulos();
    actualizarMotorPorModuloUI();
    actualizarConfiguracionRapida();
  });

  document.getElementById("modulos").addEventListener("input", () => {
    validarAncho();
    actualizarOpcionesMotorSegunModulos();
    actualizarMotorPorModuloUI();
    actualizarConfiguracionRapida();
  });

  document.getElementById("grupoMontaje").addEventListener("change", () => {
    actualizarCamposMontaje();
    actualizarConfiguracionRapida();
  });

  document.getElementById("tipoEntreParedes").addEventListener("change", actualizarConfiguracionRapida);
  document.getElementById("posicionPared").addEventListener("change", actualizarConfiguracionRapida);
  document.getElementById("chkPilaresRefuerzo").addEventListener("change", actualizarConfiguracionRapida);

  document.getElementById("comercial").addEventListener("input", actualizarDatosCabeceraPresupuesto);
  document.getElementById("cliente").addEventListener("input", actualizarDatosCabeceraPresupuesto);
  document.getElementById("refObra").addEventListener("input", actualizarDatosCabeceraPresupuesto);

  document.getElementById("grupoModoMotor").addEventListener("change", () => {
    actualizarMotorPorModuloUI();
    actualizarConfiguracionRapida();
  });

  document.getElementById("mando").addEventListener("change", actualizarConfiguracionRapida);

  document.querySelectorAll("input[name='colorModo']").forEach(r => {
    r.addEventListener("change", () => {
      actualizarCamposColorPergola();
      precioRecalcularDesdeContexto();
    });
  });
  ["colorGlobal", "colorLamas", "colorPerimetro"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", precioRecalcularDesdeContexto);
  });
  ["refAcabadoGlobal", "refAcabadoLamas", "refAcabadoPerimetro"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", precioRecalcularDesdeContexto);
  });
  const descuentoInput = document.getElementById("descuentoAluminio");
  if (descuentoInput) descuentoInput.addEventListener("input", precioRecalcularDesdeContexto);
  const selectorDocumento = document.getElementById("selectorDocumento");
if (selectorDocumento) {
  selectorDocumento.addEventListener("change", () => actualizarVisibilidadInformes());
}

const btnGenerarDoc = document.getElementById("btnGenerarPDF");
if (btnGenerarDoc) {
  btnGenerarDoc.addEventListener("click", () => {
    const doc = selectorDocumento?.value || "presupuesto";
    generarPDF("descargar", doc);
  });
}

const btnCompartirDoc = document.getElementById("btnCompartirPDF");
if (btnCompartirDoc) {
  btnCompartirDoc.addEventListener("click", () => {
    const doc = selectorDocumento?.value || "presupuesto";
    generarPDF("whatsapp", doc);
  });
}

  const btnRecalcular = document.getElementById("btnRecalcular");
  if (btnRecalcular) btnRecalcular.addEventListener("click", resetearCalculoParcial);

  const btnNuevoPresupuesto = document.getElementById("btnNuevoPresupuesto");
  if (btnNuevoPresupuesto) {
    btnNuevoPresupuesto.addEventListener("click", () => {
      // Recarga completa → igual que abrir la página desde cero
      window.location.href = window.location.href.split("#")[0];
    });
  }

  // Inicial
  desactivarAutocompletado();
  resetear();
  inicializarNumeroPresupuesto();

  window.addEventListener("pageshow", evt => {
    if (evt.persisted) {
      resetear();
      inicializarNumeroPresupuesto();
    }
  });
</script>
</body>
</html>
