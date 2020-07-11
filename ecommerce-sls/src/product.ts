import {APIGatewayProxyResult} from 'aws-lambda';
import 'source-map-support/register';
import {ProductDao} from "./product.dao";

let products: ProductDao[] = [];

products.push({
  id: 1,
  name: 'Magic Pen',
  slug: 'magic-pen',
  description: 'Magic pen that allows to create both 2D and 3D pictures.'
});

products.push({
  id: 2,
  name: 'Magic Ink',
  slug: 'magic-ink',
});

export async function search(event, _context): Promise<APIGatewayProxyResult> {
  let name = event.queryStringParameters['name'];
  let text = event.queryStringParameters['text'];

  let found: ProductDao[] = [];
  for(let i=0; i<products.length; i++) {
    let match = false;
    let p = products[i];
    if(name && p.name.toLowerCase().indexOf(name.toLowerCase()) !== -1) {
      match = true;
    }
    if(text && (p.name.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
        (p.description && p.description.toLowerCase().indexOf(text.toLowerCase()) !== -1))) {
      match = true;
    }

    if(match) {
      found.push(p);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(found),
  };
}

