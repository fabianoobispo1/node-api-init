import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import fastifyView  from '@fastify/view';
import { env } from '@/env';
import fastifyJwt from '@fastify/jwt';

import { jsonSchemaTransform, serializerCompiler, validatorCompiler} from 'fastify-type-provider-zod';
import { errorHandler } from './error-handler';
import { appSistemaRoutes } from './http/controllers/app_sistema/routes';
import path from 'path';

import sqlite3 from 'sqlite3';

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET_SISTEMA,
    cookie:{
        cookieName:'refreshTokenSistema',
        signed:false        
    },
    namespace: 'sistema',
    jwtVerify: 'sistemaVerify',
    jwtSign: 'sistemaSign',
    sign:{
        expiresIn:env.JWT_EXPIRES_IN_MINUTES+'m'
    }
});

app.register(cors, { 

    origin:'*'
});

//para gerar uma tela inicial estilizada
app.register(fastifyView, {
    engine: {
        ejs: require('ejs')
    }
});
  
app.get('/', async (request, reply) => {
    //para gerar uma tela inicial estilizada
    return reply.viewAsync('src/index.ejs');
    //para gerar uma tela inicial em  JSON
    /*   return reply.status(200).send({
        message: 'REST API, documentação em /docs.' 
    }); */
});

app.register(fastifySwagger, {
    swagger: {
        consumes: ['application/json'],
        produces: ['application/json'],
        info: {
            title: 'REST API',
            description: 'Especificações da API para back-end de aplicações',
            version: '1.0.0'
        },
    },
    transform: jsonSchemaTransform,
});
  
app.register(fastifySwaggerUI, {
    routePrefix: '/docs',
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCookie);

app.register(appSistemaRoutes);

app.setErrorHandler(errorHandler);


//solucao para utilizar sqlite3 equanto o prisma esta desativado 
// Configura o banco de dados SQLite
const dbPath = path.resolve(__dirname+'/lib', 'test.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        app.log.error('Erro ao abrir o banco de dados:', err.message);
    } else {
        app.log.info('Conectado ao banco de dados SQLite.');
    }
});
// Cria a tabela de exemplo
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT NOT NULL,
            nome TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            administrador BOOLEAN NOT NULL DEFAULT false,
            password_hash TEXT NOT NULL,
            data_nascimento TIMESTAMP(3) ,
            created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            app.log.error('Erro ao criar tabela:', err.message);
        } else {
            app.log.info('Tabela "users" criada com sucesso.');
        }
    });
});

