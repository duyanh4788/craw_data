import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, AllowNull, Index } from 'sequelize-typescript';

@Table({
  tableName: 'races'
})
export class RacesModel extends Model<RacesModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public reacesId: number;

  @AllowNull
  @Index
  @Column
  public carName: string;

  @AllowNull
  @Column
  public date: string;

  @AllowNull
  @Column
  public grandPrix: string;

  @AllowNull
  @Column
  public laps: string;

  @AllowNull
  @Index
  @Column
  public time: string;

  @AllowNull
  @Column
  public winner: string;

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
