<template>
  <div ref="container" class="scene-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const props = defineProps({ discovered: Set, portfolio: Object })
const emit = defineEmits(['select','discover'])
const container = ref(null)

let scene, camera, renderer, controls, raycaster, mouse
let objects = [] // {mesh, id}
let strings = []
let animationId

function makePaperTexture(bg='#f4efe6', textLines=[]){
  const c = document.createElement('canvas'); c.width=512; c.height=700
  const ctx = c.getContext('2d')
  ctx.fillStyle=bg; ctx.fillRect(0,0,c.width,c.height)
  // noise
  for(let i=0;i<8000;i++){ ctx.fillStyle=`rgba(0,0,0,${Math.random()*0.04})`; ctx.fillRect(Math.random()*c.width, Math.random()*c.height,2,2) }
  ctx.fillStyle='#1a1a1a'; ctx.font='bold 28px JetBrains Mono'; ctx.textAlign='left'
  textLines.forEach((l,i)=>{ ctx.fillText(l, 30, 50+i*38) })
  const tex = new THREE.CanvasTexture(c); tex.colorSpace=THREE.SRGBColorSpace; return tex
}

function makePolaroidTexture(title, subtitle){
  const c=document.createElement('canvas'); c.width=400; c.height=500
  const ctx=c.getContext('2d')
  ctx.fillStyle='#faf6ef'; ctx.fillRect(0,0,c.width,c.height)
  // photo area
  ctx.fillStyle='#111'; ctx.fillRect(20,20,c.width-40,300)
  ctx.fillStyle='#333'; ctx.font='12px JetBrains Mono'; ctx.fillText('IMG_'+title+'.JPG',30,40)
  // handwritten label
  ctx.fillStyle='#111'; ctx.font='22px Special Elite'; ctx.textAlign='center'
  ctx.fillText(title, c.width/2, 380)
  ctx.font='12px JetBrains Mono'; ctx.fillStyle='#555'; ctx.fillText(subtitle, c.width/2, 410)
  const tex=new THREE.CanvasTexture(c); tex.colorSpace=THREE.SRGBColorSpace; return tex
}

onMounted(()=>{
  scene = new THREE.Scene()
  scene.background = new THREE.Color('#0a0a0b')

  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100)
  camera.position.set(0,0.6,5.2)

  renderer = new THREE.WebGLRenderer({ antialias:true, alpha:false })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
  renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap
  container.value.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping=true; controls.dampingFactor=0.08
  controls.minDistance=2; controls.maxDistance=9
  controls.maxPolarAngle=Math.PI/2.2; controls.target.set(0,0,0)

  raycaster=new THREE.Raycaster(); mouse=new THREE.Vector2()

  // lights
  scene.add(new THREE.AmbientLight('#222233',0.7))
  const warm = new THREE.PointLight('#ffcc88',1.8,12); warm.position.set(-2.5,3.5,3); warm.castShadow=true; scene.add(warm)
  const dir = new THREE.DirectionalLight('#ffffff',0.4); dir.position.set(2,3,2); scene.add(dir)

  // board
  const boardGeo=new THREE.PlaneGeometry(12,8)
  const boardMat=new THREE.MeshStandardMaterial({ color:'#2a211c', roughness:0.9, metalness:0.05 })
  const board=new THREE.Mesh(boardGeo, boardMat); board.receiveShadow=true; scene.add(board)
  // frame
  const frameGeo=new THREE.BoxGeometry(12.4,8.4,0.25); const frameMat=new THREE.MeshStandardMaterial({color:'#1c1814', roughness:0.8}); const frame=new THREE.Mesh(frameGeo, frameMat); frame.position.z=-0.16; frame.receiveShadow=true; scene.add(frame)

  // helper to add object
  function addEvidence({id, pos, size=[1.2,0.8], tex, rot=0, pinColor='#c0392b'}){
    const geo=new THREE.PlaneGeometry(size[0], size[1])
    const mat=new THREE.MeshStandardMaterial({ map:tex, transparent:true, roughness:0.8, side:THREE.DoubleSide })
    const mesh=new THREE.Mesh(geo, mat); mesh.position.set(pos[0], pos[1], 0.02+Math.random()*0.02); mesh.rotation.z=rot; mesh.castShadow=true; mesh.userData.id=id
    scene.add(mesh); objects.push({mesh,id})
    // pin
    const pinGeo=new THREE.SphereGeometry(0.06,16,16); const pinMat=new THREE.MeshStandardMaterial({color:pinColor, metalness:0.3, roughness:0.4})
    const pin=new THREE.Mesh(pinGeo, pinMat); pin.position.set(pos[0], pos[1]+size[1]/2-0.08, 0.12); pin.castShadow=true; scene.add(pin)
    return mesh
  }

  // CASE FILE central
  const caseTex=makePaperTexture('#e8e0d0',['CASE FILE','────────','BUTSHA TENGWA','STATUS: OPEN','TYPE: DEVELOPER','REF: 001'])
  addEvidence({id:'casefile', pos:[0,0.4], size:[1.6,1.0], tex:caseTex, rot:0.02})

  // PROJECTS
  const stockTex=makePolaroidTexture('STOCKWELL','Vue • PayFast • E-commerce')
  addEvidence({id:'stockwell', pos:[-3.2,1.0], size:[1.3,1.5], tex:stockTex, rot:-0.08})
  const voyaTex=makePolaroidTexture('VOYA BITE','Vue • Firebase • Food')
  addEvidence({id:'voyabite', pos:[-3.0,-1.4], size:[1.2,1.4], tex:voyaTex, rot:0.07})

  // SKILLS
  props.portfolio.skills.slice(0,4).forEach((s,i)=>{
    const tex=makePaperTexture('#f7e6b5',[`EVIDENCE TAG`,`────────`,`${s.name}`,`Found in:`,...s.foundIn.slice(0,2)])
    addEvidence({id:s.id, pos:[2.8 + (i%2)*1.2, 1.5 - Math.floor(i/2)*1.1], size:[0.9,0.55], tex, rot:(Math.random()-0.5)*0.15, pinColor:'#888'})
  })

  // PERSON OF INTEREST
  const poiTex=makePaperTexture('#d6e4f0',['PERSON OF INTEREST','────────','BUTSHA TENGWA','ROLE: Developer','OBJ: Build better','LOCATION: SA'])
  addEvidence({id:'person', pos:[2.5,-1.2], size:[1.4,0.9], tex:poiTex, rot:-0.04})

  // CLASSIFIED
  const classTex=makePaperTexture('#111',['██ CLASSIFIED ██','────────','CASE NOTE #07','ACCESS: RESTRICTED','🔒'])
  const classifiedMesh=addEvidence({id:'classified', pos:[0,-2.1], size:[1.1,0.6], tex:classTex, rot:0.03, pinColor:'#111'})
  classifiedMesh.material.opacity=0.4 // hidden initially

  // strings
  function addString(fromId, toId, visible=false){
    const a=objects.find(o=>o.id===fromId)?.mesh; const b=objects.find(o=>o.id===toId)?.mesh
    if(!a||!b) return
    const pts=[a.position.clone(), b.position.clone()]; pts[0].z+=0.05; pts[1].z+=0.05
    const geo=new THREE.BufferGeometry().setFromPoints(pts)
    const mat=new THREE.LineBasicMaterial({color:'#a41d1d', transparent:true, opacity: visible?0.9:0})
    const line=new THREE.Line(geo, mat); line.userData={fromId,toId}; scene.add(line); strings.push(line)
  }
  addString('casefile','stockwell', true)
  addString('stockwell','payfast', false)
  addString('stockwell','vue', false)
  addString('casefile','person', true)
  addString('voyabite','vue', false)
  addString('stockwell','classified', false)

  // interaction
  function onMouseMove(e){
    mouse.x=(e.clientX/window.innerWidth)*2-1; mouse.y=-(e.clientY/window.innerHeight)*2+1
    raycaster.setFromCamera(mouse,camera)
    const intersects=raycaster.intersectObjects(objects.map(o=>o.mesh))
    document.body.style.cursor = intersects.length ? 'pointer' : 'default'
    objects.forEach(o=>{ o.mesh.scale.set(1,1,1) })
    if(intersects[0]){ intersects[0].object.scale.set(1.06,1.06,1) }
  }
  function onClick(e){
    mouse.x=(e.clientX/window.innerWidth)*2-1; mouse.y=-(e.clientY/window.innerHeight)*2+1
    raycaster.setFromCamera(mouse,camera)
    const intersects=raycaster.intersectObjects(objects.map(o=>o.mesh))
    if(intersects[0]){ emit('select', intersects[0].object.userData.id); emit('discover', intersects[0].object.userData.id) }
  }
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('click', onClick)
  window.addEventListener('resize', ()=>{ camera.aspect=window.innerWidth/window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight) })

  // animate
  const clock=new THREE.Clock()
  function animate(){
    animationId=requestAnimationFrame(animate)
    const t=clock.getElapsedTime()
    // subtle float
    objects.forEach((o,i)=>{ o.mesh.position.z = 0.02 + Math.sin(t*0.6 + i)*0.02 })
    // update strings visibility based on discovered
    strings.forEach(s=>{
      const shouldShow = props.discovered.has(s.userData.fromId) && props.discovered.has(s.userData.toId)
      s.material.opacity = THREE.MathUtils.lerp(s.material.opacity, shouldShow?0.9:0, 0.05)
      // update positions (follow meshes)
      const a=objects.find(o=>o.id===s.userData.fromId)?.mesh; const b=objects.find(o=>o.id===s.userData.toId)?.mesh
      if(a&&b){ s.geometry.setFromPoints([a.position.clone().add(new THREE.Vector3(0,0,0.05)), b.position.clone().add(new THREE.Vector3(0,0,0.05))]); s.geometry.attributes.position.needsUpdate=true }
    })
    // reveal classified when 3 discovered
    const cm=objects.find(o=>o.id==='classified')?.mesh
    if(cm){ const target = props.discovered.size>=3 ? 1 : 0.35; cm.material.opacity = THREE.MathUtils.lerp(cm.material.opacity, target, 0.06) }
    controls.update(); renderer.render(scene,camera)
  }
  animate()

  // cleanup ref
  onBeforeUnmount(()=>{
    cancelAnimationFrame(animationId)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('click', onClick)
    renderer.dispose()
  })
})

watch(()=>props.discovered, ()=>{}, {deep:true})
</script>

<style scoped>
.scene-container{width:100%;height:100%}
</style>
