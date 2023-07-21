import api from "../../../libs/log";

const handlerGet = async (req,res) => {
    const { id } = req.query;

    const log = await api.getLog(id);
    if(log){
        res.json(log);
        return;
    }
    res.json({ error : 'Log não encontrado.'});
}
const handlerPut = async (req, res) => {
    const { id } = req.query;
    const { tipo, userId, containerId, estufaId, bookingId, active } = req.body;

    containerId = containerId === null || '' ? '0' : containerId;
    estufaId = estufaId === null || '' ? '0' : estufaId;
    bookingId = bookingId === null || '' ? '0' : bookingId;

    const updatedLog = await api.putLog(id, tipo, userId, containerId, estufaId, bookingId, active).catch(() => {
        res.json({ error : 'Log não encontrado.'})
    });
    if(updatedLog){
        res.json({User: 'Log modificado.'});
    }
}
const handlerDel = async (req, res) => {
    const { id } = req.query;

    const deleteLog = await api.deleteLog(id).catch(() => {
        res.json({ error : 'Log não encontrado.'})
    });
    if(deleteLog){
        res.json({User: 'Log deletado.'});   
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