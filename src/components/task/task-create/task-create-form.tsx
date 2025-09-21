import { taskCreate } from '@/actions/task/create';
import { Button } from '@/components/common/button/button';
import { DateTimeInput } from '@/components/common/date-time-input/date-time-input';
import { Input } from '@/components/common/input/input';
import { Modal } from '@/components/common/modal/modal';
import { notifyError } from '@/libs/notification/notification';
import { useActionState, useEffect } from 'react';

type Props = {
  isOpened: boolean;
  onClose: () => void;
};

export const TaskCreateForm = ({ isOpened, onClose }: Props) => {
  const [state, formAction] = useActionState(taskCreate, {
    errors: {},
  });

  useEffect(() => {
    if (!state) return;

    if (state.errors._form) {
      notifyError(state.errors._form.join(', '));
    }
  }, [state]);

  return (
    <Modal title='Create new task' isOpened={isOpened} onClose={onClose}>
      <form
        action={formAction}
        className='w-full flex flex-col gap-4 text-white items-center'
      >
        <Input
          label='Title'
          name='title'
          errors={state.errors.title}
          defaultValue={state.values?.title}
        />
        <Input
          label='Description'
          name='description'
          rowsCount={4}
          errors={state.errors.description}
          defaultValue={state.values?.description}
        />
        <DateTimeInput
          label='Due date'
          name='dueDate'
          errors={state.errors.dueDate}
          defaultValue={state.values?.dueDate}
        />
        <Button label='Create' />
      </form>
    </Modal>
  );
};
