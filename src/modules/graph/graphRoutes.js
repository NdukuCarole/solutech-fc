import crashPage from "../graph/components/crashPage.vue";
import dashboard from "../dashboard/views/dashboard";

const graphRoutes = [
  {
    path: "/crash",
    component: dashboard,
    children: [
  
      {
        path: "/carsh",
        name: "crashPage",
        component: crashPage,
      },
    ],
  },
];

export default graphRoutes;
