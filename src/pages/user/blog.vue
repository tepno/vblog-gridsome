<template>
<Layout>
  <div style="min-height: 600px" v-loading="loading">
    <el-card shadow="never" style="margin-bottom: 20px">
      <el-input placeholder="请输入关键字" v-model="searchKey" clearable style="width: 300px"></el-input>
      <el-button @click="search" icon="el-icon-search" style="margin-left: 10px" circle plain></el-button>
      <el-button @click="$share()" style="margin-left: 10px" icon="el-icon-share" type="warning" plain circle></el-button>
      <el-button type="primary" icon="el-icon-edit" round plain style="float: right" @click="goAdd">写博文</el-button>
    </el-card>

    <div v-if="!$page.blogs || $page.blogs.totalCount > 0">
      <template v-for="(item, index) in blogs">
        <el-card shadow="hover" :key="'p' + index" style="margin-bottom: 20px">
          <div slot="header">
            <el-row>
              <el-col :span="16">
                <span>
                  <g-link style="text-decoration: none; cursor: pointer" :to="'/user/blog/detail/' + item.node.id">
                    <i class="el-icon-edit-outline"></i>&nbsp;&nbsp;
                    {{ item.node.title }}
                  </g-link>
                </span>
              </el-col>
              <el-col :span="8">
                <div style="text-align: right">
                  <el-button @click="$share('/user/blog/details/' + item.node.id)" style="padding: 3px 0" type="text" icon="el-icon-share"></el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
            最近更新 {{ item.node.updated_at | date }}
          </div>
          <div style="
                font-size: 1.1rem;
                line-height: 1.5;
                color: #303133;
                padding: 10px 0px 0px 0px;
              ">
            {{ item.node.description }}
          </div>
        </el-card>
      </template>
      <div style="text-align: center">
        <Pager :info="$page.blogs.pageInfo" />
      </div>
    </div>

    <el-card shadow="never" style="
          margin-bottom: 20px;
          padding: 20px 0px 20px 0px;
          text-align: center;
        " v-if="!$page.blogs || $page.blogs.totalCount == 0">
      <font style="font-size: 30px; color: #dddddd">
        <b>还没有博客 (╯°Д°)╯︵ ┻━┻</b>
      </font>
    </el-card>
  </div>
</Layout>
</template>

<page-query>

query ($page: Int) {
  blogs: allStrapiList (perPage: 4, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
      edges {
        node {
          id
          title
          description
          content
          published_at
          created_at
          updated_at
        }
      }
  }
}

</page-query>

<script>
import {
  Pager
} from "gridsome";
export default {
  name: "SocialPage",
  metaInfo: {
    title: "博客列表",
  },
  data() {
    return {
      loading: false,
      searchKey: "",
      blogs: [],
    };
  },
  watch: {
    $page: {
      handler: function (val, oldVal) {
        this.searchKey = "";
        this.list();
      },
      deep: true,
    },
  },
  components: {
    Pager,
  },
  mounted() {
    this.list();
  },
  methods: {
    list() {
      this.blogs = this.$page.blogs.edges;
    },
    search() {
      if (!this.searchKey) {
        this.blogs = this.$page.blogs.edges;
        return;
      }
      const blogs = this.$page.blogs.edges;
      this.blogs = blogs.filter(
        (blog) => blog.node.title.indexOf(this.searchKey) > 0
      );
    },
    goAdd() {
      if (!this.token) {
        this.$message({
          message: "请绑定有效的Token",
          type: "warning",
        });
        return;
      }
    },
  },
};
</script>
