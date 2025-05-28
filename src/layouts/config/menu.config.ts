import type { IMenu } from 'src/interfaces/IMenu';

export const menuConfig: IMenu[] = [
  {
    name: 'Home',
    icon: 'home',
    path: '/',
    isDropdown: false,
  },
  {
    name: 'Catalogo',
    icon: 'list',
    path: '/management/catalog',
    isDropdown: false,
  },
  {
    name: 'Administração',
    icon: 'settings',
    path: '/management/admin',
    isDropdown: true,
    children: [
      {
        name: 'Categorias',
        icon: 'mdi-invoice-list-outline',
        path: '/management/admin/categories',
        isDropdown: false,
      },
      {
        name: 'Brinquedos',
        icon: 'toys',
        path: '/admin/toys',
        isDropdown: false,
      },
    ],
  },
  {
    name: 'Equipe',
    icon: 'people',
    path: '/management/team',
    isDropdown: false,
  },
];
