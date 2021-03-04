import { Injectable } from "@nestjs/common";
import { EmailServiceInterface } from "src/interfaces/email-service.interface";
import { EmailType } from "src/types/email.type";

@Injectable()
export class SesService implements EmailServiceInterface {
  send(email: EmailType): Promise<any> {
    return Promise.reject('Can\'t execute send on ses');
  }

}