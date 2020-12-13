import { injectable, inject } from 'tsyringe'

import ITccsRepository from '../repositories/ITccsRepository'

interface IRequest {
  tcc_id: string
  user_id: string
}

@injectable()
class ShowUserHasFavoritedTccService {
  constructor(
    @inject('TccsRepository')
    private tccsRepository: ITccsRepository
  ) {}

  public async execute({ user_id, tcc_id }: IRequest): Promise<boolean> {
    const findTcc = await this.tccsRepository.findUserHasFavoritedTcc(
      user_id,
      tcc_id
    )

    return findTcc
  }
}

export default ShowUserHasFavoritedTccService
