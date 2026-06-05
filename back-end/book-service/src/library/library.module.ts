import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt';

import { LibraryController } from './library.controller'
import { LibraryService } from './library.service'
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    })
  ],
  controllers: [LibraryController],
  providers: [LibraryService, JwtStrategy],
})
export class LibraryModule {}