import { Client, Events, ForumChannel, GatewayIntentBits } from 'discord.js';
import { muteMemberFromForum } from './functions/functions';

const token = process.env.DISCORD_TOKEN;
if (!token) {
    throw new Error('DISCORD_TOKEN environment variable is not set');
}

const forumId = process.env.FORUM_ID;
if (!forumId) {
    throw new Error('FORUM_ID environment variable is not set');
}

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

client.on('threadCreate', async (thread) => {
    if (thread.parentId !== forumId) return;

    muteMemberFromForum(thread.ownerId, thread.guild, thread.parentId);
});
