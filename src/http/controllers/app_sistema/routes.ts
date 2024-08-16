import { FastifyInstance } from 'fastify';
import { sistemaModeloRoutes } from './sistema_Modelo/routes';
import { sistemaUsuarioRoutes } from './sistema_usuarios/routes';


export async function appSistemaRoutes(app: FastifyInstance) {
    app.register(sistemaModeloRoutes);
    app.register(sistemaUsuarioRoutes);
}