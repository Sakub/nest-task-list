import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { ITask } from './task.model';

@Injectable()
export class TasksService {
  public tasks: BehaviorSubject<ITask[]> = new BehaviorSubject([]);

  public findAll(): ITask[] {
    return this.tasks.getValue();
  }

  public findOne(id: number): ITask | undefined {
    return this.tasks.getValue().find((task) => task.id === id);
  }

  public pushNew(task: ITask): ITask {
    const newId = this.tasks.getValue().length ? this.findMaxId() + 1 : 0;
    const newTask: ITask = { ...task, id: newId };

    this.tasks.next([...this.tasks.getValue(), newTask]);

    return newTask;
  }

  public update(id: number, body: ITask) {
    let taskToReturn: ITask;
    this.tasks.next(
      this.tasks.getValue().map((task) => {
        if (task.id === id) {
          taskToReturn = { ...body, id };
          return taskToReturn;
        }
        return task;
      }),
    );
    return taskToReturn;
  }

  public delete(id: number) {
    this.tasks.next(this.tasks.getValue().filter((task) => task.id !== id));
  }

  private findMaxId(): number {
    return Math.max(...this.tasks.getValue().map((v) => v.id));
  }
}
