import api from "../../../libs/exportador";

const handlerGet = async (req,res) => {
    const { id } = req.query;

    const exportador = await api.getExportador(id);
    if(exportador){
        res.json(exportador);
        return;
    }
    res.json({ error : 'Exportador não encontrado.'});
}
const handlerPut = async (req, res) => {
    const { id } = req.query;
    const { nome, active } = req.body;

    const updatedExportador = await api.putExportador(id, nome, active).catch(() => {
        res.json({ error : 'Exportador não encontrado.'})
    });
    if(updatedExportador){
        res.json({User: 'Exportador modificado.'});
    }
}
const handlerDel = async (req, res) => {
    const { id } = req.query;

    const deleteExportador = await api.deleteExportador(id).catch(() => {
        res.json({ error : 'Exportador não encontrado.'})
    });
    if(deleteExportador){
        res.json({User: 'Exportador deletado.'});   
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