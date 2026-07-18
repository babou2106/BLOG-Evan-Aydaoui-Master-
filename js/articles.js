/* =========================================
   FILTRES PAR CATÉGORIE — PAGE ARTICLES
   ========================================= */
const filterBtns = document.querySelectorAll('.filter-btn');
const articleCards = document.querySelectorAll('.article-card[data-category], .card-featured[data-category]');
const noResults = document.querySelector('.no-results');
const countDisplay = document.querySelector('.articles-count');

function updateCount() {
  const visible = [...articleCards].filter(c => c.style.display !== 'none').length;
  if (countDisplay) {
    countDisplay.textContent = `${visible} article${visible > 1 ? 's' : ''}`;
  }
}

function filterArticles(category) {
  articleCards.forEach(card => {
    const match = category === 'all' || card.dataset.category === category;
    card.style.display = match ? '' : 'none';
  });

  // Message si aucun résultat
  if (noResults) {
    const visible = [...articleCards].filter(c => c.style.display !== 'none').length;
    noResults.style.display = visible === 0 ? 'block' : 'none';
  }

  updateCount();
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterArticles(btn.dataset.category);
  });
});

// Initialisation
updateCount();
