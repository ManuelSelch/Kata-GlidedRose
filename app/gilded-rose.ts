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
    
    if(item.name == AGED_BRIE) {
      this.updateAgedBrieQuality(item);
    }

    else if(item.name == BACKSTAGE) {
      this.updateBackstageQuality(item);
    }

    else {
      if (item.quality > 0) {
        item.quality -= 1 // Quality of normal items drop
      }
    } 

    item.sellIn -= 1; // SellIn of every item drops

    if (item.sellIn < 0) {
      if (item.name != AGED_BRIE) {
        if (item.name != BACKSTAGE) {
          if (item.quality > 0) {
            item.quality -= 1
          }
        } else {
          item.quality = 0 // Quality drops to 0 after the concert
        }
      } else {
        if (item.quality < MAX_QUALITY) {
          item.quality += 1
        }
      }
    }
  }

  private updateAgedBrieQuality(item: Item) {
    if(item.quality < MAX_QUALITY) {
      item.quality += 1 // Quality of Aged Brie increase by 1
    }
  }

  private updateBackstageQuality(item: Item) {
    if(item.quality < MAX_QUALITY) {
      item.quality += 1 // Quality of Backstage increase by 1
      
      if (item.sellIn <= 10) {
        if (item.quality < MAX_QUALITY) {
          item.quality += 1 // Quality of Backstage increases by 2
        }
      }
      if (item.sellIn <= 5) {
        if (item.quality < MAX_QUALITY) {
          item.quality += 1 // Quality of Backstage increases by 3
        }
      }
    }
  }
}
