import {
  Adidas,
  Adidas2,
  Blkzip,
  Blkzip2,
  Dickies,
  Dickies2,
  Dickiescrw,
  Dickiescrw2,
  Gues,
  Gues2,
  Nike,
  Nike2,
  Obey,
  Obey2,
  Texas,
  Texas2,
  Vans,
  Vans2,
  Wheaton,
  Wheaton2,
} from '../assets/hoodie';

import {
  Hoodie,
  Ziphoodie,
  Crewneck,
} from '../assets/cathoodies';

export const mapImage = (image) => {
  if (typeof image !== 'string') {
    return image;
  }

  const lower = image.toLowerCase();
  
  if (lower.includes('adidas2')) return Adidas2;
  if (lower.includes('adidas')) return Adidas;
  if (lower.includes('blkzip2')) return Blkzip2;
  if (lower.includes('blkzip')) return Blkzip;
  if (lower.includes('dickiescrw2')) return Dickiescrw2;
  if (lower.includes('dickiescrw')) return Dickiescrw;
  if (lower.includes('dickies2')) return Dickies2;
  if (lower.includes('dickies')) return Dickies;
  if (lower.includes('gues2')) return Gues2;
  if (lower.includes('gues')) return Gues;
  if (lower.includes('nike2')) return Nike2;
  if (lower.includes('nike')) return Nike;
  if (lower.includes('obey2')) return Obey2;
  if (lower.includes('obey')) return Obey;
  if (lower.includes('texas2')) return Texas2;
  if (lower.includes('texas')) return Texas;
  if (lower.includes('vans2')) return Vans2;
  if (lower.includes('vans')) return Vans;
  if (lower.includes('wheaton2')) return Wheaton2;
  if (lower.includes('wheaton')) return Wheaton;
  
  if (lower.includes('ziphoodie')) return Ziphoodie;
  if (lower.includes('hoodie')) return Hoodie;
  if (lower.includes('crewneck')) return Crewneck;

  return { uri: image };
};
