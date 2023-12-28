import dashboard from "../dashboard/views/dashboard";
import BooksPage from "@/modules/books/components/allBooks.vue";
import loans from "@/modules/books/components/loans.vue";
import Auth from "@/modules/auth/middleware/Auth";

const bookRoutes = [
  {
    path: "/dashboard",
    component: dashboard,
    children: [
      {
        path: "books",
        name: "BooksPage",
        component: BooksPage,
        meta: { middleware: [Auth] },
      },
      {
        path: "loans",
        name: "loan",
        component: loans,
        meta: { middleware: [Auth] },
      },
    ],
  },
];

export default bookRoutes;
