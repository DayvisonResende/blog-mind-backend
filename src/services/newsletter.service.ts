import {
  NewsletterRepository,
  newsletterRepository,
} from '../repositories/newsletter.repository';

/**
 * Regra de negocio da newsletter: inscreve um e-mail de forma idempotente
 * (se ja inscrito, nao gera erro — apenas informa).
 */
export class NewsletterService {
  constructor(private readonly newsletter: NewsletterRepository = newsletterRepository) {}

  async subscribe(email: string): Promise<{ subscribed: boolean; alreadySubscribed: boolean }> {
    const existing = await this.newsletter.findByEmail(email);
    if (existing) {
      return { subscribed: true, alreadySubscribed: true };
    }
    await this.newsletter.create(email);
    return { subscribed: true, alreadySubscribed: false };
  }
}

export const newsletterService = new NewsletterService();
