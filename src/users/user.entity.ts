import { Task } from 'src/task/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  // @Column({
  //     type: 'enum',
  //     enum: Role,
  //     default: Role.User,
  //   })
  //   role: Role;
  @Column({ default: 'ADMIN' })
  role: string;

  @Column({ default: false })
  activate: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: Date;

  @OneToMany(() => Task, (task) => task.assignee)
  task: Task;
}
