import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreateFavoriteTccService from '@modules/tccs/services/CreateFavoriteTccService'
import ListUserFavoritedTccsService from '@modules/tccs/services/ListUserFavoritedTccsService'
import ShowUserHasFavoritedTccService from '@modules/tccs/services/ShowUserHasFavoritedTccService'

export default class UserFavoritedTccsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { tcc_id } = request.query

    const showUserHasFavoritedTcc = container.resolve(
      ShowUserHasFavoritedTccService
    )

    const tccs = await showUserHasFavoritedTcc.execute({
      user_id,
      tcc_id
    })

    return response.json(classToClass(tccs))
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { page } = request.query

    const listUserFavoriteTccs = container.resolve(ListUserFavoritedTccsService)

    const tccs = await listUserFavoriteTccs.execute({
      page: Number(page),
      user_id
    })

    return response.json(classToClass(tccs))
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { tcc_id } = request.body

    const createFavoriteTcc = container.resolve(CreateFavoriteTccService)

    const favorited_tccs = await createFavoriteTcc.execute({
      user_id,
      tcc_id
    })

    return response.json(classToClass(favorited_tccs))
  }

  // public async delete(request: Request, response: Response): Promise<Response> {
  //   const user_id = request.user.id
  //   const { id } = request.params

  //   const deleteTcc = container.resolve(DeleteTccService)

  //   await deleteTcc.execute({ user_id, tcc_id: id })

  //   return response.status(204).send()
  // }
}
