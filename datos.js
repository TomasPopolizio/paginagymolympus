// ============================================================
//  DATOS EDITABLES — cambiá precios y horarios acá
// ============================================================

const WHATSAPP = '5491154233041';

// Cada pestaña tiene uno o más grupos. "otro" = precio con otros medios de pago.
const PRECIOS = {
  aclaracion: 'Precios vigentes desde agosto. EF = pago en efectivo.',
  categorias: [
    {
      tab: 'Musculación',
      grupos: [{
        titulo: 'Musculación',
        items: [
          { plan: 'Pase diario', efectivo: '$9.000' },
          { plan: 'Mensual', efectivo: '$55.000', otro: '$60.000' },
          { plan: 'Trimestral', efectivo: '$150.000', otro: '$155.000' },
        ],
      }],
    },
    {
      tab: 'Clases',
      grupos: [{
        titulo: 'Clases · mensual',
        items: [
          { plan: 'Funcional', efectivo: '$48.000', otro: '$53.000' },
          { plan: 'Boxeo', efectivo: '$48.000', otro: '$53.000' },
          { plan: 'GAP', nota: 'Glúteos, abdomen y piernas', efectivo: '$50.000', otro: '$55.000' },
          { plan: 'CrossFit libre', efectivo: '$52.000', otro: '$57.000' },
        ],
      }, {
        titulo: 'Bungee',
        items: [
          { plan: '4 clases', nota: '1 vez por semana', efectivo: '$40.000' },
          { plan: '8 clases', nota: '2 veces por semana', efectivo: '$42.800' },
          { plan: '12 clases', nota: '3 veces por semana', efectivo: '$59.000' },
        ],
      }],
    },
    {
      tab: 'CrossFit',
      grupos: [{
        titulo: 'CrossFit',
        items: [
          { plan: 'Libre', efectivo: '$52.000', otro: '$57.000' },
          { plan: '12 clases', nota: '3 veces por semana', efectivo: '$48.000', otro: '$53.000' },
          { plan: '8 clases', nota: '2 veces por semana', efectivo: '$46.000', otro: '$51.000' },
        ],
      }],
    },
    {
      tab: 'Combos',
      grupos: [{
        titulo: 'Clase + musculación libre',
        items: [
          { plan: 'Funcional', efectivo: '$79.000', otro: '$84.000' },
          { plan: 'Boxeo', efectivo: '$79.000', otro: '$84.000' },
          { plan: 'GAP', efectivo: '$79.000', otro: '$84.000' },
          { plan: 'CrossFit', efectivo: '$80.000', otro: '$85.000' },
        ],
      }, {
        titulo: 'Bungee + musculación libre',
        items: [
          { plan: '4 clases', efectivo: '$75.000', otro: '$80.000' },
          { plan: '8 clases', efectivo: '$80.000', otro: '$85.000' },
          { plan: '12 clases', efectivo: '$85.000', otro: '$90.000' },
        ],
      }, {
        titulo: 'Bungee + GAP',
        items: [
          { plan: '4 clases', efectivo: '$75.000', otro: '$80.000' },
          { plan: '8 clases', efectivo: '$80.000', otro: '$85.000' },
          { plan: '12 clases', efectivo: '$85.000', otro: '$90.000' },
        ],
      }],
    },
  ],
};

// Horario: [hora, actividad]
const CRONOGRAMA = {
  clases: {
    Lunes:     [['08', 'GAP'], ['17', 'Bungee']],
    Martes:    [['10', 'Bungee'], ['16', 'Boxeo recreativo'], ['17', 'Bungee'], ['19', 'Funcional'], ['20', 'Boxeo recreativo']],
    Miércoles: [['08', 'GAP']],
    Jueves:    [['10', 'Bungee'], ['16', 'Boxeo recreativo'], ['17', 'Bungee'], ['19', 'Funcional'], ['20', 'Boxeo recreativo']],
    Viernes:   [['08', 'GAP'], ['17', 'Bungee']],
    Sábado:    [['09', 'Bungee'], ['10', 'Bungee']],
  },
  crossfit: {
    Lunes:     [['09', 'CrossFit'], ['18', 'CrossFit'], ['19', 'CrossFit'], ['20', 'CrossFit']],
    Martes:    [['09', 'CrossFit'], ['18', 'CrossFit']],
    Miércoles: [['09', 'CrossFit'], ['18', 'CrossFit'], ['19', 'CrossFit'], ['20', 'CrossFit']],
    Jueves:    [['09', 'CrossFit'], ['18', 'CrossFit']],
    Viernes:   [['09', 'CrossFit'], ['18', 'CrossFit'], ['19', 'CrossFit'], ['20', 'CrossFit']],
    Sábado:    [['11', 'CrossFit']],
  },
};
