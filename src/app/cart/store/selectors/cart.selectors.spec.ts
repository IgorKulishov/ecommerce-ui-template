import { selectOrdersHistory } from './cart.selectors';
import { CartState } from '../states/cart.states'

describe('Cart selector', () => {
  const placedOrderHistoryMock = {
    orderStoredInHistoryApi: [{
      id: "c9f038b0-7eeb-11eb-ae3e-dd3439581aab",
      checked: false,
      orderDetails: {
        totalAmount: 123,
        orderNumber: "8aebb491234c95591018d476fd86dd49",
        orderToken: null, totalQuantity: 1,
        paymentPlaced: null
      },
      updatedAt: 1615083673531,
      userid: "35",
    }]
  };
  it('should select placed orders history', () => {
    const result = selectOrdersHistory.projector(placedOrderHistoryMock);
    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual("c9f038b0-7eeb-11eb-ae3e-dd3439581aab");
  });
});
