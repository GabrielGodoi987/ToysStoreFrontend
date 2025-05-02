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
    path: '/catalog',
    isDropdown: false,
  },
  {
    name: 'Administração',
    icon: 'settings',
    path: '/admin',
    isDropdown: true,
    children: [
      {
        name: 'Categorias',
        icon: 'mdi-invoice-list-outline',
        path: '/admin/categories',
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
    path: '/team',
    isDropdown: false,
  },
];
