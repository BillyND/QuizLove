import mapValues from "lodash/mapValues";
import { createSubscription, useSubscription } from "./globalStateHook";

export const modalSubscription = createSubscription<{
  [key: string]: {
    active: boolean;
    type?: string;
    page?: any;
    count?: number;
    remain?: number;
    displayName?: string;
    maxPageCount?: number;
    title?: string;
    content?: any;
    primaryText?: string;
    secondaryText?: string;
    onConfirm?: Function;
    onCustomCancel?: Function;
  };
}>({
  key: {
    active: false,
  },
});

export const useModal = () => {
  const { state, setState } = useSubscription(modalSubscription);

  const openModal = (key = "", data = {}) => {
    if (key) {
      setState({ [key]: { active: true, ...data } });
    } else {
      setState({ visible: true });
    }
    document.documentElement.style.setProperty("overflow", "hidden");
  };

  const closeModal = (key = "") => {
    if (key) {
      setState({ [key]: { active: false } });
    } else {
      const newState = mapValues(modalSubscription?.state, () => false);
      setState(newState);
    }
    document.documentElement.style.removeProperty("overflow");
  };

  return { state, openModal, closeModal };
};
