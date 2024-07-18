const audio = document.getElementById('backgroundMusic').volume = 0.2;

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

            this.classList.add("selected");
  
            selectedValue = this.getAttribute("data-value");
        });
    }

    topupButton.addEventListener("click", function () {
        if (selectedValue) {
            let topupAmount = parseInt(selectedValue);
            let topUpHistory = JSON.parse(localStorage.getItem("topUpHistory")) || [];
            let totalTopUp = topUpHistory.reduce((total, topUp) => total + topUp.amount, 0);
            let newTotal = totalTopUp + topupAmount;
            let nextWarningThreshold = Math.ceil(totalTopUp / 3000) * 3000; // ceil or floor. check calculation manually

            //set warning for overspending
            if (newTotal >= nextWarningThreshold && totalTopUp < nextWarningThreshold) {
                Swal.fire({
                    title: 'Warning!',
                    text: `Your total top-up amount will exceed ${nextWarningThreshold} credits. Do you want to continue?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, continue',
                    cancelButtonText: 'No, cancel'
                }).then((result) => {
                    if (result.isConfirmed) {
                        completeTopUp(topupAmount);
                    } else {
                        Swal.fire('Cancelled', 'Your top-up has been cancelled.', 'error');
                    }
                });
            } else {
                completeTopUp(topupAmount);
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

    function completeTopUp(topupAmount) {
        let topUpHistory = JSON.parse(localStorage.getItem("topUpHistory")) || [];
        topUpHistory.push({ amount: topupAmount, date: new Date() });
        localStorage.setItem("topUpHistory", JSON.stringify(topUpHistory));

        balance += topupAmount;
        localStorage.setItem("balance", balance);
        updateBalance();
        Swal.fire({
            title: 'Top-Up successful!',
            text: `You have added ${topupAmount} credits.`,
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            window.location.href = "index.html";
        });
    }

    function updateBalance() {
        balanceId.textContent = balance;
    }
});
