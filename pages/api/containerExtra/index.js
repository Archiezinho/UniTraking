import api from "../../../libs/containerExtra";

const handlerGet = async (req, res) => {
    const { containerId } = req.body;

    const containerExtras = await api.getAllContainerExtras(containerId);
    if(containerExtras){
        res.json( containerExtras );
        return;
    }
    res.json({ error : 'Não existem Container Extras.'});
};
const handlerPost = async (req, res) => {
    const { imageLacre, placaCaminhao, motoristaId, containerId, bookingId } = req.body;

    const newContainerExtra = await api.postContainerExtra(imageLacre, placaCaminhao, motoristaId, containerId, bookingId).catch(() => {
        res.json({ error : 'Container Extras já cadastrado.'})
    });
    if(newContainerExtra){
        res.json({User : 'Container Extras Cadastrado.'});
    }
};
const handlerPut = async (req, res) => {
    const { bookingId, active } = req.body;

    const updateAllContainerExtra = await api.putAllContainerExtra(bookingId, active).catch(() => {
        res.json({ error : 'Container Extras não encontrados.'})
    });
    if(updateAllContainerExtra){
        res.json({User : 'Container Extras Editados.'});
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