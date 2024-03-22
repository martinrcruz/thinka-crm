import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Clientes y Leads'
  },
  {
    name: 'Contactos',
    url: '/contact/leads',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'Clientes',
    url: '/contact/customer',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    title: true,
    name: 'Cotizacion y Ventas'
  },
  {
    name: 'Cotizacion',
    url: '/sales/cotizacion',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'Venta',
    url: '/sales/venta',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    title: true,
    name: 'Proyectos y Tareas'
  },
  {
    name: 'Tareas',
    url: '/projects/tareas',
    iconComponent: { name: 'cil-speedometer' },
  }
];
