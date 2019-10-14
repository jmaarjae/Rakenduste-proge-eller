function setup() {
  //alert("Hello World!");
  const x = window.location;
  console.log(x);
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get("title");
  const cost = urlParams.get("cost");
  const src = urlParams.get("src");
  //console.log(title, cost, src);
  //alert(`Title: ${title} cost: ${cost} path: ${src}`);

  const container = document.createElement("div");
  container.className = "itemContainer";

  const image = document.createElement("img");
  image.src = src;
  image.className = "itemPageImage";

  const titleElement = document.createElement("h2");
  titleElement.textContent = title;
  titleElement.className = "itemTitle";

  const costElement = document.createElement("itemC");
  costElement.textContent = cost;
  costElement.className = "itemCost";

  const description =
    "The world-renowned Privia family of digital pianos grows with the PX-770, designed to provide a true grand piano experience in a slim, modern design. With authentic piano sound, natural feel and impressive features, the PX-770 is a brilliant instrument for inspiring brilliant performances.";
  const textElement = document.createElement("p");
  textElement.textContent = description;
  textElement.className = "itemDescription";

  container.append(titleElement);
  container.append(costElement);
  container.append(image);
  container.append(textElement);

  const app = document.getElementById("item.body");
  if (!app) return;

  app.append(container);
}

module.exports = {
  setup
};
