import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from './currency.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { AxiosResponse } from 'axios';
import { of, throwError } from 'rxjs';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpService: HttpService;
  let configService: ConfigService;
  let cacheManager: Record<string, any>;

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    service = module.get<CurrencyService>(CurrencyService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
    cacheManager = module.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUsdToXafRate', () => {
    it('should return cached rate if available', async () => {
      // Arrange
      const cachedRate = 602.5;
      mockCacheManager.get.mockResolvedValue(cachedRate);

      // Act
      const result = await service.getUsdToXafRate();

      // Assert
      expect(result).toBe(cachedRate);
      expect(mockCacheManager.get).toHaveBeenCalledWith('usd_to_xaf_rate');
      expect(mockHttpService.get).not.toHaveBeenCalled();
    });

    it('should fetch rate from API when cache is empty', async () => {
      // Arrange
      const apiKey = 'test-api-key';
      const apiResponse: AxiosResponse = {
        data: {
          rates: {
            XAF: 605.75,
          },
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { url: '' } as any,
      };

      mockCacheManager.get.mockResolvedValue(null);
      mockConfigService.get.mockReturnValue(apiKey);
      mockHttpService.get.mockReturnValue(of(apiResponse));

      // Act
      const result = await service.getUsdToXafRate();

      // Assert
      expect(result).toBe(605.75);
      expect(mockCacheManager.get).toHaveBeenCalledWith('usd_to_xaf_rate');
      expect(mockConfigService.get).toHaveBeenCalledWith('EXCHANGE_RATE_API_KEY');
      expect(mockHttpService.get).toHaveBeenCalledWith(`https://api.exchangerate-api.com/v4/latest/USD?key=${apiKey}`);
      expect(mockCacheManager.set).toHaveBeenCalledWith('usd_to_xaf_rate', 605.75, { ttl: 3600 });
    });

    it('should return fallback rate when API request fails', async () => {
      // Arrange
      mockCacheManager.get.mockResolvedValue(null);
      mockConfigService.get.mockReturnValue('test-api-key');
      mockHttpService.get.mockReturnValue(throwError(() => new Error('API request failed')));

      // Act
      const result = await service.getUsdToXafRate();

      // Assert
      expect(result).toBe(600); // Fallback rate is 600
      expect(mockCacheManager.get).toHaveBeenCalledWith('usd_to_xaf_rate');
      expect(mockHttpService.get).toHaveBeenCalled();
      expect(mockCacheManager.set).not.toHaveBeenCalled();
    });
  });

  describe('convertUsdToXaf', () => {
    it('should correctly convert USD to XAF and round the result', async () => {
      // Arrange
      const usdAmount = 25.99;
      const xafRate = 605.5;

      jest.spyOn(service, 'getUsdToXafRate').mockResolvedValue(xafRate);

      // Act
      const result = await service.convertUsdToXaf(usdAmount);

      // Assert
      // 25.99 * 605.5 = 15736.945, which should be rounded to 15737
      expect(result).toBe(15737);
      expect(service.getUsdToXafRate).toHaveBeenCalled();
    });

    it('should handle zero amount correctly', async () => {
      // Arrange
      const usdAmount = 0;
      const xafRate = 605.5;

      jest.spyOn(service, 'getUsdToXafRate').mockResolvedValue(xafRate);

      // Act
      const result = await service.convertUsdToXaf(usdAmount);

      // Assert
      expect(result).toBe(0);
      expect(service.getUsdToXafRate).toHaveBeenCalled();
    });

    it('should handle negative amount correctly', async () => {
      // Arrange
      const usdAmount = -10.5;
      const xafRate = 605.5;

      jest.spyOn(service, 'getUsdToXafRate').mockResolvedValue(xafRate);

      // Act
      const result = await service.convertUsdToXaf(usdAmount);

      // Assert
      // -10.5 * 605.5 = -6357.75, which should be rounded to -6358
      expect(result).toBe(-6358);
      expect(service.getUsdToXafRate).toHaveBeenCalled();
    });

    it('should correctly handle fractional cents', async () => {
      // Arrange
      const usdAmount = 0.01;
      const xafRate = 605.5;

      jest.spyOn(service, 'getUsdToXafRate').mockResolvedValue(xafRate);

      // Act
      const result = await service.convertUsdToXaf(usdAmount);

      // Assert
      // 0.01 * 605.5 = 6.055, which should be rounded to 6
      expect(result).toBe(6);
      expect(service.getUsdToXafRate).toHaveBeenCalled();
    });
  });
});
