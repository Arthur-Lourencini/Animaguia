document.addEventListener("DOMContentLoaded", () => {
  // Seleciona todos os botões com a classe collapseNav
  const collapseButtons = document.querySelectorAll(".collapseNav");

  collapseButtons.forEach(button => {
    // Seleciona o próximo elemento com a classe contentNav
    const contentNav = button.nextElementSibling;

    // Garante que o conteúdo esteja inicialmente colapsado
    if (contentNav && contentNav.classList.contains("contentNav")) {
      contentNav.style.maxHeight = null; // Inicialmente colapsado
      contentNav.style.overflow = "hidden"; // Esconde o conteúdo que ultrapassa
      contentNav.style.transition = "max-height 0.3s ease-out"; // Adiciona animação
    }

    // Adiciona o evento de clique para colapsar/expandir
    button.addEventListener("click", () => {
      if (contentNav && contentNav.classList.contains("contentNav")) {
        if (contentNav.style.maxHeight && contentNav.style.maxHeight !== "0px") {
          // Colapsa o menu
          contentNav.style.maxHeight = "0px";
        } else {
          // Expande o menu
          contentNav.style.maxHeight = contentNav.scrollHeight + "px";
        }
      }
    });
  });

  var coll = document.getElementsByClassName("collapse");
  var i;

  // Adiciona o evento de clique para alternar entre expandir e colapsar
  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;

      // Verifica se o elemento content existe antes de manipular
      if (content) {
        if (content.style.maxHeight && content.style.maxHeight !== "0px") {
          // Colapsa o conteúdo
          content.style.maxHeight = "0px";
        } else {
          // Expande o conteúdo
          content.style.maxHeight = content.scrollHeight + "px";
        }
      }
    });
  }

  // Garante que todos os elementos com classe "collapse" tenham o conteúdo inicialmente colapsado
  for (i = 0; i < coll.length; i++) {
    var content = coll[i].nextElementSibling;
    if (content) {
      content.style.maxHeight = null; // Define como colapsado inicialmente
    }
  }
});

// Garante que todos os elementos com classe "collapse" tenham o conteúdo inicialmente colapsado
window.addEventListener("DOMContentLoaded", () => {
  for (i = 0; i < coll.length; i++) {
    var content = coll[i].nextElementSibling;
    if (content) {
      content.style.maxHeight = null; // Define como colapsado inicialmente
    }
  }
});