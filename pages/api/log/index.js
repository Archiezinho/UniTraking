import api from "../../../libs/log";

const handlerGet = async (req, res) => {
    const { clienteId } = req.body;

    const logs = await api.getAllLogs(clienteId);
    if(logs){
        res.json( logs );
        return;
    }
    res.json({ error : 'Não existem Logs.'});
};
const handlerPost = async (req, res) => {
    const { tipo, clienteId, userId, containerId, estufaId, bookingId } = req.body;

    containerId = containerId === null || '' ? '0' : containerId;
    estufaId = estufaId === null || '' ? '0' : estufaId;
    bookingId = bookingId === null || '' ? '0' : bookingId;

    const newLog = await api.postLog(tipo, clienteId, userId, containerId, estufaId, bookingId).catch(() => {
        res.json({ error : 'Log já cadastrado.'})
    });
    if(newLog){
        res.json({User : 'Log Cadastrado.'});
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