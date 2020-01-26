import { query } from "../database";
import { ContactDto } from "./contact.dto";

export class ContactService {
  public findContactsByGroup = async (groupId: number) =>
    await query("SELECT * FROM contacts WHERE group_id = $1", [groupId]);

  public createContact = async (contactData: ContactDto, ownerId: number) =>
    await query(
      "INSERT INTO contacts(email, owner_id, group_id) VALUES($1, $2, $3) RETURNING *",
      [contactData.email, ownerId, contactData.group_id]
    );
}
