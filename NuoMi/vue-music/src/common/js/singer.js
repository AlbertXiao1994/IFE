export default class Singer {
  constructor({id, name}) {
    this.id = id
    this.name = name
    this.avatar_s = `https://y.gtimg.cn/music/photo_new/T001R150x150M000${id}.jpg?max_age=2592000`
    this.avatar_m = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}