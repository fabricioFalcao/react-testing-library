import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente About', () => {
  test('A página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    screen.getByRole('heading', { name: /about pokédex/i });
  });

  test('A página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon\./i);
    screen.getByText(/one can filter pokémon by type, and see more details for each one of them\./i);
  });

  test('A página contém a imagem correta de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImg = screen.getByRole('img', { name: /pokédex/i });
    expect(pokedexImg).toHaveAttribute('src', imgUrl);
  });
});
