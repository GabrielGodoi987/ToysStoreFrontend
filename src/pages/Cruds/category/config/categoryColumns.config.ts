import type { ITable } from "src/interfaces/ITable";

export const columns: ITable[] = [
  {
    name: 'id',
    label: 'ID',
    field: row => row.id,
    required: true,
    align: 'center',
    sortable: true,
  },
  {
    name: 'nome',
    label: 'nome',
    field: row => row.name,
    required: true,
    align: 'center',
  },
  {
    name: 'edit',
    label: '',
    field: 'edit',
    required: true,
    align: 'center',
  }
]
