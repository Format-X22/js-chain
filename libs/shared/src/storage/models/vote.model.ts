import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ paranoid: true })
export class VoteModel extends Model {
    @PrimaryKey
    @Column(DataType.STRING(35))
    fromAddress: string;

    @PrimaryKey
    @Column(DataType.STRING(35))
    toAddress: string;

    @Column(DataType.BIGINT)
    amount: bigint;

    @Column(DataType.BOOLEAN)
    asSupport: boolean;
}
