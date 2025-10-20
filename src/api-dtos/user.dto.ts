export interface UserDto {
    userId: number;
    name: string;
    email: string;
    roleId: number;
    imageUrl?: string; // Optional URL for profile image
}
