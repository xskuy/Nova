import { Injectable } from "@angular/core";
import { User } from "../models/user";

@Injectable({
	providedIn: "root",
})


export class LoginService {
  

  users: User[] = [
    new User("admin", "admin"),
    new User("user", "user"),
    new User("guest", "guest"),
  ];

    loggedUser: User | undefined 

  login(username: string, password: string): User | undefined {
    const foundUser = this.users.find(u => u.username === username && u.password === password);
    if (foundUser) {
      this.loggedUser = foundUser;
      return foundUser;
    }
    return undefined;
  }

  logout(): void {
    this.loggedUser = undefined;
  }

  getLoggedUser(): User | undefined {
    return this.loggedUser;
  }

  register(username: string, password: string): User {
    // Verificar si el usuario ya existe
    if (this.users.some(u => u.username === username)) {
      throw new Error('El nombre de usuario ya está en uso');
    }
    
    // Crear nuevo usuario
    const newUser = new User(username, password);
    this.users.push(newUser);
    
    // Opcionalmente, puedes guardar los usuarios en el almacenamiento local
    this.saveUsers();
    
    return newUser;
  }

  private saveUsers(): void {
    // Guardar usuarios en el almacenamiento local
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  private loadUsers(): void {
    // Cargar usuarios del almacenamiento local
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  constructor() {
    // Cargar usuarios al inicializar el servicio
    this.loadUsers();
  }
}
