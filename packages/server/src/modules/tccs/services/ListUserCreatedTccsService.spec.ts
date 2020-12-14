import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeTccsRepository from '../repositories/fakes/FakeTccsRepository'
import ListUserCreatedTccsService from './ListUserCreatedTccsService'

let fakeUsersRepository: FakeUsersRepository
let fakeTccsRepository: FakeTccsRepository
let listUserCreatedTccs: ListUserCreatedTccsService

describe('ListUserCreatedTccs', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeTccsRepository = new FakeTccsRepository()
    listUserCreatedTccs = new ListUserCreatedTccsService(fakeTccsRepository)
  })

  it('should be able to list tccs created by user by page', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Ada',
      surname: 'Lovelace',
      email: 'ada@gmail.com',
      type: 'Docente',
      password: '12345678'
    })

    const user2 = await fakeUsersRepository.create({
      name: 'Bill',
      surname: 'Gates',
      email: 'gates@gmail.com',
      type: 'Discente',
      password: '12345678'
    })

    const tcc1 = await fakeTccsRepository.create({
      course: 'Curso',
      area: 'Area 1',
      description: 'Descrição 1',
      suggestion: 'Sugestão 1',
      links: 'www.link1.com.br',
      user_id: user1.id
    })

    const tcc2 = await fakeTccsRepository.create({
      course: 'Curso',
      area: 'Area 2',
      description: 'Descrição 2',
      suggestion: 'Sugestão 2',
      links: 'www.link2.com.br',
      user_id: user1.id
    })

    const tcc3 = await fakeTccsRepository.create({
      course: 'Curso',
      area: 'Area 3',
      description: 'Descrição 3',
      suggestion: 'Sugestão 3',
      links: 'www.link3.com.br',
      user_id: user2.id
    })

    const tcc4 = await fakeTccsRepository.create({
      course: 'Curso 3',
      area: 'Area 4',
      description: 'Descrição 3',
      suggestion: 'Sugestão 3',
      links: 'www.link3.com.br',
      user_id: user2.id
    })

    const firstUserPage1 = await listUserCreatedTccs.execute({
      page: 1,
      user_id: user1.id
    })

    const firstUserPage2 = await listUserCreatedTccs.execute({
      page: 2,
      user_id: user1.id
    })

    const secondUserPage1 = await listUserCreatedTccs.execute({
      page: 1,
      user_id: user2.id
    })

    const secondUserPage2 = await listUserCreatedTccs.execute({
      page: 2,
      user_id: user2.id
    })

    expect(firstUserPage1).toEqual([tcc1, tcc2])
    expect(firstUserPage2).toEqual([])
    expect(secondUserPage1).toEqual([tcc3, tcc4])
    expect(secondUserPage2).toEqual([])
  })
})
