import { Request, Response } from "express";

let todos = [
  { id: 1, text: "Buy Milk", completedAt: new Date() },
  { id: 2, text: "Buy bread", completedAt: null },
  { id: 3, text: "Buy butter", completedAt: new Date() },
];

export class TodosControllers {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: `ID argument is not a number` });
    const todo = todos.find((todo) => todo.id === id);

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `TODO with ID ${id} not found` });
  };

  public CreateTodo = (req: Request, res: Response) => {
    res.json("POST create todo");
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    const todo = todos.find((todo) => todo.id === id);
    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    const { text, completedAt } = req.body;

    todo.text = text || todo.text;
    completedAt === "null"
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt || todo.completedAt));

    res.json(todo);
  };

  public DeleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const todoExists = todos.some((todo) => todo.id === id);
    if (!todoExists) {
      return res
        .status(404)
        .json({ error: `The number ID ${id} was not found` });
    }

    // Filtrar para eliminar el todo con el ID especificado
    todos = todos.filter((todo) => todo.id !== id);

    res.json({ message: `Todo with ID ${id} has been deleted` });
  };
}
