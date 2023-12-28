import dashboard from "../dashboard/views/dashboard";
import mainDashboard from "@/modules/dashboard/components/mainDashboard.vue";
import Auth from "@/modules/auth/middleware/Auth";

const dashboardRoutes = [
  {
    path: "/dashboard",
    component: dashboard,
    children: [
      {
        path: "",
        name: "mainDashboard",
        component: mainDashboard,
        meta: { middleware: [Auth] },
      },
    ],
  },
];

export default dashboardRoutes;
