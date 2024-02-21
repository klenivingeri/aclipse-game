const $ = (tag) => document.querySelector(tag)

const cnv = $('canvas')
cnv.width = innerWidth
cnv.height = innerHeight

const ctx = cnv.getContext('2d')

const player = new Player(cnv.width/2, cnv.height/2, 30, 'white')

let projectiles = []
const shootingSpeed = 4

cnv.addEventListener('click', (e) => {
    e.preventDefault()
    //retorna o angulo entre o player e o ponteiro do mouse
    const angle = Math.atan2(e.clientY - player.y, e.clientX -player.x)
    const velocity = {
        x: Math.cos(angle) * shootingSpeed,
        y: Math.sin(angle) * shootingSpeed
    }

    projectiles.push(new Projectile(player.x, player.y, 3, '#48FCFF', velocity))
    console.log(projectiles.length)
})

function checkOffScreen(projectile, index) {
    const saiuPelaEsquerda = projectile.x + projectile.radius < 0
    const saiuPelaDireita =  projectile.x - projectile.radius > cnv.width
    const saiuPorCima =  projectile.y + projectile.radius < 0
    const saiuPorBaixo =  projectile.y - projectile.radius > cnv.height

    if(saiuPelaEsquerda || saiuPelaDireita || saiuPorCima || saiuPorBaixo) {
        projectiles.splice(index, 1);
        console.log(projectiles.length)
    }
}

function checkProjectiles(){
    for (let i = projectiles.length -1; i >= 0; i--) {
        const p = projectiles[i]
        p.update()
        checkOffScreen(p, i)
    }
}

function update() {
    ctx.fillStyle = 'rgba(0,0,0,.1)'
    ctx.fillRect(0,0,cnv.width,cnv.height)

    checkProjectiles()
    player.update()
}


function loop() {
    requestAnimationFrame(loop, cnv)
    update()
    player.draw()
}
loop()