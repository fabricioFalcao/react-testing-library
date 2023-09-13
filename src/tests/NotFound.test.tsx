import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente Not Found', () => {
  test('A página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    screen.getByRole('heading', { level: 2, name: 'Page requested not found' });
  });

  test('A página mostra a imagem com o texto alternativo', () => {
    renderWithRouter(<NotFound />);

    screen.getByRole('img', { name: /clefairy pushing buttons randomly with text i have no idea what i'm doing/i });
  });
});
