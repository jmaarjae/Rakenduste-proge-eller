{
    const itemContainerClass = "list-item";
    const imageClass = "item-img";
    const titleClass = "item-title";
    const priceClass = "price-current";

    const items = document.getElementsByClassName(itemContainerClass);

    const arr =[];
    //HTMLDivElement[] to Array
    Array.from(items).forEach( item => {
        console.log(item)
        const imgs = item.getElementsByClassName(imageClass);
        if(imgs.length === 0 ) return; 
        const img = imgs[0];

        const src = img.src;

        if(!src) return;

        const title = item.getElementsByClassName(titleClass)[0].textContent;
        const price = item.getElementsByClassName(priceClass)[0].textContent;

        arr.push({
            imgSrc: src,
            title,
            price,
            category: document.title.split("|")[0].trim(),
        });

        //console.log(imgs.length);
        //console.log(img);
    });
    console.log(arr);
    //console.log(items);
}