import { FastifyReply, FastifyRequest } from 'fastify';

export async function verifySistemaJwt(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.sistemaVerify();
    } catch (err) {
        return reply.status(401).send({ message: 'Usuário nâo Autorizado.' });
    }
}