export class GetStoreIdResponseDto {
  readonly store: string;

  constructor(partial: Partial<GetStoreIdResponseDto>) {
    Object.assign(this, partial);
  }
}
