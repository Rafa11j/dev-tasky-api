import { IHashProvider } from '@domain/providers/hash/models/IHashProvider';
import { IJwtProvider } from '@domain/providers/jwt/models/IJwtProvider';
import { ITokenProvider } from '@domain/providers/token/models/ITokenProvider';
import { BcryptProvider } from '@infrastructure/providers/hashProvider/implementations/BcryptProvider';
import { JsonWebTokenProvider } from '@infrastructure/providers/jwtProvider/implementations/JsonWebTokenProvider';
import { UuidProvider } from '@infrastructure/providers/tokenProvider/implementations/UuidProvider';
import { container } from 'tsyringe';

container.registerSingleton<ITokenProvider>('TokenProvider', UuidProvider);

container.registerSingleton<IHashProvider>('HashProvider', BcryptProvider);

container.registerSingleton<IJwtProvider>('JwtProvider', JsonWebTokenProvider);
