import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header.jsx";
import ItemList from "./ItemList.jsx";

const root = document.getElementById("app");

const digitalPianos = [
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/HTB1QaDBc56guuRjy0Fmq6y0DXXap/Digital-Piano-88keys-Hammer-Action-China.jpg_220x220.jpg_.webp",
    title:
      "Piano-Paint Electric-Piano Beginner Upright 88-Keys Professional Intelligent Automatic",
    price: "US $3,108",
    category: "Buy digital piano and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/HTB1.37yXaL7gK0jSZFBq6xZZpXaa/high-quality-piano-digital-88-keys-with.jpg_220x220.jpg_.webp",
    title:
      "Desk Piano Simple Walnut 88-Key Electric Piano Home Desktop Hammer Piano",
    price: "US $2,828",
    category: "Buy digital piano and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/HTB1_Av8X4D1gK0jSZFyq6AiOVXaD/OEM-88-key-digital-piano-black-piano.jpg_220x220.jpg_.webp",
    title:
      "Wood Grain Electric Piano 88 Key Hammer Keyboard Adult Children Teaching",
    price: "US $1,688",
    category: "Buy digital piano and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/H3f2045cb9d1c4847aec19e853549fa82o/Home-digital-electric-piano-piano-keyboards-for.jpg_220x220.jpg_.webp",
    title:
      "Upright Piano Heavy-Hammer Adult Children 88 88-Key Teaching Intelligence Family",
    price: "US $1,688",
    category: "Buy digital piano and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/HTB1GqodX4D1gK0jSZFKq6AJrVXa9/88-key-electric-piano-digital-piano-weighted.jpg_220x220.jpg_.webp",
    title:
      "Digital Piano Test-Beginners 88-Keys Adult Children Home Teaching Intelligent",
    price: "US $1,688",
    category: "Buy digital piano and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/HTB1r8jNXhz1gK0jSZSgq6yvwpXai/digital-piano-88-key-hammer-action.jpg_220x220.jpg_.webp",
    title:
      "Electric-Piano 88-Key-Hammer Professional Intelligent Performance-Entry Triangle",
    price: "US $1,688",
    category: "Buy digital piano and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/HTB18GK2zwKTBuNkSne1q6yJoXXaH/New-arrival-metal-pedal-music-white-piano.jpg_220x220.jpg_.webp",
    title:
      "Electric Piano 88-Key Hammer Black White Wood Grain Multi-Function Smart Piano",
    price: "US $1,688",
    category: "Buy digital piano and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/HTB19LqJKf9TBuNjy1zbq6xpepXap/2015-White-color-wooden-toy-piano-for.jpg_220x220.jpg_.webp",
    title: "Upright Digital Electronic Piano 88 Key Home Education",
    price: "US $1,338",
    category: "Buy digital piano and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/HTB1pcdhKFXXXXbLXpXXq6xXFXXXH/Hot-selling-musical-instrument-perfect-white-grand.jpg_220x220.jpg_.webp",
    title:
      "Music-Instruments Upright Piano 88-Key Black White Educational Smart The-One",
    price: "US $1,299",
    category: "Buy digital piano and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/U9398593a54d44825bca33b791b724e109/Brand-New-DP-603-CB-Digital-Piano.jpg_220x220.jpg_.webp",
    title:
      "Digital Piano Beginner Heavy-Hammer Adult Student 88 88-Key Teaching Grading",
    price: "US $1,028",
    category: "Buy digital piano and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/Udd5bf4855a1f4916af8b56f895e43903R/Brand-New-Ca-sio-Privia-PX560-Portable.jpg_220x220.jpg_.webp",
    title:
      "Electric-Piano 88-Key-Hammer Vertical Digital Home-Beginners Adult Professional Students",
    price: "US $828",
    category: "Buy digital piano and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/Uc9636a0aa83c4c7492b32915aae146f8o/Roland-LX708-LX706-LX705-digital-piano.jpg_220x220.jpg_.webp",
    title:
      "Keyboard Electronic Intelligent-Piano Beginners 61-Key Children Portable Strength Early-Education",
    price: "US $461.34",
    category: "Buy digital piano and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/Ub4b06e824a2b441ca4e11ebf41e0bcaa1/Wholesale-price-for-Roland-DP-603-CB.jpg_220x220.jpg_.webp",
    title:
      "Piano Keyboard Professional Adult 61-Key 9959 Lcd Teaching Memory-Functions Vigorous",
    price: "US $399",
    category: "Buy digital piano and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/U64653606fcbb4a809dd28a55e7279644b/Wholesale-Clavinova-CLP-695GP-CLP-695GP-CVP.jpg_220x220.jpg_.webp",
    title:
      "Electronic-Control Musical-Instrument Grand-Piano Midi Keyboard 88-Key Professional Digital",
    price: "US $318.50 - 344.50",
    category: "Buy digital piano and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/U41854051afac45718ff0355c66eb4603S/Roland-LX708-LX706-LX705-digital-piano.jpg_220x220.jpg_.webp",
    title:
      "Keyboard Piano Music-Toys Beginner Multi-Function Children's And Gifts 3-6-12-Years-Old-Toys",
    price: "US $210.54",
    category: "Buy digital piano and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/U6e010cd2785c4db8af33b75363f34e88W/High-Performance-Roland-GP607-digital-grand-piano.png_220x220.png_.webp",
    title:
      "Key-Board Electronic Piano Musical-Toys Beginner Multi-Function 61-Keys Children's And",
    price: "US $199",
    category: "Buy digital piano and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/U129658a6e6c145148f1ae4835b7242fbG/Wholesale-price-for-Roland-DP-603-CB.jpg_220x220.jpg_.webp",
    title: "Toys Electric-Piano Piano-Girl Multifunctional 37-Keys Children's",
    price: "US $197.76",
    category: "Buy digital piano and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/UTB8OR0SJVfFXKJk43Otq6xIPFXah/Roland-FP-30-Digital-Piano-Kit-with.jpg_220x220.jpg_.webp",
    title: "Wind maintenance tools Pipe repair workbench Wind maintenance vise",
    price: "US $190",
    category: "Buy digital piano and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/UTB8Ch.QqbnJXKJkSahGq6xhzFXaa/Roland-RD-2000-88-Key-Digital-Stage.jpg_220x220.jpg_.webp",
    title:
      "Toy Keyboard Piano-Keys Teacher Beginner Introduction Multi-Function Adult Children 61",
    price: "US $189",
    category: "Buy digital piano and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/Ue93b9536896c45008b14e9b999baff7ee/For-New-Roland-LX708-Charcoal-Black-Digital.jpg_220x220.jpg_.webp",
    title:
      "Worlde Panda200 Professional USB 16 Drum Pads MIDI Keyboard Controller With USB Cable",
    price: "US $169",
    category: "Buy digital piano and get free shipping on AliExpress.com"
  }
];

const guitars = [
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/HTB1pkpTbsTxK1Rjy0Fgq6yovpXad/OEM-China-Factory-40-41-inch-colorful.jpg_220x220.jpg_.webp",
    title:
      "Guitarra 21-inch Ukulele 4 String Professional Mus…ts Sapele Semi-closed Knob Guitar Uk Dream US-110",
    price: "US $35.99",
    category: "Buy guitar and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/H2eaf596cdc994b0d8e4757269bfe8944t/21-Inch-Professional-Wooden-Soprano-Ukulele-Instrument.jpg_220x220.jpg_.webp",
    title:
      "21 Basswood Ukulele Set Colored Acoustic Soprano …trument for beginners With Tuner+String+Strap+Bag",
    price: "US $18.83",
    category: "Buy guitar and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/H9b98db52f0a04056a80142f744c622b8L/All-Solid-Mahogany-Handmade-Professional-Concert-23.jpg_220x220.jpg_.webp",
    title:
      "electric guitar, 6 strings / 12 strings rich electric guitar, Upgrade pickup trucks in Classic color",
    price: "US $275.50",
    category: "Buy guitar and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/Hcc352bd9dfd74032b93c27bfe160cd69t/Wooden-Ukulele-21-Inch-Soprano-Hawaiian-Guitar.jpg_220x220.jpg_.webp",
    title:
      "Professional Acoustic guitar 40 41 inch Hot musica…strings Spruce top Solid Wood guitarras china OEM",
    price: "US $255.60 - 291.10",
    category: "Buy guitar and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/HTB1SaDGdTZmx1VjSZFGq6yx2XXak/Aiersi-brand-OEM-High-Quality-Ebony-black.jpg_220x220.jpg_.webp",
    title:
      "38 Acoustic Folk 6-String Guitar for Beginners St…uitar gitar guitar accessories guitar accessories",
    price: "US $34.96 - 45",
    category: "Buy guitar and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/H14b0d2dedeb14bf4a1639d7894f0da07o/Wholesa-Top-Solid-Koa-Acacia-Handmade-21.jpg_220x220.jpg_.webp",
    title:
      "Aklot Electric Ukulele Solid Mahogany w/ Online Vi…Tenor Uke 4 String Guitar with Strap String Tuner",
    price: "US $47.87 - 68.39",
    category: "Buy guitar and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/H4aca254434284446b4cd6905aff3b5e4c/Concert-Ukulele-23-inch-Solid-Mahogany-Uke.jpg_220x220.jpg_.webp",
    title:
      "Guitar Ukulele Sand Shaker Rhythm Ring Maraca Cabasa Wear on Finger Ukulele Accessories Black",
    price: "US $0.84",
    category: "Buy guitar and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/HTB1BF6Rc25G3KVjSZPxq6zI3XXak/Aiersi-Brand-diy-unfinished-practice-ukulele-kits.jpg_220x220.jpg_.webp",
    title:
      "Travel Guitar Beginners Carbon-Fiber Lava Me 36-In…High-Quality Ballad 2 Popular Student-Instruments",
    price: "US $543.36 - 639.36",
    category: "Buy guitar and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/Ub63bb9abe33d49aa8111fcc6e0a509c9X/High-Performance-YamahaGC82C-GC82S-classical-guitar-natural.jpg_220x220.jpg_.webp",
    title:
      "Case Guitar Folk Gift Carbon-Fiber Lava Me 36inch Big-Sale Electric-Box/freeboost 2",
    price: "US $597.55 - 692.55",
    category: "Buy guitar and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/UTB8S1yssMQydeJk43PUq6AyQpXaG/HELICON-Acoustic-Guitar-AGD-4156-41inch-.jpg_220x220.jpg_.webp",
    title:
      "Travel Guitar Student-Instruments Carbon-Fiber Lava Me 36-Inch High-Quality Ballad 2",
    price: "US $946.76 - 1,395",
    category: "Buy guitar and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/UTB8qy99r5aMiuJk43PTq6ySmXXar/HELICON-Acoustic-Guitar-TW-28CSN-41inch-.jpg_220x220.jpg_.webp",
    title:
      "Mahogany Electric-Guitar Custom Suneye Fingerboard 17-String Wireless-Inlay Offer. Factory",
    price: "US $829",
    category: "Buy guitar and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/UTB88O6oEpfFXKJk43Otq6xIPFXaB/Used-low-price-portable-wholesale-cheap-acoustic.jpg_220x220.jpg_.webp",
    title:
      "Fanned Fret Model Guitar Flame In-Stock Maple-Neck Wood-Color Natural",
    price: "US $405",
    category: "Buy guitar and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/UTB8WCQAsVfFXKJk43Otq6xIPFXaS/HELICON-Acoustic-Guitar-AGD-4158-41inch-.jpg_220x220.jpg_.webp",
    title:
      "41 inch Acoustic Guitar Handmade Rosewood Fingerboard Full Solid With Gig Bag",
    price: "US $328.90",
    category: "Buy guitar and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/UTB8i4qqstoSdeJk43Owq6ya4XXa5/HELICON-ED26CM-Acoustic-Guitar.jpg_220x220.jpg_.webp",
    title:
      "Enya NOVA Folk Pop Guitar 41 inch With Electric Box Carbon Fiber Guitar",
    price: "US $699",
    category: "Buy guitar and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/UTB8iZyosJoSdeJk43Owq6ya4XXaE/HELICON-Acoustic-Guitar-HGW-200CBK-40inch-.jpg_220x220.jpg_.webp",
    title:
      "Travel Guitar Musical-Instruments Enya Professional Solid Cedar UGT-05 32-",
    price: "US $412.30",
    category: "Buy guitar and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/UTB8pXaWr._4iuJk43Fqq6z.FpXae/HELICON-TBBABY-Acoustic-Guitar.jpg_220x220.jpg_.webp",
    title:
      "Aiersi Classical Guitar Professional Double-Top Yulong Guo Chamber Koa Model-Gc-04ac",
    price: "US $3,299",
    category: "Buy guitar and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/UTB8wS1qsMQydeJk43PUq6AyQpXa5/HELICON-Acoustic-Guitar-HW-28CLN-41inch-.jpg_220x220.jpg_.webp",
    title:
      "Guitar Rosewood Custom Electric-Bass No-Frets Fingerboard 17-Strings Inlay-Offer Factory",
    price: "US $711.11",
    category: "Buy guitar and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/UTB8anAssGrFXKJk43Ovq6ybnpXaQ/HELICON-ACOUSTIC-Guitar-HGW4010CNA-Bundle-Promotion.jpg_220x220.jpg_.webp",
    title:
      "Suneye Guitar Black Guitar-Kit-Available Handed Dean-Style Custom Blot-Finish Left Lighting",
    price: "US $416.70",
    category: "Buy guitar and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/HTB1rc92aPzuK1Rjy0Fpq6yEpFXay/Aiersi-best-quality-wood-nylon-string-all.jpg_220x220.jpg_.webp",
    title:
      "Electric Bass Guitars 6-String Wood-Grain-Finish Fodera Tailpiece Widened Natural For-Sale",
    price: "US $622.11",
    category: "Buy guitar and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/HTB17cDPpFOWBuNjy0Fiq6xFxVXaH/Steel-Acoustic-Guitar-41-Inch-Full-Size.jpg_220x220.jpg_.webp",
    title:
      "Finlay Spanish Guitar Hard-Case Acoustic Classical 39inch Cedar-Top/rosewood SOLID",
    price: "US $376.38",
    category: "Buy guitar and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/H1b744790ab29419f9255186cfbd8a043Q/Cheap-china-acoustic-electric-guitars.jpg_220x220.jpg_.webp",
    title:
      "Mahogany Guitar Pickup Enya Musical-Instruments Solid 40inch with Engelman Spruce",
    price: "US $580 - 640.80",
    category: "Buy guitar and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/HTB1144fHHGYBuNjy0Fo763iBFXaI/Hot-wholesale-musical-instruments-high-quality-41.png_220x220.png_.webp",
    title:
      "Beginner Guitar Mahogany Acoustic 6-Strings Rosewood Red 40-Pine Mute Students",
    price: "US $873.27",
    category: "Buy guitar and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/HTB1rDpGcQ5E3KVjSZFCq6zuzXXa4/Kaspar-Chinese-Guitar-Factory-OEM-Cheap-Classical.jpg_220x220.jpg_.webp",
    title:
      "Forestwind guitar Double Neck 1275 model Electric guitar 6 string+12 string Combo",
    price: "US $1,000 - 1,300",
    category: "Buy guitar and get free shipping on AliExpress.com"
  },
  {
    imgSrc:
      "https://s.alicdn.com/@sc01/kf/Hb226aaf7cea64b7883986404eecfa22bL/High-Quality-guitar-41inch-acoustic-electric-guitar.jpg_220x220.jpg_.webp",
    title:
      "Suneye Guitar Black Handed Electrica Dean-Style Rosewood Fretboard Glossy-Finish Left",
    price: "US $398.70",
    category: "Buy guitar and get free shipping on AliExpress.com"
  }
];

class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      items: digitalPianos
    }
  }

  handleChange(event){
    console.log(event.target.value);
    switch(event.target.value) {
      case "digitalPianos":{
        this.setState({
          items: digitalPianos,
        })
        break;
      }
      case "guitars":{
        this.setState({
          items: guitars,
        })
        break;
      }
    }
  };

  render(){
    return (
      <>
        <Header />
        <select onChange={this.handleChange.bind(this)}>
          <option value="digitalPianos">Digital Pianos</option>
          <option value="guitars">Guitars</option>
        </select>
        <ItemList items={this.state.items} />
      </>
    )
  }
}

ReactDOM.render(
  <App/>, 
  root
);
