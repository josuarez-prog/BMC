import { CanvasData } from '../types';

export function generateSingleFileHTML(canvasData: CanvasData): string {
  // Safe default formatting for textarea text inside HTML template
  const escapeHtml = (text: string) => {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lienzo Business Model Canvas - Clip-Inno</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            display: ['Inter', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
          colors: {
            bg: '#FAF9F6',
            sage: '#8DAA91',
            clay: '#B07D62',
            sand: '#D4C5A1',
            slate: '#7B8C9F',
            ink: '#3E3B39',
          }
        }
      }
    }
  </script>

  <style>
    /* Custom Scrollbars */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    /* Floating animation for Clip-Inno */
    @keyframes float {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-12px) rotate(2deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    .animate-float {
      animation: float 4s ease-in-out infinite;
    }

    /* Pulse animation for the bubble */
    @keyframes bubblePulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }
    .bubble-pulse {
      animation: bubblePulse 6s ease-in-out infinite;
    }

    /* Eyebrow animations */
    @keyframes eyebrowsNormal {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-1.5px); }
    }
    .animate-eyebrows {
      animation: eyebrowsNormal 3s ease-in-out infinite;
    }

    /* Printing layout optimizations */
    @media print {
      body {
        background: white !important;
        color: black !important;
        font-size: 10px;
        padding: 0 !important;
      }
      .no-print {
        display: none !important;
      }
      .print-border {
        border: 2px solid #64748b !important;
        background-color: white !important;
      }
      .canvas-grid {
        grid-template-columns: repeat(10, minmax(0, 1fr)) !important;
        gap: 6px !important;
        margin-top: 0 !important;
      }
      textarea {
        border: none !important;
        resize: none !important;
        background: transparent !important;
        padding: 0 !important;
        height: auto !important;
        overflow: visible !important;
        font-size: 9px !important;
      }
    }
  </style>
</head>
<body class="bg-bg text-ink min-h-screen font-sans flex flex-col selection:bg-clay/20 selection:text-ink transition-colors duration-300">

  <!-- TOP DECORATIVE BANNER -->
  <div class="h-1.5 w-full bg-gradient-to-r from-slate via-clay via-sand to-sage no-print"></div>

  <!-- HEADER -->
  <header class="bg-white border-b border-[#E5E0D8] py-5 px-6 md:px-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm z-10">
    <div>
      <div class="flex items-center gap-2 mb-1">
        <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-clay/10 text-clay border border-clay/25 font-mono">INTERACTIVO</span>
        <span class="text-xs text-slate font-mono">Lienzo Ágil v1.5</span>
      </div>
      <h1 class="text-2xl md:text-3xl font-bold font-display text-ink tracking-tight flex items-center gap-2">
        <i data-lucide="layout-grid" class="text-clay w-7 h-7"></i>
        Lienzo Business Model Canvas
      </h1>
      <p class="text-sm text-slate mt-0.5 max-w-xl">
        Diseña, valida y pivota tu modelo de negocio de forma lúdica y guiada junto a <strong>Clip-Inno</strong>.
      </p>
    </div>

    <!-- HEADER CONTROLS (NO PRINT) -->
    <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto no-print">
      <div class="relative inline-block text-left">
        <select id="exampleSelector" class="appearance-none bg-[#FAF9F6] hover:bg-[#F3EFE9] text-ink px-4 py-2 pr-10 rounded-xl text-sm font-medium border border-[#E5E0D8] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-clay">
          <option value="">📂 Cargar ejemplo...</option>
          <option value="netflix">🍿 Netflix (Streaming)</option>
          <option value="uber">🚗 Uber (Transporte)</option>
          <option value="cafe">☕ Cafetería de Especialidad</option>
          <option value="pethaven">🐶 Airbnb para Mascotas</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate">
          <i data-lucide="chevron-down" class="w-4 h-4"></i>
        </div>
      </div>

      <button onclick="clearCanvas()" class="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium text-slate hover:text-clay hover:bg-clay/5 border border-[#E5E0D8] transition-all cursor-pointer" title="Limpiar todo el lienzo">
        <i data-lucide="trash-2" class="w-4 h-4"></i>
        <span class="hidden md:inline">Limpiar</span>
      </button>

      <button onclick="window.print()" class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-clay hover:bg-clay/90 text-white shadow-sm hover:shadow-md border border-[#9E6C53] transition-all cursor-pointer">
        <i data-lucide="file-text" class="w-4 h-4"></i>
        <span>Guardar PDF</span>
      </button>
    </div>
  </header>

  <!-- MAIN CONTAINER -->
  <main class="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">

    <!-- 1. ONBOARDING (MENÚ DE CONSEJOS INICIALES) -->
    <section class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden no-print">
      <!-- Accordion Header -->
      <button onclick="toggleOnboarding()" class="w-full flex items-center justify-between p-5 bg-gradient-to-r from-slate-50 to-white text-left font-display font-semibold text-slate-800 hover:bg-slate-50 transition-colors focus:outline-none cursor-pointer">
        <div class="flex items-center gap-2.5">
          <div class="p-2 bg-amber-50 rounded-lg text-amber-600 border border-amber-100">
            <i data-lucide="sparkles" class="w-5 h-5"></i>
          </div>
          <div>
            <h2 class="text-base font-bold text-slate-900">¿Nuevo en esto? Abre la Guía del Business Model Canvas (BMC)</h2>
            <p class="text-xs text-slate-500 font-normal mt-0.5">Qué es el lienzo y 4 consejos ágiles e indispensables para empezar con éxito.</p>
          </div>
        </div>
        <div class="flex items-center gap-2 text-slate-400">
          <span id="onboardingToggleText" class="text-xs font-mono font-medium tracking-wider uppercase text-slate-400">EXPANDIR</span>
          <i id="onboardingChevron" data-lucide="chevron-down" class="w-5 h-5 transform transition-transform duration-300"></i>
        </div>
      </button>

      <!-- Accordion Content -->
      <div id="onboardingContent" class="max-h-0 overflow-hidden transition-all duration-300 ease-in-out border-t border-slate-100 bg-white">
        <div class="p-5 md:p-6 flex flex-col gap-6">
          <!-- BMC Explanation -->
          <div class="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
            <div class="text-indigo-600 bg-white p-2 rounded-lg shadow-xs border border-indigo-100">
              <i data-lucide="help-circle" class="w-6 h-6"></i>
            </div>
            <div>
              <h3 class="text-sm font-bold text-indigo-900">¿Qué es el Business Model Canvas?</h3>
              <p class="text-xs text-indigo-950 mt-1 leading-relaxed">
                Es una plantilla de gestión estratégica diseñada por Alexander Osterwalder para desarrollar nuevos modelos de negocio o documentar los existentes. En <strong>una sola hoja</strong>, te permite visualizar de manera interconectada los 9 bloques lógicos que definen cómo tu empresa planea aportar valor, conseguir clientes y generar utilidades de forma ágil.
              </p>
            </div>
          </div>

          <!-- 4 Tips Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Tip 1 -->
            <div class="p-4 rounded-xl border border-rose-100 bg-rose-50/20 hover:shadow-xs transition-all flex flex-col gap-2.5">
              <div class="flex items-center justify-between">
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider bg-rose-50 text-rose-600 border border-rose-100">CLIENTE</span>
                <i data-lucide="user-check" class="text-rose-500 w-4.5 h-4.5"></i>
              </div>
              <h4 class="text-sm font-bold text-slate-900">1. Empieza por el cliente</h4>
              <p class="text-xs text-slate-500 leading-relaxed">
                Un modelo solo funciona si resuelve una molestia o necesidad real para un grupo de personas. ¡No inventes soluciones buscando problemas!
              </p>
            </div>

            <!-- Tip 2 -->
            <div class="p-4 rounded-xl border border-amber-100 bg-amber-50/20 hover:shadow-xs transition-all flex flex-col gap-2.5">
              <div class="flex items-center justify-between">
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider bg-amber-50 text-amber-600 border border-amber-100">BREVEDAD</span>
                <i data-lucide="zap" class="text-amber-500 w-4.5 h-4.5"></i>
              </div>
              <h4 class="text-sm font-bold text-slate-900">2. Sé breve y puntual</h4>
              <p class="text-xs text-slate-500 leading-relaxed">
                No escribas párrafos interminables. Usa viñetas breves y palabras clave. El lienzo debe poder leerse y entenderse en solo 5 minutos.
              </p>
            </div>

            <!-- Tip 3 -->
            <div class="p-4 rounded-xl border border-indigo-100 bg-indigo-50/20 hover:shadow-xs transition-all flex flex-col gap-2.5">
              <div class="flex items-center justify-between">
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider bg-indigo-50 text-indigo-600 border border-indigo-100">AGILIDAD</span>
                <i data-lucide="repeat" class="text-indigo-500 w-4.5 h-4.5"></i>
              </div>
              <h4 class="text-sm font-bold text-slate-900">3. Sin perfección</h4>
              <p class="text-xs text-slate-500 leading-relaxed">
                Tu primer lienzo estará lleno de hipótesis, y está perfecto. Es un mapa vivo diseñado para tachar, borrar, validar y volver a empezar.
              </p>
            </div>

            <!-- Tip 4 -->
            <div class="p-4 rounded-xl border border-emerald-100 bg-emerald-50/20 hover:shadow-xs transition-all flex flex-col gap-2.5">
              <div class="flex items-center justify-between">
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100">CONEXIÓN</span>
                <i data-lucide="git-commit" class="text-emerald-500 w-4.5 h-4.5"></i>
              </div>
              <h4 class="text-sm font-bold text-slate-900">4. Mantén la coherencia</h4>
              <p class="text-xs text-slate-500 leading-relaxed">
                Asegúrate de que todo encaje. Tus canales deben llegar a tus segmentos y tus actividades clave deben respaldar tu propuesta de valor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. THE BUSINESS MODEL CANVAS -->
    <div class="flex flex-col gap-4">
      <!-- PILAR LEGEND (NO PRINT) -->
      <div class="flex flex-wrap items-center gap-4 justify-between bg-slate-100/60 p-3 rounded-xl border border-slate-200/50 text-xs text-slate-500 no-print">
        <span class="font-medium">Pilares del Modelo:</span>
        <div class="flex flex-wrap items-center gap-3.5">
          <span class="flex items-center gap-1.5 font-medium"><span class="w-3 h-3 rounded-md bg-sky-100 border border-sky-400"></span> Infraestructura (Lógica Interna)</span>
          <span class="flex items-center gap-1.5 font-medium"><span class="w-3 h-3 rounded-md bg-indigo-100 border border-indigo-400"></span> Oferta (El Valor)</span>
          <span class="flex items-center gap-1.5 font-medium"><span class="w-3 h-3 rounded-md bg-rose-100 border border-rose-400"></span> Mercado (Lógica Externa)</span>
          <span class="flex items-center gap-1.5 font-medium"><span class="w-3 h-3 rounded-md bg-emerald-100 border border-emerald-400"></span> Viabilidad Financiera</span>
        </div>
      </div>

      <!-- THE CANVAS GRID -->
      <div class="grid grid-cols-1 md:grid-cols-10 gap-4 canvas-grid">
        
        <!-- SOCIOS CLAVE (KEY PARTNERS) - Col 1-2, Row 1-2 -->
        <div class="md:col-span-2 md:row-span-2 bg-white rounded-2xl border-2 border-sky-200/80 hover:border-sky-300 shadow-xs hover:shadow-md transition-all p-4 flex flex-col gap-2.5 print-border group">
          <div class="flex items-center justify-between">
            <h3 class="font-display font-bold text-slate-800 text-sm md:text-base flex items-center gap-1.5">
              <span class="text-sky-500 p-1 rounded-lg bg-sky-50 group-hover:bg-sky-100 transition-colors">
                <i data-lucide="handshake" class="w-4.5 h-4.5"></i>
              </span>
              Socios Clave
            </h3>
            <span class="text-[10px] font-bold font-mono tracking-wider bg-sky-50 text-sky-600 px-1.5 py-0.5 rounded-full uppercase border border-sky-100">INFRA</span>
          </div>
          <p class="text-xs text-slate-500 leading-tight">¿Quiénes son tus socios estratégicos y proveedores indispensables para funcionar?</p>
          <textarea id="partners" onfocus="handleTextareaFocus('partners')" oninput="saveData()" placeholder="Ej. Agricultores locales de comercio justo, fabricantes de empaques biodegradables, servicios de entrega rápida..." class="flex-grow w-full h-40 md:h-full min-h-[140px] bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-sky-400 rounded-xl p-3 text-xs leading-relaxed transition-all focus:outline-none focus:ring-1 focus:ring-sky-400 font-sans">${escapeHtml(canvasData.partners)}</textarea>
        </div>

        <!-- ACTIVIDADES CLAVE (KEY ACTIVITIES) - Col 3-4, Row 1 -->
        <div class="md:col-span-2 md:row-span-1 bg-white rounded-2xl border-2 border-sky-200/80 hover:border-sky-300 shadow-xs hover:shadow-md transition-all p-4 flex flex-col gap-2.5 print-border group">
          <div class="flex items-center justify-between">
            <h3 class="font-display font-bold text-slate-800 text-sm md:text-base flex items-center gap-1.5">
              <span class="text-sky-500 p-1 rounded-lg bg-sky-50 group-hover:bg-sky-100 transition-colors">
                <i data-lucide="check-square" class="w-4.5 h-4.5"></i>
              </span>
              Actividades Clave
            </h3>
            <span class="text-[10px] font-bold font-mono tracking-wider bg-sky-50 text-sky-600 px-1.5 py-0.5 rounded-full uppercase border border-sky-100">INFRA</span>
          </div>
          <p class="text-xs text-slate-500 leading-tight">¿Qué acciones diarias y críticas requiere tu propuesta de valor para ser entregada?</p>
          <textarea id="activities" onfocus="handleTextareaFocus('activities')" oninput="saveData()" placeholder="Ej. Tostado diario del grano, diseño de recetas exclusivas, mantenimiento de la web, marketing digital..." class="w-full h-36 md:h-28 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-sky-400 rounded-xl p-3 text-xs leading-relaxed transition-all focus:outline-none focus:ring-1 focus:ring-sky-400 font-sans">${escapeHtml(canvasData.activities)}</textarea>
        </div>

        <!-- PROPUESTA DE VALOR (VALUE PROPOSITIONS) - Col 5-6, Row 1-2 -->
        <div class="md:col-span-2 md:row-span-2 bg-indigo-50/10 rounded-2xl border-2 border-indigo-200/80 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all p-4 flex flex-col gap-2.5 print-border group">
          <div class="flex items-center justify-between">
            <h3 class="font-display font-bold text-slate-800 text-sm md:text-base flex items-center gap-1.5">
              <span class="text-indigo-500 p-1 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
                <i data-lucide="award" class="w-4.5 h-4.5"></i>
              </span>
              Propuesta de Valor
            </h3>
            <span class="text-[10px] font-bold font-mono tracking-wider bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded-full uppercase border border-indigo-100">OFERTA</span>
          </div>
          <p class="text-xs text-slate-500 leading-tight">¿Qué valor único entregas? ¿Qué problema real resuelves mejor que cualquiera?</p>
          <textarea id="propositions" onfocus="handleTextareaFocus('propositions')" oninput="saveData()" placeholder="Ej. Café premium personalizado al gusto del cliente con tostado artesanal fresco de 24 horas, apoyando directamente al caficultor..." class="flex-grow w-full h-40 md:h-full min-h-[140px] bg-indigo-50/20 hover:bg-indigo-50/10 focus:bg-white border border-slate-200 focus:border-indigo-400 rounded-xl p-3 text-xs leading-relaxed transition-all focus:outline-none focus:ring-1 focus:ring-indigo-400 font-sans">${escapeHtml(canvasData.propositions)}</textarea>
        </div>

        <!-- RELACIONES CON CLIENTES (CUSTOMER RELATIONSHIPS) - Col 7-8, Row 1 -->
        <div class="md:col-span-2 md:row-span-1 bg-white rounded-2xl border-2 border-rose-200/80 hover:border-rose-300 shadow-xs hover:shadow-md transition-all p-4 flex flex-col gap-2.5 print-border group">
          <div class="flex items-center justify-between">
            <h3 class="font-display font-bold text-slate-800 text-sm md:text-base flex items-center gap-1.5">
              <span class="text-rose-500 p-1 rounded-lg bg-rose-50 group-hover:bg-rose-100 transition-colors">
                <i data-lucide="heart" class="w-4.5 h-4.5"></i>
              </span>
              Relación con Clientes
            </h3>
            <span class="text-[10px] font-bold font-mono tracking-wider bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded-full uppercase border border-rose-100">MERCADO</span>
          </div>
          <p class="text-xs text-slate-500 leading-tight">¿Cómo interactúas, conectas, retienes y enamoras a tus clientes?</p>
          <textarea id="relations" onfocus="handleTextareaFocus('relations')" oninput="saveData()" placeholder="Ej. Trato hiper-personalizado en barra, comunidad online interactiva, boletín semanal con tips de preparación..." class="w-full h-36 md:h-28 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-rose-400 rounded-xl p-3 text-xs leading-relaxed transition-all focus:outline-none focus:ring-1 focus:ring-rose-400 font-sans">${escapeHtml(canvasData.relations)}</textarea>
        </div>

        <!-- SEGMENTOS DE CLIENTES (CUSTOMER SEGMENTS) - Col 9-10, Row 1-2 -->
        <div class="md:col-span-2 md:row-span-2 bg-white rounded-2xl border-2 border-rose-200/80 hover:border-rose-300 shadow-xs hover:shadow-md transition-all p-4 flex flex-col gap-2.5 print-border group">
          <div class="flex items-center justify-between">
            <h3 class="font-display font-bold text-slate-800 text-sm md:text-base flex items-center gap-1.5">
              <span class="text-rose-500 p-1 rounded-lg bg-rose-50 group-hover:bg-rose-100 transition-colors">
                <i data-lucide="users" class="w-4.5 h-4.5"></i>
              </span>
              Segmentos Clientes
            </h3>
            <span class="text-[10px] font-bold font-mono tracking-wider bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded-full uppercase border border-rose-100">MERCADO</span>
          </div>
          <p class="text-xs text-slate-500 leading-tight">¿Para quién creas valor? ¿Quiénes son tus clientes o usuarios más importantes?</p>
          <textarea id="segments" onfocus="handleTextareaFocus('segments')" oninput="saveData()" placeholder="Ej. Profesionales amantes de la gastronomía premium (25-45 años), oficinas corporativas que valoran el bienestar de su staff..." class="flex-grow w-full h-40 md:h-full min-h-[140px] bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-rose-400 rounded-xl p-3 text-xs leading-relaxed transition-all focus:outline-none focus:ring-1 focus:ring-rose-400 font-sans">${escapeHtml(canvasData.segments)}</textarea>
        </div>

        <!-- RECURSOS CLAVE (KEY RESOURCES) - Col 3-4, Row 2 (under activities) -->
        <div class="md:col-span-2 md:row-span-1 bg-white rounded-2xl border-2 border-sky-200/80 hover:border-sky-300 shadow-xs hover:shadow-md transition-all p-4 flex flex-col gap-2.5 print-border group">
          <div class="flex items-center justify-between">
            <h3 class="font-display font-bold text-slate-800 text-sm md:text-base flex items-center gap-1.5">
              <span class="text-sky-500 p-1 rounded-lg bg-sky-50 group-hover:bg-sky-100 transition-colors">
                <i data-lucide="key" class="w-4.5 h-4.5"></i>
              </span>
              Recursos Clave
            </h3>
            <span class="text-[10px] font-bold font-mono tracking-wider bg-sky-50 text-sky-600 px-1.5 py-0.5 rounded-full uppercase border border-sky-100">INFRA</span>
          </div>
          <p class="text-xs text-slate-500 leading-tight">¿Qué activos físicos, intelectuales, humanos o financieros son obligatorios?</p>
          <textarea id="resources" onfocus="handleTextareaFocus('resources')" oninput="saveData()" placeholder="Ej. Máquina de espresso industrial, patente del algoritmo de recomendación, barista certificado, capital inicial..." class="w-full h-36 md:h-28 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-sky-400 rounded-xl p-3 text-xs leading-relaxed transition-all focus:outline-none focus:ring-1 focus:ring-sky-400 font-sans">${escapeHtml(canvasData.resources)}</textarea>
        </div>

        <!-- CANALES (CHANNELS) - Col 7-8, Row 2 (under relations) -->
        <div class="md:col-span-2 md:row-span-1 bg-white rounded-2xl border-2 border-rose-200/80 hover:border-rose-300 shadow-xs hover:shadow-md transition-all p-4 flex flex-col gap-2.5 print-border group">
          <div class="flex items-center justify-between">
            <h3 class="font-display font-bold text-slate-800 text-sm md:text-base flex items-center gap-1.5">
              <span class="text-rose-500 p-1 rounded-lg bg-rose-50 group-hover:bg-rose-100 transition-colors">
                <i data-lucide="compass" class="w-4.5 h-4.5"></i>
              </span>
              Canales
            </h3>
            <span class="text-[10px] font-bold font-mono tracking-wider bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded-full uppercase border border-rose-100">MERCADO</span>
          </div>
          <p class="text-xs text-slate-500 leading-tight">¿A través de qué medios conocen, compran y reciben tu propuesta de valor?</p>
          <textarea id="channels" onfocus="handleTextareaFocus('channels')" oninput="saveData()" placeholder="Ej. Tienda física en centro comercial, aplicación móvil propia, envíos a domicilio exprés por mensajería..." class="w-full h-36 md:h-28 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-rose-400 rounded-xl p-3 text-xs leading-relaxed transition-all focus:outline-none focus:ring-1 focus:ring-rose-400 font-sans">${escapeHtml(canvasData.channels)}</textarea>
        </div>

        <!-- ESTRUCTURA DE COSTOS Y GASTOS - Spans first 5 columns -->
        <div class="md:col-span-5 bg-white rounded-2xl border-2 border-emerald-200/80 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all p-4 flex flex-col gap-2.5 print-border group">
          <div class="flex items-center justify-between">
            <h3 class="font-display font-bold text-slate-800 text-sm md:text-base flex items-center gap-1.5">
              <span class="text-emerald-500 p-1 rounded-lg bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
                <i data-lucide="trending-down" class="w-4.5 h-4.5"></i>
              </span>
              Estructura de Costos
            </h3>
            <span class="text-[10px] font-bold font-mono tracking-wider bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-full uppercase border border-emerald-100">FINANZAS</span>
          </div>
          <p class="text-xs text-slate-500 leading-tight">¿Cuáles son los costos fijos y variables indispensables para operar el modelo?</p>
          <textarea id="costs" onfocus="handleTextareaFocus('costs')" oninput="saveData()" placeholder="Ej. Alquiler mensual del local, adquisición de materia prima, salarios del personal, inversión mensual en pauta digital..." class="w-full h-32 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-emerald-400 rounded-xl p-3 text-xs leading-relaxed transition-all focus:outline-none focus:ring-1 focus:ring-emerald-400 font-sans">${escapeHtml(canvasData.costs)}</textarea>
        </div>

        <!-- FUENTES DE INGRESOS - Spans last 5 columns -->
        <div class="md:col-span-5 bg-white rounded-2xl border-2 border-emerald-200/80 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all p-4 flex flex-col gap-2.5 print-border group">
          <div class="flex items-center justify-between">
            <h3 class="font-display font-bold text-slate-800 text-sm md:text-base flex items-center gap-1.5">
              <span class="text-emerald-500 p-1 rounded-lg bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
                <i data-lucide="dollar-sign" class="w-4.5 h-4.5"></i>
              </span>
              Fuentes de Ingresos
            </h3>
            <span class="text-[10px] font-bold font-mono tracking-wider bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-full uppercase border border-emerald-100">FINANZAS</span>
          </div>
          <p class="text-xs text-slate-500 leading-tight">¿Cómo genera dinero tu negocio? ¿Cómo y cuánto prefieren pagar tus clientes?</p>
          <textarea id="revenues" onfocus="handleTextareaFocus('revenues')" oninput="saveData()" placeholder="Ej. Venta unitaria de productos, suscripción mensual de café en grano, talleres y cursos presenciales los fines de semana..." class="w-full h-32 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-emerald-400 rounded-xl p-3 text-xs leading-relaxed transition-all focus:outline-none focus:ring-1 focus:ring-emerald-400 font-sans">${escapeHtml(canvasData.revenues)}</textarea>
        </div>

      </div>
    </div>
  </main>

  <!-- FOOTER -->
  <footer class="bg-white border-t border-slate-100 py-6 text-center text-xs text-slate-400 mt-12 no-print">
    <p>Creado de forma lúdica y moderna con la ayuda de Clip-Inno • © 2026. Todos los derechos reservados.</p>
  </footer>

  <!-- 3. MASCOT (CLIP-INNO) & SPEECH BUBBLE -->
  <div class="fixed bottom-6 right-6 flex flex-col items-end z-50 pointer-events-none no-print">
    
    <!-- Speech Bubble -->
    <div id="speechBubble" class="bubble-pulse pointer-events-auto bg-slate-900 text-white rounded-2xl p-4 shadow-xl max-w-xs md:max-w-sm mb-4 border border-slate-800 relative transition-all duration-300 text-xs leading-relaxed opacity-100 translate-y-0">
      <!-- Triangle pointer -->
      <div class="absolute bottom-[-8px] right-8 w-4 h-4 bg-slate-900 transform rotate-45 border-r border-b border-slate-800"></div>
      
      <!-- Content -->
      <div id="bubbleContent">
        <p class="font-display font-bold text-indigo-300 mb-1 flex items-center gap-1">
          <i data-lucide="sparkles" class="w-4 h-4 text-indigo-400"></i>
          Clip-Inno dice:
        </p>
        <p id="bubbleText">¡Hola emprendedor! Soy <strong>Clip-Inno</strong>, tu consejero personal. Haz clic en cualquier sección del lienzo y te daré mis mejores consejos con un toque de humor.</p>
      </div>

      <!-- Quick Actions inside Bubble -->
      <div class="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between gap-2">
        <button onclick="triggerModelValidation()" class="text-[10px] bg-indigo-600 hover:bg-indigo-500 text-white font-bold font-mono px-2 py-1 rounded-md transition-all cursor-pointer">
          🔍 Validar Modelo
        </button>
        <button onclick="loadRandomCrazyIdea()" class="text-[10px] text-slate-400 hover:text-white transition-all cursor-pointer">
          🎲 Idea Loca Express
        </button>
      </div>
    </div>

    <!-- The Paperclip Mascot (Clip-Inno) -->
    <div class="pointer-events-auto cursor-pointer mr-6 flex flex-col items-center justify-center animate-float" onclick="bounceMascot()" style="height: 100px; width: 60px;">
      <div class="relative w-11 h-20 bg-transparent">
        
        <!-- Outer Loop -->
        <div class="absolute inset-0 border-[3.5px] border-slate-700 rounded-[22px] bg-slate-100 shadow-inner flex flex-col justify-between p-1.5"></div>
        
        <!-- Inner Loop 1 (goes up, curves at top) -->
        <div class="absolute top-3.5 bottom-3.5 left-2 right-2 border-[3.5px] border-slate-700 rounded-[14px] border-b-0"></div>
        
        <!-- Inner Loop 2 (goes down, curves at bottom) -->
        <div class="absolute top-6 bottom-3 left-3.5 right-3.5 border-[3.5px] border-slate-700 rounded-[10px] border-t-0"></div>

        <!-- Face container on top of clip loops -->
        <div class="absolute top-4 left-0 right-0 flex flex-col items-center justify-start z-10">
          <!-- Eyebrows -->
          <div class="flex justify-between w-6 mb-0.5 animate-eyebrows">
            <div id="leftEyebrow" class="w-2.5 h-0.75 bg-slate-800 rounded-full transform rotate-[-4deg] transition-transform duration-300"></div>
            <div id="rightEyebrow" class="w-2.5 h-0.75 bg-slate-800 rounded-full transform rotate-[4deg] transition-transform duration-300"></div>
          </div>
          
          <!-- Eyes -->
          <div class="flex justify-between w-6.5">
            <!-- Left Eye -->
            <div class="w-2.5 h-2.5 bg-white border border-slate-800 rounded-full flex items-center justify-center relative overflow-hidden">
              <div class="pupil absolute w-1 h-1 bg-slate-900 rounded-full" style="top: 25%; left: 25%; transition: all 0.05s ease;"></div>
            </div>
            <!-- Right Eye -->
            <div class="w-2.5 h-2.5 bg-white border border-slate-800 rounded-full flex items-center justify-center relative overflow-hidden">
              <div class="pupil absolute w-1 h-1 bg-slate-900 rounded-full" style="top: 25%; left: 25%; transition: all 0.05s ease;"></div>
            </div>
          </div>

          <!-- Cute Mouth -->
          <div id="mascotMouth" class="w-2 h-1 bg-transparent border-b-2 border-slate-800 rounded-full mt-1.5 transition-all duration-300"></div>
        </div>
      </div>
    </div>

  </div>

  <!-- JAVASCRIPT LOGIC -->
  <script>
    // PREDEFINED DATA
    const EXAMPLES = {
      netflix: {
        partners: "• Estudios cinematográficos y productoras de contenido\\n• Proveedores de infraestructura cloud (AWS)\\n• Fabricantes de Smart TVs, consolas y dispositivos móviles\\n• Empresas de telecomunicaciones (bundles de internet)",
        activities: "• Desarrollo y optimización de la plataforma web/app\\n• Producción de contenido original (Netflix Originals)\\n• Algoritmo de recomendación personalizado e IA\\n• Marketing y adquisición de licencias",
        resources: "• Catálogo de películas y series\\n• Algoritmos propios y patentes tecnológicas\\n• Marca Netflix global\\n• Staff de ingeniería de software y producción de cine",
        propositions: "• Acceso ilimitado a películas y series sin anuncios\\n• Recomendaciones de IA basadas en tus gustos\\n• Reproducción en múltiples pantallas\\n• Contenido exclusivo de alta calidad producido en casa (Netflix Originals)",
        relations: "• Servicio automatizado y personalizado por perfiles\\n• Autogestión intuitiva del plan de suscripción\\n• Interacción social en redes y eventos promocionales",
        channels: "• Sitio web oficial (Netflix.com)\\n• Aplicación nativa en iOS, Android, Smart TVs y consolas\\n• Alianzas de facturación con operadores de telefonía",
        segments: "• Personas de 12 a 65+ años que buscan entretenimiento bajo demanda\\n• Familias que quieren contenido diverso en un solo plan\\n• Amantes del cine y maratones de series de televisión",
        costs: "• Producción multimillonaria de contenido propio\\n• Licenciamiento de películas y series de terceros\\n• Infraestructura cloud global de AWS\\n• Marketing internacional y salarios de ingeniería de software",
        revenues: "• Planes de suscripción mensual escalonados (Estándar, Premium)\\n• Plan de bajo costo con anuncios integrados\\n• Licenciamiento ocasional de producciones propias a terceros"
      },
      uber: {
        partners: "• Conductores independientes con vehículos propios\\n• Proveedores de mapas (Google Maps)\\n• Pasarelas de pago seguro (Stripe, PayPal)\\n• Inversionistas y aseguradoras de transporte",
        activities: "• Desarrollo continuo de la app y algoritmos de tarifas dinámicas\\n• Marketing para atraer tanto a pasajeros como a conductores\\n• Atención al cliente y seguridad\\n• Cumplimiento regulatorio local",
        resources: "• Plataforma tecnológica y patentes de tarifas\\n• Base de datos masiva de usuarios y conductores\\n• Marca Uber posicionada globalmente\\n• Cobertura de red y geolocalización",
        propositions: "• Pasajeros: Viajes seguros, con tarifa fija anticipada y pago automático\\n• Conductores: Horarios 100% flexibles y ganancias adicionales usando auto propio",
        relations: "• Sistema de calificación bidireccional (5 estrellas)\\n• Soporte al usuario y conductor dentro de la app\\n• Comunicación de promociones personalizadas",
        channels: "• Aplicación móvil de Uber (iOS y Android)\\n• Campañas publicitarias digitales\\n• Boca a boca y códigos de referidos",
        segments: "• Pasajeros: Personas en ciudades que buscan transportarse sin manejar\\n• Conductores: Personas con auto que buscan ingresos adicionales flexibles",
        costs: "• Infraestructura tecnológica y servidores\\n• Marketing para captar conductores y pasajeros\\n• Seguros de responsabilidad y soporte al cliente\\n• Gastos legales e impuestos locales",
        revenues: "• Comisión de intermediación por cada viaje (20% - 25%)\\n• Tarifas de cancelación de viajes\\n• Suscripción Uber One (entregas gratis y descuentos)"
      },
      cafe: {
        partners: "• Pequeños caficultores locales de comercio justo\\n• Diseñadores de empaques biodegradables\\n• Proveedores de equipo de barismo premium\\n• Pastelerías artesanales y panaderías locales",
        activities: "• Selección de granos y tostado artesanal propio\\n• Preparación experta de bebidas por baristas\\n• Organización de talleres de cata y eventos de café\\n• Mantener una atmósfera acogedora",
        resources: "• Granos de café de origen único con alta puntuación\\n• Máquina de espresso de gama alta\\n• Baristas certificados con pasión por el servicio\\n• Local comercial estratégico con diseño premium",
        propositions: "• Café recién tostado con perfiles de sabor únicos y trazables\\n• Experiencia educativa: baristas que te explican el origen del grano\\n• Espacio de coworking relajante con excelente Wi-Fi\\n• Panadería artesanal fresca seleccionada para maridar",
        relations: "• Trato amigable y ultra-personalizado\\n• Programas de fidelidad digitales (10° café gratis)\\n• Educación interactiva en barra y catas periódicas",
        channels: "• Barra física acogedora en zona ejecutiva\\n• Redes sociales visuales (Instagram para talleres y estética)\\n• Página web sencilla para pedidos para llevar o granos a domicilio",
        segments: "• Amantes y aficionados del café gourmet (foodies)\\n• Profesionales remotos y creativos que buscan trabajar fuera de casa\\n• Vecinos de la zona residencial de nivel socioeconómico medio-alto",
        costs: "• Alquiler del local comercial en zona de alta afluencia\\n• Compra directa de café verde de alta calidad\\n• Salarios de baristas expertos calificados\\n• Insumos ecológicos, repostería fresca y servicios básicos",
        revenues: "• Venta directa de bebidas calientes y frías en barra\\n• Venta de café en grano o molido empaquetado para llevar\\n• Repostería, panadería artesanal y bocadillos gourmet\\n• Entradas a talleres de cata y eventos de fin de semana"
      },
      pethaven: {
        partners: "• Cuidadores independientes validados en el barrio\\n• Clínicas veterinarias asociadas de urgencia 24/7\\n• Compañías de seguros de accidentes para mascotas\\n• Tiendas locales de alimentos y juguetes",
        activities: "• Validación estricta de antecedentes y hogares de cuidadores\\n• Soporte al cliente y cobertura veterinaria 24/7\\n• Desarrollo de la app y del algoritmo de emparejamiento\\n• Marketing digital emocional en redes",
        resources: "• Algoritmo de cercanía y reputación de cuidadores\\n• Base de datos de cuidadores validados con reseñas\\n• Marca confiable PetHaven\\n• Póliza de seguros veterinarios de emergencia",
        propositions: "• Dueños: Cuidado cariñoso, sin jaulas, con fotos diarias y seguro de salud veterinario incluido\\n• Cuidadores: Ingresos extra cuidando perritos en casa en su propio horario",
        relations: "• Comunidad de confianza basada en calificaciones transparentes\\n• Reportes diarios por chat (fotos, videos, paseos con GPS)\\n• Línea de emergencia humanizada y cercana 24/7",
        channels: "• Aplicación móvil (iOS/Android) y sitio web interactivo\\n• Historias emotivas y testimonios reales en redes sociales\\n• Alianzas con veterinarias y estéticas caninas de la ciudad",
        segments: "• Dueños de mascotas que viajan y odian los hoteles tradicionales de jaulas\\n• Amantes de los animales con tiempo libre que buscan ingresos extra",
        costs: "• Desarrollo de plataforma, hosting y seguridad web\\n• Primas de pólizas de seguros de salud veterinaria\\n• Inversión en publicidad online para adquisición de usuarios\\n• Salarios de soporte, validadores y desarrollo",
        revenues: "• Comisión de servicio cobrada al dueño (15% del total)\\n• Comisión de plataforma cobrada al cuidador (10% de su ingreso)\\n• Suscripción premium para cuidadores (destacado en búsquedas)"
      }
    };

    const CRAZY_IDEAS = [
      {
        propositions: "Tinder para adoptar plantas de interior rebeldes con consejos de cuidado cómicos según su personalidad.",
        segments: "Millennials estresados con culpa de 'padres de plantas' que buscan compañía botánica.",
        channels: "App móvil ultra-visual con perfiles graciosos de plantas, y entregas rápidas a domicilio en caja ecológica.",
        relations: "Alertas push graciosas simulando que la planta te escribe ('Rígame o me desmayo').",
        revenues: "Suscripción mensual a 'Súper Planta' (incluye abono premium y consultas con psicólogo botánico).",
        partners: "Viveros locales con plantas excedentes y expertos botánicos con sentido del humor.",
        activities: "Redactar perfiles cómicos de plantas, coordinar logística de envío express y actualizar la app.",
        resources: "Algoritmo de compatibilidad humana-planta y catálogo inicial de plantas rebeldes.",
        costs: "Servidores web, pauta publicitaria en redes, empaques seguros para traslados y salarios de soporte."
      },
      {
        propositions: "Netflix de Tacos: Una suscripción mensual que te envía 10 tacos sorpresa semanales de las mejores taquerías secretas de la ciudad, curados por un algoritmo.",
        segments: "Amantes apasionados de la comida urbana que odian decidir qué cenar.",
        channels: "App móvil con catálogo secreto de taquerías y sistema de entregas térmicas express.",
        relations: "Un 'club de catadores' exclusivo con votaciones para premiar al mejor taquero del mes.",
        revenues: "Suscripción mensual de Taco Oro ($15/mes por 10 tacos) o Taco Platino ($25/mes por tacos ilimitados los viernes).",
        partners: "Las mejores taquerías de barrio de la ciudad y repartidores locales independientes.",
        activities: "Trazar rutas de entrega, validar higiene y sazón de taquerías colaboradoras, y optimizar el algoritmo.",
        resources: "Algoritmo de recomendación de picante e ingredientes y base de taquerías secretas.",
        costs: "Reparto térmico premium, pagos puntuales a taqueros, soporte al cliente y marketing digital gourmet."
      }
    ];

    const MASCOT_TIPS = {
      partners: [
        "¿Quién te provee lo que tú no puedes producir? ¡Elige socios que compartan tus valores!",
        "No lo hagas todo tú solo. Delegar o aliarse con expertos te permite escalar más rápido y concentrarte en tu magia.",
        "Un buen socio clave reduce tus riesgos y te ayuda a optimizar tus costos iniciales."
      ],
      activities: [
        "¿Cuáles son las tareas críticas diarias? Diferencia las actividades de soporte de las verdaderamente estratégicas.",
        "¡El marketing digital y las ventas son el corazón! No asumas que los clientes llegarán por arte de magia.",
        "Mantén las actividades clave enfocadas en lo que hace único tu producto."
      ],
      resources: [
        "¿Qué recursos son indispensables? No te sobre-equipes al inicio; empieza ligero de equipaje.",
        "Tus recursos clave pueden ser intelectuales (una marca, software propio) o humanos (un diseñador estrella).",
        "Pregúntate: si este recurso desaparece mañana, ¿el negocio sigue en pie? Si no, ¡es clave!"
      ],
      propositions: [
        "¿Qué problema le resuelves a tu cliente de forma única? 'Ser barato' no es una propuesta sostenible a largo plazo.",
        "Define tu factor 'WOW'. ¿Por qué te elegirían a ti en lugar de a la competencia de siempre?",
        "No vendes un producto, vendes una emoción o solución. ¡No vendes café, vendes energía y estatus!"
      ],
      relations: [
        "Atraer un cliente cuesta 5 veces más que mantener uno. ¿Cómo vas a enamorarlos para que regresen?",
        "Define tu tono de voz: ¿serás formal e institucional, o divertido, amigable y empático como yo?",
        "La automatización es eficiente, pero la personalización genera lealtad indestructible."
      ],
      channels: [
        "¿Cómo te descubren y cómo compran? Traza la ruta del cliente desde el anuncio hasta el servicio post-venta.",
        "Sé eficiente. No necesitas estar en todas las redes sociales si tu cliente ideal solo lee newsletters por correo.",
        "Prueba canales directos (tu propia web) e indirectos (distribuidores) para ver cuál rinde mejor."
      ],
      segments: [
        "¿Para quién creas valor realmente? ¡No me digas que 'para todo el mundo'! El que le vende a todos no le vende a nadie.",
        "Describe a tu cliente ideal como una persona real: edad, hábitos, frustraciones y metas diarias.",
        "Identifica si tu negocio es B2C (consumidor final) o B2B (empresas). ¡Tienen motivaciones muy diferentes!"
      ],
      costs: [
        "¡Mucho ojo con la caja! Separa tus costos fijos (alquiler, nómina) de los variables (comisiones, insumos por unidad).",
        "Pregúntate qué actividades o recursos consumen más presupuesto y si hay formas ingeniosas de optimizarlos.",
        "El objetivo de una startup es validar rápido gastando lo mínimo posible. ¡Mantén tus costos ligeros!"
      ],
      revenues: [
        "¿Por qué valor están dispuestos a pagar tus clientes actualmente? Ofrece métodos de pago sencillos y adaptados.",
        "Diversifica tus ingresos. Explora suscripciones mensuales, licencias, publicidad o ventas de única vez.",
        "Calcula bien tus márgenes. Asegúrate de que el precio de venta cubra holgadamente tus costos operativos."
      ]
    };

    // ONBOARDING TOGGLE
    let onboardingOpen = false;
    function toggleOnboarding() {
      onboardingOpen = !onboardingOpen;
      const content = document.getElementById('onboardingContent');
      const text = document.getElementById('onboardingToggleText');
      const chevron = document.getElementById('onboardingChevron');
      
      if (onboardingOpen) {
        content.style.maxHeight = '500px';
        text.innerText = 'COLAPSAR';
        chevron.style.transform = 'rotate(180deg)';
      } else {
        content.style.maxHeight = '0';
        text.innerText = 'EXPANDIR';
        chevron.style.transform = 'rotate(0deg)';
      }
    }

    // FOCUS HANDLER FOR CLIP-INNO CONVERSATIONS
    function handleTextareaFocus(blockId) {
      const tips = MASCOT_TIPS[blockId];
      if (tips) {
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        const titles = {
          partners: 'Socios Clave',
          activities: 'Actividades Clave',
          resources: 'Recursos Clave',
          propositions: 'Propuesta de Valor',
          relations: 'Relación con Clientes',
          channels: 'Canales',
          segments: 'Segmentos Clientes',
          costs: 'Estructura de Costos',
          revenues: 'Fuentes de Ingresos'
        };
        
        updateBubbleText(\`<p class="font-display font-bold text-indigo-300 mb-1 flex items-center gap-1">
          <i data-lucide="help-circle" class="w-4 h-4 text-indigo-400"></i>
          Tip para \${titles[blockId]}:
        </p>
        <p class="text-slate-200">\${randomTip}</p>\`);
        
        // Tilt eyebrows playfully depending on block
        animateMascotFace(blockId);
      }
    }

    function animateMascotFace(blockId) {
      const left = document.getElementById('leftEyebrow');
      const right = document.getElementById('rightEyebrow');
      const mouth = document.getElementById('mascotMouth');
      
      // Reset eyebrows
      left.style.transform = 'translateY(0px) rotate(0deg)';
      right.style.transform = 'translateY(0px) rotate(0deg)';
      mouth.style.borderRadius = '9999px';
      mouth.style.height = '4px';
      mouth.style.backgroundColor = 'transparent';
      mouth.style.borderBottomWidth = '2px';
      mouth.style.borderColor = '#1e293b';

      if (blockId === 'propositions') {
        // Happy, surprised!
        left.style.transform = 'translateY(-3px) rotate(-10deg)';
        right.style.transform = 'translateY(-3px) rotate(10deg)';
        mouth.style.height = '6px';
        mouth.style.backgroundColor = '#1e293b';
        mouth.style.borderRadius = '50%';
      } else if (blockId === 'costs') {
        // Worried / thinking
        left.style.transform = 'translateY(1px) rotate(8deg)';
        right.style.transform = 'translateY(-1.5px) rotate(8deg)';
      } else if (blockId === 'revenues') {
        // Winking / excited
        left.style.transform = 'translateY(-2px) rotate(-15deg)';
        right.style.transform = 'translateY(0px) rotate(0deg)';
        mouth.style.height = '8px';
        mouth.style.borderBottomWidth = '3px';
      } else if (blockId === 'segments') {
        // Deep focus
        left.style.transform = 'translateY(-1px) rotate(-5deg)';
        right.style.transform = 'translateY(-1px) rotate(5deg)';
      }
    }

    function updateBubbleText(htmlContent) {
      const container = document.getElementById('bubbleContent');
      // Smooth transition
      container.style.opacity = '0';
      setTimeout(() => {
        container.innerHTML = htmlContent;
        container.style.opacity = '1';
        // Re-render icons if any were injected
        if (window.lucide) window.lucide.createIcons();
      }, 150);
    }

    // BOUNCE MASCOT ON CLICK
    function bounceMascot() {
      const text = [
        "¡Ouch! Jaja, ¡me encanta que hagas clic sobre mí! Sigue rellenando tu modelo de negocio.",
        "Consejo pro: Un modelo de negocio sólido vale más que 100 páginas de plan de negocios clásico.",
        "¿Sabías que soy primo lejano de Clippy? Pero yo estudié un MBA en Silicon Valley.",
        "¡Recuerda que puedes descargar este lienzo completo como PDF o enviármelo para validar!",
        "Si tienes dudas en finanzas, ¡recuerda equilibrar siempre tus costos contra tus ingresos!"
      ];
      const randomQuote = text[Math.floor(Math.random() * text.length)];
      
      updateBubbleText(\`<p class="font-display font-bold text-indigo-300 mb-1 flex items-center gap-1">
        <i data-lucide="smile" class="w-4 h-4 text-indigo-400"></i>
        Clip-Inno dice:
      </p>
      <p class="text-slate-200">\${randomQuote}</p>\`);
    }

    // MOUSE TRACKING PUPILS
    document.addEventListener('mousemove', (e) => {
      const pupils = document.querySelectorAll('.pupil');
      pupils.forEach(pupil => {
        const rect = pupil.parentElement.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
        // limit movement distance
        const distance = Math.min(2.5, Math.hypot(e.clientX - eyeX, e.clientY - eyeY) / 100);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        pupil.style.transform = \`translate(\${x}px, \${y}px)\`;
      });
    });

    // DATA PERSISTENCE & CONTROL
    function saveData() {
      const data = {
        partners: document.getElementById('partners').value,
        activities: document.getElementById('activities').value,
        resources: document.getElementById('resources').value,
        propositions: document.getElementById('propositions').value,
        relations: document.getElementById('relations').value,
        channels: document.getElementById('channels').value,
        segments: document.getElementById('segments').value,
        costs: document.getElementById('costs').value,
        revenues: document.getElementById('revenues').value,
      };
      localStorage.setItem('bmc_canvas_data', JSON.stringify(data));
    }

    function clearCanvas() {
      if (confirm('¿Estás seguro de que deseas vaciar todo el lienzo del modelo de negocio? Esta acción no se puede deshacer.')) {
        document.getElementById('partners').value = '';
        document.getElementById('activities').value = '';
        document.getElementById('resources').value = '';
        document.getElementById('propositions').value = '';
        document.getElementById('relations').value = '';
        document.getElementById('channels').value = '';
        document.getElementById('segments').value = '';
        document.getElementById('costs').value = '';
        document.getElementById('revenues').value = '';
        saveData();
        
        updateBubbleText(\`<p class="font-display font-bold text-indigo-300 mb-1 flex items-center gap-1">
          <i data-lucide="info" class="w-4 h-4 text-indigo-400"></i>
          Lienzo Limpio
        </p>
        <p class="text-slate-200">¡Lienzo despejado! Listo para plasmar tu próxima gran idea millonaria. ¡A por ello!</p>\`);
      }
    }

    // EXAMPLES SELECTOR HANDLER
    document.getElementById('exampleSelector').addEventListener('change', (e) => {
      const key = e.target.value;
      if (key && EXAMPLES[key]) {
        const data = EXAMPLES[key];
        document.getElementById('partners').value = data.partners.replace(/\\\\n/g, '\\n');
        document.getElementById('activities').value = data.activities.replace(/\\\\n/g, '\\n');
        document.getElementById('resources').value = data.resources.replace(/\\\\n/g, '\\n');
        document.getElementById('propositions').value = data.propositions.replace(/\\\\n/g, '\\n');
        document.getElementById('relations').value = data.relations.replace(/\\\\n/g, '\\n');
        document.getElementById('channels').value = data.channels.replace(/\\\\n/g, '\\n');
        document.getElementById('segments').value = data.segments.replace(/\\\\n/g, '\\n');
        document.getElementById('costs').value = data.costs.replace(/\\\\n/g, '\\n');
        document.getElementById('revenues').value = data.revenues.replace(/\\\\n/g, '\\n');
        saveData();

        updateBubbleText(\`<p class="font-display font-bold text-indigo-300 mb-1 flex items-center gap-1">
          <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i>
          Ejemplo cargado: \${e.target.options[e.target.selectedIndex].text}
        </p>
        <p class="text-slate-200">He rellenado el lienzo para que estudies cómo funciona este modelo exitoso. ¡Revísalo y saca ideas!</p>\`);
      }
    });

    // LOAD RANDOM CRAZY IDEA
    function loadRandomCrazyIdea() {
      const randomIndex = Math.floor(Math.random() * CRAZY_IDEAS.length);
      const idea = CRAZY_IDEAS[randomIndex];
      
      document.getElementById('partners').value = idea.partners;
      document.getElementById('activities').value = idea.activities;
      document.getElementById('resources').value = idea.resources;
      document.getElementById('propositions').value = idea.propositions;
      document.getElementById('relations').value = idea.relations;
      document.getElementById('channels').value = idea.channels;
      document.getElementById('segments').value = idea.segments;
      document.getElementById('costs').value = idea.costs;
      document.getElementById('revenues').value = idea.revenues;
      saveData();

      const titles = ["Tinder para Plantas Rebeldes 🌿", "Netflix de Tacos Surprise 🌮"];
      updateBubbleText(\`<p class="font-display font-bold text-rose-300 mb-1 flex items-center gap-1">
        <i data-lucide="sparkles" class="w-4 h-4 text-rose-400"></i>
        Idea loca: \${titles[randomIndex]}
      </p>
      <p class="text-slate-200">He cargado un modelo lúdico completo de una idea extravagante. ¡Analiza cómo todo conecta con coherencia y sentido del humor!</p>\`);
    }

    // INTERACTIVE VALIDATION ENGINE
    function triggerModelValidation() {
      const blocks = ['partners', 'activities', 'resources', 'propositions', 'relations', 'channels', 'segments', 'costs', 'revenues'];
      const filledBlocks = blocks.filter(id => document.getElementById(id).value.trim().length > 3);
      
      const count = filledBlocks.length;
      let title = "";
      let message = "";
      
      if (count === 0) {
        title = "¡El Vacío Absoluto! 🌌";
        message = "Tu lienzo está completamente vacío. ¡No le tengas miedo a la primera palabra! Haz clic en cualquier recuadro y escribe un borrador básico. ¡Yo te guío!";
      } else if (count < 4) {
        title = "Paso de Bebé 🍼";
        message = "Tienes \${count} de 9 bloques rellenados. Es un buen inicio, pero tu negocio aún está verde. Asegúrate de rellenar al menos la **Propuesta de Valor** y los **Segmentos de Clientes** para tener un norte.";
      } else if (count < 7) {
        title = "Modelo en Construcción 🏗️";
        message = "¡Buen progreso! Llevas \${count} bloques listos. Consejo: valida la coherencia. ¿Tus canales conectan bien con tu segmento? ¿Tus actividades clave soportan la propuesta de valor?";
      } else if (count < 9) {
        title = "¡Casi Listo! 🚀";
        message = "Tienes \${count} bloques completos. Solo te faltan un par de piezas para tener la vista de 360 grados de tu negocio. ¡No te rindas ahora, estás a minutos de completarlo!";
      } else {
        // Complete validation! Check coherence rules
        const props = document.getElementById('propositions').value.toLowerCase();
        const costs = document.getElementById('costs').value.toLowerCase();
        const revenues = document.getElementById('revenues').value.toLowerCase();
        
        let warning = "";
        if (costs.length > 5 && revenues.length > 5 && costs.includes('gratis') && !revenues.includes('suscripción') && !revenues.includes('venta')) {
          warning = " Veo que ofreces cosas gratis pero no me queda claro de dónde saldrá el dinero para pagar las cuentas. ¡Ten cuidado con la quiebra feliz!";
        }
        
        title = "¡Modelo Completo! 🎉";
        message = "¡Felicitaciones! Has llenado los 9 bloques lógicos. Ahora tienes un mapa estratégico inicial listo para imprimir, compartir y testear en el mundo real.\${warning}";
      }

      updateBubbleText(\`<p class="font-display font-bold text-indigo-300 mb-1 flex items-center gap-1">
        <i data-lucide="award" class="w-4 h-4 text-yellow-400"></i>
        \${title}
      </p>
      <p class="text-slate-200 font-sans">\${message}</p>\`);
    }

    // INITIALIZE ICONS
    window.onload = () => {
      if (window.lucide) {
        window.lucide.createIcons();
      }
    };
  </script>
</body>
</html>`;
}
