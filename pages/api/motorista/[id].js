import api from "../../../libs/motorista"

const handlerGet = async (req,res) => {
    const { id } = req.query;

    const motorista = await api.getMotorista(id);

    if(motorista){
        res.json(motorista);
        return;
    }
    res.json({ error : 'Motorista não encontrado.'});
}
const handlerPut = async (req, res) => {
    const { id } = req.query;
    const { nome, cpf, documento, active } = req.body;

    const updatedMotorista = await api.putMotorista(id, nome, cpf, documento, active).catch(() => {
        res.json({ error : 'Motorista não encontrado.'})
    });
    if(updatedMotorista){
        res.json({Motorista: 'Motorista modificado.'});
    }
}
const handlerDel = async (req, res) => {
    const { id } = req.query;

    const deleteMotorista = await api.deleteMotorista(id).catch(() => {
        res.json({ error : 'Motorista não encontrado.'})
    });
    if(deleteMotorista){
        res.json({Motorista: 'Motorista deletado.'});   
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