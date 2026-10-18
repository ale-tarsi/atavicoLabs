'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Plus, Check, ChevronRight, X, Trash2, CalendarDays, LayoutGrid } from 'lucide-react';
import ToolsNavbar from '@/app/components/ToolsNavbar';

// ─── Types ───────────────────────────────────────────────────────────────────

type TaskArea = 'retainer' | 'spot' | 'atavicolabs';
type TaskStatus = 'todo' | 'inprogress' | 'done';
type TaskPriority = 'high' | 'medium' | 'low';
type View = 'today' | 'week';

interface Task {
  id: string;
  title: string;
  area: TaskArea;
  status: TaskStatus;
  priority: TaskPriority;
  client: string;
  notes: string;
  createdAt: string;
  selectedForToday: boolean;
}

interface FormState {
  title: string;
  area: TaskArea;
  status: TaskStatus;
  priority: TaskPriority;
  client: string;
  notes: string;
  selectedForToday: boolean;
}

const STORAGE_KEY = 'atavico-crm-tasks';
const TODAY_MAX = 6;
const AREAS: TaskArea[] = ['retainer', 'spot', 'atavicolabs'];
const STATUSES: TaskStatus[] = ['todo', 'inprogress', 'done'];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function priorityDot(priority: TaskPriority) {
  const colors: Record<TaskPriority, string> = {
    high: '#E05C5C',
    medium: '#C4A45A',
    low: '#5A6D5A',
  };
  return colors[priority];
}

function priorityBg(priority: TaskPriority) {
  const colors: Record<TaskPriority, string> = {
    high: 'rgba(224,92,92,0.12)',
    medium: 'rgba(196,164,90,0.12)',
    low: 'rgba(90,109,90,0.12)',
  };
  return colors[priority];
}

function areaAccent(area: TaskArea) {
  const colors: Record<TaskArea, string> = {
    retainer: '#C4A45A',
    spot: '#5A6D5A',
    atavicolabs: '#8A8C8E',
  };
  return colors[area];
}

function nextStatus(current: TaskStatus): TaskStatus | null {
  if (current === 'todo') return 'inprogress';
  if (current === 'inprogress') return 'done';
  return null;
}

function defaultForm(todayCount: number): FormState {
  return {
    title: '',
    area: 'retainer',
    status: 'todo',
    priority: 'medium',
    client: '',
    notes: '',
    selectedForToday: todayCount < TODAY_MAX,
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PriorityBadge({ priority, t }: { priority: TaskPriority; t: ReturnType<typeof useTranslations> }) {
  return (
    <span
      className="text-[10px] font-medium px-1.5 py-0.5 rounded"
      style={{ color: priorityDot(priority), backgroundColor: priorityBg(priority) }}
    >
      {t(`priority.${priority}`)}
    </span>
  );
}

function AreaBadge({ area, t }: { area: TaskArea; t: ReturnType<typeof useTranslations> }) {
  return (
    <span
      className="text-[10px] font-medium px-1.5 py-0.5 rounded"
      style={{ color: areaAccent(area), backgroundColor: `${areaAccent(area)}18` }}
    >
      {t(`areas.${area}`)}
    </span>
  );
}

// ─── Today Task Row ───────────────────────────────────────────────────────────

function TodayTaskRow({
  task,
  onToggleDone,
  onDelete,
  t,
}: {
  task: Task;
  onToggleDone: (id: string) => void;
  onDelete: (id: string) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const isDone = task.status === 'done';

  return (
    <div
      className="group flex items-center gap-3 px-4 py-3 rounded-xl transition-colors"
      style={{ backgroundColor: '#141517' }}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggleDone(task.id)}
        className="flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all"
        style={{
          borderColor: isDone ? '#5A6D5A' : '#403E38',
          backgroundColor: isDone ? '#5A6D5A' : 'transparent',
        }}
        aria-label={isDone ? 'Mark as not done' : 'Mark as done'}
      >
        {isDone && <Check size={11} color="#E8E6DC" strokeWidth={2.5} />}
      </button>

      {/* Priority dot */}
      <div
        className="flex-shrink-0 w-2 h-2 rounded-full"
        style={{ backgroundColor: priorityDot(task.priority) }}
      />

      {/* Title */}
      <span
        className="flex-1 text-sm font-medium leading-snug transition-colors min-w-0 truncate"
        style={{ color: isDone ? '#6B6960' : '#D3D1C8', textDecoration: isDone ? 'line-through' : 'none' }}
      >
        {task.title}
      </span>

      {/* Metadata (hidden on smallest screens) */}
      <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
        <AreaBadge area={task.area} t={t} />
        {task.client && (
          <span className="text-[11px]" style={{ color: '#6B6960' }}>
            {task.client}
          </span>
        )}
      </div>

      {/* Delete (visible on hover) */}
      <button
        onClick={() => onDelete(task.id)}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded"
        style={{ color: '#6B6960' }}
        aria-label={t('deleteTask')}
      >
        <X size={14} />
      </button>
    </div>
  );
}

// ─── Today View ───────────────────────────────────────────────────────────────

function TodayView({
  tasks,
  onToggleDone,
  onDelete,
  onAdd,
  t,
}: {
  tasks: Task[];
  onToggleDone: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const todayTasks = tasks
    .filter((task) => task.selectedForToday)
    .sort((a, b) => {
      if (a.status === 'done' && b.status !== 'done') return 1;
      if (a.status !== 'done' && b.status === 'done') return -1;
      const ord: Record<TaskPriority, number> = { high: 0, medium: 1, low: 2 };
      return ord[a.priority] - ord[b.priority];
    });

  const doneCount = todayTasks.filter((t) => t.status === 'done').length;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm" style={{ color: '#6B6960' }}>
            {todayTasks.length}/{TODAY_MAX}
          </span>
          {todayTasks.length > 0 && (
            <div className="h-1 w-24 rounded-full overflow-hidden" style={{ backgroundColor: '#1C1D20' }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(doneCount / todayTasks.length) * 100}%`,
                  backgroundColor: '#5A6D5A',
                }}
              />
            </div>
          )}
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg font-medium transition-all hover:-translate-y-0.5"
          style={{ backgroundColor: '#5A6D5A', color: '#E8E6DC' }}
        >
          <Plus size={14} strokeWidth={2.5} />
          {t('addTask')}
        </button>
      </div>

      {/* Task list */}
      {todayTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <CalendarDays size={32} style={{ color: '#403E38' }} className="mb-4" />
          <p className="text-sm font-medium mb-1" style={{ color: '#6B6960' }}>
            {t('todayView.empty')}
          </p>
          <p className="text-xs" style={{ color: '#403E38' }}>
            {t('todayView.emptyHint')}
          </p>
          <button
            onClick={onAdd}
            className="mt-6 flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg font-medium border transition-all hover:-translate-y-0.5"
            style={{ borderColor: '#403E38', color: '#8A8C8E' }}
          >
            <Plus size={14} />
            {t('addTask')}
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {todayTasks.map((task) => (
            <TodayTaskRow
              key={task.id}
              task={task}
              onToggleDone={onToggleDone}
              onDelete={onDelete}
              t={t}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Week Task Card ───────────────────────────────────────────────────────────

function WeekTaskCard({
  task,
  onStatusChange,
  onDelete,
  t,
}: {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const next = nextStatus(task.status);
  const isDone = task.status === 'done';

  return (
    <div
      className="group rounded-lg p-3 transition-colors"
      style={{ backgroundColor: '#0B0C0D' }}
    >
      <div className="flex items-start gap-2">
        <span
          className="flex-1 text-xs font-medium leading-snug"
          style={{ color: isDone ? '#6B6960' : '#C8C5B8', textDecoration: isDone ? 'line-through' : 'none' }}
        >
          {task.title}
        </span>
        {/* Action buttons — visible on hover */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          {next && (
            <button
              onClick={() => onStatusChange(task.id, next)}
              className="p-1 rounded transition-colors"
              style={{ color: '#6B6960' }}
              title={t('advance')}
            >
              <ChevronRight size={12} />
            </button>
          )}
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 rounded transition-colors"
            style={{ color: '#6B6960' }}
            title={t('deleteTask')}
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
        <div
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: priorityDot(task.priority) }}
        />
        {task.client && (
          <span className="text-[10px]" style={{ color: '#6B6960' }}>
            {task.client}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Area Column ─────────────────────────────────────────────────────────────

function AreaColumn({
  area,
  tasks,
  onStatusChange,
  onDelete,
  t,
}: {
  area: TaskArea;
  tasks: Task[];
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const total = tasks.length;
  const doneCount = tasks.filter((t) => t.status === 'done').length;
  const accent = areaAccent(area);

  return (
    <div
      className="rounded-2xl p-4 flex flex-col min-h-[280px]"
      style={{ backgroundColor: '#141517' }}
    >
      {/* Column header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold font-display" style={{ color: accent }}>
            {t(`areas.${area}`)}
          </span>
          <span className="text-[11px]" style={{ color: '#6B6960' }}>
            {doneCount}/{total} {t('weekView.done')}
          </span>
        </div>
        {/* Load bar */}
        <div className="h-0.5 rounded-full" style={{ backgroundColor: '#1C1D20' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: total > 0 ? `${(doneCount / total) * 100}%` : '0%',
              backgroundColor: accent,
            }}
          />
        </div>
      </div>

      {/* Status sections */}
      {total === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-xs" style={{ color: '#403E38' }}>
            {t('weekView.empty')}
          </span>
        </div>
      ) : (
        <div className="space-y-4 flex-1">
          {STATUSES.map((status) => {
            const statusTasks = tasks.filter((task) => task.status === status);
            if (statusTasks.length === 0) return null;
            return (
              <div key={status}>
                <div
                  className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                  style={{ color: '#6B6960' }}
                >
                  {t(`status.${status}`)}
                </div>
                <div className="space-y-1.5">
                  {statusTasks.map((task) => (
                    <WeekTaskCard
                      key={task.id}
                      task={task}
                      onStatusChange={onStatusChange}
                      onDelete={onDelete}
                      t={t}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Week View ────────────────────────────────────────────────────────────────

function WeekView({
  tasks,
  onStatusChange,
  onDelete,
  onAdd,
  t,
}: {
  tasks: Task[];
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg font-medium transition-all hover:-translate-y-0.5"
          style={{ backgroundColor: '#5A6D5A', color: '#E8E6DC' }}
        >
          <Plus size={14} strokeWidth={2.5} />
          {t('addTask')}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {AREAS.map((area) => (
          <AreaColumn
            key={area}
            area={area}
            tasks={tasks.filter((task) => task.area === area)}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Add Task Modal ───────────────────────────────────────────────────────────

function AddTaskModal({
  form,
  onChange,
  onSave,
  onCancel,
  t,
}: {
  form: FormState;
  onChange: (patch: Partial<FormState>) => void;
  onSave: () => void;
  onCancel: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onCancel]);

  const labelClass = 'block text-xs font-medium mb-1.5';
  const inputClass =
    'w-full text-sm rounded-lg px-3 py-2 border outline-none transition-colors focus:border-oliva';
  const inputStyle = {
    backgroundColor: '#0B0C0D',
    borderColor: '#2A2B2E',
    color: '#C8C5B8',
  };
  const selectStyle = { ...inputStyle, appearance: 'none' as const };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6 shadow-premium-lg"
        style={{ backgroundColor: '#141517', border: '1px solid #2A2B2E' }}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-base font-semibold" style={{ color: '#E8E6DC' }}>
            {t('form.newTask')}
          </h2>
          <button
            onClick={onCancel}
            className="p-1 rounded transition-colors"
            style={{ color: '#6B6960' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className={labelClass} style={{ color: '#8A8C8E' }}>
              {t('form.titleLabel')} *
            </label>
            <input
              ref={titleRef}
              type="text"
              value={form.title}
              onChange={(e) => onChange({ title: e.target.value })}
              placeholder={t('form.titlePlaceholder')}
              className={inputClass}
              style={inputStyle}
              onKeyDown={(e) => e.key === 'Enter' && form.title.trim() && onSave()}
            />
          </div>

          {/* Client */}
          <div>
            <label className={labelClass} style={{ color: '#8A8C8E' }}>
              {t('form.clientLabel')}
            </label>
            <input
              type="text"
              value={form.client}
              onChange={(e) => onChange({ client: e.target.value })}
              placeholder={t('form.clientPlaceholder')}
              className={inputClass}
              style={inputStyle}
            />
          </div>

          {/* Area + Priority row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass} style={{ color: '#8A8C8E' }}>
                {t('form.areaLabel')}
              </label>
              <select
                value={form.area}
                onChange={(e) => onChange({ area: e.target.value as TaskArea })}
                className={inputClass}
                style={selectStyle}
              >
                {AREAS.map((a) => (
                  <option key={a} value={a}>
                    {t(`areas.${a}`)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} style={{ color: '#8A8C8E' }}>
                {t('form.priorityLabel')}
              </label>
              <select
                value={form.priority}
                onChange={(e) => onChange({ priority: e.target.value as TaskPriority })}
                className={inputClass}
                style={selectStyle}
              >
                {(['high', 'medium', 'low'] as TaskPriority[]).map((p) => (
                  <option key={p} value={p}>
                    {t(`priority.${p}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className={labelClass} style={{ color: '#8A8C8E' }}>
              {t('form.statusLabel')}
            </label>
            <select
              value={form.status}
              onChange={(e) => onChange({ status: e.target.value as TaskStatus })}
              className={inputClass}
              style={selectStyle}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {t(`status.${s}`)}
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className={labelClass} style={{ color: '#8A8C8E' }}>
              {t('form.notesLabel')}
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => onChange({ notes: e.target.value })}
              placeholder={t('form.notesPlaceholder')}
              rows={2}
              className={`${inputClass} resize-none`}
              style={inputStyle}
            />
          </div>

          {/* Add to today toggle */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <button
              type="button"
              onClick={() => onChange({ selectedForToday: !form.selectedForToday })}
              className="relative w-9 h-5 rounded-full transition-colors flex-shrink-0"
              style={{ backgroundColor: form.selectedForToday ? '#5A6D5A' : '#2A2B2E' }}
            >
              <span
                className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform"
                style={{
                  backgroundColor: '#E8E6DC',
                  transform: form.selectedForToday ? 'translateX(16px)' : 'translateX(0)',
                }}
              />
            </button>
            <span className="text-sm" style={{ color: '#8A8C8E' }}>
              {t('form.addToToday')}
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-lg text-sm font-medium border transition-colors"
            style={{ borderColor: '#2A2B2E', color: '#6B6960' }}
          >
            {t('form.cancel')}
          </button>
          <button
            onClick={onSave}
            disabled={!form.title.trim()}
            className="flex-1 py-2 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            style={{ backgroundColor: '#5A6D5A', color: '#E8E6DC' }}
          >
            {t('form.save')}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Board ───────────────────────────────────────────────────────────────

export default function CrmBoard() {
  const t = useTranslations('crm');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState<View>('today');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<FormState>(() => defaultForm(0));
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTasks(JSON.parse(raw));
    } catch {
      // ignore parse errors
    }
    setMounted(true);
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, mounted]);

  const todayActiveCount = tasks.filter(
    (t) => t.selectedForToday && t.status !== 'done',
  ).length;

  const openModal = () => {
    setForm(defaultForm(todayActiveCount));
    setShowModal(true);
  };

  const addTask = () => {
    if (!form.title.trim()) return;
    const task: Task = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      title: form.title.trim(),
      area: form.area,
      status: form.status,
      priority: form.priority,
      client: form.client.trim(),
      notes: form.notes.trim(),
      createdAt: new Date().toISOString(),
      selectedForToday: form.selectedForToday,
    };
    setTasks((prev) => [task, ...prev]);
    setShowModal(false);
  };

  const toggleDone = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === 'done' ? 'todo' : 'done' } : t,
      ),
    );
  };

  const changeStatus = (id: string, status: TaskStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0B0C0D' }}>
      <ToolsNavbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-16">
        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-xl font-semibold" style={{ color: '#E8E6DC' }}>
            {t('pageTitle')}
          </h1>

          {/* View toggle */}
          <div
            className="flex rounded-xl p-1 gap-1"
            style={{ backgroundColor: '#141517' }}
          >
            {([
              { id: 'today', icon: CalendarDays, label: t('viewToday') },
              { id: 'week', icon: LayoutGrid, label: t('viewWeek') },
            ] as const).map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setView(id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: view === id ? '#5A6D5A' : 'transparent',
                  color: view === id ? '#E8E6DC' : '#6B6960',
                }}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* View content */}
        {view === 'today' ? (
          <TodayView
            tasks={tasks}
            onToggleDone={toggleDone}
            onDelete={deleteTask}
            onAdd={openModal}
            t={t}
          />
        ) : (
          <WeekView
            tasks={tasks}
            onStatusChange={changeStatus}
            onDelete={deleteTask}
            onAdd={openModal}
            t={t}
          />
        )}
      </main>

      {/* Add task modal */}
      {showModal && (
        <AddTaskModal
          form={form}
          onChange={(patch) => setForm((prev) => ({ ...prev, ...patch }))}
          onSave={addTask}
          onCancel={() => setShowModal(false)}
          t={t}
        />
      )}
    </div>
  );
}
