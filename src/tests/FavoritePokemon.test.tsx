import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Ao favoritar a partir da página de detalhes:', () => {
  test('É exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito', async () => {
    const { user } = renderWithRouter(<App />, { route: '/pokemon/151' });

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
    await user.click(favoriteLink);

    screen.getByText(/no favorite pokémon found/i);
  });

  test('Apenas são exibidos os Pokémon favoritados', async () => {
    const { user } = renderWithRouter(<App />, { route: '/pokemon/151' });

    const favoriteBox = screen.getByText(/pokémon favoritado\?/i);
    await user.click(favoriteBox);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
    await user.click(favoriteLink);

    screen.getByText(/mew/i);

    const favoriteList = screen.getAllByTestId('pokemon-type');
    expect(favoriteList.length).toBe(1);
  });
});
