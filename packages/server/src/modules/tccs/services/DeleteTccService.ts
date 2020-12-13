import AppError from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'

import ITccsRepository from '../repositories/ITccsRepository'

interface IRequest {
  user_id: string
  tcc_id: string
}

@injectable()
class DeleteTccService {
  constructor(
    @inject('TccsRepository')
    private tccsRepository: ITccsRepository
  ) {}

  public async execute({ user_id, tcc_id }: IRequest): Promise<void> {
    const tcc = await this.tccsRepository.findById(tcc_id)
    if (!tcc) {
      throw new AppError('Tema de TCC não encontrado', 404)
    }

    if (tcc.user_id !== user_id) {
      throw new AppError('Você não tem permissões para deletar esse tema', 401)
    }

    await this.tccsRepository.delete(tcc_id)
  }
}

export default DeleteTccService
