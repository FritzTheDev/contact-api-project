import { query } from "../database";
import { CreateGroupDto } from "./createGroup.dto";


export class GroupService {
  // works as a layer between the controller & the database for the handling of the sql queries
  public createGroup = async (groupData: CreateGroupDto, userId: number) => await query("INSERT INTO groups(group_name, owner_id) VALUES($1, $2) RETURNING *", [groupData.group_name, userId]);

  public findOwnedGroups = async (userId: number) => await query("SELECT * FROM groups WHERE owner_id = $1", [userId]);

  public findOneGroup = async (groupId: number) => await query("SELECT * FROM groups WHERE id = $1", [groupId]);
}
