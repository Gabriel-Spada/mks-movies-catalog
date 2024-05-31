import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {hashPasswordTransform} from "../../common/helpers/crypto";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({transformer: hashPasswordTransform})
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn({nullable: true})
    deletedAt?: Date;
}