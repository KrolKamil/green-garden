import { QueryHandler } from "../../../../shared/query-bus";
import { MY_GARDENS_QUERY_TYPE, MyGardensQuery, MyGardensQueryResult } from "../queries/my-gardens";

export default class MyGardensQueryHandler implements QueryHandler<MyGardensQuery, MyGardensQueryResult> {
  public queryType: string = MY_GARDENS_QUERY_TYPE;

  async execute(query: MyGardensQuery): Promise<MyGardensQueryResult> {
    // do something with the query and transform it to result.
    return new MyGardensQueryResult(query);
  }
}
