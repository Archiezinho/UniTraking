import api from "../../../libs/container"

const handlerGet = async (req,res) => {
    const { id } = req.query;

    const container = await api.getContainer(id);

    if(container){
        res.json(container);
        return;
    }
    res.json({ error : 'Container não encontrado.'});
}
const handlerPut = async (req, res) => {
    const { id } = req.query;
    const { identificacao, tara, maxgross, net, cuCap, imageContainer, bookingId, status, active } = req.body;

    const updatedContainer = await api.putContainer(id, identificacao, tara, maxgross, net, cuCap, imageContainer, bookingId, status, active).catch(() => {
        res.json({ error : 'Container não encontrado.'})
    });
    if(updatedContainer){
        res.json({Container : 'Container modificado.'});
    }
}
const handlerDel = async (req, res) => {
    const { id } = req.query;

    const deleteContainer = await api.deleteContainer(id).catch(() => {
        res.json({ error : 'Container não encontrado.'})
    });
    if(deleteContainer){
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