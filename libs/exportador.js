import prisma from './prisma';

export default {
    getAllExportadores: async (clienteId, nome) =>{
        const exportadores = await prisma.exportador.findMany({
            where: {
                active: true,
                clienteId: parseInt(clienteId),
                nome: {
                    startsWith: nome,
                }
            },
            select: {
                id: true,
                nome: true
            }
        });
        return exportadores;
    },
    postExportador: async (nome, clienteId) =>{
        const newExportador = await prisma.exportador.create({
            data: {
                nome: nome.toString(),
                clienteId: parseInt(clienteId)
            }
        });
        return newExportador;
    },
    getExportador: async (id) =>{
        const exportador = await prisma.exportador.findUnique({
            where:{
                id: parseInt(id)
            }
        });
        return exportador;
    },
    putExportador: async (id, nome, active) =>{
        const updatedExportador = await prisma.exportador.update({
            where:{
                id: parseInt(id)
            },
            data: {
                nome: nome.toString(),
                active: active === 'false' ? false : true
            }
        });
        return updatedExportador;
    },
    deleteExportador: async (id) =>{
        const deleteExportador = await prisma.exportador.delete({
            where:{
                id: parseInt(id)
            }
        });
        return deleteExportador;
    }
}