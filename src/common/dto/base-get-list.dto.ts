import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class BaseGetListDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take: number = 10;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  // @IsString()
  // @IsOptional()
  // @Type(() => String)
  // readonly sortBy: string = '';

  // get order(): object|undefined {
  //   console.log(this.sortBy.length);
  //   if (this.sortBy.length) {
  //     return;
  //   } else
  //     return this.sortBy.split(/,/).map((value) => {
  //       const items = value.split(/-/);
  //       if (items.length > 1) {
  //         return { [items[1]]: 'desc' };
  //       } else {
  //         return { [items[0]]: 'asc' };
  //       }
  //     });
  // }

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
