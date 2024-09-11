export interface paths {
    "/v1/domains-public/record": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Returns data for the domain */
        get: operations["getV1Domains-publicRecord"];
        put?: never;
        /** @description Updates domain data */
        post: operations["postV1Domains-publicRecord"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: never;
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    "getV1Domains-publicRecord": {
        parameters: {
            query: {
                domain: string;
            };
            header: {
                /** @description Bearer YOUR_TOKEN */
                authorization: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @default true */
                        ok: boolean;
                        ip: string;
                        /** @default 80 */
                        port: number;
                    };
                    "multipart/form-data": {
                        /** @default true */
                        ok: boolean;
                        ip: string;
                        /** @default 80 */
                        port: number;
                    };
                    "text/plain": {
                        /** @default true */
                        ok: boolean;
                        ip: string;
                        /** @default 80 */
                        port: number;
                    };
                };
            };
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @default false */
                        ok: boolean;
                    };
                    "multipart/form-data": {
                        /** @default false */
                        ok: boolean;
                    };
                    "text/plain": {
                        /** @default false */
                        ok: boolean;
                    };
                };
            };
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @default false */
                        ok: boolean;
                    };
                    "multipart/form-data": {
                        /** @default false */
                        ok: boolean;
                    };
                    "text/plain": {
                        /** @default false */
                        ok: boolean;
                    };
                };
            };
        };
    };
    "postV1Domains-publicRecord": {
        parameters: {
            query?: never;
            header: {
                /** @description Bearer YOUR_TOKEN */
                authorization: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    domain: string;
                    /** @default 80 */
                    port: number;
                    /** Format: ipv4 */
                    ip?: string;
                    dry?: string;
                };
                "multipart/form-data": {
                    domain: string;
                    /** @default 80 */
                    port: number;
                    /** Format: ipv4 */
                    ip?: string;
                    dry?: string;
                };
                "text/plain": {
                    domain: string;
                    /** @default 80 */
                    port: number;
                    /** Format: ipv4 */
                    ip?: string;
                    dry?: string;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @default true */
                        ok: boolean;
                        dry: boolean;
                    };
                    "multipart/form-data": {
                        /** @default true */
                        ok: boolean;
                        dry: boolean;
                    };
                    "text/plain": {
                        /** @default true */
                        ok: boolean;
                        dry: boolean;
                    };
                };
            };
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @default false */
                        ok: boolean;
                    };
                    "multipart/form-data": {
                        /** @default false */
                        ok: boolean;
                    };
                    "text/plain": {
                        /** @default false */
                        ok: boolean;
                    };
                };
            };
        };
    };
}
