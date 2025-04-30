import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OdsService } from '../../../services/ods.service';
import { Ods } from '../../../model/ods';
import { StaticService } from '../../../services/static-service.service';
import { CommonModule } from '@angular/common';
import { Path } from 'echarts/types/src/util/graphic.js';

@Component({
  selector: 'app-form-add-ods',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './form-add-ods.component.html',
  styleUrl: './form-add-ods.component.scss'
})
export class FormAddOdsComponent {
  odsForm!: FormGroup;
  dimensions : {id: number, name: string}[] = []

  selectedDimension: string = '-1';
  searchOds: string = '';

  odsList: Ods[] = []
  filtredOds: {ods: Ods, src: string}[] = []

  editMode: boolean|null = false;
  selectedOds: Ods | undefined = undefined;

  slectedImage: File | null = null;

  selectedId: number = -1;
  deleteCountdown: number = 0;
  deleteButtonEnabled: boolean = false;
  countdownInterval: any;

  constructor(private fb: FormBuilder, private odsService: OdsService, private staticService: StaticService){
    this.dimensions = this.staticService.getDimensions();
  }

  async ngOnInit() {
    this.odsForm = this.fb.group({
      name: ['', Validators.required],
      dimension: ['', Validators.required],
    });
    this.odsList = await this.odsService.getOds();
    console.log(this.odsList)
    this.filter();
  }
  

  async submit(){
    if (this.odsForm.valid) {
      if (!this.editMode) {
        const ods = await this.odsService.createODS(new Ods(-1,this.odsForm.value.dimension, this.odsForm.value.name));
        this.odsList.push(ods);
        this.filter();
        this.odsForm.reset();
        alert("¡Ods agregado correctamente!");
      }
      else if (this.selectedOds) {
        this.odsList.find(ods => ods.id == this.selectedOds!.id)!.description = this.odsForm.value.name;
        this.odsList.find(ods => ods.id == this.selectedOds!.id)!.dimension = this.odsForm.value.dimension;
        this.selectedOds!.description = this.odsForm.value.name;
        this.selectedOds!.dimension = this.odsForm.value.dimension;
        await this.odsService.editODS(this.selectedOds!);
        this.editMode = false;
        this.selectedOds = undefined;
        this.odsForm.reset();
        alert("¡Ods editado correctamente!");
      }
      if (!this.slectedImage) return;

      const formData = new FormData();
      formData.append('image', this.slectedImage);
      
    }
  }

  reset(){
    this.odsForm.reset();
  }

  async filter(){
    const response =  this.odsList
    .filter(ods =>this.selectedDimension == "-1" || ods.dimension === this.selectedDimension)
    .filter(ods =>this.searchOds == "" || ods.description.toLowerCase().includes(this.searchOds.toLowerCase()))
    .map(async ods => ({ods: ods, src: await this.getImage(ods.id)}));

    this.filtredOds = await Promise.all(response);
  }

  setEditMode(odsId: number) {
    this.editMode = true;
    this.selectedOds = this.odsList.find(ods => ods.id === odsId);
    if (!this.selectedOds) return;
    this.odsForm.setValue({ name: this.selectedOds.description, dimension: this.selectedOds.dimension });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.slectedImage = input.files[0];
    }
  }

  async getImage(id: number) {
    let src = 'odsIcons/' + id + '.png';

    const imgValid = await new Promise<boolean>((resolve) => {//comprobación de imagen válida
      const img = new Image(); //(funciones de image)
      img.onload = () => resolve(true); //si la imagen a podido cargar
      img.onerror = () => resolve(false);
      img.src = src;
    });
    console.log(imgValid ? src : 'odsIcons/default.png')
    return imgValid ? src : 'odsIcons/default.png';
  }

  delete() {
    this.odsList = this.odsList.filter(ods => ods.id !== this.selectedId);
    this.filter();
    this.odsService.deleteODS(this.selectedId);

    this.editMode = false;
  }

  startDeleteCountdown() {
    this.deleteCountdown = 4;
    this.deleteButtonEnabled = false;
  
    this.countdownInterval = setInterval(() => {
      this.deleteCountdown--;
      if (this.deleteCountdown <= 0) {
        this.deleteButtonEnabled = true;
        clearInterval(this.countdownInterval);
      }
    }, 1000);

    this.selectedOds = this.odsList.find(ods => ods.id == this.selectedId);
  }
}
