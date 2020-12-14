import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeTccsRepository from '../repositories/fakes/FakeTccsRepository'
import ListTccsService from './ListTccsService'

let fakeUsersRepository: FakeUsersRepository
let fakeTccsRepository: FakeTccsRepository
let listTccs: ListTccsService

describe('ListTccs', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeTccsRepository = new FakeTccsRepository()
    listTccs = new ListTccsService(fakeTccsRepository)
  })

  it('should be able to list tccs by page', async () => {
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

    const page1 = await listTccs.execute({
      page: 1
    })

    const page2 = await listTccs.execute({
      page: 2
    })

    expect(page1).toEqual([tcc1, tcc2, tcc3, tcc4])
    expect(page2).toEqual([])
  })

  it('should be able to list tccs by page and course', async () => {
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

    await fakeTccsRepository.create({
      course: 'Curso 3',
      area: 'Area 4',
      description: 'Descrição 3',
      suggestion: 'Sugestão 3',
      links: 'www.link3.com.br',
      user_id: user2.id
    })

    const page1 = await listTccs.execute({
      page: 1,
      course: 'Curso'
    })

    const page2 = await listTccs.execute({
      page: 2,
      course: 'Curso'
    })

    expect(page1).toEqual([tcc1, tcc2, tcc3])
    expect(page2).toEqual([])
  })

  it('should be able to list tccs by page, course and area', async () => {
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
      area: 'Area 1',
      description: 'Descrição 2',
      suggestion: 'Sugestão 2',
      links: 'www.link2.com.br',
      user_id: user1.id
    })

    await fakeTccsRepository.create({
      course: 'Curso',
      area: 'Area 3',
      description: 'Descrição 3',
      suggestion: 'Sugestão 3',
      links: 'www.link3.com.br',
      user_id: user2.id
    })

    await fakeTccsRepository.create({
      course: 'Curso 3',
      area: 'Area 4',
      description: 'Descrição 3',
      suggestion: 'Sugestão 3',
      links: 'www.link3.com.br',
      user_id: user2.id
    })

    const page1 = await listTccs.execute({
      page: 1,
      course: 'Curso',
      area: 'Area 1'
    })

    const page2 = await listTccs.execute({
      page: 2,
      course: 'Curso',
      area: 'Area 1'
    })

    expect(page1).toEqual([tcc1, tcc2])
    expect(page2).toEqual([])
  })
})
