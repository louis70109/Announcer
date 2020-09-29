import {
  BaseEntity,
  Entity,
  BeforeInsert,
  BeforeUpdate,
  PrimaryColumn,
  Column,
} from "typeorm";
import { Type } from "class-transformer";
@Entity()
export class Notify extends BaseEntity {
  @PrimaryColumn()
  line_id: string;

  @Column()
  token: string;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt?: Date;

  @BeforeInsert()
  updateDateCreation() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateDateUpdate() {
    this.updatedAt = new Date();
  }

  static async build(params) {
    const entity = new this();
    Object.keys(params).forEach((key) => {
      entity[key] = params[key];
    });
    await entity.save();
    return await this.findOne(params);
  }

  static async findOrCreateBy(params) {
    const entity = await this.findOne(params);
    if (entity != null) {
      return entity;
    }
    return await this.build(params);
  }

  static async exists(params) {
    const entity = await this.findOne(params);
    return entity != null;
  }
}
