import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column({default: 'PENDING'})
    status: string

    @Column()
    point: number

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    dateCreated: Date

    @ManyToOne(() => User, (user) => user.task,  { eager: false }) //eager is auto set to false when not added, can be added to either of task.entity or user.entity, the function is to automatically return relationship data when set to true
    assignee: User
}