import prisma from './prisma';

export default {
    getAllEstufas: async (containerId) => {
        const estufas = await prisma.estufa.findFirst({
            where: {
                active: true,
                containerId: containerId
            },
            select:{
                id: true,
                peso: true,
                volume: true,
                embalagem: true,
                tipoCarga: true,
                legenda: true,
                imageLacreArmador: true,
                imageLacreSif: true,
                documentoCarga: true,
                documentoCargaPerigosa: true,
                motoristaId: true,
                created_at: true,
            }
        });
        if(estufas) {
            return {
                ...estufas,
                created_at: estufas.created_at.toISOString(),
                peso: `${estufas.peso}`,
                volume: `${estufas.volume}`
            };
        }else {
            return estufas;
        }
    },
    postEstufa: async (peso, volume, embalagem, tipo, legenda, containerId, motoristaId, imageLacreArmador, imageLacreSif, documentoCarga, documentoCargaPerigosa, bookingId) => {
        const newEstufa = await prisma.estufa.create({
            data:{
                peso: parseFloat(peso),
                volume: parseFloat(volume),
                embalagem: embalagem.toString(),
                tipoCarga: tipo.toString(),
                imageLacreArmador: imageLacreArmador.toString(),
                imageLacreSif: imageLacreSif.toString(),
                documentoCarga: documentoCarga.toString(),
                documentoCargaPerigosa: documentoCargaPerigosa.toString(),
                legenda: legenda.toString(),
                containerId: parseInt(containerId),
                motoristaId: parseInt(motoristaId),
                bookingId: parseInt(bookingId),
            }
        });
        return newEstufa;
    },
    getEstufa: async (id) => {
        const estufa = await prisma.estufa.findUnique({
            where:{
                id: parseInt(id),
            }
        });
        return estufa;
    },
    putEstufa: async (id, peso, volume, embalagem, tipo, legenda, motoristaId, imageLacreArmador, imageLacreSif, documentoCarga, documentoCargaPerigosa, active) => {
        const updatedEstufa = await prisma.estufa.update({
            where: {
                id: parseInt(id)
            },
            data:{
                peso: parseFloat(peso),
                volume: parseFloat(volume),
                embalagem: embalagem.toString(),
                tipoCarga: tipo.toString(),
                imageLacreArmador: imageLacreArmador.toString(),
                imageLacreSif: imageLacreSif.toString(),
                documentoCarga: documentoCarga.toString(),
                documentoCargaPerigosa: documentoCargaPerigosa.toString(),
                legenda: legenda.toString(),
                motoristaId: parseInt(motoristaId),
                active: active === 'false' ? false : true
            }
        });
        return updatedEstufa;
    },
    deleteEstufa: async (id) => {
        const deleteEstufa = await prisma.estufa.delete({
            where:{
                id: parseInt(id)
            }
        });
        return deleteEstufa;
    },
    putAllEstufas: async (bookingId, active) =>{
        const updateAllEstufas = await prisma.estufa.updateMany({
            where:{
                bookingId: parseInt(bookingId)
            },
            data:{
                active: active === 'false' ? false : true
            }
        });
        return updateAllEstufas;
    },
}