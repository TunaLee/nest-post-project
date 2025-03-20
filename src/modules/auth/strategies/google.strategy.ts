import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AppConfigService } from 'src/config/app/config.service';
import { RegisterType } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private appConfigService: AppConfigService,
    private usersService: UsersService,
  ) {
    super({
      clientID: appConfigService.googleClientId as string,
      clientSecret: appConfigService.googleClientSecret as string,
      callbackURL: appConfigService.googleCallbackUrl as string,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const user = await this.usersService.findUserBySocialId(
      profile._json.sub,
      RegisterType.GOOGLE,
    );
    if (user) done(null, user);
    const newUser = await this.usersService.createUser({
      email: profile._json.email as string,
      name: profile._json.name as string,
      socialId: profile._json.sub,
      registerType: RegisterType.GOOGLE,
    });
    done(null, newUser);
  }
}
