//Smoth

document.querySelector(".btn.white").addEventListener("click", ()=>{
    document.querySelector(".offer.container").scrollIntoView({behavior:"smooth"})
})

//Scroll effect with getBoundingClientRect()

const Reveals = document.querySelectorAll(".reveal");

const RevealOnScroll = () => {
    const windowHeight = window.innerHeight*0.85;

    Reveals.forEach((el)=>{
        const borderTopDistance = el.getBoundingClientRect().top;

        if(borderTopDistance < windowHeight){
            el.classList.add("show");
        }
    })
}

window.addEventListener("scroll", RevealOnScroll);
RevealOnScroll();

//Scroll efeito nas sessões

const CardsAll = document.querySelectorAll(".what-content, .what-problens, .benefit-card.tilt, .demo-item")

const observer = new IntersectionObserver((entries)=>{
    entries.forEach((elemento)=>{
        if (elemento.isIntersecting){
            elemento.target.classList.add("MostrarCard")
        }
    })
}, {threshold:0.25})

CardsAll.forEach((div)=>{
    observer.observe(div)
})


//3d effect TIlt

const Tiltcards = document.querySelectorAll(".tilt");

Tiltcards.forEach((card)=>{
    card.addEventListener("mousemove", e=>{
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width/2;
        const centerY = rect.height/2;

        const deltaX = x - centerX;
        const deltaY = y - centerY;

        const rotateX = deltaY / 10;
        const rotateY = deltaX / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    })

    card.addEventListener("mouseleave", ()=>{
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
})

// Animação dos números da credibilidade

formatNumber = (num)=>{
    if (num >= 1000){
        return Math.floor(num).toLocaleString("pt-BR");
    } else{
        return Math.floor(num);
    }
}

const animatenumber = (num)=>{
    const total = +num.dataset.target;
    let inicio = 0;
    let duração = total/120;

    const Update = ()=>{
        inicio += duração;
        if (inicio < total){
            num.textContent = formatNumber(inicio);
            requestAnimationFrame(Update);
        } else {
            num.textContent = formatNumber(total);
        }
    }

    Update();
}

const observador = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if (entry.isIntersecting){
        const num = entry.target.querySelector(".num-value");
        if (!num.dataset.done){
            animatenumber(num);
            num.dataset.done = "true";
        }
    }
  })
}, {threshold: 0.7});



document.querySelectorAll(".cred-num").forEach((card)=>{
    observador.observe(card);
})

//Sessão de depoimentos clicável

const Track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".testimonial-card");
const BotaoIr = document.querySelector(".next");
const Botaovoltar = document.querySelector(".prev");

let index = 0;

function AtualizaPosição() {
    // Pegamos a largura de um card
    const larguraElemento = cards[0].getBoundingClientRect().width;
    
    // Pegamos o gap (espaço) entre os cards definido no CSS
    const gap = parseFloat(getComputedStyle(Track).gap) || 0;
    
    // Calculamos o deslocamento somando a largura + o gap
    Track.style.transform = `translateX(-${index * (larguraElemento + gap)}px)`;
}

BotaoIr.addEventListener("click", () => {
    // Lógica para não deixar o carrossel passar do último card visível
    const cardsPorVez = Math.round(Track.offsetWidth / cards[0].offsetWidth);
    const limiteEsq = cards.length - cardsPorVez;

    if (index < limiteEsq) {
        index++;
        AtualizaPosição();
    } else {
        index = 0; // Opcional: Volta para o início (loop)
        AtualizaPosição();
    }
});

Botaovoltar.addEventListener("click", () => {
    if (index > 0) {
        index--;
        AtualizaPosição();
    }
});

// CORREÇÃO: Passamos a referência da função, sem os parênteses ()
window.addEventListener("resize", () => {
    // Pequeno delay para garantir que o navegador calculou as novas larguras
    setTimeout(AtualizaPosição, 100);
});




//FAQ 
const faq_itens = document.querySelectorAll(".faq-item");

faq_itens.forEach((item) => {
  const question = item.querySelector(".question");

  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("faq-mostrar");

    // Fecha todos os outros
    faq_itens.forEach((el) => el.classList.remove("faq-mostrar"));

    // Se o clicado NÃO estava aberto, abre ele agora
    if (isOpen === false) {
      item.classList.add("faq-mostrar");
    }
  });
});

//Starfiel effect

/* =========================================
   EFEITO SPACE STARFIELD (SEÇÃO DE OFERTA)
   ========================================= */
const spaceCanvas = document.getElementById('space-canvas');
const spaceCtx = spaceCanvas.getContext('2d');

let spaceWidth, spaceHeight;
let stars = [];
const STAR_COUNT = 100; // Quantidade de estrelas (leve para performance)

// Função para definir o tamanho do canvas igual ao tamanho da DIV .offer
function resizeSpaceCanvas() {
    const offerSection = document.querySelector('.offer.container');
    spaceWidth = spaceCanvas.width = offerSection.offsetWidth;
    spaceHeight = spaceCanvas.height = offerSection.offsetHeight;
    createStars();
}

// Cria as estrelas iniciais
function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * spaceWidth,
            y: Math.random() * spaceHeight,
            size: Math.random() * 1.5, // Tamanho variando entre 0 e 1.5px
            speed: Math.random() * 0.5 + 0.1, // Velocidade lenta e variada
            opacity: Math.random(),
            fadeSpeed: Math.random() * 0.02 + 0.005 // Velocidade do "piscar"
        });
    }
}

// Animação
function animateSpace() {
    // Limpa o canvas com um rastro muito leve (opcional) ou limpeza total
    spaceCtx.clearRect(0, 0, spaceWidth, spaceHeight);
    
    // Desenha cada estrela
    stars.forEach(star => {
        // Movimento (subindo suavemente)
        star.y -= star.speed; 
        
        // Efeito de piscar (Twinkle)
        star.opacity += star.fadeSpeed;
        if (star.opacity > 1 || star.opacity < 0.2) {
            star.fadeSpeed = -star.fadeSpeed; // Inverte o piscar
        }

        // Se a estrela sair pelo topo, volta por baixo
        if (star.y < 0) {
            star.y = spaceHeight;
            star.x = Math.random() * spaceWidth;
        }

        // Desenho
        spaceCtx.beginPath();
        spaceCtx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        spaceCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        spaceCtx.fill();
    });

    requestAnimationFrame(animateSpace);
}

// Inicialização
window.addEventListener('resize', resizeSpaceCanvas);
// Espera o elemento carregar para pegar o tamanho certo
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se a seção existe antes de rodar para evitar erros
    if(document.querySelector('.offer.container')) {
        resizeSpaceCanvas();
        animateSpace();
    }
});






