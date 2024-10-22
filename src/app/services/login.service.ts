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

  private loggedUser: User | null = null;

  constructor() {
    this.loadLoggedUser();
  }

  login(username: string, password: string): boolean {
    const foundUser = this.users.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      this.loggedUser = foundUser;
      localStorage.setItem("loggedUser", JSON.stringify(this.loggedUser));
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedUser = null;
    localStorage.removeItem("loggedUser");
  }

  getLoggedUser(): User | null {
    return this.loggedUser;
  }

  // Nuevo método para obtener el nombre del usuario actual
  getLoggedUsername(): string | null {
    return this.loggedUser ? this.loggedUser.username : null;
  }

  register(username: string, password: string): User {
    if (this.users.some((u) => u.username === username)) {
      throw new Error("El nombre de usuario ya está en uso");
    }

    const newUser = new User(username, password);
    this.users.push(newUser);

    this.saveUsers();

    return newUser;
  }

  private saveUsers(): void {
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  isLoggedIn(): boolean {
    return this.loggedUser !== null;
  }

  private loadLoggedUser(): void {
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) {
      this.loggedUser = JSON.parse(storedUser);
    }
  }
}
