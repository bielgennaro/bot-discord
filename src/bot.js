const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const { token } = require('../config.json');
const  fs  = require('node:fs');
const path = require('node:path');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, `../commands`);
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles){
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if('data' in command && 'execute' in command){
    client.commands.set(command.data.name, command);
  }else{
    console.log(`[ERRO] O comando ${filePath} não possui data ou execute!`);
  }
}

client.on(Events.InteractionCreate, async interaction =>{
  if(!interaction.isChatInputCommand()) return;
  
  const command = interaction.client.commands.get(interaction.commandName);

  if(!command){
    console.error(`[ERRO] O comando ${interaction.commandName} não existe!`);
    return;
  }

  try{
    await command.execute(interaction);
  }catch (error) {
    console.error(error);
      if(interaction.replied || interaction.deferred){
        await interaction.followUp({content: 'Ocorreu um erro ao executar esse comando!', ephemeral: true});
      }else{
        await interaction.reply({content: 'Ocorreu um erro ao executar esse comando!', ephemeral: true});
      }
  }
});

client.on("ready", c => {
  console.log(`Pronto 🚀! Logado como ${c.user.tag}!`);
});

client.login(token);

