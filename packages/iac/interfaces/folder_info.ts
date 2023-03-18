import { FileInfo } from "./file_info";

export interface FolderInfo {
  name: string;
  level: number;
  items: FileInfo[];
}
