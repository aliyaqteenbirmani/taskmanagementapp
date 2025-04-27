export enum TaskStatus {
    New = 0,
    InProgress = 1,
    Completed = 2,
  }
  
  export interface TaskDto{
    title:string;
    description:string;
    status: TaskStatus;
  }
  export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    isDeleted: boolean;
    createdDate: Date;
    modifiedDate: Date;
    userId: string;
  }
  