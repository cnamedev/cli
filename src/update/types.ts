export type DomainConfig = {
  /**
   * @description Domain name
   */
  domain: string;
  /**
   * @description IP address to which the domain will be mapped. If not specified, it will be determined automatically.
   */
  ip?: string;
  /**
   * @description Port to which the domain will be mapped.
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
   */
  token: string;
  /**
   * @description Dry run.
   */
  dry?: boolean;
  /**
   * @description Domains to update
   */
  domains: DomainConfig[];
};
