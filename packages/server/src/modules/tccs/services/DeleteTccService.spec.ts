import AppError from '@shared/errors/AppError'

import FakeTccsRepository from '../repositories/fakes/FakeTccsRepository'
import DeleteTccService from './DeleteTccService'

let fakeTccsRepository: FakeTccsRepository
let deleteTcc: DeleteTccService

describe('DeleteTcc', () => {
  beforeEach(() => {
    fakeTccsRepository = new FakeTccsRepository()
    deleteTcc = new DeleteTccService(fakeTccsRepository)
  })

  it('should be able to delete a tcc', async () => {
    const tcc = await fakeTccsRepository.create({
      course: 'Sistemas de Informação',
      area: 'Big Data',
      description: 'Descrição do TCC',
      suggestion: 'Sugestão do TCC',
      links: 'www.link.com.br',
      user_id: 'user_id'
    })

    await deleteTcc.execute({
      tcc_id: tcc.id,
      user_id: tcc.user_id
    })

    const findRoleDeleted = await fakeTccsRepository.findById(tcc.id)

    expect(findRoleDeleted).toBeUndefined()
  })

  it('should not be able to delete a tcc that does not exists', async () => {
    await expect(
      deleteTcc.execute({
        tcc_id: 'invalid_tcc_id',
        user_id: 'user_id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to delete a tcc that does not belong to user', async () => {
    const tcc = await fakeTccsRepository.create({
      course: 'Sistemas de Informação',
      area: 'Big Data',
      description: 'Descrição do TCC',
      suggestion: 'Sugestão do TCC',
      links: 'www.link.com.br',
      user_id: 'user_id'
    })

    await expect(
      deleteTcc.execute({
        tcc_id: tcc.id,
        user_id: 'other_user_id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
