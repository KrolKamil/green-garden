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
      subject: "Twoje konto zostało dodane do serwisu GreenGarden",
      html: `<p>W celu aktywacji swojego konta oraz dokończenia procesu rejestracji kliknij link znajdujący się poniżej.</p>
      <a href="localhost:3000/signup-screen/${id}">Dokończenie procesu rejestracji</a>`,
      text: `W celu aktywacji swojego konta oraz dokończenia procesu rejestracji wklej adres znajdujący się poniżej do paska adresu przeglądarki:
      localhost:3000/signup-screen/${id}`,
    });
  }

  sendNoticeMail(email: string, title: string) {
    return this.transporter.sendMail({
      from: this.mailFrom,
      to: email,
      subject: "Nowa ważna wiadomość dostępna w Strefie Najemcy GreenGarden",
      text: `Nowa wiadomość pod tytułem "${title}" została dodana do listy ogłoszeń. Zaloguj się w Strefie Najemcy, aby zabaczyć szczegóły wiadomości.`,
    });
  }
}
