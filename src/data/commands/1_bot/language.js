import { MessageEmbed } from 'discord.js';

import { sendMsg } from '../../util';
import { setLanguage, getLanguage } from '../../../db/language';
import { setLanguageUtil, languageChannel } from '../../functions/language';

export default {
	name: 'setlanguage',
	alias: ['setlang', 'lang'],
	category: 'beta',
	usage: ( langs ) => langs.language.usage,
	description: ( langs ) => langs.language.description,
	req: {
		args: 0,
		cooldown: 0,
		dm: false,
		enable: true,
		visible: true,
		permissions: ['ADMINISTRATOR'],
	},
	run: async ( client, msg, args ) => {
		const lang = languageChannel( client, msg.guild );

		if ( !args[0] ) {
			sendMsg( msg, lang.language.selected.replace( '{{ lang }}', await getLanguage( msg.guild.id ) ) );
			const embed = new MessageEmbed();

			embed.setTitle( lang.language.title );
			embed.setDescription(
				client.languages.map( ( l ) => `\`${ l.languageName }\`` )
			);

			sendMsg( msg, embed );
			return;
		}

		args[0] = args[0].toUpperCase();
		if ( !client.languages.has( args[0] ) ) return sendMsg( msg, lang.language.notFound );

		setLanguage( msg, args[0] );
		setLanguageUtil( msg.guild, args[0] );
		sendMsg( msg, lang.language.chosenOne.replace( '{{ lang }}', args[0] ) );
	},
};
