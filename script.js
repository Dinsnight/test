// Ждём загрузки DOM
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.accordion-button').forEach(function(btn){
      btn.addEventListener('click', function(e){
        // получаем элемент collapse по data-bs-target
        const targetSelector = btn.getAttribute('data-bs-target');
        if (!targetSelector) return; // если нет — ничего не делаем
        const target = document.querySelector(targetSelector);
        if (!target) return;

        // если блок уже показан — позволяем закрыть без пароля
        if (target.classList.contains('show')) {
          // Используем API Bootstrap для переключения
          const inst = bootstrap.Collapse.getOrCreateInstance(target);
          inst.toggle();
          // предотвращаем двойной сработки стандартного поведения
          e.preventDefault();
          return;
        }

        // если у кнопки нет data-password — открываем как обычно
        const required = btn.dataset.password;
        if (!required) {
          // позволяем стандартному поведению (Bootstrap откроет)
          return;
        }

        // блокируем стандартное открытие и просим пароль
        e.preventDefault();

        // prompt — простой, но неудобный; можно заменить кастомным модальным окном
        const entered = prompt('Введите пароль для этого раздела:');
        if (entered === null) {
          // пользователь отменил
          return;
        }

        if (entered === required) {
          const inst = bootstrap.Collapse.getOrCreateInstance(target);
          inst.show();
        } else {
          alert('Неверный пароль');
        }
      });
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".accordion-item");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      items.forEach(item => {
        if (filter === "all" || item.dataset.category === filter) {
          item.style.display = "block"; // показать
        } else {
          item.style.display = "none";  // скрыть
        }
      });
    });
  });
});