import api from "../../../libs/cliente"

const handlerGet = async (req, res) => {
    const cliente = await api.getAllClientes();

    if(cliente){
        res.json( cliente );
        return;
    }
    res.json({ error : 'Clientes não existem.'});
};
const handlerPost = async (req, res) => {
    const { cnpj,nome,endereco,email,telefone,razaoSocial } = req.body;

    const newCliente = await api.postCliente(cnpj,nome,endereco,email,telefone,razaoSocial).catch(() => {
        res.json({ error : 'Cliente já cadastrado.'})
    });
    if(newCliente){
        res.json( newCliente );
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