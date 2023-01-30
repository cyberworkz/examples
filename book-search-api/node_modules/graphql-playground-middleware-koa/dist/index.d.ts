import { Context, Next } from 'koa';
import { MiddlewareOptions } from 'graphql-playground-html';
export declare type KoaPlaygroundMiddlewareOptions = MiddlewareOptions;
export declare type KoaPlaygroundMiddleware = (ctx: Context, next: Next) => Promise<void>;
export declare type Register = (options: KoaPlaygroundMiddlewareOptions) => KoaPlaygroundMiddleware;
declare const koa: Register;
export default koa;
