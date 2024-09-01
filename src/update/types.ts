export type DomainConfig = {
  /**
   * @description Domain name
   * @format string
   */
  domain: string;
  /**
   * @description IP address to which the domain will be mapped. If not specified, it will be determined automatically.
   * @format string
   */
  ip?: string;
  /**
   * @description Port to which the domain will be mapped.
   * @format string
   */
  port: string;
};

export type UpdateRecordProps = {
  /**
   * @description The JSON Schema URI for this configuration
   * @format uri
   */
  $schema?: string;
  /**
   * @description Your access token (create it in the dashboard at https://cname.dev).
   * @format string
   */
  token: string;
  /**
   * @description Domains to update
   */
  domains: DomainConfig[];
};
