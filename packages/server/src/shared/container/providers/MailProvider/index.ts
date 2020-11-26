import { container } from 'tsyringe'

import IMailProvider from './models/IMailProvider'
import EtherealMailProvider from './implementations/EtherealMailProvider'

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider)
)
