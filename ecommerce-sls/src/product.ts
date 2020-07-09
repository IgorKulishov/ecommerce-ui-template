import {APIGatewayProxyResult} from 'aws-lambda';
import 'source-map-support/register';

// export const search: APIGatewayProxyHandler = (event, _context): APIGatewayProxyResult => {
// export const search = async (event, _context): Promise<any> => {
export async function search(event, _context): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: JSON.stringify({
        msg: 'ok',
        input: event.queryStringParameters
    }),
  };
}
