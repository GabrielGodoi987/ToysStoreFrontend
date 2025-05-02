import type { ITable } from 'src/interfaces/ITable';

export const columns: ITable[] = [
  {
    name: 'id',
    label: 'ID',
    align: 'left',
    field: row => row.id,
    required: true
  },
  {
    name: 'name',
    label: 'Name',
    align: 'left',
    field: row => row.name,
    required: true
  },
  {
    name: 'category',
    label: 'category',
    align: 'left',
    field: row => row.categoryId.name,
    required: true
  },
  {
    name: 'edit',
    label: '',
    align: 'center',
    field: 'edit',
    required: true
  },
];
