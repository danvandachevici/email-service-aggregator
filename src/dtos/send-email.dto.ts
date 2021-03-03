export class SendEmailDto {
  to: string[];
  cc?: string[];
  subject: string;
  body: string;
  contentType?: string;
}