import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Calculation } from '../models/calculation.model';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private path = '/calculations';
  calculationRef: AngularFirestoreCollection<Calculation>;

  constructor(private fs: AngularFirestore) { 
    this.calculationRef = fs.collection(this.path);
  }
  
  update(data: any) {
    return this.calculationRef.doc(environment.documentId).update(data);
  }

  create(data: any) {
    return this.fs.collection(this.path).add(data);
  }
}
