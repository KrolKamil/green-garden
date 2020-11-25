import { createTransport } from "nodemailer";
import { AppConfig } from "../../../config/app";

interface MailServiceDependencies {
  appConfig: AppConfig;
}

export class MailService {
  private transporter: ReturnType<typeof createTransport>;

  private mailFrom: string;

  private frontendRegisterUserLink: string;

  constructor(private dependencies: MailServiceDependencies) {
    const { mailHost, mailPort, mailFrom, frontendRegisterUserLink } = this.dependencies.appConfig;
    this.mailFrom = mailFrom;
    this.frontendRegisterUserLink = frontendRegisterUserLink;
    this.transporter = createTransport({
      host: mailHost,
      port: mailPort,
    });
  }

  sendInviteMail(email: string, id: string) {
    return this.transporter.sendMail({
      from: this.mailFrom,
      to: email,
      subject: "Green Garden activation link",
      text: `${id}
            ${this.frontendRegisterUserLink}/${id}`,
    });
  }

  sendNoticeMail(email: string, title: string){
    return this.transporter.sendMail({
      from: this.mailFrom,
      to: email,
      subject: "Green Garden important notice",
      text: `Important notice of title: "${title}" has been added. Please log in to application and check content of it.`,
    });
  }

  sendTestMail() {
    return this.transporter.sendMail({
      from: "test@test.com",
      to: "test1@test.com",
      subject: "Test2",
      text: "test3",
    });
  }
}
