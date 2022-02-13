import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder } from "@angular/forms";
import { CrudService } from 'src/app/servicio/crud.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {

  formularioDeEmpleados:FormGroup;
  elId:any;

  constructor(
    private activeRoute:ActivatedRoute,
    private ruteador:Router,
    private crudService:CrudService,
    public formulario:FormBuilder
  ) {
    this.elId=this.activeRoute.snapshot.paramMap.get('id'); //recepcionamos el id y lo guardamos en la variable elId
    console.log(this.elId);
    this.crudService.ObtenerEmpleado(this.elId).subscribe(
      respuesta=>{
        console.log(respuesta);
        this.formularioDeEmpleados.setValue({
          nombre:respuesta[0]['nombre'],
          correo:respuesta[0]['correo']
        });
      }
    );

    this.formularioDeEmpleados=this.formulario.group(
      {
        nombre:[''],
        correo:['']
      }
    );



   }

  ngOnInit(): void {
  }

  enviarDatos():any{
    console.log(this.elId);
    console.log(this.formularioDeEmpleados.value);
    this.crudService.EditarEmpleado(this.elId,this.formularioDeEmpleados.value).subscribe(()=>{
      this.ruteador.navigateByUrl('/listar-empleado');
    });
  }

}
