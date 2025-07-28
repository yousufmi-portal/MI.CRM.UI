import { LoginModel } from "./login.model";

export interface RegisterModel extends LoginModel {
    fullName: string;
    roleId: number;
}
