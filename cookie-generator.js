class CookieGenerator {

  // Show Ranking
  rank() {
    const prods = this.getProducts();
    console.table(prods.slice(0, 5));
  }


  constructor() {
    // timer
    this.timers = {};
    // elements
    this.elms = {
      big: document.querySelector('#bigCookie'),
      get shimmer() {
        return document.querySelector('#shimmers .shimmer')
      },
    };

    const that = this;

    // Buy product selected by cost performance
    function buyWishedOne() {
      const prods = that.getProducts();
      if (Game.cookies >= prods[0].price) {
        prods[0].elm.click();
      }
    }

    // Check and Click Golden Cookie
    function clickGoldenCookie() {
      if (that.elms.shimmer) {
        that.elms.shimmer.click();
      }
    }
    // Click Big Cookie
    function clickBigCookie() {
      that.elms.big.click()
    }

    // Shopping every 100ms
    this.timers.buyer = setInterval(buyWishedOne, 100);
    // Check Golden Cookie every 3s
    this.timers.shimmer = setInterval(clickGoldenCookie, 3000);
    // Coninue rapidly clicking Big Cookie
    this.timers.clickBigCookie = setInterval(clickBigCookie, 0);
  }

  getProducts() {
    const prods = Game.ObjectsById.map(p => {
      let cps = p.cps(p);
      return {
        name: p.name,
        cps,
        price: p.bulkPrice,
        elm: p.l,
        costPerf: cps / p.price,
      };
    });
    prods.sort((a,b) => (b.costPerf - a.costPerf));
    return prods;
  }

  clearAllIntervals() {
    for (let timer in this.timers) {
      clearInterval(this.timers[timer]);
      delete this.timers[timer];
    }
  }

}
let cg = new CookieGenerator();
