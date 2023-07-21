import prisma from './prisma';

export default {
    getAllClientes: async () =>{
        const cliente = await prisma.Cliente.findMany({
            where: {
                active: true,
            },
            select:{
                id: true,
                cnpj: true,
                nome: true,
                endereco: true,
                email: true,
                telefone: true,
                razaoSocial: true
            }
        });
        return cliente;
    },
    postCliente: async (cnpj,nome,endereco,email,telefone,razaoSocial) =>{
        const newCliente = await prisma.cliente.create({
            data:{
                cnpj: cnpj.toString(),
                nome: nome.toString(),
                endereco: endereco.toString(),
                email: email.toString(),
                telefone: telefone.toString(),
                razaoSocial: razaoSocial.toString(),
            }
        });
        return newCliente;
    },
    getCliente: async (id) =>{
        const cliente = await prisma.cliente.findUnique({
            where:{
                id: parseInt(id),
            }
        });
        return cliente;
    },
    putCliente: async (id, cnpj,nome,endereco,email,telefone,razaoSocial, active) =>{
        const updatedCliente = await prisma.cliente.update({
            where: {
                id: parseInt(id)
            },
            data:{
                cnpj: cnpj.toString(),
                nome: nome.toString(),
                endereco: endereco.toString(),
                email: email.toString(),
                telefone: telefone.toString(),
                razaoSocial: razaoSocial.toString(),
                active: active === 'false' ? false : true
            }
        });
        return updatedCliente;
    },
    deleteCliente: async (id) =>{
        const deleteCliente = await prisma.cliente.delete({
            where:{
                id: parseInt(id)
            }
        });
        return deleteCliente;
    }
}