import * as errors from "../../lib/errors.ts";
import { getMembers } from "../../use-cases/get-members.ts";

export default async function membersHandler(req: Request) {
  try {
    const notionKey = req.headers.get("x-notion-key");
    if (!notionKey) {
      throw new errors.MissingKeyError(404, "Missing notion integration key");
    }

    const data = await getMembers(notionKey);

    return new Response(JSON.stringify(data));
  } catch (err) {
    if (err instanceof errors.MissingKeyError) {
      return err.toResponse();
    }

    if (err instanceof errors.GetMembersError) {
      return err.toResponse();
    }

    return errors.DEFAULT_ERROR;
  }
}
