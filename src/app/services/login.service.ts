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

  login(user: User): User | undefined {
    const foundUser = this.users.find(u => u.username === user.username && u.password === user.password);
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
}
