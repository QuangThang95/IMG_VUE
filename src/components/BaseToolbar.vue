<template>
  <b-container fluid>
    <div id="toolbar">
      <b-navbar toggleable="xlg" type="dark" :style="{ backgroundColor: headerColor }" class="p-0">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-brand class="brand font-20 col-md-12 col-lg-2">
            <div class="center">
              <div class="brandlogo">
                SHIGEN Cloud
                <span>ロゴ</span>
              </div>
            </div>
          </b-navbar-brand>
          <b-navbar-nav class="col-md-6 navbar-nav-hover">
            <template v-for="item in getParent(0)" class="center">
              <b-nav-item
                v-bind:key="item.id"
                v-if="!checkParent(item.id)"
                @click="navigate(item.link)"
              >{{item.title}}</b-nav-item>
              <b-nav-item-dropdown
                class="dropdown"
                v-bind:key="item.id"
                v-if="checkParent(item.id)"
              >
                <template class="dropbtn" slot="button-content">{{ item.title }}</template>
                <div
                  class="dropdown-content"
                  v-for="itemp in getParent(item.id)"
                  v-bind:key="itemp.id"
                >
                  <hr v-if="itemp.isHr" />
                  <b-dropdown-item>
                    <div @click="navigate(itemp.link)">
                      {{ itemp.title }}
                      <span v-if="itemp.titleInfo">({{ itemp.titleInfo }})</span>
                    </div>
                  </b-dropdown-item>
                </div>
              </b-nav-item-dropdown>
            </template>
          </b-navbar-nav>
          <div v-if="checkNavBar()" class="col-lg-4 cus-toggle">
            <b-navbar-brand class="cus-navbar-brand">
              <div class="rightmenu custom-nav">
                <div class="center">
                  <div
                    class="menu-item-left login-customer-name"
                    v-b-tooltip.top.hover
                    :title="customer.customerName"
                  >{{ customer.customerName }}</div>
                </div>
                <div class="menu-item-center">
                  {{ loginParentName }}
                  <br />
                  {{ loginName }}
                </div>
                <div class="menu-item-right">
                  <b-button @click="logout()" variant="link" size="sm">ログアウト</b-button>
                  <br />
                  {{ today }}
                </div>
              </div>
            </b-navbar-brand>
          </div>

          <div right v-if="!checkNavBar()" class="col-lg-4 content-dropdown">
            <b-nav-item-dropdown class="custom-dropdown" right>
              <template slot="button-content">
                <p
                  class="login-customer-name"
                  v-b-tooltip.top.hover
                  :title="customer.customerName"
                >{{ customer.customerName }}</p>
              </template>
              <b-dropdown-item>{{ loginParentName }}</b-dropdown-item>
              <b-dropdown-item @click="logout()">ログアウト</b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
        </b-collapse>
      </b-navbar>
    </div>
  </b-container>
</template>

<script lang='ts'>
import { Vue } from "vue-property-decorator";
import { MenuData } from "@/constants/Menu";
import { Menu } from "@/models/menu.model";
import moment from "moment";
import { mapGetters } from "vuex";
import { navigation, current } from "@/shared/utilities";
import { MasterProperty } from "@/shared/MasterProperty";

export default Vue.extend({
  data() {
    return {
      selected: "",
      today: moment(String(new Date())).format("YYYY/MM/DD"),
      custommer: this.$store.state.menuModule.customer,
      currentUser: current.user(),
      currentPermission: current.permission(),
      userKana: "",
      items: MenuData,
      loginName: "",
      loginParentName: "",
      window: {
        width: 0,
        height: 0
      },
    };
  },

  created() {
    this.$store.dispatch("menuModule/getMenus");
    this.loginName = this.currentUser.userName || "";
    if (current.role() === "1") {
      this.loginParentName = this.currentUser.agent.agentName || "";
    } else {
      this.loginParentName = this.currentUser.customer.customerName || "";
    }
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    getParent(parentId: any) {
      return this.menuData.filter(
        (x: Menu) =>
          x.parentId === parentId &&
          x.permission.includes(this.currentPermission)
      );
    },
    checkParent(parentId: any) {
      return this.menuData.filter((x: Menu) => {
        return (
          x.parentId === parentId &&
          x.permission.includes(this.currentPermission)
        );
      }).length > 0
        ? true
        : false;
    },
    navigate(link: any) {
      link = this.formatLinkNotification(link);
      this.$router.push(link);
    },
    logout() {
      this.$store.dispatch("authModule/logout").finally(() => {
        navigation.login();
      });
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    checkNavBar() {
      if (this.window.width > 1024 && this.window.width < 1366) {
        return false;
      }
      return true;
    },
    formatLinkNotification(link: any) {
      switch (link) {
        case MasterProperty.FSHI0012.SSHI0035Request.Path:
          return MasterProperty.FSHI0012.SSHI0035Request.PathForMenu;
          break;
        case MasterProperty.FSHI0012.SSHI0035Important.Path:
          return MasterProperty.FSHI0012.SSHI0035Important.PathForMenu;
          break;
        case MasterProperty.FSHI0012.SSHI0035Report.Path:
          return MasterProperty.FSHI0012.SSHI0035Report.PathForMenu;
          break;
        case MasterProperty.FSHI0012.SSHI0035Other.Path:
          return MasterProperty.FSHI0012.SSHI0035Other.PathForMenu;
          break;
        case MasterProperty.FSHI0012.SSHI0035Error.Path:
          return MasterProperty.FSHI0012.SSHI0035Error.PathForMenu;
          break;
        default:
          return link;
          break;
      }
    }
  },
  computed: {
    ...mapGetters({
      menuData: "menuModule/getMenus",
      customer: "menuModule/getCustomer",
      headerColor: "menuModule/getHeaderColor"
    })
  }
});
</script>
<style>
@media (max-width: 1025px) {
  .brand,
  .cus-navbar-brand {
    max-width: 100% !important;
    width: 100%;
  }
  div.cus-toggle {
    padding: 0px !important;
    display: table;
    position: inherit !important;
    max-width: 100%;
  }
}
.content-dropdown {
  height: 100%;
  position: absolute !important;
  padding: 0px !important;
  right: 0;
  top: 0;
}
.custom-dropdown {
  background: #ffe0f5;
  position: absolute !important;
  height: 100%;
  right: 0;
}
.custom-dropdown .nav-link {
  color: black;
  display: flex;
  align-items: center;
  height: 100%;
}
.custom-nav {
  background: #ffe0f5;
  height: 100%;
}
.custom-nav .menu-item-center {
  padding-bottom: 5px;
}
.cus-navbar-brand {
  padding: 0 !important;
  margin: 0 !important;
  float: right;
  height: 100%;
}
.cus-toggle {
  position: absolute !important;
  padding: 0px !important;
  right: 0;
  height: 100%;
  top: 0;
}

.navbar-nav-hover li:hover > ul.dropdown-menu {
  display:block;
}

.navbar-nav-hover li > ul.dropdown-menu {
  margin-top: -3px;
}

.content-dropdown li:hover > ul.dropdown-menu {
  display:block;
}
</style>
