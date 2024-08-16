import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {  z } from 'zod';
import { hash } from 'bcryptjs';
//import { prisma } from '@/lib/prisma';
import { BadRequest } from '../../../_errors/bad-request';
import { addUser,    getUserByEmail } from '@/lib/database';

export async function sistemaRegistrarUsuario(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/sistema/usuario/adicionar', {
            schema: {
                summary: 'Cadastrar novo usuario.',
                tags: ['Sistema: Usuarios'],
                body: z.object({
                    nome: z.string(),
                    data_nascimento: z.string().datetime(),
                    email: z.string().email(),
                    password: z.string().min(6),
                }),
                response: {
                    201: z.object({
                        sistemaUsuario: z.object({                        
                            id: z.string().uuid() ,
                            nome: z.string(),
                            email: z.string().email(), 
                            administrador: z.boolean(),
                            data_nascimento: z.string(),
                            created_at:  z.string(),
                        })
                    })
                },
            },
        }, async (request, reply) => {
            const {
                nome,
                email,
                password, 
                data_nascimento,
            } = request.body;


            const password_hash = await hash(password, 6);
           
            //PRISMA DESATIVADO POR ENQUANTO

            //verifica se ja existe email cadastrado 
            /*const userWithSameEmail = await prisma.gcpUsuario.findUnique({
                where:{
                    email
                }
            });*/
            
            const userWithSameEmail = await getUserByEmail(email);

            if (userWithSameEmail) {
                throw new BadRequest('Usuário já existente com esse Email');
            }
            
            /* const userWithSameCpf = await prisma.gcpUsuario.findUnique({
                where:{
                    cpf
                }
            });

            if (userWithSameCpf) {
                throw new BadRequest('Usuário já existente com esse Cpf');
            }*/

            const sistemaUsuario = await addUser(nome, email, password_hash, data_nascimento);     
            
    
            return reply.status(201).send({sistemaUsuario});
        });
}