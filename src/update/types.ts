export type DomainConfig = {
  domain: string;
  ip?: string;
  port: string;
};

export type UpdateRecordProps = {
  token: string;
  domains: DomainConfig[];
};
