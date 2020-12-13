import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import TccsController from '../controllers/TccsController'
import UserCreatedTccsController from '../controllers/UserCreatedTccsController'
import UserFavoritedTccsController from '../controllers/UserFavoritedTccsController'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const tccsRouter = Router()
const tccsController = new TccsController()
const userCreatedTccsController = new UserCreatedTccsController()
const userFavoritedTccsController = new UserFavoritedTccsController()

tccsRouter.get('/:id', tccsController.show)

tccsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().required(),
      course: Joi.string(),
      user_type: Joi.string(),
      area: Joi.string()
    }
  }),
  tccsController.index
)

tccsRouter.use(ensureAuthenticated)

tccsRouter.get(
  '/created/me',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().required()
    }
  }),
  userCreatedTccsController.index
)

tccsRouter.get(
  '/favorites/me',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().required()
    }
  }),
  userFavoritedTccsController.index
)

tccsRouter.get(
  '/favorites/has-favorite',
  celebrate({
    [Segments.QUERY]: {
      tcc_id: Joi.string().required()
    }
  }),
  userFavoritedTccsController.show
)

tccsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      course: Joi.string().required(),
      suggestion: Joi.string().required(),
      description: Joi.string().required(),
      area: Joi.string().required(),
      links: Joi.string().required()
    }
  }),
  tccsController.create
)

tccsRouter.post(
  '/favorite',
  celebrate({
    [Segments.BODY]: {
      tcc_id: Joi.string().required()
    }
  }),
  userFavoritedTccsController.create
)

tccsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      course: Joi.string().required(),
      suggestion: Joi.string().required(),
      description: Joi.string().required(),
      area: Joi.string().required(),
      links: Joi.string().required()
    }
  }),
  tccsController.update
)

tccsRouter.delete('/:id', tccsController.delete)

export default tccsRouter
