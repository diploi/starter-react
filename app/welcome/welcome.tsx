import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { useSupabase } from '~/lib/useSupabase';

type LinkProps = {
  href: string;
  children: ReactNode;
};

function ExtLink({ href, children }: LinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-indigo-600 hover:text-indigo-700 underline underline-offset-4"
    >
      {children}
    </a>
  );
}

type SectionProps = {
  title: string;
  children: ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
      <div className="mt-3 text-sm leading-6 text-zinc-700">{children}</div>
    </section>
  );
}

function Callout({
  tone = 'info',
  title,
  children,
}: {
  tone?: 'info' | 'warn';
  title: string;
  children: ReactNode;
}) {
  const styles =
    tone === 'warn'
      ? 'border-amber-200 bg-amber-50 text-amber-900'
      : 'border-sky-200 bg-sky-50 text-sky-900';

  return (
    <div className={`mt-4 rounded-xl border p-4 ${styles}`}>
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-sm leading-6 opacity-90">{children}</div>
    </div>
  );
}

export function Welcome() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <header className="mb-8">
          <p className="text-sm font-medium text-zinc-600">
            Diploi Web App Starter Kit · React + Vite + Supabase
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
            Your dev environment is ready 🚀
          </h1>
          <p className="mt-3 text-base leading-7 text-zinc-700">
            Your app, backend, and environment are already wired together so you
            can start building immediately.
          </p>
        </header>

        <div className="space-y-6">
          <Section title="How development works on Diploi">
            <ul className="list-disc pl-5">
              <li>
                Your code runs in a cloud dev environment, so no need to install
                anything locally.
              </li>
              <li className="mt-2">
                You can work in a browser-based editor, connect from a local
                editor, or connect via SSH.
              </li>
              <li className="mt-2">
                App processes (like the Vite dev server) run inside their own
                components, not in your dev environment. You can view their logs
                in the Diploi dashboard or via the Diploi CLI.
              </li>
            </ul>
            <p className="mt-3">
              Docs:{' '}
              <ExtLink href="https://diploi.com/dev">
                Using Remote Development
              </ExtLink>
            </p>
          </Section>

          <Section title="Infrastructure as Code with diploi.yaml">
            <p>
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[0.9em]">
                diploi.yaml
              </code>{' '}
              is the source of truth for your project. It defines which
              components run (like the web app and Supabase), where they live,
              and what ENV variables they get.
            </p>
            <p className="mt-3">
              Changing{' '}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[0.9em]">
                diploi.yaml
              </code>{' '}
              updates your environment after confirming the changes on the
              Diploi dashboard.
            </p>
            <p className="mt-3">
              Docs:{' '}
              <ExtLink href="https://diploi.com/yaml">
                diploi.yaml & IaC overview
              </ExtLink>
            </p>
          </Section>

          <Section title="Environment variables (ENV) & secrets">
            <p>
              Diploi injects environment values automatically. Components (like
              Supabase) provide connection details that your app can use
              immediately.
            </p>
            <ul className="mt-3 list-disc pl-5">
              <li>
                Find available values in the Diploi dashboard "Options" tab.
              </li>
              <li className="mt-2">
                In Vite, access client-exposed values via{' '}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[0.9em]">
                  import.meta.env
                </code>
                .
              </li>
            </ul>
          </Section>

          <Section title="Supabase-powered todo list">
            <SupabaseTodoDemo />
          </Section>

          <Section title="Component system (important!)">
            <p>
              Components are managed services with their own lifecycle. That
              means you generally <span className="font-medium">don’t</span>{' '}
              start the dev server manually.
            </p>

            <Callout tone="warn" title="Heads up">
              <ul className="list-disc pl-5">
                <li>
                  ❌ Don’t run{' '}
                  <code className="rounded bg-white/60 px-1.5 py-0.5 text-[0.9em]">
                    npm run dev
                  </code>{' '}
                  to start the app
                </li>
                <li className="mt-2">
                  ✅ You can run{' '}
                  <code className="rounded bg-white/60 px-1.5 py-0.5 text-[0.9em]">
                    npm install
                  </code>{' '}
                  (or add deps), edit code, and run one-off scripts
                </li>
              </ul>
            </Callout>

            <p className="mt-4">
              Diploi handles previews and hot reload based on your component
              setup.
            </p>
          </Section>

          <Section title="Next steps">
            <ol className="list-decimal pl-5">
              <li className="mt-2">
                Edit the frontend and watch changes apply.
              </li>
              <li className="mt-2">
                Open{' '}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[0.9em]">
                  diploi.yaml
                </code>{' '}
                and explore the components.
              </li>
              <li className="mt-2">
                Skim the docs when you're ready:{' '}
                <ExtLink href="https://docs.diploi.com/">
                  docs.diploi.com
                </ExtLink>
              </li>
            </ol>
          </Section>
        </div>

        <footer className="mt-10 text-xs text-zinc-500">
          Built with a Diploi starter kit. Customize this page freely.
        </footer>
      </div>
    </main>
  );
}

type Todo = {
  id: string;
  task: string;
  is_complete: boolean;
  inserted_at: string | null;
};

type TodoRow = {
  id: string | number;
  task: string | null;
  is_complete: boolean | null;
  inserted_at: string | null;
};

const normalizeTodo = (row: TodoRow): Todo => ({
  id: String(row.id),
  task: row.task ?? '',
  is_complete: Boolean(row.is_complete),
  inserted_at: row.inserted_at,
});

type BrowserSupabaseClient = SupabaseClient<any, 'public', any>;

function SupabaseTodoDemo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set<string>());
  const supabase = useSupabase();

  useEffect(() => {
    if (!supabase) {
      setError(
        'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.'
      );
      setLoading(false);
      return;
    }

    const fetchTodos = async () => {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('todos')
        .select('id, task, is_complete, inserted_at')
        .order('inserted_at', { ascending: false })
        .limit(25);

      if (fetchError) {
        setError(fetchError.message);
      } else {
        const rows = (data ?? []) as TodoRow[];
        setTodos(rows.map(normalizeTodo));
        setError(null);
      }
      setLoading(false);
    };

    fetchTodos();
  }, [supabase]);

  const setPending = (id: string, value: boolean) => {
    setPendingIds((prev) => {
      const next = new Set(prev);
      if (value) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const handleAddTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const task = newTask.trim();

    if (!task || submitting) {
      return;
    }

    if (!supabase) {
      setError('Supabase client is unavailable.');
      return;
    }

    setSubmitting(true);

    const { data, error: insertError } = await supabase
      .from('todos')
      .insert({ task })
      .select('id, task, is_complete, inserted_at')
      .single();

    if (insertError) {
      setError(insertError.message);
    } else if (data) {
      const todo = normalizeTodo(data as TodoRow);
      setTodos((prev) => [todo, ...prev]);
      setNewTask('');
      setError(null);
    }

    setSubmitting(false);
  };

  const toggleTodo = async (todo: Todo) => {
    if (!supabase) {
      setError('Supabase client is unavailable.');
      return;
    }

    setPending(todo.id, true);

    const { data, error: updateError } = await supabase
      .from('todos')
      .update({ is_complete: !todo.is_complete })
      .eq('id', todo.id)
      .select('id, task, is_complete, inserted_at')
      .single();

    if (updateError) {
      setError(updateError.message);
    } else if (data) {
      const updated = normalizeTodo(data as TodoRow);
      setTodos((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      setError(null);
    }

    setPending(todo.id, false);
  };

  const deleteTodo = async (id: string) => {
    if (!supabase) {
      setError('Supabase client is unavailable.');
      return;
    }

    setPending(id, true);

    const { error: deleteError } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (deleteError) {
      setError(deleteError.message);
      setPending(id, false);
      return;
    }

    setTodos((prev) => prev.filter((item) => item.id !== id));
    setPending(id, false);
    setError(null);
  };

  const hasTodos = todos.length > 0;

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddTodo} className="flex flex-wrap gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          placeholder="Add a todo"
          className="flex-1 min-w-0 rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          disabled={submitting}
        />
        <button
          type="submit"
          disabled={submitting || newTask.trim() === ''}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
        >
          {submitting ? 'Adding...' : 'Add'}
        </button>
      </form>

      {error && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-zinc-600">Loading todos…</p>
      ) : hasTodos ? (
        <ul className="space-y-2">
          {todos.map((todo) => {
            const pending = pendingIds.has(todo.id);

            return (
              <li
                key={todo.id}
                className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleTodo(todo)}
                  disabled={pending}
                  className="flex items-center gap-2 text-left"
                >
                  <span
                    className={`inline-flex h-4 w-4 items-center justify-center rounded border ${
                      todo.is_complete
                        ? 'border-indigo-500 bg-indigo-500 text-white'
                        : 'border-zinc-300'
                    }`}
                    aria-hidden="true"
                  >
                    {todo.is_complete ? '✓' : ''}
                  </span>
                  <span
                    className={
                      todo.is_complete
                        ? 'text-zinc-400 line-through'
                        : 'text-zinc-800'
                    }
                  >
                    {todo.task}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => deleteTodo(todo.id)}
                  disabled={pending}
                  className="text-xs font-medium text-zinc-500 transition hover:text-rose-600 disabled:cursor-not-allowed"
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-zinc-600">
          No todos yet. Add your first task!
        </p>
      )}
    </div>
  );
}
