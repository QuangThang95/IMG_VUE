import { Permissions } from '@/constants/Permissions';
import { Action, Screen } from '@/constants/Screen';
import { current } from '@/shared/utilities';

// Agent
const listCreateAgent = [Screen.SSHI0001, Screen.SSHI0002, Screen.SSHI0004, Screen.SSHI0005,
Screen.SSHI0006_POPUP, Screen.SSHI0008, Screen.SSHI0009_POPUP, Screen.SSHI0010,
Screen.SSHI0011, Screen.SSHI0012_POPUP_TAB1, Screen.SSHI0019, Screen.SSHI0020, Screen.SSHI0016,
Screen.SSHI0013, Screen.SSHI0014, Screen.SSHI0015, Screen.SSHI0026, Screen.SSHI0022,
Screen.SSHI0031_123, Screen.SSHI0031_45, Screen.SSHI0032_123_ADD, Screen.SSHI0032_45_ADD];

const listUpdateAgent = [Screen.SSHI0001, Screen.SSHI0003, Screen.SSHI0004, Screen.SSHI0006,
Screen.SSHI0006_POPUP, Screen.SSHI0007, Screen.SSHI0009, Screen.SSHI0009_POPUP, Screen.SSHI0010,
Screen.SSHI0012, Screen.SSHI0012_POPUP_TAB1, Screen.SSHI0019, Screen.SSHI0021, Screen.SSHI0016,
Screen.SSHI0013, Screen.SSHI0014, Screen.SSHI0015, Screen.SSHI0026, Screen.SSHI0022, Screen.SSHI0036,
Screen.SSHI0031_123, Screen.SSHI0031_45, Screen.SSHI0033_123_UPDATE, Screen.SSHI0033_45_UPDATE];

const listDeleteAgent = [Screen.SSHI0001, Screen.SSHI0004, Screen.SSHI0006_POPUP, Screen.SSHI0007,
Screen.SSHI0009_POPUP, Screen.SSHI0010, Screen.SSHI0012_POPUP_TAB1, Screen.SSHI0019,
Screen.SSHI0016, Screen.SSHI0013, Screen.SSHI0014, Screen.SSHI0015, Screen.SSHI0026, Screen.SSHI0022,
Screen.SSHI0031_123, Screen.SSHI0031_45];

const listReadAgent = [Screen.SSHI0007, Screen.SSHI0009, Screen.SSHI0009_POPUP,
Screen.SSHI0021_POPUP_BRANCH, Screen.SSHI0021_POPUP_GROUP, Screen.SSHI0016, Screen.SSHI0013,
Screen.SSHI0014, Screen.SSHI0015, Screen.SSHI0038, Screen.SSHI0038_GROUP_43,
Screen.SSHI0038_ITEM_18_TO_29, Screen.SSHI0038_ITEM_31, Screen.SSHI0038_ITEM_35_46_47,
Screen.SSHI0038_ITEM_36, Screen.SSHI0038_ITEM_1_TO_17];

// CustomerManager

const listCreateCustomerManager = [Screen.SSHI0005, Screen.SSHI0006_POPUP, Screen.SSHI0008,
Screen.SSHI0009_POPUP, Screen.SSHI0010, Screen.SSHI0011, Screen.SSHI0012_POPUP_TAB1,
Screen.SSHI0019, Screen.SSHI0020, Screen.SSHI0016, Screen.SSHI0013, Screen.SSHI0014,
Screen.SSHI0015, Screen.SSHI0026,
Screen.SSHI0031_123, Screen.SSHI0031_45, Screen.SSHI0032_123_ADD, Screen.SSHI0032_45_ADD];

const listUpdateCustomerManager = [Screen.SSHI0001, Screen.SSHI0003, Screen.SSHI0004,
Screen.SSHI0006, Screen.SSHI0006_POPUP, Screen.SSHI0007, Screen.SSHI0009, Screen.SSHI0009_POPUP,
Screen.SSHI0010, Screen.SSHI0012, Screen.SSHI0012_POPUP_TAB1, Screen.SSHI0019, Screen.SSHI0021,
Screen.SSHI0016, Screen.SSHI0013, Screen.SSHI0014, Screen.SSHI0015, Screen.SSHI0026,
Screen.SSHI0036, Screen.SSHI0031_123, Screen.SSHI0031_45, Screen.SSHI0033_123_UPDATE, Screen.SSHI0033_45_UPDATE];

const listDeleteCustomerManager = [Screen.SSHI0004, Screen.SSHI0006_POPUP, Screen.SSHI0007,
Screen.SSHI0009_POPUP, Screen.SSHI0010, Screen.SSHI0012, Screen.SSHI0012_POPUP_TAB1,
Screen.SSHI0019, Screen.SSHI0016, Screen.SSHI0013, Screen.SSHI0014, Screen.SSHI0015,
Screen.SSHI0026, Screen.SSHI0031_123, Screen.SSHI0031_45];

const listReadCustomerManager = [Screen.SSHI0003, Screen.SSHI0004, Screen.SSHI0006,
Screen.SSHI0006_POPUP, Screen.SSHI0007, Screen.SSHI0009, Screen.SSHI0009_POPUP,
Screen.SSHI0021_POPUP_BRANCH, Screen.SSHI0021_POPUP_GROUP, Screen.SSHI0016, Screen.SSHI0013,
Screen.SSHI0014, Screen.SSHI0015, Screen.SSHI0038, Screen.SSHI0038_GROUP_43,
Screen.SSHI0038_ITEM_18_TO_29, Screen.SSHI0038_ITEM_31, Screen.SSHI0038_ITEM_35_46_47,
Screen.SSHI0038_ITEM_1_TO_17];

// GroupManager

const listCreateGroupManager = [Screen.SSHI0006_POPUP, Screen.SSHI0009_POPUP, Screen.SSHI0010,
Screen.SSHI0011, Screen.SSHI0012_POPUP_TAB1, Screen.SSHI0019, Screen.SSHI0020, Screen.SSHI0016,
Screen.SSHI0013, Screen.SSHI0014, Screen.SSHI0015, Screen.SSHI0026,
Screen.SSHI0031_123, Screen.SSHI0031_45, Screen.SSHI0032_123_ADD, Screen.SSHI0032_45_ADD];

const listUpdateGroupManager = [Screen.SSHI0004, Screen.SSHI0006, Screen.SSHI0006_POPUP,
Screen.SSHI0007, Screen.SSHI0009, Screen.SSHI0009_POPUP, Screen.SSHI0010, Screen.SSHI0012,
Screen.SSHI0012_POPUP_TAB1, Screen.SSHI0019, Screen.SSHI0021, Screen.SSHI0016, Screen.SSHI0013,
Screen.SSHI0014, Screen.SSHI0015, Screen.SSHI0026, Screen.SSHI0036,
Screen.SSHI0031_123, Screen.SSHI0031_45, Screen.SSHI0033_123_UPDATE, Screen.SSHI0033_45_UPDATE];

const listDeleteGroupManager = [Screen.SSHI0004, Screen.SSHI0006_POPUP, Screen.SSHI0009_POPUP,
Screen.SSHI0010, Screen.SSHI0012, Screen.SSHI0012_POPUP_TAB1, Screen.SSHI0019, Screen.SSHI0016,
Screen.SSHI0013, Screen.SSHI0014, Screen.SSHI0015, Screen.SSHI0026,
Screen.SSHI0031_123, Screen.SSHI0031_45];

const listReadGroupManager = [Screen.SSHI0004, Screen.SSHI0006, Screen.SSHI0006_POPUP,
Screen.SSHI0007, Screen.SSHI0009, Screen.SSHI0009_POPUP, Screen.SSHI0021_POPUP_BRANCH,
Screen.SSHI0021_POPUP_GROUP, Screen.SSHI0016, Screen.SSHI0013, Screen.SSHI0014, Screen.SSHI0015,
Screen.SSHI0038, Screen.SSHI0038_GROUP_43, Screen.SSHI0038_ITEM_18_TO_29, Screen.SSHI0038_ITEM_31,
Screen.SSHI0038_ITEM_1_TO_17];

// BranchManager

const listCreateBranchManager = [Screen.SSHI0006_POPUP, Screen.SSHI0010, Screen.SSHI0011,
Screen.SSHI0012_POPUP_TAB1, Screen.SSHI0019, Screen.SSHI0020, Screen.SSHI0016, Screen.SSHI0013,
Screen.SSHI0014, Screen.SSHI0015, Screen.SSHI0026,
Screen.SSHI0031_123, Screen.SSHI0031_45, Screen.SSHI0032_123_ADD, Screen.SSHI0032_45_ADD];

const listUpdateBranchManager = [Screen.SSHI0004, Screen.SSHI0006, Screen.SSHI0006_POPUP,
Screen.SSHI0010, Screen.SSHI0012, Screen.SSHI0012_POPUP_TAB1, Screen.SSHI0019, Screen.SSHI0021,
Screen.SSHI0016, Screen.SSHI0013, Screen.SSHI0014, Screen.SSHI0015, Screen.SSHI0026, Screen.SSHI0036,
Screen.SSHI0031_123, Screen.SSHI0031_45, Screen.SSHI0033_123_UPDATE, Screen.SSHI0033_45_UPDATE];

const listDeleteBranchManager = [Screen.SSHI0006_POPUP, Screen.SSHI0010, Screen.SSHI0012,
Screen.SSHI0012_POPUP_TAB1, Screen.SSHI0019, Screen.SSHI0016, Screen.SSHI0013, Screen.SSHI0014,
Screen.SSHI0015, Screen.SSHI0026,
Screen.SSHI0031_123, Screen.SSHI0031_45];

const listReadBranchManager = [Screen.SSHI0004, Screen.SSHI0006, Screen.SSHI0006_POPUP,
Screen.SSHI0021_POPUP_BRANCH, Screen.SSHI0021_POPUP_GROUP, Screen.SSHI0016, Screen.SSHI0013,
Screen.SSHI0014, Screen.SSHI0015, Screen.SSHI0038, Screen.SSHI0038_GROUP_43,
Screen.SSHI0038_ITEM_18_TO_29, Screen.SSHI0038_ITEM_1_TO_17, Screen.SSHI0026];

// CustomerContractor

const listCreateCustomerContractor = [Screen.SSHI0032_123_ADD, Screen.SSHI0032_45_ADD,
Screen.SSHI0026];

const listUpdateCustomerContractor = [Screen.SSHI0026, Screen.SSHI0036,
Screen.SSHI0031_123, Screen.SSHI0031_45, Screen.SSHI0032_123_ADD, Screen.SSHI0033_123_UPDATE, Screen.SSHI0032_45_ADD,
Screen.SSHI0033_45_UPDATE];

const listDeleteCustomerContractor = [Screen.SSHI0026,
Screen.SSHI0031_123, Screen.SSHI0031_45];

const listReadCustomerContractor = [Screen.SSHI0001, Screen.SSHI0003, Screen.SSHI0004, Screen.SSHI0006,
Screen.SSHI0006_POPUP, Screen.SSHI0007, Screen.SSHI0009, Screen.SSHI0010, Screen.SSHI0012, Screen.SSHI0019,
Screen.SSHI0021, Screen.SSHI0016, Screen.SSHI0013, Screen.SSHI0014, Screen.SSHI0015,
Screen.SSHI0038, Screen.SSHI0038_GROUP_43, Screen.SSHI0038_ITEM_18_TO_29,
Screen.SSHI0038_ITEM_31, Screen.SSHI0038_ITEM_35_46_47, Screen.SSHI0038_ITEM_1_TO_17];

// GroupContractor

const listCreateGroupContractor = [Screen.SSHI0032_123_ADD, Screen.SSHI0032_45_ADD, Screen.SSHI0026];

const listUpdateGroupContractor = [Screen.SSHI0026, Screen.SSHI0036,
Screen.SSHI0031_123, Screen.SSHI0031_45, Screen.SSHI0032_123_ADD, Screen.SSHI0033_123_UPDATE, Screen.SSHI0032_45_ADD,
Screen.SSHI0033_45_UPDATE];

const listDeleteGroupContractor = [Screen.SSHI0026,
Screen.SSHI0031_123, Screen.SSHI0031_45];

const listReadGroupContractor = [Screen.SSHI0004, Screen.SSHI0006, Screen.SSHI0006_POPUP,
Screen.SSHI0007, Screen.SSHI0009, Screen.SSHI0009, Screen.SSHI0010, Screen.SSHI0012,
Screen.SSHI0019, Screen.SSHI0021, Screen.SSHI0016, Screen.SSHI0013, Screen.SSHI0014,
Screen.SSHI0015, Screen.SSHI0038, Screen.SSHI0038_GROUP_43, Screen.SSHI0038_ITEM_18_TO_29,
Screen.SSHI0038_ITEM_31, Screen.SSHI0038_ITEM_1_TO_17];

// BranchContractor

const listCreateBranchContractor = [Screen.SSHI0032_123_ADD, Screen.SSHI0032_45_ADD, Screen.SSHI0026, Screen.SSHI0026];

const listUpdateBranchContractor = [Screen.SSHI0026, Screen.SSHI0036,
Screen.SSHI0031_123, Screen.SSHI0031_45, Screen.SSHI0032_123_ADD, Screen.SSHI0033_123_UPDATE, Screen.SSHI0032_45_ADD,
Screen.SSHI0033_45_UPDATE];

const listDeleteBranchContractor = [Screen.SSHI0026,
Screen.SSHI0031_123, Screen.SSHI0031_45];

const listReadBranchContractor = [Screen.SSHI0004, Screen.SSHI0006, Screen.SSHI0006_POPUP,
Screen.SSHI0009, Screen.SSHI0010, Screen.SSHI0012, Screen.SSHI0019, Screen.SSHI0021,
Screen.SSHI0016, Screen.SSHI0013, Screen.SSHI0014, Screen.SSHI0015, Screen.SSHI0038,
Screen.SSHI0038_GROUP_43, Screen.SSHI0038_ITEM_18_TO_29, Screen.SSHI0038_ITEM_1_TO_17];

// CustomerViewer
const listUpdateCustomerViewer = [Screen.SSHI0036];

const listReadCustomerViewer = [Screen.SSHI0004, Screen.SSHI0006, Screen.SSHI0006_POPUP,
Screen.SSHI0009, Screen.SSHI0038, Screen.SSHI0026, Screen.SSHI0038_ITEM_1_TO_17,
Screen.SSHI0031_123, Screen.SSHI0031_45, Screen.SSHI0033_123_UPDATE, Screen.SSHI0033_45_UPDATE];

// GroupViewer
const listUpdateGroupViewer = [Screen.SSHI0036];

const listReadGroupViewer = [Screen.SSHI0004, Screen.SSHI0006, Screen.SSHI0006_POPUP,
Screen.SSHI0009, Screen.SSHI0038, Screen.SSHI0026, Screen.SSHI0038_ITEM_1_TO_17,
Screen.SSHI0031_123, Screen.SSHI0031_45, Screen.SSHI0033_123_UPDATE, Screen.SSHI0033_45_UPDATE];

// BranchViewer
const listUpdateBranchViewer = [Screen.SSHI0036];

const listReadBranchViewer = [Screen.SSHI0004, Screen.SSHI0006, Screen.SSHI0006_POPUP,
Screen.SSHI0009, Screen.SSHI0038, Screen.SSHI0026, Screen.SSHI0038_ITEM_1_TO_17,
Screen.SSHI0031_123, Screen.SSHI0031_45, Screen.SSHI0033_123_UPDATE, Screen.SSHI0033_45_UPDATE];

export function canAction(action: string, screenName: string) {
  const permission = current.permission();
  switch (permission) {
    case Permissions.Agent:
      return (listCreateAgent.includes(screenName) && Action.Create === action)
        || (listUpdateAgent.includes(screenName) && Action.Update === action)
        || (listDeleteAgent.includes(screenName) && Action.Delete === action)
        || (listReadAgent.includes(screenName) && Action.Read === action);
    case Permissions.CustomerManager:
      return (listCreateCustomerManager.includes(screenName) && Action.Create === action)
        || (listUpdateCustomerManager.includes(screenName) && Action.Update === action)
        || (listDeleteCustomerManager.includes(screenName) && Action.Delete === action)
        || (listReadCustomerManager.includes(screenName) && Action.Read === action);
    case Permissions.GroupManager:
      return (listCreateGroupManager.includes(screenName) && Action.Create === action)
        || (listUpdateGroupManager.includes(screenName) && Action.Update === action)
        || (listDeleteGroupManager.includes(screenName) && Action.Delete === action)
        || (listReadGroupManager.includes(screenName) && Action.Read === action);
    case Permissions.BranchManager:
      return (listCreateBranchManager.includes(screenName) && Action.Create === action)
        || (listUpdateBranchManager.includes(screenName) && Action.Update === action)
        || (listDeleteBranchManager.includes(screenName) && Action.Delete === action)
        || (listReadBranchManager.includes(screenName) && Action.Read === action);
    case Permissions.CustomerContractor:
      return (listUpdateCustomerContractor.includes(screenName) && Action.Update === action)
        || listCreateCustomerContractor.includes(screenName) && Action.Create === action
        || (listDeleteCustomerContractor.includes(screenName) && Action.Delete === action)
        || (listReadCustomerContractor.includes(screenName) && Action.Read === action)
        || (listCreateCustomerContractor.includes(screenName) && Action.Create === action);
    case Permissions.GroupContractor:
      return (listUpdateGroupContractor.includes(screenName) && Action.Update === action)
        || (listCreateGroupContractor.includes(screenName) && Action.Create === action)
        || (listDeleteGroupContractor.includes(screenName) && Action.Delete === action)
        || (listReadGroupContractor.includes(screenName) && Action.Read === action)
        || (listCreateGroupContractor.includes(screenName) && Action.Create === action);
    case Permissions.BranchContractor:
      return (listUpdateBranchContractor.includes(screenName) && Action.Update === action)
        || (listCreateBranchContractor.includes(screenName) && Action.Create === action)
        || (listDeleteBranchContractor.includes(screenName) && Action.Delete === action)
        || (listReadBranchContractor.includes(screenName) && Action.Read === action)
        || (listCreateBranchContractor.includes(screenName) && Action.Create === action);
    case Permissions.CustomerViewer:
      return (listReadCustomerViewer.includes(screenName) && Action.Read === action)
        || (listUpdateCustomerViewer.includes(screenName) && Action.Update === action);
    case Permissions.GroupViewer:
      return (listReadGroupViewer.includes(screenName) && Action.Read === action)
        || (listUpdateGroupViewer.includes(screenName) && Action.Update === action);
    case Permissions.BranchViewer:
      return (listReadBranchViewer.includes(screenName) && Action.Read === action)
        || (listUpdateBranchViewer.includes(screenName) && Action.Update === action);
    default:
      break;
  }
  return false;
}
