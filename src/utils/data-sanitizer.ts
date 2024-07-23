import { Task } from "src/task/task.entity";

export const sanitizeTaskResponse = (payload: [Task[], number]): [Task[], number] => {
    payload[0].map(task => {
        if (task.assignee) delete task.assignee.password;
      });
    return payload
}

export const sanitizeSingleTaskResponse = (task: Task): Task => {
    if(task.assignee) delete task.assignee.password;
    return task
}