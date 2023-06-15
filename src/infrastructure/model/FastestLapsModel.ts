import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, AllowNull, Index } from 'sequelize-typescript';

@Table({
  tableName: 'fastest_laps'
})
export class FastestLapsModel extends Model<FastestLapsModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public fastestLapId: number;

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
  public grandPrix: string;

  @AllowNull
  @Column
  public time: string;

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
