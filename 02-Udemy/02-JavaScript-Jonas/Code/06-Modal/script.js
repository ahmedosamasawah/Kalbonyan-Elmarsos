'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const modalOpen = document.querySelectorAll('.show-modal');
const modalClose = document.querySelector('.close-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < modalOpen.length; i++)
  modalOpen[i].addEventListener('click', openModal);

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});
