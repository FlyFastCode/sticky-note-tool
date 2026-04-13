import { useState } from 'react';
import { Note, NOTE_COLORS } from '../types';
import './NoteList.css';

interface NoteListProps {
  notes: Note[];
  onAdd: (content: string, color: string) => void;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}

/**
 * 便签列表组件
 */
export default function NoteList({ notes, onAdd, onUpdate, onDelete }: NoteListProps) {
  const [inputValue, setInputValue] = useState('');
  const [selectedColor, setSelectedColor] = useState(NOTE_COLORS[0]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');

  // 处理新增便签
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue.trim(), selectedColor);
      setInputValue('');
    }
  };

  // 开始编辑
  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditingContent(note.content);
  };

  // 保存编辑
  const saveEdit = () => {
    if (editingId && editingContent.trim()) {
      onUpdate(editingId, editingContent.trim());
      setEditingId(null);
      setEditingContent('');
    }
  };

  // 取消编辑
  const cancelEdit = () => {
    setEditingId(null);
    setEditingContent('');
  };

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  return (
    <div className="note-section">
      <h2 className="section-title">📌 便签</h2>

      {/* 新增便签表单 */}
      <form className="note-form" onSubmit={handleSubmit}>
        <textarea
          className="note-input"
          placeholder="写下你的想法..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          rows={3}
        />
        <div className="note-form-footer">
          <div className="color-picker">
            {NOTE_COLORS.map(color => (
              <button
                key={color}
                type="button"
                className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
          <button type="submit" className="note-add-btn">
            添加便签
          </button>
        </div>
      </form>

      {/* 便签列表 */}
      <div className="note-list">
        {notes.length === 0 ? (
          <div className="empty-state">
            <p>📭 暂无便签</p>
            <p className="empty-hint">记录你的第一个想法吧！</p>
          </div>
        ) : (
          notes.map(note => (
            <div
              key={note.id}
              className="note-card"
              style={{ backgroundColor: note.color }}
            >
              {editingId === note.id ? (
                <div className="note-edit-mode">
                  <textarea
                    className="note-edit-input"
                    value={editingContent}
                    onChange={e => setEditingContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                  />
                  <div className="note-edit-actions">
                    <button className="note-save-btn" onClick={saveEdit}>
                      保存
                    </button>
                    <button className="note-cancel-btn" onClick={cancelEdit}>
                      取消
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="note-content">{note.content}</p>
                  <div className="note-actions">
                    <span className="note-time">
                      {formatTime(note.updatedAt)}
                    </span>
                    <div className="note-buttons">
                      <button
                        className="note-edit-btn"
                        onClick={() => startEdit(note)}
                        title="编辑"
                      >
                        ✏️
                      </button>
                      <button
                        className="note-delete-btn"
                        onClick={() => onDelete(note.id)}
                        title="删除"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// 格式化时间
function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 7) return `${days}天前`;
  
  return date.toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric'
  });
}
