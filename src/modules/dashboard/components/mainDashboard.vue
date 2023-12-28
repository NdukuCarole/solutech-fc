<template>
  <v-data-table :headers="headers" :items="Users">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>All Users</v-toolbar-title>

        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-btn
          class="text-none ms-4 text-white"
          color="blue-darken-4"
          rounded="0"
          variant="flat"
          @click="addNewUser"
        >
          Add User
        </v-btn>

        <v-dialog v-model="dialog" max-width="800px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.password"
                      label="Password"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      dense
                      :items="items"
                      class="mx-4"
                      outlined
                      label="Role"
                      item-title="name"
                      item-value="id"
                      v-model="editedItem.is_admin"
                      :rules="rules.required"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click=" newUser ? saveUser() : editUser()">
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
      <v-icon size="small" class="me-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template> -->
  </v-data-table>
</template>
<script>
export default {
  name: "DashboardPage",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    newUser:false,
    headers: [
      {
        title: "Name",
        align: "start",
        sortable: false,
        key: "name",
      },
      { title: "Email", key: "email" },
      { title: "IsAdmin", key: "is_admin" },

      { title: "Actions", key: "actions", sortable: false },
    ],
    items: [
      { id: true, name: "Admin" },
      { id: false, name: "Normal User" },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      password: "",
      email: "",
      is_admin: 0,
    },
    defaultItem: {
      name: "",
      password: "",
      email: "",
      is_admin: 0
    },
    rules: {
      required: [(value) => !!value || "Required."],
    },
  }),
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("dashboard/getAllUsers");
    });
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Edit User" : "New User";
    },
    Users() {
      return this.$store.getters["dashboard/dashboardGetters"]("allUsers");
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
   
    addNewUser() {
      this.newUser = true
      this.dialog = true;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      console.log(this.editedIndex);
      this.editedItem = Object.assign({}, item);
      this.newUser =false


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
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    saveUser() {
      this.$store.dispatch("dashboard/registerUser", this.editedItem);
      this.close();
    },
  },
};
</script>

<style scoped>
@import url("../style.css");
</style>
