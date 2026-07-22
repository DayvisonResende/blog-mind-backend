import { prisma } from '../config/prisma';

export class NewsletterRepository {
  findByEmail(email: string) {
    return prisma.newsletterSubscriber.findUnique({ where: { email } });
  }

  create(email: string) {
    return prisma.newsletterSubscriber.create({ data: { email } });
  }
}

export const newsletterRepository = new NewsletterRepository();
