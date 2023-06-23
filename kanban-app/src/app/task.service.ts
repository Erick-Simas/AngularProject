import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Posts} from './model/posts'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: any[] = [];
  addTask(task: any) {
    this.tasks.push(task);
  }
  getTasksByColumn(column: string) {
    return this.tasks.filter(task => task.column === column);
  }
  moveTask(task: any, newColumn: string) {
    task.column = newColumn;
  }
  createTask(task: any) {
    this.tasks.push(task);
  }
    constructor(private http:HttpClient) { }

  //GET
  listar(): Observable<Posts[]>{
    this.tasks = [this.http.get<Posts[]>('http://localhost:3000/posts')];
    return this.http.get<Posts[]>('http://localhost:3000/posts');
  }

  //POST
  inserir(post: Posts):Observable<Posts>{
    return this.http.post<Posts>('http://localhost:3000/posts', post);//precisa do Id e os dados do cliente por inteiro
  }
  //PUT
  atualizar(post: Posts){
    return this.http.put<Posts>(`http://localhost:3000/posts/${post.id}`, post);
  }
  excluir(id: number):Observable<any>{
    return this.http.delete(`http://localhost:3000/posts/${id}`);
}
}
