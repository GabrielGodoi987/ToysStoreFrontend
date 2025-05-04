export interface IStrategy<T> {
  // o que precisamos para essas funções?
  // -> precisamos saber a rota que estamos utilizando
  // -> precisamos saber qual objeto nós estamos utilizando, portanto precisaremos de um generic type
  // create
  create(data: T): Promise<any>;
  // update
  update(id: string, data: T): Promise<any>;
  // delete
  delete(id: string): Promise<any>;
  // findAll functions
  findAll(): Promise<T[]>;
  // findOne function
  findOne(id: string): Promise<any>;
  // deleteAll function
  deleteAll(id: number[]): Promise<void>;
}
