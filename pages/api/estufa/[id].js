import api from "../../../libs/estufa"

const handlerGet = async (req,res) => {
    const { id } = req.query;

    const estufa = await api.getEstufa(id);

    if(estufa){
        res.json(estufa);
        return;
    }
    res.json({ error : 'Estufa não encontrada.'});
}
const handlerPut = async (req, res) => {
    const { id } = req.query;
    const { peso, volume, embalagem, tipo, legenda, motoristaId, imageLacreArmador, imageLacreSif, documentoCarga, documentoCargaPerigosa, active } = req.body;

    const updatedEstufa = await api.putEstufa(id, peso, volume, embalagem, tipo, legenda, motoristaId, imageLacreArmador, imageLacreSif, documentoCarga, documentoCargaPerigosa, active).catch(() => {
        res.json({ error : 'Estufa não encontrada.'})
    });
    if(updatedEstufa){
        res.json({Estufa: 'Estufa modificada.'});
    }
}
const handlerDel = async (req, res) => {
    const { id } = req.query;

    const deleteEstufa = await api.deleteEstufa(id).catch(() => {
        res.json({ error : 'Estufa não encontrada.'})
    });
    if(deleteEstufa){
        res.json({Estufa: 'Esrufa deletada.'});   
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