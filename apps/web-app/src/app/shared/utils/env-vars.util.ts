import { EnvVar } from '../enums/environment.enum';
import { environment } from '../../../environments/environment';

export function getEnvVar(envVar: EnvVar): string {
  const value = process.env[envVar];
  console.log('getEnvVar', envVar, value);
  if (value == null) {
    throw Error(
      `The environment variable ${envVar} does not exist in the apps/web-app/.env file.`
    );
  }
  return process.env[envVar] as string;
}

export function isProd(): boolean {
  return environment.production;
}

export function isDev(): boolean {
  return !environment.production;
}

export function isUseMockInDev(): boolean {
  return environment.useMockInDev;
}
