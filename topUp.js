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
        let newBalance = balance + topupAmount;
  
        // warning kelipatan 2500 CREDIT
        if (Math.floor(balance / 2500) < Math.floor(newBalance / 2500)) {
          Swal.fire({
            title: 'WARNING!',
            text: `You have exceed ${newBalance} Credits. Do you want to continue?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, continue',
            cancelButtonText: 'No, cancel'
          }).then((result) => {
            if (result.isConfirmed) {
              balance = newBalance;
              localStorage.setItem("balance", balance);
              updateBalance();
              Swal.fire({
                title: 'Top-Up successful!',
                text: `You have added ${selectedValue} credits.`,
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                window.location.href = "index.html";
              });
            } else {
              Swal.fire({
                title: 'Top-Up cancelled!',
                text: 'Your top-up has been cancelled.',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
          });
        } else {
          balance = newBalance;
          localStorage.setItem("balance", balance);
          updateBalance();
          Swal.fire({
            title: 'Top-Up successful!',
            text: `You have added ${selectedValue} credits.`,
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.href = "index.html";
          });
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Please select a top-up card first.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  
    function updateBalance() {
      balanceId.textContent = balance;
    }
  });

  const audio = document.getElementById('backgroundMusic').volume = 0.2;

  