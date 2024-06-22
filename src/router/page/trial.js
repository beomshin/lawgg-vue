import TrialLayout from "@/layout/TrialLayout";

const meta = (title) => {
    return {
        layout: TrialLayout,
        title: title,
        transition: 'fade-in-down'
    }
}

export default  [
    {
        path: '/trial',
        name: 'TrialList',
        meta: meta('TrialList'),
        component: () => import(/* webpackChunkName: "Channel" */ '@/views/trial/List.vue')
    },
    {
        path: '/trial/view',
        name: 'TrialView',
        meta: meta('TrialView'),
        component: () => import(/* webpackChunkName: "Channel" */ '@/views/trial/View.vue')
    },
    {
        path: '/trial/write',
        name: 'TrialWrite',
        meta: meta('TrialWrite'),
        component: () => import(/* webpackChunkName: "Channel" */ '@/views/trial/Write.vue')
    },
    {
        path: '/trial/delete',
        name: 'TrialDelete',
        meta: meta('TrialDelete'),
        component: () => import(/* webpackChunkName: "Channel" */ '@/views/trial/Delete.vue')
    },
]
