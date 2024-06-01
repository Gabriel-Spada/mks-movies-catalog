import { NestFactory } from '@nestjs/core';
import {ValidationPipe, VersioningType} from "@nestjs/common";
import {join} from "path";
import {NestExpressApplication} from "@nestjs/platform-express";
import * as bodyParser from 'body-parser';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {AppModule} from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, 'public'));
  app.setBaseViewsDir(join(__dirname, 'wwwroot'));
  app.setViewEngine('hbs');

  app.useGlobalPipes(new ValidationPipe());

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api');
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


  //CORS
  const whitelist = [
    'http://localhost:4200',
    'http://localhost:3000',
  ];

  app.enableCors({
    origin: function (origin, callback) {
      callback(null, true);
    },
  });

  // Em uma produção real não criaria o swagger
  // if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
        .setTitle('Mks Movies API')
        .setDescription('Interface REST da MKS Movies')
        .setVersion('1.0')
        .setContact('developer', 'https://www.linkedin.com/in/gabriel-spada-b2b676219/',  'gabrielspada0@gmail.com')
        .addBearerAuth(
            {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
              name: 'JWT',
              description: 'Enter JWT token',
              in: 'header',
            },
            'access-token',
        )
        .build();


    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  // }

  await app.listen(process.env.PORT || 3000);

}
bootstrap();
