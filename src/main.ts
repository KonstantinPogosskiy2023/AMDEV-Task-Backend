import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function startApp() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') ?? 3000;
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });
  initDocs(app);
  await app.listen(port, () => console.log('Server started on port ' + port));
}
function initDocs(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Parking')
    .setDescription('Documentation REST API')
    .addBearerAuth({
      type: 'http',
      bearerFormat: 'JWT',
      scheme: 'bearer',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);
}
startApp().then(() => console.log('App has been started'));
