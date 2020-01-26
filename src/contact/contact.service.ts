import { query } from "../database";

export class ContactService {
  public findContactsByGroup = async (groupId: number) =>
    await query("SELECT * FROM contacts WHERE group_id = $1", [groupId]);
}
