const colors = {
  black: '\x1b[30m',
  blue: '\x1b[34m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  turquoise: '\x1b[36m',
  yellow: '\x1b[33m',
  resetColor: '\x1b[0m',
};

export const consoleColors = {
  black: `${colors.black}%s${colors.resetColor}`,
  blue: `${colors.blue}%s${colors.resetColor}`,
  green: `${colors.green}%s${colors.resetColor}`,
  red: `${colors.red}%s${colors.resetColor}`,
  turquoise: `${colors.turquoise}%s${colors.resetColor}`,
  yellow: `${colors.yellow}%s${colors.resetColor}`,
};
