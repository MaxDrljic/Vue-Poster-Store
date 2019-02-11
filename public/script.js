const PRICE = 9.99;
const LOAD_NUM = 10;

new Vue({
  el: '#app',
  data: {
    total: 0,
    items: [],
    cart: [],
    results: [],
    newSearch: 'anime',
    lastSearch: '',
    loading: false,
    price: PRICE
  },
  methods: {
    noMoreItems() {
      return this.items.length === this.results.length && this.results.length > 0
    },
    appendItems() {
      if (this.items.length < this.results.length) {
        let append = this.results.slice(this.items.length, this.items.length + LOAD_NUM);
        this.items = this.items.concat(append);
      }
    },
    onSubmit() {
      this.items = [];
      this.loading = true;
      this.$http
      .get('/search/'.concat(this.newSearch))
      .then((res) => {
        this.lastSearch = this.newSearch;
        this.results = res.data;
        this.appendItems();
        this.loading = false;
      });
    },
    addItem(index) {
      this.total += PRICE;
      let item = this.items[index];
      let found = false;
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === item.id) {
          found = true;
          this.cart[i].qty++;
          break;
        }
      }
      if (!found) {
        this.cart.push({
          id: item.id,
          title: item.title,
          qty: 1,
          price: PRICE
        });
      }
    },
    inc(item) {
      item.qty++;
      this.total += PRICE;
    },
    dec(item) {
      item.qty--;
      this.total -= PRICE;
      if (item.qty <= 0) {
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i].id === item.id) {
            this.cart.splice(i, 1);
            break;
          }
        }
      }
    }
  },
  filters: {
    currency: function(price) {
      return '$'.concat(price.toFixed(2));
    }
  },
  mounted() {
    this.onSubmit();

    // Scroll Monitor
    // let vueInstance is solving the problem going around the this.something error
    let vueInstance = this;
    let elem = document.getElementById('product-list-bottom');
    let watcher = scrollMonitor.create(elem);
    watcher.enterViewport(function() {
      vueInstance.appendItems();
    });
  },
});