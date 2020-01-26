import { query } from "../database";
import { CreateGroupDto } from "./createGroup.dto";


export class GroupService {
  public createGroup = async (groupData: CreateGroupDto, userId: number) => await query("INSERT INTO groups(group_name, user_id) VALUES($1, $2) RETURNING *", [groupData.group_name, userId]);

  public findOwnedGroups = async (userId: number) => await query("SELECT * FROM groups where user_id = $1", [userId]);
}
