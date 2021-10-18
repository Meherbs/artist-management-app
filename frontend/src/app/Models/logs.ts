import { User } from "./User";

export interface ILogs {
    id: number;
    message: string;
    context: JSON;
    level: number;
    levelName: string;
    extra: JSON;
    createdAt: Date;
    user: User;
}
