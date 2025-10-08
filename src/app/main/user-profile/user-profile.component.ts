import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../../api-dtos/user.dto';
import { UsersService } from '../../services/users-service/users.service';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  user: UserDto | null = null;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        console.error('Error fetching current user:', err);
      }
    });
  }
}
