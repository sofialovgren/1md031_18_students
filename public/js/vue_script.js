var socket = io();

var vm = new Vue ({
  el:'#menu',
  data: {
    Burgers:food,
    chosenburg:[],
    Förnamn:"",
    Efternamn:"",
    // Adress:"",
    Telefonnummer:"",
    Email:"",
    betalningsalternativ:"",
    gender:"",
    details:{},
    //orderList:"",
    klarOrder:"",
    orders:{},

    // onclick:"",
  },

  // created: function () {
  //   socket.on('initialize', function (data) {
  //     this.orders = data.orders;
  //   }.bind(this));
  //
  //   socket.on('currentQueue', function (data) {
  //     this.orders = data.orders;
  //   }.bind(this));

  //   created: function () {
  //     socket.on('initialize', function (data) {
  //     this.oID = (Object.keys(data.orders).length);
  //     }.bind(this));
  //     console.log(this.oID);
  // },
  methods:{
     markDone: function() {
       this.orderList="Your order: " +this.chosenburg+ " "+ this.Förnamn + " "+this.Efternamn+" " + this.Email + " " + this.Telefonnummer +" "+this.betalningsalternativ
    },

    getNext: function () {
          var lastOrder = Object.keys(this.orders).reduce( function (last, next) {
            return Math.max(last, next);
          }, 0);
          return lastOrder + 1;
        },
        displayOrder: function(event){
          var offset={x:event.currentTarget.getBoundingClientRect().left,
          y:event.currentTarget.getBoundingClientRect().top};
          this.details={x:event.clientX-10-offset.x,
          y:event.clientY-10-offset.y};

        },
        addOrder: function (event) {
          this.klarOrder= "Order: "+ this.chosenburg + "\n" + "Ditt namn:" + this.Förnamn + " "+
          this.Efternamn +"\n" + "Din E-mail: "+ this.Email +"\n"+ "Ditt telefonnummer:" + this.Telefonnummer + "\n"+ "Du är:" + this.gender + "\n" +
          "Betala med:" + this.betalningsalternativ;
          // this.orderList="Your order: " +this.chosenburg+ " "+ this.Förnamn + " "+this.Efternamn+" " + this.Email + " " + this.Telefonnummer +" "+this.betalningsalternativ
          socket.emit("addOrder", { orderId: this.getNext(),
                                    details: this.details,
                                    orderItems: this.chosenburg,
                                    Förnamn:this.Förnamn,
                                    Efternamn:this.Efternamn,
                                    Email:this.Email,



      });
    },

      }

});
