let gachaItems = [
  {
    nama: "Caterpie",
    rate: 40,
    linkGambar:
      "https://www.giantbomb.com/a/uploads/scale_small/13/135472/1892132-010caterpie.png",
    id: 1,
  },
  {
    nama: "Pidgey",
    rate: 40,
    linkGambar:
      "https://www.giantbomb.com/a/uploads/scale_small/13/135472/1891631-016pidgey.png",
    id: 2,
  },
  {
    nama: "Ponyta",
    rate: 20,
    linkGambar:
      "https://www.giantbomb.com/a/uploads/scale_small/13/135472/1892309-077ponyta.png",
    id: 3,
  },
  {
    nama: "Voltorb",
    rate: 8,
    linkGambar:
      "https://www.giantbomb.com/a/uploads/scale_small/13/135472/1892678-100voltorb.png",
    id: 4,
  },
  {
    nama: "Lapras",
    rate: 2,
    linkGambar:
      "https://www.giantbomb.com/a/uploads/scale_small/13/135472/1891870-131lapras.png",
    id: 5,
  },
  {
    nama: "Pikachu",
    rate: 1,
    linkGambar:
      "https://www.giantbomb.com/a/uploads/scale_small/0/6087/2437349-pikachu.png",
    id: 6,
  },
];

let historyItems = [];

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
  console.log("a");
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
    console.log(gachaItems);
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
    confirmButtonText: "Yes, Delete it!"
  }).then(() => {
      gachaItems.splice(id - 1, 1);
      renderGachaItem(gachaItems);
  });
  
}

function editGacha(id) {
  const newName = prompt("Enter new name:", gachaItems[id - 1].nama);
  const newRate = prompt("Enter new rate (1-100):", gachaItems[id - 1].rate);
  const newLink = prompt("Enter new link", gachaItems[id - 1].linkGambar);
  if (newName && newRate && !isNaN(newRate) && newRate > 0 && newRate <= 100) {
    gachaItems[id - 1].nama = newName;
    gachaItems[id - 1].rate = Number(newRate);
    gachaItems[id - 1].linkGambar = newLink;
    renderGachaItem(gachaItems);
  }
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
    confirmButtonText: "RESET!"
  }).then(() => {
      historyItems = [];
      updateGachaHistories(historyItems);
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
  console.log(result);
}

/// render gacha item \\\
renderGachaItem(gachaItems);

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
