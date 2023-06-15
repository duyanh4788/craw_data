import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, AllowNull, Index } from 'sequelize-typescript';

@Table({
  tableName: 'drivers'
})
export class DriversModel extends Model<DriversModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public driverId: number;

  @AllowNull
  @Index
  @Column
  public carName: string;

  @AllowNull
  @Index
  @Column
  public driverName: string;

  @AllowNull
  @Column
  public nationality: string;

  @AllowNull
  @Column
  public pos: string;

  @AllowNull
  @Column
  public pts: string;

  @AllowNull
  @Index
  @Column
  public seasonRaces: string;

  @CreatedAt
  @Column
  public createdAt: Date;

  @UpdatedAt
  @Column
  public updatedAt: Date;
}
