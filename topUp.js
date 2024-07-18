document.addEventListener("DOMContentLoaded", function () {
    let balanceId = document.getElementById("balance");
    let topupCards = document.getElementsByClassName("card-topup");
    let topupButton = document.getElementById("topupBtn");
    let selectedValue = null;

    let balance = parseInt(localStorage.getItem("balance")) || 0;
    updateBalance();
  
    for (let i = 0; i < topupCards.length; i++) {
      topupCards[i].addEventListener("click", function () {
        for (let j = 0; j < topupCards.length; j++) {
          topupCards[j].classList.remove("selected");
        }
        // nambahin selected class waktu card nya diclick
        this.classList.add("selected");
  
        // store selected value
        selectedValue = this.getAttribute("data-value");
      });
    }

    topupButton.addEventListener("click", function () {
      if (selectedValue) {
        let topupAmount = parseInt(selectedValue);
        balance += topupAmount;
        localStorage.setItem("balance", balance);
        updateBalance();

        Swal.fire({
          title: 'Top-Up successful!',
          text: `You have added ${selectedValue} credits.`,
          icon: 'success',
          confirmButtonText: 'OK'
      }).then(() => {
          window.location.href = "index.html";// balik ke main page
      });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Please select a topup card first.',
          icon: 'error',
          confirmButtonText: 'OK'
      });
      }
    });
    function updateBalance(){
      balanceId.textContent = balance;
    }
  });

  
  