import TodoList from './components/TodoList';
import NoteList from './components/NoteList';
import { useTodos, useNotes } from './hooks/useStorage';
import './App.css';

/**
 * 主应用程序组件 - 便签与待办管理工具
 */
function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos();
  const { notes, addNote, updateNote, deleteNote } = useNotes();

  // 统计数据
  const totalTodos = todos.length;
  const completedTodos = todos.filter(t => t.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const totalNotes = notes.length;

  return (
    <div className="app">
      {/* 顶部标题 */}
      <header className="app-header">
        <h1 className="app-title">📌 便签 & 待办</h1>
        <p className="app-subtitle">轻量级个人任务与笔记管理工具</p>
      </header>

      {/* 主要内容区 */}
      <main className="app-main">
        <div className="app-content">
          {/* 待办任务区 */}
          <TodoList
            todos={todos}
            onAdd={addTodo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onClearCompleted={clearCompleted}
          />

          {/* 便签区 */}
          <NoteList
            notes={notes}
            onAdd={addNote}
            onUpdate={updateNote}
            onDelete={deleteNote}
          />
        </div>
      </main>

      {/* 底部统计信息 */}
      <footer className="app-footer">
        <div className="stats">
          <span className="stat-item">
            📝 待办：{totalTodos} (进行中 {activeTodos} · 已完成 {completedTodos})
          </span>
          <span className="stat-divider">|</span>
          <span className="stat-item">
            📌 便签：{totalNotes}
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
