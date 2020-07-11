import {APIGatewayProxyResult} from 'aws-lambda';
import 'source-map-support/register';
import {ProductDao} from "./product.dao";

let products: ProductDao[] = [];

products.push({
  id: 1,
  name: 'Magic Pen',
  slug: 'magic-pen'
});

products.push({
  id: 2,
  name: 'Magic Ink',
  slug: 'magic-ink'
});

export async function search(event, _context): Promise<APIGatewayProxyResult> {
  let name = event.queryStringParameters['name'];

  let found: ProductDao[] = [];
  for(let i=0; i<products.length; i++) {
    if(products[i].name.toLowerCase().indexOf(name.toLowerCase()) !== -1) {
      found.push(products[i]);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(found),
  };
}

