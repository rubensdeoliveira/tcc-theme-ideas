import { uuid } from 'uuidv4'

import ITccsRepository from '@modules/tccs/repositories/ITccsRepository'
import ICreateTccDTO from '@modules/tccs/dtos/ICreateTccDTO'
import Tcc from '@modules/tccs/infra/typeorm/entities/Tcc'
import User from '@modules/users/infra/typeorm/entities/User'
import ISearchTccDTO from '@modules/tccs/dtos/ISearchTccDTO'

class FakeTccsRepository implements ITccsRepository {
  private tccs: Tcc[] = []

  public async searchUserCreatedTccsPerPage(
    page: number,
    user_id: string
  ): Promise<Tcc[]> {
    const findTccsPaginated = this.tccs.slice(
      (page - 1) * 20,
      (page - 1) * 20 + 20
    )

    findTccsPaginated.sort((a, b) => (a.suggestion > b.suggestion ? 1 : -1))

    const filteredTccsPaginated = findTccsPaginated.filter(
      findTcc => findTcc.user_id === user_id
    )

    return filteredTccsPaginated
  }

  public async searchUserFavoritedTccsPerPage(
    page: number,
    user_id: string
  ): Promise<Tcc[]> {
    return this.tccs
  }

  public async searchTccsPerPage(data: ISearchTccDTO): Promise<Tcc[]> {
    let findTccsPaginated = this.tccs.slice(
      (data.page - 1) * 20,
      (data.page - 1) * 20 + 20
    )

    findTccsPaginated.sort((a, b) => (a.suggestion > b.suggestion ? 1 : -1))

    if (data.course) {
      findTccsPaginated = findTccsPaginated.filter(
        findTcc => findTcc.course === data.course
      )
    }

    if (data.area) {
      findTccsPaginated = findTccsPaginated.filter(
        findTcc => findTcc.area === data.area
      )
    }

    return findTccsPaginated
  }

  public async findUserHasFavoritedTcc(
    user_id: string,
    tcc_id: string
  ): Promise<boolean> {
    return true
  }

  public async favorite(user: User, tcc: Tcc): Promise<Tcc[]> {
    return this.tccs
  }

  public async delete(id: string): Promise<void> {
    const findTccIndex = this.tccs.findIndex(tcc => tcc.id === id)

    this.tccs.splice(findTccIndex, 1)
  }

  public async findById(id: string): Promise<Tcc | undefined> {
    const findTcc = this.tccs.find(tcc => tcc.id === id)

    return findTcc
  }

  public async findBySuggestion(suggestion: string): Promise<Tcc | undefined> {
    const findTcc = this.tccs.find(tcc => tcc.suggestion === suggestion)

    return findTcc
  }

  public async create(tccData: ICreateTccDTO): Promise<Tcc> {
    const tcc = new Tcc()

    Object.assign(tcc, { id: uuid() }, tccData)

    this.tccs.push(tcc)

    return tcc
  }

  public async save(tcc: Tcc): Promise<Tcc> {
    const findIndex = this.tccs.findIndex(findTcc => findTcc.id === tcc.id)

    this.tccs[findIndex] = tcc

    return tcc
  }
}

export default FakeTccsRepository
