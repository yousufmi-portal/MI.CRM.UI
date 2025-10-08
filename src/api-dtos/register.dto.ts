export interface RegisterDto {
    name: string;
    email: string;
    roleId: number;
    password: string;
    imageFile?: File; // 👈 add this (optional)
}
