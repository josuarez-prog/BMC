import React, { useState, useEffect } from 'react';
import {
  LayoutGrid,
  BookOpen,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Trash2,
  Download,
  Check,
  FileText,
  Handshake,
  CheckSquare,
  Key,
  Award,
  Heart,
  Compass,
  Users,
  TrendingDown,
  DollarSign,
  HelpCircle,
  CheckCircle,
  Play
} from 'lucide-react';
import { CanvasData, BusinessModelExample } from './types';
import { CANVAS_BLOCKS, INITIAL_EMPTY_DATA, BUSINESS_MODEL_EXAMPLES, ONBOARDING_TIPS } from './data';
import ClipInno from './components/ClipInno';
import { generateSingleFileHTML } from './utils/exporter';

// Icon Map helper to resolve Lucide icons dynamically
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Handshake: Handshake,
  CheckSquare: CheckSquare,
  Key: Key,
  Award: Award,
  Heart: Heart,
  Compass: Compass,
  Users: Users,
  TrendingDown: TrendingDown,
  DollarSign: DollarSign,
};

export default function App() {
  const [canvasData, setCanvasData] = useState<CanvasData>(() => {
    const saved = localStorage.getItem('bmc_canvas_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing local storage canvas data', e);
      }
    }
    return INITIAL_EMPTY_DATA;
  });

  const [activeBlock, setActiveBlock] = useState<string | null>(null);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [selectedExample, setSelectedExample] = useState<string>('');
  const [validationMsg, setValidationMsg] = useState<{
    title: string;
    text: string;
    type: 'info' | 'success' | 'warning';
  } | null>(null);
  const [showExportToast, setShowExportToast] = useState(false);

  // Sync canvas data to local storage on changes
  useEffect(() => {
    localStorage.setItem('bmc_canvas_data', JSON.stringify(canvasData));
  }, [canvasData]);

  // Handle value editing in any of the blocks
  const handleValueChange = (blockId: keyof CanvasData, value: string) => {
    setCanvasData((prev) => ({
      ...prev,
      [blockId]: value,
    }));
  };

  // Load a pre-defined business model example
  const handleLoadExample = (exampleName: string) => {
    setSelectedExample(exampleName);
    const example = BUSINESS_MODEL_EXAMPLES.find((ex) => ex.name.toLowerCase() === exampleName.toLowerCase());
    if (example) {
      setCanvasData(example.data);
      setValidationMsg({
        title: `Ejemplo cargado: ${example.emoji} ${example.name}`,
        text: `He rellenado el lienzo para que analices un modelo de negocio real. ¡Explora cómo se conectan los 9 bloques lógicos de forma clara!`,
        type: 'success',
      });
    }
  };

  // Clear all fields on the canvas
  const handleClearCanvas = () => {
    if (
      window.confirm(
        '¿Estás seguro de que deseas borrar todo el contenido del lienzo? Se perderá el borrador actual.'
      )
    ) {
      setCanvasData(INITIAL_EMPTY_DATA);
      setSelectedExample('');
      setValidationMsg({
        title: 'Lienzo Limpio',
        text: '¡Lienzo totalmente despejado! Listo para plasmar tu próxima gran idea millonaria. ¡A escribir!',
        type: 'info',
      });
    }
  };

  // Run business validation based on filled textareas
  const handleValidateModel = () => {
    const blocks: (keyof CanvasData)[] = [
      'partners',
      'activities',
      'resources',
      'propositions',
      'relations',
      'channels',
      'segments',
      'costs',
      'revenues',
    ];
    const filled = blocks.filter((key) => canvasData[key]?.trim().length > 3);
    const count = filled.length;

    let title = '';
    let text = '';
    let type: 'info' | 'success' | 'warning' = 'info';

    if (count === 0) {
      title = '¡El Vacío Absoluto! 🌌';
      text =
        'Tu lienzo está completamente en blanco. ¡No te asustes por el primer borrador! Haz clic en cualquier recuadro y escribe unas ideas breves. ¡Yo te guío paso a paso!';
      type = 'warning';
    } else if (count < 4) {
      title = 'Pasos de Bebé 🍼';
      text = `Tienes ${count} de 9 bloques completados. ¡Excelente inicio! Para sentar bases fuertes, te sugiero rellenar hoy mismo la **Propuesta de Valor** y los **Segmentos de Clientes**. ¡Son el corazón del lienzo!`;
      type = 'info';
    } else if (count < 7) {
      title = 'Modelo en Construcción 🏗️';
      text = `¡Buen trabajo! Llevas ${count} secciones listas. Tip de negocio: Comprueba la coherencia. ¿Tus canales de entrega coinciden con tus segmentos? ¿Tus recursos clave son suficientes para tu propuesta de valor?`;
      type = 'info';
    } else if (count < 9) {
      title = '¡Casi Listo! 🚀';
      text = `¡Qué gran avance! Tienes ${count} bloques completos. Solo te faltan unas piezas para tener la visión estratégica completa de 360 grados. ¡Completa los campos restantes!`;
      type = 'success';
    } else {
      // Check logical consistency
      const hasCosts = canvasData.costs.trim().length > 5;
      const hasRevenues = canvasData.revenues.trim().length > 5;
      let warningDetail = '';

      if (hasCosts && hasRevenues) {
        const costLower = canvasData.costs.toLowerCase();
        const revLower = canvasData.revenues.toLowerCase();
        if (costLower.includes('gratis') && !revLower.includes('publicidad') && !revLower.includes('premium')) {
          warningDetail = ' Ojo: Ofreces servicios gratuitos, pero no especificas ingresos de soporte (como suscripciones, comisiones o publicidad). ¡Cuida el flujo de caja!';
        }
      }

      title = '¡Lienzo Completo! 🎉';
      text = `¡Espectacular! Has completado los 9 bloques esenciales del Business Model Canvas. Tienes una hipótesis completa lista para imprimir, debatir con tu equipo y salir a validar a la calle.${warningDetail}`;
      type = 'success';
    }

    setValidationMsg({ title, text, type });
  };

  // Load a completely funny/wild startup example
  const handleLoadRandomCrazyIdea = () => {
    const crazyIdeas = [
      {
        name: 'Tinder de Plantas Rebeldes 🌿',
        emoji: '🌱',
        data: {
          partners: '• Viveros locales con exceso de inventario botánico\n• Expertos botánicos independientes con sentido del humor\n• Proveedores de envases ecológicos reforzados',
          activities: '• Redacción de perfiles hilarantes de plantas rebeldes\n• Logística de reparto ultra-rápida segura a domicilio\n• Desarrollo y marketing de la app móvil',
          resources: '• Algoritmo de compatibilidad humana-botánica\n• Catálogo fotográfico inicial de plantas rebeldes\n• Marca registrada BotaniLove',
          propositions: '• Tinder para adoptar plantas de interior rebeldes con descripciones cómicas de su carácter e historial.',
          relations: '• Notificaciones graciosas push simulando que la planta te escribe ("¡Rígame o me mudo de casa!")',
          channels: '• Aplicación móvil con perfiles deslizables\n• Envíos locales rápidos por mensajería',
          segments: '• Millennials estresados y profesionales con culpabilidad de "padres de plantas" que quieren humor y compañía.',
          costs: '• Servidores web y base de datos\n• Campañas publicitarias online\n• Empaques térmicos acolchados para traslados\n• Salarios de redactores creativos',
          revenues: '• Suscripción Premium "SuperPlanta" (consultas con psicólogo botánico)\n• Comisión por cada adopción exitosa de planta\n• Tienda integrada de fertilizantes y macetas estéticas'
        }
      },
      {
        name: 'Netflix de Tacos Surprise 🌮',
        emoji: '🔥',
        data: {
          partners: '• Taquerías tradicionales locales de barrio de excelente calidad\n• Repartidores independientes exprés con mochilas térmicas\n• Redes de influencers amantes de la gastronomía urbana',
          activities: '• Curaduría de taquerías secretas y auditoría de higiene\n• Planeación de rutas óptimas de reparto caliente\n• Soporte al suscriptor y mantenimiento del software',
          resources: '• Algoritmo de tolerancia al picante y gustos de carne\n• Alianzas de exclusividad con taqueros estrella\n• Marca registrada Tacoflix',
          propositions: '• Suscripción de tacos sorpresa semanales curados por un algoritmo inteligente directo a tu hogar u oficina.',
          relations: '• Club exclusivo de "Taco-Catadores" con votaciones mensuales para premiar a la mejor taquería.',
          channels: '• Sitio web oficial (Tacoflix.com)\n• App móvil para configuración de nivel de picante\n• Campañas de publicidad muy visuales en Instagram',
          segments: '• Foodies y aficionados del taco de 18 a 45 años que odian perder tiempo decidiendo qué cenar los viernes.',
          costs: '• Compra garantizada de lotes de tacos a taqueros aliados\n• Logística de reparto premium ultra-rápida térmica\n• Gastos de pauta digital y hosting',
          revenues: '• Suscripción Taco Oro ($15/mes por 10 tacos semanales)\n• Suscripción Taco Platino ($25/mes por tacos ilimitados los viernes)\n• Comisiones por publicidad patrocinada de taquerías nuevas'
        }
      }
    ];

    const randomIdea = crazyIdeas[Math.floor(Math.random() * crazyIdeas.length)];
    setCanvasData(randomIdea.data);
    setSelectedExample(randomIdea.name);
    setValidationMsg({
      title: `Idea Loca: ${randomIdea.emoji} ${randomIdea.name}`,
      text: '¡Idea loca cargada con éxito! Analiza cómo conectamos propuestas disparatadas con un modelo lógico, viable y muy divertido. ¡Úsalo de inspiración!',
      type: 'success',
    });
  };

  // Programmatically trigger a single-file standalone HTML download
  const handleDownloadHTML = () => {
    const htmlString = generateSingleFileHTML(canvasData);
    const blob = new Blob([htmlString], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'lienzo-business-model-canvas.html');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Show beautiful custom toast
    setShowExportToast(true);
    setTimeout(() => {
      setShowExportToast(false);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-bg text-ink font-sans flex flex-col selection:bg-clay/20 selection:text-ink transition-colors duration-300">
      {/* Decorative top header line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-slate via-clay via-sand to-sage"></div>

      {/* TOP NOTIFICATION TOAST */}
      {showExportToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-ink border border-[#4E4B49] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-start gap-3.5 max-w-lg z-50 animate-bounce-slow">
          <div className="bg-sage p-1.5 rounded-lg text-white">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display font-bold text-sm text-sand">¡Lienzo Exportado con Éxito!</h4>
            <p className="text-xs text-[#E5E0D8] mt-1 leading-relaxed">
              Se ha descargado el archivo <strong>'lienzo-business-model-canvas.html'</strong>. Es un archivo autónomo completo que puedes abrir en cualquier navegador sin internet, manteniendo los consejos de Clip-Inno y la persistencia local.
            </p>
          </div>
          <button
            onClick={() => setShowExportToast(false)}
            className="text-slate hover:text-white text-xs font-bold pl-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* HEADER SECTION */}
      <header className="bg-white border-b border-[#E5E0D8] py-5 px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xs z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-clay/10 text-clay border border-clay/25 font-mono tracking-wider">
              INTERACTIVO
            </span>
            <span className="text-[10px] text-slate font-mono">Generador Ágil v1.5</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-display text-ink tracking-tight flex items-center gap-2">
            <LayoutGrid className="text-clay w-7 h-7" />
            Lienzo Business Model Canvas
          </h1>
          <p className="text-sm text-slate mt-0.5 max-w-xl">
            Diseña, valida y pivota tu modelo de negocio de forma lúdica y guiada junto a la mascota{' '}
            <strong>Clip-Inno</strong>.
          </p>
        </div>

        {/* HEADER CONTROL BUTTONS */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Preset selector */}
          <div className="relative inline-block text-left w-full sm:w-auto">
            <select
              value={selectedExample}
              onChange={(e) => handleLoadExample(e.target.value)}
              className="appearance-none bg-[#FAF9F6] hover:bg-[#F3EFE9] text-ink px-4 py-2.5 pr-10 rounded-xl text-sm font-medium border border-[#E5E0D8] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-clay w-full sm:w-auto"
            >
              <option value="">📂 Cargar ejemplo...</option>
              {BUSINESS_MODEL_EXAMPLES.map((ex) => (
                <option key={ex.name} value={ex.name.toLowerCase()}>
                  {ex.emoji} {ex.name} ({ex.description.slice(0, 15)}...)
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* Reset button */}
          <button
            onClick={handleClearCanvas}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate hover:text-clay hover:bg-clay/5 border border-[#E5E0D8] transition-all cursor-pointer w-full sm:w-auto"
            title="Limpiar todo el lienzo"
          >
            <Trash2 className="w-4 h-4" />
            <span>Limpiar</span>
          </button>

          {/* Export to Single-File HTML button */}
          <button
            onClick={handleDownloadHTML}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-clay hover:bg-clay/90 text-white shadow-sm hover:shadow-md transition-all cursor-pointer w-full sm:w-auto border border-[#9E6C53]"
            title="Descargar este lienzo interactivo como un único archivo HTML funcional"
          >
            <Download className="w-4 h-4" />
            <span>Descargar HTML Autónomo</span>
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT WRAPPER */}
      <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
        
        {/* 1. ONBOARDING (COLLAPSIBLE GUIDE PANEL) */}
        <section className="bg-white rounded-2xl border border-[#E5E0D8] shadow-xs overflow-hidden">
          {/* Onboarding Trigger Accordion Header */}
          <button
            onClick={() => setOnboardingOpen(!onboardingOpen)}
            className="w-full flex items-center justify-between p-5 bg-[#FDFDFB] text-left font-display font-semibold text-ink hover:bg-[#FAF9F6] transition-colors focus:outline-none cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#F6F3EB] rounded-xl text-sand border border-[#E5E0D8] shadow-2xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-ink">¿Nuevo en esto? Abre la Guía del Business Model Canvas (BMC)</h2>
                <p className="text-xs text-slate font-normal mt-0.5">Aprende qué es el lienzo y descubre 4 consejos clave para principiantes.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate">
              <span className="text-[10px] font-bold font-mono tracking-wider uppercase">
                {onboardingOpen ? 'Colapsar' : 'Expandir'}
              </span>
              {onboardingOpen ? (
                <ChevronUp className="w-5 h-5 transition-transform" />
              ) : (
                <ChevronDown className="w-5 h-5 transition-transform" />
              )}
            </div>
          </button>

          {/* Onboarding Content Panel */}
          {onboardingOpen && (
            <div className="p-5 md:p-6 border-t border-[#E5E0D8] bg-white animate-fade-in">
              <div className="flex flex-col gap-6">
                {/* General BMC explanation card */}
                <div className="bg-clay/5 rounded-xl p-4.5 border border-[#E5E0D8] flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="text-clay bg-white p-2.5 rounded-xl shadow-xs border border-[#E5E0D8]">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink">¿Qué es el Business Model Canvas?</h3>
                    <p className="text-xs text-slate mt-1 leading-relaxed">
                      El Business Model Canvas es una plantilla estratégica desarrollada por Alexander Osterwalder para modelar nuevos negocios o rediseñar existentes de forma ágil. En **un solo lienzo interactivo**, se analizan los 9 bloques lógicos de tu empresa agrupados en cuatro pilares de valor: **Infraestructura**, **Oferta**, **Mercado** y **Finanzas**. Permite a los emprendedores pivotar rápidamente sin redactar planes tradicionales de negocio obsoletos.
                    </p>
                  </div>
                </div>

                {/* Grid of 4 tips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {ONBOARDING_TIPS.map((tip, idx) => (
                    <div
                      key={tip.title}
                      className={`p-4 rounded-xl border hover:shadow-xs transition-all flex flex-col gap-2.5 ${
                        tip.color === 'rose'
                          ? 'border-sage/30 bg-sage/5'
                          : tip.color === 'amber'
                          ? 'border-sand/30 bg-sand/5'
                          : tip.color === 'indigo'
                          ? 'border-clay/30 bg-clay/5'
                          : 'border-slate/30 bg-slate/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold font-mono tracking-wider uppercase ${
                            tip.color === 'rose'
                              ? 'bg-[#EFF1F3] text-sage border border-[#E5E0D8]'
                              : tip.color === 'amber'
                              ? 'bg-[#F6F3EB] text-sand border border-[#E5E0D8]'
                              : tip.color === 'indigo'
                              ? 'bg-[#F7F0ED] text-clay border border-[#E5E0D8]'
                              : 'bg-[#EDF2EF] text-slate border border-[#E5E0D8]'
                          }`}
                        >
                          {tip.badge}
                        </span>
                        <span className="text-slate/60 text-xs font-mono font-bold">0{idx + 1}</span>
                      </div>
                      <h4 className="text-sm font-bold text-ink">{tip.title}</h4>
                      <p className="text-xs text-slate leading-relaxed">{tip.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 2. THE BUSINESS MODEL CANVAS INTERACTIVE GRID */}
        <div className="flex flex-col gap-3.5">
          {/* Pilar coloring guide map for users */}
          <div className="flex flex-wrap items-center gap-4 justify-between bg-white p-3 px-4 rounded-xl border border-[#E5E0D8] text-xs text-slate">
            <span className="font-semibold text-ink">Pilares de agrupación visual:</span>
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium text-ink">
                <span className="w-3.5 h-3.5 rounded-md bg-[#EDF2EF] border border-slate block shadow-inner"></span>
                Infraestructura (Interno)
              </span>
              <span className="flex items-center gap-1.5 font-medium text-ink">
                <span className="w-3.5 h-3.5 rounded-md bg-[#F7F0ED] border border-clay block shadow-inner"></span>
                Oferta (El Valor)
              </span>
              <span className="flex items-center gap-1.5 font-medium text-ink">
                <span className="w-3.5 h-3.5 rounded-md bg-[#EFF1F3] border border-sage block shadow-inner"></span>
                Mercado (Externo)
              </span>
              <span className="flex items-center gap-1.5 font-medium text-ink">
                <span className="w-3.5 h-3.5 rounded-md bg-[#F6F3EB] border border-sand block shadow-inner"></span>
                Viabilidad Financiera
              </span>
            </div>
          </div>

          {/* MAIN GRID - Classic Business Model Canvas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-10 md:grid-rows-2 gap-4">
            
            {/* SOCIOS CLAVE (KEY PARTNERS) - Col 1-2, Rows 1-2 */}
            <div className="md:col-span-2 md:row-span-2 bg-white rounded-xl border border-[#E5E0D8] hover:shadow-md transition-all p-4 flex flex-col gap-2 group block-infra focus-within:border-clay focus-within:ring-3 focus-within:ring-clay/10">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-ink text-sm md:text-base flex items-center gap-2">
                  <span className="text-slate p-1.5 rounded-lg bg-[#EDF2EF] group-hover:bg-[#e2eae6] transition-colors">
                    <Handshake className="w-4.5 h-4.5" />
                  </span>
                  Socios Clave
                </h3>
                <span className="text-[9px] font-bold font-mono tracking-wider bg-[#EDF2EF] text-slate px-1.5 py-0.5 rounded-full border border-[#E5E0D8]">INFRA</span>
              </div>
              <p className="text-[11px] text-slate leading-normal">
                {CANVAS_BLOCKS.find(b => b.id === 'partners')?.question}
              </p>
              <textarea
                value={canvasData.partners}
                onChange={(e) => handleValueChange('partners', e.target.value)}
                onFocus={() => setActiveBlock('partners')}
                onBlur={() => setActiveBlock(null)}
                placeholder={CANVAS_BLOCKS.find(b => b.id === 'partners')?.placeholder}
                className="flex-grow w-full h-44 md:h-full min-h-[140px] bg-transparent border-none text-xs leading-relaxed transition-all focus:outline-none focus:ring-0 text-ink font-sans resize-none mt-1.5 placeholder-neutral-400/70"
              ></textarea>
            </div>

            {/* ACTIVIDADES CLAVE (KEY ACTIVITIES) - Col 3-4, Row 1 */}
            <div className="md:col-span-2 md:row-span-1 bg-white rounded-xl border border-[#E5E0D8] hover:shadow-md transition-all p-4 flex flex-col gap-2 group block-infra focus-within:border-clay focus-within:ring-3 focus-within:ring-clay/10">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-ink text-sm md:text-base flex items-center gap-2">
                  <span className="text-slate p-1.5 rounded-lg bg-[#EDF2EF] group-hover:bg-[#e2eae6] transition-colors">
                    <CheckSquare className="w-4.5 h-4.5" />
                  </span>
                  Actividades Clave
                </h3>
                <span className="text-[9px] font-bold font-mono tracking-wider bg-[#EDF2EF] text-slate px-1.5 py-0.5 rounded-full border border-[#E5E0D8]">INFRA</span>
              </div>
              <p className="text-[11px] text-slate leading-normal">
                {CANVAS_BLOCKS.find(b => b.id === 'activities')?.question}
              </p>
              <textarea
                value={canvasData.activities}
                onChange={(e) => handleValueChange('activities', e.target.value)}
                onFocus={() => setActiveBlock('activities')}
                onBlur={() => setActiveBlock(null)}
                placeholder={CANVAS_BLOCKS.find(b => b.id === 'activities')?.placeholder}
                className="w-full h-36 md:h-28 bg-transparent border-none text-xs leading-relaxed transition-all focus:outline-none focus:ring-0 text-ink font-sans resize-none mt-1.5 placeholder-neutral-400/70"
              ></textarea>
            </div>

            {/* PROPUESTA DE VALOR (VALUE PROPOSITIONS) - Col 5-6, Rows 1-2 */}
            <div className="md:col-span-2 md:row-span-2 bg-white rounded-xl border border-[#E5E0D8] hover:shadow-md transition-all p-4 flex flex-col gap-2 group block-oferta focus-within:border-clay focus-within:ring-3 focus-within:ring-clay/10">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-ink text-sm md:text-base flex items-center gap-2">
                  <span className="text-clay p-1.5 rounded-lg bg-[#F7F0ED] group-hover:bg-[#efdfda] transition-colors">
                    <Award className="w-4.5 h-4.5" />
                  </span>
                  Propuesta de Valor
                </h3>
                <span className="text-[9px] font-bold font-mono tracking-wider bg-[#F7F0ED] text-clay px-1.5 py-0.5 rounded-full border border-[#E5E0D8]">OFERTA</span>
              </div>
              <p className="text-[11px] text-slate leading-normal">
                {CANVAS_BLOCKS.find(b => b.id === 'propositions')?.question}
              </p>
              <textarea
                value={canvasData.propositions}
                onChange={(e) => handleValueChange('propositions', e.target.value)}
                onFocus={() => setActiveBlock('propositions')}
                onBlur={() => setActiveBlock(null)}
                placeholder={CANVAS_BLOCKS.find(b => b.id === 'propositions')?.placeholder}
                className="flex-grow w-full h-44 md:h-full min-h-[140px] bg-transparent border-none text-xs leading-relaxed transition-all focus:outline-none focus:ring-0 text-ink font-sans resize-none mt-1.5 placeholder-neutral-400/70"
              ></textarea>
            </div>

            {/* RELACIÓN CON CLIENTES (CUSTOMER RELATIONSHIPS) - Col 7-8, Row 1 */}
            <div className="md:col-span-2 md:row-span-1 bg-white rounded-xl border border-[#E5E0D8] hover:shadow-md transition-all p-4 flex flex-col gap-2 group block-mercado focus-within:border-clay focus-within:ring-3 focus-within:ring-clay/10">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-ink text-sm md:text-base flex items-center gap-2">
                  <span className="text-sage p-1.5 rounded-lg bg-[#EFF1F3] group-hover:bg-[#e2e6e9] transition-colors">
                    <Heart className="w-4.5 h-4.5" />
                  </span>
                  Relación Clientes
                </h3>
                <span className="text-[9px] font-bold font-mono tracking-wider bg-[#EFF1F3] text-sage px-1.5 py-0.5 rounded-full border border-[#E5E0D8]">MERCADO</span>
              </div>
              <p className="text-[11px] text-slate leading-normal">
                {CANVAS_BLOCKS.find(b => b.id === 'relations')?.question}
              </p>
              <textarea
                value={canvasData.relations}
                onChange={(e) => handleValueChange('relations', e.target.value)}
                onFocus={() => setActiveBlock('relations')}
                onBlur={() => setActiveBlock(null)}
                placeholder={CANVAS_BLOCKS.find(b => b.id === 'relations')?.placeholder}
                className="w-full h-36 md:h-28 bg-transparent border-none text-xs leading-relaxed transition-all focus:outline-none focus:ring-0 text-ink font-sans resize-none mt-1.5 placeholder-neutral-400/70"
              ></textarea>
            </div>

            {/* SEGMENTOS DE CLIENTES (CUSTOMER SEGMENTS) - Col 9-10, Rows 1-2 */}
            <div className="md:col-span-2 md:row-span-2 bg-white rounded-xl border border-[#E5E0D8] hover:shadow-md transition-all p-4 flex flex-col gap-2 group block-mercado focus-within:border-clay focus-within:ring-3 focus-within:ring-clay/10">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-ink text-sm md:text-base flex items-center gap-2">
                  <span className="text-sage p-1.5 rounded-lg bg-[#EFF1F3] group-hover:bg-[#e2e6e9] transition-colors">
                    <Users className="w-4.5 h-4.5" />
                  </span>
                  Segmentos Clientes
                </h3>
                <span className="text-[9px] font-bold font-mono tracking-wider bg-[#EFF1F3] text-sage px-1.5 py-0.5 rounded-full border border-[#E5E0D8]">MERCADO</span>
              </div>
              <p className="text-[11px] text-slate leading-normal">
                {CANVAS_BLOCKS.find(b => b.id === 'segments')?.question}
              </p>
              <textarea
                value={canvasData.segments}
                onChange={(e) => handleValueChange('segments', e.target.value)}
                onFocus={() => setActiveBlock('segments')}
                onBlur={() => setActiveBlock(null)}
                placeholder={CANVAS_BLOCKS.find(b => b.id === 'segments')?.placeholder}
                className="flex-grow w-full h-44 md:h-full min-h-[140px] bg-transparent border-none text-xs leading-relaxed transition-all focus:outline-none focus:ring-0 text-ink font-sans resize-none mt-1.5 placeholder-neutral-400/70"
              ></textarea>
            </div>

            {/* RECURSOS CLAVE (KEY RESOURCES) - Col 3-4, Row 2 */}
            <div className="md:col-span-2 md:row-span-1 bg-white rounded-xl border border-[#E5E0D8] hover:shadow-md transition-all p-4 flex flex-col gap-2 group block-infra focus-within:border-clay focus-within:ring-3 focus-within:ring-clay/10">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-ink text-sm md:text-base flex items-center gap-2">
                  <span className="text-slate p-1.5 rounded-lg bg-[#EDF2EF] group-hover:bg-[#e2eae6] transition-colors">
                    <Key className="w-4.5 h-4.5" />
                  </span>
                  Recursos Clave
                </h3>
                <span className="text-[9px] font-bold font-mono tracking-wider bg-[#EDF2EF] text-slate px-1.5 py-0.5 rounded-full border border-[#E5E0D8]">INFRA</span>
              </div>
              <p className="text-[11px] text-slate leading-normal">
                {CANVAS_BLOCKS.find(b => b.id === 'resources')?.question}
              </p>
              <textarea
                value={canvasData.resources}
                onChange={(e) => handleValueChange('resources', e.target.value)}
                onFocus={() => setActiveBlock('resources')}
                onBlur={() => setActiveBlock(null)}
                placeholder={CANVAS_BLOCKS.find(b => b.id === 'resources')?.placeholder}
                className="w-full h-36 md:h-28 bg-transparent border-none text-xs leading-relaxed transition-all focus:outline-none focus:ring-0 text-ink font-sans resize-none mt-1.5 placeholder-neutral-400/70"
              ></textarea>
            </div>

            {/* CANALES (CHANNELS) - Col 7-8, Row 2 */}
            <div className="md:col-span-2 md:row-span-1 bg-white rounded-xl border border-[#E5E0D8] hover:shadow-md transition-all p-4 flex flex-col gap-2 group block-mercado focus-within:border-clay focus-within:ring-3 focus-within:ring-clay/10">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-ink text-sm md:text-base flex items-center gap-2">
                  <span className="text-sage p-1.5 rounded-lg bg-[#EFF1F3] group-hover:bg-[#e2e6e9] transition-colors">
                    <Compass className="w-4.5 h-4.5" />
                  </span>
                  Canales
                </h3>
                <span className="text-[9px] font-bold font-mono tracking-wider bg-[#EFF1F3] text-sage px-1.5 py-0.5 rounded-full border border-[#E5E0D8]">MERCADO</span>
              </div>
              <p className="text-[11px] text-slate leading-normal">
                {CANVAS_BLOCKS.find(b => b.id === 'channels')?.question}
              </p>
              <textarea
                value={canvasData.channels}
                onChange={(e) => handleValueChange('channels', e.target.value)}
                onFocus={() => setActiveBlock('channels')}
                onBlur={() => setActiveBlock(null)}
                placeholder={CANVAS_BLOCKS.find(b => b.id === 'channels')?.placeholder}
                className="w-full h-36 md:h-28 bg-transparent border-none text-xs leading-relaxed transition-all focus:outline-none focus:ring-0 text-ink font-sans resize-none mt-1.5 placeholder-neutral-400/70"
              ></textarea>
            </div>

          </div>

          {/* LOWER ROW (FINANCES) - Spans all width, split into 2 massive columns of width 50% */}
          <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
            
            {/* ESTRUCTURA DE COSTOS (COST STRUCTURE) */}
            <div className="md:col-span-5 bg-white rounded-xl border border-[#E5E0D8] hover:shadow-md transition-all p-4 flex flex-col gap-2 group block-finanzas focus-within:border-clay focus-within:ring-3 focus-within:ring-clay/10">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-ink text-sm md:text-base flex items-center gap-2">
                  <span className="text-sand p-1.5 rounded-lg bg-[#F6F3EB] group-hover:bg-[#efebe1] transition-colors">
                    <TrendingDown className="w-4.5 h-4.5" />
                  </span>
                  Estructura de Costos y Gastos
                </h3>
                <span className="text-[9px] font-bold font-mono tracking-wider bg-[#F6F3EB] text-sand px-1.5 py-0.5 rounded-full border border-[#E5E0D8]">FINANZAS</span>
              </div>
              <p className="text-[11px] text-slate leading-normal">
                {CANVAS_BLOCKS.find(b => b.id === 'costs')?.question}
              </p>
              <textarea
                value={canvasData.costs}
                onChange={(e) => handleValueChange('costs', e.target.value)}
                onFocus={() => setActiveBlock('costs')}
                onBlur={() => setActiveBlock(null)}
                placeholder={CANVAS_BLOCKS.find(b => b.id === 'costs')?.placeholder}
                className="w-full h-32 bg-transparent border-none text-xs leading-relaxed transition-all focus:outline-none focus:ring-0 text-ink font-sans resize-none mt-1.5 placeholder-neutral-400/70"
              ></textarea>
            </div>

            {/* FUENTES DE INGRESOS (REVENUE STREAMS) */}
            <div className="md:col-span-5 bg-white rounded-xl border border-[#E5E0D8] hover:shadow-md transition-all p-4 flex flex-col gap-2 group block-finanzas focus-within:border-clay focus-within:ring-3 focus-within:ring-clay/10">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-ink text-sm md:text-base flex items-center gap-2">
                  <span className="text-sand p-1.5 rounded-lg bg-[#F6F3EB] group-hover:bg-[#efebe1] transition-colors">
                    <DollarSign className="w-4.5 h-4.5" />
                  </span>
                  Fuentes de Ingresos (y Egresos)
                </h3>
                <span className="text-[9px] font-bold font-mono tracking-wider bg-[#F6F3EB] text-sand px-1.5 py-0.5 rounded-full border border-[#E5E0D8]">FINANZAS</span>
              </div>
              <p className="text-[11px] text-slate leading-normal">
                {CANVAS_BLOCKS.find(b => b.id === 'revenues')?.question}
              </p>
              <textarea
                value={canvasData.revenues}
                onChange={(e) => handleValueChange('revenues', e.target.value)}
                onFocus={() => setActiveBlock('revenues')}
                onBlur={() => setActiveBlock(null)}
                placeholder={CANVAS_BLOCKS.find(b => b.id === 'revenues')?.placeholder}
                className="w-full h-32 bg-transparent border-none text-xs leading-relaxed transition-all focus:outline-none focus:ring-0 text-ink font-sans resize-none mt-1.5 placeholder-neutral-400/70"
              ></textarea>
            </div>

          </div>
        </div>

        {/* INFORMATIVE EXPLANATION NOTE AT BOT */}
        <div className="bg-white border border-[#E5E0D8] p-4.5 rounded-2xl flex items-start gap-3 mt-4 text-xs text-slate leading-relaxed">
          <FileText className="w-5 h-5 text-clay mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-ink">💡 Tip de Impresión / Guardado en PDF:</p>
            <p className="mt-1">
              Al hacer clic en <strong>Guardar PDF</strong> o pulsar <kbd className="bg-[#FAF9F6] border border-[#E5E0D8] px-1.5 py-0.5 rounded text-[10px] font-bold">Ctrl+P</kbd> / <kbd className="bg-[#FAF9F6] border border-[#E5E0D8] px-1.5 py-0.5 rounded text-[10px] font-bold">Cmd+P</kbd>, la hoja se formateará automáticamente para esconder los menús, controles y la mascota flotante. El lienzo completo se acomodará de forma óptima en una sola página A4 horizontal de forma limpia y profesional para tus reuniones de pitch.
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#E5E0D8] py-6 text-center text-xs text-slate mt-12">
        <p>
          Lienzo del Business Model Canvas • Creado para Nuevos Emprendedores con amor y sentido ágil. © 2026.
        </p>
      </footer>

      {/* 3. FLOATING MASCOT: CLIP-INNO */}
      <ClipInno
        activeBlock={activeBlock}
        canvasData={canvasData}
        onLoadCrazyIdea={handleLoadRandomCrazyIdea}
        onValidate={handleValidateModel}
        validationMessage={validationMsg}
      />
    </div>
  );
}
