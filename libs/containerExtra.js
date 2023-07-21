import prisma from './prisma';

export default {
    getAllContainerExtras: async (containerId) =>{
        const containerExtras = await prisma.containerExtra.findFirst({
            where: {
                active: true,
                containerId: parseInt(containerId)
            },
            select: {
                id: true,
                imageLacre: true,
                placaCaminhao: true,
                motoristaId: true,
                created_at: true,
            },
            orderBy: {
                created_at: 'desc'
            }
        });
        if(containerExtras){
            return {
                ...containerExtras,
                created_at: containerExtras.created_at.toISOString()
            };
        }else{
            return containerExtras;
        };

    },
    postContainerExtra: async (imageLacre, placaCaminhao, motoristaId, containerId, bookingId) =>{
        const newContainerExtra = await prisma.containerExtra.create({
            data:{
                imageLacre: imageLacre.toString(),
                placaCaminhao: placaCaminhao.toString(),
                bookingId: parseInt(bookingId),
                motoristaId: parseInt(motoristaId),
                containerId: parseInt(containerId)
            }
        });
        return newContainerExtra;
    },
    getContainerExtra: async (id) =>{
        const containerExtra = await prisma.containerExtra.findUnique({
            where:{
                id: parseInt(id)
            }
        });
        return containerExtra;
    },
    putContainerExtra: async (id, imageLacre, motoristaId, placaCaminhao, active) =>{
        const updatedContainerExtra = await prisma.containerExtra.update({
            where:{
                id: parseInt(id)
            },
            data:{
                imageLacre: imageLacre.toString(),
                placaCaminhao: placaCaminhao.toString(),
                motoristaId: parseInt(motoristaId),
                active: active === 'false' ? false : true
            }
        });
        return updatedContainerExtra;
    },
    deleteContainerExtra: async (id) =>{
        const deleteContainerExtra = await prisma.containerExtra.delete({
            where:{
                id: parseInt(id)
            }
        });
        return deleteContainerExtra;
    },
    putAllContainerExtra: async (bookingId, active) =>{
        const updateAllContainerExtras = await prisma.containerExtra.updateMany({
            where:{
                bookingId: parseInt(bookingId)
            },
            data:{
                active: active === 'false' ? false : true
            }
        });
        return updateAllContainerExtras;
    },
}