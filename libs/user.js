import prisma from './prisma';

export default {
    getAllUsers: async (clienteId, user) => {
        const users = await prisma.user.findMany({
            where: {
                active: true,
                clienteId: parseInt(clienteId),
                user: {
                    startsWith: user,
                },
                NOT: {
                    nome: 'SuperAdm',
                },
            },
            select:{
                id: true,
                nome: true,
                user: true,
                senha: true,
                cargo: true
            }
        });
        return users;
    },
    postUser: async (nome, user, senha, cargo, clienteId) => {
        const newUser = await prisma.user.create({
            data:{
                nome: nome.toString(),
                user: user.toString(),
                senha: senha.toString(),
                cargo: cargo.toString(),
                clienteId: parseInt(clienteId)
            }
        });
        return newUser;
    },
    getUser: async (id) => {
        const user = await prisma.user.findUnique({
            where:{
                id: parseInt(id)
            }
        });
        return {
            ...user,
            created_at: user.created_at.toISOString()
        };
    },
    putUser: async (id, nome, user, senha, cargo, active) => {
        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data:{
                nome: nome.toString(),
                user: user.toString(),
                senha: senha.toString(),
                cargo: cargo.toString(),
                active: active === 'false' ? false : true
            }
        });
        return updatedUser;
    },
    deleteUser: async (id) => {
        const deleteUser = await prisma.user.delete({
            where:{
                id:  parseInt(id)
            }
        });
        return deleteUser;
    },
    getUserLogin: async (user, senha) => {
        const userLogin = await prisma.user.findFirst({
            where:{
                user: user.toString(),
                senha: senha.toString(),
                active: true
            }
        });
        return userLogin;
    },
    getAllUsersNome: async (nome) => {
        const users = await prisma.user.findFirst({
            where: {
                active: true,
                nome: {
                    startsWith: nome,
                },
            },
            select:{
                id: true,
                nome: true,
            }
        });
        return users;
    },
}