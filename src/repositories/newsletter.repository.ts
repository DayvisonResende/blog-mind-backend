import { prisma } from '../config/prisma';

/** Acesso a dados das inscricoes na newsletter. */
export class NewsletterRepository {
  findByEmail(email: string) {
    return prisma.newsletterSubscriber.findUnique({ where: { email } });
  }

  create(email: string) {
    return prisma.newsletterSubscriber.create({ data: { email } });
  }
}

export const newsletterRepository = new NewsletterRepository();
