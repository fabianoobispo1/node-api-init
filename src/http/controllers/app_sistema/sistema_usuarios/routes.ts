import { FastifyInstance } from 'fastify';
import { sistemaRegistrarUsuario } from './sistemaRegistrarUsuario';
import { sistemaAutenticacao } from './sistemaAutenticacao';
import { sistemaPerfilusuarioLogado } from './sistemaPerfilusuarioLogado';

export async function sistemaUsuarioRoutes(app: FastifyInstance) {    
    app.register(sistemaRegistrarUsuario);
    app.register(sistemaAutenticacao);

    //rotas autenticada
    app.register(sistemaPerfilusuarioLogado);

}