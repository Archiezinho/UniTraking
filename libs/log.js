import prisma from './prisma';

export default {
    getAllLogs: async (clienteId) =>{
        const logs = await prisma.log.findMany({
            where: {
                active: true,
                clienteId: parseInt(clienteId)
            },
            select: {
                id: true,
                tipo: true,
                userId: true,
                containerId: true,
                estufaId: true,
                bookingId: true
            }
        });
        return logs;
    },
    postLog: async (tipo, clienteId, userId, containerId, estufaId, bookingId) =>{
        const newLog = await prisma.log.create({
            data:{
                tipo: tipo.toString(),
                clienteId: parseInt(clienteId),
                userId: parseInt(userId),
                containerId: containerId === '0' ? null : parseInt(containerId),
                estufaId: estufaId === '0' ? null : parseInt(estufaId),
                bookingId: bookingId === '0' ? null : parseInt(bookingId)
            }
        });
        return newLog;
    },
    getLog: async (id) =>{
        const log = await prisma.log.findUnique({
            where:{
                id: parseInt(id)
            }
        });
        return log;
    },
    putLog: async (id, tipo, userId, containerId, estufaId, bookingId, active) =>{
        const updatedLog = await prisma.log.update({
            where:{
                id: parseInt(id)
            },
            data:{
                tipo: tipo.toString(),
                userId: parseInt(userId),
                containerId: containerId === '0' ? null : parseInt(containerId),
                estufaId: estufaId === '0' ? null : parseInt(estufaId),
                bookingId: bookingId === '0' ? null : parseInt(bookingId),
                active: active === 'false' ? false : true
            }
        });
        return updatedLog;
    },
    deleteLog: async (id) =>{
        const deleteLog = await prisma.log.delete({
            where:{
                id: parseInt(id)
            }
        });
        return deleteLog;
    }
}