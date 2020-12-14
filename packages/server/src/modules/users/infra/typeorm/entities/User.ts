import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm'

import { Exclude, Expose } from 'class-transformer'
import Tcc from '@modules/tccs/infra/typeorm/entities/Tcc'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  surname: string

  @Column()
  email: string

  @Column()
  @Exclude()
  password: string

  @Column()
  avatar: string

  @Column()
  type: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    return this.avatar
      ? `${process.env.APP_API_URL}/files/${this.avatar}`
      : null
  }

  @ManyToMany(() => Tcc)
  @JoinTable({
    name: 'users_tccs',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'tcc_id' }]
  })
  favorited_tccs: Tcc[]
}

export default User
