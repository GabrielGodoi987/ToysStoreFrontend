export interface ITeam {
  id: number;
  name: string;
  image: string;
  description: string;
  role: string;
  social: {
    github: string;
    linkedin: string;
  }
}
