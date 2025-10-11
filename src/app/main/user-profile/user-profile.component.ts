import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../../api-dtos/user.dto';
import { UsersService } from '../../services/users-service/users.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ROLES } from '../../constants/roles.list';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, TableModule, FormsModule, ButtonModule, AvatarModule, ChangePasswordComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  user: UserDto | null = null;

  originalUser: UserDto | null = null;

  isEditMode: boolean = false;

  displayChangePasswordDialog: boolean = false;

  constructor(private usersService: UsersService, private messageService: MessageService) { }

  userFields = [
    { label: 'Name', field: 'name', editing: false },
    { label: 'Email', field: 'email', editing: false },
    { label: 'Role', field: 'roleId', editing: false },
  ];

  ngOnInit(): void {
    this.usersService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        this.originalUser = structuredClone(user); // deep copy
      },
      error: (err) => {
        console.error('Error fetching current user:', err);
      }
    });
  }

  toggleEdit(state: boolean) {
    if (state) {
      // Entering edit mode → store a clone of current user
      this.originalUser = this.user ? structuredClone(this.user) : null;
      this.isEditMode = true;
    } else {
      // Cancel → revert to original user
      if (this.originalUser) {
        this.user = structuredClone(this.originalUser);
        this.selectedImageFile = null; // discard any selected image
      }
      this.isEditMode = false;
    }
  }

  updateUser() {
    if (!this.user || !this.originalUser) return;

    const hasImageChanged = !!this.selectedImageFile;

    // Compare shallow fields
    const hasFieldChanges =
      this.user.name !== this.originalUser.name ||
      this.user.email !== this.originalUser.email ||
      this.user.roleId !== this.originalUser.roleId;

    // 🚫 No changes detected
    if (!hasFieldChanges && !hasImageChanged) {
      this.messageService.add({ severity: 'info', summary: 'No changes detected', detail: 'Please make some changes before saving.' });
      this.isEditMode = false;
      return;
    }

    // ✅ Prepare FormData (matches backend DTO)
    const form = new FormData();
    form.append('id', String(this.user.userId)); // Backend expects Id
    form.append('name', this.user.name ?? '');
    form.append('email', this.user.email ?? '');
    form.append('roleId', String(this.user.roleId ?? 0));

    if (this.selectedImageFile) {
      form.append('imageFile', this.selectedImageFile, this.selectedImageFile.name);
    }

    this.usersService.updateUser(form).subscribe({
      next: (response) => {
        this.originalUser = structuredClone(response);
        this.selectedImageFile = null;
        this.isEditMode = false;
        this.messageService.add({ severity: 'success', summary: 'User updated successfully' });
      },
      error: (err) => {
        console.error('Error updating user:', err);
        this.messageService.add({ severity: 'error', summary: 'Error updating user', detail: 'Please try again later.' });
      }
    });
  }



  getRoleName(roleId: number): string {
    const role = ROLES.find(r => r.roleId === roleId);
    return role ? role.name : 'Unknown Role';
  }

  selectedImageFile: File | null = null;

  onImageUploadClick() {
    if (this.user === null) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.selectedImageFile = file; // ✅ store file for later upload

        // show preview
        const reader = new FileReader();
        reader.onload = () => this.user!.imageUrl = reader.result as string;
        reader.readAsDataURL(file);
      }
    };

    input.click();
  }


}
