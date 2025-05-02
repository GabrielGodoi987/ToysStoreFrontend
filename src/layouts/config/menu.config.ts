import type { IMenu } from "src/interfaces/IMenu";

export const menuConfig: IMenu[] = [
  {
     name: "Home",
     icon: "home",
     path: "/"
  },
  {
    name: "Catalogo",
    icon: "list",
    path: "/catalog"
  },
  {
    name: "Administração",
    icon: "settings",
    path: "/admin"
  },
  {
    name: "Equipe",
    icon: "people",
    path: "/team"
  }
]
