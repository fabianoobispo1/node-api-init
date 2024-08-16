import { FastifyInstance } from 'fastify';

import { sistemaUsuarioListar } from './sistemaUsuarioListar';

export async function faUsuarioRoutes(app: FastifyInstance) {    
    app.register(sistemaUsuarioListar);
}