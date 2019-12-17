const axios = require('axios')
const cheerio = require('cheerio')
const log = console.log

const getHTML = async() => {
    try {
        return await axios.get('http://sunin.icehs.kr/foodlist.do?m=020705&s=sunin')
    } catch (error) {
        console.error(error)
    }
}

getHTML()
    .then(html => {
        let ulList = []
        const $ = cheerio.load(html.data)
        const $bodyList = $("div#con_body div.tb_base_box table.tb_calendar tbody").children('tr')

        $bodyList.each(function(i, elem) {
            ulList[i] = {
                day: $(this).find('th span').text(),
                foodList: $(this).find('td ul').text()
                    // url: $(this).find('strong.news-tl a').attr('href'),
                    // image_url: $(this).find('p.poto a img').attr('src'),
                    // image_alt: $(this).find('p.poto a img').attr('alt'),
                    // summary: $(this).find('p.lead').text().slice(0, -11),
                    // date: $(this).find('span.p-time').text()
            }
        })

        const data = ulList.filter(n => n.day)
        return data
    })
    .then(res => log(res))