import { PagingConfig } from './Paging';
import IMText from '@/data/img-text.json';

const AppConfig = {
  Regex: {
    Integer: /^-?\d*(\d+)?$/,
    Float: /^-?\d*(\d\.\d+)?$/,
    HYPHEN: /-/g,
    FaxTelNumber: /^(\d){2,3}(-(\d){4}){2}$/,
    PostalCode: /^(\d){3}(-(\d){4}){1}$/,
    IsNumber: /^(\d)*$/,
    IsDate: /^(19[5-9][0-9]|20[0-4][0-9]|2050)[-/](0?[1-9]|1[0-2])[-/](0?[1-9]|[12][0-9]|3[01])$/,
    IsPrecisionNumber: /^(\d)+(\.(\d)+)?$/,
  },
  TIMEOUT_NOTIFICATIONS: 2000,
  TIMEOUT_CALL_API: 50000,
  DateTime: {
    Now: new Date(),
  },
  KeyCode: {
    Backspace: 8,
    Tab: 9,
    Shift: 16,
    MinNumber: 48,
    MaxNumber: 57,
    Period: 46,
  },
  MaxLength: {
    PostalCode: 8,
    Tel: 15,
    Fax: 15,
    Address1: 4,
    Address2: 20,
    Address3: 40,
    Address4: 100,
    JwnetNumber: 7,
    JwnetPassword: 6,
    EdiKey: 8,
    Memo: 256,
    Name: 260,
    Kana: 260,
    Number: 16,
    FileSize: 10,
    FwnetCode: 3,
    LicenseNumber: 11,
    UnitQuantity: 9,
    UnitCost: 8,
    CollectCycle: 16,
    RecycleRate: 4,
  },
  Name: {
    PostalCode: 'namePost',
    Tel: 'nameTel',
    Fax: 'nameFax',
  },
  File: {
    Extension: ['ade', 'adp', 'apk', 'bat', 'chm', 'cmd', 'com', 'cpl', 'dll', 'dmg', 'exe', 'hta', 'ins',
      'isp', 'jar', 'js', 'jse', 'lib', 'lnk', 'mde', 'msc', 'msi', 'msp', 'mst', 'nsh', 'pif', 'scr', 'sct',
      'shb', 'sys', 'vb', 'vbe', 'vbs', 'vxd', 'wsc', 'wsf', 'wsh, cab', 'pdf', 'doc', 'docx', 'xls', 'xlsx',
      'ppt', 'pptx', 'jpg', 'jpeg', 'png', 'tiff', 'gif', 'bmp', 'dwg', 'dxf', 'jww', 'zip'],
    ExtensionWhite: [
      'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'jpg', 'jpeg', 'png', 'tiff',
      'gif', 'bmp', 'dwg', 'dxf', 'jww', 'zip'
    ],
    CSV: ['csv']
  },
  Pages: {
    page: 1,
    pageSize: PagingConfig.PAGE_SIZE,
    totalRows: 0,
    pageCount: 0,
    orderField: 'DisplayOrder',
    descending: true,
    orderByCreateDate: 'CreateDate',
  },

  LocalStorageUser: 'user',
  LocalStorageToken: 'token',
  LocalStorageRole: 'role',
  LocalStoragePermission: 'permission',
  LocalStorageCustomer: 'customer',
  LocalStorageRemember: 'remember',
  LocalStorageWasteClass: 'wasteClass',
  LocalStorageWasteClassList: 'wasteClassList',

  Button: {
    Update: {
      id: 1,
      label: IMText.general.btnUpdate,
      class: 'btn-form btn-arrow-left pl-2 pr-2',
    },

    View: {
      id: 2,
      label: IMText.general.btnReference,
      class: 'btn-form'
    },

    Delete: {
      id: 3,
      label: IMText.general.btnAdd,
      class: 'btn-form btn-arrow-right pl-2 pr-2'
    },
  },

  ClassButton: {
    Left: 'btn-form btn-arrow-left pl-2 pr-2',
    Middle: 'btn-form',
    Right: 'btn-form btn-arrow-right pl-2 pr-2',
  },

  PermissionGroup: {
    Create: false,
    Update: false,
    Read: false,
    Delete: false
  },

  ColorHex: {
    Primary: '#007bff',
    Secondary: '#545b62',
    Success: '#1e7e34',
    Danger: '#dc3545',
    Warning: '#ffc107',
    Info: '#17a2b8',
    Light: '#f8f9fa',
    Dark: '#343a40',
    Pink: '#FFE0F5',
  },

  OrderField: 'DisplayOrder',
  Descending: true,

  NameButtonGroup: {
    read: IMText.general.btnReference,
    update: IMText.general.btnUpdate,
    delete: IMText.general.btnDelete
  },

  GroupNotification: {
    Update: false,
    Cancel: false,
    Approve: false,
  },

  ThreeSelectBox: {
    big: "",
    medium: "",
    small: "",
  },

  EndPoint: '/api/v1',
};
export default AppConfig;
