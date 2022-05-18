import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Demo Angular Form Array';
  rfDataModal: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.rfDataModal = this.fb.group({
      fullName: ['', [Validators.required]],
      listService: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.dataService.getListData().subscribe((result) => {
      this.rfDataModal.patchValue(result);
      this.initFormArray(result.listServices);
    });
  }

  initFormArray(data: any[]) {
    const controls = this.services;
    data.forEach((item) => {
      controls.push(
        this.fb.group({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })
      );
    });
  }

  get services(): FormArray {
    return this.rfDataModal.get('listService') as FormArray;
  }

  addService() {
    this.services.push(
      this.fb.group({
        name: ['', [Validators.required]],
        price: [0],
        quantity: [undefined, [Validators.required]],
      })
    );
  }

  removeService(index: number) {
    this.services.removeAt(index);
  }

  save(): void {
    if (this.rfDataModal.invalid) {
      alert('Vui lòng xem lại thông tin form');
      for (const i in this.rfDataModal.controls) {
        this.rfDataModal.controls[i].markAsDirty();
        this.rfDataModal.controls[i].updateValueAndValidity();
      }
      for (const i in this.services.controls) {
        const fGr: any = this.services.controls[i];
        for (const j in fGr.controls) {
          fGr.controls[j].markAsDirty();
          fGr.controls[j].updateValueAndValidity();
        }
      }
    } else {
      console.log(this.rfDataModal.value);
    }
  }
}
