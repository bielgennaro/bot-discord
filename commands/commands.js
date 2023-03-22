const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('teste')
    .setDescription('teste'),
    async execute(interaction){
      await interaction.reply(`Olá ${interaction.user.username}!`);
    }
},
module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('replies with user info'),
  async execute(interaction) {
    await interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
  }
}
