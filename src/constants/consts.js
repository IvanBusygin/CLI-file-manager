export const consts = {
  argUsername: '--username=',
}

export const COMMANDS = {
  ADD: {command: 'add', numberArgs: 1},
  CAT: {command: 'cat', numberArgs: 1},
  CD: {command: 'cd', numberArgs: 1},
  COMPRESS: {command: 'compress', numberArgs: 2},
  CP: {command: 'cp', numberArgs: 2},
  DECOMPRESS: {command: 'decompress', numberArgs: 2},
  EXIT: {command: '.exit', numberArgs: 0},
  HASH: {command: 'hash', numberArgs: 1},
  LS: {command: 'ls', numberArgs: 0},
  MV: {command: 'mv', numberArgs: 2},
  OS: {command: 'os', numberArgs: 1},
  OS_ARCH: {command: '--architecture'},
  OS_CPUS: {command: '--cpus'},
  OS_EOL: {command: '--EOL'},
  OS_HOMEDIR: {command: '--homedir'},
  OS_USERNAME: {command: '--username'},
  RM: {command: 'rm', numberArgs: 1},
  RN: {command: 'rn', numberArgs: 2},
  UP: {command: 'up', numberArgs: 0},
};
