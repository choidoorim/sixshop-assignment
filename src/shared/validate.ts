import { MetaType, Prisma } from '@prisma/client';

// NOTE: value type 이 Json 인 이유는 type 에 맞는 데이터를 저장하기 위해서이다.
export const getCustomFieldsValue = (data: Prisma.JsonValue) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  data.value;

export const isRightType = (
  value: number | string | boolean,
  type: MetaType,
) => {
  if (type === MetaType.INT && typeof value === 'number') {
    return true;
  }
  if (type === MetaType.STRING && typeof value === 'string') {
    return true;
  }
  return type === MetaType.BOOLEAN && typeof value === 'boolean';
};
