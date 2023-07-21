import api from "../../../libs/cliente"

const handlerGet = async (req,res) => {
    const { id } = req.query;

    const cliente = await api.getCliente(id);

    if(cliente){
        res.json(cliente);
        return;
    }
    res.json({ error : 'Cliente não encontrado.'});
}
const handlerPut = async (req, res) => {
    const { id } = req.query;
    const { cnpj,nome,endereco,email,telefone,razaoSocial, active } = req.body;

    const updatedCliente = await api.putCliente(id, cnpj,nome,endereco,email,telefone,razaoSocial, active).catch(() => {
        res.json({ error : 'Cliente não encontrado.'})
    });
    if(updatedCliente){
        res.json({Cliente: 'cliente modificado.'});
    }
}
const handlerDel = async (req, res) => {
    const { id } = req.query;

    const deleteCliente = await api.deleteCliente(id).catch(() => {
        res.json({ error : 'CCliente não encontrado.'})
    });
    if(deleteCliente){
        res.json({Cliente: 'cliente deletado.'});   
    }
}

const handler = async (req, res) => {
    switch(req.method){
        case 'GET':
            handlerGet(req, res);
        break;
        case 'PUT':
            handlerPut(req, res);
        break;
        case 'DELETE':
            handlerDel(req, res);
        break;
     }
}

export default handler;