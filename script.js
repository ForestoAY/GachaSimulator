let gachaItem = [
  {
    nama: "R",
    rarity: 70,
    linkGambar: "https://cdn-icons-png.flaticon.com/512/4553/4553016.png",
    id: 1,
  },
  {
    nama: "SR",
    rarity: 20,
    linkGambar: "https://img.lovepik.com/element/45016/3146.png_860.png",
    id: 2,
  },
  {
    nama: "SSR",
    rarity: 8,
    linkGambar:
      "https://pbs.twimg.com/profile_images/1667097609624866816/GQmBXyII_400x400.jpg",
    id: 3,
  },
  {
    nama: "EX",
    rarity: 2,
    linkGambar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIVZKlV_rZdJ4bvLs1FyrmPL5YpV3A9pihrA&s",
    id: 4,
  },
];

function render(array) {
  let itemList = document.getElementById("itemList");
  itemList.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    let perCharacter = array[i];
    let frame;
    let { nama, rarity, linkGambar, id } = perCharacter;

    if (rarity >= 70) {
      frame = "rare";
    } else if (rarity >= 20) {
      frame = "sr";
    } else if (rarity >= 8) {
      frame = "ssr";
    } else if (rarity <= 2) {
      frame = "exclusive";
    }

    itemList.innerHTML += `
    <div class="kartu ${frame}" style="width: 10rem;">
      <img src="${linkGambar}" class="card-img-top" alt="${nama}">
      <div class="card-body">
        <p>${nama}</p>
        <p>${rarity}</p>
      </div>
    </div>`;
  }
}

render(gachaItem);
