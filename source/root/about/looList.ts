const jpgs = import.meta.glob('./list/*.jpg')
const list = Object.entries(jpgs).map((v, i) => {
  const coverUrl = new URL(`./list/l00${(10000 + i).toString().slice(1)}.jpg`, import.meta.url).href
  return coverUrl
})
export default list