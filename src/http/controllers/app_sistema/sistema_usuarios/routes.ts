import { FastifyInstance } from 'fastify';
import { sistemaRegistrarUsuario } from './sistemaRegistrarUsuario';
import { sistemaAutenticacao } from './sistemaAutenticacao';
import { sistemaPerfilusuarioLogado } from './sistemaPerfilusuarioLogado';
import { sistemaRefresh } from './sistemaRefresh';
import { sistemaUsuarioTrocaSenha } from './sistemaUsuarioTrocaSenha';

export async function sistemaUsuarioRoutes(app: FastifyInstance) {    
    app.register(sistemaRegistrarUsuario);
    app.register(sistemaAutenticacao);
    
    
    //rotas autenticada
    app.register(sistemaRefresh);
    app.register(sistemaPerfilusuarioLogado);
    app.register(sistemaUsuarioTrocaSenha);




}