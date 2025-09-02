import type { AreaList } from '../edit/types'
import { computed, reactive, ref } from 'vue'
import { areaList } from '../edit/data'

export function useAddressPicker() {
  // 当前选中的省份索引
  const selectedProvinceIndex = ref(0)

  // 地址相关状态
  const provinces = reactive(areaList.map(province => ({
    label: province.label,
    value: province.value,
  })))

  const cities = reactive(areaList[0]?.children?.map(city => ({
    label: city.label,
    value: city.value,
  })) || [])

  const areas = reactive(areaList[0]?.children?.[0]?.children?.map(area => ({
    label: area.label,
    value: area.value,
  })) || [])

  // 检查是否为直辖市
  function isDirectMunicipality(provinceName: string): boolean {
    return ['北京', '天津', '上海', '重庆'].some(city => provinceName.includes(city))
  }

  // 计算地址列数据
  const addressColumns = computed(() => {
    const currentProvince = areaList[selectedProvinceIndex.value]

    // 如果是直辖市，只显示省份和区县两列
    if (currentProvince && isDirectMunicipality(currentProvince.label)) {
      return [provinces, areas]
    }

    // 否则显示完整的三列
    return [provinces, cities, areas]
  })

  // 地址级联变化处理
  function onAddressColumnChange(value: any, context: any) {
    const { column, index } = context

    if (column === 0) {
      // 省份变化
      selectedProvinceIndex.value = index
      const selectedProvince = areaList[index]

      if (isDirectMunicipality(selectedProvince.label)) {
        // 直辖市：直接更新区县数据（跳过城市）
        const newAreas = selectedProvince?.children?.[0]?.children?.map(area => ({
          label: area.label,
          value: area.value,
        })) || []

        areas.splice(0, areas.length, ...newAreas)
      }
      else {
        // 普通省份：更新城市和区县
        const newCities = selectedProvince?.children?.map(city => ({
          label: city.label,
          value: city.value,
        })) || []

        cities.splice(0, cities.length, ...newCities)

        // 同时更新第一个城市的区县
        const newAreas = selectedProvince?.children?.[0]?.children?.map(area => ({
          label: area.label,
          value: area.value,
        })) || []

        areas.splice(0, areas.length, ...newAreas)
      }
    }
    else if (column === 1) {
      // 城市变化（只在非直辖市时生效）
      const selectedProvince = areaList[selectedProvinceIndex.value]
      if (!isDirectMunicipality(selectedProvince.label)) {
        const selectedCity = selectedProvince?.children?.[index]

        const newAreas = selectedCity?.children?.map(area => ({
          label: area.label,
          value: area.value,
        })) || []

        areas.splice(0, areas.length, ...newAreas)
      }
    }
  }

  return {
    provinces,
    cities,
    areas,
    addressColumns,
    selectedProvinceIndex,
    onAddressColumnChange,
  }
}
