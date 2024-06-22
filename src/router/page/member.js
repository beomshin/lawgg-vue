import LayoutDefault from "@/layout/common/LayoutDefault";

const meta = (title) => {
    return {
        layout: LayoutDefault,
        title: title,
        transition: 'fade-in-down'
    }
}

export default [
    {
        path: '/login',
        name: 'MemberLogin',
        meta: meta('MemberLogin'),
        component: () => import(/* webpackChunkName: "Login" */ '@/views/member/login/Login.vue')
    },
    {
        path: '/join/agree',
        name: 'MemberJoinAgree',
        meta: meta('MemberJoinAgree'),
        component: () => import(/* webpackChunkName: "Join" */ '@/views/member/join/JoinAgree.vue')
    },
    {
        path: '/join/register',
        name: 'MemberJoinRegister',
        meta: meta('MemberJoinRegister'),
        component: () => import(/* webpackChunkName: "Join" */ '@/views/member/join/JoinRegister.vue')
    },
    {
        path: '/join/end',
        name: 'MemberJoinEnd',
        meta: meta('MemberJoinEnd'),
        component: () => import(/* webpackChunkName: "Join" */ '@/views/member/join/JoinEnd.vue')
    },
    {
        path: '/search/id',
        name: 'MemberIdSearch',
        meta: meta('MemberIdSearch'),
        component: () => import(/* webpackChunkName: "Join" */ '@/views/member/search/IdSearch.vue')
    },
    {
        path: '/search/pw',
        name: 'MemberPwSearch',
        meta: meta('MemberPwSearch'),
        component: () => import(/* webpackChunkName: "Join" */ '@/views/member/search/PwSearch.vue')
    }
]
