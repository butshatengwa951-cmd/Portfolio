<template>
  <div ref="container" class="scene-container"></div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const props = defineProps({
  discovered: { type: Set, required: true },
  portfolio: { type: Object, required: true }
})

const emit = defineEmits(['select', 'discover'])
const container = ref(null)

let scene
let camera
let renderer
let controls
let raycaster
let mouse
let animationId
let clock
let resizeHandler
let pointerMoveHandler
let pointerDownHandler
let pointerUpHandler
let clickHandler

const objects = []
const strings = []
const portrait = { mesh: null, pin: null, texture: null, state: -1 }
let pointerDownAt = 0

function textureFromCanvas(draw, width = 700, height = 700) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  draw(ctx, canvas)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
  return texture
}

function makePaperTexture(title, lines = [], tone = '#eee6d7') {
  return textureFromCanvas((ctx, canvas) => {
    ctx.fillStyle = tone
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < 15000; i++) {
      const alpha = Math.random() * 0.035
      ctx.fillStyle = 'rgba(30,25,18,' + alpha + ')'
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1.5, 1.5)
    }

    ctx.fillStyle = '#151411'
    ctx.font = '700 34px JetBrains Mono'
    ctx.fillText(title, 46, 68)

    ctx.fillStyle = '#5f584e'
    ctx.font = '17px JetBrains Mono'
    lines.forEach((line, index) => {
      ctx.fillText(line, 46, 116 + index * 32)
    })

    ctx.strokeStyle = 'rgba(30,25,18,.16)'
    ctx.beginPath()
    ctx.moveTo(46, 88)
    ctx.lineTo(canvas.width - 46, 88)
    ctx.stroke()
  })
}

function makePolaroidTexture(name, subtitle) {
  return textureFromCanvas((ctx, canvas) => {
    ctx.fillStyle = '#f7f0e6'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#161616'
    ctx.fillRect(34, 34, 632, 438)

    ctx.fillStyle = '#414141'
    ctx.font = '14px JetBrains Mono'
    ctx.fillText('EVIDENCE PHOTO // ' + name, 52, 64)

    ctx.fillStyle = '#111'
    ctx.textAlign = 'center'
    ctx.font = '700 34px Special Elite'
    ctx.fillText(name, 350, 542)

    ctx.font = '16px JetBrains Mono'
    ctx.fillStyle = '#6f675d'
    ctx.fillText(subtitle, 350, 578)
    ctx.textAlign = 'left'
  })
}

function makeWoodTexture() {
  return textureFromCanvas((ctx, canvas) => {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#5a3a28')
    gradient.addColorStop(.5, '#432a1f')
    gradient.addColorStop(1, '#2e1c15')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Broad wood grain.
    for (let band = 0; band < 34; band++) {
      const y = (band / 34) * canvas.height
      ctx.strokeStyle = `rgba(18, 9, 6, ${0.18 + Math.random() * 0.12})`
      ctx.lineWidth = 3 + Math.random() * 9
      ctx.beginPath()
      ctx.moveTo(0, y)

      for (let x = 0; x <= canvas.width; x += 90) {
        const wave = Math.sin((x / canvas.width) * Math.PI * (1.2 + Math.random())) * 18
        ctx.quadraticCurveTo(
          x + 45,
          y + wave,
          x + 90,
          y + Math.sin(x * .018 + band) * 9
        )
      }

      ctx.stroke()
    }

    // Fine scratches and pores.
    for (let i = 0; i < 1400; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const len = 8 + Math.random() * 35
      ctx.strokeStyle = `rgba(240, 202, 165, ${Math.random() * 0.055})`
      ctx.lineWidth = .5 + Math.random() * 1.2
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + len, y + (Math.random() - .5) * 2)
      ctx.stroke()
    }

    // Soft vignette so the board feels lit from the centre.
    const vignette = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      canvas.height * .12,
      canvas.width / 2,
      canvas.height / 2,
      canvas.height * .7
    )
    vignette.addColorStop(0, 'rgba(255, 218, 175, .08)')
    vignette.addColorStop(1, 'rgba(0, 0, 0, .34)')
    ctx.fillStyle = vignette
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, 1200, 900)
}

function makePortraitTexture(src, state) {
  return new Promise(resolve => {
    const canvas = document.createElement('canvas')
    canvas.width = 700
    canvas.height = 860
    const ctx = canvas.getContext('2d')

    const drawFallback = () => {
      ctx.fillStyle = '#242321'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.textAlign = 'center'
      ctx.fillStyle = '#9d978e'
      ctx.font = '700 130px Special Elite'
      ctx.fillText('BT', 350, 450)
      ctx.fillStyle = '#c5bcae'
      ctx.font = '16px JetBrains Mono'
      ctx.fillText(state >= 2 ? 'IDENTITY: BUTSHA TENGWA' : 'IDENTITY UNCONFIRMED', 350, 790)
      ctx.textAlign = 'left'
      finish()
    }

    const finish = () => {
      const texture = new THREE.CanvasTexture(canvas)
      texture.colorSpace = THREE.SRGBColorSpace
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
      resolve(texture)
    }

    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      ctx.fillStyle = '#171615'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.save()

      if (state === 0) {
        ctx.filter = 'grayscale(1) blur(5px) brightness(.64) contrast(.86)'
      } else if (state === 1) {
        ctx.filter = 'grayscale(1) blur(2.4px) brightness(.7) contrast(.96)'
      } else {
        ctx.filter = 'grayscale(.88) contrast(1.08) brightness(.78)'
      }

      const scale = Math.max(canvas.width / image.width, canvas.height / image.height)
      const w = image.width * scale
      const h = image.height * scale
      ctx.drawImage(image, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h)
      ctx.restore()

      ctx.fillStyle = state < 2 ? 'rgba(8,8,8,.26)' : 'rgba(8,8,8,.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (state < 2) {
        ctx.fillStyle = 'rgba(10,10,10,.38)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.textAlign = 'center'
        ctx.strokeStyle = '#eee4d6'
        ctx.lineWidth = 5
        ctx.font = '700 118px Special Elite'
        ctx.strokeText('?', 350, 430)
        ctx.fillStyle = '#f1e8dc'
        ctx.fillText('?', 350, 430)

        ctx.font = '15px JetBrains Mono'
        ctx.fillStyle = '#c8bcab'
        ctx.fillText('IDENTITY UNCONFIRMED', 350, 792)
        ctx.textAlign = 'left'
      } else {
        ctx.fillStyle = '#e4d9c8'
        ctx.font = '15px JetBrains Mono'
        ctx.fillText('IDENTITY: BUTSHA TENGWA', 40, 810)
      }

      finish()
    }

    image.onerror = drawFallback

    if (src) {
      image.src = src
    } else {
      drawFallback()
    }
  })
}

function createPushPin(color = '#b32626', scale = 1) {
  const group = new THREE.Group()

  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12 * scale, 0.1 * scale, 0.035 * scale, 18),
    new THREE.MeshStandardMaterial({
      color: '#732020',
      metalness: .38,
      roughness: .32
    })
  )
  base.position.z = .075 * scale
  base.castShadow = true

  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.028 * scale, 0.035 * scale, 0.16 * scale, 12),
    new THREE.MeshStandardMaterial({
      color: '#b7b0a7',
      metalness: .72,
      roughness: .2
    })
  )
  stem.position.z = .15 * scale
  stem.castShadow = true

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.09 * scale, 18, 14),
    new THREE.MeshStandardMaterial({
      color,
      metalness: .18,
      roughness: .28
    })
  )
  head.scale.set(1, 1, .78)
  head.position.z = .25 * scale
  head.castShadow = true

  group.add(base, stem, head)
  return group
}

function addEvidence({ id, pos, size, texture, rotation = 0, pinColor = '#b32626', pinScale = 1, type = 'evidence', opacity = 1 }) {
  const geometry = new THREE.PlaneGeometry(size[0], size[1])
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    transparent: true,
    opacity,
    roughness: .9,
    metalness: .02,
    side: THREE.DoubleSide
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(pos[0], pos[1], pos[2] ?? .08)
  mesh.rotation.z = rotation
  mesh.castShadow = true
  mesh.userData = { id, type }
  scene.add(mesh)

  const pin = createPushPin(pinColor, pinScale)
  pin.position.set(
    pos[0] - size[0] * .23,
    pos[1] + size[1] / 2 - .055,
    (pos[2] ?? .08) + .01
  )
  scene.add(pin)

  objects.push({ mesh, id, baseScale: 1, pin })
  return { mesh, pin }
}

function getObject(id) {
  return objects.find(item => item.id === id)?.mesh
}

function makeStringCurve(from, to) {
  const start = from.position.clone()
  const end = to.position.clone()

  start.z = .055
  end.z = .055

  const direction = end.clone().sub(start)
  const length = Math.max(.1, Math.hypot(direction.x, direction.y))
  const normal = new THREE.Vector3(-direction.y, direction.x, 0).normalize()

  const bend = Math.min(.18, length * .035)
  const middle = start.clone().lerp(end, .5).add(normal.multiplyScalar(bend))
  middle.z = .06

  return new THREE.CatmullRomCurve3(
    [start, middle, end],
    false,
    'centripetal'
  )
}

function addString(fromId, toId, color = '#9f2424') {
  const from = getObject(fromId)
  const to = getObject(toId)
  if (!from || !to) return

  const line = new THREE.Line(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: .78
    })
  )

  line.userData = { fromId, toId }
  scene.add(line)
  strings.push(line)

  updateString(line)
}

function updateString(line) {
  const from = getObject(line.userData.fromId)
  const to = getObject(line.userData.toId)
  if (!from || !to) return

  line.geometry.setFromPoints(
    makeStringCurve(from, to).getPoints(12)
  )
  line.geometry.attributes.position.needsUpdate = true
}

async function refreshPortrait(state) {
  if (!portrait.mesh || portrait.state === state) return
  portrait.state = state

  const nextTexture = await makePortraitTexture(props.portfolio.person.portrait, state)

  if (portrait.texture) portrait.texture.dispose()
  portrait.texture = nextTexture
  portrait.mesh.material.map = nextTexture
  portrait.mesh.material.needsUpdate = true
}

onMounted(async () => {
  scene = new THREE.Scene()
  scene.background = new THREE.Color('#080807')

  const aspect = window.innerWidth / window.innerHeight
  const frustum = window.innerWidth < 800 ? 11.5 : 9.9

  camera = new THREE.OrthographicCamera(
    -(frustum * aspect) / 2,
    (frustum * aspect) / 2,
    frustum / 2,
    -frustum / 2,
    .1,
    100
  )
  camera.position.set(0, .55, 8.5)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.06
  container.value.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = .075
  controls.enablePan = false
  controls.minDistance = 5.6
  controls.maxDistance = 11
  controls.minPolarAngle = 1.15
  controls.maxPolarAngle = 1.72
  controls.target.set(0, 0, 0)

  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector2()
  clock = new THREE.Clock()

  scene.add(new THREE.HemisphereLight('#d8d0c5', '#070707', .72))

  const lamp = new THREE.PointLight('#ffc27d', 3.4, 20)
  lamp.position.set(-3.6, 4.8, 4.8)
  lamp.castShadow = true
  lamp.shadow.mapSize.set(1024, 1024)
  scene.add(lamp)

  const fill = new THREE.DirectionalLight('#f5e7d6', .34)
  fill.position.set(4, 5, 3)
  scene.add(fill)

  const woodTexture = makeWoodTexture()

  const board = new THREE.Mesh(
    new THREE.PlaneGeometry(15.2, 9.35),
    new THREE.MeshStandardMaterial({
      map: woodTexture,
      color: '#7a5137',
      roughness: .82,
      metalness: .01
    })
  )
  board.receiveShadow = true
  scene.add(board)

  const boardFrame = new THREE.Mesh(
    new THREE.BoxGeometry(15.68, 9.84, .30),
    new THREE.MeshStandardMaterial({
      color: '#24150f',
      roughness: .78,
      metalness: .02
    })
  )
  boardFrame.position.z = -.18
  boardFrame.receiveShadow = true
  scene.add(boardFrame)

  const innerFrameMaterial = new THREE.MeshStandardMaterial({
    color: '#6a432c',
    roughness: .72
  })

  const topRail = new THREE.Mesh(
    new THREE.BoxGeometry(15.35, .16, .11),
    innerFrameMaterial
  )
  topRail.position.set(0, 4.53, .055)

  const bottomRail = topRail.clone()
  bottomRail.position.y = -4.53

  const leftRail = new THREE.Mesh(
    new THREE.BoxGeometry(.16, 9.04, .11),
    innerFrameMaterial
  )
  leftRail.position.set(-7.60, 0, .055)

  const rightRail = leftRail.clone()
  rightRail.position.x = 7.60

  scene.add(topRail, bottomRail, leftRail, rightRail)

  const caseFile = makePaperTexture(
    'CASE FILE 001',
    [
      'BUTSHA TENGWA',
      'SUBJECT: DEVELOPER',
      'STATUS: OPEN',
      'EVIDENCE: INCOMPLETE'
    ]
  )

  addEvidence({
    id: 'casefile',
    pos: [0, 2.55, .11],
    size: [1.95, 1.34],
    texture: caseFile,
    rotation: -.018,
    pinScale: 1.08
  })

  const stock = makePolaroidTexture('STOCKWELL', 'Vue • PayFast • Node')
  addEvidence({
    id: 'stockwell',
    pos: [-4.15, 1.55, .13],
    size: [1.78, 2.12],
    texture: stock,
    rotation: -.07,
    pinScale: 1.06
  })

  const voya = makePolaroidTexture('VOYA BITE', 'Travel • Booking • Web')
  addEvidence({
    id: 'voyabite',
    pos: [-3.85, -1.85, .13],
    size: [1.7, 1.96],
    texture: voya,
    rotation: .065,
    pinScale: 1.02
  })

  const person = makePaperTexture(
    'PERSON OF INTEREST',
    [
      'BUTSHA TENGWA',
      'ROLE: DEVELOPER / STUDENT',
      'LOCATION: SOUTH AFRICA',
      'OBJECTIVE: BUILD BETTER'
    ],
    '#dce6ee'
  )
  addEvidence({
    id: 'person',
    pos: [3.75, 1.55, .13],
    size: [1.86, 1.2],
    texture: person,
    rotation: -.035,
    pinColor: '#68635e'
  })

  const skills = [
    ['vue', [-1.95, .25], '#f1dfaa'],
    ['js', [-1.9, -.65], '#f1dfaa'],
    ['payfast', [-2.05, -1.68], '#e7c6a4'],
    ['node', [2.05, -.9], '#e7c6a4'],
    ['three', [1.9, 2.55], '#f1dfaa']
  ]

  for (const [id, pos, tone] of skills) {
    const skill = props.portfolio.skills.find(item => item.id === id)
    if (!skill) continue

    addEvidence({
      id: skill.id,
      pos: [pos[0], pos[1], .12],
      size: [.94, .62],
      texture: makePaperTexture(
        'EVIDENCE TAG',
        [skill.name, 'LEVEL: ' + skill.level, 'LINKS: ' + skill.foundIn.length + ' PROJECTS'],
        tone
      ),
      rotation: (Math.random() - .5) * .10,
      pinColor: '#77716b',
      pinScale: .78
    })
  }

  const portraitTexture = await makePortraitTexture(
    props.portfolio.person.portrait,
    0
  )

  const portraitResult = addEvidence({
    id: 'portrait',
    pos: [0, -.2, .15],
    size: [2.25, 2.72],
    texture: portraitTexture,
    rotation: .018,
    pinColor: '#b32626',
    pinScale: 1.15
  })

  portrait.mesh = portraitResult.mesh
  portrait.pin = portraitResult.pin
  portrait.texture = portraitTexture
  portrait.state = 0

  const classified = makePaperTexture(
    'CLASSIFIED',
    [
      'CASE NOTE #07',
      'PAYMENT FLOW',
      'ACCESS: RESTRICTED',
      'UNLOCK: 3 CLUES'
    ],
    '#242322'
  )

  addEvidence({
    id: 'classified',
    pos: [-.55, -2.78, .11],
    size: [1.35, .9],
    texture: classified,
    rotation: -.025,
    pinColor: '#161616',
    opacity: .38
  })

  // Every thread represents a real relationship on the board.
  addString('casefile', 'portrait')    // the case is the identity investigation
  addString('casefile', 'stockwell')   // project under investigation
  addString('casefile', 'voyabite')    // project under investigation
  addString('casefile', 'person')      // subject of the case
  addString('casefile', 'three')       // this portfolio uses Three.js

  addString('portrait', 'person')      // portrait identifies the subject
  addString('portrait', 'stockwell')   // subject built StockWell
  addString('portrait', 'voyabite')    // subject built Voya Bite
  addString('portrait', 'classified')  // personal development note

  addString('stockwell', 'vue')        // StockWell uses Vue
  addString('stockwell', 'js')         // StockWell uses JavaScript
  addString('stockwell', 'payfast')    // StockWell uses PayFast
  addString('stockwell', 'node')       // StockWell uses Node.js
  addString('stockwell', 'classified') // classified note documents the payment issue

  addString('voyabite', 'vue')         // Voya Bite uses Vue
  addString('voyabite', 'js')          // Voya Bite uses JavaScript

  pointerMoveHandler = event => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const hit = raycaster.intersectObjects(objects.map(item => item.mesh), false)[0]

    document.body.style.cursor = hit ? 'pointer' : 'grab'

    objects.forEach(item => {
      const target = hit && hit.object === item.mesh ? 1.045 : 1
      item.mesh.scale.x += (target - item.mesh.scale.x) * .18
      item.mesh.scale.y += (target - item.mesh.scale.y) * .18
    })
  }

  pointerDownHandler = () => {
    pointerDownAt = performance.now()
  }

  pointerUpHandler = () => {
    if (performance.now() - pointerDownAt > 240) return
  }

  clickHandler = event => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const hit = raycaster.intersectObjects(objects.map(item => item.mesh), false)[0]

    if (!hit) return

    const id = hit.object.userData.id
    emit('select', id)
    emit('discover', id)
  }

  resizeHandler = () => {
    const nextAspect = window.innerWidth / window.innerHeight
    const nextFrustum = window.innerWidth < 800 ? 11.5 : 9.9

    camera.left = -(nextFrustum * nextAspect) / 2
    camera.right = (nextFrustum * nextAspect) / 2
    camera.top = nextFrustum / 2
    camera.bottom = -nextFrustum / 2
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  window.addEventListener('mousemove', pointerMoveHandler)
  renderer.domElement.addEventListener('pointerdown', pointerDownHandler)
  renderer.domElement.addEventListener('pointerup', pointerUpHandler)
  renderer.domElement.addEventListener('click', clickHandler)
  window.addEventListener('resize', resizeHandler)

  function animate() {
    animationId = requestAnimationFrame(animate)
    const t = clock.getElapsedTime()

    objects.forEach((item, index) => {
      const baseZ = item.id === 'portrait' ? .15 : .10 + (index % 3) * .006
      item.mesh.position.z = baseZ + Math.sin(t * .55 + index * .6) * .008
    })

    const showClassified = props.discovered.size >= 3
    const classifiedItem = objects.find(item => item.id === 'classified')

    if (classifiedItem) {
      const targetOpacity = showClassified ? .95 : .38
      classifiedItem.mesh.material.opacity += (targetOpacity - classifiedItem.mesh.material.opacity) * .1
    }

    strings.forEach(line => {
      updateString(line)
    })

    controls.update()
    renderer.render(scene, camera)
  }

  animate()
})

watch(
  () => props.discovered.size,
  value => {
    const state = value >= 8 ? 2 : value >= 3 ? 1 : 0
    refreshPortrait(state)
  }
)

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)

  if (pointerMoveHandler) window.removeEventListener('mousemove', pointerMoveHandler)
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)

  if (renderer?.domElement) {
    renderer.domElement.removeEventListener('pointerdown', pointerDownHandler)
    renderer.domElement.removeEventListener('pointerup', pointerUpHandler)
    renderer.domElement.removeEventListener('click', clickHandler)
  }

  objects.forEach(item => {
    item.mesh.geometry.dispose()
    item.mesh.material.dispose()
    item.pin?.children?.forEach(child => {
      child.geometry?.dispose()
      child.material?.dispose()
    })
  })

  strings.forEach(line => {
    line.geometry.dispose()
    line.material.dispose()
  })

  portrait.texture?.dispose()
  woodTexture?.dispose()
  controls?.dispose()
  renderer?.dispose()
})
</script>

<style scoped>
.scene-container{
  width:100%;
  height:100%;
  cursor:grab;
}
.scene-container:active{
  cursor:grabbing;
}
.scene-container canvas{
  display:block;
  width:100%;
  height:100%;
}
</style>
