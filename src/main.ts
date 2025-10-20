import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // Configurações da documentação Swagger
    const config = new DocumentBuilder()
    .setTitle('API de Tarefas')
    .setDescription('Documentação da API de Tarefas com NestJS + Prisma + Swagger')
    .setVersion('1.0')
    // .addTag('') // Tag opcional para categorizar as rotas
    .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
    })
    
    .build();
    
    const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api', app, document); // Acessível em http://localhost:3000/api

     app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remova propriedades não decoradas no DTO
      forbidNonWhitelisted: true, /* Retorna erro se 
      enviar propriedades não permitidas*/
      transform: true, // Tranforma os tipos automaticamente 
      // EX:(string -> number)
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
