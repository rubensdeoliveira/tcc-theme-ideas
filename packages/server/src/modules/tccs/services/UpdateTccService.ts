import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import ITccsRepository from '../repositories/ITccsRepository'

import Tcc from '../infra/typeorm/entities/Tcc'

interface IRequest {
  user_id: string
  tcc_id: string
  course: string
  suggestion: string
  description: string
  area: string
  links: string
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('TccsRepository')
    private tccsRepository: ITccsRepository
  ) {}

  public async execute({
    user_id,
    tcc_id,
    course,
    suggestion,
    description,
    area,
    links
  }: IRequest): Promise<Tcc> {
    const tcc = await this.tccsRepository.findById(tcc_id)
    if (!tcc) {
      throw new AppError('Tema de TCC não encontrado', 404)
    }

    const tccWithUpdatedSuggestion = await this.tccsRepository.findBySuggestion(
      suggestion
    )
    if (tccWithUpdatedSuggestion && tccWithUpdatedSuggestion.id !== tcc.id) {
      throw new AppError('A sugestão de tema já existe na base de dados')
    }

    if (tcc.user_id !== user_id) {
      throw new AppError('Você não tem permissões para editar esse tema', 401)
    }

    return this.tccsRepository.save({
      ...tcc,
      course,
      suggestion,
      description,
      area,
      links
    })
  }
}

export default UpdateProfileService
