import AuthLayout from "../auth/views/authLayout";
import LoginPage from "../auth/components/login";
// import table from '../auth/components/table';
// import RegistrationPage from '@/views/RegistrationPage.vue';

const authRoutes = [
  {
    path: "/",
    component: AuthLayout,
    children: [
      {
        path: "",
        name: "Login",
        component: LoginPage,
      },
    ],
  },
];

export default authRoutes;
