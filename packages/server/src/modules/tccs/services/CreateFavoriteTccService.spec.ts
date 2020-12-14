import AppError from '@shared/errors/AppError'

import FakeTccsRepository from '../repositories/fakes/FakeTccsRepository'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import CreateFavoriteTccService from './CreateFavoriteTccService'

let fakeTccsRepository: FakeTccsRepository
let fakeUsersRepository: FakeUsersRepository
let createFavoriteTcc: CreateFavoriteTccService

describe('CreateFavoriteTcc', () => {
  beforeEach(() => {
    fakeTccsRepository = new FakeTccsRepository()
    fakeUsersRepository = new FakeUsersRepository()
    createFavoriteTcc = new CreateFavoriteTccService(
      fakeTccsRepository,
      fakeUsersRepository
    )
  })

  it('should be able to favorite a tcc', async () => {
    const tcc = await fakeTccsRepository.create({
      course: 'Sistemas de Informação',
      area: 'Big Data',
      description: 'Descrição do TCC',
      suggestion: 'Sugestão do TCC',
      links: 'www.link.com.br',
      user_id: 'user_id'
    })

    const user = await fakeUsersRepository.create({
      name: 'Ada',
      surname: 'Lovelace',
      email: 'ada@gmail.com',
      type: 'Docente',
      password: '12345678'
    })

    const favorite = await createFavoriteTcc.execute({
      user_id: user.id,
      tcc_id: tcc.id
    })

    expect(favorite).toEqual([tcc])
  })

  it('should not be able to favorite a non existing tcc', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Ada',
      surname: 'Lovelace',
      email: 'ada@gmail.com',
      type: 'Docente',
      password: '12345678'
    })

    await expect(
      createFavoriteTcc.execute({
        user_id: user.id,
        tcc_id: 'non-existing-tcc'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to favorite with non existing user', async () => {
    const tcc = await fakeTccsRepository.create({
      course: 'Sistemas de Informação',
      area: 'Big Data',
      description: 'Descrição do TCC',
      suggestion: 'Sugestão do TCC',
      links: 'www.link.com.br',
      user_id: 'user_id'
    })

    await expect(
      createFavoriteTcc.execute({
        user_id: 'non-existing-user',
        tcc_id: tcc.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
