import MyPageLayout from "@/layout/MyPageLayout";

const meta = (title) => {
    return {
        layout: MyPageLayout,
        title: title,
        transition: 'fade-in-down'
    }
}


export default [
        {
            path: '/my/info',
            name: 'MypageMyInfo',
            meta: meta('MypageMyInfo'),
            component: () => import(/* webpackChunkName: "Login" */ '@/views/mypage/MyInfo.vue'),
        },
        {
            path: '/my/message',
            name: 'MypageMessage',
            meta: meta('MypageMessage'),
            component: () => import(/* webpackChunkName: "Login" */ '@/views/mypage/Message.vue')
        },
        {
            path: '/my/alert',
            name: 'MypageAlert',
            meta: meta('MypageAlert'),
            component: () => import(/* webpackChunkName: "Login" */ '@/views/mypage/Alert.vue')
        },
        {
            path: '/my/board',
            name: 'MypageMyBoard',
            meta: meta('MypageMyBoard'),
            component: () => import(/* webpackChunkName: "Login" */ '@/views/mypage/MyBoard.vue')
        },
        {
            path: '/my/position/view',
            name: 'MyPositionView',
            meta: meta('MyPositionView'),
            component: () => import(/* webpackChunkName: "Channel" */ '@/views/position/View.vue')
        },
        {
            path: '/my/position/delete',
            name: 'MyPositionPasswordDelete',
            meta: meta('MyPositionPasswordDelete'),
            component: () => import(/* webpackChunkName: "Channel" */ '@/views/position/Delete.vue')
        },
        {
            path: '/my/position/edit',
            name: 'MyPositionEdit',
            meta: meta('MyPositionEdit'),
            component: () => import(/* webpackChunkName: "Channel" */ '@/views/position/Edit.vue')
        },
        {
            path: '/my/trial/view',
            name: 'MyTrialView',
            meta: meta('MyTrialView'),
            component: () => import(/* webpackChunkName: "Channel" */ '@/views/trial/View.vue')
        },
        {
            path: '/my/trial/delete',
            name: 'MyTrialDelete',
            meta: meta('MyTrialDelete'),
            component: () => import(/* webpackChunkName: "Channel" */ '@/views/trial/Delete.vue')
        }
]
