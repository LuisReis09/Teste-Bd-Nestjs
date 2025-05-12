import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Permite o acesso de qualquer origem
  app.enableCors();

  // Habilita o uso de pipes globais para validação
  app.useGlobalPipes(new ValidationPipe());

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Testes')
    .setDescription('fonte de testes para as rotas da API')
    .setVersion('1.0')
    .build();

  // Deixa o swagger no modo escuro
  const theme = new SwaggerTheme();
  const options = {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.ONE_DARK),
    customSiteTitle: 'Teste API',
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, options);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
