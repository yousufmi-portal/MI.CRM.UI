import { LoginModel } from "./login.model";

export interface RegisterModel extends LoginModel {
    fullName: string;
    role: string;
}
