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
    if (item.name == 'Sulfuras, Hand of Ragnaros') return
    

    if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (item.quality > 0) {
        item.quality -= 1
      }
    } else {
      if (item.quality < 50) {
        item.quality += 1
        if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.sellIn < 11) {
            if (item.quality < 50) {
              item.quality += 1
            }
          }
          if (item.sellIn < 6) {
            if (item.quality < 50) {
              item.quality += 1
            }
          }
        }
      }
    }
    
    item.sellIn -= 1;

    if (item.sellIn < 0) {
      if (item.name != 'Aged Brie') {
        if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.quality > 0) {
            item.quality -= 1
          }
        } else {
          item.quality = 0 // Quality drops to 0 after the concert
        }
      } else {
        if (item.quality < 50) {
          item.quality += 1
        }
      }
    }
  }
}
