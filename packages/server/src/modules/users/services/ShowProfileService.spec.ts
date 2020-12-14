import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import ShowProfileService from './ShowProfileService'

let fakeUsersRepository: FakeUsersRepository
let showProfile: ShowProfileService

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    showProfile = new ShowProfileService(fakeUsersRepository)
  })

  it('should be able to show user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Ada',
      surname: 'Lovelace',
      email: 'ada@gmail.com',
      type: 'Docente',
      password: '12345678'
    })

    const profile = await showProfile.execute({
      user_id: user.id
    })

    expect(profile.name).toBe('Ada')
    expect(profile.surname).toBe('Lovelace')
    expect(profile.email).toBe('ada@gmail.com')
  })

  it('should not be able to show user profile from non-existing user', async () => {
    expect(
      showProfile.execute({ user_id: 'non-existing-user-id' })
    ).rejects.toBeInstanceOf(AppError)
  })
})
