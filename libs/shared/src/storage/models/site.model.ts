import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { FileModel } from '@app/shared/storage/models/file.model';
import { ScriptModel } from '@app/shared/storage/models/script.model';

@Table
export class SiteModel extends Model {
    @Column(DataType.STRING(256))
    siteId: string;

    @Column(DataType.STRING(256))
    owner: string;

    @Column(DataType.BOOLEAN)
    isNamespaceOnly: boolean;

    @Column(DataType.TEXT)
    bundle: string;

    @HasMany(() => FileModel, 'siteId')
    files: Array<FileModel>;

    @HasMany(() => ScriptModel, 'siteId')
    scripts: Array<ScriptModel>;
}
