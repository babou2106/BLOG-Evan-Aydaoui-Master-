/* =========================================
   CHARGEMENT DES IMAGES DE FILM
   Affiche l'image si le fichier existe dans
   assets/img/, sinon laisse le repli visible
   (initiales ou texte).
   ========================================= */
document.querySelectorAll('[data-img]').forEach(el => {
  const src = el.dataset.img;
  const probe = new Image();
  probe.onload = () => {
    el.style.backgroundImage = `url('${src}')`;
    el.classList.add('has-image');
  };
  probe.src = src;
});
