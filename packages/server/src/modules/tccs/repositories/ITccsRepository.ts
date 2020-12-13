import Tcc from '../infra/typeorm/entities/Tcc'
import ICreateTccDTO from '../dtos/ICreateTccDTO'
import User from '@modules/users/infra/typeorm/entities/User'
import ISearchTccDTO from '../dtos/ISearchTccDTO'

export default interface ITccsRepository {
  searchUserCreatedTccsPerPage(page: number, user_id: string): Promise<Tcc[]>
  searchUserFavoritedTccsPerPage(page: number, user_id: string): Promise<Tcc[]>
  searchTccsPerPage(data: ISearchTccDTO): Promise<Tcc[]>
  findById(id: string): Promise<Tcc | undefined>
  findBySuggestion(suggestion: string): Promise<Tcc | undefined>
  findUserHasFavoritedTcc(user_id: string, tcc_id: string): Promise<boolean>
  create(data: ICreateTccDTO): Promise<Tcc>
  favorite(user: User, tcc: Tcc): Promise<Tcc[]>
  save(tcc: Tcc): Promise<Tcc>
  delete(id: string): Promise<void>
}
