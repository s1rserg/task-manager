'use client';

import { Button } from '@/components/common/button/button';
import { TaskCreateForm } from './task-create-form';
import { useModal } from '@/libs/hooks/use-modal-state/use-modal-state.hook';

export function TaskCreateModal() {
  const { isOpened, onClose, onOpen } = useModal();

  return (
    <>
      <Button label='New Task' onClick={onOpen} />
      <TaskCreateForm isOpened={isOpened} onClose={onClose} />
    </>
  );
}
