function createItemElement(item){
    const anchor = document.createElement("a");
    anchor.href = `./item.html?title=${item.title}&cost=${item.price}&src=${item.imgSrc}`;
    const itemContainer = document.createElement("div");
    itemContainer.className = "item";

    const imgElement = document.createElement("img");
    imgElement.src = item.imgSrc;
    
    

    const costElement = document.createElement("div");
    costElement.innerText = item.price;
    costElement.className = "itemCost";

    const titleElement = document.createElement("div");
    titleElement.className = "itemTitle";
    titleElement.textContent = item.title;

    anchor.append(itemContainer);
    itemContainer.append(imgElement);
    itemContainer.append(titleElement);
    itemContainer.append(costElement);

    return anchor;
}