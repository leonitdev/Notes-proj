import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import helmet from 'helmet';
import { mongoConnectionString } from './infrastructure/configs';
import { NoteModule } from './modules/notes/note.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongoConnectionString, {
      retryWrites: true,
      retryReads: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    /** Created Modules **/
    NoteModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(helmet)
      .forRoutes({ path: '*', method: RequestMethod.ALL })

      .apply()
      .forRoutes(
        { path: 'v1/notes', method: RequestMethod.POST },
        { path: 'v1/notes/:id', method: RequestMethod.GET },
        { path: 'v1/notes', method: RequestMethod.GET },
        { path: 'v1/notes', method: RequestMethod.PUT },
        { path: 'v1/notes/:id', method: RequestMethod.DELETE },
      );
  }
}
