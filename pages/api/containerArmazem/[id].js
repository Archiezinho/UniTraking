import api from "../../../libs/containerArmazem"

const handlerGet = async (req,res) => {
    const { id } = req.query;

    const containerArmazem = await api.getContainerArmazem(id);

    if(containerArmazem){
        res.json(containerArmazem);
        return;
    }
    res.json({ error : 'Container não encontrado.'});
}
const handlerPut = async (req, res) => {
    const { id } = req.query;
    const { destino, armazemId, active } = req.body;

    const updatedContainerArmazem = await api.putContainerArmazem(id, destino, armazemId, active).catch(() => {
        res.json({ error : 'Container não encontrado.'})
    });
    if(updatedContainerArmazem){
        res.json({Container : 'Container modificado.'});
    }
}
const handlerDel = async (req, res) => {
    const { id } = req.query;

    const deleteContainerArmazem = await api.deleteContainerArmazem(id).catch(() => {
        res.json({ error : 'Container não encontrado.'})
    });
    if(deleteContainerArmazem){
        res.json({Container: 'Container deletado.'});   
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