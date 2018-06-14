export class EmojisModel {
  name: string;
  url: string;
  isDeleted: boolean = false;
  isFavored: boolean = false;

  constructor(name, url) {
    this.name = name;
    this.url = url;
    this.isFavored = this.isDeleted = false;
  }
}
