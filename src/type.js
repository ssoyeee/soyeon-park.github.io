'use strict';

new TypeIt('.home__title--strong', {
    loop: true,
    speed:100,
})
.pause(1000)
.delete()
.type('Passionate Software Engineer')
.pause(1000)
.delete()
.type('Backend Engineer')
.pause(1000)
.delete()
.type('Full-stack Engineer')
.pause(1000)
.delete()
.go();