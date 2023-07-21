import api from "../../../libs/containerArmazem"

const handlerGet = async (req, res) => {
    const { armazemId, transportadoraId } = req.query;

    if(!transportadoraId){
        const containersArmazem = await api.getAllContainerArmazem(armazemId);

        if (containersArmazem) {
            res.json(containersArmazem);
            return;
        }
    }
    else{
        const containersArmazem = await api.getAllContainerTransportadora(transportadoraId);

        if (containersArmazem) {
            res.json(containersArmazem);
            return;
        }
    }
    res.json({ error: 'Não existem containers.' });
};
const handlerPost = async (req, res) => {
    const { destino, containerId, transportadoraId, armazemId } = req.body;

    const newContainerArmazem = await api.postContainerArmazem(destino, containerId, transportadoraId, armazemId).catch(() => {
        res.json({ error: 'Container já cadastrado.' })
    });
    if (newContainerArmazem) {
        res.json({ Container: 'Container cadastrado.' });
    }
};
const Handler = (req, res) => {
    switch (req.method) {
        case 'GET':
            handlerGet(req, res);
            break;
        case 'POST':
            handlerPost(req, res);
            break;
    }
}

export default Handler;