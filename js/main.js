/* =========================================================
   BY ANÁLIA — configuração e interações
   ---------------------------------------------------------
   >>> EDITE AQUI os dados reais da loja antes de publicar <<<
   ========================================================= */

// Número do WhatsApp: código do país + DDD + número, só dígitos. Ex.: "5511999998888"
const WHATSAPP_NUMBER = "5584999846608";

const CONFIG = {
  // Como o número aparece no rodapé. Ex.: "(11) 99999-8888"
  whatsappDisplay: "(84) 99984-6608",
  // Instagram: usuário sem @. Ex.: "byanaliaa__"
  instagramUser: "byanaliaa__",
  // Horário de atendimento exibido no rodapé
  hours: "Seg. a sex. · horário a definir",
  // Endereço (deixe "" para esconder a linha do rodapé)
  address: "",
  // Link da política de privacidade (deixe "#" até ter a página)
  privacyUrl: "#",

  messages: {
    general: "Olá! Vim pelo site da By Anália e gostaria de conhecer as peças disponíveis.",
    product: (name) =>
      `Olá! Vi o produto ${name} no site da By Anália e gostaria de saber mais sobre disponibilidade, tamanhos e valores.`,
    category: (name) =>
      `Olá! Vim pelo site da By Anália e gostaria de ver as peças da categoria ${name}.`,
  },
};

/* ---------------------------------------------------------
   PRODUTOS EM DESTAQUE (conteúdo DEMONSTRATIVO)
   - price: texto livre. Ex.: "R$ 189,90". Use "Sob consulta" se preferir não mostrar.
   - sizes: tamanhos de exemplo — ajuste conforme o estoque real.
   - badge: etiqueta opcional ("Novo", "Favorito"...) ou "" para nenhuma.
   - image: ID da foto (Unsplash) ou caminho local, ex.: "img/vestido.jpg"
   --------------------------------------------------------- */
const PRODUCTS = [
  { name: "Vestido Chemise Jeans",     price: "Sob consulta", sizes: ["P", "M", "G"],       badge: "Novo",     image: "1591369822096-ffd140ec948f", alt: "Vestido chemise jeans com botões" },
  { name: "Calça Alfaiataria Rosé",    price: "Sob consulta", sizes: ["36", "38", "40", "42"], badge: "",       image: "1594633312681-425c7b97ccd1", alt: "Calça de alfaiataria rosé com blusa off-white" },
  { name: "Camisa Off-White",          price: "Sob consulta", sizes: ["P", "M", "G"],       badge: "",         image: "1581338834647-b0fb40704e21", alt: "Mulher usando camisa off-white e calça jeans" },
  { name: "Suéter de Tricô Creme",     price: "Sob consulta", sizes: ["Único"],             badge: "Favorito", image: "1574201635302-388dd92a4c3f", alt: "Suéter de tricô na cor creme" },
  { name: "Saia Evasê Preta",          price: "Sob consulta", sizes: ["P", "M", "G"],       badge: "",         image: "1583496661160-fb5886a0aaaa", alt: "Saia evasê preta com camisa xadrez" },
  { name: "Calça Jeans Reta",          price: "Sob consulta", sizes: ["36", "38", "40", "42"], badge: "",       image: "1598554747436-c9293d6a588f", alt: "Look com t-shirt branca e calça jeans reta" },
  { name: "Kimono de Crochê",          price: "Sob consulta", sizes: ["Único"],             badge: "Novo",     image: "1434389677669-e08b4cac3105", alt: "Kimono de crochê na cor areia" },
  { name: "Sobretudo Camel",           price: "Sob consulta", sizes: ["P", "M", "G"],       badge: "",         image: "1619086303291-0ef7699e4b31", alt: "Mulher usando sobretudo camel e calça branca" },
];

/* =========================================================
   Não é necessário editar abaixo desta linha
   ========================================================= */

const isPlaceholderNumber = !/^\d{12,13}$/.test(WHATSAPP_NUMBER);
if (isPlaceholderNumber) {
  console.warn("[By Anália] Defina WHATSAPP_NUMBER em js/main.js — os links do WhatsApp usam um número provisório.");
}

/** Monta o link wa.me com a mensagem codificada */
function waLink(message = CONFIG.messages.general) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function imgUrl(src, w, h) {
  if (!/^\d+-[\w]+$/.test(src)) return src; // caminho local ou URL completa
  return `https://images.unsplash.com/photo-${src}?auto=format&fit=crop&w=${w}&h=${h}&q=70`;
}

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

document.documentElement.classList.add("js");

/* ---------- Produtos ---------- */
function renderProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map((p) => {
    const name = escapeHtml(p.name);
    return `
      <li class="prod reveal">
        <div class="prod__media">
          <img loading="lazy" decoding="async" width="600" height="800"
               src="${imgUrl(p.image, 600, 800)}"
               srcset="${imgUrl(p.image, 400, 533)} 400w, ${imgUrl(p.image, 600, 800)} 600w"
               sizes="(min-width: 1100px) 22vw, (min-width: 768px) 30vw, 46vw"
               alt="${escapeHtml(p.alt || p.name)}">
          ${p.badge ? `<span class="prod__badge">${escapeHtml(p.badge)}</span>` : ""}
        </div>
        <div class="prod__body">
          <div class="prod__row">
            <h3 class="prod__name">${name}</h3>
            <p class="prod__price">${escapeHtml(p.price)}</p>
          </div>
          <p class="prod__sizes"><span class="sr-only">Tamanhos: </span>${p.sizes.map(escapeHtml).join("<span aria-hidden=\"true\"> · </span>")}</p>
          <a class="btn btn--wa prod__btn" href="${waLink(CONFIG.messages.product(p.name))}"
             target="_blank" rel="noopener" aria-label="Quero essa peça: ${name} (abre o WhatsApp)">
            <span class="btn__wa" aria-hidden="true"><svg class="icon"><use href="#i-whatsapp"/></svg></span>Quero essa peça!
          </a>
        </div>
      </li>`;
  }).join("");

  const note = document.createElement("p");
  note.className = "demo-note";
  note.textContent = "Fotos, valores e tamanhos ilustrativos. Consulte a disponibilidade pelo WhatsApp.";
  grid.after(note);
}

/* ---------- Links do WhatsApp / Instagram / dados do rodapé ---------- */
function wireLinks() {
  document.querySelectorAll("[data-wa]").forEach((a) => {
    const cat = a.dataset.waCategory;
    a.href = waLink(cat ? CONFIG.messages.category(cat) : CONFIG.messages.general);
    a.target = "_blank";
    a.rel = "noopener";
  });

  const igUrl = `https://www.instagram.com/${CONFIG.instagramUser}/`;
  document.querySelectorAll("[data-instagram]").forEach((a) => (a.href = igUrl));
  document.querySelectorAll("[data-ig-display]").forEach((el) => (el.textContent = "@" + CONFIG.instagramUser));
  document.querySelectorAll("[data-wa-display]").forEach((el) => (el.textContent = CONFIG.whatsappDisplay));
  document.querySelectorAll("[data-hours]").forEach((el) => (el.textContent = CONFIG.hours));
  document.querySelectorAll("[data-privacy]").forEach((a) => (a.href = CONFIG.privacyUrl));

  const addrRow = document.querySelector("[data-address-row]");
  if (addrRow) {
    if (CONFIG.address) addrRow.querySelector("[data-address]").textContent = CONFIG.address;
    else addrRow.remove();
  }
}

/* ---------- Header: sombra ao rolar + menu mobile ---------- */
function initHeader() {
  const header = document.querySelector(".header");
  const burger = document.querySelector(".burger");
  const nav = document.getElementById("menu");
  const mq = window.matchMedia("(min-width: 960px)");

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setOpen = (open) => {
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  };

  burger.addEventListener("click", () => setOpen(burger.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); burger.focus(); }
  });
  mq.addEventListener("change", (e) => { if (e.matches) setOpen(false); });

  // Destaca o item do menu da seção visível
  const links = [...document.querySelectorAll(".nav__link")];
  const sections = links.map((l) => document.querySelector(l.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === "#" + en.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => io.observe(s));
  }
}

/* ---------- Botão flutuante: some quando o CTA final está visível ---------- */
function initFloat() {
  const btn = document.querySelector(".wa-float");
  const zones = [document.getElementById("contato"), document.querySelector(".footer")].filter(Boolean);
  if (!btn || !zones.length || !("IntersectionObserver" in window)) return;
  const visible = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => (en.isIntersecting ? visible.add(en.target) : visible.delete(en.target)));
    btn.classList.toggle("is-hidden", visible.size > 0);
  }, { threshold: 0.2 });
  zones.forEach((z) => io.observe(z));
}

/* ---------- Fade-in ao entrar na tela ---------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  // pequeno atraso escalonado entre irmãos (cards em grade)
  items.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    const i = siblings.indexOf(el);
    if (siblings.length > 1) el.style.setProperty("--d", `${Math.min(i, 5) * 0.08}s`);
  });
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-visible"); obs.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  items.forEach((el) => io.observe(el));
}

/* ---------- FAQ (accordion) ---------- */
function initAccordion() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("[data-accordion] .faq__q").forEach((btn) => {
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      if (reduce) { panel.hidden = open; return; }

      if (open) {
        panel.style.height = panel.scrollHeight + "px";
        requestAnimationFrame(() => (panel.style.height = "0px"));
        panel.addEventListener("transitionend", () => { panel.hidden = true; panel.style.height = ""; }, { once: true });
      } else {
        panel.hidden = false;
        panel.style.height = "0px";
        requestAnimationFrame(() => (panel.style.height = panel.scrollHeight + "px"));
        panel.addEventListener("transitionend", () => (panel.style.height = ""), { once: true });
      }
    });
  });
}

/* ---------- Carrossel de depoimentos (mobile) ---------- */
function initCarousel() {
  document.querySelectorAll("[data-carousel]").forEach((root) => {
    const track = root.querySelector("[data-carousel-track]");
    const slides = [...track.children];
    const prev = root.querySelector("[data-carousel-prev]");
    const next = root.querySelector("[data-carousel-next]");
    const dotsWrap = root.querySelector("[data-carousel-dots]");

    const dots = slides.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `Ir para o depoimento ${i + 1}`);
      b.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(b);
      return b;
    });

    const current = () => {
      const left = track.scrollLeft;
      let best = 0, dist = Infinity;
      slides.forEach((s, i) => {
        const d = Math.abs(s.offsetLeft - track.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft) - left);
        if (d < dist) { dist = d; best = i; }
      });
      return best;
    };
    const goTo = (i) => {
      const pad = parseFloat(getComputedStyle(track).paddingLeft);
      track.scrollTo({ left: slides[i].offsetLeft - track.offsetLeft - pad, behavior: "smooth" });
    };
    const update = () => {
      const i = current();
      dots.forEach((d, j) => d.setAttribute("aria-current", String(i === j)));
      prev.disabled = i === 0;
      next.disabled = i === slides.length - 1;
    };

    prev.addEventListener("click", () => goTo(Math.max(0, current() - 1)));
    next.addEventListener("click", () => goTo(Math.min(slides.length - 1, current() + 1)));
    let t;
    track.addEventListener("scroll", () => { clearTimeout(t); t = setTimeout(update, 60); }, { passive: true });
    window.addEventListener("resize", update);
    update();
  });
}

renderProducts();
wireLinks();
initHeader();
initReveal();
initAccordion();
initCarousel();
initFloat();
