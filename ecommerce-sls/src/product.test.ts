import * as product from './product';

test('correct status code async', async() => {
  let data = await product.search({queryStringParameters: {}}, {});
  expect(data).not.toBeNull();
  expect(data.statusCode).toBe(200);
});
