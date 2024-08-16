import { verifySistemaJwt } from '@/http/middlewares/verifySistema-jwt';
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';



export async function sistemaRefresh(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .patch('/sistema/usuario/farefresh', {
            onRequest: [verifySistemaJwt],
            schema: {
                summary: 'Atualiza o token de usario logado.',
                tags: ['Sistema: Usuarios'],
                response: {
                    201: z.object({
                        token: z.string(),
                    })
                },
            },
        }, async (request, reply) => {

            await request.sistemaVerify({ onlyCookie: true });

            const token = await reply.sistemaSign(
                {},
                {
                    sign: {
                        sub: request.user.sub,
                    },
                },
            );
        
            const refreshToken = await reply.sistemaSign(
                {},
                {
                    sign: {
                        sub: request.user.sub,
                    },
                },
            );
        
            return reply
                .setCookie('refreshTokenSistema', refreshToken, {
                    path: '/',
                    secure: true,
                    sameSite: true,
                    httpOnly: true,
                })
                .status(200)
                .send({
                    token,
                });
        });
}



