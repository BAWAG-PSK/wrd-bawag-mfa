import { config } from './config';

export interface Module {
  apiUrl: string | null;
  assetsUrl: string | null;
  path: string;
}

export const modules: { [id: string]: Module } = config('modules');
