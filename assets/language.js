(function () {
  'use strict';

  var storageKey = 'portfolio-language';
  var labels = {
    pt: { '/sobre/': 'Sobre mim', '/projetos/': 'Projetos', '/publicacoes/': 'Publicações' },
    en: { '/sobre/': 'About me', '/projetos/': 'Projects', '/publicacoes/': 'Publications' }
  };
  var titles = {
    pt: { '/': 'Bem-vindo', '/sobre/': 'Sobre mim', '/projetos/': 'Projetos', '/publicacoes/': 'Publicações' },
    en: { '/': 'Welcome', '/sobre/': 'About me', '/projetos/': 'Projects', '/publicacoes/': 'Publications' }
  };

  function setLanguage(language) {
    var selected = language === 'en' ? 'en' : 'pt';
    document.documentElement.lang = selected === 'pt' ? 'pt-BR' : 'en';

    document.querySelectorAll('.language-content').forEach(function (element) {
      element.hidden = element.dataset.language !== selected;
    });

    document.querySelectorAll('.language-switcher button[data-language]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.language === selected));
    });

    document.querySelectorAll('.site-nav a').forEach(function (link) {
      var path = new URL(link.href).pathname;
      if (labels[selected][path]) link.textContent = labels[selected][path];
    });

    var path = window.location.pathname;
    var pageTitle = document.querySelector('.post-title, .page-heading');
    if (pageTitle && titles[selected][path]) pageTitle.textContent = titles[selected][path];

    try { localStorage.setItem(storageKey, selected); } catch (error) {}
  }

  var preferred;
  try { preferred = localStorage.getItem(storageKey); } catch (error) {}
  setLanguage(preferred || 'pt');

  document.querySelectorAll('.language-switcher [data-language]').forEach(function (button) {
    button.addEventListener('click', function () { setLanguage(button.dataset.language); });
  });
}());
