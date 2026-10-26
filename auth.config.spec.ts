import { ConfigService } from '@nestjs/config';
import { AuthConfig, authConfigSchema } from './auth.config';
describe('AuthConfig', () => {
  it.each([
    { property: 'databaseHost', key: 'DATABASE_HOST', value: 'value' },
    { property: 'databasePort', key: 'DATABASE_PORT', value: 123 },
    { property: 'databaseUsername', key: 'DATABASE_USERNAME', value: 'value' },
    { property: 'databasePassword', key: 'DATABASE_PASSWORD', value: 'value' },
    { property: 'databaseName', key: 'DATABASE_NAME', value: 'value' },
    {
      property: 'databaseSynchronize',
      key: 'DATABASE_SYNCRONIZE',
      value: false,
    },
    { property: 'databaseLogging', key: 'DATABASE_LOGGING', value: false },
    {
      property: 'databaseMigrationsRun',
      key: 'DATABASE_MIGRATIONSRUN',
      value: false,
    },
    {
      property: 'databaseMaxExecutionTime',
      key: 'DATABASE_MAXEXECUTIONTIME',
      value: 123,
    },
    {
      property: 'databaseConnectionName',
      key: 'DATABASE_CONNECTIONNAME',
      value: 'value',
    },
    { property: 'jwtSecret', key: 'JWT_SECRET', value: 'value' },
    { property: 'jwtExpiresIn', key: 'JWT_EXPIRESIN', value: 123 },
    { property: 'jwtRefreshSecret', key: 'JWT_REFRESH_SECRET', value: 'value' },
    {
      property: 'jwtRefreshExpiresIn',
      key: 'JWT_REFRESH_EXPIRESIN',
      value: 123,
    },
  ] as const)('$property consulta $key', ({ property, key, value }) => {
    const getOrThrow = jest.fn().mockReturnValue(value);
    expect(
      new AuthConfig({ getOrThrow } as unknown as ConfigService)[property],
    ).toBe(value);
    expect(getOrThrow).toHaveBeenCalledWith(key);
  });
  it.each([
    { property: 'databaseHost', key: 'DATABASE_HOST', value: 'value' },
    { property: 'databasePort', key: 'DATABASE_PORT', value: 123 },
    { property: 'databaseUsername', key: 'DATABASE_USERNAME', value: 'value' },
    { property: 'databasePassword', key: 'DATABASE_PASSWORD', value: 'value' },
    { property: 'databaseName', key: 'DATABASE_NAME', value: 'value' },
    {
      property: 'databaseSynchronize',
      key: 'DATABASE_SYNCRONIZE',
      value: false,
    },
    { property: 'databaseLogging', key: 'DATABASE_LOGGING', value: false },
    {
      property: 'databaseMigrationsRun',
      key: 'DATABASE_MIGRATIONSRUN',
      value: false,
    },
    {
      property: 'databaseMaxExecutionTime',
      key: 'DATABASE_MAXEXECUTIONTIME',
      value: 123,
    },
    {
      property: 'databaseConnectionName',
      key: 'DATABASE_CONNECTIONNAME',
      value: 'value',
    },
    { property: 'jwtSecret', key: 'JWT_SECRET', value: 'value' },
    { property: 'jwtExpiresIn', key: 'JWT_EXPIRESIN', value: 123 },
    { property: 'jwtRefreshSecret', key: 'JWT_REFRESH_SECRET', value: 'value' },
    {
      property: 'jwtRefreshExpiresIn',
      key: 'JWT_REFRESH_EXPIRESIN',
      value: 123,
    },
  ] as const)('$property propaga una variable ausente', ({ property }) => {
    const error = new Error('missing config');
    const config = new AuthConfig({
      getOrThrow: () => {
        throw error;
      },
    } as unknown as ConfigService);
    expect(() => config[property]).toThrow(error);
  });
  const valid = {
    DATABASE_HOST: 'localhost',
    DATABASE_PORT: 5432,
    DATABASE_USERNAME: 'user',
    DATABASE_PASSWORD: 'secret',
    DATABASE_NAME: 'auth',
    DATABASE_SYNCRONIZE: false,
    DATABASE_LOGGING: false,
    DATABASE_MIGRATIONSRUN: true,
    DATABASE_MAXEXECUTIONTIME: 1000,
    JWT_SECRET: 'secret',
    JWT_EXPIRESIN: 600,
    JWT_REFRESH_SECRET: 'refresh',
    JWT_REFRESH_EXPIRESIN: 3600,
  };
  it('acepta configuracion valida', () => {
    expect(authConfigSchema.validate(valid).error).toBeUndefined();
  });
  it.each(Object.keys(valid))('requiere %s', (key) => {
    const input: Record<string, unknown> = { ...valid };
    delete input[key];
    expect(authConfigSchema.validate(input).error?.details[0].path).toEqual([
      key,
    ]);
  });
  it.each([0, -1, 1.5, 'invalid'])(
    'rechaza expiracion invalida: %s',
    (value) => {
      for (const key of ['JWT_EXPIRESIN', 'JWT_REFRESH_EXPIRESIN'])
        expect(
          authConfigSchema.validate({ ...valid, [key]: value }).error
            ?.details[0].path,
        ).toEqual([key]);
    },
  );
});
