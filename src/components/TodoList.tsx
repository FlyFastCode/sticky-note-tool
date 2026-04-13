import { useState } from 'react';
import { Todo, FilterType } from '../types';
import './TodoList.css';

interface TodoListProps {
  todos: Todo[];
  onAdd: (title: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onClearCompleted: () => void;
}

/**
 * 待办任务列表组件
 */
export default function TodoList({ todos, onAdd, onToggle, onDelete, onClearCompleted }: TodoListProps) {
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  // 处理新增待办
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  // 筛选待办
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  // 统计数据
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const active = total - completed;

  return (
    <div className="todo-section">
      <h2 className="section-title">📝 待办任务</h2>

      {/* 新增待办表单 */}
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          placeholder="添加新任务..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button type="submit" className="todo-add-btn">
          添加
        </button>
      </form>

      {/* 筛选按钮 */}
      <div className="filter-buttons">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          全部 ({total})
        </button>
        <button
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          进行中 ({active})
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          已完成 ({completed})
        </button>
      </div>

      {/* 待办列表 */}
      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            <p>📭 暂无任务</p>
            <p className="empty-hint">添加你的第一个任务吧！</p>
          </div>
        ) : (
          filteredTodos.map(todo => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <label className="todo-checkbox">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => onToggle(todo.id)}
                />
                <span className="checkmark"></span>
              </label>
              <span className="todo-title">{todo.title}</span>
              <button
                className="todo-delete-btn"
                onClick={() => onDelete(todo.id)}
                title="删除"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      {/* 清空已完成按钮 */}
      {completed > 0 && (
        <button className="clear-completed-btn" onClick={onClearCompleted}>
          清空已完成 ({completed})
        </button>
      )}
    </div>
  );
}
