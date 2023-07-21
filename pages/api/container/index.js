import api from "../../../libs/container"

const handlerGet = async (req, res) => {
    const { bookingId, identificacao } = req.query;
    if(!bookingId){
        const containers = await api.getUniqueContainer( identificacao );

        if(containers){
            res.json( containers );
            return;
        }
        res.json({ error : 'Não existem containers.'});
    }
    else{
        const containers = await api.getAllContainers( bookingId, identificacao );

        if(containers){
            res.json( containers );
            return;
        }
        res.json({ error : 'Não existem containers.'});
    }
};
const handlerPost = async (req, res) => {
    const { identificacao, tara, maxgross, net, cuCap, imageContainer, bookingId } = req.body;

    const newContainer = await api.postContainer(identificacao, tara, maxgross, net, cuCap, imageContainer, bookingId).catch(() => {
        res.json({ error : 'Container já cadastrado.'})
    });
    if(newContainer){
        res.json({Container : 'Container cadastrado.'});
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