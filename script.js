let gachaItems = [
  {
    nama: "Caterpie",
    rate: 70,
    linkGambar:
      "https://www.giantbomb.com/a/uploads/scale_small/13/135472/1892132-010caterpie.png",
    id: 1,
  },
  {
    nama: "Ponyta",
    rate: 20,
    linkGambar:
      "https://www.giantbomb.com/a/uploads/scale_small/13/135472/1892309-077ponyta.png",
    id: 2,
  },
  {
    nama: "Voltorb",
    rate: 8,
    linkGambar:
      "https://www.giantbomb.com/a/uploads/scale_small/13/135472/1892678-100voltorb.png",
    id: 3,
  },
  {
    nama: "Lapras",
    rate: 2,
    linkGambar:
      "https://www.giantbomb.com/a/uploads/scale_small/13/135472/1891870-131lapras.png",
    id: 4,
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

    if (rate >= 70) {
      frame = "common";
    } else if (rate >= 20) {
      frame = "rare";
    } else if (rate >= 8) {
      frame = "sr";
    } else if (rate <= 2) {
      frame = "ssr";
    }

    gachaList.innerHTML += `
    <div class="kartu ${frame}" style="width: 10rem;">
      <div class="gambar">
        <img src="${linkGambar}" class="card-img-top" alt="${nama}">
      </div>
      <div class="card-text">
        <p>${nama}</p>
        <p>${rate}%</p>
      </div>
    </div>`;
  }
}

renderGachaItem(gachaItems);

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

    if (rate >= 70) {
      frame = "common";
    } else if (rate >= 20) {
      frame = "rare";
    } else if (rate >= 8) {
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

function addNewGacha(){
  const newItemName = document.getElementById("newItemName");
  const newItemRate = document.getElementById("newItemRate");
  const newItemLink = document.getElementById("newItemLink");
  let itemName = newItemName.value.trim();
  let itemRate = Number(newItemRate.value.trim());
  let itemLink = newItemLink.value.trim();
  if (itemName && !isNaN(itemRate) && itemRate > 0 && itemRate <= 100) {
    gachaItems.push({ nama: itemName, rate: itemRate, linkGambar: itemLink});
    newItemName.value = "";
    newItemRate.value = "";
    newItemLink.value = "";
    renderGachaItem(gachaItems);
  }
}

let gachaButton = document.getElementById("gachaButton");
gachaButton.addEventListener("click", gacha);
let addItemButton = document.getElementById("addItemButton");
addItemButton.addEventListener("click", addNewGacha);

// click top up
let topUpButton = document.getElementById("topUpButton");
topUpButton.addEventListener("click", function () {
  window.location.href = "topup-credit.html";
});
