import * as fs from "fs";
import * as path from "path";
import { FolderInfo } from "../interfaces/folder_info";

export class FileUtils {
  static readDirRecursive(
    dir: string,
    level = 0,
    folderInfos: FolderInfo[] = [],
  ): FolderInfo[] {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        folderInfos.push({
          name: file,
          level: level,
          items: [],
        });
        FileUtils.readDirRecursive(filePath, level + 1, folderInfos);
      } else {
        const parentFolderName: string = path.basename(path.dirname(filePath));
        const index = folderInfos.findIndex(
          (info) => info.name.toLowerCase() === parentFolderName.toLowerCase(),
        );
        if (index > -1) {
          folderInfos[index].items.push({
            name: file.split(".")[0],
            level,
            isFile: true,
            path: filePath,
          });
        }
      }
    }
    return folderInfos;
  }
}
