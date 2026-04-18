import { Logger } from 'tslog';

export const logger = new Logger({
  name: 'PetConnect',
  type: process.env.NODE_ENV === 'production' ? 'json' : 'pretty',
  prettyLogTemplate:
    '{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{mm}}:{{ss}} {{logLevelName}} ',
});
