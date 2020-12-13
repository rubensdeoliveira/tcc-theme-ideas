import { injectable, inject } from 'tsyringe'

import ITccsRepository from '../repositories/ITccsRepository'

import Tcc from '../infra/typeorm/entities/Tcc'

interface IRequest {
  page: number
  user_id: string
}

@injectable()
class ListUserCreatedTccsService {
  constructor(
    @inject('TccsRepository')
    private tccsRepository: ITccsRepository
  ) {}

  public async execute({ page, user_id }: IRequest): Promise<Tcc[]> {
    const tccs = await this.tccsRepository.searchUserCreatedTccsPerPage(
      page,
      user_id
    )

    return tccs
  }
}

export default ListUserCreatedTccsService
