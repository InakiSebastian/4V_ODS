import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  @Input() function: string = 'Cargando';
  text: string = '';
  private estados: string[] = ['', '.', '..', '...'];
  private index: number = 0;

  constructor() {
    setInterval(() => {
      this.text = this.estados[this.index]; // Cambia el texto
      this.index = (this.index + 1) % this.estados.length; // Avanza en el array
    }, 150); // Cada medio segundo (500ms)
  }
}
