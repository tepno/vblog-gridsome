
export const constantRouterMap = [

    {
        path: '/user/new',
        meta: {
            type: "user",
            icon: 'el-icon-star-off',
            title: '最新动态'
        },
    },
    {
        path: '/user/social',
        redirect: '/user/social/main',
        meta: {
            type: "user",
            icon: 'el-icon-mobile-phone',
            title: '社交圈'
        },
    },
    {
        path: '/user/blog',
        meta: {
            type: "user",
            icon: 'el-icon-edit-outline',
            title: '博客列表'
        },

    },
    {
        path: '/user/project',
        redirect: '/user/project/main',
        meta: {
            type: "user",
            icon: 'el-icon-service',
            title: '开源项目'
        },
    },
    {
        path: '/user/helper',
        redirect: '/user/helper/main',
        meta: {
            type: "user",
            icon: 'el-icon-printer',
            title: '使用帮助',
            mini: true
        },
    },
    {
        path: '/user/readme',
        meta: {
            type: "user",
            icon: 'el-icon-document',
            title: 'README.md'
        },
    },
    {
        path: '/user/configure',
        meta: {
            type: "user",
            icon: 'el-icon-setting',
            title: '系统配置',
            LoginRequired: true
        },
    },



    {
        path: "/404",
    },
    {
        path: '/',
        redirect: '/user/new',
    },
    {
        path: "*",
        redirect: "/404"
    },

    //mobile
    {
        path: '/mobile/user/blog',
        redirect: '/mobile/user/blog/main',
        meta: {
            type: "mobile",
            icon: 'edit',
            title: '博客'
        },

    },
    {
        path: '/mobile/user/project',
        meta: {
            type: "mobile",
            icon: 'like-o',
            title: '项目'
        },

    },
    {
        path: '/mobile/user/self',
        meta: {
            type: "mobile",
            icon: 'contact',
            title: '个人'
        },

    },
]
