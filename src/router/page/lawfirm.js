import LawFirmLayout from "@/layout/LawFirmLayout";

const meta = (title) => {
    return {
        layout: LawFirmLayout,
        title: title,
        transition: 'fade-in-down'
    }
}

export default [
    {
        path: '/law-firm',
        name: 'LawFirmIndex',
        meta: meta('LawFirmIndex'),
        component: () => import(/* webpackChunkName: "Channel" */ '@/views/lawfirm/Index.vue')
    },
    {
        path: '/law-firm/list',
        name: 'LawFirmList',
        meta: meta('LawFirmList'),
        component: () => import(/* webpackChunkName: "Channel" */ '@/views/lawfirm/List.vue')
    },
    {
        path: '/law-firm/position/view',
        name: 'LawFirmPositionView',
        meta: meta('LawFirmPositionView'),
        component: () => import(/* webpackChunkName: "Channel" */ '@/views/position/View.vue')
    },
    {
        path: '/law-firm/position/delete',
        name: 'LawFirmPositionPasswordDelete',
        meta: meta('LawFirmPositionPasswordDelete'),
        component: () => import(/* webpackChunkName: "Channel" */ '@/views/position/Delete.vue')
    },
    {
        path: '/law-firm/position/edit',
        name: 'LawFirmPositionEdit',
        meta: meta('LawFirmPositionEdit'),
        component: () => import(/* webpackChunkName: "Channel" */ '@/views/position/Edit.vue')
    },
    {
        path: '/law-firm/position/write',
        name: 'LawFirmPositionWrite',
        meta: meta('LawFirmPositionWrite'),
        component: () => import(/* webpackChunkName: "Channel" */ '@/views/position/Write.vue')
    },
    {
        path: '/law-firm/trial/view',
        name: 'LawFirmTrialView',
        meta: meta('LawFirmTrialView'),
        component: () => import(/* webpackChunkName: "Channel" */ '@/views/trial/View.vue')
    },
    {
        path: '/law-firm/trial/delete',
        name: 'LawFirmTrialDelete',
        meta: meta('LawFirmTrialDelete'),
        component: () => import(/* webpackChunkName: "Channel" */ '@/views/trial/Delete.vue')
    },
    {
        path: '/law-firm/trial/write',
        name: 'LawFirmTrialWrite',
        meta: meta('LawFirmTrialWrite'),
        component: () => import(/* webpackChunkName: "Channel" */ '@/views/trial/Write.vue')
    }
]
