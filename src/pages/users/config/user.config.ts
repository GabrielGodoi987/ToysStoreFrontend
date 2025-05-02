import type { ITeam } from 'src/interfaces/ITeam';

export const userConfig: ITeam[] = [
  {
    id: 1,
    name: 'John Doe',
    image: 'https://picsum.photos/200/300',
    description: 'Desenvolvedor Frontend',
    role: 'Frontend Developer',
    social: {
      github: 'github.com/johndoe',
      linkedin: 'linkedin.com/in/johndoe',
    },
  },
  {
    id: 2,
    name: 'Jane Smith',
    image: 'https://picsum.photos/200/300',
    description: 'Desenvolvedor Backend',
    role: 'Backend Developer',
    social: {
      github: 'github.com/janesmith',
      linkedin: 'linkedin.com/in/janesmith',
    },
  },
  {
    id: 3,
    name: 'Alice Johnson',
    image: 'https://picsum.photos/200/300',
    description: 'Designer UI/UX',
    role: 'UI/UX Designer',
    social: {
      github: 'github.com/alicejohnson',
      linkedin: 'linkedin.com/in/alicejohnson',
    },
  },
  {
    id: 4,
    name: 'Bob Brown',
    image: 'https://picsum.photos/200/300',
    description: 'Gerente de Projetos',
    role: 'Project Manager',
    social: {
      github: 'github.com/bobbrown',
      linkedin: 'linkedin.com/in/bobbrown',
    },
  },
];
