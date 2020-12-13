import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import ITccsRepository from '../repositories/ITccsRepository'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import Tcc from '../infra/typeorm/entities/Tcc'

interface IRequest {
  user_id: string
  tcc_id: string
}

@injectable()
class CreateTccService {
  constructor(
    @inject('TccsRepository')
    private tccsRepository: ITccsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id, tcc_id }: IRequest): Promise<Tcc[]> {
    const user = await this.usersRepository.findById(user_id)
    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    const tcc = await this.tccsRepository.findById(tcc_id)
    if (!tcc) {
      throw new AppError('Tema de TCC não encontrado', 404)
    }

    return await this.tccsRepository.favorite(user, tcc)
  }
}

export default CreateTccService
