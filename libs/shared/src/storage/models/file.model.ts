import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { SiteModel } from '@app/shared/storage/models/site.model';

@Table
export class FileModel extends Model {
    @ForeignKey(() => SiteModel)
    @Column(DataType.STRING(256))
    siteId: number;

    @Column(DataType.STRING(256))
    fileId: string;

    @Column(DataType.BLOB)
    data: Buffer;
}
