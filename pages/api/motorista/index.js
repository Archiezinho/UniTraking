import api from "../../../libs/motorista"

const handlerGet = async (req, res) => {
    const { cpf } = req.query;

    const motoristas = await api.getAllMotoristas(cpf);

    if(motoristas){
        res.json( motoristas );
        return;
    }
    res.json({ error : 'Não existem motoristas.'});
};
const handlerPost = async (req, res) => {
    const { nome, cpf, documento} = req.body;

    const newMotorista = await api.postMotorista(nome, cpf, documento).catch(() => {
        res.json({ error : 'Motorista já cadastrado.'})
    });
    if(newMotorista){
        res.json( newMotorista );
    }
};
const Handler = (req,res) => {
 switch(req.method){
    case 'GET':
        handlerGet(req, res);
    break;
    case 'POST':
        handlerPost(req, res);
    break;
 }
}

export default Handler;