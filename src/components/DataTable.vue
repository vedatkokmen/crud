<template>
  <div>
    <v-container class="grey mb-2 lighten-5">
      <v-row>
        <v-col cols="4">
          <v-card class="mx-auto">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Total Income</h3>
                <v-progress-circular
                  rotate="180"
                  size="100"
                  width="15"
                  :value="totalIncome / 1000"
                  color="amber"
                >{{ 1000 }}</v-progress-circular>
                <div class="display-2">{{totalIncome}} TL</div>
              </div>
            </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="4" justify-center align-center>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Total Expense</h3>
                <v-progress-circular
                  rotate="180"
                  size="100"
                  width="15"
                  :value="totalExpense / 1000"
                  color="pink"
                >{{ 1000 }}</v-progress-circular>
                <div class="display-2">{{totalExpense}} TL</div>
              </div>
            </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Balance</h3>
                <v-progress-circular
                  rotate="180"
                  size="100"
                  width="15"
                  :value="balance / 1000"
                  color="blue"
                >{{ 1000 }}</v-progress-circular>
                <div class="display-2">{{balance}} TL</div>
              </div>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-data-table :headers="headers" :items="items" sort-by="cost" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="newItem.name" label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model.number="newItem.cost" label="Cost"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="newItem.category" label="Category"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="newItem.desc" label="Description"></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-switch label="Income" v-model="newItem.isIncome"></v-switch>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
        <v-icon small @click="deleteItem(item)">delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
//import db from "../../firebase";
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  //props: ["items", "loading"],
  components: {},
  data() {
    return {
      snack: false,
      snackColor: "",
      snackText: "",
      itemPerPage: 5,
      max25chars: v => v.length <= 25 || "Input too long!",
      pagination: {},
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Cost", value: "cost" },
        { text: "Description", value: "desc" },
        { text: "Category", value: "category" }
      ],
      loading: false,
      items: [],
      dialog: false,
      newItem: this.$store.state.newItem,
      editedIndex: -1,
      defaultItem: {
        name: "",
        cost: null,
        category: null,
        desc: ""
      }
    };
  },
  computed: {
    totalExpense() {
      return this.$store.getters.totalExpense;
    },
    totalIncome() {
      return this.$store.getters.totalIncome;
    },
    balance() {
      return this.$store.getters.balance;
    },
    incomes() {
      return this.$store.getters.incomes;
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    initialize() {
      this.items = this.$store.state.items;
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.newItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.items.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.items.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.newItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.newItem);
      } else {
        this.$store.commit("addItem", this.newItem);
      }
      this.close();
    }
  },
  created() {
    this.initialize();
  }
};
</script>

<style scoped>
</style>