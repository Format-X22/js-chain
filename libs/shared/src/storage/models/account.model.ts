import { Column, DataType, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

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

    // TODO Change email from options
    @Unique
    @Column(DataType.STRING(256))
    email: string;

    @Column(DataType.STRING(128))
    passwordHash: string;

    @Column(DataType.STRING(256))
    protectedPrivateKey: string;

    @Column(DataType.STRING(128))
    session: string;
}
