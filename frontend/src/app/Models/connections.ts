import { ICelebrity } from "./celebrity";
import { IRepresentative } from "./presentative";
import { ITimer } from "./timer";

export interface IConnections extends ITimer {
    id: number;
    isAgent: boolean;
    isPublicist: boolean;
    isManager: boolean;
    representative: IRepresentative;
    celebrity: ICelebrity;

}