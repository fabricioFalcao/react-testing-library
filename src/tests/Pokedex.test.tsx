/* eslint-disable no-await-in-loop */
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testes do componente Pokedex', () => {
  test('A página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    screen.getByRole('heading', { level: 2, name: 'Encountered Pokémon' });
  });

  test('O botão Próximo Pokemon funciona corretamente', async () => {
    const { user } = renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextBtn).toHaveTextContent('Próximo Pokémon');

    // for (let index = 0; index < pokemonList.length; index += 1) {
    //   screen.getByText(pokemonList[index].name);

    //   const cardsList = screen.getAllByRole('link', { name: /more details/i });
    //   expect(cardsList.length).toBe(1);

    //   await user.click(nextBtn);
    // }
    screen.getByText(pokemonList[0].name);

    await user.click(nextBtn);

    screen.getByText(pokemonList[1].name);
  });

  test('Teste dos botões de filtro da Pokedex', async () => {
    const { user } = renderWithRouter(<App />);
    const typeId = 'pokemon-type-button';

    let typesList: string[] = [];

    pokemonList.forEach(({ type }) => {
      if (!typesList.includes(type)) {
        typesList = [...typesList, type];
      }
    });

    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
    const filterBtnList = screen.getAllByTestId(typeId);
    expect(filterBtnList.length).toBe(typesList.length);

    // for (let index = 0; index < typesList.length; index += 1) {
    //   const currentType = typesList[index];
    //   const pokemonsPerType = pokemonList
    //     .filter((pokemon) => pokemon.type === currentType).length;

    //   const filterButton = screen.getByRole('button', { name: currentType });

    //   await user.click(filterButton);

    //   expect(filterButton).toHaveAttribute('data-testid', typeId);
    //   expect(allButton).not.toHaveAttribute('data-testid', typeId);

    //   for (let i = 0; i < pokemonsPerType; i += 1) {
    //     await user.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    //     const cardType = screen.getByTestId('pokemon-type');
    //     expect(cardType).toHaveTextContent(currentType);
    //   }
    // }

    // await user.click(allButton);
    // screen.getByText(pokemonList[0].name);

    filterBtnList.forEach((button, index) => {
      expect(button).toHaveTextContent(typesList[index]);
    });

    await user.click(filterBtnList[1]);

    const pokemonName = screen.getByTestId('pokemon-name');
    const nextButton = screen.getByRole('button', { name: 'Próximo Pokémon' });

    expect(pokemonName).toHaveTextContent('Charmander');

    await user.click(nextButton);
    expect(pokemonName).toHaveTextContent('Rapidash');

    await user.click(filterBtnList[2]);
    expect(pokemonName).toHaveTextContent('Caterpie');

    await user.click(allButton);
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
});
