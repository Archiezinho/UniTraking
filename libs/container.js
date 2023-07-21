import prisma from './prisma';

export default {
    getAllContainers: async (bookingId, identificacao) => {
        const containers = await prisma.container.findMany({
            where: {
                active: true,
                bookingId: parseInt(bookingId),
                identificacao: {
                    startsWith: identificacao,
                }
            },
            select:{
                id: true,
                identificacao: true,
                status: true,
            }
        });
        return containers;
    },
    postContainer: async (identificacao, tara, maxgross, net, cuCap, imageContainer, bookingId) => {
        const newContainer = await prisma.container.create({
            data:{
                identificacao: identificacao.toString(),
                tara: tara.toString(),
                maxgross: maxgross.toString(),
                net: net.toString(),
                cuCap: cuCap.toString(),
                imageContainer: imageContainer.toString(),
                bookingId: parseInt(bookingId),
            }
        });
        return newContainer;
    },
    getContainer: async (id) => {
        const container = await prisma.container.findUnique({
            where:{
                id: parseInt(id),
            }
        });
        return {
            ...container,
            created_at: container.created_at.toISOString()
        };
    },
    putContainer: async (id, identificacao, tara, maxgross, net, cuCap, imageContainer, bookingId, status, active) => {
        console.log(id, identificacao, tara, maxgross, net, cuCap, imageContainer, bookingId, status, active)
        const updatedContainer = await prisma.container.update({
            where: {
                id: parseInt(id)
            },
            data:{
                identificacao: identificacao.toString(),
                tara: tara.toString(),
                maxgross: maxgross.toString(),
                net: net.toString(),
                cuCap: cuCap.toString(),
                imageContainer:imageContainer.toString(),
                bookingId: parseInt(bookingId),
                status: status.toString(),
                active: active === 'false' ? false : true
            }
        });
        return updatedContainer;
    },
    deleteContainer: async (id) => {
        const deleteContainer = await prisma.container.delete({
            where:{
                id: parseInt(id)
            }
        });
        return deleteContainer;
    },
    getUniqueContainer: async (identificacao) => {
        const searchContainer = await prisma.container.findFirst({
            where: {
                active: true,
                identificacao: identificacao.toString(),
            },
            select:{
                id: true,
                identificacao: true,
                tara: true,
                maxgross: true,
                net: true,
                cuCap: true,
                imageContainer: true
            }
        });
        return searchContainer;
    },
}