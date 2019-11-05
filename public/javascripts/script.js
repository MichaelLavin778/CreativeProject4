/* global Vue axios */
var app = new Vue({
  el: '#app',
  data: {
    items: [{
      name: "cool person",
      text: "make an app",
    }, {
      name: "person2",
      text: "declare victory",
    }, {
      name:"person3",
      text: "profit",
    }],
    name: '',
    text: '',
  },
  created: function() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        const response = await axios.get("/api/items");
        this.items = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addItem() {
      try {
        const response = await axios.post("/api/items", {
          name: this.name,
          text: this.text,
        });
        this.name = "";
        this.text = "";
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },
    async completeItem(item) {
      try {
        const response = axios.put("/api/items/" + item.id, {
          name: item.name,
          text: item.text,
        });
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        const response = await axios.delete("/api/items/" + item.id);
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },
  }
});