import { groupService } from "@/src/features/group/services/GroupService";

export async function GET() {
    const groupsList = await groupService.getAllGroups();
    
    return new Response(JSON.stringify(groupsList), {
        status: 200,
        headers: {'Content-Type': 'application/json'}
    });
}