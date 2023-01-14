import { typesAction } from "./globalState";
export default (state: any, action: any) => {
  switch (action.type) {
    case typesAction.DELETE_INVOICE:
      break;

    default:
      return state;
      break;
  }
};
