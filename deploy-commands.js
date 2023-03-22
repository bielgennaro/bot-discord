const {REST, Routes} = require('discord.js');
const {clientId, guildId, token} = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles){
  const command = require (`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({
  version: '10'
}).setToken(token);

(async () => {
  try{
    console.log('Iniciando o deploy dos comandos...');

    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      {body: commands}
    );

    console.log('Comandos deployados com sucesso!');
  }catch(error){
    console.error(error);
  }
})();
