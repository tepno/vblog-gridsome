<template>
<Layout>
  <div style="min-height: 600px" v-loading="loading">
    <el-card shadow="never" style="min-height: 400px">
      <div slot="header">
        <el-row>
          <el-col :span="12">
            <span>{{ $page.project.name }}</span>
          </el-col>
          <el-col :span="12">
            <div style="text-align: right">
              <el-button @click="$share()" style="padding: 3px 0" type="text" icon="el-icon-share">分享</el-button>
              <el-button @click="goGithub($page.project.url)" style="padding: 3px 0" type="text" icon="el-icon-back">前往GitHub</el-button>
              <el-button @click="more" style="padding: 3px 0" type="text" icon="el-icon-more-outline">更多项目</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
        发布 {{ $page.project.created_at | date }} <br />
        更新 {{ $page.project.updated_at | date }}
      </div>
      <div style="
            font-size: 1.1rem;
            line-height: 1.5;
            color: #303133;
            padding: 20px 0px 0px 0px;
          ">
        {{ $page.project.description }}
      </div>
      <div style="
            font-size: 1.1rem;
            color: #303133;
            padding: 15px 0px 15px 0px;
            border-bottom: 1px solid #e4e7ed;
          ">
        <el-row>
          <el-col :span="16" style="padding-top: 5px">
            <el-tooltip effect="dark" :content="'star ' + $page.project.stargazersCount" placement="bottom">
              <i class="el-icon-star-off" style="margin: 0px 5px 0px 0px"></i>
            </el-tooltip>
            {{ $page.project.stargazersCount }}
            <el-tooltip effect="dark" :content="'watch ' + $page.project.watchersCount" placement="bottom">
              <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
            </el-tooltip>
            {{ $page.project.watchersCount }}
            <el-tooltip effect="dark" :content="'fork ' + $page.project.forksCount" placement="bottom">
              <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
            </el-tooltip>
            {{ $page.project.forksCount }}
          </el-col>
          <el-col :span="8" style="text-align: right">
            <el-tag size="small" type="danger" v-if="$page.project.license">{{
                $page.project.license
              }}</el-tag>
            <el-tag size="small" type="success" v-if="$page.project.language">{{ $page.project.language }}</el-tag>
          </el-col>
        </el-row>
      </div>
      <div v-html="$page.project.content" v-if="$page.project.content" class="markdown-body" style="padding-top: 20px"></div>
      <div v-if="!$page.project.content" style="padding: 20px 0px 20px 0px; text-align: center">
        <font style="font-size: 30px; color: #dddddd">
          <b>还没有介绍 (╯°Д°)╯︵ ┻━┻</b>
        </font>
      </div>
    </el-card>
  </div>
</Layout>
</template>

<page-query>
query ($id: ID!) {
  project: strapiProject (id: $id) {
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

</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.project.name,
    };
  },
  data() {
    return {
      project: {
        name: "",
      },
      loading: false,
    };
  },
  mounted() {},
  methods: {
    goGithub(url) {
      window.open(url);
    },
    more() {
      this.$router.push("/user/project");
    },
  },
};
</script>
