import { TaskCreateModal } from '@/components/task/task-create/task-create-modal';
import { prisma } from '@/libs/db/db';

export default async function DashboardPage() {
  const tasks = await prisma.task.findMany();
  return (
    <>
      <TaskCreateModal />
      {tasks.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </>
  );
}
