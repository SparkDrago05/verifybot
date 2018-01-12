const config = require("../config.json");
const { MessageEmbed } = require("discord.js");

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(message) {
        // If message was not sent in guild, return
        if (message.guild.id !== config.guild) return;
        // Fetch logs channel
        const logs = this.client.channels.find("name", config.logs.messageUpdates);
        // If no logs channel found, return false
        if (!logs) return false;
        // If message is a command or message is sent by a bot, ignore it
        if ((message.content.startsWith(config.prefix) && this.client.commands.has(message.content.split(config.prefix)[1])) || message.author.bot) return;

        // Create a new embed
        const embed = new MessageEmbed()
            .setColor([255, 100, 100])
            .setAuthor(`${message.member.displayName} (${message.author.tag})`)
            .setTitle(`Message deleted in #${message.channel.name}.`)
            .setDescription(message.content)
            .setImage(message.attachments.size > 0 ? message.attachments.first().url : null)
            .setTimestamp();

        // Send the created embed
        logs.send(embed);
    }
};
