import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-alta-alumno',
  templateUrl: './alta-alumno.component.html',
  styleUrls: ['./alta-alumno.component.css']
})
export class AltaAlumnoComponent implements OnInit {

  formulario: FormGroup;

  constructor( private fb:FormBuilder) {
    this.formulario = fb.group({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required])
    });


   }

   guardarAlumno(){

    console.log(this.formulario);
   }

  ngOnInit(): void {
  }

}
