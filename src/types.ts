export interface IHttpException {
  success: boolean;
  statusCode: number;
  error: string;
  code: string;
  message: string;
  details?: any;
}
export interface ISuccessfulAuthResponse {
  success: boolean;
  data: {
    tokens: {
      access: string;
      refresh: string;
    };
    account: { [key: string]: any };
    token_expiry: number;
  };
}
