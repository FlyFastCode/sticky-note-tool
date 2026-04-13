// 待办任务类型定义
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

// 便签类型定义
export interface Note {
  id: string;
  content: string;
  color: string;
  createdAt: number;
  updatedAt: number;
}

// 筛选状态类型
export type FilterType = 'all' | 'completed' | 'active';

// 便签颜色选项
export const NOTE_COLORS = [
  '#fef3c7', // 黄色
  '#dbeafe', // 蓝色
  '#d1fae5', // 绿色
  '#fce7f3', // 粉色
  '#e0e7ff', // 紫色
  '#ffedd5', // 橙色
];
