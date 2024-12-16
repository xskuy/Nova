import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: Firestore) { }

  async agregarDocumento(coleccion: string, data: any) {
    try {
      const collectionRef = collection(this.firestore, coleccion);
      const docRef = await addDoc(collectionRef, data);
      return docRef;
    } catch (error) {
      console.error('Error al agregar documento:', error);
      throw error;
    }
  }
}