import { Person } from "./person";

export interface People {
    count: string;
    next: string;
    previous: string;
    results: Person[];
}
