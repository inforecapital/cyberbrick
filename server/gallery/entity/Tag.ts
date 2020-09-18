/**
 * Created by Jacob Xie on 9/1/2020.
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  Column,
  JoinTable,
  Unique
} from "typeorm"
import * as common from "../common"
import { Category } from "./Category"
import { Content } from "./Content"

@Entity({ name: common.tag })
@Unique([common.name, common.category])
export class Tag {

  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column("varchar")
  name!: string

  @Column("text", { nullable: true })
  description?: string

  @ManyToOne(() => Category, c => c.tags, { nullable: false })
  category!: Category

  @ManyToMany(() => Content, c => c.tags, { nullable: true })
  @JoinTable()
  contents!: Content[]
}
