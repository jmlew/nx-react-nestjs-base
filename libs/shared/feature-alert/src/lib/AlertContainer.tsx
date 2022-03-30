import { AlertMessage } from '@example-app/shared/ui-common';

import { useAlert } from './alert.context';

export function AlertContainer() {
  const { alert, setAlert } = useAlert();
  const { isShown, message, type, duration, align } = alert;
  function handleClose() {
    setAlert({ ...alert, isShown: false });
  }
  return (
    <AlertMessage
      message={message}
      isShown={isShown}
      onClose={handleClose}
      type={type}
      duration={duration}
      align={align}
    />
  );
}
