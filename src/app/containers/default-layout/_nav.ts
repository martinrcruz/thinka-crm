import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Clientes y Contactos'
  },
  {
    name: 'Clientes',
    url: '/contact/customer-list',
    iconComponent: { name: 'cil-group' },
  },
  {
    title: true,
    name: 'Cotizacion y Ventas'
  },
  {
    name: 'Cotizaciones',
    url: '/sales/quote-list',
    iconComponent: { name: 'cil-calculator' },
  },
  {
    name: 'Ventas',
    url: '/sales/sale-list',
    iconComponent: { name: 'cil-cart' },
  },
  {
    title: true,
    name: 'Projects & Tasks'
  },
  {
    name: 'Proyectos',
    url: '/projects/project-list',
    iconComponent: { name: 'cil-briefcase' },
  },
  {
    name: 'Tareas',
    url: '/projects/task-list',
    iconComponent: { name: 'cil-bolt' },
  },
  // {
  //   name: 'Pizarra Kanban',
  //   url: '/projects/task-kanban',
  //   iconComponent: { name: 'cil-clipboard' },
  // }
];
