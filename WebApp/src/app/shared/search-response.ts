import { Chuck } from "./chuck";
import { Person } from "./person";

export interface SearchResponse {
    StarWarsResults: Person[];
    ChuckNorrisResults: Chuck[];
}
