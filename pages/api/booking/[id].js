import api from "../../../libs/booking";

const handlerGet = async (req,res) => {
    const { id } = req.query;

    const booking = await api.getBooking(id);

    if(booking){
        res.json(booking);
    }
    res.json({ error : 'Booking não encontrado.'});
}
const handlerPut = async (req, res) => {
    const { id } = req.query;
    const { armador, numero, quantidade, exportadorId, destino, status,  active } = req.body;

    const updatedBooking = await api.putBooking(id, armador, numero, quantidade, exportadorId, destino, status, active).catch(() => {
        res.json({ error : 'Booking não encontrado.'})
    });

    if(updatedBooking){
        res.json({Booking: 'Booking modificado.'});
    }
}
const handlerDel = async (req, res) => {
    const { id } = req.query;

    const deleteBooking = await api.deleteBooking(id).catch(() => {
        res.json({ error : 'Booking não encontrado.'})
    });
    if(deleteBooking){
        res.json({Booking: 'Booking deletado.'});   
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