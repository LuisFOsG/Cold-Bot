import { getMsgTicket } from '../../db/ticket';
import { createTicket } from '../commands/tickets';

export default {
	req: {
		once: false,
		enable: true,
	},
	run: async ( client, reaction, user ) => {
		if ( user.bot ) return;

		const isticket = client.commands.get( 'ticket setup' );
		if ( !isticket ) return;

		const msgId = await getMsgTicket( reaction.message );

		/* Verifica La Existencia de Tickets */
		if ( reaction.message.id === msgId && reaction.emoji.name === '📩' ) {
			createTicket( reaction.message, user );
			reaction.users.remove( user );
		}
		/* Elimina los Tickets */
		if ( reaction.message.channel.name.startsWith( 'ticket-' ) && reaction.emoji.name === '❌' ) {
			reaction.message.channel.delete().catch( () => {} );
		}
	},
};
