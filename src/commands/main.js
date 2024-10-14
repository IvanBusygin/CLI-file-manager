import {consoleLog, getCurrentWorkingDirectory, getHomeDir, getUserName} from "../utils/utils.js";
import {COMMANDS} from "../constants/consts.js";
import {parseCommand} from "./commands.js";
import {add, cat, cd, cp, ls, mv, rm, rn, up} from "./fs.js";
import {osEol, osCpus, homeDir, userName, architecture} from "./os.js";
import {calculateHash} from "./hash.js";
import {compress, decompress} from "./compress.js";

export const setStartHomeDir = () => {
  const homeDir = getHomeDir();

  process.chdir(homeDir);
};

export const welcomeUser = () => {
  const username = getUserName();

  consoleLog(`Welcome to the File Manager, ${username}!`, 'turquoise');
  consoleLog(`You are currently in ${getCurrentWorkingDirectory()}`, 'blue');
};


export const subscribeEvents = () => {
  process.on('SIGINT', () => {
    process.exit(0);
  });

  process.on('exit', () => {
    consoleLog(`Thank you for using File Manager, ${getUserName()}, goodbye!`, 'yellow');
  });

  process.stdin.on('data', async (data) => {
    try {
      const input = data.toString().replace(/\r?\n|\r/g, '');
      const command = parseCommand(input);

      switch (command) {
        case COMMANDS.UP.command:
          up();
          break;

        case COMMANDS.CD.command:
          cd(input);
          break;

        case COMMANDS.LS.command:
          await ls();
          break;

        case COMMANDS.CAT.command:
          await cat(input);
          break;

        case COMMANDS.ADD.command:
          await add(input);
          break;

        case COMMANDS.RN.command:
          await rn(input);
          break;

        case COMMANDS.CP.command:
          await cp(input);
          break;

        case COMMANDS.MV.command:
          await mv(input);
          break;

        case COMMANDS.RM.command:
          await rm(input);
          break;

        case COMMANDS.HASH.command:
          await calculateHash(input);
          break;

        case COMMANDS.COMPRESS.command:
          await compress(input);
          break;

        case COMMANDS.DECOMPRESS.command:
          await decompress(input);
          break;

        case COMMANDS.OS_EOL.command:
          osEol();
          break;

        case COMMANDS.OS_CPUS.command:
          osCpus();
          break;

        case COMMANDS.OS_HOMEDIR.command:
          homeDir();
          break;

        case COMMANDS.OS_USERNAME.command:
          userName();
          break;

        case COMMANDS.OS_ARCH.command:
          architecture();
          break;

        case COMMANDS.EXIT.command:
          process.exit(0);

        default:
          consoleLog('Invalid input', 'red');
          break;
      }
    } catch (err) {
      consoleLog(`Operation failed\n${err.message}`, 'red');
    }

    consoleLog(`\nYou are currently in ${getCurrentWorkingDirectory()}`, 'blue');
  })
};
