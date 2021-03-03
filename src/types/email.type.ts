import { SendEmailDto } from "src/dtos/send-email.dto";

export class EmailType {
  to: string[];
  cc: string[];
  subject: string;
  body: string;
  contentType?: string;
  
  constructor(params: SendEmailDto) {
    Object.assign(this, params);
  }
}