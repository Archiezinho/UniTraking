import api from "../../../libs/containerExtra";

const handlerGet = async (req,res) => {
    const { id } = req.query;

    const containerExtra = await api.getContainerExtra(id);
    if(containerExtra){
        res.json(containerExtra);
        return;
    }
    res.json({ error : 'Container Extras não encontrado.'});
}
const handlerPut = async (req, res) => {
    const { id } = req.query;
    const { imageLacre, placaCaminhao, motoristaId, status, active } = req.body;

    const updatedContainerExtra = await api.putContainerExtra(id, imageLacre, placaCaminhao, motoristaId, status, active).catch(() => {
        res.json({ error : 'Container Extras não encontrado.'})
    });
    if(updatedContainerExtra){
        res.json({User: 'Container Extras modificado.'});
    }
}
const handlerDel = async (req, res) => {
    const { id } = req.query;

    const deleteContainerExtra = await api.deleteContainerExtra(id).catch(() => {
        res.json({ error : 'Container Extras não encontrado.'})
    });
    if(deleteContainerExtra){
        res.json({User: 'Container Extras deletado.'});   
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