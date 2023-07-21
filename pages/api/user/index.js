import api from "../../../libs/user";

const handlerGet = async (req, res) => {
    const { clienteId, user, nome } = req.query;

    if(!nome){
        const users = await api.getAllUsers(clienteId, user);
        if(users){
            res.json( users );
            return;
        }
    }
    else{
        const users = await api.getAllUsersNome(nome);
        if(users){
            res.json( users );
            return;
        }
    }
    res.json({ error : 'Não existem usuários.'});
};
const handlerPost = async (req, res) => {
    const { nome, user, senha, cargo, clienteId } = req.body;

    const newUser = await api.postUser(nome, user, senha, cargo, clienteId).catch(() => {
        res.json({ error : 'Usuário já cadastrado.'})
    });
    if(newUser){
        res.json({User : 'Usuário Cadastrado.'});
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