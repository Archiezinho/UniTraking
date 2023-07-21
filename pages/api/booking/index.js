import api from "../../../libs/booking"

const handlerGet = async (req, res) => {
    const { clienteId, numero } = req.query;
    const bookings = await api.getAllBookings(clienteId, numero);

    if(bookings){
        res.json( bookings );
        return;
    }
    res.json({ error : 'Bookings não existem.' });
};
const handlerPost = async (req, res) => {
    const { clienteId, armador, numero, quantidade, destino, exportadorId } = req.body;

    const newBooking = await api.postBooking(clienteId, armador, numero, quantidade, destino, exportadorId).catch(() => {
        res.json({ error : 'Booking já cadastrado'})
    });
    if(newBooking){
        res.json( {Booking: 'Booking cadastrado.'} );
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