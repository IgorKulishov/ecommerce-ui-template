export class ProductInfoDao {
  id: number
  imageList: {
    largeUrl: string
  }[]
}

export class ProductDao {
  id?: number
  name: string
  description?: string
  slug?: string
  price?: number
  productInfo?: ProductInfoDao
}
