import fs from "fs";

export const readFileLines = (filepath: string) =>
  fs.readFileSync(filepath).toString().replace(/\r\n/g, "\n").split("\n");

/**
 * Sleeps for ms (async timeout)
 * @param ms number of ms to wait
 * @returns
 */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getRandomInteger = (from: number, to: number) => {
  return Math.floor(Math.random() * (to - from + 1)) + from;
};

export const getRandomNumber = (from: number, to: number) => Math.random() * (to - from) + from;
