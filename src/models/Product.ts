export interface IProductShortModel {
  id: string,
  title: string,
  price: number,
  weight: string,
  description: string,
  thumbnail: string,
}

export interface IProductModel extends IProductShortModel {
  images: IImageModel[],
  full_description: IFullDescriptionModel,
}

export interface IImageModel {
  id: number,
  name: string,
}
export interface IFullDescriptionModel {
  id: number,
  fullDescription: string
}