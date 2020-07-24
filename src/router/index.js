import Vue from 'vue'
import Router from 'vue-router'
import mainscreen from "../components/mainscreen";
import register from "../components/register";
import users from "../components/users";
import passwordFind from "../components/passwordFind";
import comments from "../components/comments";
import admins from "../components/admins";
import blogsRev from "../components/blogsRev";
import cmtRev from "../components/cmtRev";
import oneBlogRev from "../components/oneBlogRev";
import oneCmtRev from "../components/oneCmtRev";
import login from "../components/login";
import userInfo from "../components/userInfo";
import editblogs from "../components/editblogs";
import myblogs from "../components/myblogs";
import viewblogs from "../components/viewblogs";
import blogsforum from "../components/blogsforum";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainscreen',
      component: mainscreen
    },
    {
      path: '/blogsforum',
      name: 'blogsforum',
      component: blogsforum
    },
    {
      path: '/users',
      name: 'users',
      component:users,
      redirect: '/users/userInfo',
      children: [
        {
          path:'/users/editblogs',
          component:editblogs,
        },
        {
          path:'/users/userInfo',
          component:userInfo,
        },
        {
          path:'/users/myblogs',
          component:myblogs,
        },
        {
          path:'/users/viewblogs',
          component:viewblogs,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component:login
    },
    {
      path: '/register',
      name: 'register',
      component:register
    },
    {
      path:'/passwordFind',
      name:'passwordFind',
      component: passwordFind
    },
    {
      path:'/comments',
      name:'comments',
      component: comments
    },
    {
      path:'/admins',
      name:'admins',
      component: admins,
      children:[
        {
          path:'/admins/blogsRev',
          component:blogsRev,
        },
        {
          path:'/admins/oneBlogRev',
          component:oneBlogRev,
        },
        {
          path:'/admins/oneCmtRev',
          component:oneCmtRev,
        },
        {
          path:'/admins/cmtRev',
          component: cmtRev,
        }
      ],
    }
  ]
})
