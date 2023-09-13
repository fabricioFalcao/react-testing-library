import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testes do componente PokemoDetails', () => {
  const pikachu = pokemonList[0];

  test('As as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />, { route: `/pokemon/${pikachu.id}` });

    screen.getByRole('heading', { name: `${pikachu.name} Details` });

    const moreDetails = screen.queryByRole('link', { name: /more details/i });
    expect(moreDetails).not.toBeInTheDocument();

    screen.getByRole('heading', { name: /summary/i });

    screen.getByText(pikachu.summary);
  });

  test('Existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />, { route: `/pokemon/${pikachu.id}` });

    screen.getByRole('heading', { level: 2, name: `Game Locations of ${pikachu.name}` });

    pikachu.foundAt.forEach(({ location, map }, index) => {
      screen.getByText(location);

      const maps = screen.getAllByRole('img', { name: `${pikachu.name} location` });
      const currentMap = maps[index];
      expect(currentMap).toHaveAttribute('src', map);
    });
  });

  test('O usuário pode favoritar um Pokémon por meio da página de detalhes', async () => {
    const { user } = renderWithRouter(<App />, { route: `/pokemon/${pikachu.id}` });

    const checkFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    screen.getByLabelText('Pokémon favoritado?');

    let favoriteStar = screen.queryByRole('img', { name: `${pikachu.name} is marked as favorite` });
    expect(favoriteStar).not.toBeInTheDocument();

    await user.click(checkFavorite);
    favoriteStar = screen.queryByRole('img', { name: `${pikachu.name} is marked as favorite` });
    expect(favoriteStar).toBeInTheDocument();

    await user.click(checkFavorite);
    favoriteStar = screen.queryByRole('img', { name: `${pikachu.name} is marked as favorite` });
    expect(favoriteStar).not.toBeInTheDocument();
  });
});
