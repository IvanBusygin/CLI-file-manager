import {COMMANDS} from "../constants/consts.js";

export const getArguments = (input) => {
  return input.trim().match(/[^\s"]+|"[^"]*"/g) || [];
};

export const getArgument = (input, argNumber) => {
  const args = getArguments(input);
  let argument = args[argNumber] || '';

  if (argument.startsWith('"') && argument.endsWith('"')) {
    argument = argument.slice(1, -1);
  }

  return argument;
};

export const checkArgumentCount = (command, input) => {
  const commandInfo = Object.values(COMMANDS).find(cmd => cmd.command === command);

  if (commandInfo) {
    const { numberArgs } = commandInfo;
    const args = getArguments(input);

    if (args.length - 1 !== numberArgs) {
      throw new Error(`Incorrect number of arguments provided. Expected ${numberArgs} arguments.`);
    }
  }
};

export const parseCommand = (input) => {
  const command = getArgument(input, 0);

  checkArgumentCount(command, input);

  if (command === COMMANDS.OS.command) {
    return getArgument(input, 1);
  }

  return command;
};

