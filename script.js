let gachaItem = [
  {
    nama: "Caterpie",
    rarity: 70,
    linkGambar:
      "https://www.giantbomb.com/a/uploads/scale_small/13/135472/1892132-010caterpie.png",
    id: 1,
  },
  {
    nama: "Ponyta",
    rarity: 20,
    linkGambar:
      "https://www.giantbomb.com/a/uploads/scale_small/13/135472/1892309-077ponyta.png",
    id: 2,
  },
  {
    nama: "Voltorb",
    rarity: 8,
    linkGambar:
      "https://www.giantbomb.com/a/uploads/scale_small/13/135472/1892678-100voltorb.png",
    id: 3,
  },
  {
    nama: "Lapras",
    rarity: 2,
    linkGambar:
      "https://www.giantbomb.com/a/uploads/scale_small/13/135472/1891870-131lapras.png",
    id: 4,
  },
];

function renderGachaItem(array) {
  let itemList = document.getElementById("itemList");
  itemList.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    let perCharacter = array[i];
    let frame;
    let { nama, rarity, linkGambar, id } = perCharacter;

    if (rarity >= 70) {
      frame = "common";
    } else if (rarity >= 20) {
      frame = "rare";
    } else if (rarity >= 8) {
      frame = "sr";
    } else if (rarity <= 2) {
      frame = "ssr";
    }

    itemList.innerHTML += `
    <div class="kartu ${frame}" style="width: 10rem;">
      <div class="gambar">
        <img src="${linkGambar}" class="card-img-top" alt="${nama}">
      </div>
      <div class="card-text">
        <p>${nama}</p>
        <p>${rarity}</p>
      </div>
    </div>`;
  }
}

renderGachaItem(gachaItem);
