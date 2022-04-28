import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { SiteModel } from '@app/shared/storage/models/site.model';

@Table
export class ScriptModel extends Model {
    @ForeignKey(() => SiteModel)
    @Column(DataType.STRING(256))
    siteId: string;

    @Column(DataType.STRING(256))
    scriptId: string;

    @Column(DataType.TEXT)
    bundle: string;

    @Column(DataType.JSONB)
    data: Record<string, any>;
}
