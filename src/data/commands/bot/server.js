import { MessageEmbed } from 'discord.js';

import { color } from '../../util';

export default {
	name: 'serverinfo',
	alias: ['server'],
	category: 'general',
	usage: ( langs ) => langs.server.usage,
	description: ( langs ) => langs.server.description,
	req: {
		minArgs: 0,
		cooldown: 0,
		dm: false,
		enable: true,
		visible: true,
		permissions: [],
	},
	run: async ( _client, msg, _args ) => {
		const server = msg.guild;

		const embed = new MessageEmbed();
		embed.setThumbnail( server.iconURL() );
		embed.setAuthor( server.name, server.iconURL );
		embed.addField( 'ID', server.id, true );
		embed.addField( 'Region', server.region, true );
		embed.addField( 'Creado el', server.joinedAt.toLocaleDateString(), true );
		embed.addField( 'Dueño del Servidor', `${ server.owner.user.username }#${ server.owner.user.discriminator }`, true );
		embed.addField( 'Miembros', server.memberCount, true );
		embed.setColor( color() );

		msg.channel.send( embed );
	},
};
