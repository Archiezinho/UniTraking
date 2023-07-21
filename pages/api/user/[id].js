import api from "../../../libs/user";

const handlerGet = async (req,res) => {
    const { id } = req.query;

    const user = await api.getUser(id);
    if(user){
        res.json(user);
        return;
    }
    res.json({ error : 'Usuário não encontrado.'});
}
const handlerPut = async (req, res) => {
    const { id } = req.query;
    const { nome, user, senha, cargo, active } = req.body;

    const updatedUser = await api.putUser(id, nome, user, senha, cargo, active).catch(() => {
        res.json({ error : 'Usuário não encontrado.'})
    });
    if(updatedUser){
        res.json({User: 'Usuário modificado.'});
    }
}
const handlerDel = async (req, res) => {
    const { id } = req.query;

    const deleteUser = await api.deleteUser(id).catch(() => {
        res.json({ error : 'Usuário não encontrado.'})
    });
    if(deleteUser){
        res.json({User: 'Usuário deletado.'});   
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