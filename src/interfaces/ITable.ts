export interface ITable {
  name: string;
  label: string;
  field: string | ((row: any) => any);
  required: boolean;
  align: 'center' | 'left' | 'right';
  sortable?: boolean;
  style?: string;
  classes?: string;
  headerStyle?: string;
  headerClasses?: string;
}
