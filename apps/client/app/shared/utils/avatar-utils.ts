import {fakerFR} from '@faker-js/faker';

export function getRandomName(): string {
  return fakerFR.person.firstName();
}

export function getRandomColor(): string {
  //const hex = Math.floor(Math.random() * 0xffffff).toString(16);
  //return `#${hex.padStart(6, '0')}`;

  const letters = '0123456789abcdef';
  let color = '';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function generateAvatarUrl(): string {
  const name = getRandomName();
  const color = getRandomColor();
  return `https://api.dicebear.com/9.x/avataaars/svg?seed=${name}&backgroundColor=${color}`;
}

