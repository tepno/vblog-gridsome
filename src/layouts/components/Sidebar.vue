<template>
<div>
  <el-card shadow="never">
    <el-menu :default-active="active" @select="onSelect">
      <el-menu-item v-for="item in constantRouterMap" :key="item.path" :index="item.path">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </el-menu>
  </el-card>

  <el-card shadow="never" style="margin-top: 20px; text-align: center">
    <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
      <el-tag type="danger" size="small">&nbsp;</el-tag>&nbsp;&nbsp;
      Token未绑定&nbsp;&nbsp;
      <el-button type="text" @click="openTokenDialog">绑定</el-button>
    </div>
    <div style="margin-top: 10px; text-align: left">
      <el-alert title="Token获取" type="info" description="在 github-> settings-> developerSettings-> personalAccessTokens 勾选gist权限,获取Token. 详情参考README.md" :closable="false">
      </el-alert>
    </div>
  </el-card>
  <token-dialog ref="tokenDialog"></token-dialog>
</div>
</template>

<script>
import TokenDialog from "@/common/TokenDialog";
export default {
  components: {
    TokenDialog,
  },
  data() {
    return {
      constantRouterMap: [{
          path: "/user/new",
          meta: {
            type: "user",
            icon: "el-icon-star-off",
            title: "最新动态",
          },
        },
        {
          path: "/user/social",
          meta: {
            type: "user",
            icon: "el-icon-mobile-phone",
            title: "社交圈",
          },
        },
        {
          path: "/user/blog",
          redirect: "/user/blog/main",
          meta: {
            type: "user",
            icon: "el-icon-edit-outline",
            title: "博客列表",
          },
        },
        {
          path: "/user/project",
          redirect: "/user/project/main",
          meta: {
            type: "user",
            icon: "el-icon-service",
            title: "开源项目",
          },
        },
        {
          path: "/user/helper",
          redirect: "/user/helper/main",
          meta: {
            type: "user",
            icon: "el-icon-printer",
            title: "使用帮助",
            mini: true,
          },
        },
        {
          path: "/user/readme",
          redirect: "/user/readme/main",
          meta: {
            type: "user",
            icon: "el-icon-document",
            title: "README.md",
          },
        },
      ],
      active: "/user/new",
      parentUrl: "",
      menuList: [],
    };
  },
  mounted() {
    let arr = this.$route.path.split("/");
    this.active = "/" + arr[1] + "/" + arr[2];
  },
  methods: {
    onSelect(index) {
      this.$router.push(index);
    },
    openTokenDialog() {
      this.$refs.tokenDialog.open(() => {});
    },
    cancellation() {
      this.$store.dispatch("Cancellation");
    },
  },
};
</script>
