import getConfig from 'config';

export type ConfigName = 'modules' ;

export function config<T>(name: ConfigName): T {
  console.log(name);
  return getConfig.get(name) as T;
}
