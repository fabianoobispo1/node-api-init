import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {  z } from 'zod';
import { compare, hash } from 'bcryptjs';
//import { prisma } from '@/lib/prisma';
import { BadRequest } from '../../../_errors/bad-request';
import { verifySistemaJwt } from '@/http/middlewares/verifySistema-jwt';
import { getUserById, updatePasswordById } from '@/lib/database';


export async function sistemaUsuarioTrocaSenha(app: FastifyInstance) {
    const BodySchema = z.object({
        passwordAntigo: z.string().min(6),
        passwordNovo: z.string().min(6),      
    });
    
    type BodyType = z.infer<typeof BodySchema>;
    
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/sistema/usuario/alterasenha', {
           
            schema: {
                summary: 'Alterar senha do Usuario logado.',
                tags: ['Sistema: Usuarios'],
                body: BodySchema,
                response: {
                    201: z.object({
                        mensagem: z.string(),
                    })
                },
            },
            onRequest: [verifySistemaJwt],
        }, async (request, reply) => {

        


            const {
                passwordAntigo,
                passwordNovo
            } = request.body as BodyType;
            
         
            const usuarioLogado = request.user.sub;
        
            /*      //verifica se o passwordAntigo e valido
            const faUsuario = await prisma.faUsuario.findUnique({
                where:{
                    id:usuarioLogado
                }
            }); */
            const usuario = await getUserById(usuarioLogado);
           
            if (usuario){
                const doestPasswordMatches = await compare(passwordAntigo, usuario.password_hash);
        
                if (!doestPasswordMatches) {
                    throw new BadRequest('Senha antiga invalida.');
                }
            
            }
        
            const password_hash = await hash(passwordNovo, 6);       
            
            const resultUpdate = await updatePasswordById(usuarioLogado, password_hash );
            console.log(resultUpdate);
            /*  const resutPrisma = await prisma.faUsuario.update({
                data:{
                    password_hash
                },
                where:{
                    id :usuarioLogado
                }
            });     */
            
            return reply.status(201).send({mensagem: 'id: '+usuarioLogado +' senha alterada' });
        });
}

