export default [
  { component: 'CNavItem', name: 'Dashboard', to: '/home', icon: 'cil-speedometer' },
  { component: 'CNavTitle', name: 'Profesores' },
  {
    component: 'CNavGroup', name: 'Gestión de Profesores', icon: 'cil-user', items: [
      { component: 'CNavItem', name: 'Listado', to: '/profesores/listado' },
      { component: 'CNavItem', name: 'Cargar Notas', to: '/profesores/notas' },
    ]
  },
  { component: 'CNavTitle', name: 'Estudiantes' },
  {
    component: 'CNavGroup', name: 'Gestión de Estudiantes', icon: 'cil-people', items: [
      { component: 'CNavItem', name: 'Listado', to: '/estudiantes/listado' },
      { component: 'CNavItem', name: 'Movimientos', to: '/estudiantes/movimientos' },
    ]
  }
]
