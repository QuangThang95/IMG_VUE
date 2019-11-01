import { User } from "@/models/user.model";
import { UserSevices } from "@/services/user.service";
import { BaseService } from "@/shared/utilities";
const userSevices = new UserSevices();
const baseService = new BaseService();
export default {
  namespaced: true,

  state: {
    users: {},
    responseAddUser: {},
    user: {},
    imgStatus: false,
    responseUpdateUser: {},
    responseDeleteUser: {}
  },

  getters: {
    getUsers: (state: any) => {
      return state.users;
    },
    getUser: (state: any) => {
      return state.user;
    },
    getStatus: (state: any) => {
      return state.imgStatus;
    }
  },

  mutations: {
    GET_USER(state: any, payload: any) {
      state.users = { ...payload };
    },
    SET_USER(state: any, payload: any) {
      state.user = Object.assign({}, payload.user);
      state.imgStatus = payload.imgStatus;
    },
    ADD_USER(state: any, payload: any) {
      state.responseAddUser = Object.assign({}, payload);
    },
    GET_USER_BY_CODE(state: any, payload: any) {
      state.user = Object.assign({}, payload);
    },
    UPDATE_USER(state: any, payload: any) {
      state.responseUpdateUser = Object.assign({}, payload);
    },
    DELETE_USER(state: any, payload: any) {
      state.responseDeleteUser = Object.assign({}, payload);
    }
  },

  actions: {
    getUsers(context: any, payload: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          "GET_USER",
          userSevices.getUser(payload)
        );
      });
    },

    addUser(context: any, payload: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          "ADD_USER",
          userSevices.addUser(payload)
        );
      });
    },

    setUser(context: any, payload: any) {
      context.commit("SET_USER", payload);
    },

    getUserById(context: any, payload: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          "GET_USER_BY_CODE",
          userSevices.GetUserByCode(payload)
        );
      });
    },

    updateUser(context: any, payload: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          "UPDATE_USER",
          userSevices.UpdateUser(payload)
        );
      });
    },

    deleteUser(context: any, payload: any) {
      return new Promise((resolve, reject) => {
        baseService.handleService(
          resolve,
          reject,
          context,
          "DELETE_USER",
          userSevices.DeleteUser(payload)
        );
      });
    }
  }
};
