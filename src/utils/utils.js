import {homedir} from 'os';
import fs from 'fs/promises';
import {consoleColors} from "../constants/consoleColors.js";
import {consts} from "../constants/consts.js";

const {cwd} = process

export const consoleLog = (msg, color) => {
  console.log(consoleColors[color], msg);
}

export const getHomeDir = () => {
  return homedir();
};


export const getCurrentWorkingDirectory = () => {
  return cwd();
};

export const sortFn = (a, b) => {
  return a.localeCompare(b, ['en-US', 'ru-RU']);
};

export const isFileExists = (filePath) => {
  return fs.access(filePath)
    .then(() => true)
    .catch(() => {
      throw new Error('File does not exist.');
    });
};

export const getUserName = () => {
  const args = process.argv.slice(2);
  const argUserName = args.find((arg) => arg.startsWith(consts.argUsername));

  if (!argUserName) {
    consoleLog(`Please provide your name.`, 'red');
    consoleLog(`Please start the program again using the following command:\nnpm run start ${consts.argUsername}=your_username`, 'yellow');
    process.exit(1);
  }

  const username = argUserName.split('=')[1];

  if (!username) {
    consoleLog(`Your name is empty. Please provide a valid username.`, 'red');
    process.exit(1);
  }

  return username;
};