const { createApp } = Vue
createApp({
    data() {
        return {
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
            }
        };
    },
    computed: {},

    methods: {},

    watch: {}
}).mount('#app');