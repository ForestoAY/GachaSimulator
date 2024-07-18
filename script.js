function saveToLocal(key, array) {
  localStorage.setItem(key, JSON.stringify(array));
}

function loadFromLocal(key) {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

let gachaItems = loadFromLocal("localGacha");
let historyItems = loadFromLocal("localHistory");

function renderGachaItem(array) {
  let gachaList = document.getElementById("gachaList");
  gachaList.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    let perItem = array[i];
    let frame;
    let { nama, rate, linkGambar, id } = perItem;

    if (rate >= 30) {
      frame = "common";
    } else if (rate >= 10) {
      frame = "rare";
    } else if (rate > 2) {
      frame = "sr";
    } else if (rate <= 2) {
      frame = "ssr";
    }

    gachaList.innerHTML += `
    <div class="kartu ${frame}" style="width: 10rem;">
      <div class="gambar">
        <img src="${linkGambar}" style="width: 144px; height: 144px" class="card-img-top" alt="${nama}">
      </div>
      <div class="card-text">
        <p><b>${nama}</b></p>
        <p>${rate}</p>
      </div>
      <div class="edit-delete">
        <button class="btn btn-sm btn-warning me-2" onclick="editGacha(${id})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteGacha(${id})">Delete</button>
      </div>
    </div>`;
  }
}

function gacha() {
  if (gachaItems.length > 0) {
    let totalRate = gachaItems.reduce(
      (sum, gachaItem) => sum + gachaItem.rate,
      0
    );
    let randomNum = Math.random() * totalRate;
    for (let gachaItem of gachaItems) {
      if (randomNum < gachaItem.rate) {
        historyItems.unshift(gachaItem);
        let resultDiv = document.getElementById("result");
        resultDiv.innerHTML = "";
        resultDiv.innerHTML = `<img src="${gachaItem.linkGambar}" style="width: 200px; height: 200px" alt="${gachaItem.nama}" />
      <div class="description">You got ${gachaItem.nama}</div>`;
        saveToLocal("localHistory", historyItems);
        updateGachaHistories(historyItems);
        return;
      }
      randomNum -= gachaItem.rate;
    }
  } else {
    let resultDiv = document.getElementById("result");
    resultDiv.querySelector(".description").innerText = "No items available!";
  }
}

function updateGachaHistories(array) {
  let gachaHistories = document.getElementById("gachaHistories");
  gachaHistories.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    let perItem = array[i];
    let frame;
    let { nama, rate, linkGambar, id } = perItem;

    if (rate >= 30) {
      frame = "common";
    } else if (rate >= 10) {
      frame = "rare";
    } else if (rate > 2) {
      frame = "sr";
    } else if (rate <= 2) {
      frame = "ssr";
    }

    gachaHistories.innerHTML += `
    <div class="kartu ${frame}" style="width: 10rem;">
      <div class="gambar">
        <img src="${linkGambar}" class="card-img-top" alt="${nama}">
      </div>
      <div class="card-text">
        <p>${nama}</p>
        <p>${frame.toUpperCase()}</p>
      </div>
    </div>`;
  }
}

function addNewGacha() {
  const newItemName = document.getElementById("newItemName");
  const newItemRate = document.getElementById("newItemRate");
  const newItemLink = document.getElementById("newItemLink");
  let itemName = newItemName.value.trim();
  let itemRate = Number(newItemRate.value.trim());
  let itemLink = newItemLink.value.trim();
  if (
    itemName &&
    !isNaN(itemRate) &&
    itemRate > 0 &&
    itemRate <= 100 &&
    itemLink
  ) {
    gachaItems.push({
      nama: itemName,
      rate: itemRate,
      linkGambar: itemLink,
      id: gachaItems.length + 1,
    });
    newItemName.value = "";
    newItemRate.value = "";
    newItemLink.value = "";
    renderGachaItem(gachaItems);
    saveToLocal("localGacha", gachaItems);
  }
}

function deleteGacha(id) {
  // Sweet Alert
  Swal.fire({
    title: `Would you like to delete ${gachaItems[id - 1].nama}?`,
    text: `Are you sure?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Delete it!",
  }).then(() => {
    gachaItems.splice(id - 1, 1);
    renderGachaItem(gachaItems);
    saveToLocal("localGacha", gachaItems);
  });
}

function editGacha(id) {
  const item = gachaItems[id - 1];

  Swal.fire({
    title: "Enter new name:",
    input: "text",
    inputValue: item.nama,
    showCancelButton: true,
    confirmButtonText: "Next",
    showLoaderOnConfirm: true,
    preConfirm: (newName) => {
      if (!newName) {
        Swal.showValidationMessage("Name is required");
        return false;
      }
      return newName;
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const newName = result.value;

      Swal.fire({
        title: "Enter new rate (1-100):",
        input: "number",
        inputValue: item.rate,
        showCancelButton: true,
        confirmButtonText: "Next",
        showLoaderOnConfirm: true,
        preConfirm: (newRate) => {
          if (!newRate || isNaN(newRate) || newRate <= 0 || newRate > 100) {
            Swal.showValidationMessage(
              "Please enter a valid rate between 1 and 100"
            );
            return false;
          }
          return newRate;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const newRate = result.value;

          Swal.fire({
            title: "Enter new link:",
            input: "text",
            inputValue: item.linkGambar,
            showCancelButton: true,
            confirmButtonText: "Save",
            showLoaderOnConfirm: true,
            preConfirm: (newLink) => {
              if (!newLink) {
                Swal.showValidationMessage("Link is required");
                return false;
              }
              return newLink;
            },
          }).then((result) => {
            if (result.isConfirmed) {
              const newLink = result.value;

              // Update gacha item
              item.nama = newName;
              item.rate = Number(newRate);
              item.linkGambar = newLink;

              // Re-render gacha items
              renderGachaItem(gachaItems);
              saveToLocal("localGacha", gachaItems);

              Swal.fire({
                title: "Success!",
                text: "Gacha item updated successfully.",
                icon: "success",
              });
            }
          });
        }
      });
    }
  });
}

function reset() {
  // Sweet Alert
  Swal.fire({
    title: "Would you like to reset gacha histories?",
    text: "You will reset into empty again",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "RESET!",
  }).then(() => {
    historyItems = [];
    updateGachaHistories(historyItems);
    saveToLocal("localHistory", historyItems);
  });
}

function search() {
  let inputSearch = document.getElementById("searchBar");

  let result = [];

  result = gachaItems.filter((gachaItem) =>
    gachaItem.nama.toLowerCase().includes(inputSearch.value.toLowerCase())
  );

  renderGachaItem(result);
  inputSearch.value = "";
}

/// render gacha item \\\
renderGachaItem(gachaItems);
updateGachaHistories(historyItems);

/// button di index \\\
let gachaButton = document.getElementById("gachaButton");
gachaButton.addEventListener("click", gacha);
let addItemButton = document.getElementById("addItemButton");
addItemButton.addEventListener("click", addNewGacha);
let resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", reset);

// click top up
let topUpButton = document.getElementById("topUpButton");
topUpButton.addEventListener("click", function () {
  window.location.href = "topup-credit.html";
});
