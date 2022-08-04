import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  formulario: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    documento: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.maxLength(8)]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    nacimiento: new FormControl('', [Validators.required]),
    pais: new FormControl('',[Validators.required]),
  });

  paises:string[] = ['Argentina','Brasil', 'Uruguay'];

  alumnos = [
    {
      nombre: "Juan Alberto",
      apellido: "Paez",
      documento: "23615487",
      mail: "juan@gmail.com",
      edad: "29",
      pais: "Activo"
    },
    {
      nombre: "Mauro Fernando",
      apellido: "Alvarez",
      documento: "44895678",
      mail: "mauro@gmail.com.ar",
      edad: "18",
      pais: "Activo"
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

  previsualizacion!: string;

   guardarAlumno(){
    console.log(this.formulario);
    if(this.formulario.valid ===true){
      this.alumnos.push({
        nombre: this.formulario.get('nombre')?.value,
        apellido: this.formulario.get('apellido')?.value,
        documento: this.formulario.get('documento')?.value,
        mail: this.formulario.get('mail')?.value,
        edad: this.ageCalculator(this.formulario.get('nacimiento')?.value),
        pais: this.formulario.get('pais')?.value
      });
      this.formulario.reset();
    }else{
      alert('Hay campos invalidos');
    }
   }


   ageCalculator(nacimiento:string):string{
      const convertAge = new Date(nacimiento);
      console.log(nacimiento);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      let edad = (Math.floor((timeDiff / (1000 * 3600 * 24))/365));
      return String(edad);
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

}
