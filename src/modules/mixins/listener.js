import { EventBus } from "@/utils/eventBus";
// import Toast from 'vue-toastification';



const listener = {
  mounted: function () {
  

    EventBus.$on("ApiError", (message) => {
      this.$toast.warning(message, {
        position: "top-center",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    });


    EventBus.$on("ApiSuccess", (message) => {
        this.$toast.success(message);
        
      });
  },
};

export default listener;
