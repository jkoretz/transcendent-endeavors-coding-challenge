import { Component } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Calculation } from '../../models/calculation.model';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.css'
})
export class InputFormComponent {

  calculation: Calculation = { 
    number: 0,
    numberTimesTwo: 0,
    numberTimesTwoSquared: 0
  };

  notification: string = '';

  constructor(private fs: FirestoreService) {}

  calculate(n: number) {
    this.calculation.number = n;
    this.calculation.numberTimesTwo = n*2;
    this.calculation.numberTimesTwoSquared = Math.pow(this.calculation.numberTimesTwo, 2);
    this.store(this.calculation);
  }

  async store(data: any) {
    await this.fs.create(data).then(() => {
      this.notifyUser();
    });
  }

  notifyUser() {
    this.notification = 'Your number ' + this.calculation.number + ' and calculation ' + this.calculation.numberTimesTwoSquared + ' have been stored in the database!';
    setTimeout(() => this.notification = '', 5000); 
  }
}
