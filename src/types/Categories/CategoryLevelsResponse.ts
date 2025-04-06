import { Level } from "types/Categories/Level";

export interface CategoryLevelsResponse {
    success: boolean;
    message: string | null;
    data: Level[];
  }