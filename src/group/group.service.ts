import { query } from "../database";
import { CreateGroupDto } from "./createGroup.dto";


export class GroupService {
  public createGroup = async (groupData: CreateGroupDto, userId: number) => await query("INSERT INTO groups(group_name, user_id) VALUES($1, $2) RETURNING *", [groupData.group_name, userId]);
}
