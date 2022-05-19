import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ paranoid: true })
export class SiteModel extends Model {
    @PrimaryKey
    @Column(DataType.STRING(256))
    siteName: string;

    @Column(DataType.STRING(256))
    owner: string;

    @Column(DataType.TEXT)
    html: string;
}
