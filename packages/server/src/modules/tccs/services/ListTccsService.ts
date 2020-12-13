import { injectable, inject } from 'tsyringe'

import ITccsRepository from '../repositories/ITccsRepository'

import Tcc from '../infra/typeorm/entities/Tcc'

interface IRequest {
  page: number
  course?: string
  user_type?: string
  area?: string
}

@injectable()
class ListTccsService {
  constructor(
    @inject('TccsRepository')
    private tccsRepository: ITccsRepository
  ) {}

  public async execute({
    page,
    course,
    user_type,
    area
  }: IRequest): Promise<Tcc[]> {
    const tccs = await this.tccsRepository.searchTccsPerPage({
      page,
      course,
      user_type,
      area
    })

    return tccs
  }
}

export default ListTccsService
