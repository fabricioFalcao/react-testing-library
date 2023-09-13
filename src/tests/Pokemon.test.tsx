import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testes do compoenete Pokemon', () => {
  const pikachu = pokemonList[0];

  test('É renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img', { name: `${pikachu.name} sprite` });

    const weightValue = pikachu.averageWeight.value;
    const unit = pikachu.averageWeight.measurementUnit;

    expect(pokemonName).toHaveTextContent(pikachu.name);
    expect(pokemonType).toHaveTextContent(pikachu.type);
    expect(pokemonWeigth).toHaveTextContent(`Average weight: ${weightValue} ${unit}`);
    expect(pokemonImage).toHaveAttribute('src', pikachu.image);
  });

  test('O card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon.', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    expect(moreDetails).toHaveAttribute('href', `/pokemon/${pikachu.id}`);
  });

  test('Ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', async () => {
    const { user } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    await user.click(moreDetails);

    expect(window.location.pathname).toBe(`/pokemon/${pikachu.id}`);
    screen.getByRole('heading', { name: `${pikachu.name} Details` });
  });

  test('Existe um ícone de estrela nos Pokémon favoritados', async () => {
    const { user } = renderWithRouter(<App />, { route: `/pokemon/${pikachu.id}` });

    const checkFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });

    await user.click(checkFavorite);

    const favoriteStar = screen.getByRole('img', { name: `${pikachu.name} is marked as favorite` });
    expect(favoriteStar).toHaveAttribute('src', '/star-icon.png');
    expect(favoriteStar).toHaveAttribute('alt', `${pikachu.name} is marked as favorite`);
  });
});
