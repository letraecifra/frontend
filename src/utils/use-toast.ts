import { type ReactNode, useEffect, useState } from 'react';

import { type ToastActionElement, type ToastProps } from '~/components/ui/toast';

export type ToastId = string;

type ToasterToast = {
  action?: ToastActionElement;
  description?: ReactNode;
  id: ToastId;
  title?: ReactNode;
} & ToastProps;

type Action =
  | {
      toast: Partial<ToasterToast>;
      type: ActionType['UPDATE_TOAST'];
    }
  | {
      toast: ToasterToast;
      type: ActionType['ADD_TOAST'];
    }
  | {
      toastId?: ToastId;
      type: ActionType['DISMISS_TOAST'];
    }
  | {
      toastId?: ToastId;
      type: ActionType['REMOVE_TOAST'];
    };

type ActionType = typeof actionTypes;

interface State {
  toasts: ToasterToast[];
}

export type ToastParams = Omit<ToasterToast, 'id'>;

export interface ToastReturn {
  dismiss: () => void;
  id: ToastId;
  update: (props: ToastParams) => void;
}

interface UseToastReturn extends State {
  dismiss: (toastId?: string) => void;
  toast: (props: ToastParams) => ToastReturn;
}

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

let count = 0;
let memoryState: State = {
  toasts: [],
};

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
const listeners: ((state: State) => void)[] = [];

function dispatch(action: Action): void {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

function addToRemoveQueue(toastId: ToastId): void {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: 'REMOVE_TOAST',
      toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
}

function genId(): ToastId {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;

  return count.toString();
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case actionTypes.ADD_TOAST: {
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    }

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      };
    }

    case actionTypes.REMOVE_TOAST: {
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }

      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    }

    case actionTypes.UPDATE_TOAST: {
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };
    }
  }
}

export function toast({ ...props }: ToastParams): ToastReturn {
  const id = genId();

  function update(props: ToasterToast): void {
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id },
    });
  }
  function dismiss(): void {
    dispatch({
      type: 'DISMISS_TOAST',
      toastId: id,
    });
  }

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id,
    dismiss,
    update,
  };
}

export function useToast(): UseToastReturn {
  const [state, setState] = useState<State>(memoryState);

  useEffect(() => {
    listeners.push(setState);

    return (): void => {
      const index = listeners.indexOf(setState);

      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  };
}
