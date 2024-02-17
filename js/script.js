const $ = (tag) => document.querySelector(tag)

const cnv = $('canvas')
cnv.width = innerWidth
cnv.height = innerHeight

const ctx = cnv.getContext('2d')

const player = new Sprite(cnv.width/2, cnv.height/2, 30, 'BLUE')

function update() {
    ctx.fillStyle = 'rgba(0,0,0,1)'
    ctx.fillRect(0,0,cnv.width,cnv.height)
}

function loop() {
    requestAnimationFrame(loop, cnv)
    update()
    player.draw()
}
loop()