import api from "../../../libs/exportador";

const handlerGet = async (req, res) => {
    const { clienteId, nome } = req.query;

    const exportadores = await api.getAllExportadores(clienteId, nome);
    if(exportadores){
        res.json( exportadores );
        return;
    }
    res.json({ error : 'Não existem Exportadores.'});
};
const handlerPost = async (req, res) => {
    const { nome, clienteId } = req.body;

    const newExportador = await api.postExportador(nome, clienteId).catch(() => {
        res.json({ error : 'Usuário já cadastrado.'})
    });
    if(newExportador){
        res.json({User : 'Exportador Cadastrado.'});
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