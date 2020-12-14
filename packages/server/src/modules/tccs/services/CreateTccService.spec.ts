import AppError from '@shared/errors/AppError'

import FakeTccsRepository from '../repositories/fakes/FakeTccsRepository'
import CreateTccService from './CreateTccService'

let fakeTccsRepository: FakeTccsRepository
let createTcc: CreateTccService

describe('CreateTcc', () => {
  beforeEach(() => {
    fakeTccsRepository = new FakeTccsRepository()
    createTcc = new CreateTccService(fakeTccsRepository)
  })

  it('should be able to create a new tcc', async () => {
    const tcc = await createTcc.execute({
      course: 'Sistemas de Informação',
      area: 'Big Data',
      description: 'Descrição do TCC',
      suggestion: 'Sugestão do TCC',
      links: 'www.link.com.br',
      user_id: 'user_id'
    })

    expect(tcc).toHaveProperty('id')
  })

  it('should not be able to create a new tcc with same suggestion', async () => {
    await createTcc.execute({
      course: 'Sistemas de Informação',
      area: 'Big Data',
      description: 'Descrição do TCC',
      suggestion: 'Sugestão do TCC',
      links: 'www.link.com.br',
      user_id: 'user_id'
    })

    await expect(
      createTcc.execute({
        course: 'Sistemas de Informação',
        area: 'Big Data',
        description: 'Descrição do TCC',
        suggestion: 'Sugestão do TCC',
        links: 'www.link.com.br',
        user_id: 'user_id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
