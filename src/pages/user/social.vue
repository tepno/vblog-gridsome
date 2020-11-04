<template>
<Layout>
  <el-card shadow="never" style="min-height: 400px; margin-bottom: 20px; padding: 0px 0px 20px 0px">
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane :label="'粉丝 ' + $page.socials.totalCount" name="socials" style="padding: 5px">
        <div>
          <div v-if="$page.socials.totalCount">
            <el-row style="min-height: 200px">
              <el-col :span="8" v-for="(item, index) in $page.socials.edges" :key="'socials' + index" style="padding: 10px">
                <el-card shadow="hover" style="font-size: 13px; color: #606266; line-height: 20px">
                  <i class="el-icon-star-off"></i>&emsp;

                  <g-link :to="'/user/social/detail/' + item.node.id" style="text-decoration: none; cursor: pointer">{{ item.node.name }}</g-link>
                  <br />
                  <i class="el-icon-message"></i>&emsp;
                  <a :href="item.node.htmlUrl" target="_blank" style="text-decoration: none; cursor: pointer">TA的主页</a>
                  <br />
                  <g-image :src="item.node.avatarUrl" style="width: 100%; border-radius: 5px; margin-top: 5px" />
                </el-card>
              </el-col>
            </el-row>
            <div style="text-align: center; margin-top: 10px">
              <Pager :info="$page.socials.pageInfo" />
            </div>
          </div>
          <div style="
                min-height: 300px;
                margin-bottom: 20px;
                padding: 20px 0px 20px 0px;
                text-align: center;
              " v-else>
            <font style="font-size: 30px; color: #dddddd">
              <b>(￢_￢) 没有一个粉丝</b>
            </font>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="'关注 ' + $page.followings.totalCount" name="followings" style="padding: 5px">
        <div>
          <div v-if="$page.followings.totalCount">
            <el-row style="min-height: 200px">
              <el-col :span="8" v-for="(item, index) in $page.followings.edges" :key="'followings' + index" style="padding: 10px">
                <el-card shadow="hover" style="font-size: 13px; color: #606266; line-height: 20px">
                  <i class="el-icon-star-off"></i>&emsp;
                  <g-link :to="'/user/following/detail/' + item.node.id" style="text-decoration: none; cursor: pointer">{{ item.node.name }}</g-link>
                  <br />
                  <i class="el-icon-message"></i>&emsp;
                  <a :href="item.node.htmlUrl" target="_blank" style="text-decoration: none; cursor: pointer">TA的主页</a>
                  <br />
                  <g-image :src="item.node.avatarUrl" style="width: 100%; border-radius: 5px; margin-top: 5px" />
                </el-card>
              </el-col>
            </el-row>
            <div style="text-align: center; margin-top: 10px">
              <Pager :info="$page.followings.pageInfo" />
            </div>
          </div>
          <div style="
                min-height: 300px;
                margin-bottom: 20px;
                padding: 20px 0px 20px 0px;
                text-align: center;
              " v-else>
            <font style="font-size: 30px; color: #dddddd">
              <b>(￢_￢) 没有一个关注</b>
            </font>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</Layout>
</template>

<page-query>
query ($page: Int) {
  followings: allStrapiFollowing(perPage: 6, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        name
        avatarUrl
        htmlUrl
        published_at
        created_at
        updated_at
      }
    }
  }

  socials: allStrapiSocial(perPage: 6, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        name
        avatarUrl
        htmlUrl
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
    title: "社交圈",
  },
  data() {
    return {
      activeTab: "socials",
    };
  },
  components: {
    Pager,
  },
  methods: {},
};
</script>
