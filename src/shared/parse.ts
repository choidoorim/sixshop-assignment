// NOTE: value type 이 Json 인 이유는 type 에 맞는 데이터를 저장하기 위해서이다.
import { Prisma } from '@prisma/client';

export const getCustomFieldsValue = (data: Prisma.JsonValue) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  data.value;
