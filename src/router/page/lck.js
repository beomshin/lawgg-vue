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
        path: '/lck',
        name: 'LCKList',
        meta: meta('LCKList'),
        component: () => import(/* webpackChunkName: "Channel" */ '@/views/lck/List.vue')
    },
    {
        path: '/normal',
        name: 'IssueList',
        meta: meta('IssueList'),
        component: () => import(/* webpackChunkName: "Channel" */ '@/views/normal/List')
    },
]
