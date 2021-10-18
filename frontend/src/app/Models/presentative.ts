import { IEmailAdress } from "./emailAdress";
import { ITimer } from "./timer";

export interface IRepresentative extends ITimer {
    id: number;
    name?: string;
    company?: string;
    emails?: IEmailAdress[];
}