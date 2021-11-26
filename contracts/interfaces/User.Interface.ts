import User from 'App/Models/User'

export default interface UserInterface {
  find(): Promise<User[]>
  findOne(userId: number): Promise<User>
  register(request: any): Promise<User>
  update(userId: number, request: any): Promise<User>
  delete(userId: number)
}
