<template>
  <v-data-table :headers="headers" :items="Loans">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>All Books</v-toolbar-title>

        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:[`item.user_id`]="{ item }">
      {{ getName(item.user_id) ? getName(item.user_id).name : "nill" }}
    </template>
    <template v-slot:[`item.book_id`]="{ item }">
      {{ getBookName(item.book_id) ? getBookName(item.book_id).name : "nill" }}
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-btn
        @click="Approve(item)"
        class="ml-2 mt-3"
        color="green-darken-1"
        size="x-small"
        variant="flat"
        >Approve
      </v-btn>
      <p></p>
      <v-btn
        @click="Decline(item)"
        class="ml-3 mt-3"
        color="red-darken-1"
        size="x-small"
        variant="flat"
        >Decline</v-btn
      >
      <!-- {{ confirmLoan(item) }} -->
    </template>
  </v-data-table>
</template>
<script>
import AuthService from "../../auth/views/authService";
export default {
  name: "LoansPage",
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("book/getAllBooks");
      v.$store.dispatch("book/getAllLoans");
      v.$store.dispatch("book/getAllUsers");
    });
  },
  data: () => ({
    dialog: false,
    dateDialog: false,
    dialogDelete: false,
    newBook: false,

    headers: [
      {
        title: "Name",
        align: "start",
        sortable: false,
        key: "user_id",
      },
      { title: "book", key: "book_id" },
      { title: "loan_date", key: "loan_date" },
      { title: "Due date", key: "due_date" },
      { title: "Return Date", key: "return_date" },
      { title: "extension_date", key: "extension_date" },
      { title: "sub_category", key: "sub_category" },
      { title: "extended", key: "extended" },
      { title: "penalty_amount", key: "penalty_amount" },
      { title: "penalty_status", key: "penalty_status" },
      { title: "status", key: "status" },

      { title: "Actions", key: "actions", sortable: false },
    ],
    items: [
      { id: true, name: "Admin" },
      { id: false, name: "Normal User" },
    ],
    desserts: [],
    editedIndex: -1,
    Image: null,
    imageUrl: "",
    selectedBook: {},
    ReturnDate: null,
    formData: {
      name: "",
      publisher: "",
      isbn: "",
      category: "",
      sub_category: "",
      description: "",
      pages: "",
      image: null,
      added_by: "",
      status: "",
    },
    defaultItem: {
      name: "",
      password: "",
      email: "",
      is_admin: 0,
    },
    rules: {
      required: [(value) => !!value || "Required."],
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Edit Book" : "New Book";
    },
    Books() {
      return this.$store.getters["book/bookGetters"]("allBooks");
    },
    isAdmin() {
      return JSON.parse(AuthService.user).id == 1 ? true : false;
    },
    Loans() {
      return this.$store.getters["book/bookGetters"]("allLoans");
    },
    Users() {
      return this.$store.getters["book/bookGetters"]("allUsers");
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    getName(val) {
      const filteredObject = this.Users.filter((obj) => obj.id === val)[0];

      return filteredObject;
    },

    getBookName(val) {
      const filteredObject = this.Books.filter((obj) => obj.id === val)[0];
      return filteredObject;
    },

    Approve(val) {
      const data = {
        loan_id: val.id,
      };

      this.$store.dispatch("book/approveLoan", data);
    },
    Decline(val) {
      const data = {
        loan_id: val.id,
      };

      this.$store.dispatch("book/declineLoan", data);
    },
  },
};
</script>

<style scoped>
@import url("../style.css");
</style>
