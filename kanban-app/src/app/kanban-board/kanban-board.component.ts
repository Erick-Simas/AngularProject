import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Posts } from '../model/posts';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit{
  constructor(private taskService: TaskService) {}
  task: any = {};

  createTask() {
    this.taskService.addTask({ ...this.task });
    this.task = {};
  }
  
  post = new Posts();

  estaEditando = false;

  desc='descricao';

  listaPosts: Posts[] = [];

  aberto = false;

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.taskService.listar().subscribe(Posts => {

      console.log(Posts)

      this.listaPosts = Posts;
    });
  }

  inserir() {
    this.taskService.inserir(this.post).subscribe(post => {
      this.listar();
    });
  }

  remover(id: number) {
    this.taskService.excluir(id).subscribe(() => {
      this.listar();
    });
  }

  atualizar() {
    this.taskService.atualizar(this.post).subscribe(post => {
      this.listar();
    })
  }

  selecionar(post: Posts) {
    this.post = post;
    this.estaEditando = true;
  }

  cadastrar(on:boolean) {
    this.aberto = true;

  }

}

