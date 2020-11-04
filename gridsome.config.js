// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'sss',
  titleTemplate: `%s - VBlog-gridsome`,
  plugins: [
    {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: process.env.GRIDSOME_API_URL,
        // apiURL: 'http://localhost:1337',
        queryLimit: 1000, // Defaults to 100
        contentTypes: ['following', 'list', 'project', 'social'],
        singleTypes: ['userInfo'],
        // // Possibility to login with a Strapi user,
        // // when content types are not publicly available (optional).
        // loginData: {
        //   identifier: '',
        //   password: ''
        // }
      }
    }
  ],
  templates: {
    StrapiFollowing: [
      {
        path: '/user/following/detail/:id',
        component: './src/templates/following-detail.vue'
      }
    ],
    StrapiSocial: [
      {
        path: '/user/social/detail/:id',
        component: './src/templates/social-detail.vue'
      }
    ],
    StrapiList: [
      {
        path: '/user/blog/detail/:id',
        component: './src/templates/blog-detail.vue'
      }
    ],
    StrapiProject: [
      {
        path: '/user/project/detail/:id',
        component: './src/templates/project-detail.vue'
      }
    ]
  }
}
