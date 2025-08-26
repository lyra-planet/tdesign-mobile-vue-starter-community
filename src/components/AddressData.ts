// 地址数据配置
export interface AddressItem {
  label: string
  value: string
  children?: AddressItem[]
}

export const addressData: AddressItem[] = [
  {
    label: '北京市',
    value: '北京市',
    children: [
      { label: '东城区', value: '东城区' },
      { label: '西城区', value: '西城区' },
      { label: '朝阳区', value: '朝阳区' },
      { label: '丰台区', value: '丰台区' },
      { label: '石景山区', value: '石景山区' },
      { label: '海淀区', value: '海淀区' },
      { label: '门头沟区', value: '门头沟区' },
      { label: '房山区', value: '房山区' },
      { label: '通州区', value: '通州区' },
      { label: '顺义区', value: '顺义区' },
      { label: '昌平区', value: '昌平区' },
      { label: '大兴区', value: '大兴区' },
      { label: '怀柔区', value: '怀柔区' },
      { label: '平谷区', value: '平谷区' },
      { label: '密云区', value: '密云区' },
      { label: '延庆区', value: '延庆区' },
    ],
  },
  {
    label: '天津市',
    value: '天津市',
    children: [
      { label: '和平区', value: '和平区' },
      { label: '河东区', value: '河东区' },
      { label: '河西区', value: '河西区' },
      { label: '南开区', value: '南开区' },
      { label: '河北区', value: '河北区' },
      { label: '红桥区', value: '红桥区' },
      { label: '东丽区', value: '东丽区' },
      { label: '西青区', value: '西青区' },
      { label: '津南区', value: '津南区' },
      { label: '北辰区', value: '北辰区' },
      { label: '武清区', value: '武清区' },
      { label: '宝坻区', value: '宝坻区' },
      { label: '滨海新区', value: '滨海新区' },
      { label: '宁河区', value: '宁河区' },
      { label: '静海区', value: '静海区' },
      { label: '蓟州区', value: '蓟州区' },
    ],
  },
  {
    label: '上海市',
    value: '上海市',
    children: [
      { label: '黄浦区', value: '黄浦区' },
      { label: '徐汇区', value: '徐汇区' },
      { label: '长宁区', value: '长宁区' },
      { label: '静安区', value: '静安区' },
      { label: '普陀区', value: '普陀区' },
      { label: '虹口区', value: '虹口区' },
      { label: '杨浦区', value: '杨浦区' },
      { label: '闵行区', value: '闵行区' },
      { label: '宝山区', value: '宝山区' },
      { label: '嘉定区', value: '嘉定区' },
      { label: '浦东新区', value: '浦东新区' },
      { label: '金山区', value: '金山区' },
      { label: '松江区', value: '松江区' },
      { label: '青浦区', value: '青浦区' },
      { label: '奉贤区', value: '奉贤区' },
      { label: '崇明区', value: '崇明区' },
    ],
  },
  {
    label: '重庆市',
    value: '重庆市',
    children: [
      { label: '万州区', value: '万州区' },
      { label: '涪陵区', value: '涪陵区' },
      { label: '渝中区', value: '渝中区' },
      { label: '大渡口区', value: '大渡口区' },
      { label: '江北区', value: '江北区' },
      { label: '沙坪坝区', value: '沙坪坝区' },
      { label: '九龙坡区', value: '九龙坡区' },
      { label: '南岸区', value: '南岸区' },
      { label: '北碚区', value: '北碚区' },
      { label: '綦江区', value: '綦江区' },
      { label: '大足区', value: '大足区' },
      { label: '渝北区', value: '渝北区' },
      { label: '巴南区', value: '巴南区' },
      { label: '黔江区', value: '黔江区' },
      { label: '长寿区', value: '长寿区' },
      { label: '江津区', value: '江津区' },
      { label: '合川区', value: '合川区' },
      { label: '永川区', value: '永川区' },
      { label: '南川区', value: '南川区' },
      { label: '璧山区', value: '璧山区' },
      { label: '铜梁区', value: '铜梁区' },
      { label: '潼南区', value: '潼南区' },
      { label: '荣昌区', value: '荣昌区' },
      { label: '开州区', value: '开州区' },
      { label: '梁平区', value: '梁平区' },
      { label: '武隆区', value: '武隆区' },
    ],
  },
  {
    label: '广东省',
    value: '广东省',
    children: [
      { label: '广州市', value: '广州市' },
      { label: '深圳市', value: '深圳市' },
      { label: '珠海市', value: '珠海市' },
      { label: '汕头市', value: '汕头市' },
      { label: '佛山市', value: '佛山市' },
      { label: '韶关市', value: '韶关市' },
      { label: '湛江市', value: '湛江市' },
      { label: '肇庆市', value: '肇庆市' },
      { label: '江门市', value: '江门市' },
      { label: '茂名市', value: '茂名市' },
      { label: '惠州市', value: '惠州市' },
      { label: '梅州市', value: '梅州市' },
      { label: '汕尾市', value: '汕尾市' },
      { label: '河源市', value: '河源市' },
      { label: '阳江市', value: '阳江市' },
      { label: '清远市', value: '清远市' },
      { label: '东莞市', value: '东莞市' },
      { label: '中山市', value: '中山市' },
      { label: '潮州市', value: '潮州市' },
      { label: '揭阳市', value: '揭阳市' },
      { label: '云浮市', value: '云浮市' },
    ],
  },
  {
    label: '湖南省',
    value: '湖南省',
    children: [
      { label: '长沙市', value: '长沙市' },
      { label: '株洲市', value: '株洲市' },
      { label: '湘潭市', value: '湘潭市' },
      { label: '衡阳市', value: '衡阳市' },
      { label: '邵阳市', value: '邵阳市' },
      { label: '岳阳市', value: '岳阳市' },
      { label: '常德市', value: '常德市' },
      { label: '张家界市', value: '张家界市' },
      { label: '益阳市', value: '益阳市' },
      { label: '郴州市', value: '郴州市' },
      { label: '永州市', value: '永州市' },
      { label: '怀化市', value: '怀化市' },
      { label: '娄底市', value: '娄底市' },
      { label: '湘西土家族苗族自治州', value: '湘西土家族苗族自治州' },
    ],
  },
  // 可以继续添加其他省份...
]

// 更明确的选项类型，供选择器使用
export interface PickerOption {
  label: string
  value: string
}

// 根据省份获取对应的城市列表
export function getCitiesByProvince(province: string): PickerOption[] {
  const provinceData = addressData.find(item => item.value === province)
  return provinceData?.children || []
}

// 获取所有省份列表
export function getAllProvinces(): PickerOption[] {
  return addressData.map(item => ({ label: item.label, value: item.value }))
}
