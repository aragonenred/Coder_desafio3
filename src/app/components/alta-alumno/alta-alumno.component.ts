import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-alta-alumno',
  templateUrl: './alta-alumno.component.html',
  styleUrls: ['./alta-alumno.component.css']
})
export class AltaAlumnoComponent implements OnInit {

  formulario: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    documento: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.maxLength(8)]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    nacimiento: new FormControl('', [Validators.required]),
    pais: new FormControl('',[Validators.required]),
  });


  constructor( private fb:FormBuilder) {

   }

   previsualizacion!: string;

   guardarAlumno(){
    console.log(this.formulario);
   }

   capturarFile(event:any){
      console.log(event.target.files[0]);

       this.cargarPrevisualizacion(event.target.files[0]);
   }



   cargarPrevisualizacion(file: File) {
    var base64:string;
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
      console.log('paso 2');
    })

    observable.subscribe((d) => {
      this.previsualizacion = d;
    });

   }

   readFile(file:File, subscriber: Subscriber<any>){
     const filereader = new FileReader();
     filereader.readAsDataURL(file)
     filereader.onload = () =>{
       subscriber.next(filereader.result);
       subscriber.complete()
     }
     filereader.onerror = ()=>{
       subscriber.error()
       subscriber.complete()
     }
   }



  ngOnInit(): void {
  }

}
