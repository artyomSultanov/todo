import { ITodo } from './todo-type'
import { IUser } from './user-type'
export interface IAuthResponse {
  user: IUser
  error: string
}
export interface ITodolistResponse {
  todos?: ITodo[]
  error: string
}
