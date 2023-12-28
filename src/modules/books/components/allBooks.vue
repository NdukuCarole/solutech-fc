<template>
  <v-data-table :headers="headers" :items="Books">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>All Books</v-toolbar-title>

        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-btn
          class="text-none ms-4 text-white"
          color="blue-darken-4"
          rounded="0"
          variant="flat"
          @click="addNewBook"
        >
          Add Book
        </v-btn>

        <v-dialog v-model="dialog" max-width="800px" persistent>
          <v-card>
            <v-card-title>
              <span class="text-h5">Book</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="formData.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="formData.publisher"
                      label="Publisher"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="formData.isbn"
                      label="ISBN"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="formData.category"
                      label="Category"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="formData.sub_category"
                      label="Sub Category"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="formData.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="formData.pages"
                      label="Pages"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-img
                      v-if="!newBook"
                      :src="imageUrl"
                      height="200"
                      contain
                      class="d-flex flex-row justify-center mt-n2"
                    />
                    <v-file-input
                      type="file"
                      class="custom-file-input mt-2"
                      id="customFile"
                      ref="file"
                      label="Image"
                      accept="image/*"
                      v-on:change="onImageChange"
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="newBook ? saveBook : editBook"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
        v-if="item.status == 'approved' && checkifExistsOnLoans(item)"
        >Return</v-btn
      >

      <v-btn
      @click="Return(item)"
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
</template>
<script>
import AuthService from "../../auth/views/authService";
export default {
  name: "BooksPage",
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
      return JSON.parse(AuthService.user).id == 1 ? true : false;
    },
    Loans() {
      return this.$store.getters["book/bookGetters"]("allLoans");
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
      this.newBook = false;
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
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
      console.log(isMatch)
      return isMatch;
    },
  },
};
</script>

<style scoped>
@import url("../style.css");
</style>
