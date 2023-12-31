const { createApp } = Vue
createApp({
    data() {
        return {
          name: "",
          mobile: "01",
          confirmed: false,
          appliedCoupon: null,
          couponCode: "" , 
          coupons: [
              {
                code: "100TAKAOFF",
                discount: 100
              },
              {
                code: "200TAKAOFF",
                discount: 200
              }
            ],
            seatStates: {
                available: {
                    text: "Available",
                    color: "#fff"
                },
                selected: {
                    text: "Selected",
                    color: "#00ff00"
                },
                booked: {
                    text: "Booked",
                    color: "gray"
                },
                sold: {
                    text: "Sold",
                    color: "#ff0000"
                }
            },
            seats: [
                {
                    name: "A1",
                    type: "available",
                    price: 500
                },
                {
                    name: "A2",
                    type: "available",
                    price: 500
                },
                {
                    name: "A3",
                    type: "available",
                    price: 500
                },
                {
                    name: "A4",
                    type: "sold",
                    price: 500
                },
                {
                    name: "B1",
                    type: "available",
                    price: 450
                },
                {
                    name: "B2",
                    type: "available",
                    price: 450
                },{
                    name: "B3",
                    type: "sold",
                    price: 450
                },
                {
                    name: "B4",
                    type: "available",
                    price: 450
                },
                {
                    name: "C1",
                    type: "available",
                    price: 500
                  },
                  {
                    name: "C2",
                    type: "sold",
                    price: 500
                  },
                  {
                    name: "C3",
                    type: "available",
                    price: 500
                  },
                  {
                    name: "C4",
                    type: "available",
                    price: 500
                  },
                  {
                    name: "D1",
                    type: "sold",
                    price: 400
                  },
                  {
                    name: "D2",
                    type: "available",
                    price: 400
                  },
                  {
                    name: "D3",
                    type: "booked",
                    price: 400
                  },
                  {
                    name: "D4",
                    type: "booked",
                    price: 400
                  },
                  {
                    name: "E1",
                    type: "available",
                    price: 300
                  },
                  {
                    name: "E2",
                    type: "sold",
                    price: 300
                  },
                  {
                    name: "E3",
                    type: "available",
                    price: 300
                  },
                  {
                    name: "E4",
                    type: "available",
                    price: 300
                  },
                  {
                    name: "F1",
                    type: "available",
                    price: 300
                  },
                  {
                    name: "F2",
                    type: "available",
                    price: 300
                  },
                  {
                    name: "F3",
                    type: "sold",
                    price: 300
                  },
                  {
                    name: "F4",
                    type: "available",
                    price: 300
                  },
                  {
                    name: "G1",
                    type: "available",
                    price: 275
                  },
                  {
                    name: "G2",
                    type: "available",
                    price: 275
                  },
                  {
                    name: "G3",
                    type: "available",
                    price: 275
                  },
                  {
                    name: "G4",
                    type: "sold",
                    price: 275
                  }
            ]
        };
    },
    computed: {
      selectedSeats() {
        let ss = this.seats.filter(item => item.type === "selected");
        return ss;
      },

      totalCost() {
        let tc = 0;
        this.selectedSeats.forEach((seat) => {
          tc += seat.price;
        });

        if (this.appliedCoupon !== null) {
          tc = tc - this.appliedCoupon.discount;
        }

        return tc;
      }
    },

    methods: {
      handleClick(i) {
        let clickedSeat = this.seats[i];

        if(clickedSeat.type === "sold" || clickedSeat.type === "booked") {
          alert("This seat is already sold or booked.");
          return;
        }

        if(clickedSeat.type == "available" && this.selectedSeats.length > 2) {
          alert("You can not select more than 3 seats.");
          return;
        }

          clickedSeat.type =
          clickedSeat.type === "selected" ? "available" : "selected";
          console.log(clickedSeat);
      },

      confirm() {
        if (!this.name || !this.mobile) {
          alert("Please, enter name and mobile.")
          return;
        }

        if (this.mobile.length < 11) {
          alert("Enter 11 digit mobile number.");
          return;
        }

        this.confirmed = true;
      },

      resetData() {
        if(this.confirmed == true) {
          this.name = "";
          this.mobile = "";
          this.confirmed = false;
          this.appliedCoupon = null;

          this.seats.forEach((seat) => {
            if (seat.type === "selected") {
              seat.type = "sold";
            }
          });
        }
      }
    },

    watch: {
      couponCode(newValue) {
        if (newValue.length === 10) {
          let searchedCoupons = this.coupons.filter(
            (item) => item.code === newValue
          );

          if (searchedCoupons.length === 1) {
            this.appliedCoupon = searchedCoupons[0];
            this.couponCode = "";
            alert("Congratulation! You have got discount TK. " + this.appliedCoupon.discount);
            
          }
          else {
            alert("Coupon is not valid!");
          }
        }  
      },

      mobile(newValue, oldValue) {
        if (isNaN(newValue)) {
          alert("Enter valid mobile number.");
          this.mobile = oldValue;
        }

        if (newValue.length > 11) {
          alert("Enter 11 digit mobile number.");
          this.mobile = oldValue;
        }
      }
    }
}).mount('#app');