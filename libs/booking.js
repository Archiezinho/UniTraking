import prisma from './prisma';

export default {
    getAllBookings: async (clienteId, numero) => {
        const bookings = await prisma.Booking.findMany({
            where: {
                active: true,
                clienteId: parseInt(clienteId),
                numeroBooking: {
                    startsWith: numero,
                }
            },
            select:{
                id: true,
                armador: true,
                numeroBooking: true,
                quantidadeContainer: true,
                exportadorId: true
            },
            orderBy: {
                created_at: 'desc'
            }
        });
        return bookings;
    },
    postBooking: async (clienteId, armador, numero, quantidade, destino, exportadorId) => {
        const newBooking = await prisma.booking.create({
            data:{
                quantidadeContainer: parseInt(quantidade),
                numeroBooking: numero.toString(),
                armador: armador.toString(),
                destino: destino.toString(),
                exportadorId: parseInt(exportadorId),
                clienteId: parseInt(clienteId),
            }
        });
        return newBooking;
    },
    getBooking: async (id) => {
        const booking = await prisma.booking.findUnique({
            where:{
                id: parseInt(id),
            }
        });
        return {
            ...booking,
            created_at: booking.created_at.toISOString()
        };
    },
    putBooking: async (id, armador, numero, quantidade, exportadorId, destino, status, active) => {
        const updatedBooking = await prisma.booking.update({
            where: {
                id: parseInt(id)
            },
            data:{
                quantidadeContainer: parseInt(quantidade),
                numeroBooking: numero.toString(),
                armador: armador.toString(),
                exportadorId: parseInt(exportadorId),
                destino: destino.toString(),
                status: status.toString(),
                active: active === 'false' ? false : true
            }
        });
        return updatedBooking;
    },
    deleteBooking: async (id) => {
        const deleteBooking = await prisma.booking.delete({
            where:{
                id: parseInt(id)
            }
        });
        return deleteBooking;
    }
}