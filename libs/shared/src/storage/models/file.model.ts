import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ paranoid: true })
export class FileModel extends Model {
    @PrimaryKey
    @Column(DataType.STRING(256))
    siteName: string;

    @PrimaryKey
    @Column(DataType.STRING(256))
    fileName: string;

    @Column(DataType.STRING(256))
    contentType: string;

    @Column(DataType.TEXT)
    dataString: string;
}
