
//cabeçalho
const btnMobile = document.getElementById('btn-mobile');

function toggleMenu (event) {
   if (event.type === 'toutchstart') event.preventdefault();
    const menuscabecalho = document.getElementById('menuscabecalho');
    menuscabecalho.classList.toggle('active');
    const active = menuscabecalho.classList.contains('active');
    event.currentTarget.setAttribute('aria-expanded', active);
    if (active) {
         event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
    } else {
        event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
    }
}

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('toutchstart', toggleMenu);




const btnPerfil = document.getElementById('btn-perfil');

function togglePerfil (event) {
    if (event.type === 'toutchstart') event.preventdefault();
     const opperfil = document.getElementById('opperfil');
     opperfil.classList.toggle('active');
     const active = opperfil.classList.contains('active');
     event.currentTarget.setAttribute('aria-expanded', active);
    if (active) {
         event.currentTarget.setAttribute('aria-label', 'Fechar Opções de perfis');
    } else {
        event.currentTarget.setAttribute('aria-label', 'Abrir Opções de Perfis');
    }
 }


 btnPerfil.addEventListener('click', togglePerfil);
 btnPerfil.addEventListener('toutchstart', togglePerfil);


 const btnUser = document.getElementById('btn-opt');

function toggleUser (event) {
    if (event.type === 'toutchstart') event.preventdefault();
     const opuser = document.getElementById('opuser');
     opuser.classList.toggle('active');
     const active = opuser.classList.contains('active');
     event.currentTarget.setAttribute('aria-expanded', active);
    if (active) {
         event.currentTarget.setAttribute('aria-label', 'Fechar Opções de usuario');
    } else {
        event.currentTarget.setAttribute('aria-label', 'Abrir Opções de usuario');
    }
 }


 btnUser.addEventListener('click', toggleUser);


