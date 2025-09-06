export const serviceGroups = [
  [
    { name: '微信', icon: '/my/wechat.svg', type: 'external', url: 'weixin://' },
    { name: 'QQ', icon: '/my/qq.svg', type: 'external', url: 'tencent://' },
    { name: 'TDoc', icon: '/my/Tdoc.svg', type: 'external' },
    { name: 'TMap', icon: '/my/Tmap.svg', type: 'external' },
  ],
  [
    { name: '数据中心', icon: '/my/default.svg', type: 'internal', url: '/datacenter' },
    { name: '数据中心', icon: '/my/default.svg', type: 'internal', url: '/datacenter' },
    { name: '数据中心', icon: '/my/default.svg', type: 'internal', url: '/datacenter' },
    { name: '数据中心', icon: '/my/default.svg', type: 'internal', url: '/datacenter' },
  ],
]

export const userStats = [
  { label: '全部', icon: 'form', count: 12, key: 'all_posts' },
  { label: '待审核', icon: 'search', count: 3, key: 'under_review' },
  { label: '已发布', icon: 'upload', count: 8, key: 'published' },
  { label: '草稿箱', icon: 'file-copy', count: 1, key: 'drafts' },
]

export const menuItems = [
  { name: '联系客服', icon: 'service', type: 'internal' },
  { name: '设置', icon: 'setting', type: 'internal', url: '/my/settings' },
]
