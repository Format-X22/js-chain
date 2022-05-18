import { ApiProperty } from '@nestjs/swagger';

export class DemocracyVoteDto {
    @ApiProperty()
    toAddress: string;

    @ApiProperty()
    amount: bigint;

    @ApiProperty()
    asSupport: boolean;
}
