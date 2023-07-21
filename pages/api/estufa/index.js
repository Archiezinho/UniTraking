import api from "../../../libs/estufa"

const handlerGet = async (req, res) => {
    const estufas = await api.getAllEstufas()

    if(estufas){
        res.json( estufas );
        return;
    }
    res.json({ error : 'Estufas não existem.'});
};
const handlerPost = async (req, res) => {
    const { peso, volume, embalagem, tipo, legenda, containerId, motoristaId, imageLacreArmador, imageLacreSif, documentoCarga, documentoCargaPerigosa, bookingId } = req.body;

    const newEstufa = await api.postEstufa(peso, volume, embalagem, tipo, legenda, containerId, motoristaId, imageLacreArmador, imageLacreSif, documentoCarga, documentoCargaPerigosa, bookingId).catch(() => {
        res.json({ error : 'Estufa já cadastrada.'})
    });
    if(newEstufa){
        res.json( {Estufa: 'Estufa cadastrada.'} );
    }
};
const handlerPut = async (req, res) => {
    const { bookingId, active } = req.body;

    const updateAllEstufas = await api.putAllEstufas(bookingId, active).catch(() => {
        res.json({ error : 'Estufas não encontradas.'})
    });
    if(updateAllEstufas){
        res.json({User : 'Estufas Editadas.'});
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
    case 'PUT':
        handlerPut(req, res);
    break;
 }
}

export default Handler;