import prisma from './prisma';

export default {
    getAllMotoristas: async (cpf) => {
        const motoristas = await prisma.motorista.findFirst({
            where: {
                active: true,
                cpf: cpf.toString(),
            },
            select:{
                id: true,
                cpf: true,
                nome: true,
                documento: true
            }
        });
        return motoristas;
    },
    postMotorista: async (nome, cpf, documento) => {
        const newMotorista = await prisma.motorista.create({
            data:{
                nome: nome.toString(),
                cpf: cpf.toString(),
                documento: documento.toString(),
            }
        });
        return newMotorista;
    },
    getMotorista: async (id) => {
        const motorista = await prisma.motorista.findUnique({
            where:{
                id: parseInt(id),
            }
        });
        return {
            ...motorista,
            created_at: motorista.created_at.toISOString()
        };
    },
    putMotorista: async (id, nome, cpf, documento, active) => {
        const updatedMotorista = await prisma.motorista.update({
            where: {
                id: parseInt(id)
            },
            data:{
                nome: nome.toString(),
                cpf: cpf.toString(),
                documento: documento.toString(),
                active: active === 'false' ? false : true
            }
        });
        return updatedMotorista;
    },
    deleteMotorista: async (id) => {
        const deleteMotorista = await prisma.motorista.delete({
            where:{
                id: parseInt(id)
            }
        });
        return deleteMotorista;
    }
}