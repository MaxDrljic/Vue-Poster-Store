new Vue({
  el: '#app',
  data: {
    total: 0,
    items: [
      { title: 'Item 1' },
      { title: 'Item 2' },
      { title: 'Item 3' },
      { title: 'Item 4' },
      { title: 'Item 5' },
    ],
    cart: []
  },
  methods: {
    addItem(index) {
      this.total += 9.99;
      this.cart.push(this.items[index]);
    }
  }
});
