export interface IMenu {
  name: string;
  icon: string;
  path: string;
  isDropdown: boolean;
  children?: IMenu[];
}
