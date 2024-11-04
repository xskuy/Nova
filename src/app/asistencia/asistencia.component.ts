import { Component, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AsistenciaComponent  implements OnInit {
  username: string | null = '';

  highlightedDates = []; // Define as required

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    const loggedUser = this.loginService.getCurrentUserValue();
    this.username = loggedUser ? loggedUser.email : null;
  }

  getUserFirstName(): string {
    return this.username ? this.username.split('@')[0] : '';
  }


}
