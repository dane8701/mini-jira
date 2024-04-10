
export interface Task {
  _id: string
  name: string,
  dateCreated: Date,
  dateExpiration: Date,
  state: Status,
  createdBy: User,
  assignedTo: User,
  tags: Tag[],
  subTasks: Task[],
  project: Project,
  __v: number
}

export interface User {
  _id: string,
  fullName: string,
  email: string,
  password: string,
  __v: number
}

export interface Status {
  _id: string
  name: string,
  description: string,
}

export interface Tag {
  _id: string,
  name: string,
  __v: number
}

export interface Project {
  _id: string,
  title: string;
  description: string;
  dateCreated: Date;
  dateExpiration: Date;
  tags: Tag[];
  state: Status;
  __v: number
}