import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, AllowNull, Index } from 'sequelize-typescript';

@Table({
  tableName: 'teams'
})
export class TeamsModel extends Model<TeamsModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public teamId: number;

  @AllowNull
  @Index
  @Column
  public teamName: string;

  @AllowNull
  @Column
  public pts: string;

  @AllowNull
  @Column
  public pos: string;

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
