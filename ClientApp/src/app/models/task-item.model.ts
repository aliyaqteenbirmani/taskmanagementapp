export interface TaskItem {
    id: string; 
    title: string;
    description: string;
    status: 'New' | 'InProgress' | 'Completed'; 
    isDeleted: boolean;
    createdDate: string; 
    modifiedDate: string;
    userId: string; 
  }