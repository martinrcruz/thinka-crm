import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Clientes y Leads'
  },
  // {
  //   name: 'Contactos',
  //   url: '/contacts/leads',
  //   iconComponent: { name: 'cil-user-follow' },
  // },
  {
    name: 'Clientes',
    url: '/contact/customer',
    iconComponent: { name: 'cil-group' },
  },
  {
    title: true,
    name: 'Cotizacion y Ventas'
  },
  {
    name: 'Cotizaciones',
    url: '/sales/quote',
    iconComponent: { name: 'cil-calculator' },
  },
  {
    name: 'Ventas',
    url: '/sales/sale',
    iconComponent: { name: 'cil-cart' },
  },
  {
    title: true,
    name: 'Projects & Tasks'
  },
  {
    name: 'Proyectos',
    url: '/projects/project',
    iconComponent: { name: 'cil-briefcase' },
  },
  {
    name: 'Tareas',
    url: '/projects/tasks',
    iconComponent: { name: 'cil-bolt' },
  }
];
