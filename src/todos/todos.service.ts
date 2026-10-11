import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
  private todos = [];
  private id = 1;

  // GET /todos
  getAll() {
    return this.todos;
  }

  // GET /todos/:id
  getById(id: number) {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      return { message: 'Todo not found' };
    }
    return todo;
  }

  // POST /todos
  create(todo: any) {
    const newTodo = {
      id: this.id++,
      title: todo.title || 'Untitled',
      done: todo.done || false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  // PUT /todos/:id
  update(id: number, updateData: any) {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      return { message: 'Todo not found' };
    }
    if (updateData.title !== undefined) {
      todo.title = updateData.title;
    }
    if (updateData.done !== undefined) {
      todo.done = updateData.done;
    }
    return todo;
  }

  // DELETE /todos/:id
  delete(id: number) {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      return { message: 'Todo deleted' };
    }
    return { message: 'Todo not found' };
  }
}