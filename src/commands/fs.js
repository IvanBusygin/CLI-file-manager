import path from 'path';
import fs from 'fs/promises';
import {createReadStream, createWriteStream} from 'fs';
import {pipeline} from 'stream/promises';
import {getArgument} from "./commands.js";
import {isFileExists, getCurrentWorkingDirectory, sortFn} from "../utils/utils.js";

const {chdir, stdout} = process;

export const up = () => {
  chdir('..');
};

export const cd = (input) => {
  const newPath = getArgument(input, 1);

  chdir(newPath);
};

export const ls = async () => {
  const cwd = getCurrentWorkingDirectory();
  const files = await fs.readdir(cwd);

  const fileInfoArr = await Promise.all(files.map(async (file) => {
    const fileStat = await fs.stat(path.resolve(cwd, file));
    return {
      Name: file,
      Type: fileStat.isFile() ? 'file' : 'directory'
    };
  }));

  const sortedFileInfoArr = fileInfoArr.sort((a, b) => {
    if (a.Type === b.Type) {
      return sortFn(a.Name, b.Name);
    }
    return a.Type === 'directory' ? -1 : 1;
  });

  console.table(sortedFileInfoArr, ['Name', 'Type']);
};


export const cat = async (input) => {
  const parsedPath = getArgument(input, 1);
  const sourceFilePath = path.resolve(getCurrentWorkingDirectory(), parsedPath);
  const sourceStream = createReadStream(sourceFilePath);

  await pipeline(sourceStream, stdout, {end: false});
};

export const add = async (input) => {
  const newFilename = getArgument(input, 1);
  const filename = path.basename(newFilename);
  const filePath = path.resolve(getCurrentWorkingDirectory(), filename);

  await fs.writeFile(filePath, '', {flag: 'wx'});
};

export const rn = async (input) => {
  const parsedSourcePath = getArgument(input, 1);
  const parsedDestPath = getArgument(input, 2);

  const destFilename = path.basename(parsedDestPath);
  const sourceFilePath = path.resolve(getCurrentWorkingDirectory(), parsedSourcePath);
  const sourceFileDir = path.dirname(sourceFilePath);
  const renamedFilePath = path.resolve(sourceFileDir, destFilename);

  await fs.rename(sourceFilePath, renamedFilePath);
};

export const cp = async (input) => {
  const sourcePath = getArgument(input, 1);
  const destPath = getArgument(input, 2);
  const sourceFilePath = path.resolve(getCurrentWorkingDirectory(), sourcePath);
  const destFolderPath = path.resolve(getCurrentWorkingDirectory(), destPath);

  await isFileExists(sourceFilePath);

  const sourceFilename = path.basename(sourceFilePath);
  const destFilePath = path.resolve(destFolderPath, sourceFilename);

  const sourceStream = createReadStream(sourceFilePath);
  const destStream = createWriteStream(destFilePath);

  await pipeline(sourceStream, destStream);
};

export const rm = async (input) => {
  const sourcePath = getArgument(input, 1);
  const sourceFilePath = path.resolve(getCurrentWorkingDirectory(), sourcePath);

  await fs.unlink(sourceFilePath);
};


export const mv = async (input) => {
  await cp(input);
  await rm(input);
};
