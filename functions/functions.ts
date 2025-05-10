import { ForumChannel, Guild } from "discord.js";

export async function muteMemberFromForum(memberId: string, guild: Guild, forumId: string) {
    const forum = await guild.channels.fetch(forumId) as ForumChannel;
    if (!forum) {
        console.error('Forum not found');
        return;
    }

    const member = await guild.members.fetch(memberId);
    if (!member.user) {
        console.error('Member not found');
        return;
    };
    
    forum.permissionOverwrites.edit(member.user.id, {
        SendMessages: false, // == CreatePosts
    });
}
