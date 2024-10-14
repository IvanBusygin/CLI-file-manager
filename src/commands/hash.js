import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createHash } from 'crypto';
import {getArgument} from "./commands.js";

const {stdout} = process;

export const calculateHash = async (input) => {
  const sourceFilePath = getArgument(input, 1);
  const hash = createHash('sha256');
  const inputFile = createReadStream(sourceFilePath);

  await pipeline(inputFile, hash.setEncoding('hex'), stdout, { end: false });
};
