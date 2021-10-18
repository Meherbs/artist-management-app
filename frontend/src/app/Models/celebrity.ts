import { ITimer } from "./timer";

export interface ICelebrity extends ITimer {
    id: number;
    name?: string;
    birthday?: Date;
    bio?: string;
}