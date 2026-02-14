export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const MAX_QUALITY = 50;
const AGED_BRIE = 'Aged Brie';
const BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.updateItem(this.items[i]);
    }

    return this.items;
  }

  private updateItem(item: Item) {
    // “Sulfuras”, being a legendary item, never has to be sold or decreases in Quality
    if (item.name == SULFURAS) return
    
    this.changeQuality(item);

    item.sellIn -= 1; // SellIn of every item drops

    // Quality changes twices as fast once sellIn is zero
    if(item.sellIn >= 0) return;

    if(item.name == BACKSTAGE) {
      item.quality = 0 // Quality drops to 0 after the concert
      return;
    } 

    this.changeQuality(item);
  }

  private changeQuality(item: Item) {
    // aged brie item
    if(item.name == AGED_BRIE) {
      this.increaseQuality(item);
      return;
    }

    // backstage item
    if(item.name == BACKSTAGE) {
      this.increaseBackstageQualityBySellIn(item);
      return;
    }

    // normal item
    this.decreaseQuality(item);
  }

  private increaseBackstageQualityBySellIn(item: Item) {
    this.increaseQuality(item);   // Quality of Backstage increase by 1
    
    if(item.sellIn <= 10)
      this.increaseQuality(item); // Quality of Backstage increases by 2

    if(item.sellIn <= 5)
      this.increaseQuality(item); // Quality of Backstage increases by 3
  }

  private increaseQuality(item: Item) {
    if(item.quality >= MAX_QUALITY) return;

    item.quality += 1 // Quality of Aged Brie increase by 1
  }

  private decreaseQuality(item: Item) {
    if (item.quality <= 0) return;

    item.quality -= 1 // Quality of normal items drop
  }
}
