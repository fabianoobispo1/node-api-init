import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';

//import { env } from '@/env';
//import fastifyJwt from '@fastify/jwt';


import { jsonSchemaTransform, serializerCompiler, validatorCompiler, /* ZodTypeProvider */} from 'fastify-type-provider-zod';
import { errorHandler } from './error-handler';
import { appSistemaRoutes } from './http/controllers/app_sistema/routes';



/* import { appGymRoutes } from './http/controllers/app_gym/routes';
import { appFaRoutes } from './http/controllers/app_fa/routes';
import { errorHandler } from './error-handler';
import { appGcpRoutes } from './http/controllers/app_gcp/routes';
import { appToronRoutes } from './http/controllers/app_toron/routes';
 */
export const app = fastify();

/* export const app = fastify().withTypeProvider<ZodTypeProvider>(); */
/* 
app.register(fastifyJwt, {
    secret: env.JWT_SECRET_GYM,
    cookie:{
        cookieName:'refreshTokenGym',
        signed:false        
    },
    namespace: 'gym',
    jwtVerify: 'gymVerify',
    jwtSign: 'gymSign',
    sign:{
        expiresIn:'10m'
    }
});

app.register(fastifyJwt, {
    secret: env.JWT_SECRET_GCP,
    cookie:{
        cookieName:'refreshTokenGcp',
        signed:false        
    },
    namespace: 'gcp',
    jwtVerify: 'gcpVerify',
    jwtSign: 'gcpSign',
    sign:{
        expiresIn:'10m'
    }
});

app.register(fastifyJwt, {
    secret: env.JWT_SECRET_FA,
    cookie:{
        cookieName:'refreshTokenFa',
        signed:false        
    },
    namespace: 'fa',
    jwtVerify: 'faVerify',
    jwtSign: 'faSign',
    sign:{
        expiresIn:'60m'
    }
});

app.register(fastifyJwt, {
    secret: env.JWT_SECRET_TORON,
    cookie:{
        cookieName:'refreshTokenToron',
        signed:false        
    },
    namespace: 'toron',
    jwtVerify: 'toronVerify',
    jwtSign: 'toronSign',
    sign:{
        expiresIn:'60m'
    }
});
 */
app.register(cors, { 

    origin:'*'
});
app.get('/', async (request, reply) => {
    return reply.status(200).send({
        message: 'REST API, documentação em /docs.' 
    });
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

/* app.register(appToronRoutes)
app.register(appFaRoutes);
app.register(appGcpRoutes)
app.register(appGymRoutes); */

app.register(appSistemaRoutes);

app.setErrorHandler(errorHandler);
