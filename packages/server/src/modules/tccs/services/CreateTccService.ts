import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import ITccsRepository from '../repositories/ITccsRepository'

import Tcc from '../infra/typeorm/entities/Tcc'

interface IRequest {
  user_id: string
  course: string
  suggestion: string
  description: string
  area: string
  links: string
}

@injectable()
class CreateTccService {
  constructor(
    @inject('TccsRepository')
    private tccsRepository: ITccsRepository
  ) {}

  public async execute({
    user_id,
    course,
    suggestion,
    description,
    area,
    links
  }: IRequest): Promise<Tcc> {
    const checkTccExists = await this.tccsRepository.findBySuggestion(
      suggestion
    )
    if (checkTccExists) {
      throw new AppError('A sugestão de tema já existe na base de dados')
    }

    const tcc = await this.tccsRepository.create({
      user_id,
      course,
      suggestion,
      description,
      area,
      links
    })

    return tcc
  }
}

export default CreateTccService
