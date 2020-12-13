import User from '@modules/users/infra/typeorm/entities/User'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable
} from 'typeorm'

@Entity('tcc_themes')
class Tcc {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  course: string

  @Column()
  suggestion: string

  @Column()
  description: string

  @Column()
  area: string

  @Column()
  links: string

  @Column()
  user_id: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  creator: User

  @ManyToMany(() => User)
  @JoinTable({
    name: 'users_tccs',
    joinColumns: [{ name: 'tcc_id' }],
    inverseJoinColumns: [{ name: 'user_id' }]
  })
  users_favorite: User[]
}

export default Tcc
