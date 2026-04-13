import { useState, useEffect, useCallback } from 'react';
import { Todo, Note } from '../types';

const STORAGE_KEY_TODOS = 'sticky-note-todos';
const STORAGE_KEY_NOTES = 'sticky-note-notes';

/**
 * 待办事项自定义 Hook
 */
export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_TODOS);
    return saved ? JSON.parse(saved) : [];
  });

  // 保存到 LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TODOS, JSON.stringify(todos));
  }, [todos]);

  // 新增待办
  const addTodo = useCallback((title: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos(prev => [newTodo, ...prev]);
  }, []);

  // 切换完成状态
  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  // 删除待办
  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  // 清空已完成
  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  return { todos, addTodo, toggleTodo, deleteTodo, clearCompleted };
}

/**
 * 便签自定义 Hook
 */
export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_NOTES);
    return saved ? JSON.parse(saved) : [];
  });

  // 保存到 LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notes));
  }, [notes]);

  // 新增便签
  const addNote = useCallback((content: string, color: string) => {
    const now = Date.now();
    const newNote: Note = {
      id: now.toString(),
      content,
      color,
      createdAt: now,
      updatedAt: now,
    };
    setNotes(prev => [newNote, ...prev]);
  }, []);

  // 更新便签
  const updateNote = useCallback((id: string, content: string) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id ? { ...note, content, updatedAt: Date.now() } : note
      )
    );
  }, []);

  // 删除便签
  const deleteNote = useCallback((id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  }, []);

  return { notes, addNote, updateNote, deleteNote };
}
