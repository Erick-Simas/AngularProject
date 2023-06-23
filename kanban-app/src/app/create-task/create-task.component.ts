import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Posts } from '../model/posts';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})

export class CreateTaskComponent implements OnInit {
  task: any = {};

  constructor(private taskService: TaskService) { }

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

  salvar() {
    if (this.estaEditando) {
      this.atualizar();
    }
    else {
      this.inserir();
    }
  }

  selecionar(post: Posts) {
    this.post = post;
    this.estaEditando = true;
  }

  cancelar() {
    this.estaEditando = false;
    this.post = new Posts();
  }

  cadastrar(on:boolean) {
    this.aberto = true;

  }
}
