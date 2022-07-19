$(function () {
    function fontSize(el) {
        let el_height
            , text_height
            , font_size
            , base_size = Math.floor(window.innerHeight / 25)
        el.style.fontSize = `${base_size}px`
        function variable() {
            el_height = el.clientHeight
            text_height = el.scrollHeight
            font_size = parseFloat(window.getComputedStyle(el).getPropertyValue('font-size'))
        }
        variable()
        if (text_height <= el_height) {
            el.style.height = 'auto'
        } else {
            for (let i = 0; i < base_size; i++) {
                variable()
                if (text_height == el_height) {
                    el.style.height = text_height
                    break
                }
                font_size -= 1
                el.style.fontSize = `${font_size}px`
            }
        }
        const under_bar = document.querySelectorAll('.under_bar')
        for (let i = 0; i < under_bar.length; i++) {
            under_bar[i].style.fontSize = `${font_size + 5}px`
        }
    }
    function listFontSize(els) {
        let el_height
            , text_height
            , font_size
            , most = 18
        function variable(el) {
            el_height = el.clientHeight
            text_height = el.scrollHeight
            font_size = parseFloat(window.getComputedStyle(el).getPropertyValue('font-size'))
        }
        for (let i = 0; i < els.length; i++) {
            els[i].style.fontSize = `${most}px`
            variable(els[i])
            for (let e = 0; e < font_size && text_height > el_height; e++) {
                variable(els[i])
                if (e == 0) {
                    font_size = 18
                }
                font_size -= 1
                els[i].style.fontSize = `${font_size}px`
                if (most > font_size) {
                    most = font_size
                }
            }
        }
        for (let i = 0; i < els.length; i++) {
            els[i].style.fontSize = `${most}px`
        }
    }
    function addCSSRule (selector, property) {
        let CSSRule = ''
        CSSRule += `<style>\n  ${selector} {\n`
        for (let i = 0; i < property.length; i++) {
            CSSRule += `    ${property[i][0]}:${property[i][1]};\n`
        }
        CSSRule += '  }\n</style>'
        $('#style_area').html(CSSRule)
        console.log(property.length)
    }
    const color1 = document.getElementById('color1')
    const svg = document.querySelector('.svg')
    const color2 = document.querySelectorAll('.link')
    window.addEventListener('scroll', function () {
        let scroll = window.pageYOffset
        if (scroll > window.innerHeight - 100) {
            color1.style.backgroundColor = 'var(--red-accent-clr)'
            svg.style.fill = '#ffffff'
            for (let i = 0; i < color2.length; i++) {
                color2[i].style.color = '#fff'
            }
        } else {
            color1.style.backgroundColor = '#F2F2F2'
            svg.style.fill = '#011931'
            for (let i = 0; i < color2.length; i++) {
                color2[i].style.color = '#011931'
            }
        }
    })
    let window_position_backup = 0
        , window_position = window.scrollY
        , difference
        , pc_menu = document.querySelector('.pc-menu')
        , head_height = window.innerHeight - 150
    window.addEventListener('scroll', function () {
        window_position_backup = window_position
        window_position = this.scrollY
        difference = window_position - window_position_backup
        if (window_position > head_height) {
            if (difference > 0) {
                pc_menu.style.top = '-60px'
            } else if (difference < 0) {
                pc_menu.style.top = '0px'
            }
        }
        if (window_position < this.window.innerHeight - 100) {
            addCSSRule('.pc-menu #color2 .link:hover,\n.pc-menu #color2 .link:focus', [
                ['background', '#800000'],
                ['color', '#fff !important']
            ])
        } else {
            $('#style_area').html('')
        }
    })
    const about_text = document.querySelector('.about_text')
    const links = document.querySelectorAll('ul#color2 a.link')
    fontSize(about_text)
    listFontSize(links)
    window.addEventListener('resize', function () {
        fontSize(about_text)
        listFontSize(links)
    })
})