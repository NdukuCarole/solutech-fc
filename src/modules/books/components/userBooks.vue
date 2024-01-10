<template>
  <v-data-table :headers="headers" :items="filteredBooks">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Your Borrowed Books</v-toolbar-title>

        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon size="small" class="ml-4" @click="editItem(item)" v-if="isAdmin">
        mdi-pencil
      </v-icon>
      <v-icon v-if="isAdmin" size="small" @click="deleteItem(item)">
        mdi-delete </v-icon
      ><br />
      <v-btn
        @click="BorrowBook(item)"
        class="ml-2 mt-3"
        color="blue-darken-1"
        size="x-small"
        variant="flat"
        v-if="item.status == 'Available'"
        >Borrow</v-btn
      >
      <p></p>
      <v-btn
        @click="Return(item)"
        class="ml-3 mt-3"
        color="green-darken-1"
        size="x-small"
        variant="flat"
        v-if="
          item.status == 'approved' && checkifExistsOnLoans(item) && !isAdmin
        "
        >Return</v-btn
      >

      <v-btn
        @click="Recieve(item)"
        class="ml-3 mt-3"
        color="green-darken-1"
        size="x-small"
        variant="flat"
        v-if="item.status == 'approved' && isAdmin"
        >Recieve</v-btn
      >

      <v-btn
        @click="Extend(item)"
        class="ml-3 mt-3"
        color="green-darken-1"
        size="x-small"
        variant="flat"
        v-if="item.status == 'approved' && checkDueDate(item)"
        >Extend</v-btn
      >
      <!-- {{ confirmLoan(item) }} -->
    </template>
    <template v-slot:[`item.image`]="{ item }">
      <v-img
        :src="item.image_url"
        height="200"
        contain
        class="d-flex flex-row justify-center mt-n2"
      />
    </template>
  </v-data-table>
  <v-dialog v-model="dateDialog" width="800px">
    <v-card>
      <v-card-title>
        This book is due on this date: {{ getDueDate() }}
      </v-card-title>
      <v-card-actions>
        <v-btn
          @click="dateDialog = false"
          class="ml-2 mt-3"
          color="red-darken-1"
          variant="flat"
          >Close</v-btn
        >
        <v-spacer />

        <v-btn
          @click="sendBookRequest()"
          class="ml-2 mt-3"
          color="green-darken-1"
          variant="flat"
          >Borrow</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-snackbar v-model="snackbar">
    Thanks for your feedback

    <template v-slot:action="{ attrs }">
      <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
import AuthService from "../../auth/views/authService";
// import { EventBus } from "@/utils/eventBus";

import { inject } from "vue";
export default {
  name: "UserBooksPage",
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("book/getAllBooks");
      v.$store.dispatch("book/getAllLoans");
    });
  },
  data: () => ({
    dialog: false,
    dateDialog: false,
    dialogDelete: false,
    newBook: false,
    snackbar: false,
    headers: [
      { title: "image", key: "image" },
      {
        title: "Name",
        align: "start",
        sortable: false,
        key: "name",
      },
      { title: "publisher", key: "publisher" },
      { title: "isbn", key: "isbn" },
      { title: "category", key: "category" },
      { title: "sub_category", key: "sub_category" },
      { title: "pages", key: "pages" },
      { title: "description", key: "description" },
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
    bookId: 0,
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
      return this.editedIndex === -1 ? "New Book" : "Edit Book";
    },
    Books() {
      return this.$store.getters["book/bookGetters"]("allBooks");
    },
    isAdmin() {
      return JSON.parse(AuthService.user).is_admin === 1 ? true : false;
    },
    Loans() {
      return this.$store.getters["book/bookGetters"]("allLoans");
    },
    filteredBooks() {
      const userLoans = this.Loans
        ? this.Loans.filter(
            (loan) =>
              loan.user_id === JSON.parse(AuthService.user).id &&
              loan.status === "approved"
          )
        : [];

      const matchingObjects = [];

      userLoans.forEach((item1) => {
        const matchingBook = this.Books.find(
          (item2) => item2.id === item1.book_id && item2.status === 'approved'
        );
        if (matchingBook) {
          matchingObjects.push(matchingBook);
        }
      });

      return matchingObjects;
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
  mounted() {
    const eventBus = inject("eventBus");

    if (eventBus) {
      eventBus.$on("openDialog", (message) => {
        console.log("Received openDialog event with message:", message);
        // Handle the event and open the dialog
      });
    }
  },

  methods: {
    addNewBook() {
      this.newBook = true;
      this.dialog = true;
    },

    onImageChange(e) {
      console.log(e.target.files[0]);

      this.Image = e.target.files[0];
    },

    editItem(item) {
      this.formData = { ...item };
      this.imageUrl = this.formData.image_url;
      console.log(this.formData);
      this.bookId = this.formData.id;
      this.newBook = false;
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.bookId = item.id;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      console.log(this.bookId);
      this.$store.dispatch("book/deleteBook", this.bookId);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.formData = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.formData = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    saveBook() {
      this.formData.added_by = JSON.parse(AuthService.user).id;
      this.formData.status = "Available";
      let Test = new FormData();
      Test.append("name", this.formData.name);
      Test.append("publisher", this.formData.publisher);
      Test.append("category", this.formData.category);
      Test.append("isbn", this.formData.isbn);
      Test.append("sub_category", this.formData.sub_category);
      Test.append("description", this.formData.description);
      Test.append("pages", this.formData.pages);
      Test.append("added_by", this.formData.added_by);
      Test.append("status", this.formData.status);

      Test.append("image", this.Image);

      this.$store.dispatch("book/addBook", Test);
      this.close();
    },
    showToast() {
      this.$toast.success("This is a success message");
    },
    editBook() {
      let Test = new FormData();
      Test.append("name", this.formData.name);
      Test.append("id", this.formData.id);
      Test.append("publisher", this.formData.publisher);
      Test.append("category", this.formData.category);
      Test.append("isbn", this.formData.isbn);
      Test.append("sub_category", this.formData.sub_category);
      Test.append("description", this.formData.description);
      Test.append("pages", this.formData.pages);
      Test.append("image", this.Image);

      const newapayload = {
        field1: Test,
        field2: this.formData.id,
      };

      this.$store.dispatch("book/editBook", newapayload);
      this.close();
    },

    getDueDate() {
      const today = new Date();
      const dueDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
      const year = dueDate.getFullYear();
      const month = (dueDate.getMonth() + 1).toString().padStart(2, "0");
      const day = dueDate.getDate().toString().padStart(2, "0");

      this.ReturnDate = `${year}-${month}-${day}`;

      return this.ReturnDate;
    },

    BorrowBook(val) {
      this.dateDialog = true;
      this.selectedBook = { ...val };
    },
    sendBookRequest() {
      const data = {
        user_id: JSON.parse(AuthService.user).id,
        book_id: this.selectedBook.id,
        due_date: this.ReturnDate,
      };

      this.$store.dispatch("book/borrowBook", data);
      this.dateDialog = false;
    },

    checkifExistsOnLoans(val) {
      const loggedInUserId = JSON.parse(AuthService.user).id;
      const isMatch = this.Loans.some(
        (loan) => val.id === loan.book_id && loggedInUserId === loan.user_id
      );
      console.log(isMatch);
      if (isMatch) {
        return true;
      } else {
        return false;
      }
    },

    checkDueDate(val) {
      const loggedInUserId = JSON.parse(AuthService.user).id;
      const currentDate = new Date();

      const isMatch = this.Loans.some((loan) => {
        return (
          val.id === loan.book_id &&
          loggedInUserId === loan.user_id &&
          new Date(loan.due_date) < currentDate
        );
      });
      console.log(isMatch);
      return isMatch;
    },

    Return(val) {
      const loggedInUserId = JSON.parse(AuthService.user).id;

      const matchingLoan = this.Loans.find((loan) => {
        return val.id === loan.book_id && loggedInUserId === loan.user_id;
      });

      const data = {
        loan_id: matchingLoan.id,
        book_id:matchingLoan.book_id
      };

      this.$store.dispatch("book/returnBook", data);
    },

    Extend(val) {
      const loggedInUserId = JSON.parse(AuthService.user).id;

      const matchingLoan = this.Loans.find((loan) => {
        return val.id === loan.book_id && loggedInUserId === loan.user_id;
      });
      console.log(matchingLoan)

      const data = {
        loan_id: matchingLoan.id,
      };

      this.$store.dispatch("book/extendLoan", data);
    },
    Recieve(val) {
      const matchingLoan = this.Loans.find((loan) => {
        return val.id === loan.book_id;
      });

      const data = {
        loan_id: matchingLoan.id,
      };

      this.$store.dispatch("book/recieveBook", data);
    },
  },
};
</script>

<style scoped>
@import url("../style.css");
</style>
