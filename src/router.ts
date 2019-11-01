import Vue from 'vue';
import Router from 'vue-router';
import { MasterProperty } from './shared/MasterProperty';
import auth from './shared/Auth';

Vue.use(Router);

// Containers
const FullContainer = () => import('./containers/Full.vue');
const LoginContainer = () => import('./containers/LoginCont.vue');
const SSHI0001 = () => import('./views/customer/customer-master/customer-master.vue');
const SSHI0002 = () => import('./views/customer/customer-details/customer-detail-master.vue');
const SSHI0004 = () => import('./views/customer-branch/customer-branch-master/customer-branch-master.vue');
const SSHI0005 = () => import('./views/customer-branch/customer-branch-details/customer-branch-detail-master.vue');
const SSHI0007 = () => import('./views/customer-group/customer-group-master/customer-group-master.vue');
const SSHI0008 = () => import('./views/customer-group/customer-group-add-update.vue');
const SSHI0010 = () =>
  import('./views/supplier-transporter/supplier-transporter-master/supplier-transporter-master.vue');
const SSHI0011 = () =>
  import('./views/supplier-transporter/supplier-transporter-details/supplier-transporter-detail-master.vue');
const SSHI0012 = () =>
  import('./views/supplier-transporter/supplier-transporter-details/supplier-transporter-detail-master.vue');
const SSHI0013 = () => import('./views/supplier-handle/supplier-handle-master/supplier-handle-master.vue');
const SSHI0014 = () => import('./views/supplier-handle/supplier-handle-form-detail-master.vue');
const SSHI0015 = () => import('./views/supplier-handle/supplier-handle-form-detail-master.vue');
const SSHI0016 = () => import('./views/factory/factory-master/factory-master.vue');
const SSHI0017 = () => import('./views/factory/factory-details/factory-details-master.vue');
const SSHI0026 = () => import('./views/contract/contract-main/contract-main.vue');
const SSHI0027 = () => import('./views/contract/contract-details/contract-detail-master.vue');
const SSHI0028 = () => import('./views/contract/contract-details/contract-detail-master.vue');
const SSHI0029 = () => import('./views/contract/contract-part/contract-part-master.vue');
const SSHI0019 = () => import('./views/user/user-master/user-master.vue');
const SSHI0020 = () => import('./views/user/user-details/user-detail-master.vue');
const SSHI0021 = () => import('./views/user/user-details/user-detail-master.vue');
const SSHI0022 = () => import('./views/general/general-master/general-master.vue');
const SSHI0023 = () => import('./views/general/general-details/general-details-master.vue');
const SSHI0025 = () => import('./views/customer-selection/customer-selection-master.vue');
const SSHI0031 = () => import('./views/manifest/manifest-master.vue');
const SSHI0032 = () => import('./views/manifest-add/manifest-master.vue');
const SSHI0034 = () => import('./views/manifest-add/emissions-detail/emisstions-master.vue');
const SSHI0035Request = () => import('./views/notification/request-approval/request-approval-master.vue');
const SSHI0035Important = () => import('./views/notification/important/important-master.vue');
const SSHI0035Error = () => import('./views/notification/error/error-master.vue');
const SSHI0035Report = () => import('./views/notification/report/report-master.vue');
const SSHI0035Other = () => import('./views/notification/others/others-master.vue');
const SSHI0036 = () => import('./views/report/report-master/report-master.vue');
const SSHI0037 = () => import('./views/login/login-master.vue');
const SSHI0038 = () => import('./views/home/home-master.vue');

const FSHI0011Emisions = () => import('./views/manifest-add/emissions-list/emissions-list.vue');
const Error403 = () => import('./components/error/Base403Error.vue');
const Error404 = () => import('./components/error/Base404Error.vue');

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: MasterProperty.FSHI0015.SSHI0038.Path,
      name: MasterProperty.FSHI0015.SSHI0038.Name,
      component: FullContainer,
      beforeEnter: auth.ifAuthenticated,
      children: [
        {
          path: MasterProperty.FSHI0001.SSHI0001.Path,
          name: MasterProperty.FSHI0001.SSHI0001.Name,
          component: SSHI0001,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0001.SSHI0001.Role,
            permission: MasterProperty.FSHI0001.SSHI0001.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0001.SSHI0002.Path,
          name: MasterProperty.FSHI0001.SSHI0002.Name,
          component: SSHI0002,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0001.SSHI0002.Role,
            permission: MasterProperty.FSHI0001.SSHI0002.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0001.SSHI0003.Path,
          name: MasterProperty.FSHI0001.SSHI0003.Name,
          component: SSHI0002,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0001.SSHI0003.Role,
            permission: MasterProperty.FSHI0001.SSHI0003.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0001.SSHI0003Detail.Path,
          name: MasterProperty.FSHI0001.SSHI0003Detail.Name,
          component: SSHI0002,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0001.SSHI0003Detail.Role,
            permission: MasterProperty.FSHI0001.SSHI0003Detail.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0002.SSHI0004.Path,
          name: MasterProperty.FSHI0002.SSHI0004.Name,
          component: SSHI0004,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0002.SSHI0004.Role,
            permission: MasterProperty.FSHI0002.SSHI0004.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0002.SSHI0005.Path,
          name: MasterProperty.FSHI0002.SSHI0005.Name,
          component: SSHI0005,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0002.SSHI0005.Role,
            permission: MasterProperty.FSHI0002.SSHI0005.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0002.SSHI0006.Path,
          name: MasterProperty.FSHI0002.SSHI0006.Name,
          component: SSHI0005,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0002.SSHI0006.Role,
            permission: MasterProperty.FSHI0002.SSHI0006.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0003.SSHI0007.Path,
          name: MasterProperty.FSHI0003.SSHI0007.Name,
          component: SSHI0007,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0003.SSHI0007.Role,
            permission: MasterProperty.FSHI0003.SSHI0007.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0003.SSHI0008.Path,
          name: MasterProperty.FSHI0003.SSHI0008.Name,
          component: SSHI0008,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0003.SSHI0008.Role,
            permission: MasterProperty.FSHI0003.SSHI0008.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0003.SSHI0009.Path,
          name: MasterProperty.FSHI0003.SSHI0009.Name,
          component: SSHI0008,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0003.SSHI0009.Role,
            permission: MasterProperty.FSHI0003.SSHI0009.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0004.SSHI0010.Path,
          name: MasterProperty.FSHI0004.SSHI0010.Name,
          component: SSHI0010,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0004.SSHI0010.Role,
            permission: MasterProperty.FSHI0004.SSHI0010.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0004.SSHI0011.Path,
          name: MasterProperty.FSHI0004.SSHI0011.Name,
          component: SSHI0011,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0004.SSHI0011.Role,
            permission: MasterProperty.FSHI0004.SSHI0011.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0004.SSHI0012.Path,
          name: MasterProperty.FSHI0004.SSHI0012.Name,
          component: SSHI0012,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0004.SSHI0012.Role,
            permission: MasterProperty.FSHI0004.SSHI0012.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0004.SSHI0012Detail.Path,
          name: MasterProperty.FSHI0004.SSHI0012Detail.Name,
          component: SSHI0012,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0004.SSHI0012Detail.Role,
            permission: MasterProperty.FSHI0004.SSHI0012Detail.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0005.SSHI0013.Path,
          name: MasterProperty.FSHI0005.SSHI0013.Name,
          component: SSHI0013,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0005.SSHI0013.Role,
            permission: MasterProperty.FSHI0005.SSHI0013.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0005.SSHI0014.Path,
          name: MasterProperty.FSHI0005.SSHI0014.Name,
          component: SSHI0014,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0005.SSHI0014.Role,
            permission: MasterProperty.FSHI0005.SSHI0014.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0005.SSHI0015.Path,
          name: MasterProperty.FSHI0005.SSHI0015.Name,
          component: SSHI0015,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0005.SSHI0015.Role,
            permission: MasterProperty.FSHI0005.SSHI0015.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0006.SSHI0016.Path,
          name: MasterProperty.FSHI0006.SSHI0016.Name,
          component: SSHI0016,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0006.SSHI0016.Role,
            permission: MasterProperty.FSHI0006.SSHI0016.Permission,
            requiresAuth: true,
          },
        },

        {
          path: MasterProperty.FSHI0007.SSHI0019.Path,
          name: MasterProperty.FSHI0007.SSHI0019.Name,
          component: SSHI0019,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0007.SSHI0019.Role,
            permission: MasterProperty.FSHI0007.SSHI0019.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0007.SSHI0020.Path,
          name: MasterProperty.FSHI0007.SSHI0020.Name,
          component: SSHI0020,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0007.SSHI0020.Role,
            permission: MasterProperty.FSHI0007.SSHI0020.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0007.SSHI0021.Path,
          name: MasterProperty.FSHI0007.SSHI0021.Name,
          component: SSHI0021,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0007.SSHI0021.Role,
            permission: MasterProperty.FSHI0007.SSHI0021.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0008.SSHI0022.Path,
          name: MasterProperty.FSHI0008.SSHI0022.Name,
          component: SSHI0022,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0008.SSHI0022.Role,
            permission: MasterProperty.FSHI0008.SSHI0022.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0008.SSHI0023.Path,
          name: MasterProperty.FSHI0008.SSHI0023.Name,
          component: SSHI0023,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0008.SSHI0023.Role,
            permission: MasterProperty.FSHI0008.SSHI0023.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0008.SSHI0024.Path,
          name: MasterProperty.FSHI0008.SSHI0024.Name,
          component: SSHI0023,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0008.SSHI0024.Role,
            permission: MasterProperty.FSHI0008.SSHI0024.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0009.SSHI0025.Path,
          name: MasterProperty.FSHI0009.SSHI0025.Name,
          component: SSHI0025,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0009.SSHI0025.Role,
            permission: MasterProperty.FSHI0009.SSHI0025.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0014.SSHI0036.Path,
          name: MasterProperty.FSHI0014.SSHI0036.Name,
          component: SSHI0036,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0014.SSHI0036.Role,
            permission: MasterProperty.FSHI0014.SSHI0036.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0015.SSHI0038.Path,
          name: MasterProperty.FSHI0015.SSHI0038.Name,
          component: SSHI0038,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0015.SSHI0038.Role,
            permission: MasterProperty.FSHI0015.SSHI0038.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0011.SSHI0031.Path,
          name: MasterProperty.FSHI0011.SSHI0031.Name,
          component: SSHI0031,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0011.SSHI0031.Role,
            permission: MasterProperty.FSHI0011.SSHI0031.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0011.SSHI0032.Path,
          name: MasterProperty.FSHI0011.SSHI0032.Name,
          component: SSHI0032,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0011.SSHI0032.Role,
            permission: MasterProperty.FSHI0011.SSHI0032.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0011.SSHI0033.Path,
          name: MasterProperty.FSHI0011.SSHI0033.Name,
          component: SSHI0032,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0011.SSHI0033.Role,
            permission: MasterProperty.FSHI0011.SSHI0033.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0011.SSHI0034.Path,
          name: MasterProperty.FSHI0011.SSHI0034.Name,
          component: SSHI0034,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0011.SSHI0034.Role,
            permission: MasterProperty.FSHI0011.SSHI0034.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0006.SSHI0017.Path,
          name: MasterProperty.FSHI0006.SSHI0017.Name,
          component: SSHI0017,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0006.SSHI0017.Role,
            permission: MasterProperty.FSHI0006.SSHI0017.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0006.SSHI0018.Path,
          name: MasterProperty.FSHI0006.SSHI0018.Name,
          component: SSHI0017,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0006.SSHI0018.Role,
            permission: MasterProperty.FSHI0006.SSHI0018.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0010.SSHI0026.Path,
          name: MasterProperty.FSHI0010.SSHI0026.Name,
          component: SSHI0026,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0010.SSHI0026.Role,
            permission: MasterProperty.FSHI0010.SSHI0026.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0010.SSHI0027.Path,
          name: MasterProperty.FSHI0010.SSHI0027.Name,
          component: SSHI0027,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0010.SSHI0027.Role,
            permission: MasterProperty.FSHI0010.SSHI0027.Permission,
            requiresAuth: true,
          }
        },
        {
          path: MasterProperty.FSHI0010.SSHI0028.Path,
          name: MasterProperty.FSHI0010.SSHI0028.Name,
          component: SSHI0028,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0010.SSHI0028.Role,
            permission: MasterProperty.FSHI0010.SSHI0028.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0010.SSHI0028Detail.Path,
          name: MasterProperty.FSHI0010.SSHI0028Detail.Name,
          component: SSHI0028,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0010.SSHI0028Detail.Role,
            permission: MasterProperty.FSHI0010.SSHI0028Detail.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0010.SSHI0029Add.Path,
          name: MasterProperty.FSHI0010.SSHI0029Add.Name,
          component: SSHI0029,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0010.SSHI0029Add.Role,
            permission: MasterProperty.FSHI0010.SSHI0029Add.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0010.SSHI0029Update.Path,
          name: MasterProperty.FSHI0010.SSHI0029Update.Name,
          component: SSHI0029,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0010.SSHI0029Update.Role,
            permission: MasterProperty.FSHI0010.SSHI0029Update.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0010.SSHI0029Detail.Path,
          name: MasterProperty.FSHI0010.SSHI0029Detail.Name,
          component: SSHI0029,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0010.SSHI0029Detail.Role,
            permission: MasterProperty.FSHI0010.SSHI0029Detail.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0012.SSHI0035Request.Path,
          name: MasterProperty.FSHI0012.SSHI0035Request.Name,
          component: SSHI0035Request,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0012.SSHI0035Request.Role,
            permission: MasterProperty.FSHI0012.SSHI0035Request.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0012.SSHI0035Important.Path,
          name: MasterProperty.FSHI0012.SSHI0035Important.Name,
          component: SSHI0035Important,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0012.SSHI0035Important.Role,
            permission: MasterProperty.FSHI0012.SSHI0035Important.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0012.SSHI0035Error.Path,
          name: MasterProperty.FSHI0012.SSHI0035Error.Name,
          component: SSHI0035Error,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0012.SSHI0035Error.Role,
            permission: MasterProperty.FSHI0012.SSHI0035Error.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0012.SSHI0035Report.Path,
          name: MasterProperty.FSHI0012.SSHI0035Report.Name,
          component: SSHI0035Report,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0012.SSHI0035Report.Role,
            permission: MasterProperty.FSHI0012.SSHI0035Report.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0012.SSHI0035Other.Path,
          name: MasterProperty.FSHI0012.SSHI0035Other.Name,
          component: SSHI0035Other,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0012.SSHI0035Other.Role,
            permission: MasterProperty.FSHI0012.SSHI0035Other.Permission,
            requiresAuth: true,
          },
        },
        {
          path: MasterProperty.FSHI0011.SSHI0031Change.Path,
          name: MasterProperty.FSHI0011.SSHI0031Change.Name,
          component: FSHI0011Emisions,
          beforeEnter: auth.requireAuth,
          meta: {
            role: MasterProperty.FSHI0011.SSHI0031Change.Role,
            permission: MasterProperty.FSHI0011.SSHI0031Change.Permission,
            requiresAuth: true,
          },
        }
      ],
    },
    {
      path: '/src/static/config.json',
      name: 'static',
      beforeEnter: auth.ifNotAuthenticated,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: MasterProperty.FSHI0015.SSHI0037.Path,
      redirect: MasterProperty.FSHI0015.SSHI0037.Path,
      name: MasterProperty.FSHI0015.SSHI0037.Path,
      component: LoginContainer,
      beforeEnter: auth.ifNotAuthenticated,
      children: [
        {
          path: MasterProperty.FSHI0015.SSHI0037.Path,
          name: MasterProperty.FSHI0015.SSHI0037.Name,
          component: SSHI0037,
          meta: {
            title: MasterProperty.FSHI0015.SSHI0037.Title,
            requiresAuth: false,
          },
        },
      ],
    },
    {
      path: MasterProperty.ERROR.ERROR403.Path,
      name: MasterProperty.ERROR.ERROR403.Name,
      component: Error403,
    },
    {
      path: MasterProperty.ERROR.ERROR404.Path,
      name: MasterProperty.ERROR.ERROR404.Name,
      component: Error404,
    },
  ],
});

const DEFAULT_TITLE = 'IMG';
router.afterEach((to, from) => {
  document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;
