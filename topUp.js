document.addEventListener("DOMContentLoaded", function () {
    let topupCards = document.getElementsByClassName("card-topup");
    let topupButton = document.getElementById("topupBtn");
    let selectedValue = null;
  
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
  
    // Masih belum pakai sweet alert
    topupButton.addEventListener("click", function () {
      if (selectedValue) {
        alert(`Topup successful! You have added ${selectedValue} credits.`);
        // tinggal tambahin proses buat nambahin value nya
      } else {
        alert("Please select a topup card first.");
      }
    });
  });
  