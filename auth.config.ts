import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Injectable()
export class AuthConfig {
    constructor(private readonly configService: ConfigService) {}

    get databaseHost(): string { return this.configService.getOrThrow<string>('DATABASE_HOST'); }
    get databasePort(): number { return this.configService.getOrThrow<number>('DATABASE_PORT'); }
    get databaseUsername(): string { return this.configService.getOrThrow<string>('DATABASE_USERNAME'); }
    get databasePassword(): string { return this.configService.getOrThrow<string>('DATABASE_PASSWORD'); }
    get databaseName(): string { return this.configService.getOrThrow<string>('DATABASE_NAME'); }
    get databaseSynchronize(): boolean { return this.configService.getOrThrow<boolean>('DATABASE_SYNCRONIZE'); }
    get databaseLogging(): boolean { return this.configService.getOrThrow<boolean>('DATABASE_LOGGING'); }
    get databaseMigrationsRun(): boolean { return this.configService.getOrThrow<boolean>('DATABASE_MIGRATIONSRUN'); }
    get databaseMaxExecutionTime(): number { return this.configService.getOrThrow<number>('DATABASE_MAXEXECUTIONTIME'); }
    get databaseConnectionName(): string { return this.configService.getOrThrow('DATABASE_CONNECTIONNAME'); }

    get jwtSecret(): string { return this.configService.getOrThrow('JWT_SECRET'); }
    get jwtExpiresIn(): number { return this.configService.getOrThrow('JWT_EXPIRESIN'); }
    get jwtRefreshSecret(): string { return this.configService.getOrThrow('JWT_REFRESH_SECRET'); }
    get jwtRefreshExpiresIn(): number { return this.configService.getOrThrow('JWT_REFRESH_EXPIRESIN'); }
}

export const authConfigSchema = Joi.object({
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_SYNCRONIZE: Joi.boolean().required(),
    DATABASE_LOGGING: Joi.boolean().required(),
    DATABASE_MIGRATIONSRUN: Joi.boolean().required(),
    DATABASE_MAXEXECUTIONTIME: Joi.number().required(),
                
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRESIN: Joi.number().integer().positive().required(),
    JWT_REFRESH_SECRET: Joi.string().required(),
    JWT_REFRESH_EXPIRESIN: Joi.number().integer().positive().required()
});