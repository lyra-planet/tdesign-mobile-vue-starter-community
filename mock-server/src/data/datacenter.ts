import type { RegionColumn, VideoStatistics } from '../models/DataCenter'

// 视频统计数据
export const videoStatistics: VideoStatistics[] = [
  { index: 1, title: '视频A', global: '156', northChina: '89', eastChina: '134', westChina: '67', southChina: '123' },
  { index: 2, title: '视频B', global: '234', northChina: '156', eastChina: '189', westChina: '98', southChina: '167' },
  { index: 3, title: '视频C', global: '189', northChina: '123', eastChina: '145', westChina: '78', southChina: '134' },
  { index: 4, title: '视频D', global: '267', northChina: '178', eastChina: '234', westChina: '123', southChina: '189' },
  { index: 5, title: '视频E', global: '145', northChina: '89', eastChina: '123', westChina: '67', southChina: '98' },
  { index: 6, title: '视频F', global: '198', northChina: '134', eastChina: '167', westChina: '89', southChina: '145' },
  { index: 7, title: '视频G', global: '223', northChina: '145', eastChina: '189', westChina: '112', southChina: '167' },
  { index: 8, title: '视频H', global: '178', northChina: '112', eastChina: '145', westChina: '78', southChina: '123' },
  { index: 9, title: '视频I', global: '245', northChina: '167', eastChina: '198', westChina: '123', southChina: '178' },
  { index: 10, title: '视频J', global: '167', northChina: '98', eastChina: '134', westChina: '67', southChina: '112' },
]

// 表格列配置
export const regionColumns: RegionColumn[] = [
  { colKey: 'index', title: '排名', width: '60px', align: 'center' },
  { colKey: 'title', title: '视频', align: 'left', fixed: 'left' },
  { colKey: 'global', title: '全球', align: 'center' },
  { colKey: 'northChina', title: '华北', align: 'center' },
  { colKey: 'eastChina', title: '华东', align: 'center' },
  { colKey: 'westChina', title: '华西', align: 'center' },
  { colKey: 'southChina', title: '华南', align: 'center' },
]
