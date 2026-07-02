import { CanvasBlock, BusinessModelExample, CanvasData } from './types';

export const CANVAS_BLOCKS: CanvasBlock[] = [
  {
    id: 'partners',
    title: 'Socios Clave',
    pilar: 'infraestructura',
    icon: 'Handshake',
    question: '¿Quiénes son tus socios estratégicos y proveedores indispensables para funcionar?',
    placeholder: 'Ej. Agricultores locales de comercio justo, fabricantes de empaques biodegradables, servicios de entrega rápida...',
    tips: [
      "¿Quién te provee lo que tú no puedes producir? ¡Elige socios que compartan tus valores!",
      "No lo hagas todo tú solo. Delegar o aliarse con expertos te permite escalar más rápido y concentrarte en tu magia.",
      "Un buen socio clave reduce tus riesgos y te ayuda a optimizar tus costos iniciales."
    ]
  },
  {
    id: 'activities',
    title: 'Actividades Clave',
    pilar: 'infraestructura',
    icon: 'CheckSquare',
    question: '¿Qué acciones diarias y críticas requiere tu propuesta de valor para ser entregada?',
    placeholder: 'Ej. Tostado diario del grano, diseño de recetas exclusivas, mantenimiento de la web, marketing digital...',
    tips: [
      "¿Cuáles son las tareas críticas diarias? Diferencia las actividades de soporte de las verdaderamente estratégicas.",
      "¡El marketing digital y las ventas son el corazón! No asumas que los clientes llegarán por arte de magia.",
      "Mantén las actividades clave enfocadas en lo que hace único tu producto."
    ]
  },
  {
    id: 'resources',
    title: 'Recursos Clave',
    pilar: 'infraestructura',
    icon: 'Key',
    question: '¿Qué activos físicos, intelectuales, humanos o financieros son obligatorios?',
    placeholder: 'Ej. Máquina de espresso industrial, patente del algoritmo de recomendación, barista certificado, capital inicial...',
    tips: [
      "¿Qué recursos son indispensables? No te sobre-equipes al inicio; empieza ligero de equipaje.",
      "Tus recursos clave pueden ser intelectuales (una marca, software propio) o humanos (un diseñador estrella).",
      "Pregúntate: si este recurso desaparece mañana, ¿el negocio sigue en pie? Si no, ¡es clave!"
    ]
  },
  {
    id: 'propositions',
    title: 'Propuesta de Valor',
    pilar: 'oferta',
    icon: 'Award',
    question: '¿Qué valor único entregas? ¿Qué problema real resuelves mejor que cualquiera?',
    placeholder: 'Ej. Café premium personalizado al gusto del cliente con tostado artesanal fresco de 24 horas, apoyando directamente al caficultor...',
    tips: [
      "¿Qué problema le resuelves a tu cliente de forma única? 'Ser barato' no es una propuesta sostenible a largo plazo.",
      "Define tu factor 'WOW'. ¿Por qué te elegirían a ti en lugar de a la competencia de siempre?",
      "No vendes un producto, vendes una emoción o solución. ¡No vendes café, vendes energía y estatus!"
    ]
  },
  {
    id: 'relations',
    title: 'Relación con Clientes',
    pilar: 'mercado',
    icon: 'Heart',
    question: '¿Cómo interactúas, conectas, retienes y enamoras a tus clientes?',
    placeholder: 'Ej. Trato hiper-personalizado en barra, comunidad online interactiva, boletín semanal con tips de preparación...',
    tips: [
      "Atraer un cliente cuesta 5 veces más que mantener uno. ¿Cómo vas a enamorarlos para que regresen?",
      "Define tu tono de voz: ¿serás formal e institucional, o divertido, amigable y empático como yo?",
      "La automatización es eficiente, pero la personalización genera lealtad indestructible."
    ]
  },
  {
    id: 'channels',
    title: 'Canales',
    pilar: 'mercado',
    icon: 'Compass',
    question: '¿A través de qué medios conocen, compran y reciben tu propuesta de valor?',
    placeholder: 'Ej. Tienda física en centro comercial, aplicación móvil propia, envíos a domicilio exprés por mensajería...',
    tips: [
      "¿Cómo te descubren y cómo compran? Traza la ruta del cliente desde el anuncio hasta el servicio post-venta.",
      "Sé eficiente. No necesitas estar en todas las redes sociales si tu cliente ideal solo lee newsletters por correo.",
      "Prueba canales directos (tu propia web) e indirectos (distribuidores) para ver cuál rinde mejor."
    ]
  },
  {
    id: 'segments',
    title: 'Segmentos de Clientes',
    pilar: 'mercado',
    icon: 'Users',
    question: '¿Para quién creas valor? ¿Quiénes son tus clientes o usuarios más importantes?',
    placeholder: 'Ej. Profesionales amantes de la gastronomía premium (25-45 años), oficinas corporativas que valoran el bienestar de su staff...',
    tips: [
      "¿Para quién creas valor realmente? ¡No me digas que 'para todo el mundo'! El que le vende a todos no le vende a nadie.",
      "Describe a tu cliente ideal como una persona real: edad, hábitos, frustraciones y metas diarias.",
      "Identifica si tu negocio es B2C (consumidor final) o B2B (empresas). ¡Tienen motivaciones muy diferentes!"
    ]
  },
  {
    id: 'costs',
    title: 'Estructura de Costos',
    pilar: 'finanzas',
    icon: 'TrendingDown',
    question: '¿Cuáles son los costos fijos y variables indispensables para operar el modelo?',
    placeholder: 'Ej. Alquiler mensual del local, adquisición de materia prima, salarios del personal, inversión mensual en pauta digital...',
    tips: [
      "¡Mucho ojo con la caja! Separa tus costos fijos (alquiler, nómina) de los variables (comisiones, insumos por unidad).",
      "Pregúntate qué actividades o recursos consumen más presupuesto y si hay formas ingeniosas de optimizarlos.",
      "El objetivo de una startup es validar rápido gastando lo mínimo posible. ¡Mantén tus costos ligeros!"
    ]
  },
  {
    id: 'revenues',
    title: 'Fuentes de Ingresos',
    pilar: 'finanzas',
    icon: 'DollarSign',
    question: '¿Cómo genera dinero tu negocio? ¿Cómo y cuánto prefieren pagar tus clientes?',
    placeholder: 'Ej. Venta unitaria de productos, suscripción mensual de café en grano, talleres y cursos presenciales los fines de semana...',
    tips: [
      "¿Por qué valor están dispuestos a pagar tus clientes actualmente? Ofrece métodos de pago sencillos y adaptados.",
      "Diversifica tus ingresos. Explora suscripciones mensuales, licencias, publicidad o ventas de única vez.",
      "Calcula bien tus márgenes. Asegúrate de que el precio de venta cubra holgadamente tus costos operativos."
    ]
  }
];

export const INITIAL_EMPTY_DATA: CanvasData = {
  partners: '',
  activities: '',
  resources: '',
  propositions: '',
  relations: '',
  channels: '',
  segments: '',
  costs: '',
  revenues: ''
};

export const BUSINESS_MODEL_EXAMPLES: BusinessModelExample[] = [
  {
    name: 'Netflix',
    description: 'De alquilar DVD por correo a liderar la industria de entretenimiento digital en streaming bajo suscripción.',
    emoji: '🍿',
    data: {
      partners: '• Estudios cinematográficos y productoras de contenido\n• Proveedores de infraestructura cloud (AWS)\n• Fabricantes de Smart TVs, consolas y dispositivos móviles\n• Empresas de telecomunicaciones (bundles de internet)',
      activities: '• Desarrollo y optimización de la plataforma web/app\n• Producción de contenido original (Netflix Originals)\n• Algoritmo de recomendación personalizado e IA\n• Marketing y adquisición de licencias',
      resources: '• Catálogo de películas y series\n• Algoritmos propios y patentes tecnológicas\n• Marca Netflix global\n• Staff de ingeniería de software y producción de cine',
      propositions: '• Acceso ilimitado a miles de películas y series sin anuncios\n• Recomendaciones ultra-precisas basadas en tus gustos\n• Reproducción instantánea en múltiples pantallas con alta resolución\n• Contenido exclusivo de alta calidad producido en casa',
      relations: '• Servicio automatizado y personalizado por perfiles\n• Autogestión intuitiva del plan de suscripción\n• Interacción social en redes y eventos promocionales',
      channels: '• Sitio web oficial (Netflix.com)\n• Aplicación nativa en iOS, Android, Smart TVs y consolas\n• Alianzas de facturación con operadores de telefonía móvil',
      segments: '• Personas de 12 a 65+ años que buscan entretenimiento bajo demanda\n• Familias que quieren contenido diverso en un solo plan\n• Amantes del cine y maratones de series de televisión',
      costs: '• Costo milmillonario de producción de contenido original\n• Licenciamiento de películas de terceros\n• Infraestructura de streaming y ancho de banda global\n• Marketing internacional y salarios de ingeniería',
      revenues: '• Planes de suscripción mensual escalonados (Básico, Estándar, Premium)\n• Plan económico con publicidad integrada\n• Licenciamiento ocasional de producciones propias a terceros'
    }
  },
  {
    name: 'Uber',
    description: 'Conectando pasajeros con conductores independientes mediante una aplicación que eliminó la fricción del transporte urbano.',
    emoji: '🚗',
    data: {
      partners: '• Conductores independientes con vehículos propios\n• Proveedores de mapas y geolocalización (Google Maps)\n• Pasarelas de pago seguro (Stripe, PayPal, bancos)\n• Inversionistas y aseguradoras de transporte',
      activities: '• Desarrollo continuo de la app y algoritmos de asignación\n• Marketing para atraer tanto a pasajeros como a conductores\n• Atención al cliente, resolución de disputas y seguridad\n• Cumplimiento regulatorio local',
      resources: '• Plataforma tecnológica y patentes de tarifas dinámicas\n• Base de datos masiva de usuarios y conductores verificados\n• Marca Uber posicionada a nivel global\n• Capital financiero para expansión',
      propositions: '• Pasajeros: Viajes rápidos, seguros, con precio conocido de antemano y pago automatizado sin efectivo\n• Conductores: Horarios 100% flexibles, generación de ingresos adicionales usando su propio auto',
      relations: '• Sistema de calificación bidireccional (estrella de conductor/pasajero)\n• Soporte al usuario y conductor dentro de la app\n• Comunicación de promociones y tarifas especiales vía notificaciones',
      channels: '• Aplicación móvil de Uber (iOS y Android)\n• Campañas publicitarias en redes sociales y buscadores\n• Programas de referidos de boca en boca',
      segments: '• Pasajeros: Personas en ciudades que buscan transportarse sin manejar ni buscar estacionamiento\n• Conductores: Personas con auto que buscan un empleo flexible o ingresos extra',
      costs: '• Mantenimiento y desarrollo de la infraestructura tecnológica\n• Campañas de marketing y bonos de captación de conductores\n• Seguros de responsabilidad civil y soporte al cliente\n• Gastos legales e impuestos locales',
      revenues: '• Comisión de intermediación (habitualmente entre el 20% y 25% de cada viaje)\n• Tarifas de cancelación de viajes\n• Suscripción Uber One (entregas gratis y descuentos en viajes)'
    }
  },
  {
    name: 'Café de Especialidad',
    description: 'Una cafetería local de alta gama enfocada en la trazabilidad del grano, el tostado artesanal y la experiencia del cliente.',
    emoji: '☕',
    data: {
      partners: '• Pequeños caficultores locales de comercio justo\n• Diseñadores de empaques biodegradables personalizados\n• Proveedores de equipo de barismo premium (La Marzocco)\n• Pastelerías artesanales y panaderías locales',
      activities: '• Selección de granos de café verde y tostado artesanal propio\n• Preparación experta de bebidas por baristas entrenados\n• Organización de talleres de cata y eventos de café\n• Mantenimiento de una atmósfera acogedora e higiénica',
      resources: '• Granos de café de origen único con excelente puntuación de taza\n• Máquina de espresso italiana de alta gama\n• Baristas expertos certificados con pasión por el servicio\n• Ubicación física estratégica con diseño estético premium',
      propositions: '• Café recién tostado con perfiles de sabor únicos y trazables\n• Una experiencia educativa: baristas que te explican el origen y proceso del café\n• Un espacio de coworking relajante, con luz natural, buena música y Wi-Fi de alta velocidad\n• Panadería artesanal fresca seleccionada para maridar con el café',
      relations: '• Trato amigable y ultra-personalizado (reconocimiento de clientes frecuentes)\n• Programas de fidelidad digitales (ej. décimo café gratis)\n• Educación interactiva en barra y recomendaciones personalizadas',
      channels: '• Local físico moderno y acogedor (barra de café)\n• Redes sociales visuales (Instagram para mostrar estética y talleres)\n• Página web sencilla para venta de café en grano a domicilio',
      segments: '• Amantes y aficionados del café gourmet y baristas aficionados\n• Profesionales remotos y creativos que buscan un tercer espacio para trabajar\n• Vecinos de la zona residencial de nivel socioeconómico medio-alto',
      costs: '• Alquiler del local comercial en zona de alta afluencia\n• Compra directa de café verde de alta calidad\n• Salarios competitivos para baristas expertos\n• Insumos ecológicos, pastelería fresca y servicios básicos',
      revenues: '• Venta directa de bebidas calientes y frías en barra\n• Venta de café en grano o molido para llevar (empaquetado)\n• Repostería, panadería artesanal y sándwiches gourmet\n• Entradas a talleres de cata de café y eventos especiales'
    }
  },
  {
    name: 'PetHaven ("Airbnb para Mascotas")',
    description: 'Plataforma digital que conecta a dueños de mascotas con cuidadores locales validados que ofrecen alojamiento familiar sin jaulas.',
    emoji: '🐶',
    data: {
      partners: '• Cuidadores de mascotas locales independientes validados\n• Clínicas veterinarias con atención 24/7 de emergencia\n• Compañías de seguros de accidentes para mascotas\n• Tiendas de alimento y accesorios para mascotas',
      activities: '• Validación exhaustiva de antecedentes y hogares de cuidadores\n• Soporte al cliente 24/7 y cobertura veterinaria durante reservas\n• Desarrollo y mantenimiento de la plataforma web y móvil\n• Marketing digital enfocado en confianza y amor animal',
      resources: '• Algoritmo de emparejamiento por cercanía, reputación y tipo de mascota\n• Base de datos de cuidadores con perfiles verificados y reseñas\n• Marca confiable PetHaven\n• Cobertura de garantía de seguridad veterinaria de emergencia',
      propositions: '• Dueños de mascotas: Cuidado hogareño cariñoso, sin jaulas, con fotos diarias y seguro veterinario incluido ante emergencias\n• Cuidadores: Generar ingresos extras cuidando perros/gatos en casa haciendo su propio horario',
      relations: '• Comunidad de confianza basada en calificaciones y reseñas verificadas\n• Reportes diarios automatizados (fotos, videos, paseos GPS) al dueño\n• Soporte de emergencia telefónico humanizado disponible 24/7',
      channels: '• Aplicación móvil (iOS/Android) y sitio web interactivo\n• Redes sociales (historias emotivas de mascotas felices, memes de perros)\n• Alianzas con veterinarios locales y estéticas caninas',
      segments: '• Dueños de mascotas (perros/gatos) que viajan con frecuencia y odian los hoteles de mascotas fríos y enjaulados\n• Amantes de los animales con tiempo libre y espacio en casa que quieren ingresos extra',
      costs: '• Desarrollo de la plataforma y hosting de servidores seguros\n• Cobertura de la póliza de seguros y reembolsos veterinarios\n• Marketing online enfocado en coste de adquisición (CAC)\n• Salarios de soporte, validadores de cuidadores y desarrollo',
      revenues: '• Comisión de servicio cobrada al dueño de la mascota (15% del total)\n• Comisión de plataforma cobrada al cuidador (10% de sus ganancias)\n• Suscripción premium para cuidadores (mayor visibilidad y badge destacado)'
    }
  }
];

export const ONBOARDING_TIPS = [
  {
    title: "Empieza por el cliente",
    description: "Un modelo de negocio solo tiene sentido si resuelve un dolor real para un grupo específico de personas. ¡No crees soluciones buscando problemas!",
    badge: "Cliente Primero",
    color: "rose"
  },
  {
    title: "Sé breve e interactivo",
    description: "No escribas testamentos. Usa viñetas cortas, directas y memorables. El lienzo debe poder leerse y comprenderse en menos de 5 minutos.",
    badge: "Claridad",
    color: "amber"
  },
  {
    title: "No busques la perfección",
    description: "El primer borrador siempre es malo, y eso está bien. El BMC es un lienzo vivo diseñado para tachar, corregir, tirar a la basura y empezar de nuevo.",
    badge: "Agilidad",
    color: "indigo"
  },
  {
    title: "Mantén la coherencia",
    description: "Todo debe conectar. Tus canales deben llegar a tus segmentos de clientes, y tus actividades clave deben respaldar directamente tu propuesta de valor.",
    badge: "Coherencia",
    color: "emerald"
  }
];
