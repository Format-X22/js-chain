import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { StorageModule } from './storage/storage.module';

@Module({
    providers: [SharedService],
    exports: [SharedService],
    imports: [StorageModule],
})
export class SharedModule {}
