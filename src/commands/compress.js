import path from "path";
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import {getArgument} from "./commands.js";
import {consoleLog, isFileExists} from "../utils/utils.js";

export const compress = async (input) => {
  const sourceFilePath = getArgument(input, 1);
  const destFilePath = getArgument(input, 2);

  const ext = path.extname(destFilePath);
  if (ext !== '.gz' && ext !== '.br') {
    consoleLog('Extname for compressed file should be .gz or .br', 'yellow');
    return;
  }

  await isFileExists(sourceFilePath);

  const gzip = createBrotliCompress();
  const sourceStream = createReadStream(sourceFilePath);
  const destStream = createWriteStream(destFilePath);

  await pipeline(sourceStream, gzip, destStream);
};

export const decompress = async (input) => {
  const sourceFilePath = getArgument(input, 1);
  const destFilePath = getArgument(input, 2);

  await isFileExists(sourceFilePath);

  const gzip = createBrotliDecompress();
  const sourceStream = createReadStream(sourceFilePath);
  const destStream = createWriteStream(destFilePath);

  await pipeline(sourceStream, gzip, destStream);
};
