<template>
  <div
    class="min-h-screen w-full relative overflow-x-hidden select-none"
    :style="{ backgroundColor: colors.walnut, fontFamily: "'JetBrains Mono', monospace" }"
  >
    <div
      class="pointer-events-none fixed inset-0 z-0"
      :style="{
        background:
          'radial-gradient(120% 90% at 50% 20%, rgba(214,166,111,0.08) 0%, transparent 50%),' +
          'radial-gradient(80% 60% at 20% 80%, rgba(0,0,0,0.4) 0%, transparent 70%),' +
          'repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0 1px, transparent 1px 3px),' +
          'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.55) 100%)'
      }"
    ></div>

    <div
      class="pointer-events-none fixed inset-0 z-[100]"
      :style="{
        opacity: 0.04,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")'
      }"
    ></div>

    <div
      v-if="!folderOpen"
      class="relative z-10 min-h-screen flex items-center justify-center p-4"
      style="perspective:1200px"
    >
      <div class="relative" :class="opening ? 'animate-open-folder' : closing ? 'animate-close-folder' : ''">
        <div
          class="absolute -bottom-10 left-6 right-6 h-16 blur-[18px] opacity-70"
          style="background:radial-gradient(ellipse, rgba(0,0,0,0.8) 0%, transparent 70%)"
        ></div>

        <div
          class="relative w-[86vw] sm:w-[92vw] max-w-[520px] h-[680px] sm:h-[700px] rounded-[6px] overflow-hidden flex flex-col"
          :style="{
            backgroundColor: colors.leather,
            border: '1px solid #1a1410',
            borderWidth: '1px 1px 2px 1px',
            boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 5px 15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
            backgroundImage:
              'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 20%),' +
              'radial-gradient(600px 400px at 30% 20%, rgba(214,166,111,0.08) 0%, transparent 60%)'
          }"
        >
          <div
            class="absolute inset-[8px] rounded-[3px] pointer-events-none"
            :style="{ border: '1px solid ' + colors.paper, opacity: 0.15 }"
          ></div>

          <div
            class="absolute top-0 left-8 right-8 h-[14px] rounded-b-[2px]"
            :style="{ background: colors.paperDark, opacity: 0.9, boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }"
          ></div>

          <div class="flex-1 flex flex-col items-center justify-between px-8 py-10 text-center relative z-10">
            <div class="w-full">
              <div
                class="text-[10px] tracking-[0.22em] font-medium"
                :style="{ color: colors.tan, fontFamily: "'JetBrains Mono', monospace" }"
              >
                PERSONAL PORTFOLIO — FILE NO. BT-001
              </div>

              <div
                class="mt-3 h-[1px] w-full"
                :style="{ background: 'linear-gradient(90deg, transparent, ' + colors.tan + ' 20%, ' + colors.tan + ' 80%, transparent)' }"
              ></div>
            </div>

            <div class="flex flex-col items-center gap-5 mt-2">
              <h1
                class="text-[38px] sm:text-[42px] leading-[0.9] tracking-[-0.02em]"
                :style="{ fontFamily: "'Special Elite', serif", color: colors.paper }"
              >
                BUTSHA<br />TENGWA
              </h1>

              <div class="relative mt-1">
                <div
                  class="w-[160px] h-[200px] bg-[#e8ddd0] relative overflow-hidden"
                  :style="{
                    border: '3px solid white',
                    boxShadow: '0 4px 18px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.3)',
                    transform: 'rotate(-1.2deg)'
                  }"
                >
                  <img
                    v-if="profilePhoto"
                    :src="profilePhoto"
                    alt="Butsha Tengwa"
                    class="absolute inset-0 w-full h-full object-cover grayscale"
                  />
                  <div
                    v-else
                    class="absolute inset-0"
                    style="background:linear-gradient(180deg,#ddd 0%,#c8b8a0 100%);filter:grayscale(1) contrast(1.1)"
                  ></div>

                  <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <div
                      class="w-[86px] h-[86px] rounded-full border border-black/10 flex items-center justify-center text-[36px] font-bold"
                      :style="{ fontFamily: "'Special Elite', serif", color: colors.ink, background: colors.paperInner }"
                    >
                      {{ profilePhoto ? '' : 'BT' }}
                    </div>
                    <div v-if="!profilePhoto" class="mt-3 text-[9px] tracking-[0.2em] text-black/60">
                      FILE PHOTO — 2024
                    </div>
                  </div>

                  <div
                    class="absolute inset-0 opacity-30 mix-blend-multiply pointer-events-none"
                    :style="{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.95'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")' }"
                  ></div>
                </div>

                <div
                  class="absolute -bottom-2 -right-2 px-2 py-[2px] text-[8px] tracking-widest bg-white text-black/70"
                  :style="{ fontFamily: "'JetBrains Mono', monospace", transform: 'rotate(1deg)' }"
                >
                  ATTACHED PHOTOGRAPH — FILE PHOTO
                </div>
              </div>

              <div class="mt-6 space-y-3 text-left w-[260px]">
                <div v-for="row in coverDetails" :key="row[0]" class="flex gap-4 text-[11px] leading-[1.2]">
                  <div class="w-[110px] text-[#d6a66f] tracking-[0.12em]">{{ row[0] }}</div>
                  <div class="text-[#eee6d7] font-medium">{{ row[1] }}</div>
                </div>

                <div class="flex gap-4 text-[11px] items-center">
                  <div class="w-[110px] text-[#d6a66f] tracking-[0.12em]">STATUS</div>
                  <div class="flex items-center gap-2 text-[#eee6d7]">
                    <span class="w-2 h-2 rounded-full bg-[#a32626] inline-block animate-pulse"></span>
                    OPEN TO OPPORTUNITIES
                  </div>
                </div>
              </div>
            </div>

            <div class="w-full flex flex-col items-center gap-4">
              <div
                class="border-[2px] border-[#a32626] text-[#a32626] px-4 py-1 text-[11px] tracking-[0.18em] font-bold"
                :style="{ transform: 'rotate(-2deg)', fontFamily: "'Special Elite', serif" }"
              >
                CLASSIFIED — OPEN ON REQUEST
              </div>
              <div class="text-[9px] tracking-[0.2em] text-[#d6a66f]/60">CASE 001 — EST. 2023</div>
            </div>
          </div>

          <button
            @click="openFolder"
            @mouseenter="tabHover = true"
            @mouseleave="tabHover = false"
            class="absolute top-[38%] right-0 translate-x-[68%] sm:translate-x-[calc(100%-14px)] sm:-right-[2px] flex items-center gap-2 pl-4 pr-5 sm:pl-5 sm:pr-6 py-3 cursor-pointer group z-20"
            :style="{
              background: colors.paperLight,
              border: '1px solid ' + colors.tan,
              borderLeft: 'none',
              boxShadow: tabHover ? '6px 8px 18px rgba(0,0,0,0.4)' : '4px 4px 12px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2)',
              borderRadius: '0 4px 4px 0',
              fontFamily: "'Special Elite', serif",
              transition: 'transform 200ms ease, box-shadow 200ms ease',
              transform: tabHover
                ? (window.innerWidth < 640 ? 'translateX(62%) translateY(-2px)' : 'translateX(calc(100% - 8px)) translateY(-2px)')
                : (window.innerWidth < 640 ? 'translateX(68%)' : 'translateX(calc(100% - 14px))')
            }"
          >
            <span class="text-[13px] tracking-[0.18em] text-[#11100e]">OPEN FILE</span>
            <span class="text-[14px] text-[#a32626] group-hover:translate-x-1 transition-transform">→</span>
            <span class="absolute left-0 top-0 bottom-0 w-[4px] bg-[#a32626]"></span>
          </button>

          <div v-if="opening" class="absolute inset-0 -z-10">
            <div
              class="absolute inset-0 animate-fan-1"
              :style="{ background: colors.paperLight, borderRadius: 6 }"
            ></div>
            <div
              class="absolute inset-0 animate-fan-2"
              :style="{ background: colors.paper, borderRadius: 6 }"
            ></div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.18em] text-[#d6a66f]/50">
        CLICK TAB TO OPEN • EVERYTHING LIVES INSIDE
      </div>
    </div>

    <div
      v-else
      class="relative z-10 min-h-screen flex items-start justify-center p-3 sm:p-6 md:p-10"
    >
      <div
        class="w-[96vw] max-w-[1100px] min-h-[82vh] relative"
        :class="closing ? 'animate-folder-close' : 'animate-folder-open'"
        :style="{
          backgroundColor: colors.paperLight,
          border: '14px solid ' + colors.leather,
          boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 5px 15px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(0,0,0,0.1)',
          borderRadius: '4px',
          backgroundImage:
            'radial-gradient(900px 500px at 20% 0%, rgba(214,166,111,0.08) 0%, transparent 60%),' +
            'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 12%)'
        }"
      >
        <div
          class="flex flex-wrap items-center justify-between gap-2 px-6 sm:px-9 py-4 border-b"
          :style="{
            borderColor: colors.tan,
            background: 'linear-gradient(180deg, ' + colors.paper + ' 0%, ' + colors.paperLight + ' 100%)'
          }"
        >
          <div class="flex items-center gap-4">
            <div class="text-[11px] tracking-[0.2em]" :style="{ fontFamily: "'Special Elite', serif" }">
              BUTSHA TENGWA — FILE: {{ activeFileIndexDisplay }}
            </div>
            <div class="hidden sm:flex items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-[#a32626]"></div>
              <div class="text-[9px] tracking-[0.15em] opacity-60">ACTIVE FILE</div>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="text-[9px] tracking-[0.2em] opacity-50">PERSONAL FILE — BT-001</div>
            <button
              @click="closeFolder"
              class="px-3 py-1 text-[10px] tracking-[0.16em] border bg-white hover:bg-[#fffdf7] transition-colors"
              :style="{ borderColor: colors.tan, fontFamily: "'Special Elite', serif" }"
            >
              CLOSE FILE ×
            </button>
          </div>
        </div>

        <div class="px-3 sm:px-6 pt-4 pb-0 flex flex-wrap gap-[2px] items-end overflow-x-auto">
          <button
            v-for="file in files"
            :key="file.id"
            @click="selectFile(file.id)"
            class="relative px-3 sm:px-4 py-2 text-[10px] sm:text-[11px] tracking-[0.12em] border-t border-l border-r transition-all"
            :class="{ 'z-10': activeFile === file.id, 'opacity-70 hover:opacity-100': activeFile !== file.id }"
            :style="{
              fontFamily: "'Special Elite', serif",
              background: activeFile === file.id ? colors.paperInner : colors.paperDark,
              borderColor: colors.tan,
              color: activeFile === file.id ? colors.ink : '#5a4a3a',
              transform: activeFile === file.id ? 'translateY(1px)' : 'translateY(4px)',
              boxShadow: activeFile === file.id ? '0 -2px 10px rgba(0,0,0,0.08), 0 2px 0 #fffdf7' : 'none',
              borderBottom: activeFile === file.id ? '2px solid ' + colors.paperInner : '1px solid ' + colors.tan
            }"
          >
            <span class="opacity-60 mr-1">{{ file.num }}</span>
            {{ file.label }}
            <span v-if="activeFile === file.id" class="absolute left-2 right-2 bottom-0 h-[2px] bg-[#a32626]"></span>
          </button>
        </div>

        <div
          class="mx-3 sm:mx-6 mb-6 mt-0 min-h-[560px] relative"
          :style="{
            background: colors.paperInner,
            border: '1px solid ' + colors.tan,
            borderTop: '1px solid ' + colors.tan,
            boxShadow: 'inset 0 2px 12px rgba(0,0,0,0.06), 0 2px 10px rgba(0,0,0,0.08)'
          }"
        >
          <div class="absolute left-3 top-0 bottom-0 w-6 flex flex-col justify-around py-16 pointer-events-none opacity-30">
            <div
              v-for="i in 3"
              :key="i"
              class="w-3 h-3 rounded-full border bg-[#e8ddd0]"
              :style="{ borderColor: '#c8b8a0', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.15)' }"
            ></div>
          </div>

          <div class="absolute right-12 top-8 hidden lg:block pointer-events-none">
            <div
              class="w-8 h-12 border-[2.5px] rounded-[8px]"
              :style="{ borderColor: '#9ca3af', transform: 'rotate(12deg)', borderBottomColor: 'transparent', borderLeftColor: 'transparent' }"
            ></div>
          </div>

          <div class="pl-10 sm:pl-14 pr-4 sm:pr-8 py-7 sm:py-9">
            <div :key="activeFile" class="animate-file-in">
              <section v-if="activeFile === '01_PROFILE'" class="grid md:grid-cols-[1.2fr_0.8fr] gap-8">
                <div>
                  <div class="flex gap-3 items-start mb-6">
                    <div class="w-[52px] h-[68px] bg-[#ddd] border-[2px] border-white shadow-md relative shrink-0" style="transform:rotate(-2deg)">
                      <div class="absolute inset-0 bg-gradient-to-br from-[#eee] to-[#b8a898] grayscale"></div>
                      <div class="absolute inset-0 flex items-center justify-center text-[18px] font-bold" :style="{ fontFamily: "'Special Elite', serif" }">BT</div>
                      <div
                        class="absolute -top-3 -right-2 w-4 h-6 border-[2px] border-[#8a8a8a] rounded-[6px] rotate-12"
                        style="border-bottom-color:transparent"
                      ></div>
                    </div>

                    <div>
                      <div class="text-[10px] tracking-[0.2em] opacity-60">FIELD NOTES — PROFILE</div>
                      <h2 class="text-[26px] sm:text-[30px] leading-[1.05] mt-1" :style="{ fontFamily: "'Crimson Pro', serif", fontWeight:600 }">
                        I build products <br />people pay for.
                      </h2>
                      <p class="mt-3 text-[13px] leading-[1.6] opacity-80 max-w-[380px]">
                        Vue ecosystem, payment integrations, product-driven development. I care about checkout flows that convert and dashboards that don’t confuse. Based in South Africa, building for global.
                      </p>
                    </div>
                  </div>

                  <div class="border-l-[2px] border-[#d6a66f] pl-5 mt-8 space-y-6 relative">
                    <div class="absolute left-[-5px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#d6a66f] to-transparent"></div>
                    <div v-for="entry in profileTimeline" :key="entry.year + entry.title" class="relative">
                      <div class="absolute -left-[26px] top-1 w-2 h-2 rounded-full bg-[#a32626] border border-white shadow"></div>
                      <div class="text-[10px] tracking-[0.18em] text-[#a32626] font-bold">{{ entry.year }}</div>
                      <div class="text-[13px] font-semibold mt-0.5">{{ entry.title }}</div>
                      <div class="text-[11px] opacity-60 mt-0.5 italic" :style="{ fontFamily: "'Crimson Pro', serif" }">— {{ entry.note }}</div>
                    </div>
                  </div>
                </div>

                <div class="space-y-5">
                  <div class="bg-white border border-[#e8ddd0] p-4 shadow-sm">
                    <div class="text-[10px] tracking-[0.18em] opacity-50 mb-3">FILE DETAILS</div>
                    <div class="space-y-2 text-[11px]">
                      <div v-for="row in profileDetails" :key="row[0]" class="flex gap-3">
                        <div class="w-[70px] text-[#8a7a68]">{{ row[0] }}</div>
                        <div class="flex-1 font-medium">{{ row[1] }}</div>
                      </div>
                    </div>
                  </div>

                  <div class="bg-[#f5efe0] border border-[#d6a66f]/40 p-4">
                    <div class="text-[10px] tracking-[0.18em] text-[#a32626] font-bold">PRINCIPLE</div>
                    <p class="mt-2 text-[12px] leading-[1.6]" :style="{ fontFamily: "'Crimson Pro', serif" }">
                      "Everything belongs inside the file. If you need a new tab to explain it, you haven’t designed it well enough."
                    </p>
                    <div class="mt-2 text-[9px] opacity-50">— FILE NOTE 001-A</div>
                  </div>

                  <div class="flex gap-2">
                    <span v-for="tag in ['Vue','PayFast','Node','Product']" :key="tag" class="px-2 py-1 text-[9px] tracking-[0.12em] border bg-white" style="border-color:#d6a66f">{{ tag }}</span>
                  </div>
                </div>
              </section>

              <section v-else-if="activeFile === '02_STOCKWELL'">
                <div class="flex flex-wrap items-baseline justify-between gap-3 mb-4">
                  <h2 class="text-[20px] sm:text-[22px] tracking-[-0.01em]" :style="{ fontFamily: "'Special Elite', serif" }">
                    STOCKWELL — FILE 02 — E-COMMERCE PLATFORM
                  </h2>
                  <div class="text-[10px] tracking-[0.16em] opacity-60">Vue • JavaScript • Node • PayFast</div>
                </div>

                <div class="relative rounded-[4px] overflow-hidden" :style="{ border:'2px solid ' + colors.ink, background:'#fff', boxShadow:'0 8px 30px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)' }">
                  <div class="h-9 bg-[#11100e] flex items-center px-4 gap-2 text-white">
                    <div class="flex gap-1.5">
                      <div class="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                      <div class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                      <div class="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                    </div>
                    <div class="ml-4 text-[11px] tracking-[0.12em] opacity-80">stockwell.co.za — LIVE PREVIEW — FILE 02</div>
                    <div class="ml-auto flex items-center gap-3">
                      <div class="text-[10px] opacity-70">WALLET: R 1,240.50</div>
                      <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-black text-[11px] font-bold" :class="{ 'cart-pop': cartAnim }">
                        🛒 {{ cartCount }}
                      </div>
                    </div>
                  </div>

                  <div class="h-14 border-b bg-[#fffdf7] flex items-center justify-between px-5">
                    <div class="flex items-center gap-6">
                      <div class="text-[18px] font-black tracking-[-0.02em]" :style="{ fontFamily: "'Special Elite', serif" }">STOCKWELL</div>
                      <div class="hidden sm:flex gap-4 text-[11px] tracking-[0.12em] opacity-70">
                        <span>SHOP</span><span>NEW</span><span>JOURNAL</span>
                      </div>
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="hidden sm:flex h-8 w-[180px] border bg-white items-center px-3 text-[11px] opacity-60 rounded">Search products…</div>
                      <div class="text-[11px] opacity-60">ACCOUNT</div>
                    </div>
                  </div>

                  <div class="p-5 bg-[#fcfaf6]">
                    <div class="flex items-center justify-between mb-4">
                      <div class="text-[12px] font-semibold tracking-[0.08em]">LATEST DROP — 3 ITEMS</div>
                      <div class="text-[10px] opacity-50">FILE 02 / PREVIEW / INTERACTIVE</div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div v-for="product in stockProducts" :key="product.id" class="bg-white border border-black/10 rounded-[4px] overflow-hidden hover:shadow-md transition-shadow">
                        <div class="h-[120px] bg-[#f5efe0] flex items-center justify-center text-[42px] relative">
                          <span>{{ product.img }}</span>
                          <div class="absolute top-2 left-2 text-[9px] px-1.5 py-0.5 bg-black text-white tracking-widest">{{ product.stock }} LEFT</div>
                        </div>
                        <div class="p-3">
                          <div class="text-[11px] font-bold leading-tight">{{ product.name }}</div>
                          <div class="flex items-center justify-between mt-2">
                            <div class="text-[13px] font-bold">R {{ product.price }}</div>
                            <button @click="addToCart" class="px-3 py-1.5 bg-black text-white text-[10px] tracking-[0.12em] rounded hover:bg-[#a32626] transition-colors">
                              ADD TO CART +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="mt-4 flex items-center gap-2 text-[10px] opacity-60">
                      <div class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                      LIVE PREVIEW — CART STATE PERSISTS INSIDE FOLDER — TRY ADDING ITEMS
                    </div>
                  </div>
                </div>

                <div class="mt-6 flex flex-wrap gap-2 border-b border-[#e8ddd0] pb-3">
                  <button
                    v-for="tab in stockTabs"
                    :key="tab"
                    @click="stockTab = tab"
                    class="px-3 py-1 text-[10px] tracking-[0.16em] border"
                    :class="stockTab === tab ? 'bg-black text-white border-black' : 'bg-white border-[#d6a66f] opacity-70 hover:opacity-100'"
                    :style="{ fontFamily: "'Special Elite', serif" }"
                  >
                    [ {{ tab }} ]
                  </button>
                </div>

                <div class="mt-4 min-h-[90px]">
                  <p v-if="stockTab === 'PROBLEM'" class="text-[13px] leading-[1.7] max-w-[680px] opacity-80">
                    <span class="font-bold">CASE NOTE:</span> Existing local streetwear proposals were fragmented — Instagram DMs, manual EFTs, no stock sync. Brands needed a real checkout that South African customers trust. PayFast, not Stripe.
                  </p>
                  <p v-else-if="stockTab === 'BUILD'" class="text-[13px] leading-[1.7] max-w-[680px] opacity-80">
                    <span class="font-bold">BUILD:</span> Vue 3 + Composition API, Node backend, PayFast hosted checkout, wallet system for store credit, real-time inventory, admin dashboard with CSV import. Deployed on Vercel + Render. 2.1s LCP.
                  </p>
                  <div v-else-if="stockTab === 'CHALLENGE'" class="bg-[#fff8ee] border border-[#d6a66f]/40 p-3 max-w-[680px]">
                    <div class="text-[10px] tracking-[0.18em] text-[#a32626] font-bold">CASE NOTE — PAYFAST WEBHOOK — 14.02.24</div>
                    <p class="mt-2 text-[12px] leading-[1.6] italic" :style="{ fontFamily: "'Crimson Pro', serif" }">
                      "PayFast ITN ping arrives before order is committed. Had to implement idempotency + pending state. Lost 3 test payments to race condition. Fixed with queue + 2s delay buffer. Learned to never trust gateway timing."
                    </p>
                  </div>
                  <div v-else class="flex gap-3">
                    <a href="https://stockwell-hl1e.onrender.com/" target="_blank" rel="noopener" class="px-4 py-2 bg-[#a32626] text-white text-[11px] tracking-[0.12em] border border-[#a32626] hover:bg-black transition-colors">→ VIEW LIVE (external)</a>
                    <a href="#" class="px-4 py-2 bg-white text-black text-[11px] tracking-[0.12em] border border-black hover:bg-black hover:text-white transition-colors">→ GITHUB — PRIVATE FILE</a>
                  </div>
                </div>
              </section>

              <section v-else-if="activeFile === '03_VOYA_BITE'">
                <div class="flex flex-wrap items-baseline justify-between gap-3 mb-4">
                  <h2 class="text-[20px] sm:text-[22px]" :style="{ fontFamily: "'Special Elite', serif" }">VOYA BITE — FILE 03 — FOOD DELIVERY</h2>
                  <div class="text-[10px] tracking-[0.16em] opacity-60">React • Firebase • Maps • Realtime</div>
                </div>

                <div class="rounded-[4px] overflow-hidden border-2" :style="{ borderColor:colors.ink, background:'#fff', boxShadow:'0 8px 30px rgba(0,0,0,0.12)' }">
                  <div class="h-9 bg-[#11100e] flex items-center px-4 text-white text-[11px] tracking-[0.12em]">
                    <span class="opacity-80">voya-bite.co.za — ORDER FLOW — FILE 03</span>
                    <span class="ml-auto flex items-center gap-2"><span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>{{ orders }} ACTIVE ORDER</span>
                  </div>

                  <div class="grid md:grid-cols-[1fr_260px] bg-[#fffdf7]">
                    <div class="p-4">
                      <div class="text-[11px] font-bold tracking-[0.1em] mb-3">TODAY'S MENU — CAPE TOWN</div>
                      <div class="grid grid-cols-2 gap-3">
                        <div v-for="item in voyaMenu" :key="item.name" class="bg-white border border-black/10 p-3 rounded">
                          <div class="flex justify-between">
                            <span class="text-[10px] px-1.5 py-0.5 bg-black text-white">{{ item.tag }}</span>
                            <span class="text-[10px] opacity-50">{{ item.time }}</span>
                          </div>
                          <div class="mt-2 text-[12px] font-bold leading-tight">{{ item.name }}</div>
                          <div class="mt-2 flex justify-between items-center">
                            <span class="text-[12px] font-bold">{{ item.price }}</span>
                            <button @click="orders++" class="text-[10px] px-2 py-1 border border-black hover:bg-black hover:text-white transition-colors">ORDER +</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="border-t md:border-t-0 md:border-l bg-white p-4">
                      <div class="text-[10px] tracking-[0.14em] font-bold mb-3">ORDER TRACKING — LIVE</div>
                      <div class="space-y-3 relative pl-5 border-l border-dashed border-black/20 ml-1">
                        <div v-for="item in orderTimeline" :key="item.s" class="relative">
                          <div
                            class="absolute -left-[26px] top-1 w-3 h-3 rounded-full border-2"
                            :class="item.done ? 'bg-[#a32626] border-[#a32626]' : 'bg-white border-black/20'"
                          ></div>
                          <div class="text-[11px] font-medium">{{ item.s }}</div>
                          <div class="text-[10px] opacity-50">{{ item.t }}</div>
                        </div>
                      </div>
                      <div class="mt-4 p-2 bg-[#f5efe0] text-[10px]">Tip: click ORDER to advance timeline</div>
                    </div>
                  </div>
                </div>

                <div class="mt-6 flex gap-2 border-b border-[#e8ddd0] pb-3">
                  <button
                    v-for="tab in voyaTabs"
                    :key="tab"
                    @click="voyaTab=tab"
                    class="px-3 py-1 text-[10px] tracking-[0.16em] border"
                    :class="voyaTab === tab ? 'bg-black text-white border-black' : 'bg-white border-[#d6a66f]'"
                    :style="{ fontFamily: "'Special Elite', serif" }"
                  >
                    [ {{ tab }} ]
                  </button>
                </div>

                <p class="mt-3 text-[13px] leading-[1.7] max-w-[640px] opacity-80">
                  <span v-if="voyaTab === 'PROBLEM'">Small kitchens lose orders to WhatsApp chaos. Need simple menu, rider ping, and customer tracking without building Uber.</span>
                  <span v-else-if="voyaTab === 'BUILD'">React + Firebase realtime, geohash queries for nearby kitchens, optimistic order UI, SMS fallback. 60% fewer “where is my food?” messages.</span>
                  <span v-else>Customer → Kitchen tablet → Rider app → Live map. All inside one Firestore collection. State machine, not spaghetti.</span>
                </p>
              </section>

              <section v-else-if="activeFile === '04_SKILLS'">
                <h2 class="text-[20px]" :style="{ fontFamily: "'Special Elite', serif" }">SKILLS — FILE 04 — EVIDENCE MAP</h2>
                <div class="text-[10px] tracking-[0.16em] opacity-50 mt-1">HOVER TAGS TO SEE FILE CONNECTIONS</div>

                <div class="mt-6 relative w-full h-[380px] bg-[#fcfaf6] border border-[#e8ddd0] rounded-[3px] overflow-hidden">
                  <svg class="absolute inset-0 w-full h-full pointer-events-none">
                    <line
                      v-for="(skill,index) in skills"
                      :key="skill.name"
                      :x1="skill.x + '%'"
                      :y1="skill.y + '%'"
                      :x2="skills[(index + 1) % skills.length].x + '%'"
                      :y2="skills[(index + 1) % skills.length].y + '%'"
                      :stroke="skillHover === skill.name ? '#a32626' : '#d6a66f'"
                      :stroke-opacity="skillHover ? (skillHover === skill.name ? .9 : .15) : .25"
                      :stroke-width="skillHover === skill.name ? 1.5 : .7"
                      stroke-dasharray="4 6"
                    />
                  </svg>

                  <div
                    v-for="skill in skills"
                    :key="skill.name"
                    class="absolute -translate-x-1/2 -translate-y-1/2"
                    :style="{ left: skill.x + '%', top: skill.y + '%' }"
                    @mouseenter="skillHover=skill.name"
                    @mouseleave="skillHover=null"
                  >
                    <div
                      class="px-3 py-1.5 text-[11px] tracking-[0.08em] border shadow-sm cursor-pointer transition-all select-none"
                      :style="{
                        fontFamily: "'Special Elite', serif",
                        background: skillHover === skill.name ? '#11100e' : '#fff',
                        color: skillHover === skill.name ? '#eee6d7' : '#11100e',
                        borderColor: skillHover === skill.name ? '#11100e' : '#d6a66f',
                        transform: skillHover === skill.name ? 'translate(-50%,-50%) scale(1.08) rotate(-1deg)' : 'translate(-50%,-50%) rotate(0.5deg)',
                        boxShadow: skillHover === skill.name ? '0 6px 18px rgba(0,0,0,0.2)' : '0 2px 6px rgba(0,0,0,0.08)'
                      }"
                    >
                      {{ skill.name }}
                      <span class="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#a32626] rounded-full"></span>
                    </div>

                    <div
                      v-if="skillHover === skill.name"
                      class="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#f5efe0] border border-[#d6a66f] px-2 py-1 text-[9px] tracking-widest shadow"
                    >
                      USED IN: {{ skill.projects.join(' + ') }}
                    </div>
                  </div>

                  <div class="absolute bottom-3 left-3 text-[9px] tracking-[0.16em] opacity-40">FILE MAP — RED STRING ANALYSIS — BT-001</div>
                </div>

                <div class="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2">
                  <div v-for="skill in skills" :key="skill.name" class="text-[10px] border bg-white px-2 py-1 border-[#e8ddd0] opacity-70">{{ skill.name }}</div>
                </div>
              </section>

              <section v-else-if="activeFile === '05_JOURNEY'">
                <h2 class="text-[20px]" :style="{ fontFamily: "'Special Elite', serif" }">JOURNEY — FILE 05 — DEVELOPMENT LOG</h2>

                <div class="mt-6 relative border-l-[1.5px] border-[#d6a66f] ml-4 sm:ml-10 pl-8 sm:pl-10 space-y-10">
                  <div v-for="entry in journey" :key="entry.date + entry.title" class="relative">
                    <div class="absolute -left-[37px] sm:-left-[47px] top-0 w-[14px] h-[14px] rounded-full bg-[#f5efe0] border-2 border-[#a32626] flex items-center justify-center">
                      <div class="w-1.5 h-1.5 bg-[#a32626] rounded-full"></div>
                    </div>

                    <div class="flex gap-4 items-start">
                      <div class="min-w-[80px]">
                        <div class="text-[11px] font-bold tracking-[0.14em] text-[#a32626]">{{ entry.date }}</div>
                        <div class="mt-6 hidden sm:block text-[10px] italic opacity-50 rotate-[-4deg] max-w-[90px]" :style="{ fontFamily: "'Crimson Pro', serif" }">{{ entry.margin }}</div>
                      </div>

                      <div class="flex-1">
                        <div class="text-[15px] font-semibold" :style="{ fontFamily: "'Crimson Pro', serif" }">{{ entry.title }}</div>
                        <div class="text-[12px] leading-[1.6] opacity-70 mt-1 max-w-[420px]">{{ entry.note }}</div>
                        <div v-if="entry.sub" class="mt-2 bg-[#fff8ee] border-l-2 border-[#a32626] pl-3 py-1.5 text-[11px] italic max-w-[420px]" :style="{ fontFamily: "'Crimson Pro', serif" }">
                          Field note: Queue + pending state solved race. Never trust gateway timing.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section v-else-if="activeFile === '06_CONTACT'" class="max-w-[680px]">
                <h2 class="text-[20px]" :style="{ fontFamily: "'Special Elite', serif" }">CONTACT — FILE 06 — REQUEST FOR COLLABORATION</h2>
                <div class="mt-1 text-[10px] tracking-[0.16em] opacity-60">FORM BT-C — OFFICIAL REQUEST — FILE NO. BT-001</div>

                <div class="mt-6 bg-white border border-[#d6a66f] p-6 shadow-sm">
                  <div class="flex justify-between items-start mb-6">
                    <div class="text-[11px] tracking-[0.2em] font-bold">REQUESTOR DETAILS</div>
                    <div class="text-[9px] border border-[#a32626] text-[#a32626] px-2 py-0.5 tracking-widest">PRIORITY: NORMAL</div>
                  </div>

                  <div class="space-y-5">
                    <div v-for="row in contactFields" :key="row[0]" class="flex gap-4 border-b border-dashed border-black/15 pb-2">
                      <div class="w-[130px] text-[10px] tracking-[0.16em] opacity-60 pt-1">{{ row[0] }}</div>
                      <div class="flex-1 text-[11px] opacity-40">{{ row[1] }}</div>
                    </div>

                    <div class="pt-2">
                      <div class="text-[10px] tracking-[0.16em] opacity-60 mb-2">MESSAGE / BRIEF</div>
                      <div class="min-h-[90px] border border-[#e8ddd0] bg-[#fcfaf6] p-3 text-[11px] opacity-30 leading-[1.8]">
                        Describe project, timeline, budget range…<br />
                        _______________________________________________________<br />
                        _______________________________________________________<br />
                        _______________________________________________________
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 flex flex-wrap gap-3 items-center">
                    <button
                      @click="submitContact"
                      class="px-5 py-2 bg-black text-white text-[11px] tracking-[0.16em] hover:bg-[#a32626] transition-colors"
                      :style="{ fontFamily: "'Special Elite', serif" }"
                      :disabled="contactStatus !== 'idle'"
                    >
                      {{ contactStatus === 'idle' ? '→ SUBMIT REQUEST' : contactStatus === 'sending' ? '→ FILING…' : '→ FILED ✓' }}
                    </button>

                    <span v-if="contactStatus === 'sent'" class="text-[11px] text-[#a32626]">Request logged. I reply within 24h.</span>
                    <span class="ml-auto text-[9px] opacity-40">OR EMAIL: butsha.t@example.com</span>
                  </div>
                </div>

                <div class="mt-4 flex gap-2">
                  <div class="flex-1 bg-[#f5efe0] border border-[#d6a66f]/40 px-3 py-2"><div class="text-[9px] tracking-widest opacity-50">EMAIL</div><div class="text-[10px] font-medium mt-1">butsha.t@example.com</div></div>
                  <div class="flex-1 bg-[#f5efe0] border border-[#d6a66f]/40 px-3 py-2"><div class="text-[9px] tracking-widest opacity-50">LOCATION</div><div class="text-[10px] font-medium mt-1">South Africa — Remote / GMT+2</div></div>
                  <div class="flex-1 bg-[#f5efe0] border border-[#d6a66f]/40 px-3 py-2"><div class="text-[9px] tracking-widest opacity-50">RESPONSE</div><div class="text-[10px] font-medium mt-1">&lt; 24H — FILE BT-C</div></div>
                </div>
              </section>

              <section v-else>
                <h2 class="text-[20px]" :style="{ fontFamily: "'Special Elite', serif" }">NOTES — FILE 07 — PERSONAL</h2>
                <div class="text-[10px] tracking-[0.16em] opacity-50 mt-1">UNFILTERED — NOT FOR CLIENT REVIEW</div>

                <div class="mt-6 grid sm:grid-cols-[1.1fr_0.9fr] gap-6">
                  <div class="space-y-4">
                    <div class="bg-[#fff88a] p-4 shadow-sm rotate-[-1.2deg] border border-black/5 max-w-[340px]">
                      <div class="text-[12px] leading-[1.5]" :style="{ fontFamily: "'Crimson Pro', serif" }">
                        I used to think portfolio = gallery. Now I think portfolio = proof you can think in systems.<br /><br />
                        Folder rule helped: everything inside file. No escape hatches.
                      </div>
                      <div class="mt-2 text-[9px] opacity-50">— 12.04.24 — desk lamp on</div>
                    </div>

                    <div class="bg-white border border-[#e8ddd0] p-4 shadow-sm max-w-[360px]">
                      <div class="text-[10px] tracking-[0.18em] opacity-40">THOUGHT — ON PAYMENTS</div>
                      <p class="mt-2 text-[12px] leading-[1.6] opacity-80">Building for SA means PayFast, not Stripe. That constraint taught me more than any tutorial. Real money, real edge cases, real anxiety when webhook fails.</p>
                    </div>

                    <div class="bg-[#f5efe0] border-l-2 border-[#a32626] p-3 max-w-[320px]">
                      <div class="text-[11px] font-bold">Currently learning</div>
                      <div class="text-[11px] opacity-70 mt-1">— Framer Motion for physical UI</div>
                      <div class="text-[11px] opacity-70">— Postgres row-level security</div>
                      <div class="text-[11px] opacity-70">— Writing case notes, not case studies</div>
                    </div>
                  </div>

                  <div class="space-y-4">
                    <div class="bg-white p-4 border border-[#d6a66f]/40 shadow-sm rotate-[0.8deg]">
                      <div class="text-[10px] tracking-[0.18em] opacity-50">LIST — THINGS THAT MATTER</div>
                      <ul class="mt-3 space-y-1.5 text-[12px] leading-[1.5]">
                        <li>— Checkout that doesn’t panic</li>
                        <li>— Loading states that feel intentional</li>
                        <li>— Copy that sounds like a human wrote it</li>
                        <li>— One interaction done well, not ten half-done</li>
                      </ul>
                    </div>

                    <div class="bg-[#11100e] text-[#eee6d7] p-4">
                      <div class="text-[10px] tracking-[0.2em] text-[#d6a66f]">MANIFESTO — BT-001</div>
                      <p class="mt-2 text-[12px] leading-[1.6] italic" :style="{ fontFamily: "'Crimson Pro', serif" }">
                        "Make the folder. Put everything inside. If someone opens it and stays, you did it right."
                      </p>
                    </div>

                    <div class="flex gap-2 text-[9px] opacity-40">
                      <span class="border border-black/10 px-2 py-1 bg-white">PHOTO: attached</span>
                      <span class="border border-black/10 px-2 py-1 bg-white">STATUS: open</span>
                      <span class="border border-[#a32626]/30 px-2 py-1 bg-[#fff0f0] text-[#a32626]">HUMAN: yes</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div class="px-6 sm:px-9 pb-6 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="relative w-[110px] h-[38px]">
              <div class="absolute left-0 top-[8px] w-[96px] h-[28px] bg-[#e8ddd0] border border-[#c8b8a0] rounded-[2px]" style="transform:rotate(-2deg)"></div>
              <div class="absolute left-1 top-[4px] w-[98px] h-[28px] bg-[#f0e6d3] border border-[#c8b8a0] rounded-[2px]" style="transform:rotate(1deg)"></div>
              <div class="absolute left-2 top-0 w-[100px] h-[28px] bg-white border border-[#c8b8a0] rounded-[2px] flex items-center justify-center text-[8px] tracking-widest" style="box-shadow:0 2px 6px rgba(0,0,0,0.12)">FILE STACK</div>
            </div>
            <div class="text-[10px] tracking-[0.18em] opacity-60">FILE {{ activeFileIndexDisplay }} OF 07 — {{ activeFileLabel }}</div>
          </div>

          <div class="hidden sm:flex items-center gap-2">
            <button
              v-for="file in files"
              :key="file.id"
              @click="selectFile(file.id)"
              class="w-6 h-1 rounded-full transition-all"
              :style="{
                background: activeFile === file.id ? colors.red : colors.tan,
                opacity: activeFile === file.id ? 1 : .35,
                transform: activeFile === file.id ? 'scaleX(1.8)' : 'scaleX(1)'
              }"
              :aria-label="'Go to ' + file.label"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const colors = {
  walnut: '#2b211b',
  leather: '#231b16',
  ink: '#11100e',
  paper: '#eee6d7',
  paperLight: '#f5efe0',
  paperInner: '#fffdf7',
  paperDark: '#e8ddd0',
  tan: '#d6a66f',
  red: '#a32626'
}

const profilePhoto = ref('')

const files = [
  { id: '01_PROFILE', label: 'PROFILE', num: '01' },
  { id: '02_STOCKWELL', label: 'STOCKWELL', num: '02' },
  { id: '03_VOYA_BITE', label: 'VOYA BITE', num: '03' },
  { id: '04_SKILLS', label: 'SKILLS', num: '04' },
  { id: '05_JOURNEY', label: 'JOURNEY', num: '05' },
  { id: '06_CONTACT', label: 'CONTACT', num: '06' },
  { id: '07_NOTES', label: 'NOTES', num: '07' }
]

const coverDetails = [
  ['ROLE', 'DEVELOPER / CREATIVE'],
  ['LOCATION', 'SOUTH AFRICA'],
  ['SPECIALIZATION', 'WEB DEVELOPMENT']
]

const profileDetails = [
  ['NAME', 'Butsha Tengwa'],
  ['ROLE', 'Developer / Creative'],
  ['BASE', 'South Africa (Remote)'],
  ['STACK', 'Vue, JS/TS, Node, PayFast, Firebase'],
  ['FOCUS', 'E-commerce, payments, product UX'],
  ['STATUS', 'OPEN TO OPPORTUNITIES']
]

const profileTimeline = [
  { year: '2023', title: 'First Vue app shipped', note: 'Learned that state is harder than UI.' },
  { year: '2024', title: 'StockWell — wallet + PayFast', note: 'Webhook hell, then it worked. Real money moved.' },
  { year: '2024', title: 'Voya Bite — delivery flow', note: 'Order tracking that feels alive.' },
  { year: 'NOW', title: 'Open to collaborations', note: 'Product-minded teams, payment problems, Vue/React.' }
]

const stockProducts = [
  { id: 1, name: 'Canvas Workwear Jacket', price: 89, img: '🧥', stock: 12 },
  { id: 2, name: 'Heavyweight Hoodie', price: 65, img: '👕', stock: 4 },
  { id: 3, name: 'Utility Cargo Pant', price: 78, img: '👖', stock: 9 }
]

const stockTabs = ['PROBLEM', 'BUILD', 'CHALLENGE', 'LIVE']
const voyaTabs = ['PROBLEM', 'BUILD', 'FLOW']

const voyaMenu = [
  { name: 'Peri Chicken Bowl', price: 'R 89', time: '22 min', tag: 'HOT' },
  { name: 'Veg Power Wrap', price: 'R 72', time: '18 min', tag: 'VEG' },
  { name: 'Beef Smash Burger', price: 'R 95', time: '25 min', tag: 'NEW' },
  { name: 'Acai Sunrise', price: 'R 68', time: '12 min', tag: 'COLD' }
]

const skills = [
  { name: 'Vue 3', projects: ['STOCKWELL', 'PROFILE'], x: 12, y: 18 },
  { name: 'PayFast', projects: ['STOCKWELL'], x: 42, y: 12 },
  { name: 'Node.js', projects: ['STOCKWELL', 'VOYA'], x: 68, y: 22 },
  { name: 'Firebase', projects: ['VOYA BITE'], x: 20, y: 52 },
  { name: 'TypeScript', projects: ['ALL'], x: 55, y: 48 },
  { name: 'Tailwind', projects: ['STOCKWELL', 'VOYA'], x: 78, y: 55 },
  { name: 'Maps API', projects: ['VOYA BITE'], x: 35, y: 78 },
  { name: 'Product UX', projects: ['STOCKWELL', 'VOYA'], x: 65, y: 82 }
]

const journey = [
  { date: 'JAN 2023', title: 'Started Vue', note: 'First component: it rendered. I celebrated too much.', margin: 'docs → confusion → docs again' },
  { date: 'JUN 2023', title: 'Freelance store', note: 'Client paid R2k for landing. I learned pricing.', margin: 'charge more' },
  { date: 'NOV 2023', title: 'PayFast integration hell', note: 'ITN docs lie. Webhooks don’t wait.', margin: 'idempotency key!', sub: true },
  { date: 'FEB 2024', title: 'StockWell live', note: 'First real money. R89 jacket sold at 2am.', margin: 'it works!' },
  { date: 'MAY 2024', title: 'Voya Bite flow', note: 'Real-time orders feel like magic when they work.', margin: 'optimistic UI' },
  { date: 'NOW', title: 'File 001 open', note: 'Portfolio as object, not gallery.', margin: 'everything inside file →' }
]

const contactFields = [
  ['FULL NAME', 'Enter your name ________________________________'],
  ['ORGANIZATION', 'Company / studio ______________________________'],
  ['EMAIL', 'you@company.com _________________________________'],
  ['PROJECT TYPE', 'E-commerce / Product / Payment / Other __________']
]

const orderTimeline = computed(() => [
  { s: 'Order confirmed', t: '14:02', done: true },
  { s: 'Kitchen started', t: '14:05', done: true },
  { s: 'Rider assigned — Thabo', t: '14:12', done: orders.value > 1 },
  { s: 'On the way', t: '14:18', done: false }
])

const folderOpen = ref(false)
const opening = ref(false)
const closing = ref(false)
const activeFile = ref('01_PROFILE')
const stockTab = ref('BUILD')
const voyaTab = ref('BUILD')
const cartCount = ref(2)
const cartAnim = ref(false)
const orders = ref(1)
const skillHover = ref(null)
const contactStatus = ref('idle')
const tabHover = ref(false)

const activeIndex = computed(() => files.findIndex(file => file.id === activeFile.value))
const activeFileLabel = computed(() => files[activeIndex.value]?.label || 'PROFILE')
const activeFileIndexDisplay = computed(() => String(activeIndex.value + 1).padStart(2, '0'))

function openFolder() {
  if (opening.value || folderOpen.value) return
  opening.value = true
  setTimeout(() => {
    folderOpen.value = true
    opening.value = false
  }, 900)
}

function closeFolder() {
  if (closing.value || !folderOpen.value) return
  closing.value = true
  setTimeout(() => {
    folderOpen.value = false
    closing.value = false
  }, 700)
}

function selectFile(id) {
  if (closing.value) return
  activeFile.value = id
}

function addToCart() {
  cartCount.value += 1
  cartAnim.value = false
  requestAnimationFrame(() => {
    cartAnim.value = true
    setTimeout(() => {
      cartAnim.value = false
    }, 300)
  })
}

function submitContact() {
  if (contactStatus.value !== 'idle') return
  contactStatus.value = 'sending'
  setTimeout(() => {
    contactStatus.value = 'sent'
  }, 900)
}
</script>
