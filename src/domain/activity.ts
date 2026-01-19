import { Activity } from "./validation";

export type PreparedActivity = Activity & {
    tokens: string[];
}
