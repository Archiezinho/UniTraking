import prisma from './prisma';

export default {
    getAllContainerArmazem: async (armazemId) =>{
        const containersArmazem = await prisma.containerArmazem.findMany({
            where: {
                active: true,
                armazemId: parseInt(armazemId),
            },
            select: {
                id: true,
                destino: true,
                containerId: true,
                transportadoraId: true
            },
            orderBy: {
                created_at: 'desc'
            }
        });
        return containersArmazem;
    },
    postContainerArmazem: async (destino, containerId, transportadoraId, armazemId) =>{
        const newContainerArmazem = await prisma.containerArmazem.create({
            data:{
                destino: destino.toString(),
                containerId: parseInt(containerId),
                transportadoraId: parseInt(transportadoraId),
                armazemId: parseInt(armazemId),
            }
        });
        return newContainerArmazem;
    },
    getContainerArmazem: async (id) =>{
        const containerArmazem = await prisma.containerArmazem.findUnique({
            where:{
                id: parseInt(id)
            }
        });
        return {
            ...containerArmazem,
            created_at: containerArmazem.created_at.toISOString()
        };
    },
    putContainerArmazem: async (id, destino, armazemId, active) =>{
        const updatedContainerArmazem = await prisma.containerArmazem.update({
            where:{
                id: parseInt(id)
            },
            data:{
                destino: destino.toString(),
                armazemId: parseInt(armazemId),
                active: active === 'false' ? false : true
            }
        });
        return updatedContainerArmazem;
    },
    deleteContainerArmazem: async (id) =>{
        const deleteContainerArmazem = await prisma.containerArmazem.delete({
            where:{
                id: parseInt(id)
            }
        });
        return deleteContainerArmazem;
    },
    getAllContainerTransportadora: async (transportadoraId) =>{
        const containersArmazem = await prisma.containerArmazem.findMany({
            where: {
                active: true,
                transportadoraId: parseInt(transportadoraId),
            },
            select: {
                id: true,
                destino: true,
                containerId: true,
                transportadoraId: true
            },
            orderBy: {
                created_at: 'desc'
            }
        });
        return containersArmazem;
    },
}