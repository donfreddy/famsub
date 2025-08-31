import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { Currency } from '../../common/helpers';

@Injectable()
export class CurrencyService {
  private readonly exchangeRates = {
    USD: 1, // base
    XAF: 675, // exemple : 1 USD = 675 XAF
  };

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getUsdToXafRate(): Promise<number> {
    // Essayez d'abord de récupérer le taux depuis le cache
    try {
      // Si vous utilisez une API d'échange comme ExchangeRate-API ou similaire
      const apiKey = this.configService.get<string>('EXCHANGE_RATE_API_KEY');
      const response = await lastValueFrom(
        this.httpService.get(`https://api.exchangerate-api.com/v4/latest/USD?key=${apiKey}`),
      );

      const xafRate = response.data.rates.XAF;

      // Stockez le taux dans le cache
      // Vous pouvez utiliser un cache comme Redis ou le cache intégré de NestJS
      return xafRate;
    } catch (error) {

      // En cas d'erreur, utilisez un taux par défaut (à mettre à jour régulièrement)
      // 1 USD = environ 600 XAF (à ajuster selon le taux actuel)
      return 600;
    }
  }

  convert(amount: number, from: Currency, to: Currency): number {
    const usdAmount = amount / this.exchangeRates[from];
    return parseFloat((usdAmount * this.exchangeRates[to]).toFixed(2));
  }

  toXAF(amountUSD: number): number {
    return this.convert(amountUSD, Currency.USD, Currency.XAF);
  }

  getExchangeRate(from: Currency, to: Currency): number {
    return this.exchangeRates[to] / this.exchangeRates[from];
  }

  async convertUsdToXaf(amountUsd: number): Promise<number> {
    const rate = await this.getUsdToXafRate();
    // Convertir et arrondir au franc CFA le plus proche
    return Math.round(amountUsd * rate);
  }
}
