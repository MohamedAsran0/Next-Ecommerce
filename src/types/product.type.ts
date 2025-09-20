export type ProductType = {
  sold: number,
  images: string[],
  subcategory: ProductSubcategoryType[],
  ratingsQuantity: number,
  _id: string,
  title: string,
  slug: string,
  description: string,
  quantity: number,
  price: number,
  priceAfterDiscount?: number,
  imageCover: string,
  category: ProductCategoryType,
  brand: ProductBrandType,
  ratingsAverage: number,
  createdAt: string,
  updatedAt: string,
  id: string,
}

export type ProductSubcategoryType = {
  _id: string,
  name: string,
  slug: string,
  category: string,
}

export type ProductCategoryType = {
  _id: string,
  name: string,
  slug: string,
  image: string,
}

export type ProductBrandType = {
  _id: string,
  name: string,
  slug: string,
  image: string,
}