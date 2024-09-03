enum API {
    USER = '/user404',
}

interface UserDetailModel {
    id: number,
    name: string,
    age: number,
}

export interface UserRequestParams {
    id?: number
  }

// interface NewsListResponse {
//     items: UserDetailModel
//     meta: PaginationMeta
// }

export async function getData(params?: UserRequestParams ) {
    return await useHttp.get<UserDetailModel>(API.USER, params)
}

export type { UserDetailModel }
