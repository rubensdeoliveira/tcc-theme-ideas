import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import ShowTccService from '@modules/tccs/services/ShowTccService'
import ListTccsService from '@modules/tccs/services/ListTccsService'
import CreateTccService from '@modules/tccs/services/CreateTccService'
import UpdateTccService from '@modules/tccs/services/UpdateTccService'
import DeleteTccService from '@modules/tccs/services/DeleteTccService'

export default class TccsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const showTcc = container.resolve(ShowTccService)

    const tcc = await showTcc.execute({
      tcc_id: id
    })

    return response.json(classToClass(tcc))
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page, course, user_type, area } = request.query

    const listTccs = container.resolve(ListTccsService)

    const tccs = await listTccs.execute({
      page: Number(page),
      course: course ? String(course) : undefined,
      user_type: user_type ? String(user_type) : undefined,
      area: area ? String(area) : undefined
    })

    return response.json(classToClass(tccs))
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { course, suggestion, description, area, links } = request.body

    const createTcc = container.resolve(CreateTccService)

    const tcc = await createTcc.execute({
      user_id,
      course,
      suggestion,
      description,
      area,
      links
    })

    return response.json(classToClass(tcc))
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { id } = request.params
    const { course, suggestion, description, area, links } = request.body

    const updateTcc = container.resolve(UpdateTccService)

    const tcc = await updateTcc.execute({
      user_id,
      tcc_id: id,
      course,
      suggestion,
      description,
      area,
      links
    })

    return response.json(classToClass(tcc))
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { id } = request.params

    const deleteTcc = container.resolve(DeleteTccService)

    await deleteTcc.execute({ user_id, tcc_id: id })

    return response.status(204).send()
  }
}
