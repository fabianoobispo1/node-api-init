import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { BadRequest } from '../../../_errors/bad-request';
//import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';
import { getUserByEmail } from '@/lib/database';


export async function sistemaAutenticacao(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/sistema/usuario/login', {
            schema: {
                summary: 'Login de Usuario.',
                tags: ['Sistema: Usuarios'],
                body: z.object({
                    email: z.string().email(),
                    password: z.string().min(6),
                }),
                response: {
                    201: z.object({
                        token: z.string(),
                    })
                },
            },
        }, async (request, reply) => {
            const {
                email,
                password
            } = request.body;

            /*   const faUsuario = await prisma.faUsuario.findUnique({
                where: {
                    email
                }
            }); */

            const usuario = await getUserByEmail(email);
    
            if (!usuario) {
                throw new BadRequest('Usuário não encontrado.');
            }
        

            const doestPasswordMatches = await compare(password, usuario.password_hash);

            if (!doestPasswordMatches) {
                throw new BadRequest('Senha Invalida.');
            }
        
            const token = await reply.sistemaSign(
                {},
                {
                    sign: {
                        sub: usuario.id,
                    },
                },
            );

            const refreshToken = await reply.sistemaSign(
                {},
                {
                    sign: {
                        sub: usuario.id
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

