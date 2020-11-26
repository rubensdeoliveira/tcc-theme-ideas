import AppError from '@shared/errors/AppError'

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserService from './CreateUserService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserService

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
  })

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Junior Oliveira',
      email: 'junior@gmail.com',
      password: '12345678'
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a new user with same email', async () => {
    await createUser.execute({
      name: 'Junior Oliveira',
      email: 'junior@gmail.com',
      password: '12345678'
    })

    await expect(
      createUser.execute({
        name: 'Junior Oliveira',
        email: 'junior@gmail.com',
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
