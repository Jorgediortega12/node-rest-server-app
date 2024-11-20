import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateDtosTodos } from "../../domain/dtos";
import { UpdateDtsoTodos } from "../../domain/dtos/todos/update-dtso-todos";

export class TodosControllers {
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todo = await prisma.todo.findMany();
    res.json(todo);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: `ID argument is not a number` });

    const todos = await prisma.todo.findFirst({
      where: { id },
    });

    todos 
      ? res.json(todos)
      : res.status(404).json({ error: `TODO with ID ${id} not found` });
  };

  public CreateTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateDtosTodos.create(req.body);
    if (error) return res.status(400).json(error);

    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });
    console.log(createTodoDto);
    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateDtosTodos] = UpdateDtsoTodos.create({
      ...req.body,
      id,
    });
    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.findFirst({
      where: { id },
    });

    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    const updateTodo = await prisma.todo.update({
      where: { id },
      data: updateDtosTodos!.values,
    });

    res.json(updateTodo);
  };

  public DeleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const todo = await prisma.todo.findFirst({
      where: { id },
    });
    if (!todo) {
      return res
        .status(404)
        .json({ error: `The number ID ${id} was not found` });
    }

    const deleted = await prisma.todo.delete({
      where: { id },
    });

    deleted
      ? res.json(deleted)
      : res.status(400).json({ error: `The number with ${id} not found` });

    res.json({ todo, deleted });
  };
}
