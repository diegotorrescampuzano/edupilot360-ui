// src/_nav.js
// Sidebar navigation configuration for the EduPilot360 admin panel.
// Labels are presented in Spanish for Spanish-speaking users.
// All route paths (to) use English for maintainability and scalability.

export default [
  // Main dashboard link.
  { 
    component: 'CNavItem', 
    name: 'Dashboard', 
    to: '/home', 
    icon: 'cil-speedometer' 
  },

  // Teachers section.
  { component: 'CNavTitle', name: 'Profesores' },
  {
    component: 'CNavGroup',
    name: 'Gestión de Profesores',
    icon: 'cil-user',
    items: [
      { component: 'CNavItem', name: 'Listado', to: '/profesores/listado' },
      { component: 'CNavItem', name: 'Cargar Notas', to: '/profesores/notas' },
    ],
  },

  // Students section.
  { component: 'CNavTitle', name: 'Estudiantes' },
  {
    component: 'CNavGroup',
    name: 'Gestión de Estudiantes',
    icon: 'cil-people',
    items: [
      { component: 'CNavItem', name: 'Listado', to: '/estudiantes/listado' },
      { component: 'CNavItem', name: 'Movimientos', to: '/estudiantes/movimientos' },
    ],
  },

  // Security management section – all administration options grouped by functionality.
  { component: 'CNavTitle', name: 'Gestión de Seguridad' },
  {
    component: 'CNavGroup',
    name: 'Gestión de Seguridad',
    icon: 'cil-shield-alt',
    items: [
      // Only one link per entity: creation and querying are handled by the screen, not separate menu items.
      {
        component: 'CNavItem',
        name: 'Usuarios',
        to: '/admin/users',
        icon: 'cil-user',
      },
      {
        component: 'CNavItem',
        name: 'Roles',
        to: '/admin/roles',
        icon: 'cil-people',
      },
      {
        component: 'CNavItem',
        name: 'Permisos',
        to: '/admin/permissions',
        icon: 'cil-lock-locked',
      },
    ],
  },
]

// Explanation:
// - Each main section starts with CNavTitle for clarity.
// - CNavGroup allows logical grouping, here used for entity administration.
// - All 'to' paths are in English to follow best coding conventions and future scalability.
// - Icons use CoreUI's icon library for immediate visual feedback.
// - Menu and screen labels remain in Spanish as per UI language guidelines.
