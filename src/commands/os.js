import {EOL, userInfo, arch} from 'os';
import {availableParallelism, cpus} from 'os';
import {getHomeDir} from "../utils/utils.js";

export const osEol = () => {
  console.log(`System End-Of-Line (EOL): ${JSON.stringify(EOL)}`);
};

export const osCpus = () => {
  const cpuData = cpus();
  const coreCount = availableParallelism();
  const cpuInfoArray = [];

  console.log(`Number of cores: ${coreCount}`);
  cpuData.forEach((core) => {
    cpuInfoArray.push({Model: core.model, Speed: `${(core.speed / 1000).toFixed(2)} GHz`});
  });

  console.table(cpuInfoArray, ['Model', 'Speed']);
};

export const homeDir = () => {
  console.log(`Home directory: ${getHomeDir()}`);
};

export const userName = () => {
  const user = userInfo();
  console.log(`Current system user name: ${user.username}`);
};

export const architecture = () => {
  console.log(`Node.js binary architecture: ${arch()}`);
};
