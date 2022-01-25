import { EnvVar } from '@shared/enums/environment.enum';

export function getEnvVar(envVar: EnvVar) {
  const value = process.env[envVar];
  if (value == null) {
    throw Error(
      `The environment variable ${envVar} does not exist in the apps/web-app/.env file.`
    );
  }
  return process.env[envVar];
}
