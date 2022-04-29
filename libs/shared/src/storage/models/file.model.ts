import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { SiteModel } from '@app/shared/storage/models/site.model';

@Table
export class FileModel extends Model {
    @ForeignKey(() => SiteModel)
    @Column(DataType.STRING(256))
    siteName: number;

    @Column(DataType.STRING(256))
    fileName: string;

    @Column(DataType.BLOB)
    data: Buffer;
}
