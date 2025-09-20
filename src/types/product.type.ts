export type ProductType = {
  sold: number,
  images: string[],
  subcategory: SubcategoryType[],
  ratingsQuantity: number,
  _id: string,
  title: string,
  slug: string,
  description: string,
  quantity: number,
  price: number,
  priceAfterDiscount?: number,
  imageCover: string,
  category: CategoryType,
  brand: BrandType,
  ratingsAverage: number,
  createdAt: string,
  updatedAt: string,
  id: string,
}

export type SubcategoryType = {
  _id: string,
  name: string,
  slug: string,
  category: string,
}

export type CategoryType = {
  _id: string,
  name: string,
  slug: string,
  image: string,
}

export type BrandType = {
  _id: string,
  name: string,
  slug: string,
  image: string,
}

export type allProductsOptionsType = {
    page?: 1 | 2,
    limit?: number,
    brand?: string,
    category?: string,
    subcategory?: string,
}