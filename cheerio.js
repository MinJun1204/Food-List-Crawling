const request = require('request-promise')
const cheerio = require('cheerio')
const v = require('voca')

request('http://sunin.icehs.kr/foodlist.do?m=020705&s=sunin').then(function(html) {

    // Cheerio 오브젝트 생성
    const $ = cheerio.load(html)

    // 셀렉터 캐시로 Cheerio 오브젝트 생성
    const $articleList = $('html')

    console.log($articleList.html())
})