
declare module '@dr.pogodin/csurf' {
    import express from 'express'

    declare global {
        namespace Express {
            interface Request {
                csrfToken(): string;
            }
        }
    }

    declare namespace csurf {
        interface CookieOptions extends express.CookieOptions {
            /**
             * @default '_csrf'
             */
            key?: string | undefined;
        }
    }
    
    export default function csurf(options?: {
        value?: ((req: express.Request) => string) | undefined;
        /**
         * @default false
         */
        cookie?: csurf.CookieOptions | boolean | undefined;
        ignoreMethods?: string[] | undefined;
        sessionKey?: string | undefined;
    }): express.RequestHandler;
}
