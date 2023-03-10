const TicketList = require("./ticket-list");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.ticketList = new TicketList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            // Escuchar evento: mensaje-to-server
            socket.on('solicitar-ticket', ( data, callback ) => {
                const nuevoTicket = this.ticketList.crearTicket();       
                callback(nuevoTicket)
            });

            socket.on('asignar-ticket', ( user, callback ) => {
                const suTicket = this.ticketList.asignarTicket(user.agente, user.escritorio);      
                callback(suTicket)

                this.io.emit('ticket-asignado', this.ticketList.ultimosTrece );
            });
            
        
        });
    }


}


module.exports = Sockets;