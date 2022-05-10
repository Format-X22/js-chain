import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ paranoid: true })
export class AccountModel extends Model {
    @PrimaryKey
    @Column(DataType.STRING(35))
    address: string;

    @Column(DataType.BIGINT)
    balance: bigint;

    @Column(DataType.BOOLEAN)
    isPublicDelegate: boolean;

    @Column(DataType.BIGINT)
    delegateBalance: bigint;
}
