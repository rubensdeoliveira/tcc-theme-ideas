import AppError from '@shared/errors/AppError'

import FakeTccsRepository from '../repositories/fakes/FakeTccsRepository'
import ShowTccService from './ShowTccService'

let fakeTccsRepository: FakeTccsRepository
let showTcc: ShowTccService

describe('ShowTcc', () => {
  beforeEach(() => {
    fakeTccsRepository = new FakeTccsRepository()
    showTcc = new ShowTccService(fakeTccsRepository)
  })

  it('should be able to show a tcc from id', async () => {
    const tcc = await fakeTccsRepository.create({
      course: 'Sistemas de Informação',
      area: 'Big Data',
      description: 'Descrição do TCC',
      suggestion: 'Sugestão do TCC',
      links: 'www.link.com.br',
      user_id: 'user_id'
    })

    const showedTcc = await showTcc.execute({
      tcc_id: tcc.id
    })

    expect(showedTcc.suggestion).toBe('Sugestão do TCC')
    expect(showedTcc.course).toBe('Sistemas de Informação')
    expect(showedTcc.area).toBe('Big Data')
  })

  it('should not be able to show tcc from non-existing tcc', async () => {
    expect(
      showTcc.execute({ tcc_id: 'non-existing-tcc-id' })
    ).rejects.toBeInstanceOf(AppError)
  })
})
