import { QueryHandler } from "../../../../shared/query-bus";
import { LIST_QUERY_TYPE, ListQuery, ListQueryResult } from "../queries/list";

export default class ListQueryHandler implements QueryHandler<ListQuery, ListQueryResult> {
  public queryType: string = LIST_QUERY_TYPE;

  async execute(query: ListQuery): Promise<ListQueryResult> {
    // do something with the query and transform it to result.
    return new ListQueryResult(query);
  }
}
