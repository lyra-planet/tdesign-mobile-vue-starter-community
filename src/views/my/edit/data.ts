import type { AreaList } from './types'
import { getPCA } from 'lcn'

export const areaList: AreaList[] = getPCA({
  inland: true, // 仅包含大陆地区
  fieldNames: {
    code: 'value',
    name: 'label',
    children: 'children',
  },
}) as AreaList[]
