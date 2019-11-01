import { Screen, Action } from '@/constants/Screen';
import { canAction } from '@/shared/utilities';
import IMText from '@/data/img-text.json';

export const HomeWidgetData = [
    {
        id: 1,
        titleHeader: '排出事業場',
        button1: {
            title: '排出事業場設定',
            rediect: Screen.SSHI0004,
            permission: true,
        },
        button2: {
            title: '排出事業場グループ設定',
            rediect: Screen.SSHI0007,
            permission: false,
        },
        button3: {
            title: '設定エラー',
            rediect: Screen.SSHI0035,
            permission: true,
            totalNotify: 0,
        }
    },
    {
        id: 2,
        titleHeader: '収集運搬業者',
        button1: {
            title: '収集運搬業者設定',
            rediect: Screen.SSHI0010,
            permission: true,
        },
        button3: {
            title: '設定エラー',
            rediect: Screen.SSHI0035,
            permission: true,
            totalNotify: 0,
        }
    },
    {
        id: 3,
        titleHeader: '処分業者',
        button1: {
            title: '処分業者設定',
            rediect: Screen.SSHI0013,
            permission: true,
        },
        button2: {
            title: '処分事業場設定',
            rediect: Screen.SSHI0016,
            permission: true,
        },
        button3: {
            title: '設定エラー',
            rediect: Screen.SSHI0035,
            permission: true,
            totalNotify: 0,
        }
    },
    {
        id: 4,
        titleHeader: '管理会社',
        button1: {
            title: '排出事業者設定',
            rediect: Screen.SSHI0001,
            permission: canAction(Action.Read, Screen.SSHI0038_ITEM_35_46_47),
        },
        button2: {
            title: 'システム設定',
            rediect: Screen.SSHI0022,
            permission: canAction(Action.Read, Screen.SSHI0038_ITEM_36),
        },
        button3: {
            title: '設定エラー',
            rediect: Screen.SSHI0035,
            permission: canAction(Action.Read, Screen.SSHI0038_ITEM_35_46_47),
            totalNotify: 0,
        }
    }
];

export const HomeCardData = [
    {
        cardId: 1,
        headerTitle: IMText.home.homeCard.titleWaste1,
        img: 'https://placekitten.com/g/400/450',
        wasteVisible: false,
        class: 'card1',
        button: {
            totalNotify01: 0,
            totalNotify02: 0,
            totalNotify03: 0,
            totalNotify04: 0
        }
    },
    {
        cardId: 2,
        headerTitle: IMText.home.homeCard.titleWaste2,
        class: 'card2',
        img: 'https://placekitten.com/g/400/450',
        wasteVisible: false,
        button: {
            totalNotify01: 0,
            totalNotify02: 0,
            totalNotify03: 0,
            totalNotify04: 0
        }
    },
    {
        cardId: 3,
        headerTitle: IMText.home.homeCard.titleWaste3,
        class: 'card3',
        img: 'https://placekitten.com/g/400/450',
        wasteVisible: false,
        button: {
            totalNotify01: 0,
            totalNotify02: 0,
            totalNotify03: 0,
            totalNotify04: 0
        }
    },
    {
        cardId: 4,
        headerTitle: IMText.home.homeCard.titleWaste4,
        wasteVisible: false,
        class: 'card4',
        img: 'https://placekitten.com/g/400/450'
    },
    {
        cardId: 5,
        headerTitle: IMText.home.homeCard.titleWaste5,
        wasteVisible: false,
        class: 'card5',
        img: 'https://placekitten.com/g/400/450'
    }
];