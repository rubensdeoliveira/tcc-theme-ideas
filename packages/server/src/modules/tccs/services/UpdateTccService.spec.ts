import AppError from '@shared/errors/AppError'

import FakeTccsRepository from '../repositories/fakes/FakeTccsRepository'
import UpdateTccService from './UpdateTccService'

let fakeTccsRepository: FakeTccsRepository
let updateTcc: UpdateTccService

describe('UpdateTcc', () => {
  beforeEach(() => {
    fakeTccsRepository = new FakeTccsRepository()
    updateTcc = new UpdateTccService(fakeTccsRepository)
  })

  it('should be able to update tcc', async () => {
    const tcc = await fakeTccsRepository.create({
      course: 'Sistemas de Informação',
      area: 'Big Data',
      description: 'Descrição do TCC',
      suggestion: 'Sugestão do TCC',
      links: 'www.link.com.br',
      user_id: 'user_id'
    })

    const updatedTcc = await updateTcc.execute({
      course: 'Ciências da Computação',
      area: 'Engenharia de Software',
      description: 'Descrição do TCC editado',
      suggestion: 'Sugestão do TCC editado',
      links: 'www.novolink.com.br',
      tcc_id: tcc.id,
      user_id: 'user_id'
    })

    expect(updatedTcc.course).toBe('Ciências da Computação')
    expect(updatedTcc.area).toBe('Engenharia de Software')
    expect(updatedTcc.description).toBe('Descrição do TCC editado')
    expect(updatedTcc.suggestion).toBe('Sugestão do TCC editado')
  })

  it('should not be able to update tcc from non-existing tcc', async () => {
    expect(
      updateTcc.execute({
        course: 'Ciências da Computação',
        area: 'Engenharia de Software',
        description: 'Descrição do TCC editado',
        suggestion: 'Sugestão do TCC editado',
        links: 'www.novolink.com.br',
        tcc_id: 'non-existing-tcc',
        user_id: 'user_id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to change suggestion if suggestion already exists', async () => {
    await fakeTccsRepository.create({
      course: 'Sistemas de Informação',
      area: 'Big Data',
      description: 'Descrição do TCC',
      suggestion: 'Sugestão do TCC',
      links: 'www.link.com.br',
      user_id: 'user_id'
    })

    const tcc = await fakeTccsRepository.create({
      course: 'Ciências da Computação',
      area: 'Engenharia de Software',
      description: 'Outra descrição do TCC',
      suggestion: 'Outra sugestão do TCC',
      links: 'www.outrolink.com.br',
      user_id: 'another_user_id'
    })

    await expect(
      updateTcc.execute({
        course: 'Ciências da Computação',
        area: 'Engenharia de Software',
        description: 'Outra descrição do TCC',
        suggestion: 'Sugestão do TCC',
        links: 'www.outrolink.com.br',
        user_id: 'another_user_id',
        tcc_id: tcc.id
      })
    )
  })

  it('should not be able to change tcc if tcc does not belong to user', async () => {
    const tcc = await fakeTccsRepository.create({
      course: 'Sistemas de Informação',
      area: 'Big Data',
      description: 'Descrição do TCC',
      suggestion: 'Sugestão do TCC',
      links: 'www.link.com.br',
      user_id: 'user_id'
    })

    await expect(
      updateTcc.execute({
        course: 'Ciências da Computação',
        area: 'Engenharia de Software',
        description: 'Outra descrição do TCC',
        suggestion: 'Sugestão do TCC',
        links: 'www.outrolink.com.br',
        user_id: 'another_user_id',
        tcc_id: tcc.id
      })
    )
  })
})
