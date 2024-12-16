import chalk from 'chalk';

const timestamp = () => new Date().toLocaleTimeString();

const log = console.log;

const divider = () => console.log('——————————————————————————————————————————');

const success = (msg?: any, ...optionalParams: any[]) => {
  console.log(
    chalk.blueBright(timestamp()),
    '|',
    chalk.greenBright('SUCCESS'),
    '|',
    msg,
    ...optionalParams
  );
};

const info = (msg?: any, ...optionalParams: any[]) => {
  console.log(
    chalk.blueBright(timestamp()),
    '|',
    chalk.yellowBright('INFO   '),
    '|',
    msg,
    ...optionalParams
  );
};

const error = (msg?: any, ...optionalParams: any[]) => {
  console.log(
    chalk.blueBright(timestamp()),
    '|',
    chalk.redBright('ERROR  '),
    '|',
    msg,
    ...optionalParams
  );
};

export type Logger = {
  divider: () => void;
  log: (message?: any, ...optionalParams: any[]) => void;
  success: (msg?: any, ...optionalParams: any[]) => void;
  info: (msg?: any, ...optionalParams: any[]) => void;
  error: (msg?: any, ...optionalParams: any[]) => void;
};

export default <Logger>{
  log,
  divider,
  success,
  info,
  error,
};
