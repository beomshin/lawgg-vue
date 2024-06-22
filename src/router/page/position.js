import PositionLayout from "@/layout/PositionLayout";

const meta = (title) => {
    return {
        layout: PositionLayout,
        title: title,
        transition: 'fade-in-down'
    }
}

export default [
    {
        path: '/position',
        name: 'PositionList',
        meta: meta('PositionList'),
        component: () => import(/* webpackChunkName: "Channel" */ '@/views/position/List.vue')
    },
    {
        path: '/position/view',
        name: 'PositionView',
        meta: meta('PositionView'),
        component: () => import(/* webpackChunkName: "Channel" */ '@/views/position/View.vue')
    },
    {
        path: '/position/write',
        name: 'PositionWrite',
        meta: meta('PositionWrite'),
        component: () => import(/* webpackChunkName: "Channel" */ '@/views/position/Write.vue')
    },
    {
        path: '/position/delete',
        name: 'PositionPasswordDelete',
        meta: meta('PositionPasswordDelete'),
        component: () => import(/* webpackChunkName: "Channel" */ '@/views/position/Delete.vue')
    },
    {
        path: '/position/edit',
        name: 'PositionEdit',
        meta: meta('PositionEdit'),
        component: () => import(/* webpackChunkName: "Channel" */ '@/views/position/Edit.vue')
    }
]
