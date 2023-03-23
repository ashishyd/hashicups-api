import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// const filePath = './orders.json';

// fs.watchFile(filePath, () => {
//   const cmd = spawn('cdktf', ['deploy'], { stdio: 'inherit' });
//   cmd.stdout &&
//     cmd.stdout.on('data', (data) => {
//       console.log(`stdout: ${data}`);
//     });

//   cmd.stderr &&
//     cmd.stderr.on('data', (data) => {
//       console.error(`stderr: ${data}`);
//     });

//   cmd.on('close', (code) => {
//     console.log(`child process exited with code ${code}`);
//   });
// });

/**
 * It watches a folder and its subfolders for changes to any file, and if a file is changed, it runs a
 * command
 * @param {string} folder - the folder to watch
 */
function watchFolder(folder: string) {
  fs.readdir(folder, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const filePath = path.join(folder, file.name);

      if (file.isDirectory()) {
        watchFolder(filePath); // recursively watch subfolders
      } else {
        fs.watchFile(filePath, (curr, prev) => {
          if (curr.mtime !== prev.mtime) {
            fs.readFile(filePath, 'utf8', (err, data) => {
              if (err) throw err;
              if (data.length > 0) {
                const cmd = spawn('pnpm', ['run deploy'], { stdio: 'inherit' });
                cmd.stdout &&
                  cmd.stdout.on('data', (data: string) => {
                    console.log(`stdout: ${data}`);
                  });

                cmd.stderr &&
                  cmd.stderr.on('data', (data: string) => {
                    console.error(`stderr: ${data}`);
                  });

                cmd.on('close', (code: string) => {
                  console.log(`child process exited with code ${code}`);
                });
              }
            });
          }
        });
      }
    });
  });
}

watchFolder(`./${process.env.HASHICUPS_ORDERS_FOLDER_NAME || 'Orders'}`);
