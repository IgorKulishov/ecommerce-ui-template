import * as product from './product';

test('search non existing product', async() => {
  let data = await product.search({queryStringParameters: {name: 'not there'}}, {});
  expect(data).not.toBeNull();
  expect(data.statusCode).toBe(200);
  expect(data.body).toBe('[]');
});


test('search with single result', async() => {
  let data = await product.search({queryStringParameters: {name: 'ink'}}, {});
  expect(data).not.toBeNull();
  expect(data.statusCode).toBe(200);
  expect(JSON.parse(data.body).length).toBe(1);
  expect(JSON.parse(data.body)[0].name).toBe('Magic Ink');
  expect(JSON.parse(data.body)[0].id).toBe(2);
});

test('search with two results', async() => {
  let data = await product.search({queryStringParameters: {name: 'magic'}}, {});
  expect(data).not.toBeNull();
  expect(data.statusCode).toBe(200);
  expect(JSON.parse(data.body).length).toBe(2);
  expect(JSON.parse(data.body)[0].name).toBe('Magic Pen');
  expect(JSON.parse(data.body)[0].id).toBe(1);
  expect(JSON.parse(data.body)[1].name).toBe('Magic Ink');
  expect(JSON.parse(data.body)[1].id).toBe(2);
});
