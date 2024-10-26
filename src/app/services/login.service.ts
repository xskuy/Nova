import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { BehaviorSubject } from "rxjs";

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
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor() {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
    this.loadLoggedUser();
  }

  login(username: string, password: string): boolean {
    const foundUser = this.users.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      this.loggedUser = foundUser;
      this.currentUserSubject.next(this.loggedUser); // Update the subject
      localStorage.setItem("loggedUser", JSON.stringify(this.loggedUser));
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedUser = null;
    this.currentUserSubject.next(null); // Update the subject
    localStorage.removeItem("loggedUser");
  }

  getLoggedUser(): User | null {
    return this.loggedUser;
  }

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
      this.currentUserSubject.next(this.loggedUser); // Update the subject
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value; // This will never be undefined
  }
}
