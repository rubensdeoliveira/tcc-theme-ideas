import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import ListUserCreatedTccsService from '@modules/tccs/services/ListUserCreatedTccsService'

export default class UserCreatedTccsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { page } = request.query

    const listUserCreatedTccs = container.resolve(ListUserCreatedTccsService)

    const tccs = await listUserCreatedTccs.execute({
      page: Number(page),
      user_id
    })

    return response.json(classToClass(tccs))
  }
}
