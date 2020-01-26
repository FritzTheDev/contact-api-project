import { query } from "../database";

export class ContactService {
  public findContactsByGroup = await query("SELECT * FROM contacts WHERE")
}