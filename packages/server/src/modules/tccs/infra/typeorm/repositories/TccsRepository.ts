import { getRepository, Raw, Repository } from 'typeorm'

import ITccsRepository from '@modules/tccs/repositories/ITccsRepository'
import ICreateTccDTO from '@modules/tccs/dtos/ICreateTccDTO'

import Tcc from '@modules/tccs/infra/typeorm/entities/Tcc'
import User from '@modules/users/infra/typeorm/entities/User'
import ISearchTccDTO from '@modules/tccs/dtos/ISearchTccDTO'

class TccsRepository implements ITccsRepository {
  private ormTccRepository: Repository<Tcc>
  private ormUserRepository: Repository<User>

  constructor() {
    this.ormTccRepository = getRepository(Tcc)
    this.ormUserRepository = getRepository(User)
  }

  public async searchTccsPerPage(searchData: ISearchTccDTO): Promise<Tcc[]> {
    const { page, course, user_type, area } = searchData

    const resultsPerPage = 20
    const rowsToSkip = (page - 1) * resultsPerPage

    const tccs = await this.ormTccRepository.find({
      relations: ['creator'],
      where: {
        course: Raw(
          alias =>
            `LOWER(${alias}) LIKE '%${course ? course.toLowerCase() : ''}%'`
        ),
        area: Raw(
          alias => `LOWER(${alias}) LIKE '%${area ? area.toLowerCase() : ''}%'`
        )
      },
      skip: rowsToSkip,
      take: resultsPerPage,
      order: { suggestion: 'ASC' }
    })

    if (user_type) {
      const filterTccs = tccs.filter(tcc =>
        tcc.creator.type.toLowerCase().includes(user_type.toLowerCase())
      )

      return filterTccs
    }

    return tccs
  }

  public async searchUserCreatedTccsPerPage(
    page: number,
    user_id: string
  ): Promise<Tcc[]> {
    const resultsPerPage = 20
    const rowsToSkip = (page - 1) * resultsPerPage

    const tccs = await this.ormTccRepository.find({
      skip: rowsToSkip,
      take: resultsPerPage,
      order: { suggestion: 'ASC' },
      where: { user_id },
      relations: ['creator']
    })

    return tccs
  }

  public async searchUserFavoritedTccsPerPage(
    page: number,
    user_id: string
  ): Promise<Tcc[]> {
    const resultsPerPage = 20
    const rowsToSkip = (page - 1) * resultsPerPage

    const userFavoriteTccs = await this.ormTccRepository
      .createQueryBuilder('tccs')
      .innerJoin('tccs.users_favorite', 'user', 'user.id = :userId', {
        userId: user_id
      })
      .skip(rowsToSkip)
      .take(resultsPerPage)
      .getMany()

    return userFavoriteTccs
  }

  public async findById(id: string): Promise<Tcc | undefined> {
    const tcc = await this.ormTccRepository.findOne(id, {
      relations: ['creator']
    })

    return tcc
  }

  public async findBySuggestion(suggestion: string): Promise<Tcc | undefined> {
    const tcc = await this.ormTccRepository.findOne({
      where: { suggestion }
    })

    return tcc
  }

  public async findUserHasFavoritedTcc(
    user_id: string,
    tcc_id: string
  ): Promise<boolean> {
    const user = await this.ormUserRepository.findOne(user_id, {
      relations: ['favorited_tccs']
    })

    const findTcc = user.favorited_tccs.find(
      favoriteTcc => favoriteTcc.id === tcc_id
    )

    return !!findTcc
  }

  public async create(tccData: ICreateTccDTO): Promise<Tcc> {
    const tcc = this.ormTccRepository.create(tccData)

    await this.ormTccRepository.save(tcc)

    return tcc
  }

  public async favorite(user: User, tcc: Tcc): Promise<Tcc[]> {
    let favorited_tccs = null

    const userFavoriteTccs = await this.ormTccRepository
      .createQueryBuilder('tccs')
      .innerJoin('tccs.users_favorite', 'user', 'user.id = :userId', {
        userId: user.id
      })
      .getMany()

    const checkUserAlreadyFavoritedTcc = userFavoriteTccs.find(
      userFavorite => userFavorite.id === tcc.id
    )

    if (checkUserAlreadyFavoritedTcc) {
      favorited_tccs = userFavoriteTccs.filter(
        favoriteTcc => favoriteTcc.id !== tcc.id
      )
    } else {
      favorited_tccs = [...userFavoriteTccs, tcc]
    }

    await this.ormUserRepository.save({ ...user, favorited_tccs })

    return await this.ormTccRepository
      .createQueryBuilder('tccs')
      .innerJoin('tccs.users_favorite', 'user', 'user.id = :userId', {
        userId: user.id
      })
      .getMany()
  }

  public async save(tcc: Tcc): Promise<Tcc> {
    return this.ormTccRepository.save(tcc)
  }

  public async delete(id: string): Promise<void> {
    await this.ormTccRepository.delete(id)
  }
}

export default TccsRepository
