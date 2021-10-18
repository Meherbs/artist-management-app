import { ITimer } from "./timer";

export interface User extends ITimer {
    id: number;
    username: string;
    password: string;
    plainPassword?: string;
    roles?: string[];
    token?: string;
    email?: string;
}