export const WasteClass = {
  all: {
    id: 0,
    key: 0,
    value: 'すべて',
    background: '#6C757D',
    color: 'white',
    class: 'card0',
    cssClassButton: '',
  },
  industrialWaste: {
    id: 1,
    key: 1,
    value: '産業廃棄物',
    background: '#99FF99',
    color: 'black',
    class: 'card1',
    cssClassButton: 'btn-industrial-waste',
  },
  industrialSpecialWaste: {
    id: 2,
    key: 2,
    value: '特別管理産業廃棄物',
    background: '#FF6666',
    color: 'white',
    class: 'card2',
    cssClassButton: 'btn-special-industrial-waste',
  },
  constructionWaste: {
    id: 3,
    key: 3,
    value: '建設廃棄物',
    background: '#CCCCFF',
    color: 'black',
    class: 'card3',
    cssClassButton: 'btn-construction-waste',
  },
  valuableWaste: {
    id: 4,
    key: 4,
    value: '有価物',
    background: '#ffcc99',
    color: 'black',
    class: 'card4',
    cssClassButton: 'btn-valuable-waste',
  },
  municipalWaste: {
    id: 5,
    key: 5,
    value: '一般廃棄物',
    background: '#ccffff',
    color: 'black',
    class: 'card5',
    cssClassButton: 'btn-municipal-waste',
  },
};

export const NotifyClass = {
  important: {
    id: 1,
    key: 1,
    value: '重要',
  },
  request: {
    id: 2,
    key: 2,
    value: '承認依頼',
  },
  report: {
    id: 3,
    key: 3,
    value: '終了報告',
  },
  other: {
    id: 4,
    key: 4,
    value: 'その他',
  },
  error: {
    id: 5,
    key: 5,
    value: '設定エラー通知',
  },
  errorConfig: {
    id: 6,
    key: 6,
    value: '設定エラー通知',
  },
  errorSystem: {
    id: 7,
    key: 7,
    value: 'システムエラー通知',
  },
};

export const NotifyType = {
  tranfer: {
    id: 1,
    key: 1,
    value: '運搬終了報告修正・取消承認',
  },
  edit: {
    id: 2,
    key: 2,
    value: '処分終了報告修正・取消承認',
  },
  reportExpired: {
    id: 3,
    key: 3,
    value: '期限切れ',
  },
  notifyExpired: {
    id: 4,
    key: 4,
    value: '期限切れ予告',
  },
  correctCancel: {
    id: 5,
    key: 5,
    value: '修正取消無効',
  },
  tranferEnd: {
    id: 6,
    key: 6,
    value: '運搬終了報告',
  },
  treatmentEnd: {
    id: 7,
    key: 7,
    value: '処分終了報告',
  },
  treatmentFinal: {
    id: 8,
    key: 8,
    value: '最終処分終了報告',
  },
  reportTranfer: {
    id: 9,
    key: 9,
    value: '運搬終了報告',
  },
  reportTreatmentEnd: {
    id: 10,
    key: 10,
    value: '処分終了報告',
  },
  reportTreatmentFinal: {
    id: 11,
    key: 11,
    value: '最終処分終了報告',
  },
};

export const NotifySource = {
  all: {
    id: 0,
    key: 0,
    value: '',
  },
  wasteCompany: {
    id: 1,
    key: 1,
    value: '管理会社',
  },
  deliveryCompany: {
    id: 2,
    key: 2,
    value: '収集運搬業者',
  },
  disposalCompany: {
    id: 3,
    key: 2,
    value: '処分業者',
  },
  system: {
    id: 4,
    key: 4,
    value: '排出事業場',
  },
};

export const SupplierClass = {
  all: {
    id: 0,
    key: 0,
    value: '',
  },
  deliveryCompany: {
    id: 1,
    key: 2,
    value: '収集運搬業者',
  },
  disposalCompany: {
    id: 2,
    key: 3,
    value: '処分業者',
  },
};

