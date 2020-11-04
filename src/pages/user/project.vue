<template>
<Layout>
  <div style="min-height: 600px" v-loading="loading">
    <el-card shadow="never" style="margin-bottom: 20px">
      <el-input placeholder="请输入关键字" v-model="searchKey" clearable style="width: 300px"></el-input>
      <el-button @click="search" icon="el-icon-search" style="margin-left: 10px" circle plain></el-button>
      <el-button @click="$share()" icon="el-icon-share" type="warning" style="margin-left: 10px" plain circle></el-button>
    </el-card>

    <div v-if="$page.projects && $page.projects.totalCount > 0">
      <template v-for="(item, index) in projects">
        <el-card shadow="hover" :key="'pro' + index" style="margin-bottom: 20px" v-if="!item.node.hide">
          <div slot="header">
            <el-row>
              <el-col :span="16">
                <span>
                  <g-link style="text-decoration: none; cursor: pointer" :to="'/user/project/detail/' + item.node.id">
                    <i class="el-icon-service"></i>&nbsp;&nbsp;
                    {{ item.node.name }}
                  </g-link>
                </span>
              </el-col>
              <el-col :span="8">
                <div style="text-align: right">
                  <el-button @click="goGithub(item.node.url)" style="padding: 3px 0" type="text" icon="el-icon-back">前往GitHub</el-button>
                  <el-button @click="$share('/user/project/details/' + item.node.id)" style="padding: 3px 0" type="text" icon="el-icon-share"></el-button>
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
          <div style="
                font-size: 1.1rem;
                color: #303133;
                padding: 10px 0px 0px 0px;
              ">
            <el-row>
              <el-col :span="16" style="padding-top: 5px">
                <el-tooltip effect="dark" :content="'star ' + item.node.stargazersCount" placement="bottom">
                  <i class="el-icon-star-off" style="margin: 0px 5px 0px 0px"></i>
                </el-tooltip>
                {{ item.node.stargazersCount }}
                <el-tooltip effect="dark" :content="'watch ' + item.node.watchersCount" placement="bottom">
                  <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
                </el-tooltip>
                {{ item.node.watchersCount }}
                <el-tooltip effect="dark" :content="'fork ' + item.node.forksCount" placement="bottom">
                  <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
                </el-tooltip>
                {{ item.node.forksCount }}
              </el-col>
              <el-col :span="8" style="text-align: right">
                <el-tag size="small" type="danger" v-if="item.node.license">{{
                    item.node.license
                  }}</el-tag>
                <el-tag size="small" type="success" v-if="item.node.language">{{ item.node.language }}</el-tag>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </template>
      <div style="text-align: center">
        <Pager :info="$page.projects.pageInfo" />
      </div>
    </div>

    <el-card shadow="never" style="
          margin-bottom: 20px;
          padding: 20px 0px 20px 0px;
          text-align: center;
        " v-if="!$page.projects || $page.projects.totalCount == 0">
      <font style="font-size: 30px; color: #dddddd">
        <b>还没有开源项目 (╯°Д°)╯︵ ┻━┻</b>
      </font>
    </el-card>
  </div>
</Layout>
</template>

<page-query>
query ($page: Int) {
  projects: allStrapiProject (perPage: 5, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
      edges {
        node {
          id
          name
          htmlUrl
          watchersCount
          forksCount
          license
          language
          stargazersCount
          description
          content
          url
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
  name: "projectPage",
  metaInfo() {
    return {
      title: "开源项目",
    };
  },
  components: {
    Pager,
  },
  data() {
    return {
      loading: false,
      searchKey: "",
      projects: [],
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
  mounted() {
    this.list();
  },
  methods: {
    list() {
      this.projects = this.$page.projects.edges;
    },
    search() {
      if (!this.searchKey) {
        this.projects = this.$page.projects.edges;
        return;
      }
      const projects = this.$page.projects.edges;
      this.projects = projects.filter(
        (project) => project.node.name.indexOf(this.searchKey) > 0
      );
    },
    goDetails(name) {
      this.$router.push("/user/project/details/" + name);
    },
    goGithub(url) {
      window.open(url);
    },
  },
};
</script>
